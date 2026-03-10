import { promises as fs } from "node:fs";
import path from "node:path";
import { buildReleaseNotesScaffold } from "./release-page-templates.mjs";

const rootDir = process.cwd();
const specsDir = path.join(rootDir, "specification");
const releasesSpecsDir = path.join(specsDir, "releases");
const baseApiDocsPage = path.join(rootDir, "pages", "release", "api-docs.md");
const releasesPagesDir = path.join(rootDir, "pages", "release", "releases");
const releaseNotesDir = path.join(rootDir, "pages", "release");
const changelogPagePath = path.join(releaseNotesDir, "changelog.md");
const releaseMetadataDir = path.join(rootDir, "release-metadata");

const release = process.argv[2];
const force = process.argv.includes("--force");

if (!release) {
  console.error("Usage: npm run release:docs -- <release-number> [--force]");
  process.exit(1);
}

if (!/^[A-Za-z0-9._-]+$/.test(release)) {
  console.error("Invalid release number. Allowed chars: letters, digits, dot, underscore, hyphen.");
  process.exit(1);
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyDirectoryRecursive(sourceDir, destinationDir) {
  await fs.mkdir(destinationDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === "releases") {
      continue;
    }

    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectoryRecursive(sourcePath, destinationPath);
      continue;
    }

    await fs.copyFile(sourcePath, destinationPath);
  }
}

function compareReleasesDesc(a, b) {
  const aParts = a.split(/[^0-9]+/).filter(Boolean).map(Number);
  const bParts = b.split(/[^0-9]+/).filter(Boolean).map(Number);
  const maxLen = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < maxLen; i += 1) {
    const aPart = aParts[i] ?? 0;
    const bPart = bParts[i] ?? 0;
    if (aPart !== bPart) {
      return bPart - aPart;
    }
  }

  return b.localeCompare(a);
}

function buildApiVersionChip(versionLabel) {
  return [
    "<!-- API_VERSION_CHIP_START -->",
    `        <span class="api-version-chip">${versionLabel}</span>`,
    "<!-- API_VERSION_CHIP_END -->",
  ].join("\n");
}

function setApiVersionChip(content, versionLabel) {
  const markerRegex = /<!-- API_VERSION_CHIP_START -->[\s\S]*?<!-- API_VERSION_CHIP_END -->/m;
  if (!markerRegex.test(content)) {
    throw new Error("Missing API version chip markers in pages/release/api-docs.md.");
  }
  return content.replace(markerRegex, buildApiVersionChip(versionLabel));
}

function toSpecLabelVersion(versionLabel) {
  return versionLabel.toLowerCase() === "latest" ? "latest" : versionLabel;
}

function buildApiSpecCtaLabel(versionLabel) {
  return [
    "<!-- API_SPEC_CTA_LABEL_START -->",
    `          <span class="api-fullspec-label">View ${toSpecLabelVersion(versionLabel)} spec</span>`,
    "<!-- API_SPEC_CTA_LABEL_END -->",
  ].join("\n");
}

function setApiSpecCtaLabel(content, versionLabel) {
  const markerRegex = /<!-- API_SPEC_CTA_LABEL_START -->[\s\S]*?<!-- API_SPEC_CTA_LABEL_END -->/m;
  if (!markerRegex.test(content)) {
    throw new Error("Missing API spec CTA label markers in pages/release/api-docs.md.");
  }
  return content.replace(markerRegex, buildApiSpecCtaLabel(versionLabel));
}

async function getReleaseList() {
  if (!(await exists(releasesPagesDir))) {
    return [];
  }

  const entries = await fs.readdir(releasesPagesDir, { withFileTypes: true });
  const releases = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const pagePath = path.join(releasesPagesDir, entry.name, "api-docs.md");
    if (await exists(pagePath)) {
      releases.push(entry.name);
    }
  }

  releases.sort(compareReleasesDesc);
  return releases;
}

function toNumberOrZero(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}


