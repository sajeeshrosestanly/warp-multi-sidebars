import React from 'react';
import styled from 'styled-components';

const finzlyBackground = String(require('./images/background.svg')).replace(/\\/g, '/');

export default function HomePage() {
  return (
    <div>
      <FinzlyContainer>
        <FinzlyBg />
        <h1>Finzly API Developer Portal</h1>
        <p>Build modern banking experiences with Finzly Connect APIs.</p>
      </FinzlyContainer>
      <Container>
        <h3>Build with Finzly Connect</h3>
        <p>
          Access developer resources for payment initiation, customer onboarding, release updates, and integration
          support. Start in sandbox and move to production with confidence.
        </p>
        <CardGrid>
          <Card href="/getting-started">
            <h4>Getting Started</h4>
            <p>Set up credentials, authenticate, and make your first API call in minutes.</p>
          </Card>
          <Card href="/api-docs">
            <h4>API Docs</h4>
            <p>Explore Payment APIs and Customer APIs with schemas and example payloads.</p>
          </Card>
          <Card href="/changelog">
            <h4>Changelog</h4>
            <p>Track new features, behavior updates, and important release notes.</p>
          </Card>
          <Card href="/support">
            <h4>Support</h4>
            <p>Get help with integration questions, troubleshooting, and onboarding.</p>
          </Card>
        </CardGrid>
      </Container>
    </div>
  );
}

const FinzlyBg = styled.div`
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
    background-image:
      linear-gradient(180deg, rgba(82, 0, 255, 0.2) 0%, rgba(82, 0, 255, 0) 55%),
      url('https://finzly.com/wp-content/uploads/2026/01/ef7fe3.webp'),
      url('${finzlyBackground}');
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position: center top, center 42%, center top;
    background-size: cover, auto min(58vh, 560px), cover;
    opacity: 0.72;
  }

`;

const FinzlyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  position: relative;
  min-height: 500px;

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
    min-height: 420px;
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
  margin: 64px auto 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--text-color-secondary);
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  width: min(90%, 886px);

  h3 {
    color: #0b1b3a;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin: 0 0 24px 0;
  }

  > p {
    margin: 0;
    color: #38507a;
  }

  .dark & {
    color: #c0d1ee;
    h3 {
      color: #f2f7ff;
    }
    > p {
      color: #b8cbec;
    }
  }

  @media (max-width: 900px) {
    margin: 48px auto 36px;
  }
`;

const CardGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.a`
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid #d8e3f5;
  background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%);
  padding: 16px;
  box-shadow: 0 8px 20px rgba(16, 38, 77, 0.08);

  h4 {
    margin: 0 0 8px 0;
    color: #10264d;
    font-size: 18px;
    line-height: 24px;
  }

  p {
    margin: 0;
    color: #38507a;
    font-size: 15px;
    line-height: 22px;
  }

  &:hover {
    border-color: #b793ff;
    box-shadow: 0 10px 24px rgba(82, 0, 255, 0.18);
    transform: translateY(-1px);
  }

  .dark & {
    border-color: #1f3d70;
    background: linear-gradient(180deg, #0f213f 0%, #0b1b3a 100%);

    h4 {
      color: #f2f7ff;
    }

    p {
      color: #b8cbec;
    }
  }
`;

