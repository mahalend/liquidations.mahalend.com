import IconButton from "@material-ui/core/IconButton";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import IconLoader from "../../components/IconLoader";

import {
  isTransactionRecent,
  useAllTransactions,
} from "../../state/transactions/hooks";
import { TransactionDetails } from "../../state/transactions/reducer";
import { useGetAccount, useGetChainId } from "../../utils/NetworksCustomHooks";

import SingleTransaction from "./SingleTransaction";

interface props {
  openModal: boolean;
  onDismiss: () => void;
}

const TxModal: React.FC<props> = ({ openModal, onDismiss }) => {
  const account = useGetAccount();

  const allTransactions = useAllTransactions();
  const chainId = useGetChainId();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs
      .filter((tx) => isTransactionRecent(tx) && tx.from === account)
      .sort(newTransactionsFirst);
  }, [allTransactions, account]);

  const handleClose = () => {
    onDismiss();
  };

  if (!openModal) return null;

  return (
    <div>
      <ModalHeader>
        <Title>Recent Transactions</Title>
        <RightSubHeader>
          <CrossIcon>
            <IconButton aria-label="close" onClick={() => handleClose()}>
              <IconLoader iconName={"Cross"} width={24} />
            </IconButton>
          </CrossIcon>
        </RightSubHeader>
      </ModalHeader>
      <ModalBody>
        {sortedRecentTransactions.length === 0 && (
          <div>
            <NoTransaction>You haven’t done any transaction yet.</NoTransaction>
            <CallToAction to={"/farming"} onClick={() => handleClose()}>
              Farm and earn rewards
            </CallToAction>
          </div>
        )}
        <StyledTransactionList>
          {sortedRecentTransactions.map((tx) => (
            <SingleTransaction key={tx.hash} tx={tx} chainId={chainId} />
          ))}
        </StyledTransactionList>
      </ModalBody>
    </div>
  );
};

const ModalHeader = styled.div`
  padding: 0 0 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: 0;
`;

const RightSubHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CrossIcon = styled.div`
  margin-right: -12px;
`;

const ModalBody = styled.div`
  padding: 24px 0 0 0;
  overflow-y: scroll;
  max-height: calc(360px - 72px);
  @media (max-width: 600px) {
    max-height: calc(100vh - 114px);
  }
`;

const NoTransaction = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
  padding: 0 12px;
  text-align: center;
`;

const CallToAction = styled(Link)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: #f7653b;
  text-align: center;
  width: 100%;
  display: block;

  &:hover {
    color: #f7653b;
  }
`;

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

// we want the latest one to come first, so return negative if an is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

export default TxModal;
