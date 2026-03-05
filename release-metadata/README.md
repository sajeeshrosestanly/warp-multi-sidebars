---
excludeFromSearch: true
---

## Release Metadata

This folder stores metadata used to generate `pages/release/changelog.md`.

Create one JSON file per release, for example `6.2.2.0.json`.

Schema:

```json
{
  "version": "6.2.2.0",
  "date": "2026-02-22",
  "releaseChannel": "GA",
  "supportStatus": "Supported",
  "summary": "Short summary for changelog landing page.",
  "stats": {
    "added": 10,
    "changed": 2,
    "fixed": 4,
    "actionRequired": 2
  }
}
```

Notes:
- `releaseChannel` is optional and defaults to `GA`. Allowed values: `GA`, `Beta`.
- `supportStatus` is optional and defaults to `Supported`. Allowed values: `Supported`, `Deprecated`, `Retired`.
- `releaseNotesPath` is optional and usually omitted. It defaults to `/releases/<version>/release-notes`.
- Keep summary concise (one sentence) for list readability.
- The release generator requires `release-metadata/<version>.json` to exist for the release being generated.
