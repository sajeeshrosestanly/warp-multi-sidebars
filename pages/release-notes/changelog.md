---
slug: /changelog
---

<div class="page-wide changelog-page">
<h1>Finzly Connect API Changelog</h1>

<p>Latest API updates, migration highlights, and high-level release summaries.</p>
<p>For full implementation details, API-level changes, and migration guidance, review the linked Release Notes for each version.</p>

<div class="changelog-highlight" role="region" aria-label="Latest release highlight">
  <p class="changelog-highlight-label">Latest release</p>
  <p class="changelog-highlight-version"><strong>6.2.2.0</strong> <span>2026-02-22</span></p>
  <div class="changelog-chip-row">
    <span class="changelog-chip">Added: 10</span>
    <span class="changelog-chip">Changed: 2</span>
    <span class="changelog-chip">Fixed: 4</span>
    <span class="changelog-chip chip-warn">Action required: 2</span>
  </div>
</div>

<div class="changelog-action-callout">
  <p><strong>Action required for some clients:</strong> account feature updates and ACH Positive Pay field migration.</p>
  <p>See full implementation notes in the linked Release Notes below.</p>
</div>

## [6.2.2.0] - 2026-02-22

### Summary
Introduces LEI validation, comprehensive RTP-RFP support, enhanced instant payment capabilities, ACH Positive Pay improvements, unified payment rail validation, and webhook/API consistency fixes.
For complete change-by-change details and migration guidance, see the full release notes.

**Read full details:** [Release Notes 6.2.2.0](./6.2.2.0.md)

### Added
- LEI validation across Customer Create/Update/Search APIs.
- RTP-RFP and RFI support for RTP and FedNow workflows.
- Instant payment validation and Positive Rule enhancements.
- SWIFT remittance capture and Creditor Agent Account Type support.

### Changed
- Account feature model aligned with current FedNow/RTP requirements. **Action required**.
- ACH Positive Pay moved from Legal Entity to Bank Account level. **Action required**.

### Fixed
- Payment webhook spec alignment for `paymentReturnDetails`.
- Unauthorized access and cancellation error behavior consistency.
- Payment creation timezone handling and timestamp correctness.

---

## Previous Releases

- **6.2.1.10 (2026-02-06):** Fixed sender country override issue for international USD wire.
- **6.2.1.9 (2026-01-19):** Fixed CorrespondentBankID/ReceiverBankID validation alignment.
- **6.2.1.8 (2026-01-08):** Fixed foreign/accented character handling in payment validation.
- **6.2.1.7 (2025-12-31):** Improved bank lookup performance and duplicate prevention.
- **6.2.1.6 (2025-12-24):** Added `/v5/payments/credit`; fixed postal/address/NID validations.
- **6.2.1.5 (2025-12-11):** Improved cancellation messaging; fixed wire characters and Fedwire mapping.
- **6.2.1.4 (2025-12-09):** Fixed Fedwire amount limit validation.
- **6.2.1.0, 6.2.0.0, 6.1.2.0, 6.1.1.2, 6.1.0.0:** available in archive.

**Browse older release summaries:** [Changelog Archive](./changelog-archive.md)

</div>
