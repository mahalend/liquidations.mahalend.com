import React from "react";
import { Mixpanel } from "../../analytics/Mixpanel";
import { ITrackingParams, trackingIds } from "../Button";

interface IProps {
  trackingid: trackingIds;
  trackingParams?: ITrackingParams;
}

type props = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const Anchor = (props: IProps & props) => {
  const { trackingParams } = props;
  const handleClick = () => {
    Mixpanel.track(props.trackingid, {
      type: "links",
      link: props.href,
      ...trackingParams,
    });
  };

  return (
    <a {...props} onClick={handleClick}>
      {props.children}
    </a>
  );
};

export default Anchor;