function normalizeReleaseChannel(value) {
  if (typeof value !== "string" || !value.trim()) {
    return "GA";
  }

  const normalized = value.trim().toUpperCase();
  if (normalized === "GA") {
    return "GA";
  }
  if (normalized === "BETA") {
    return "Beta";
  }

  throw new Error("Invalid releaseChannel. Allowed values: GA, Beta.");
}

function normalizeSupportStatus(value) {
  if (typeof value !== "string" || !value.trim()) {
    return "Supported";
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "supported") {
    return "Supported";
  }
  if (normalized === "deprecated") {
    return "Deprecated";
  }
  if (normalized === "no longer supported") {
    return "Deprecated";
  }
  if (normalized === "retired") {
    return "Retired";
  }

  throw new Error("Invalid supportStatus. Allowed values: Supported, Deprecated, Retired.");
}

function normalizeReleaseMetadata(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("Metadata entry must be a JSON object.");
  }

  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  const date = typeof raw.date === "string" ? raw.date.trim() : "";
  const summary = typeof raw.summary === "string" ? raw.summary.trim() : "";

  if (!version) {
    throw new Error("Missing required field: version.");
  }
  if (!date) {
    throw new Error("Missing required field: date.");
  }
  if (!summary) {
    throw new Error("Missing required field: summary.");
  }

  const stats = raw.stats && typeof raw.stats === "object" ? raw.stats : {};
  const releaseChannel = normalizeReleaseChannel(raw.releaseChannel);
  const supportStatus = normalizeSupportStatus(raw.supportStatus);
  const releaseNotesPath = typeof raw.releaseNotesPath === "string" && raw.releaseNotesPath.trim()
    ? raw.releaseNotesPath.trim()
    : `/releases/${version}/release-notes`;

  return {
    version,
    date,
    releaseChannel,
    supportStatus,
    summary,
    stats: {
      new: toNumberOrZero(stats.new),
      enhanced: toNumberOrZero(stats.enhanced),
      fixed: toNumberOrZero(stats.fixed),
      breakingChanges: toNumberOrZero(stats.breakingChanges),
    },
    releaseNotesPath,
  };
}

