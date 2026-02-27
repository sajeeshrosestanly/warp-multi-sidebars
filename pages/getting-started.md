---
slug: /getting-started
---

<div class="page-wide">

# Getting Started

Welcome to the **Finzly API Developer Portal**.

This page is a placeholder onboarding guide for the next version of Finzly developer documentation.

## 1. Request sandbox access

- Reach out through the [Support](/support) page to request credentials.
- Include your company name, intended use case, and contact email.

## 2. Generate an access token

Use your sandbox credentials to obtain a bearer token.

```bash
curl -X POST https://sandbox.api.finzly.io/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "client_credentials"
  }'
```

## 3. Make your first API call

Use the token to submit a sample payment request:

```bash
curl -X POST https://sandbox.api.finzly.io/payments \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1250.75,
    "currency": "USD",
    "rail": "ACH",
    "beneficiaryId": "ben_001"
  }'
```

## 4. Explore API Docs

- Open [API Docs](/api-docs) for domain-level discovery and integration pathways.
- Open [Full API Reference](/specification/finzly-connect-openapi) for request/response schemas.
- Review [Changelog](/changelog) for upcoming and released changes.

## 5. Next steps

- Replace placeholder endpoints with production Finzly API contracts.
- Add product-specific guides for payments, customers, and webhook events.
</div>
