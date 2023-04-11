import React from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import IconLoader from "../../components/IconLoader";

import config from "../../config";
import { TransactionDetails } from "../../state/transactions/reducer";

const TransactionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success, theme }) =>
    pending ? theme.primary1 : success ? theme.green1 : theme.red1};
`;

const StateWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success }) =>
    pending ? "#FCB400" : success ? "#00000000" : "#FA4C69"};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
`;

interface TransactionProps {
  tx: TransactionDetails;
  chainId: number;
}

const SingleTransaction: React.FC<TransactionProps> = ({ tx, chainId }) => {
  const summary = tx.summary;
  const pending = !tx.receipt;
  const success =
    !pending &&
    tx &&
    (tx.receipt?.status === 1 || typeof tx.receipt?.status === "undefined");
  const date = tx?.confirmedTime || tx?.addedTime;

  return (
    <TransactionWrapper>
      <IconWrapper pending={pending} success={success}>
        {pending ? (
          <IconLoader iconName={"ColoredPending"} iconType={"status"} />
        ) : success ? (
          <IconLoader iconName={"ColoredSuccess"} iconType={"status"} />
        ) : (
          <IconLoader iconName={"ColoredAlert"} iconType={"status"} />
        )}
      </IconWrapper>
      <InfoSection>
        <Title
          href={`${config[chainId].etherscanUrl}/tx/${tx.hash}`}
          target="_blank"
        >
          {summary ?? tx.hash}
        </Title>
        <Date>{format(date)}</Date>
      </InfoSection>
      <StateWrapper pending={pending} success={success}>
        {pending ? "Pending" : success ? "" : "Failed"}
      </StateWrapper>
    </TransactionWrapper>
  );
};

const InfoSection = styled.div`
  flex: 1;
  text-align: left;
  margin-bottom: 16px;
  margin-left: 14px;
`;

const Title = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 4px;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.88);
  }
`;

const Date = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 0;
`;

export default SingleTransaction;
