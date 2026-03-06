# Finzly Connect API Changelog

<a id="release-6-2-2-0"></a>
## Release 6.2.2.0 — February 22, 2026

### Release Summary
This release introduces LEI (Legal Entity Identifier) validation, comprehensive RTP-RFP support, enhanced instant payment capabilities, ACH Positive Pay improvements, unified payment rail validation, and various API enhancements. This release includes 10 new features, 2 UAT issue fixes, and 2 bug fixes, with several changes requiring client attention for account feature updates.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| LEI Data Validation via Open API Integration | New Feature | All clients managing customers | None | Introduces Legal Entity Identifier (LEI) validation across Customer Creation, Update, and Search APIs to ensure compliance with ISO 17442 standards, improving data integrity and preventing duplicates. | [View Details →](#lei-data-validation) |
| Introduction of RTP-RFP in API with Payments | New Feature | Clients using RTP and FedNow rails | None | Adds full OpenAPI support for Request for Payment (RFP) and Request for Information (RFI) workflows for RTP and FedNow rails, including new endpoints for approving/rejecting RFP and managing RFI. | [View Details →](#rtp-rfp-api) |
| FedNow and RTP Payment Creation via API | New Feature | Clients using FedNow and RTP payments | None | Ensures FedNow and RTP payment initiation correctly validates account-level configurations for Send and RFP Send toggles, eliminating incorrect validation failures. | [View Details →](#fednow-rtp-payment-creation) |
| ACH Positive Pay Changes | New Feature | Clients using ACH Positive Pay | **Required** | Moves the isAchPositivePay flag from Legal Entity level to Bank Account level for accurate representation of Positive Pay configurations, ensuring account-level control. | [View Details →](#ach-positive-pay-changes) |
| Positive Rules for Instant Payments (RTP and FedNow) | New Feature | Clients using instant payment positive pay | None | Introduces unified Instant payment rail category for Request for Payment (RFP) to standardize Positive Rule configuration, grouping both RTP and FedNow under a single Instant rail. | [View Details →](#positive-rules-instant-payments) |
| Positive Pay Exception Search Multi-Select Decision Type | New Feature | Clients using Positive Pay exception search | None | Enhances Positive Pay Exception Search to support multi-select decision type approach, allowing searches based on explicitly selected decision types for improved accuracy and flexibility. | [View Details →](#positive-pay-multiselect) |
| Remittance Information for SWIFT Payments | New Feature | Clients processing SWIFT payments | None | Ensures remittance information provided through OpenAPI is correctly captured and displayed for SWIFT payments, delivering consistent remittance visibility across payment rails. | [View Details →](#swift-remittance) |
| Unified Payment Rail and Account Feature Validation for ACH | New Feature | Clients using ACH payments | None | Enhances OpenAPI to support ACH payment rail enablement and validations similar to FedNow, RTP, and Fedwire, ensuring consistent behavior across all payment rails. | [View Details →](#ach-payment-rail-validation) |
| Account Feature Changes (API) | Enhancement | Clients managing customer accounts | **Required** | Streamlines and aligns account feature attributes with latest FedNow and RTP requirements, removing deprecated fields and renaming others for consistency. | [View Details →](#account-feature-changes) |
| Payment Webhook - API Specification Update | Bug Fix | All clients using payment webhooks | None | Aligns Payment Webhook specification in OpenAPI with actual webhook payload to ensure consistency and accuracy in the paymentReturnDetails structure for returned payments. | [View Details →](#payment-webhook-spec-update) |
| Capture and Transmission of Creditor Agent Account Type Information | New Feature | Clients processing Fedwire ISO payments | None | Enables capture, validation, and transmission of Creditor Agent Account Type information for credit payments, allowing specification of IBAN or Other Identification for compliant Fedwire ISO message generation. | [View Details →](#creditor-agent-account-type) |
| Incorrect Error Message When Accessing Unauthorized Payment | UAT Issue Fix | All clients using Get Payment API | None | Standardized error response for unauthorized payment access. API now returns consistent "Payment not found" message with code API900 when users attempt to access payments they are not permitted to view. | [View Details →](#unauthorized-payment-error) |
| Cancel Payment from API throws an Error | UAT Issue Fix | All clients using payment cancellation | None | Fixed authorization error when cancelling payments via API. The API now correctly validates payment state and user authorization, ensuring consistent and accurate behavior for payment cancellation. | [View Details →](#cancel-payment-authorization-fix) |
| Incorrect Payment Creation Date and Time | Bug Fix | All clients using payment APIs | None | Fixed incorrect payment creation date and time display in Payment Galaxy. Updated OpenAPI to include proper timezone information, ensuring timestamps display correctly in EST without time shifts. | [View Details →](#payment-creation-datetime-fix) |

---

<a id="release-6-2-1-10"></a>
## Release 6.2.1.10 — February 6, 2026

### Release Summary
This release fixes an issue where sender country code was incorrectly overridden to US for international USD wire payments sent via OpenAPI. The system now correctly retains and persists the country code from the API payload.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| Sender Country is not Populated for International USD Transactions | UAT Issue Fix | Clients processing international USD wire payments | None | Fixed issue where sender country code was incorrectly overridden to US for international USD wire payments. The system now correctly retains and displays the country code from the API payload. | [View Details →](#sender-country-international-usd) |

---

<a id="release-6-2-1-9"></a>
## Release 6.2.1.9 — January 19, 2026

### Release Summary
This release fixes a functional inconsistency between OpenAPI and BankOS UI for wire payment creation. The OpenAPI validation logic has been aligned with BankOS UI behavior to correctly validate CorrespondentBankID when ReceiverBankID is invalid.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| Functional Inconsistency between API and BankOS UI | Production Issue Fix | Clients processing wire payments | None | Fixed validation logic to align OpenAPI behavior with BankOS UI. OpenAPI now validates CorrespondentBankID when ReceiverBankID is invalid, allowing payment creation when either bank ID is valid. | [View Details →](#correspondent-bank-validation-fix) |

---

<a id="release-6-2-1-8"></a>
## Release 6.2.1.8 — January 8, 2026

### Release Summary
This release fixes a production issue where payments were failing when receiver's bank or recipient names contained accented or foreign characters. The validation logic has been enhanced to support international character sets.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| Payments Failed due to Foreign Special Character | Production Issue Fix | All clients processing international payments | None | Fixed payment failures when receiver's bank or recipient name contained accented or foreign characters by enhancing regex validation to support international character sets. | [View Details →](#foreign-special-characters-fix) |

---

<a id="release-6-2-1-7"></a>
## Release 6.2.1.7 — December 31, 2025

### Release Summary
This release includes performance improvements to the bank lookup logic to prevent duplicate payment creation and improve overall payment processing efficiency.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| Bank Look Up Logic Performance Improvement | Enhancement | All clients processing payments | None | Performance improvements implemented in OpenAPI bank lookup logic to prevent duplicate payment creation and improve processing efficiency. | [View Details →](#bank-lookup-performance) |

---

<a id="release-6-2-1-6"></a>
## Release 6.2.1.6 — December 24, 2025

### Release Summary
This release introduces a new v5 credit payment API with minimal validations, fixes postal code validation issues, relaxes address field requirements, and improves sender country validation for NID-based payments.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| Introducing /v5/payments/credit API with Minimal Validations | Enhancement | All clients processing credit payments | Optional | New /v5/payments/credit API endpoint with relaxed validation checks, allowing payments to be created in the system with minimal upfront validation. | [View Details →](#v5-credit-api) |
| Postal Code Validation | Production Issue Fix | All clients processing payments | None | Fixed postal code validation to allow leading zeros and accept letters, numbers, spaces, and hyphens, preventing payment creation failures. | [View Details →](#postal-code-validation) |
| Address Field Validation | Production Issue Fix | Clients processing Fedwire and international payments | None | Removed mandatory enforcement of postal code and state for Fedwire and international payments, as they are not required for these payment types. | [View Details →](#address-field-validation) |
| Relax Sender Country Check for NID | Production Issue Fix | Clients processing Fedwire payments | None | Relaxed Bank ID country validation for NID-based payments, removing the requirement that sender address country must be US when Bank ID type is NID. | [View Details →](#sender-country-nid) |

---

<a id="release-6-2-1-5"></a>
## Release 6.2.1.5 — December 11, 2025

### Release Summary
This release improves payment cancellation error messages, relaxes restrictions on special characters in wire payments, and fixes incorrect API-to-Fedwire field mappings.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| Payment Cancellation Message through API | Change Request | All clients using payment cancellation | None | Enhanced payment cancellation API to return clear, descriptive status-based failure messages instead of generic error messages. | [View Details →](#payment-cancellation-message) |
| Relax Restriction on Special Characters | Production Issue Fix | Clients processing wire payments | None | Updated validation patterns to allow ISO-permitted special characters in wire-related fields, preventing payment creation failures. | [View Details →](#special-characters-wire) |
| Incorrect Mapping API to Fedwire | UAT Issue Fix | Clients processing Fedwire payments | None | Corrected API-to-Fedwire ISO field mappings to align with Fedwire ISO standards, fixing incorrect data placement in MT/ISO tags. | [View Details →](#api-fedwire-mapping) |

---

<a id="release-6-2-1-4"></a>
## Release 6.2.1.4 — December 9, 2025

### Release Summary
This release fixes a critical issue where Fedwire credit payments above $10 million were incorrectly rejected due to a hardcoded validation limit.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| Fedwire Credit Payment for above 10Million fails | Production Issue Fix | Clients processing large Fedwire payments | None | Removed hardcoded $10 million maximum amount restriction, allowing Fedwire payments up to $9,999,999,999.99 as per specification. | [View Details →](#fedwire-amount-limit) |

---

<a id="release-6-2-1-0"></a>
## Release 6.2.1.0 — [Release Date]

### Release Summary
This release introduces enhanced payment return and reversal capabilities with Fedwire support, along with a new customer lookup API. These updates provide greater flexibility in payment exception management and simplify customer information retrieval workflows.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| [Return Payment](https://api.finzly.io/openapi/paymentapi/operation/returnPayment/) | Enhancement | Clients processing Fedwire payments | None | The Return Payment API now supports Fedwire return codes, enabling streamlined payment exception management across payment rails. | [View Details →](#return-payment-fedwire) |
| [Reverse Payment](https://api.finzly.io/openapi/paymentapi/operation/reversePayment/) | Enhancement | Clients processing Fedwire payments | None | The Reverse Payment API now supports Fedwire reversal codes, providing consistent error recovery workflows across all payment types. | [View Details →](#reverse-payment-fedwire) |
| [Customer Lookup](https://api.finzly.io/openapi/customerapi/operation/getCustomerLookUp/) | New Feature | All clients | None | New API to lookup customer details using customer account number and account type, simplifying customer information retrieval workflows. | [View Details →](#customer-lookup) |

---

<a id="release-6-2-0-0"></a>
## Release 6.2.0.0 — [Release Date]

### Release Summary
This major release introduces comprehensive bank lookup capabilities, customer account sweep management APIs, enhanced bulk file operations, and improvements to recurring payment management.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| [Bank lookup API by BIC, IBAN and NID](https://api.finzly.io/openapi/paymentapi/operation/getbank/) | New Feature | All clients processing payments | None | New API to lookup bank details using BIC, IBAN or NID, enabling validation and routing information retrieval for domestic and international payments. | [View Details →](#bank-lookup) |
| [Create customer account sweeps](https://api.finzly.io/openapi/customerapi/operation/createCustomerAccountSweep/) | New Feature | Clients with cash management needs | None | Creates a sweep configuration for the specified account, enabling automated cash management operations. | [View Details →](#account-sweeps) |
| [Update customer account sweeps](https://api.finzly.io/openapi/customerapi/operation/updateCustomerAccountSweep/) | New Feature | Clients with cash management needs | None | Updates a sweep configuration for the specified account, allowing modification of existing sweep rules. | [View Details →](#account-sweeps) |
| [Get customer account sweeps](https://api.finzly.io/openapi/customerapi/operation/getCustomerAccountSweeps/) | New Feature | Clients with cash management needs | None | Retrieves the sweep configuration for the specified account, providing visibility into automated cash management settings. | [View Details →](#account-sweeps) |
| [Delete customer account sweeps](https://api.finzly.io/openapi/customerapi/operation/deleteCustomerAccountSweeps/) | New Feature | Clients with cash management needs | None | Deletes the sweep configuration for the specified account, allowing removal of automated cash management rules. | [View Details →](#account-sweeps) |
| [Search bulk files](https://api.finzly.io/openapi/paymentapi/operation/searchFiles/) | New Feature | Clients using bulk payment processing | None | Searches and retrieves bulk files based on specified criteria, improving visibility into bulk payment processing. | [View Details →](#bulk-file-operations) |
| [Get file transactions by file number](https://api.finzly.io/openapi/paymentapi/operation/getFilePayments/) | New Feature | Clients using bulk payment processing | None | Retrieves transactions associated with a specific bulk file number, enabling detailed reconciliation of bulk operations. | [View Details →](#bulk-file-operations) |
| [Update recurring payment](https://api.finzly.io/openapi/paymentapi/operation/updaterecurringpayment/) | Enhancement | Clients using recurring payments | None | Enhanced to support updating recurrence details when `until` is set to `Cancelled`, providing more flexible recurring payment management. | [View Details →](#update-recurring-payment) |

---

<a id="release-6-1-2-0"></a>
## Release 6.1.2.0 — [Release Date]

### Release Summary
This release focuses on improving payment search capabilities, enhancing webhook payloads with additional payment information, and providing better error handling for recurring payment operations.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| [Search Payments](https://api.finzly.io/openapi/paymentapi/operation/searchPayments/) | Bug Fix | Clients using recurring payments | None | Fixed `PayUntil` field to correctly return **Cancelled**, **EndDate**, or **NumberOfPayments** for recurring payments instead of `DEFAULT`. | [View Details →](#search-payments-fix) |
| [Payment Webhook](https://api.finzly.io/openapi/paymentwebhook/operation/notifyPaymentStatus/) | Enhancement | All clients using webhooks | Optional | Introduced new `additionalAttributes` field carrying supplementary payment information (e.g., batch details for waterfall payments). | [View Details →](#payment-webhook-enhancement) |
| [Recurring Payments](https://api.finzly.io/openapi/paymentapi/operation/skiprecurringpayment/) | Enhancement | Clients using recurring payment management | Recommended | Enhanced error handling to return comprehensive error codes and messages instead of plain string messages. | [View Details →](#recurring-payment-errors) |

---

<a id="release-6-1-1-2"></a>
## Release 6.1.1.2 — September 5, 2024

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| [Get Payment](https://api.finzly.io/openapi/paymentapi/operation/getPaymentByUID/) | Enhancement | Clients processing international payments | None | Enhanced with ISO support to include detailed receiver bank information along with intermediary receiver bank details in the payment response. | [View Details →](#get-payment-iso) |

---

<a id="release-6-1-0-0"></a>
## Release 6.1.0.0 — July 11, 2024

### Release Summary
This release introduces new customer account management APIs with enhanced payment rail features, customer transaction limit checking, and support for ENR $0 payments. **⚠️ Important**: Includes breaking changes for customer account field migration.

| **Change** | **Category** | **Impact** | **Action Required** | **Description** | **Details** |
|:-----------|:-------------|:-----------|:-------------------|:----------------|:------------|
| ENR $0 Payment Enhancement | Enhancement | Clients using ENR SEC codes | None | Enhanced credit payment API to support creation of $0 payments for ENR SEC code requests, enabling notification-only payment records. | [View Details →](#enr-payment) |
| [Customer transaction limit API](https://api.finzly.io/openapi/customerapi/operation/checkCustomerLimits/) | New Feature | All clients processing payments | None | Fetches customer's system-configured limits and checks if requested payment amount exceeds them during initiation. | [View Details →](#customer-limits) |
| [Create customer account V3](https://api.finzly.io/openapi/customerapi/operation/createCustomerAccountV3/) | New Feature | Clients managing customer accounts | **Required** | Create a customer account with specified payment rail features. **Note**: Fields migrated from Customer to Account level. | [View Details →](#customer-account-v3) |
| [Update customer account V3](https://api.finzly.io/openapi/customerapi/operation/updateCustomerAccountV3/) | New Feature | Clients managing customer accounts | **Required** | Update a customer account with specified payment rail features. **Note**: Fields migrated from Customer to Account level. | [View Details →](#customer-account-v3) |
| [Get customer account V3](https://api.finzly.io/openapi/customerapi/operation/getCustomerAccountByAccountUIDV3/) | New Feature | Clients managing customer accounts | Recommended | Retrieves details of a customer account by account UID with enhanced payment rail information. | [View Details →](#customer-account-v3) |
| [Search customer account V3](https://api.finzly.io/openapi/customerapi/operation/searchCustomerAccountsV3/) | New Feature | Clients managing customer accounts | Recommended | Searches and retrieves customer accounts based on specified payment rail and criteria. | [View Details →](#customer-account-v3) |

---

# Detailed Change Information

<a id="return-payment-fedwire"></a>
## Return Payment API - Fedwire Support
[← Back to Release 6.2.1.0](#release-6-2-1-0)

**Release**: 6.2.1.0  
**Category**: Enhancement  
**API**: [Return Payment](https://api.finzly.io/openapi/paymentapi/operation/returnPayment/)  
**Impact**: Clients processing Fedwire payments  
**Action Required**: None

### What Changed
The Return Payment API now supports Fedwire return codes in addition to existing ACH return code support. The API automatically handles the appropriate return code format based on the payment type.

### Client Benefit
- You can now return Fedwire payments directly through the API with proper return code handling
- Streamlines your payment exception management process across multiple payment rails
- Consistent API interface for both ACH and Fedwire returns

### Technical Details
- Fedwire return codes (R01-R99 series) are automatically handled when processing Fedwire payment returns
- The API detects the payment type and applies the correct return code format
- No changes required to your integration code

### Migration Notes
- Existing return payment workflows continue to work unchanged
- Fedwire return codes are automatically handled when returning Fedwire payments
- No changes required to your integration code

### Example Use Case
When a Fedwire payment needs to be returned due to an exception, you can now use the same Return Payment API that you use for ACH returns. The system automatically handles the Fedwire-specific return code format.

---

<a id="reverse-payment-fedwire"></a>
## Reverse Payment API - Fedwire Support
[← Back to Release 6.2.1.0](#release-6-2-1-0)

**Release**: 6.2.1.0  
**Category**: Enhancement  
**API**: [Reverse Payment](https://api.finzly.io/openapi/paymentapi/operation/reversePayment/)  
**Impact**: Clients processing Fedwire payments  
**Action Required**: None

### What Changed
The Reverse Payment API now supports Fedwire reversal codes, expanding beyond ACH reversals. The system automatically applies the correct reversal code format based on the payment rail.

### Client Benefit
- Complete payment reversal capabilities for both ACH and Fedwire payment types
- Consistent error recovery workflows across all payment rails
- Reduced need for manual intervention in payment reversals

### Technical Details
- Fedwire reversals now support standard Fedwire reversal codes
- Reversals are processed through the same unified API interface
- Existing ACH reversal functionality remains unchanged

### Migration Notes
- No changes required to existing reversal workflows
- Fedwire reversals use the same API endpoint with automatic code handling
- Existing ACH reversal functionality remains unchanged

### Example Use Case
If a Fedwire payment was created in error, you can now reverse it using the same Reverse Payment API, with the system automatically handling Fedwire-specific reversal codes.

---

<a id="customer-lookup"></a>
## Customer Lookup API
[← Back to Release 6.2.1.0](#release-6-2-1-0)

**Release**: 6.2.1.0  
**Category**: New Feature  
**API**: [Customer Lookup](https://api.finzly.io/openapi/customerapi/operation/getCustomerLookUp/)  
**Impact**: All clients  
**Action Required**: None

### What's New
A new API endpoint that allows you to retrieve customer details using just the customer account number and account type, without needing the full customer UID or complex search queries.

### Why It Matters
- Simplifies customer information retrieval workflows
- Especially useful when you only have account-level identifiers from transactions or other systems
- Reduces the need for multiple API calls or maintaining customer UID mappings

### Client Benefit
- More efficient and straightforward way to look up customer information
- Faster integration with systems that provide account numbers but not customer UIDs
- Better user experience in customer-facing applications

### Technical Details
- **API Endpoint**: `GET /v1/customer/lookup`
- **Required Parameters**: 
  - `accountNumber`: The customer account number
  - `accountType`: The type of account (e.g., Checking, Savings)
- **Response**: Returns full customer details including customer UID, name, contact information, and account details

### Example Use Cases
- When processing payment inquiries where you only have the account number
- When integrating with systems that provide account numbers but not customer UIDs
- When building customer-facing applications that need quick customer lookups
- When reconciling transactions that reference account numbers

### Code Example
```json
GET /v1/customer/lookup?accountNumber=123456789&accountType=Checking

Response:
{
  "customerUID": "CUST-12345",
  "customerName": "John Doe",
  "accountNumber": "123456789",
  "accountType": "Checking",
  "contactInfo": { ... }
}
```

---

<a id="bank-lookup"></a>
## Bank Lookup API
[← Back to Release 6.2.0.0](#release-6-2-0-0)

**Release**: 6.2.0.0  
**Category**: New Feature  
**API**: [Bank Lookup by BIC, IBAN and NID](https://api.finzly.io/openapi/paymentapi/operation/getbank/)  
**Impact**: All clients processing payments  
**Action Required**: None

### What's New
A new API that allows you to retrieve bank details using Bank Identifier Code (BIC), International Bank Account Number (IBAN), or National Identifier (NID). This provides comprehensive bank information lookup capabilities for both domestic and international payments.

### Why It Matters
- Validates bank information before payment submission
- Retrieves supported delivery methods for a given bank
- Reduces payment failures due to incorrect bank details
- Essential for international payment processing

### Client Benefit
- Improved payment validation and bank information retrieval
- Better error prevention through upfront validation
- Enhanced international payment processing capabilities

### Technical Details
- **API Endpoint**: `GET /v1/banks/{identifier}`
- **Supported Identifiers**: BIC, IBAN, or NID
- **Response**: Bank details including name, address, supported payment rails, and delivery methods

### Example Use Cases
- Validating recipient bank details before creating a payment
- Determining available payment rails for a specific bank
- International payment routing and validation
- Pre-flight checks before bulk payment submission

---

<a id="account-sweeps"></a>
## Customer Account Sweeps
[← Back to Release 6.2.0.0](#release-6-2-0-0)

**Release**: 6.2.0.0  
**Category**: New Feature  
**APIs**: 
- [Create Customer Account Sweep](https://api.finzly.io/openapi/customerapi/operation/createCustomerAccountSweep/)
- [Update Customer Account Sweep](https://api.finzly.io/openapi/customerapi/operation/updateCustomerAccountSweep/)
- [Get Customer Account Sweeps](https://api.finzly.io/openapi/customerapi/operation/getCustomerAccountSweeps/)
- [Delete Customer Account Sweeps](https://api.finzly.io/openapi/customerapi/operation/deleteCustomerAccountSweeps/)  
**Impact**: Clients with cash management needs  
**Action Required**: None

### What's New
A complete set of APIs for managing automatic account sweeps. Sweeps automatically transfer funds between accounts based on configured rules (e.g., zero-balance sweeps, target balance sweeps).

### Why It Matters
- Automates cash management operations
- Optimizes account balances across multiple accounts
- Reduces manual cash positioning work
- Enables sophisticated treasury management workflows

### Client Benefit
- Automated cash management without manual intervention
- Better cash utilization across accounts
- Reduced operational overhead
- Support for complex treasury management strategies

### Technical Details
- **Sweep Types Supported**:
  - Zero-balance sweeps
  - Target balance sweeps
  - Threshold-based sweeps
- **Configuration Options**: Source account, target account, sweep frequency, minimum/maximum amounts

### Example Use Cases
- Zero-balance account sweeps to consolidate cash
- Target balance maintenance across multiple accounts
- Automated cash concentration for investment accounts
- Automated funding of operating accounts

---

<a id="bulk-file-operations"></a>
## Bulk File Operations
[← Back to Release 6.2.0.0](#release-6-2-0-0)

**Release**: 6.2.0.0  
**Category**: New Feature  
**APIs**: 
- [Search Bulk Files](https://api.finzly.io/openapi/paymentapi/operation/searchFiles/)
- [Get File Transactions by File Number](https://api.finzly.io/openapi/paymentapi/operation/getFilePayments/)  
**Impact**: Clients using bulk payment processing  
**Action Required**: None

### What's New
- Search and retrieve bulk payment files based on various criteria (date range, status, file type, etc.)
- Retrieve all transactions associated with a specific bulk file number

### Why It Matters
- Better visibility into bulk payment processing
- Easier reconciliation of bulk file submissions
- Improved tracking and monitoring of batch operations

### Client Benefit
- Enhanced bulk file management and monitoring
- Simplified reconciliation processes
- Better operational visibility

### Example Use Cases
- Finding all bulk files submitted in a date range
- Retrieving transaction details for reconciliation
- Monitoring bulk file processing status
- Auditing bulk payment operations

---

<a id="update-recurring-payment"></a>
## Update Recurring Payment - Cancellation Support
[← Back to Release 6.2.0.0](#release-6-2-0-0)

**Release**: 6.2.0.0  
**Category**: Enhancement  
**API**: [Update Recurring Payment](https://api.finzly.io/openapi/paymentapi/operation/updaterecurringpayment/)  
**Impact**: Clients using recurring payments  
**Action Required**: None

### What Changed
The Update Recurring Payment API now supports updating recurrence details when the `until` field is set to `Cancelled`. Previously, cancellation required using a separate cancel API.

### Client Benefit
- More flexible recurring payment management
- Can update and cancel in a single operation
- Consistent API interface for all recurring payment modifications

### Migration Notes
- Existing cancel API continues to work
- New capability is optional - use whichever approach fits your workflow
- No changes required to existing integrations

---

<a id="search-payments-fix"></a>
## Search Payments - Recurring Payment Field Fix
[← Back to Release 6.1.2.0](#release-6-1-2-0)

**Release**: 6.1.2.0  
**Category**: Bug Fix  
**API**: [Search Payments](https://api.finzly.io/openapi/paymentapi/operation/searchPayments/)  
**Impact**: Clients using recurring payments and search functionality  
**Action Required**: None

### What Changed
Fixed the `PayUntil` field in search results to correctly return **Cancelled**, **EndDate**, or **NumberOfPayments** for recurring payments instead of the generic `DEFAULT` value.

### Client Benefit
- Accurate recurring payment status information in search results
- Better visibility into recurring payment configurations
- More reliable data for reporting and reconciliation

### Migration Notes
- This is a bug fix - existing code will now receive correct values
- If your code was handling `DEFAULT` as a special case, you may want to update it to handle the actual values

---

<a id="payment-webhook-enhancement"></a>
## Payment Webhook - Additional Attributes
[← Back to Release 6.1.2.0](#release-6-1-2-0)

**Release**: 6.1.2.0  
**Category**: Enhancement  
**API**: [Payment Webhook](https://api.finzly.io/openapi/paymentwebhook/operation/notifyPaymentStatus/)  
**Impact**: All clients using webhooks  
**Action Required**: Optional

### What Changed
The payment webhook now includes a new `additionalAttributes` field that carries supplementary information required for payment processing. This field is particularly useful for complex payment scenarios like waterfall payments.

### Client Benefit
- More complete payment information in webhook notifications
- Better context for payment processing decisions
- Enhanced visibility into payment relationships (e.g., batch associations)

### Technical Details
The `additionalAttributes` field is optional and may not be present for all payment types. For waterfall payments, this field contains associated payment batch details.

### Example Webhook Payload
```json
{
  "paymentUID": "PAY-12345",
  "status": "PROCESSED",
  "amount": 1000.00,
  "additionalAttributes": {
    "batchId": "BATCH123",
    "batchType": "waterfall",
    "batchSequence": 1
  }
}
```

### Migration Notes
- The new field is additive - existing webhook handlers continue to work
- The `additionalAttributes` field is optional and may not be present for all payment types
- Review and update webhook handlers if you want to use the new field

---

<a id="recurring-payment-errors"></a>
## Recurring Payment APIs - Enhanced Error Handling
[← Back to Release 6.1.2.0](#release-6-1-2-0)

**Release**: 6.1.2.0  
**Category**: Enhancement  
**APIs**: 
- [Skip Recurring Payment](https://api.finzly.io/openapi/paymentapi/operation/skiprecurringpayment/)
- Update Recurring Payment
- Cancel Recurring Payment  
**Impact**: Clients using recurring payment management APIs  
**Action Required**: Recommended

### What Changed
These APIs now return comprehensive error codes and error messages for failure scenarios, instead of plain string messages without error codes.

### Client Benefit
- Better error handling and debugging capabilities
- Programmatic error handling based on error codes
- Clearer insight into issues encountered during processing
- More consistent error response format across APIs

### Technical Details
Error responses now follow a structured format with `errorCode` and `errorMessage` fields. Previous string-only error messages are now part of the structured response.

### Example Error Response
```json
{
  "errorCode": "RECURRING_PAYMENT_NOT_FOUND",
  "errorMessage": "The specified recurring payment could not be found",
  "details": "Recurring payment with ID REC-12345 does not exist or has been deleted"
}
```

### Migration Notes
- Review and update your error handling logic to take advantage of error codes
- Error responses now follow a structured format
- Previous string-only error messages are now part of the structured response

---

<a id="get-payment-iso"></a>
## Get Payment - ISO Support
[← Back to Release 6.1.1.2](#release-6-1-1-2)

**Release**: 6.1.1.2  
**Category**: Enhancement  
**API**: [Get Payment](https://api.finzly.io/openapi/paymentapi/operation/getPaymentByUID/)  
**Impact**: Clients processing international payments  
**Action Required**: None

### What Changed
The Get Payment API has been enhanced with ISO support to include detailed receiver bank information along with intermediary receiver bank details in the payment response.

### Client Benefit
- More complete payment information for international payments
- Better visibility into payment routing details
- Enhanced reconciliation capabilities for cross-border transactions

---

<a id="enr-payment"></a>
## ENR $0 Payment Support
[← Back to Release 6.1.0.0](#release-6-1-0-0)

**Release**: 6.1.0.0  
**Category**: Enhancement  
**API**: Credit Payment API  
**Impact**: Clients using ENR SEC codes  
**Action Required**: None

### What Changed
Enhanced the credit payment API to support creation of $0 payments for ENR SEC code requests. This allows users to create credit payments with a zero-dollar amount.

### Client Benefit
- Supports ENR (Entry Notification Request) workflows
- Enables notification-only payment records
- Required for certain ACH notification scenarios

### Use Case
ENR payments are used to notify a receiver of an upcoming ACH debit. The $0 amount allows creating the notification record without an actual transfer.

---

<a id="customer-limits"></a>
## Customer Transaction Limit API
[← Back to Release 6.1.0.0](#release-6-1-0-0)

**Release**: 6.1.0.0  
**Category**: New Feature  
**API**: [Check Customer Limits](https://api.finzly.io/openapi/customerapi/operation/checkCustomerLimits/)  
**Impact**: All clients processing payments  
**Action Required**: None

### What's New
A new API that fetches the customer's system-configured transaction limits and checks if a requested payment amount exceeds those limits during payment initiation.

### Why It Matters
- Proactive limit checking before payment submission
- Reduces payment rejections due to limit violations
- Better user experience with upfront validation
- Enables limit-aware payment workflows

### Example Use Cases
- Pre-validating payment amounts in UI before submission
- Building limit-aware payment forms
- Providing real-time feedback to users about available limits

---

<a id="customer-account-v3"></a>
## Customer Account Management APIs V3
[← Back to Release 6.1.0.0](#release-6-1-0-0)

**Release**: 6.1.0.0  
**Category**: New Feature / Breaking Change  
**APIs**: 
- [Create Customer Account V3](https://api.finzly.io/openapi/customerapi/operation/createCustomerAccountV3/)
- [Update Customer Account V3](https://api.finzly.io/openapi/customerapi/operation/updateCustomerAccountV3/)
- [Get Customer Account V3](https://api.finzly.io/openapi/customerapi/operation/getCustomerAccountByAccountUIDV3/)
- [Search Customer Accounts V3](https://api.finzly.io/openapi/customerapi/operation/searchCustomerAccountsV3/)  
**Impact**: Clients managing customer accounts  
**Action Required**: **REQUIRED**

### What's New
Enhanced customer account management APIs that support payment rail-specific features. Each account can now be configured with specific payment rail capabilities (ACH, Fedwire, RTP, etc.).

### ⚠️ Breaking Change: Field Migration
The fields `achCompanyId` and `secCode` have been migrated from the Customer level to the Customer Account level. These fields are now account-specific rather than customer-wide.

### Previous Behavior
`achCompanyId` and `secCode` were stored at the customer level and applied to all accounts for that customer.

### New Behavior
Each customer account can now have its own `achCompanyId` and `secCode` values, allowing for more granular configuration.

### Migration Steps
1. Review all code that creates or updates customer accounts
2. Move `achCompanyId` and `secCode` from Customer object to Customer Account object
3. Update API calls to use V3 Customer Account APIs
4. Test with a non-production account first
5. Update any data mapping or configuration files

### Code Example - Before
```json
{
  "customer": {
    "achCompanyId": "123456789",
    "secCode": "CCD"
  },
  "account": {
    "accountNumber": "12345"
  }
}
```

### Code Example - After
```json
{
  "customer": {},
  "account": {
    "accountNumber": "12345",
    "achCompanyId": "123456789",
    "secCode": "CCD"
  }
}
```

### Timeline
- Effective immediately for new accounts created via V3 APIs
- Existing accounts: Migration completed automatically, but API calls must use new structure

---

<a id="lei-data-validation"></a>
## LEI Data Validation via Open API Integration
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**APIs**: 
- [Add Customer](https://api.finzly.io/openapi/customerapi/operation/addCustomer/)
- [Search Customers](https://api.finzly.io/openapi/customerapi/operation/searchCustomers/)
- [Get Customer](https://api.finzly.io/openapi/customerapi/operation/getCustomer/)
- [Update Customer](https://api.finzly.io/openapi/customerapi/operation/updateCustomer/)  
**Impact**: All clients managing customers  
**Action Required**: None  
**Jira**: COS-13590

### Overview
The enhancement introduces Legal Entity Identifier (LEI) validation across Customer Creation, Update, and Search APIs to ensure compliance with ISO 17442 standards. This improves data integrity, prevents duplicates, and aligns with regulatory requirements. LEI will also be included in Customer Search and Get Customer API responses for consistent downstream usage.

### Client Benefit
- Ensures compliance with ISO 17442 LEI standards
- Prevents duplicate LEI entries across Legal Entities
- Improves data integrity and regulatory compliance
- LEI included in Customer Search and Get Customer API responses for consistent downstream usage
- Maintains backward compatibility with existing integrations

### Detailed Explanation

#### 1. Platform-Level Validation
Added reusable LEI validator for comprehensive validation:

- **Format Check**: Must be a 20-character alphanumeric string
- **Checksum Validation**: Validate per ISO 17442 rules
- **Duplicate Check**: Ensure LEI is unique across Legal Entities
- **Error Messages**: Provided for invalid format, checksum failure, or duplicates

The validator ensures that all LEI values meet ISO 17442 standards before being stored in the system, preventing invalid or duplicate entries.

#### 2. OpenAPI Layer
- **No code changes required**: OpenAPI simply forwards LEI to Platform
- **Validation and error handling occur at Platform level**: All validation logic is centralized at the platform layer, ensuring consistent behavior across all API endpoints

#### 3. API Enhancements
- **Updated Customer Creation/Update APIs**: Now accept LEI as an optional field
- **Added LEI to Get Customer and Search Customer responses**: LEI is now included in API responses for downstream usage
- **Maintained backward compatibility**: Existing integrations continue to work without changes

#### 4. Documentation Updates
- Included LEI field requirements in API specifications
- Added validation rules and examples
- Documented error messages for various validation failure scenarios
- Updated API documentation to reflect LEI support

### Technical Implementation

#### Validation Rules
1. **Format Validation**: 
   - LEI must be exactly 20 characters
   - Must be alphanumeric (letters and numbers only)
   - Follows ISO 17442 format structure

2. **Checksum Validation**:
   - Validates checksum digits according to ISO 17442 algorithm
   - Ensures data integrity and prevents data entry errors

3. **Uniqueness Validation**:
   - Ensures LEI is unique across all Legal Entities
   - Prevents duplicate LEI assignments
   - Returns appropriate error if duplicate is detected

#### Error Handling
The system provides specific error messages for:
- Invalid format (not 20 characters or contains invalid characters)
- Checksum validation failure (does not pass ISO 17442 checksum algorithm)
- Duplicate LEI (LEI already exists for another Legal Entity)

### Migration Notes
- **No action required**: This is a backward-compatible enhancement
- LEI field is optional in Customer Creation/Update APIs
- Existing customers without LEI continue to function normally
- LEI can be added to existing customers via Update Customer API

### Example Use Cases
- Regulatory compliance reporting requiring LEI
- Financial institution customer onboarding with LEI validation
- Customer data enrichment with LEI information
- Cross-system integration using LEI as a unique identifier

---

<a id="rtp-rfp-api"></a>
## Introduction of RTP-RFP in API with Payments
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**APIs**: 
- [Create PositivePay Rule](https://api.finzly.io/openapi/paymentapi/operation/v3addPositiveRules/)
- [Update PositivePay Rule](https://api.finzly.io/openapi/paymentapi/operation/v3UpdatePositiveRules/)
- [Search PositivePay Rules](https://api.finzly.io/openapi/paymentapi/operation/v3SearchPositiveRules/)
- [Get PositivePay Rule By RuleUID](https://api.finzly.io/openapi/paymentapi/operation/v3GetPositiveRuleByRuleUID/)
- [Approve PositivePay Exception](https://api.finzly.io/openapi/paymentapi/operation/v3ApprovePositivePayException/)
- [Reject Positive Pay Exception](https://api.finzly.io/openapi/paymentapi/operation/v3RejectPositivePayException/)
- [Send RFI](https://api.finzly.io/openapi/paymentapi/operation/sendRFI/)
- [Get RFI History](https://api.finzly.io/openapi/paymentapi/operation/getRFIHistory/)
- [Initiate a Debit Payment](https://api.finzly.io/openapi/paymentapi/operation/v4debit/)  
**Impact**: Clients using RTP and FedNow rails  
**Action Required**: None  
**Jira**: COS-14060

### What's New
The enhancement adds full OpenAPI support for Request for Payment (RFP) and Request for Information (RFI) workflows for RTP and FedNow rails. It introduces new endpoints for approving/rejecting RFP, sending RFI, and retrieving RFI history.

### Client Benefit
- Complete API support for RFP/RFI lifecycle management for instant payment rails
- Secure, auditable, and consistent APIs for managing instant payment exceptions and inquiries
- Standardized error responses and authorization checks
- Robust validation and business rules enforcement

### Technical Details

#### New Endpoints
- Approve/Reject RFP for RTP and FedNow
- Send RFI for RTP and FedNow
- Get RFI history for RTP and FedNow

#### Validation & Business Rules
- Mandatory field checks
- Expiry checks
- Allow-modify flags validation
- Delivery method validation
- Aggregate error reporting for invalid payloads

#### Integration
- Connected to RTP/FedNow payment services for RFI submission and history retrieval
- Used MapStruct mappers to convert API DTOs to rail-specific formats

#### Error Handling & Authorization
- Standardized error responses (V4Error model)
- Enforced entitlement checks for all endpoints

---

<a id="fednow-rtp-payment-creation"></a>
## FedNow and RTP Payment Creation via API
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**APIs**: 
- [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)
- [Create Customer Account](https://api.finzly.io/openapi/customerapi/operation/createCustomerAccountV3/)  
**Impact**: Clients using FedNow and RTP payments  
**Action Required**: None  
**Jira**: COS-13962

### What's New
The implementation ensures that FedNow and RTP payment initiation via `/v3/payments/creditrequest` API correctly validates account-level configurations for Send and RFP Send toggles in Bank-OS (CRM → LE → Account).

### Client Benefit
- Authorized accounts can successfully initiate instant payments via API
- Eliminates false error responses and aligns with CRM configuration
- Improves accuracy, user experience, and compliance for instant payment workflows

### Technical Details

#### Updated Validation Logic
- API now checks Send and RFP Send flags at the account level in Bank-OS instead of outdated checks
- Ensures accurate entitlement verification for FedNow/RTP rails

#### Impact
- Authorized users can successfully create instant payments via API
- Eliminates incorrect validation failures
- Aligns with CRM configuration

---

<a id="ach-positive-pay-changes"></a>
## ACH Positive Pay Changes
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**APIs**: 
- [Create Customer Account](https://api.finzly.io/openapi/customerapi/operation/createCustomerAccountV3/)
- [Update Customer Account](https://api.finzly.io/openapi/customerapi/operation/updateCustomerAccountV3/)
- [Search Customer Accounts](https://api.finzly.io/openapi/customerapi/operation/searchCustomerAccountsV3/)
- [Get Customer Account](https://api.finzly.io/openapi/customerapi/operation/getCustomerAccountByAccountUIDV3/)
- [Add Customer](https://api.finzly.io/openapi/customerapi/operation/addCustomer/)
- [Update Customer](https://api.finzly.io/openapi/customerapi/operation/updateCustomer/)  
**Impact**: Clients using ACH Positive Pay  
**Action Required**: **REQUIRED** - Read isAchPositivePay from Bank Account instead of Legal Entity  
**Jira**: COS-13983

### What Changed
The ACH Positive Pay enhancement moves the `isAchPositivePay` flag from the Legal Entity level to the Bank Account level for accurate representation of Positive Pay configurations.

### Client Benefit
- Account-level control for ACH Positive Pay
- Improves data integrity and eliminates incorrect associations
- Better compliance for ACH Positive Pay configurations

### Technical Details

#### Data Model Changes
- Removed `isAchPositivePay` from LegalEntity and LegalEntityResponse
- Added `isAchPositivePay` to Bank Account model for account-level setup

#### API Updates
- All Bank Account search and retrieval APIs now return `isAchPositivePay`
- Downstream consumers must read this flag from Bank Account instead of Legal Entity

#### Backward Compatibility
- No breaking changes for Legal Entity APIs
- API specification is updated to reflect new field location

### Migration Notes
- **Action Required**: Update your code to read `isAchPositivePay` from Bank Account APIs instead of Legal Entity APIs
- The field is no longer available in Legal Entity responses
- All Bank Account APIs now include this field

---

<a id="positive-rules-instant-payments"></a>
## Positive Rules for Instant Payments (RTP and FedNow)
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**APIs**: 
- [Create PositivePay Rule](https://api.finzly.io/openapi/paymentapi/operation/v3addPositiveRules/)
- [Update PositivePay Rule](https://api.finzly.io/openapi/paymentapi/operation/v3UpdatePositiveRules/)
- [Get PositivePay Rule By RuleUID](https://api.finzly.io/openapi/paymentapi/operation/v3GetPositiveRuleByRuleUID/)
- [Search PositivePay Rules](https://api.finzly.io/openapi/paymentapi/operation/v3SearchPositiveRules/)
- [Approve PositivePay Exception](https://api.finzly.io/openapi/paymentapi/operation/v3ApprovePositivePayException/)
- [Reject Positive Pay Exception](https://api.finzly.io/openapi/paymentapi/operation/v3RejectPositivePayException/)  
**Impact**: Clients using instant payment positive pay  
**Action Required**: None  
**Jira**: COS-14312

### What's New
A unified Instant payment rail category was introduced for Request for Payment (RFP) to standardize Positive Rule configuration in Open API. Instead of treating RTP and FedNow separately, both rails are now grouped under a single Instant rail for all RFP-related Positive Pay rules.

### Client Benefit
- Simplified configuration with unified Instant rail category
- Consistent rule evaluation for instant payments
- Positive Rules configured for Instant automatically apply to both RTP and FedNow RFP transactions

### Technical Details
- All RFP-related Positive Rules now record the payment rail as "Instant"
- Both RTP and FedNow are mapped to this unified Instant category
- Updated Open API operations to support the unified Instant rail
- Positive Rules configured for Instant automatically apply to both RTP and FedNow RFP transactions
- Existing functionality remains backward compatible

---

<a id="positive-pay-multiselect"></a>
## Positive Pay Exception Search Multi-Select Decision Type
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**API**: [Search PositivePay Exceptions](https://api.finzly.io/openapi/paymentapi/operation/v3SearchPositivePayExceptions/)  
**Impact**: Clients using Positive Pay exception search  
**Action Required**: None  
**Jira**: COS-14261

### What's New
The Positive Pay Exception Search is enhanced to support a new Multi-Select Decision Type approach. This update aligns the API behavior with recent UI changes, allowing the system to search exceptions based only on explicitly selected decision types.

### Client Benefit
- Improved accuracy and flexibility in exception searches
- Consistent behavior across CashOS and OpenAPI
- More precise searches that avoid unnecessary filters

### Technical Details
- The Positive Pay Exception Search API is updated to support multiple decision values in a single request
- The query logic now uses the IN operator, instead of only EQUAL / NOT EQUAL, to handle multi-select inputs
- When no decision type is provided, the API applies default filtering to maintain backward compatibility
- The API now fully supports the UI's multi-select decision type behavior

---

<a id="swift-remittance"></a>
## Remittance Information for SWIFT Payments
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing SWIFT payments  
**Action Required**: None  
**Jira**: COS-14215

### What's New
This enhancement ensures that remittance information provided through OpenAPI is correctly captured and displayed for SWIFT payments. The update delivers consistent remittance visibility across payment rails when payments are initiated via OpenAPI.

### Client Benefit
- Consistent remittance visibility across payment rails
- Proper remittance information in SWIFT XML messages
- Remittance notes visible in Bank-OS UI

### Technical Details

#### Updated Payment Processing Logic
- Accept remittance details for SWIFT payments only through the correct nested structure under `swiftMXDetails` in the Payment DTO
- Properly map the remittance information to unstructured remittance fields in the SWIFT message

#### Mapping
- Correct mapping to SWIFT XML
- Correct mapping to Bank-OS UI

#### Validation
- Enforced a 140-character limit for remittance notes
- Returned appropriate error codes when the limit is exceeded

---

<a id="ach-payment-rail-validation"></a>
## Unified Payment Rail and Account Feature Validation for ACH
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**APIs**: 
- [Create Customer Account](https://api.finzly.io/openapi/customerapi/operation/createCustomerAccountV3/)
- [Update Customer Account](https://api.finzly.io/openapi/customerapi/operation/updateCustomerAccountV3/)
- [Get Customer Account](https://api.finzly.io/openapi/customerapi/operation/getCustomerAccountByAccountUIDV3/)
- [Search Customer Accounts](https://api.finzly.io/openapi/customerapi/operation/searchCustomerAccountsV3/)
- [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)
- [Initiate a Debit Payment](https://api.finzly.io/openapi/paymentapi/operation/v4debit/)  
**Impact**: Clients using ACH payments  
**Action Required**: None  
**Jira**: COS-12880

### What's New
The OpenAPI is enhanced to support ACH payment rail enablement and validations similar to the implementation done for FedNow, RTP, and Fedwire. To support bank requirements and ensure consistent behavior across all payment rails, ACH needed to be incorporated into the same validation framework.

### Client Benefit
- Consistent validation behavior across all payment rails
- Account-level control for ACH payment rail enablement
- Improved compliance and configuration management

### Technical Details

#### ACH Payment Rail Validation Added to OpenAPI
The OpenAPI create credit/debit payment flow was enhanced to:
- Validate the ACH payment rail is enabled at the account level
- Reject ACH payments if the rail is not permitted for that specific account
- Ensure validation logic consistent with other rails (FedNow, RTP, and Fedwire)

#### Account API Enhanced to Control ACH Payment Rails
The Account API (create, update) is updated to allow:
- Enabling/disabling ACH at the account level
- Returning ACH payment rail status in account search responses
- Maintaining consistency with how other rails (FedNow, RTP, and Fedwire) are controlled

---

<a id="account-feature-changes"></a>
## Account Feature Changes (API)
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: Enhancement  
**APIs**: 
- [Create Customer Account](https://api.finzly.io/openapi/customerapi/operation/createCustomerAccountV3/)
- [Update Customer Account](https://api.finzly.io/openapi/customerapi/operation/updateCustomerAccountV3/)
- [Get Customer Account](https://api.finzly.io/openapi/customerapi/operation/getCustomerAccountByAccountUIDV3/)
- [Search Customer Accounts](https://api.finzly.io/openapi/customerapi/operation/searchCustomerAccountsV3/)  
**Impact**: Clients managing customer accounts  
**Action Required**: **REQUIRED** - Update code to use new field names and remove references to deleted fields  
**Jira**: COS-13911

### What Changed
The Account Feature has been enhanced in OpenAPI to streamline and align account feature attributes with latest FedNow and RTP requirements.

### Previous Behavior
The API included fields like `fednowRfpReceive`, `rtpReceiveOnly`, `fednowReceiveOnly`, `fednowSendAndReceive`, and `rtpSendAndReceive`.

### New Behavior

#### Removed Fields
The following fields have been deleted and will no longer be included in API responses:
- `fednowRfpReceive`
- `rtpReceiveOnly`
- `fednowReceiveOnly`

Any existing data for these fields will no longer be available.

#### Renamed Fields
Field names have been updated as below:

| Previous Field Name | Updated Field Name |
|:-------------------|:------------------|
| `fednowSendAndReceive` | `fednowSend` |
| `rtpSendAndReceive` | `rtpSend` |

Data remains available but under the new field names.

### Migration Notes
- **Action Required**: Update your code to use the new field names
- Remove references to deleted fields: `fednowRfpReceive`, `rtpReceiveOnly`, `fednowReceiveOnly`
- Update field references:
  - `fednowSendAndReceive` → `fednowSend`
  - `rtpSendAndReceive` → `rtpSend`

---

<a id="payment-webhook-spec-update"></a>
## Payment Webhook - API Specification Update
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: Bug Fix  
**API**: [Payment Webhook](https://api.finzly.io/openapi/paymentwebhook/operation/notifyPaymentStatus/)  
**Impact**: All clients using payment webhooks  
**Action Required**: None  
**Jira**: COS-14127

### Issue
There was a mismatch between the OpenAPI documentation and the actual webhook payload sent by the Notification service for the field `paymentReturnDetails`.

### Fix
This issue has been resolved. The Payment Webhook specification in OpenAPI has been aligned with the actual webhook payload to ensure consistency and accuracy in the `paymentReturnDetails` structure, specifically for returned payments.

### Technical Details
The `paymentReturnDetails` object now correctly documents the `returnDate` field with:
- Proper naming (`returnDate`)
- Correct data type (string <date>)
- Expected format (yyyy-mm-dd)

The API specification now fully matches the webhook payload generated by the Notification application.

### Client Benefit
- Accurate API documentation matching actual webhook payloads
- Consistent data structure for returned payments
- Improved reliability for webhook integrations

---

<a id="creditor-agent-account-type"></a>
## Capture and Transmission of Creditor Agent Account Type Information
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: New Feature  
**APIs**: 
- [Initiate a Credit Payment - v5](https://api.finzly.io/openapi/paymentapi/operation/v5credit/)
- [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing Fedwire ISO payments  
**Action Required**: None  
**Jira**: COS-14693

### Overview
This feature enables capture, validation, and transmission of Creditor Agent Account Type information for credit payments through the Create Payment OpenAPI and Payment Galaxy UI. It allows users to specify whether the creditor agent account is an IBAN or Other Identification, ensuring accurate representation and compliant message generation for Fedwire ISO payments.

### What's New

#### New Fields Introduced (Receiver Bank object – Credit Payments)
- **accountNumber**: Supports up to 34 characters and can carry an IBAN or other account identifiers
- **accountType**: Supported values are `IBAN` or `Others`

### Client Benefit
- Accurate representation of creditor agent account information in Fedwire ISO messages
- Support for both IBAN and other account identifier formats
- Compliant message generation for international payments
- Enhanced data capture capabilities for payment processing

### Technical Details

#### UI & API Support
- Users can capture the Creditor Agent Account Type and Account Number via Payment Galaxy UI and Create Payment OpenAPI

#### ISO Mapping Logic
The fields are mapped under the Creditor Instructed Agent in the ISO message. In FedwireISOMessage, a new `creditorAgentAccount` of type `CashAccount` is populated.

**Mapping behavior**:
- If `accountType = IBAN` → populate `CashAccount.iBan`
- If `accountType = Others` → populate `CashAccount.identification`

### Migration Notes
- **No action required**: This is a new feature with optional fields
- Existing payment workflows continue to work without these fields
- New fields can be added to payment requests when creditor agent account information is available

---

<a id="unauthorized-payment-error"></a>
## Incorrect Error Message When Accessing Unauthorized Payment
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: UAT Issue Fix  
**APIs**: 
- [Get Payment](https://api.finzly.io/openapi/paymentapi/operation/getPaymentByUID/)
- [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)
- [Initiate a Credit Payment - v3](https://api.finzly.io/openapi/paymentapi/operation/v3credit/)  
**Impact**: All clients using Get Payment API  
**Action Required**: None  
**Jira**: COS-14641

### Issue
When fetching payment details via the Get Payment API for a payment created/originated by another user, the API returned inconsistent and unclear error responses such as:
- `500 – API900` (Failed to complete the task)
- `403 – PAYMENT_ACCESS_DENIED`

The requirement was to standardize and improve the error response to provide clearer messaging when the payment is not accessible to the requesting user.

### Fix
This issue has been resolved. Updated the API response to return a standardized error message:
- **Message**: "Payment not found"
- **Code**: `API900`

Ensured proper authorization handling when users attempt to access payments they are not permitted to view.

### Client Benefit
- Consistent and clear error messaging for unauthorized payment access
- Standardized error response format across all scenarios
- Better error handling and user experience
- Improved debugging capabilities with clear error codes

### Technical Details
- Standardized error response for unauthorized payment access attempts
- Error message: "Payment not found" with code `API900`
- Proper authorization checks aligned with entitlement rules
- Consistent behavior across all payment access scenarios

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing error handling code will now receive consistent error messages
- Error response format is standardized for better integration handling

---

<a id="cancel-payment-authorization-fix"></a>
## Cancel Payment from API throws an Error
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: UAT Issue Fix  
**API**: [Cancel Payment](https://api.finzly.io/openapi/paymentapi/operation/cancelPayment/)  
**Impact**: All clients using payment cancellation  
**Action Required**: None  
**Jira**: COS-14662

### Issue
Cancel Payment API was incorrectly returning an authorization error: "You are not authorized to cancel the payment" when attempting to cancel payment via API, even for valid and entitled requests. This prevented successful cancellation and caused confusion for API consumers.

### Fix
The API cancel-payment logic has been corrected to properly validate payment state and user authorization. The API now correctly handles already-cancelled payments and returns an appropriate response. Authorization checks have been aligned with entitlement rules, ensuring consistent and accurate behavior when cancelling payments via API.

### Client Benefit
- Correct authorization validation for payment cancellation
- Successful cancellation for valid and entitled requests
- Proper handling of already-cancelled payments
- Consistent and accurate API behavior

### Technical Details
- Fixed authorization validation logic in cancel payment API
- Proper payment state validation before cancellation
- Aligned authorization checks with entitlement rules
- Correct handling of edge cases (e.g., already-cancelled payments)

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing cancellation workflows continue to work
- Valid cancellation requests will now succeed without authorization errors
- No changes needed to client integration code

---

<a id="payment-creation-datetime-fix"></a>
## Incorrect Payment Creation Date and Time
[← Back to Release 6.2.2.0](#release-6-2-2-0)

**Release**: 6.2.2.0  
**Category**: Bug Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: All clients using payment APIs  
**Action Required**: None  
**Jira**: COS-14675

### Issue
For API-initiated payments, the Creation Date & Time in Payment Galaxy was displayed incorrectly. Although the payment was created at 10:53 AM EST, Payment Galaxy showed the time shifted due to UTC interpretation, while still labeling it as EST.

### Fix
This issue has been resolved. Updated the OpenAPI to include proper timezone information in the `creationDateTime` field, ensuring Payment Galaxy correctly interprets and displays the time in EST. The fix ensures that payment creation timestamps now display correctly in EST without time shifts.

### Client Benefit
- Accurate payment creation timestamps displayed in Payment Galaxy
- Correct timezone handling for payment creation dates
- Eliminates confusion from time shifts
- Improved data accuracy for payment records

### Technical Details
- Updated OpenAPI to include proper timezone information in `creationDateTime` field
- Payment Galaxy now correctly interprets and displays timestamps in EST
- Fixed UTC interpretation issue that caused time shifts
- Consistent timezone handling across the system

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payment records continue to work as before
- New payments will display correct creation timestamps
- No changes needed to client integration code

---

<a id="sender-country-international-usd"></a>
## Sender Country is not Populated for International USD Transactions
[← Back to Release 6.2.1.10](#release-6-2-1-10)

**Release**: 6.2.1.10  
**Category**: UAT Issue Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing international USD wire payments  
**Action Required**: None  
**Jira**: COS-14706, TKT-18246

### Issue
For outgoing USD wire payments sent via OpenAPI, the sender's international country code (e.g., IL – Israel) was being incorrectly updated to US. Even though the API payload contained the correct non-US country code, Finzly was overriding it to US, resulting in incorrect sender address data being stored and displayed.

### Fix
This issue has been resolved. Updated the handling of sender address details so that the country code sent in the API payload is retained and persisted correctly, without being overridden to US.

Additionally:
- When the property `PYMT_OUT_OVERRIDE_SENDERINFO_CHANNELS` is not enabled for API, the sender country code from the payload is displayed correctly in Payment Galaxy.
- If the property is enabled, the system displays the configured account address details correctly.

### Client Benefit
- Correct sender country code is now retained for international USD wire payments
- Accurate sender address data stored and displayed in the system
- Eliminates incorrect country code override to US
- Improved data integrity for international payment processing

### Technical Details
- Updated sender address handling to preserve country code from API payload
- Country code is no longer overridden to US for international USD transactions
- Behavior depends on `PYMT_OUT_OVERRIDE_SENDERINFO_CHANNELS` property:
  - **Property disabled**: Sender country code from API payload is used and displayed
  - **Property enabled**: Configured account address details are displayed

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payment workflows continue to work as before
- International USD wire payments will now correctly retain the sender country code from the API payload
- No changes needed to client integration code

---

<a id="correspondent-bank-validation-fix"></a>
## Functional Inconsistency between API and BankOS UI
[← Back to Release 6.2.1.9](#release-6-2-1-9)

**Release**: 6.2.1.9  
**Category**: Production Issue Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing wire payments  
**Action Required**: None  
**Jira**: COS-14578, TKT-18046

### Issue
There was a mismatch between UI and OpenAPI behavior for wire payment creation. While the UI correctly allowed payment creation when a valid CorrespondentBankID was provided, the OpenAPI incorrectly validated only the ReceiverBankID (ABA). If the ReceiverBankID was invalid, the API rejected the payment even when a valid CorrespondentBankID existed, causing functional inconsistency.

### Fix
This issue has been resolved. The OpenAPI validation logic has been aligned with BankOS UI behavior.

The OpenAPI now:
- Validates the CorrespondentBankID when the ReceiverBankID (ABA) is invalid
- Allows payment creation if the CorrespondentBankID is valid
- Rejects payment creation only when both ReceiverBankID and CorrespondentBankID are invalid

### Client Benefit
- Consistent behavior between OpenAPI and BankOS UI for wire payment creation
- Payments can be created successfully when CorrespondentBankID is valid, even if ReceiverBankID is invalid
- Eliminates functional inconsistency that caused payment creation failures
- Improved reliability for wire payment processing workflows

### Technical Details
- Updated OpenAPI validation logic to check CorrespondentBankID when ReceiverBankID validation fails
- Validation now follows the same logic as BankOS UI
- Payment creation succeeds if either ReceiverBankID or CorrespondentBankID is valid
- Payment creation fails only when both bank identifiers are invalid

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payment workflows continue to work as before
- Payments that previously failed due to invalid ReceiverBankID will now succeed if CorrespondentBankID is valid
- No changes needed to client integration code

---

<a id="foreign-special-characters-fix"></a>
## Payments Failed due to Foreign Special Character
[← Back to Release 6.2.1.8](#release-6-2-1-8)

**Release**: 6.2.1.8  
**Category**: Production Issue Fix  
**APIs**: 
- [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)
- [Initiate a Debit Payment](https://api.finzly.io/openapi/paymentapi/operation/v4debit/)  
**Impact**: All clients processing international payments  
**Action Required**: None  
**Jira**: COS-14500

### Issue
Payments failed when the receiver's bank or recipient name contained accented or foreign characters. The existing validation logic allowed only standard English alphabets, causing transactions with special or accented characters to be rejected.

### Fix
This issue has been resolved. The Open API Input validation has been updated by enhancing the regex pattern to allow accented and foreign characters in receiver or bank name fields.

### Technical Details

#### Updated Validation Pattern
The regex pattern has been enhanced to support international character sets:
```
^[\p{L}\p{N} .,&@%#/'"*!~=^_{}\[\];$|()+?:-]+$
```

This pattern now allows:
- **Unicode Letters** (`\p{L}`): Supports all Unicode letter characters including accented characters (é, ñ, ü, etc.)
- **Unicode Numbers** (`\p{N}`): Supports all Unicode numeric characters
- **Special Characters**: Standard punctuation and symbols commonly used in names and addresses

#### What Changed
- **Previous Behavior**: Only standard English alphabets (A-Z, a-z) were allowed
- **New Behavior**: All Unicode letters, including accented and foreign characters, are now accepted
- **Validation**: Enhanced regex pattern validates receiver names and bank names with international character support

### Client Benefit
- Payments can now be successfully created when receiver or bank names include special or accented characters
- Improved support for international payments with non-English names
- Eliminates payment rejections due to character encoding issues
- Better user experience for clients processing global transactions

### Examples of Now-Supported Characters
- Accented characters: é, è, ê, ñ, ü, ö, ç, etc.
- International characters: Chinese, Japanese, Arabic, Cyrillic, etc.
- Special punctuation: &, @, %, #, /, ', ", *, etc.

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payments with standard English characters continue to work as before
- Payments that previously failed due to special characters will now succeed
- No changes needed to client integration code

---

<a id="bank-lookup-performance"></a>
## Bank Look Up Logic Performance Improvement
[← Back to Release 6.2.1.7](#release-6-2-1-7)

**Release**: 6.2.1.7  
**Category**: Enhancement  
**APIs**: 
- [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)
- [Initiate a Debit Payment](https://api.finzly.io/openapi/paymentapi/operation/v4debit/)  
**Impact**: All clients processing payments  
**Action Required**: None  
**Jira**: COS-14440

### Overview
A performance issue was identified in the OpenAPI bank lookup logic, which led to duplicate payment creation. Performance improvements have been implemented to resolve this issue.

### Payment Creation Behavior
If the Open API does not complete pre-processing of the payment request within 50 seconds, the payment will not be created. In such cases, the application will return an error response. This helps prevent duplicate payment creation in the event of a gateway timeout.

### Client Benefit
- Prevents duplicate payment creation
- Improved payment processing performance
- Better timeout handling to avoid duplicate transactions
- More reliable payment creation workflow

### Technical Details
- Performance improvements implemented in bank lookup logic
- 50-second timeout for payment pre-processing
- Error response returned if processing exceeds timeout
- Prevents duplicate payments from gateway timeouts

### Migration Notes
- **No action required**: This is a performance improvement
- Existing payment workflows continue to work as before
- Improved performance should result in faster payment processing

---

<a id="v5-credit-api"></a>
## Introducing /v5/payments/credit API with Minimal Validations
[← Back to Release 6.2.1.6](#release-6-2-1-6)

**Release**: 6.2.1.6  
**Category**: Enhancement  
**API**: [Initiate a Credit Payment - v5](https://api.finzly.io/openapi/paymentapi/operation/v5credit/)  
**Impact**: All clients processing credit payments  
**Action Required**: Optional - Consider using v5 API for flexible payment creation  
**Jira**: COS-14411

### Overview
A new `/v5/payments/credit` API endpoint has been introduced, where most validation checks are relaxed to allow payments to be created in the system. Clients that prefer a fail-fast approach should continue using the v4 endpoint, while those that prefer to fail later may use this new endpoint to create credit payments.

### Client Benefit
- Flexible payment creation with minimal upfront validation
- Option to defer validation errors until later in the process
- Better control over when validation failures occur
- Suitable for clients who want to create payments quickly and handle errors downstream

### Technical Details
- New v5 endpoint with relaxed validation rules
- Most validation checks are deferred
- Payments can be created and moved to repairable state if needed
- v4 endpoint remains available for fail-fast validation approach

### When to Use v5 vs v4
- **Use v5**: When you want to create payments quickly and handle validation errors later
- **Use v4**: When you want immediate validation feedback (fail-fast approach)

### Migration Notes
- **Optional**: This is a new endpoint, existing v4 API continues to work
- Clients can choose to migrate to v5 if they prefer deferred validation
- Both v4 and v5 endpoints are available

---

<a id="postal-code-validation"></a>
## Postal Code Validation
[← Back to Release 6.2.1.6](#release-6-2-1-6)

**Release**: 6.2.1.6  
**Category**: Production Issue Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: All clients processing payments  
**Action Required**: None  
**Jira**: COS-14411

### Issue
The system was not accepting postal codes with all zero digits, which blocked some payment creations via Open API.

### Fix
The postal code validation has been updated to allow leading zeros and to accept only letters (A–Z, a–z), numbers (0–9), spaces, and hyphens, as defined by the regex pattern `^[A-Za-z0-9 -]*$`.

### Client Benefit
- Postal codes with leading zeros are now accepted
- Payments no longer fail due to postal code format issues
- Supports international postal code formats
- Improved payment creation success rate

### Technical Details
- Updated regex pattern: `^[A-Za-z0-9 -]*$`
- Allows leading zeros in postal codes
- Accepts letters, numbers, spaces, and hyphens only
- Removed restrictions that blocked valid postal codes

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payments continue to work as before
- Payments that previously failed due to postal code validation will now succeed

---

<a id="address-field-validation"></a>
## Address Field Validation
[← Back to Release 6.2.1.6](#release-6-2-1-6)

**Release**: 6.2.1.6  
**Category**: Production Issue Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing Fedwire and international payments  
**Action Required**: None  
**Jira**: COS-14411

### Issue
The system was enforcing postal code and state as mandatory, even though they are not required for Fedwire and international payments.

### Fix
The system was updated to remove the mandatory enforcement of postal code and state, as they are not required for wire and international payments.

### Client Benefit
- Fedwire and international payments no longer require postal code and state
- Reduced payment creation failures for wire and international payments
- Aligned with payment rail requirements
- Improved flexibility for international transactions

### Technical Details
- Removed mandatory validation for postal code in Fedwire payments
- Removed mandatory validation for state in Fedwire payments
- Removed mandatory validation for postal code in international payments
- Removed mandatory validation for state in international payments
- These fields remain optional and can still be provided if available

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payments continue to work as before
- Payments that previously failed due to missing postal code/state will now succeed for wire and international payments

---

<a id="sender-country-nid"></a>
## Relax Sender Country Check for NID
[← Back to Release 6.2.1.6](#release-6-2-1-6)

**Release**: 6.2.1.6  
**Category**: Production Issue Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing Fedwire payments  
**Action Required**: None  
**Jira**: COS-14408, TKT-17771

### Issue
The system enforces a rule where, if the sender country is the US, the sender address country is also expected to be the US. This validation was blocking Fedwire payments.

### Fix
This issue has been resolved. The Bank ID country validation has been relaxed for OpenAPI Payments. When the Bank ID type is NID, the system no longer enforces the rule that the sender address country must be the US.

### Client Benefit
- Fedwire payments with NID Bank ID type no longer blocked by country validation
- More flexible address validation for domestic payments
- Improved payment creation success rate for Fedwire transactions
- Better support for various address configurations

### Technical Details
- Relaxed validation when Bank ID type is NID
- Removed requirement that sender address country must match sender country
- Validation still applies for other Bank ID types
- Maintains data integrity while allowing necessary flexibility

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payments continue to work as before
- Payments that previously failed due to country validation will now succeed

---

<a id="payment-cancellation-message"></a>
## Payment Cancellation Message through API
[← Back to Release 6.2.1.5](#release-6-2-1-5)

**Release**: 6.2.1.5  
**Category**: Change Request  
**API**: [Cancel Payment](https://api.finzly.io/openapi/paymentapi/operation/cancelPayment/)  
**Impact**: All clients using payment cancellation  
**Action Required**: None  
**Jira**: COS-14240

### Overview
The failure message for the payment cancellation through API was returning a generic message: "Failed to cancel the payment: The payment cannot be cancelled." This left users confused about the actual reason for failure.

### Issue
Payments in certain statuses, such as Transmitted, Processed, Compliance Submitted, Fraud Submitted, Cancelled, Not Supported, and Stop not Allowed are not eligible for cancellation, but the API response did not provide any meaningful explanation.

### Solution Implemented
To improve clarity and client experience, the system is enhanced to return clear, descriptive, payment's current status-based failure messages.

The cancellation API now checks the current payment status before attempting cancellation. Instead of one generic message, the API returns specific error messages such as:
- "Failed to cancel the payment because payment is already transmitted."
- "Failed to cancel the payment because cancel is not supported."

### Client Benefit
- Clear, descriptive error messages for payment cancellation failures
- Better understanding of why cancellation failed
- Improved user experience with actionable error information
- Status-specific error messages for better troubleshooting

### Technical Details
- Enhanced cancellation API to check payment status
- Returns status-specific error messages
- Covers all non-cancellable payment statuses
- Provides clear reasons for cancellation failure

### Migration Notes
- **No action required**: This is an enhancement to error messages
- Existing cancellation workflows continue to work
- Error messages are now more descriptive and helpful

---

<a id="special-characters-wire"></a>
## Relax Restriction on Special Characters
[← Back to Release 6.2.1.5](#release-6-2-1-5)

**Release**: 6.2.1.5  
**Category**: Production Issue Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing wire payments  
**Action Required**: None  
**Jira**: TKT-17395, COS-14260

### Issue
Outgoing wire payments were failing with the error: "BENEFICIARY_ACCTNUM_PATTERN: Beneficiary account number should be contained only alphabets and numbers." This is because several fields like Beneficiary Account Number were restricted to alphanumeric characters only. Because of this strict validation, the system blocked payment creation.

### Fix
This issue has been resolved. Updated OpenAPI and backend validation patterns to allow all ISO-permitted special characters. Relaxed field-level validations for all wire-related fields and for these characters: `, . , - ( ) / + ' = : ? _ # @`. Updated regex patterns were applied so payments are created successfully and can move to a repairable state if needed.

### Client Benefit
- Wire payments with special characters now succeed
- Supports ISO-permitted special characters in wire fields
- Payments can be created and moved to repairable state if needed
- Improved payment creation success rate for wire transactions

### Technical Details
- Updated validation patterns to allow ISO-permitted special characters
- Relaxed restrictions for wire-related fields
- Allowed characters: `, . , - ( ) / + ' = : ? _ # @`
- Payments can be created and moved to repairable state

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payments continue to work as before
- Payments that previously failed due to special character restrictions will now succeed

---

<a id="api-fedwire-mapping"></a>
## Incorrect Mapping API to Fedwire
[← Back to Release 6.2.1.5](#release-6-2-1-5)

**Release**: 6.2.1.5  
**Category**: UAT Issue Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing Fedwire payments  
**Action Required**: None  
**Jira**: COS-14309, TKT-17620

### Issue
Outgoing wire payments via API had incorrect Fedwire/ISO field mappings, causing critical data to appear in the wrong MT/ISO tags. The issues included:
- `originatortoBeneficiary` not populated
- `paymentNotes` populating multiple fields (Instruction for Creditor and Payment Notes)
- Sender-to-Receiver notes mapping incorrectly to Service Level
- Structured Remittance Information appears under Instruction for Creditor Agent

### Fix
This issue has been resolved. Corrected API-to-Fedwire ISO mappings to align strictly with Fedwire ISO standards.

### Technical Details
- The `originatorToBeneficiary` now is correctly mapped to the v4/initiate credit payment
- `originatortoBeneficiary` (deprecated) is temporarily supported for backward compatibility
- Corrected field mappings to align with Fedwire ISO standards
- Fixed incorrect data placement in MT/ISO tags

### Client Benefit
- Correct Fedwire ISO field mappings
- Accurate data placement in Fedwire messages
- Compliance with Fedwire ISO standards
- Improved data integrity for wire payments

### Migration Notes
- **No action required**: This is a fix to field mappings
- Existing payments continue to work
- New payments will have correct field mappings
- Deprecated `originatortoBeneficiary` still supported for backward compatibility

---

<a id="fedwire-amount-limit"></a>
## Fedwire Credit Payment for above 10Million fails
[← Back to Release 6.2.1.4](#release-6-2-1-4)

**Release**: 6.2.1.4  
**Category**: Production Issue Fix  
**API**: [Initiate a Credit Payment - v4](https://api.finzly.io/openapi/paymentapi/operation/v4credit/)  
**Impact**: Clients processing large Fedwire payments  
**Action Required**: None  
**Jira**: COS-14258

### Issue
OpenAPI payments above $10,000,000 were failing with the error:
```
"code": "CREDIT_AMOUNT_MAX",
"message": "Payment amount should not exceed 10,000,000."
```

Although the Developer Portal specification allows Fedwire payments up to $9,999,999,999.99, the OpenAPI validation layer enforced a hardcoded limit of $10 million. Because of this mismatch, any Fedwire payment above $10 million was rejected before processing.

### Fix
This issue has been resolved. The OpenAPI validation logic is updated to remove the maximum amount restriction. OpenAPI now only checks for negative or zero amounts, as required by the current specification.

### Implementation
- Removed the hardcoded $10M upper limit from OpenAPI validation
- Updated rules so the system validates only:
  - Amount is provided
  - Amount is greater than zero
- Large amounts (including $100M+) are now accepted

### Client Benefit
- Payments up to $9,999,999,999.99 (as per OpenAPI specification) are successfully processed
- Large Fedwire payments no longer rejected incorrectly
- Aligned with Developer Portal specification
- Supports high-value wire transactions

### Technical Details
- Removed hardcoded $10 million maximum validation
- Now validates only that amount is provided and greater than zero
- Supports amounts up to $9,999,999,999.99 as per specification
- Large amounts are now accepted and processed correctly

### Migration Notes
- **No action required**: This is a backward-compatible fix
- Existing payments continue to work as before
- Payments that previously failed due to amount limit will now succeed
- Large Fedwire payments can now be processed successfully

---