---
slug: /changelog-archive
---
<div class="page-wide">

# Changelog Archive

Historical release summaries for Finzly Connect APIs.

## [6.2.1.10] - 2026-02-06
- Fixed sender country code override for international USD wire payments.

## [6.2.1.9] - 2026-01-19
- Fixed wire validation logic to correctly validate `CorrespondentBankID` when `ReceiverBankID` is invalid.

## [6.2.1.8] - 2026-01-08
- Fixed validation to support accented and international characters in payment fields.

## [6.2.1.7] - 2025-12-31
- Improved bank lookup performance to reduce duplicate payment creation risk.

## [6.2.1.6] - 2025-12-24
- Added `/v5/payments/credit` endpoint with minimal upfront validations.
- Fixed postal code validation for leading zeros and broader valid character support.
- Relaxed address and sender country validation for specific Fedwire/NID scenarios.

## [6.2.1.5] - 2025-12-11
- Improved payment cancellation failure messaging.
- Relaxed wire special character restrictions per ISO allowance.
- Fixed API-to-Fedwire field mappings.

## [6.2.1.4] - 2025-12-09
- Removed incorrect Fedwire `$10M` upper limit validation.

## [6.2.1.0] - Planned
- Added Customer Lookup API support.
- Enhanced Return and Reverse Payment APIs with Fedwire support.

## [6.2.0.0] - Planned
- Added Bank Lookup API by BIC/IBAN/NID.
- Added Customer Account Sweeps API set (create/update/get/delete).
- Added bulk file operations APIs.
- Enhanced recurring payment update behavior for `until=Cancelled`.

## [6.1.2.0] - Planned
- Enhanced webhook payload with `additionalAttributes`.
- Improved recurring payment error structure.
- Fixed recurring `PayUntil` field behavior in Search Payments.

## [6.1.1.2] - 2024-09-05
- Enhanced `Get Payment` response with additional ISO receiver/intermediary bank details.

## [6.1.0.0] - 2024-07-11
- Added customer transaction limit API.
- Added Customer Account V3 APIs (create/update/get/search).
- Added ENR `$0` payment support.
- Introduced account-level field migration in V3 APIs (**action required** for create/update consumers).

</div>