async function getReleaseMetadataList() {
  if (!(await exists(releaseMetadataDir))) {
    return [];
  }

  const entries = await fs.readdir(releaseMetadataDir, { withFileTypes: true });
  const metadata = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      continue;
    }

    const filePath = path.join(releaseMetadataDir, entry.name);
    const rawFile = await fs.readFile(filePath, "utf8");

    let parsed;
    try {
      parsed = JSON.parse(rawFile);
    } catch (error) {
      throw new Error(`Invalid JSON in ${path.relative(rootDir, filePath)}: ${error instanceof Error ? error.message : String(error)}`);
    }

    try {
      metadata.push(normalizeReleaseMetadata(parsed));
    } catch (error) {
      throw new Error(`Invalid metadata in ${path.relative(rootDir, filePath)}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  metadata.sort((a, b) => compareReleasesDesc(a.version, b.version));
  return metadata;
}

async function getRequiredReleaseMetadata(version) {
  const metadataPath = path.join(releaseMetadataDir, `${version}.json`);
  if (!(await exists(metadataPath))) {
    throw new Error(
      `Missing required metadata file: release-metadata/${version}.json`,
    );
  }

  const rawFile = await fs.readFile(metadataPath, "utf8");
  let parsed;
  try {
    parsed = JSON.parse(rawFile);
  } catch (error) {
    throw new Error(
      `Invalid JSON in release-metadata/${version}.json: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const metadata = normalizeReleaseMetadata(parsed);
  if (metadata.version !== version) {
    throw new Error(
      `Version mismatch in release-metadata/${version}.json. Expected "${version}" but found "${metadata.version}".`,
    );
  }

  return metadata;
}

async function ensureReleaseNotesScaffold(metadata) {
  const releaseNotesPath = path.join(
    releasesPagesDir,
    metadata.version,
    "release-notes.md",
  );
  if (await exists(releaseNotesPath)) {
    return { created: false, path: releaseNotesPath };
  }

  await fs.mkdir(path.dirname(releaseNotesPath), { recursive: true });
  await fs.writeFile(releaseNotesPath, buildReleaseNotesScaffold(metadata), "utf8");
  return { created: true, path: releaseNotesPath };
}

function buildAutoChangelogPage({ releasesList, metadataList, slug = "/changelog" }) {
  const latest = metadataList[0];
  const previous = metadataList.slice(1);

  if (!latest) {
    return [
      "---",
      `slug: ${slug}`,
      "---",
      "",
      "<div class=\"page-wide changelog-page\">",
      "<h1>Finzly Connect API Changelog</h1>",
      "",
      "<p>No release metadata found in <code>release-metadata/</code>. Start from the baseline release and add metadata for newer versions as they are published.</p>",
      "",
      "## [6.2.0.0] - Baseline",
      "",
      "### Summary",
      "Baseline release used as the starting point for changelog history.",
      "",
      "### Included in baseline",
      "- Added Bank Lookup API by BIC/IBAN/NID.",
      "- Added Customer Account Sweeps API set (create/update/get/delete).",
      "- Added bulk file operations APIs.",
      "- Enhanced recurring payment update behavior for `until=Cancelled`.",
      "",
      "**Read full details:** [Default Release Notes](/release-notes)",
      "",
      "</div>",
      "",
    ].join("\n");
  }

  const previousSection = previous.length > 0
    ? [
      "## Previous Releases",
      "",
      ...previous.map(
        (entry) => `- **${entry.version} (${entry.date}):** <span class="release-channel-badge ${entry.releaseChannel.toLowerCase()}">${entry.releaseChannel}</span> <span class="support-status-badge ${entry.supportStatus.toLowerCase().replace(/\s+/g, "-")}">${entry.supportStatus}</span> ${entry.summary} [View Changelog](/releases/${entry.version}/changelog)`,
      ),
      "",
    ]
    : [];

  const latestStable = metadataList.find((entry) => entry.releaseChannel === "GA");
  const latestStableAction = latest.releaseChannel !== "GA" && latestStable
    ? `    <a class="changelog-latest-stable-link" href="/releases/${latestStable.version}/changelog">Latest Stable (GA): ${latestStable.version} API Docs</a>`
    : "";
  const latestSupportStatusClass = latest.supportStatus.toLowerCase().replace(/\s+/g, "-");
  return [
    "---",
    `slug: ${slug}`,
    "excludeFromSearch: true",
    "sidebar:",
    "  hide: true",
    "---",
    "",
    "<div class=\"page-wide changelog-page\">",
    "<h1>Finzly Connect API Changelog</h1>",
    "",
    "<p>For full implementation details, API-level changes, and migration guidance, review the linked Release Notes for each version.</p>",
    "",
    `<div class="changelog-highlight ${latestSupportStatusClass}" role="region" aria-label="Latest release highlight">`,
    "  <p class=\"changelog-highlight-label\">Latest release</p>",
    "  <div class=\"changelog-highlight-top\">",
    `    <p class="changelog-highlight-version"><strong>${latest.version}</strong> <span>${latest.date}</span> <span class="release-channel-badge ${latest.releaseChannel.toLowerCase()}">${latest.releaseChannel}</span> <span class="support-status-badge ${latest.supportStatus.toLowerCase().replace(/\s+/g, "-")}">${latest.supportStatus}</span></p>`,
    "    <div class=\"changelog-highlight-actions\">",
    `      <a class="changelog-highlight-spec-link" href="/releases/${latest.version}/api-docs">View ${latest.version} API Docs</a>`,
    latestStableAction,
    "    </div>",
    "  </div>",
    "  <div class=\"changelog-chip-row\">",
    `    <span class="changelog-chip">New: ${latest.stats.new}</span>`,
    `    <span class="changelog-chip">Enhanced: ${latest.stats.enhanced}</span>`,
    `    <span class="changelog-chip">Fixed: ${latest.stats.fixed}</span>`,
    `    <span class="changelog-chip chip-warn">Breaking Changes: ${latest.stats.breakingChanges}</span>`,
    "  </div>",
    "</div>",
    "",
    `## [${latest.version}] - ${latest.date}`,
    "",
    "### Summary",
    latest.summary,
    "",
    `**Read full details:** [Release Notes ${latest.version}](${latest.releaseNotesPath})`,
    "",
    "---",
    "",
    ...previousSection,
    "</div>",
    "",
  ].join("\n");
}

async function ensureVersionedChangelogSnapshots({ releasesList, metadataList }) {
  for (let index = 0; index < metadataList.length; index += 1) {
    const snapshotVersion = metadataList[index].version;
    const snapshotPath = path.join(releasesPagesDir, snapshotVersion, "changelog.md");

    const historicalMetadata = metadataList.slice(index);
    const historicalVersions = new Set(historicalMetadata.map((entry) => entry.version));
    const historicalReleases = releasesList.filter((entry) => historicalVersions.has(entry));

    const snapshotContent = buildAutoChangelogPage({
      releasesList: historicalReleases,
      metadataList: historicalMetadata,
      slug: `/releases/${snapshotVersion}/changelog`,
    });
    await fs.mkdir(path.dirname(snapshotPath), { recursive: true });
    await fs.writeFile(snapshotPath, snapshotContent, "utf8");
  }
}

async function main() {
  const releaseSpecsDir = path.join(releasesSpecsDir, release);
  const releasePagePath = path.join(releasesPagesDir, release, "api-docs.md");
  const requiredMetadata = await getRequiredReleaseMetadata(release);

  if (!force) {
    const releaseSpecExists = await exists(releaseSpecsDir);
    const releasePageExists = await exists(releasePagePath);
    if (releaseSpecExists || releasePageExists) {
      throw new Error(
      `Release ${release} already exists. Use --force to overwrite generated release files.`,
      );
    }
  }

  await copyDirectoryRecursive(specsDir, releaseSpecsDir);

  let basePage = await fs.readFile(baseApiDocsPage, "utf8");

  const releasePageDir = path.join(releasesPagesDir, release);
  await fs.mkdir(releasePageDir, { recursive: true });
  const releasePagePathLocal = path.join(releasePageDir, "api-docs.md");

  const releaseLinksPage = basePage
    .replace("slug: /api-docs", `slug: /releases/${release}/api-docs`)
    .replace(/href="\/specification\//g, `href="/specification/releases/${release}/`);

  await fs.writeFile(releasePagePathLocal, releaseLinksPage, "utf8");

  const releasesList = await getReleaseList();
  const latestReleaseVersion = releasesList[0] ?? release;
  basePage = setApiVersionChip(basePage, latestReleaseVersion);
  basePage = setApiSpecCtaLabel(basePage, latestReleaseVersion);
  await fs.writeFile(baseApiDocsPage, basePage, "utf8");

  let generatedPage = await fs.readFile(releasePagePathLocal, "utf8");
  generatedPage = setApiVersionChip(generatedPage, release);
  generatedPage = setApiSpecCtaLabel(generatedPage, release);
  await fs.writeFile(releasePagePathLocal, generatedPage, "utf8");

  const releaseNotesScaffold = await ensureReleaseNotesScaffold(requiredMetadata);
  const releaseMetadataList = await getReleaseMetadataList();
  const autoChangelogPage = buildAutoChangelogPage({
    releasesList,
    metadataList: releaseMetadataList,
    slug: "/changelog",
  });
  await fs.writeFile(changelogPagePath, autoChangelogPage, "utf8");
  await ensureVersionedChangelogSnapshots({
    releasesList,
    metadataList: releaseMetadataList,
  });

  console.log(`Release docs prepared for ${release}`);
  console.log(`Spec snapshot: specification/releases/${release}`);
  console.log(`Release docs page: pages/release/releases/${release}/api-docs.md`);
  if (releaseNotesScaffold.created) {
    console.log(`Release notes scaffold created: ${path.relative(rootDir, releaseNotesScaffold.path)}`);
  } else {
    console.log(`Release notes page already exists: ${path.relative(rootDir, releaseNotesScaffold.path)}`);
  }
  console.log("Official changelog generated: pages/release/changelog.md");
  console.log(`Versioned changelog generated: pages/release/releases/${release}/changelog.md`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
