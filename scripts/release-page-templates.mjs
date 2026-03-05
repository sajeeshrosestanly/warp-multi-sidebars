function toAnchorId(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildReleaseNotesScaffold(metadata) {
  const version = metadata.version;
  const summary = metadata.summary || "TODO: add release summary.";
  const releaseChannel = metadata.releaseChannel || "GA";
  const supportStatus = metadata.supportStatus || "Supported";
  const snapshot = metadata.stats || {
    added: 0,
    changed: 0,
    fixed: 0,
    actionRequired: 0,
  };

  const suggestedChanges = [
    {
      title: "TODO: Add first change title",
      type: "Added",
      apis: "TODO API domain",
      actionRequired: "No",
      breaking: "No",
      specLink: `/releases/${version}/api-docs`,
      detailId: toAnchorId("TODO: Add first change title"),
    },
    {
      title: "TODO: Add second change title",
      type: "Changed",
      apis: "TODO API domain",
      actionRequired: "Yes/No",
      breaking: "Yes/No",
      specLink: `/releases/${version}/api-docs`,
      detailId: toAnchorId("TODO: Add second change title"),
    },
  ];

  const tableRows = suggestedChanges.map((entry) => {
    return [
      `| ${entry.title}`,
      `${entry.type}`,
      `${entry.apis}`,
      `${entry.actionRequired}`,
      `${entry.breaking}`,
      `[Details](#${entry.detailId})`,
      `[Spec](${entry.specLink}) |`,
    ].join(" | ");
  });

  const detailSections = suggestedChanges.flatMap((entry) => {
    return [
      `### ${entry.title}`,
      `<!-- id: ${entry.detailId} -->`,
      "- **What changed:** TODO",
      "- **Who is impacted:** TODO",
      "- **Required action:** TODO",
      "- **Backward compatibility:** TODO",
      `- **Spec reference:** [Open versioned spec](${entry.specLink})`,
      "",
    ];
  });

  return [
    "---",
    `slug: /releases/${version}/release-notes`,
    "excludeFromSearch: true",
    "sidebar:",
    "  hide: true",
    "---",
    "",
    "<!-- AUTO-GENERATED SCAFFOLD: update this release note content -->",
    "",
    "<div class=\"page-wide\">",
    "",
    `# Release Notes ${version}`,
    "",
    `Release date: **${metadata.date}**`,
    `Release type: **${releaseChannel}**`,
    `Support status: **${supportStatus}**`,
    "",
    "## Release Summary",
    summary,
    "",
    `Release snapshot: Added ${snapshot.added} | Changed ${snapshot.changed} | Fixed ${snapshot.fixed} | Action required ${snapshot.actionRequired}`,
    "",
    "## Action Required",
    "- TODO: list customer-impacting actions, migration steps, or deadlines.",
    "",
    "## Change Index",
    "",
    "| Change | Type | Impacted APIs | Action Required | Breaking | Details | Spec Link |",
    "|:--|:--|:--|:--|:--|:--|:--|",
    ...tableRows,
    "",
    "## Detailed Changes",
    "",
    ...detailSections,
    "---",
    "",
    "[Back to Changelog](/changelog)",
    "",
    "</div>",
    "",
  ].join("\n");
}
