---
slug: /api-docs
---

<div class="api-hub">
  <div class="api-hub-hero">
    <div class="api-hub-hero-main">
      <p class="eyebrow">Finzly Connect</p>
      <h1>API Specification</h1>
      <p class="subtitle">
        A modern API catalog for Payments, Foreign Exchange, Customer lifecycle, and Webhook event integrations.
      </p>
      <div class="api-proof-list" role="list" aria-label="Platform highlights">
        <span class="api-proof-item" role="listitem">99.95% uptime SLA</span>
        <span class="api-proof-item" role="listitem">OAuth2 + API keys</span>
        <span class="api-proof-item" role="listitem">JSON and ISO 20022 payloads</span>
        <span class="api-proof-item" role="listitem">HMAC webhook signatures</span>
        <a class="api-fullspec-link" href="/specification/finzly-connect-openapi" aria-label="View full OpenAPI spec">
          <span class="api-fullspec-label">View full spec</span>          
        </a>
      </div>
    </div>
  </div>

  <div class="api-quickstart">
    <p class="api-quickstart-title">Launch your first integration in 5 minutes</p>
    <div class="api-quickstart-steps">
      <a class="quickstart-step" href="/getting-started">
        <span class="quickstart-index">1</span>
        <span class="quickstart-copy"><strong>Get your sandbox key</strong><small>Create credentials and set your auth headers.</small></span>
      </a>
      <a class="quickstart-step" href="/specification/finzly-connect-openapi">
        <span class="quickstart-index">2</span>
        <span class="quickstart-copy"><strong>Make your first API call</strong><small>Send a payment or FX quote request with sample payloads.</small></span>
      </a>
      <a class="quickstart-step" href="/specification/finzly-connect-openapi">
        <span class="quickstart-index">3</span>
        <span class="quickstart-copy"><strong>Enable webhook events</strong><small>Receive delivery notifications with signature verification.</small></span>
      </a>
    </div>
  </div>

  <div class="api-sections api-sections-narrow">
    <section class="api-section payment-domain" id="payment-api">
      <h2><span class="section-title">Payment API</span><span class="section-kicker">Payments</span></h2>
      <p class="api-section-subtitle">Select a capability to explore request patterns and payload structure.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/payment-api/payments-openapi">
          <span class="subapi-icon">RA</span>
          <span class="subapi-text">
            <strong>Payment Rails</strong>
            <small>Explore payment rails for orchestration and settlement.</small>
            <span class="card-meta"><span>Orchestration</span><span>Real-time</span></span>
            <span class="product-children">
              <span class="product-child">ACH</span>
              <span class="product-child">WIRE</span>
              <span class="product-child">SWIFT</span>
              <span class="product-child">RTP</span>
              <span class="product-child">FEDNOW</span>
            </span>
          </span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/payment-api/bulk-payments-openapi">
          <span class="subapi-icon">BK</span>
          <span class="subapi-text"><strong>Bulk Payment API</strong><small>Send payroll and vendor batches in a single API request.</small><span class="card-meta"><span>Batch</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/payment-api/positive-pay-openapi">
          <span class="subapi-icon">PP</span>
          <span class="subapi-text"><strong>Positive Pay API</strong><small>Validate issued checks and payment items before posting.</small><span class="card-meta"><span>Fraud control</span><span>Validation</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">RP</span>
          <span class="subapi-text"><strong>Request for Pay API</strong><small>Create and track request-for-pay flows with payer response states.</small><span class="card-meta"><span>Collections</span><span>Status</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">BT</span>
          <span class="subapi-text"><strong>Book Transfer API</strong><small>Move funds between internal accounts with real-time balance updates.</small><span class="card-meta"><span>Internal ledger</span><span>Real-time</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    <section class="api-section fx-domain" id="foreign-exchange-api">
      <h2><span class="section-title">FX API</span><span class="section-kicker">Foreign Exchange</span></h2>
      <p class="api-section-subtitle">Explore pricing, booking, and settlement services for FX workflows.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">FQ</span>
          <span class="subapi-text"><strong>FX Quote API</strong><small>Get indicative and executable rates for supported currency pairs.</small><span class="card-meta"><span>Pricing</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">RL</span>
          <span class="subapi-text"><strong>Rate Lock API</strong><small>Lock rates for a validity window and manage expiration behavior.</small><span class="card-meta"><span>Hedging</span><span>Timed</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">TB</span>
          <span class="subapi-text"><strong>Trade Booking API</strong><small>Create and track FX trade execution and settlement readiness.</small><span class="card-meta"><span>Execution</span><span>Settlement</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    <section class="api-section customer-domain" id="customer-api">
      <h2><span class="section-title">Customer API</span><span class="section-kicker">Customer lifecycle</span></h2>
      <p class="api-section-subtitle">Manage customer lifecycle data required for payment and compliance flows.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">CO</span>
          <span class="subapi-text"><strong>Customer Onboarding API</strong><small>Create and validate business or individual customer profiles.</small><span class="card-meta"><span>KYC ready</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">KC</span>
          <span class="subapi-text"><strong>KYC / KYB API</strong><small>Retrieve compliance verification states and decision outcomes.</small><span class="card-meta"><span>Compliance</span><span>Risk</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">BF</span>
          <span class="subapi-text"><strong>Beneficiary API</strong><small>Store and manage payee and beneficiary details for transaction use.</small><span class="card-meta"><span>Directory</span><span>Validation</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    <section class="api-section webhook-domain" id="webhook-api">
      <h2><span class="section-title">Webhook API</span><span class="section-kicker">Eventing</span></h2>
      <p class="api-section-subtitle">Build event-driven integrations with reliable delivery and verification.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">WS</span>
          <span class="subapi-text"><strong>Subscription API</strong><small>Create and update subscriptions for events by product domain.</small><span class="card-meta"><span>Event routing</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">SV</span>
          <span class="subapi-text"><strong>Signature Verification</strong><small>Verify payload authenticity using signing keys and headers.</small><span class="card-meta"><span>Security</span><span>HMAC</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">RD</span>
          <span class="subapi-text"><strong>Retry and Delivery API</strong><small>Inspect retries, dead letters, and delivery attempt history.</small><span class="card-meta"><span>Reliability</span><span>Observability</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    <section class="api-section bank-domain" id="bank-api">
      <h2><span class="section-title">Bank API</span><span class="section-kicker">Core banking</span></h2>
      <p class="api-section-subtitle">Access account data, balances, and transaction operations for banking workflows.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">AC</span>
          <span class="subapi-text"><strong>Accounts API</strong><small>Create and manage account profiles and account-level settings.</small><span class="card-meta"><span>Account data</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">BL</span>
          <span class="subapi-text"><strong>Balance API</strong><small>Retrieve available and ledger balances across supported accounts.</small><span class="card-meta"><span>Balances</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi">
          <span class="subapi-icon">TX</span>
          <span class="subapi-text"><strong>Transactions API</strong><small>Fetch posted and pending transactions with rich filter support.</small><span class="card-meta"><span>History</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>
  </div>

</div>
