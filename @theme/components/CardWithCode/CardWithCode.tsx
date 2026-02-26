// Demo component used in home page
import React from 'react';
import styled from 'styled-components';

import { CodeBlock } from '@redocly/theme/components/CodeBlock/CodeBlock';
import { Select } from '@redocly/theme/components/Select/Select';
import { CopyButton } from '@redocly/theme/components/Buttons/CopyButton';

type CardWithCodeProps = {
  title: string;
  description: string;
  code: any;
};

export const CardWithCode = ({ title, description, code }: CardWithCodeProps) => {
  return (
    <Wrapper>
      <Column isLeftColumn>
        <h4>{title}</h4>
        <p>{description}</p>
      </Column>
      <Column>
        <div className="title">
          <Select
            className="select"
            value="curl"
            options={[
              {
                element: 'curl',
                value: 'curl',
              },
            ]}
          />
          <CopyButton data={code} />
        </div>
        <CodeBlock lang="curl" source={code} withLineNumbers />
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 82px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%);
  border: 1px solid #d8e3f5;
  border-radius: 14px;
  overflow: hidden;
  width: 100%;
  max-width: 896px;
  margin-bottom: 55px;
  position: relative;
  z-index: 10;
  box-shadow: 0 12px 30px rgba(16, 38, 77, 0.08);

  .dark & {
    background: linear-gradient(180deg, #0f213f 0%, #0b1b3a 100%);
    border-color: #1f3d70;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div<{ isLeftColumn?: boolean }>`
  border-right: ${({ isLeftColumn }) => (isLeftColumn ? '1px solid #d8e3f5' : 'none')};
  h4 {
    color: #10264d;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    margin: 16px 16px 8px 16px;
  }

  p {
    color: #38507a;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin: 0 16px 16px 16px;
    text-align: start;
  }

  .title {
    display: flex;
    justify-content: space-between;
    width: inherit;
    margin: 5px 10px 5px 16px;

    select {
      width: fit-content;
    }
  }

  > div {
    div {
      padding: 0;
    }
    padding: 8px;
    border-radius: 0;
    border-right: none;
    border-bottom: none;
    border-left: none;
    background-color: transparent;
  }

  .dark & {
    border-right-color: #1f3d70;
    h4 {
      color: #ffffff;
    }
    p {
      color: #b8cbec;
    }
  }
`;
