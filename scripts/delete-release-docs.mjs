import { promises as fs } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { spawn } from "node:child_process";

const rootDir = process.cwd();
const protectedBaselineVersion = "6.2.0.0";
const releasesSpecsDir = path.join(rootDir, "specification", "releases");
const releasesPagesDir = path.join(rootDir, "pages", "release", "releases");
const releaseMetadataDir = path.join(rootDir, "release-metadata");
const changelogPagePath = path.join(rootDir, "pages", "release", "changelog.md");
const generateScriptPath = path.join(rootDir, "scripts", "generate-release-docs.mjs");

const release = process.argv[2];
const dryRun = process.argv.includes("--dry-run");
const yes = process.argv.includes("--yes");

if (!release) {
  console.error("Usage: npm run release:delete -- <release-number> [--yes] [--dry-run]");
  process.exit(1);
}

if (!/^[A-Za-z0-9._-]+$/.test(release)) {
  console.error("Invalid release number. Allowed chars: letters, digits, dot, underscore, hyphen.");
  process.exit(1);
}

if (release === protectedBaselineVersion) {
  console.error(
    `Deletion blocked: ${protectedBaselineVersion} is the protected baseline release.`,
  );
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

async function removePath(targetPath) {
  if (!(await exists(targetPath))) {
    return false;
  }
  return true;
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

async function listReleaseDirs(baseDir) {
  if (!(await exists(baseDir))) {
    return [];
  }
  const entries = await fs.readdir(baseDir, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

async function listMetadataVersions() {
  if (!(await exists(releaseMetadataDir))) {
    return [];
  }
  const entries = await fs.readdir(releaseMetadataDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name.slice(0, -".json".length));
}

function getLatestVersion(versions, excludedVersion) {
  const candidates = versions.filter((v) => v !== excludedVersion);
  candidates.sort(compareReleasesDesc);
  return candidates[0] ?? null;
}

function buildEmptyAutoChangelogPage() {
  return [
    "---",
    "slug: /changelog",
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

async function confirmDeletion() {
  if (yes || dryRun) {
    return;
  }

  const rl = createInterface({ input, output });
  const prompt = `Type "${release}" to confirm delete: `;
  const answer = (await rl.question(prompt)).trim();
  rl.close();

  if (answer !== release) {
    throw new Error("Delete cancelled. Confirmation text did not match release number.");
  }
}

async function main() {
  const targetSpecPath = path.join(releasesSpecsDir, release);
  const targetPagePath = path.join(releasesPagesDir, release);
  const targetMetadataPath = path.join(releaseMetadataDir, `${release}.json`);

  const removedSpec = await removePath(targetSpecPath);
  const removedPage = await removePath(targetPagePath);
  const removedMetadata = await removePath(targetMetadataPath);

  if (!removedSpec && !removedPage && !removedMetadata) {
    throw new Error(`Nothing to delete for release ${release}.`);
  }

  await confirmDeletion();

  if (!dryRun) {
    if (removedSpec) {
      await fs.rm(targetSpecPath, { recursive: true, force: true });
    }
    if (removedPage) {
      await fs.rm(targetPagePath, { recursive: true, force: true });
    }
    if (removedMetadata) {
      await fs.rm(targetMetadataPath, { recursive: true, force: true });
    }
  }

  console.log(`Release deletion ${dryRun ? "preview" : "completed"} for ${release}`);
  console.log(`- specification/releases/${release}: ${removedSpec ? "found" : "not found"}`);
  console.log(`- pages/release/releases/${release}: ${removedPage ? "found" : "not found"}`);
  console.log(`- release-metadata/${release}.json: ${removedMetadata ? "found" : "not found"}`);

  if (dryRun) {
    return;
  }

  const specVersions = await listReleaseDirs(releasesSpecsDir);
  const pageVersions = await listReleaseDirs(releasesPagesDir);
  const metadataVersions = await listMetadataVersions();
  const commonVersions = pageVersions.filter((v) => specVersions.includes(v) && metadataVersions.includes(v));
  const latestRemaining = getLatestVersion(commonVersions, release);

  if (!latestRemaining) {
    await fs.writeFile(changelogPagePath, buildEmptyAutoChangelogPage(), "utf8");
    console.log("No remaining release has spec/page/metadata together.");
    console.log("Official changelog reset to empty state.");
    return;
  }

  await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [generateScriptPath, latestRemaining, "--force"],
      { cwd: rootDir, stdio: "inherit" },
    );
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Failed to regenerate changelog using ${latestRemaining}.`));
      }
    });
    child.on("error", reject);
  });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
