import React from "react";
import { Mixpanel } from "../../analytics/Mixpanel";

export interface ITrackingParams {
  position?: string;
  walletAddress?: string;
  id?: string;
  value?: number;
  gender?: string;
  skin?: string;
}

export type trackingIds =
  | "join-discord"
  | "utilities"
  | "explore-nft"
  | "fuse-nft"
  | "buy-from-kucoin"
  | "buy-from-uniswap"
  | "nft-item"
  | "unstake-nft"
  | "stake-nft"
  | "view-on-opensea"
  | "view-profile"
  | "mint-nft"
  | "minted-nft-share-on-twitter"
  | "profile"
  | "brand-identity"
  | "brand-name"
  | "mahadao"
  | "get-citizenship"
  | "mint-with-maha"
  | "mint-with-eth"
  | "approve-maha"
  | "faq"
  | "free-mint"
  | "minted-nft-view-on-opensea"
  | "choose-traits"
  | "choose-traits-modal"
  | "change-pfp"
  | "check-history";

interface IProps {
  trackingid: trackingIds;
  trackingParams?: ITrackingParams;
}

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  IProps;

const Button = (props: Props) => {
  const { trackingParams = {} } = props;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.onClick) props.onClick(e);
    Mixpanel.track(props.trackingid, { type: "button", ...trackingParams });
  };

  return (
    <button {...props} onClick={handleClick}>
      {props.children}
    </button>
  );
};

export default Button;
