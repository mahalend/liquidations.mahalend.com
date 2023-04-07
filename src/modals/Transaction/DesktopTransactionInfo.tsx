import React from 'react';
import styled from 'styled-components';
import TxModal from './TxModal';

interface Iprops {
  openModal: boolean;
  onDismiss: () => void;
}

const DesktopTransactionInfo = (props: Iprops) => {
  const {
    openModal,
    onDismiss,
  } = props;

  if (!openModal) return null;

  return (
    <MainDiv>
      <BackgroundAbsolute onClick={() => onDismiss()}/>
      <PositionDiv>
        <WalletDiv id={"desktop_tx_modal"}>
          <TxModal openModal={openModal} onDismiss={() => onDismiss()}/>
        </WalletDiv>
      </PositionDiv>
    </MainDiv>
  )
};

export default DesktopTransactionInfo;

export const BackgroundAbsolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const MainDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
`;

const PositionDiv = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  position: relative;
`;

const WalletDiv = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  border-radius: 6px;
  right: 60px;
  top: calc(72px);
  width: 380px;
  z-index: 10;
  padding: 16px 24px 24px 24px;
  @media (max-width: 600px) {
    width: 100vw;
    left: 0;
    right: 0;
  }
`;
