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
          <span class="api-fullspec-icon" aria-hidden="true">API</span>
          <span class="api-fullspec-label">View full spec</span>          
        </a>
      </div>
    </div>
    <div class="api-hero-illustration" aria-hidden="true">
      <span class="hero-line line-a"></span>
      <span class="hero-line line-b"></span>
      <span class="hero-line line-c"></span>
      <span class="hero-node node-a"></span>
      <span class="hero-node node-b"></span>
      <span class="hero-node node-c"></span>
      <span class="hero-node node-d"></span>
      <span class="hero-node node-e"></span>
    </div>
  </div>

  <div class="api-filter-chips" role="navigation" aria-label="Jump to API domains">
    <a class="api-filter-chip" href="#payment-api">Payments</a>
    <a class="api-filter-chip" href="#foreign-exchange-api">FX</a>
    <a class="api-filter-chip" href="#webhook-api">Webhook</a>
    <a class="api-filter-chip" href="#finzlycore-api">Core</a>
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
          <span class="subapi-text"><strong>Bulk Payment API</strong><small>Send payroll and vendor batches in a single API request.</small><span class="card-meta"><span>Batch</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/payment-api/positive-pay-openapi">
          <span class="subapi-text"><strong>Positive Pay API</strong><small>Validate issued checks and payment items before posting.</small><span class="card-meta"><span>Fraud control</span><span>Validation</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/finzly-connect-openapi/payments/createdebitpayment">
          <span class="subapi-text"><strong>Request for Pay API</strong><small>Create and track request-for-pay flows with payer response states.</small><span class="card-meta"><span>Collections</span><span>Status</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/payment-api/transfer-openapi">
          <span class="subapi-text"><strong>Book Transfer API</strong><small>Move funds between internal accounts with real-time balance updates.</small><span class="card-meta"><span>Internal ledger</span><span>Real-time</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    <section class="api-section fx-domain" id="foreign-exchange-api">
      <h2><span class="section-title">FX API</span><span class="section-kicker">Foreign Exchange</span></h2>
      <p class="api-section-subtitle">Explore pricing, booking, and settlement services for FX workflows.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/fx-api/fx-openapi">
          <span class="subapi-text"><strong>FX Quote API</strong><small>Get indicative and executable rates for supported currency pairs.</small><span class="card-meta"><span>Pricing</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/fx-api/fx-openapi">
          <span class="subapi-text"><strong>Rate Lock API</strong><small>Lock rates for a validity window and manage expiration behavior.</small><span class="card-meta"><span>Hedging</span><span>Timed</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/fx-api/fx-openapi">
          <span class="subapi-text"><strong>Trade Booking API</strong><small>Create and track FX trade execution and settlement readiness.</small><span class="card-meta"><span>Execution</span><span>Settlement</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    <section class="api-section customer-domain" id="customer-api">
      <h2><span class="section-title">Customer API</span><span class="section-kicker">Customer lifecycle</span></h2>
      <p class="api-section-subtitle">Manage customer lifecycle data required for payment and compliance flows.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/customer-api/customer-openapi">
          <span class="subapi-text"><strong>Customer Core API</strong><small>Create, update, search, and retrieve customer profiles.</small><span class="card-meta"><span>Lifecycle</span><span>Profiles</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/customer-api/customer-account-openapi">
          <span class="subapi-text"><strong>Customer Account API</strong><small>Manage customer accounts, account updates, and sweeps configuration.</small><span class="card-meta"><span>Accounts</span><span>Sweeps</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/customer-api/customer-contact-openapi">
          <span class="subapi-text"><strong>Customer Contact API</strong><small>Create, update, and retrieve beneficiary/contact records.</small><span class="card-meta"><span>Beneficiaries</span><span>Directory</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/customer-api/customer-user-openapi">
          <span class="subapi-text"><strong>Customer User API</strong><small>Provision users, update profiles, and manage user activation status.</small><span class="card-meta"><span>Access</span><span>Users</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/customer-api/customer-role-openapi">
          <span class="subapi-text"><strong>Customer Role API</strong><small>Create roles and retrieve role assignments for customer entitlements.</small><span class="card-meta"><span>Authorization</span><span>Roles</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    

    <section class="api-section webhook-domain" id="webhook-api">
      <h2><span class="section-title">Webhook API</span><span class="section-kicker">Eventing</span></h2>
      <p class="api-section-subtitle">Consume payment and ledger transaction webhook events for real-time status updates.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/webhook-api/payments-webhook-openapi/payment-webhook-notifications./notifypaymentstatus">
          <span class="subapi-text"><strong>Payment Webhook Notifications</strong><small>Receive payment status events such as processed, cancelled, and hold transitions.</small><span class="card-meta"><span>/payments</span><span>POST</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
        <a class="subapi-card" href="/specification/webhook-api/payments-webhook-openapi/ledger-transaction-webhook/handletransactionupdate">
          <span class="subapi-text"><strong>Ledger Transaction Webhook</strong><small>Receive transaction update events when ledger transactions move across statuses.</small><span class="card-meta"><span>/transaction/webhook</span><span>POST</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    <section class="api-section bank-domain" id="bank-api">
      <h2><span class="section-title">Bank API</span><span class="section-kicker">Bank Lookups</span></h2>
      <p class="api-section-subtitle">Resolve routing details and institution metadata for domestic and international payment workflows.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/payment-api/banks-openapi">
          <span class="subapi-text"><strong>Bank Lookup API</strong><small>Fetch bank details by full routing number.</small><span class="card-meta"><span>Routing</span><span>Lookup</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>

    <section class="api-section finzlycore-domain" id="finzlycore-api">
      <h2><span class="section-title">Finzly Core API</span><span class="section-kicker">Core Banking</span></h2>
      <p class="api-section-subtitle">Manage virtual deposit accounts and account transaction search workflows.</p>
      <div class="subapi-grid">
        <a class="subapi-card" href="/specification/finzlycore-api/deposit-accounts-openapi">
          <span class="subapi-text"><strong>Deposit Accounts API</strong><small>Create, update, close, and search virtual accounts with transaction history support.</small><span class="card-meta"><span>Virtual Accounts</span><span>Transactions</span></span></span>
          <span class="card-arrow" aria-hidden="true">-></span>
        </a>
      </div>
    </section>
  </div>

</div>
