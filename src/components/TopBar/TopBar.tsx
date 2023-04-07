import {ConnectButton} from "@rainbow-me/rainbowkit";
import React, {useState} from 'react';
import {useMediaQuery} from "@material-ui/core";
import styled from 'styled-components';

import {useGetAccount} from "../../utils/NetworksCustomHooks";

import IconLoader from "../IconLoader";
import DesktopTransactionInfo from "../../modals/Transaction/DesktopTransactionInfo";
import MobileTransactionInfo from "../../modals/Transaction/MobileTransactionInfo";

const TopBar: React.FC = () => {
  const account = useGetAccount()
  const isMobile = useMediaQuery('');
  const [showTxModal, setShowTxModal] = useState<boolean>(false);

  return (
    <TopBarContainer>
      {
        isMobile
          ? <MobileTransactionInfo openModal={showTxModal} onDismiss={() => setShowTxModal(false)}/>
          : <DesktopTransactionInfo openModal={showTxModal} onDismiss={() => setShowTxModal(false)}/>
      }
      <StyledTopBar>
        <StyledTopBarInner>
          <HideonPhone>
            <div className="single-line-center-between">
              <div className="dialog-class">
                <IconLoader iconName={'Mahalg'} iconType={'brandLogo'} onClick={() => window.location.href = '/#/'}/>
              </div>
              <div className="single-line-center-start">
                {
                  !!account &&
                    <IconLoader
                      iconName={'Transaction'}
                      className={'pointer m-r-12'}
                      onClick={() => setShowTxModal(true)}
                    />
                }
                <ConnectButton/>
              </div>
            </div>
          </HideonPhone>
          <HideOnBigScreen>
            <div className="single-line-center-between">
              <IconLoader iconName={'Mahalg'} iconType={'brandLogo'} onClick={() => window.location.href = '/#/'}/>
            </div>
          </HideOnBigScreen>
        </StyledTopBarInner>
      </StyledTopBar>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;
`;

const HideonPhone = styled.div`
  width: 100%;
  display: block;
  @media (max-width: 600px) {
    display: none;
  };
`;

const HideOnBigScreen = styled.div`
  width: 100%;
  display: none;
  @media (max-width: 600px) {
    display: block;
  };
`;

const StyledTopBar = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  background: rgba(0, 0, 0);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
`;

const StyledTopBarInner = styled.div`
  align-content: center;
  display: flex;
  height: 72px;
  justify-content: space-between;
  width: 100%;
  padding: 0 60px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

export default TopBar;