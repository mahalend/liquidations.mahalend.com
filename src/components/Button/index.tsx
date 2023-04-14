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

export type trackingIds = "liquidate" | "liquidate-modal" | "approve";

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
