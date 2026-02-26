import React from 'react';
import styled from 'styled-components';
import { ArrowRightIcon, Button } from '@redocly/theme';
import { CardWithCode } from './@theme/components/CardWithCode/CardWithCode';

const code = `curl -X POST \\
  https://api.finzly.io/payments \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1250.75,
    "currency": "USD",
    "rail": "ACH",
    "beneficiaryId": "ben_001"
  }'
`;

export default function HomePage() {
  return (
    <div>
      <HeroContainer>
        <HeroBg />
        <h1>Finzly API Developer Portal</h1>
        <p>Build modern banking experiences with Finzly Connect APIs.</p>
        <Button size="large" variant="primary" tone="brand" to="/getting-started">
          Get started
        </Button>
        <CardWithCode
          title="Quickstart Example"
          description="Submit a sample payment request to validate your setup in sandbox."
          code={code}
        />
      </HeroContainer>

      <Container>
        <h3>What you can do here</h3>
        <Feature>
          <ArrowRightIcon />
          <p>Read onboarding steps for sandbox access, authentication, and first API call.</p>
        </Feature>
        <Feature>
          <ArrowRightIcon />
          <p>Explore Finzly sample API docs for Payment and Customer APIs.</p>
        </Feature>
        <Feature>
          <ArrowRightIcon />
          <p>Track release notes and breaking changes in the changelog.</p>
        </Feature>
        <Feature>
          <ArrowRightIcon />
          <p>Contact support for integration and production onboarding questions.</p>
        </Feature>
      </Container>

      <Container>
        <ButtonContainer>
          <Button size="large" to="/getting-started">
            Getting Started
          </Button>
          <Button size="large" to="/apis/index.yaml">
            API Docs
          </Button>
          <Button size="large" to="/changelog">
            Changelog
          </Button>
          <Button size="large" to="/support">
            Support
          </Button>
        </ButtonContainer>
      </Container>
    </div>
  );
}

const HeroBg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${require('./images/background.svg')});
    background-size: cover;
    filter: blur(36px);
    opacity: 0.55;
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background-size: cover;
    background-image: url(${require('./images/grid.svg')});
    opacity: 0.26;
    .dark & {
      background-image: url(${require('./images/grid-dark.svg')});
    }
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  position: relative;

  h1 {
    color: #0b1b3a;
    text-align: center;
    font-size: 56px;
    font-weight: 700;
    line-height: 64px;
    margin: 120px 0 16px 0;
  }

  > p {
    color: #2f446c;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    margin: 0 0 24px 0;
  }

  .dark & {
    h1 {
      color: #f2f7ff;
    }
    > p {
      color: #b5caee;
    }
  }

  @media (max-width: 900px) {
    h1 {
      font-size: 40px;
      line-height: 48px;
      margin-top: 88px;
    }
    > p {
      font-size: 18px;
      line-height: 26px;
    }
  }
`;

const Container = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--text-color-secondary);
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  width: min(90%, 886px);
  margin: 64px auto 0;

  h3 {
    color: #0b1b3a;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin: 0 0 24px 0;
  }

  .dark & {
    color: #c0d1ee;
    h3 {
      color: #f2f7ff;
    }
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: var(--spacing-sm);

  svg {
    height: 16px;
    width: 16px;
    margin-top: 6px;
    flex-shrink: 0;
    path {
      fill: #008cff;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-lg);
`;
