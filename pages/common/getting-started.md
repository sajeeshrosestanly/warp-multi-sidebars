---
slug: /getting-started
excludeFromSearch: true
sidebar:
  hide: true
---

<div class="gs-lab">
  <header class="gs-header">
    <div class="gs-grid">
      <div>
        <p class="gs-eyebrow">Finzly API Developer Portal</p>
        <h1 class="gs-title">Getting Started</h1>
        <p class="gs-subtitle">Welcome to the <strong>Finzly API Developer Portal</strong>.</p>
        <p class="gs-subtitle">This onboarding guide is built for bank developers and fintech partners integrating with Finzly APIs.</p>
        <div class="gs-stat-board" role="list" aria-label="Onboarding overview">
          <span class="gs-stat" role="listitem">5 setup steps</span>
          <span class="gs-stat" role="listitem">Sandbox credentials required</span>
          <span class="gs-stat" role="listitem">Bearer JWT authentication</span>
        </div>
      </div>
      <aside class="gs-rail-card">
        <p class="gs-rail-title">Launch Checklist</p>
        <nav class="gs-rail-list" aria-label="Getting started sections">
          <a class="gs-rail-item" href="#request-sandbox-access">1. Request sandbox access</a>
          <a class="gs-rail-item" href="#generate-an-access-token">2. Generate an access token</a>
          <a class="gs-rail-item" href="#make-your-first-api-call">3. Make your first API call</a>
          <a class="gs-rail-item" href="#explore-api-docs">4. Explore API Docs</a>
          <a class="gs-rail-item" href="#next-steps">5. Next steps</a>
        </nav>
      </aside>
    </div>
  </header>

  <main class="gs-main">
    <section class="gs-step" id="request-sandbox-access">
      <span class="gs-badge" aria-hidden="true">1</span>
      <h2>1. Request sandbox access</h2>
      <ul>
        <li>Submit your onboarding request using the <a href="https://finzly.com/contact/">Finzly Contact form</a>.</li>
        <li>Include your company name, intended use case, and contact email so the team can provision sandbox access.</li>
      </ul>
      <div class="gs-subsection">
        <h3>After provisioning, you will receive</h3>
        <ul>
          <li><code>client_id</code> and <code>client_secret</code> credentials</li>
          <li>Tenant/partner identifier details</li>
          <li>Sandbox and Token base URLs</li>
          <li>Support contact information for onboarding issues</li>
        </ul>
      </div>
    </section>

    <section class="gs-step" id="generate-an-access-token">
      <span class="gs-badge" aria-hidden="true">2</span>
      <h2>2. Generate an access token</h2>
      <p>Use your sandbox credentials to obtain a JWT access token, then pass it in the <code>Authorization</code> header as a bearer token for API requests.</p>
      <div class="gs-shell">
        <div class="gs-shell-top">Token request</div>

```bash
curl --location "https://security-uat.finzly.io/auth/realms/BANKOS-UAT-SANDBOX-CUSTOMER/protocol/openid-connect/token" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --header "Accept: application/vnd.api+json" \
  --data-urlencode "client_id=YOUR_CLIENT_ID" \
  --data-urlencode "client_secret=YOUR_CLIENT_SECRET" \
  --data-urlencode "grant_type=client_credentials"
```
      </div>
    </section>

    <section class="gs-step" id="make-your-first-api-call">
      <span class="gs-badge" aria-hidden="true">3</span>
      <h2>3. Make your first API call</h2>
      <p>Use the token to call a protected API endpoint and verify access.</p>
      <div class="gs-shell">
        <div class="gs-shell-top">Sample customer request</div>

```bash
curl --location "https://sandbox-digitalbanking-uat.finzly.io/api/openbanking/v2/customers/{customerId}" \
  --header "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
     
      </div>
    </section>

    <section class="gs-step" id="explore-api-docs">
      <span class="gs-badge" aria-hidden="true">4</span>
      <h2>4. Explore API Docs</h2>
      <div class="gs-link-grid">
        <a class="gs-link-card" href="/api-docs">
          <strong>API Docs</strong>
          <span>Open API Docs for domain-level discovery and integration pathways.</span>
        </a>
        <a class="gs-link-card" href="/specification/finzly-connect-openapi">
          <strong>Full API Reference</strong>
          <span>Open Full API Reference for request/response schemas.</span>
        </a>
        <a class="gs-link-card" href="/changelog">
          <strong>Changelog</strong>
          <span>Review Changelog for upcoming and released changes.</span>
        </a>
      </div>
    </section>

    <section class="gs-step" id="next-steps">
      <span class="gs-badge" aria-hidden="true">5</span>
      <h2>5. Next steps</h2>
      <ul class="gs-next">
        <li>Complete end-to-end integration with Finzly Connect APIs in sandbox, including authentication, core API flows, and webhook handling.</li>
        <li>Execute validation and regression testing for your target use cases; once results are successful, promote the integration changes to production.</li>
      </ul>
    </section>
  </main>
</div>
