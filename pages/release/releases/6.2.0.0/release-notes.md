---
slug: /releases/6.2.0.0/release-notes
excludeFromSearch: true
sidebar:
  hide: true
---

<!-- AUTO-GENERATED SCAFFOLD: update this release note content -->

<div class="page-wide">

<a id="release-6-2-2-0"></a>
# Release Notes 6.2.2.0

Release date: **2026-02-22**
Release type: **GA**

## Release Summary
This release introduces LEI (Legal Entity Identifier) validation, comprehensive RTP-RFP support, enhanced instant payment capabilities, ACH Positive Pay improvements, unified payment rail validation, and various API enhancements. This release includes 10 new features, 2 UAT issue fixes, and 2 bug fixes, with several changes requiring client attention for account feature updates.

## Change Index

<div class="release-notes-table">

| **#** | **Change** | **Category** | **Impact** | **Breaking Changes** | **Description** | **Details** |
|:--|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| 1 | LEI Data Validation via Open API Integration | New Feature | All clients managing customers | None | Introduces Legal Entity Identifier (LEI) validation across Customer Creation, Update, and Search APIs to ensure compliance with ISO 17442 standards, improving data integrity and preventing duplicates. | [More ->](#lei-data-validation) |
| 2 | Introduction of RTP-RFP in API with Payments | New Feature | Clients using RTP and FedNow rails | None | Adds full OpenAPI support for Request for Payment (RFP) and Request for Information (RFI) workflows for RTP and FedNow rails, including new endpoints for approving/rejecting RFP and managing RFI. | [More ->](#rtp-rfp-api) |
| 3 | FedNow and RTP Payment Creation via API | New Feature | Clients using FedNow and RTP payments | None | Ensures FedNow and RTP payment initiation correctly validates account-level configurations for Send and RFP Send toggles, eliminating incorrect validation failures. | [More ->](#fednow-rtp-payment-creation) |
| 4 | ACH Positive Pay Changes | New Feature | Clients using ACH Positive Pay | **Required** | Moves the isAchPositivePay flag from Legal Entity level to Bank Account level for accurate representation of Positive Pay configurations, ensuring account-level control. | [More ->](#ach-positive-pay-changes) |
| 5 | Positive Rules for Instant Payments (RTP and FedNow) | New Feature | Clients using instant payment positive pay | None | Introduces unified Instant payment rail category for Request for Payment (RFP) to standardize Positive Rule configuration, grouping both RTP and FedNow under a single Instant rail. | [More ->](#positive-rules-instant-payments) |
| 6 | Positive Pay Exception Search Multi-Select Decision Type | New Feature | Clients using Positive Pay exception search | None | Enhances Positive Pay Exception Search to support multi-select decision type approach, allowing searches based on explicitly selected decision types for improved accuracy and flexibility. | [More ->](#positive-pay-multiselect) |
| 7 | Remittance Information for SWIFT Payments | New Feature | Clients processing SWIFT payments | None | Ensures remittance information provided through OpenAPI is correctly captured and displayed for SWIFT payments, delivering consistent remittance visibility across payment rails. | [More ->](#swift-remittance) |
| 8 | Unified Payment Rail and Account Feature Validation for ACH | New Feature | Clients using ACH payments | None | Enhances OpenAPI to support ACH payment rail enablement and validations similar to FedNow, RTP, and Fedwire, ensuring consistent behavior across all payment rails. | [More ->](#ach-payment-rail-validation) |
| 9 | Account Feature Changes (API) | Enhancement | Clients managing customer accounts | **Required** | Streamlines and aligns account feature attributes with latest FedNow and RTP requirements, removing deprecated fields and renaming others for consistency. | [More ->](#account-feature-changes) |
| 10 | Payment Webhook - API Specification Update | Bug Fix | All clients using payment webhooks | None | Aligns Payment Webhook specification in OpenAPI with actual webhook payload to ensure consistency and accuracy in the paymentReturnDetails structure for returned payments. | [More ->](#payment-webhook-spec-update) |
| 11 | Capture and Transmission of Creditor Agent Account Type Information | New Feature | Clients processing Fedwire ISO payments | None | Enables capture, validation, and transmission of Creditor Agent Account Type information for credit payments, allowing specification of IBAN or Other Identification for compliant Fedwire ISO message generation. | [More ->](#creditor-agent-account-type) |
| 12 | Incorrect Error Message When Accessing Unauthorized Payment | UAT Issue Fix | All clients using Get Payment API | None | Standardized error response for unauthorized payment access. API now returns consistent "Payment not found" message with code API900 when users attempt to access payments they are not permitted to view. | [More ->](#unauthorized-payment-error) |
| 13 | Cancel Payment from API throws an Error | UAT Issue Fix | All clients using payment cancellation | None | Fixed authorization error when cancelling payments via API. The API now correctly validates payment state and user authorization, ensuring consistent and accurate behavior for payment cancellation. | [More ->](#cancel-payment-authorization-fix) |
| 14 | Incorrect Payment Creation Date and Time | Bug Fix | All clients using payment APIs | None | Fixed incorrect payment creation date and time display in Payment Galaxy. Updated OpenAPI to include proper timezone information, ensuring timestamps display correctly in EST without time shifts. | [More ->](#payment-creation-datetime-fix) |

</div>

## Detailed Changes

<a id="lei-data-validation"></a>
### LEI Data Validation via Open API Integration
- **Category:** New Feature
- **Impact:** All clients managing customers
- **Breaking changes:** None
- **Details:** Introduces LEI validation across Customer Create, Update, and Search APIs to ensure ISO 17442 compliance, prevent duplicates, and improve data integrity.

<a id="rtp-rfp-api"></a>
### Introduction of RTP-RFP in API with Payments
- **Category:** New Feature
- **Impact:** Clients using RTP and FedNow rails
- **Breaking changes:** None
- **Details:** Adds OpenAPI support for RFP/RFI workflows across RTP and FedNow, including approvals/rejections and RFI management endpoints.

<a id="fednow-rtp-payment-creation"></a>
### FedNow and RTP Payment Creation via API
- **Category:** New Feature
- **Impact:** Clients using FedNow and RTP payments
- **Breaking changes:** None
- **Details:** Validates account-level Send and RFP Send configuration during payment initiation to eliminate incorrect validation failures.

<a id="ach-positive-pay-changes"></a>
### ACH Positive Pay Changes
- **Category:** New Feature
- **Impact:** Clients using ACH Positive Pay
- **Breaking changes:** Required
- **Details:** Moves `isAchPositivePay` from Legal Entity to Bank Account level for accurate account-level Positive Pay control.

<a id="positive-rules-instant-payments"></a>
### Positive Rules for Instant Payments (RTP and FedNow)
- **Category:** New Feature
- **Impact:** Clients using instant payment positive pay
- **Breaking changes:** None
- **Details:** Introduces a unified `Instant` rail category for RFP Positive Rules, grouping RTP and FedNow consistently.

<a id="positive-pay-multiselect"></a>
### Positive Pay Exception Search Multi-Select Decision Type
- **Category:** New Feature
- **Impact:** Clients using Positive Pay exception search
- **Breaking changes:** None
- **Details:** Supports multi-select decision type filtering for Positive Pay exception search to improve search flexibility and precision.

<a id="swift-remittance"></a>
### Remittance Information for SWIFT Payments
- **Category:** New Feature
- **Impact:** Clients processing SWIFT payments
- **Breaking changes:** None
- **Details:** Ensures remittance information is captured and displayed correctly for SWIFT payments initiated via OpenAPI.

<a id="ach-payment-rail-validation"></a>
### Unified Payment Rail and Account Feature Validation for ACH
- **Category:** New Feature
- **Impact:** Clients using ACH payments
- **Breaking changes:** None
- **Details:** Extends ACH rail enablement and validation behavior to align with FedNow, RTP, and Fedwire consistency.

<a id="account-feature-changes"></a>
### Account Feature Changes (API)
- **Category:** Enhancement
- **Impact:** Clients managing customer accounts
- **Breaking changes:** Required
- **Details:** Aligns account feature attributes with FedNow/RTP requirements, including renamed fields and deprecated field removal.

<a id="payment-webhook-spec-update"></a>
### Payment Webhook - API Specification Update
- **Category:** Bug Fix
- **Impact:** All clients using payment webhooks
- **Breaking changes:** None
- **Details:** Aligns OpenAPI webhook specification with actual payload structure for `paymentReturnDetails`.

<a id="creditor-agent-account-type"></a>
### Capture and Transmission of Creditor Agent Account Type Information
- **Category:** New Feature
- **Impact:** Clients processing Fedwire ISO payments
- **Breaking changes:** None
- **Details:** Adds support to capture and transmit creditor agent account type (IBAN/Others) for compliant Fedwire ISO generation.

<a id="unauthorized-payment-error"></a>
### Incorrect Error Message When Accessing Unauthorized Payment
- **Category:** UAT Issue Fix
- **Impact:** All clients using Get Payment API
- **Breaking changes:** None
- **Details:** Standardizes unauthorized payment access responses to return consistent `Payment not found` with code `API900`.

<a id="cancel-payment-authorization-fix"></a>
### Cancel Payment from API throws an Error
- **Category:** UAT Issue Fix
- **Impact:** All clients using payment cancellation
- **Breaking changes:** None
- **Details:** Fixes cancellation authorization behavior and aligns state/entitlement validation for consistent API outcomes.

<a id="payment-creation-datetime-fix"></a>
### Incorrect Payment Creation Date and Time
- **Category:** Bug Fix
- **Impact:** All clients using payment APIs
- **Breaking changes:** None
- **Details:** Adds timezone handling in OpenAPI `creationDateTime` so Payment Galaxy displays EST timestamps correctly without shifts.

---

[Back to Changelog](/changelog)

</div>
