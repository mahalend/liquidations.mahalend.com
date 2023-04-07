import React from "react";
import { Mixpanel } from "../../analytics/Mixpanel";
import { ITrackingParams, trackingIds } from "../Button";

interface IProps {
  trackingid: trackingIds;
  trackingParams?: ITrackingParams;
}

type props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Div = (props: IProps & props) => {
  const { trackingParams = {} } = props;
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) props.onClick(e);
    Mixpanel.track(props.trackingid, { type: "div", ...trackingParams });
  };

  return (
    <div {...props} onClick={(event) => handleClick(event)}>
      {props.children}
    </div>
  );
};

export default Div;
