import React, { CSSProperties } from "react";
import Loader from "react-spinners/BeatLoader";
import styled from "styled-components";

import theme from "../../theme";

import TextWrapper from "../TextWrapper";

interface InputContainerProps {
  label: string;
  dataLabel?: string;
  dataValue?: string;
  dontShowBackground?: boolean;
  className?: string;
  children: any;
  dataValueLoading?: boolean;
}

const InputContainer = (props: InputContainerProps) => {
  const {
    dataValueLoading = false,
    label = "",
    dataLabel = "",
    dataValue = "",
    dontShowBackground = false,
    className = "",
    children,
  } = props;

  const IContainerStyle = () => {
    const returnObj: CSSProperties = {};

    if (dontShowBackground) {
      returnObj["padding"] = "0px";
      returnObj["backgroundColor"] = "transparent";
    }

    return returnObj;
  };

  return (
    <IContainer style={IContainerStyle()} className={className}>
      <div className="single-line-center-between m-b-12">
        <TextWrapper
          text={label}
          fontWeight={600}
          color={theme.color.transparent[100]}
          className="p-r-8"
        />
        {dataValueLoading ? (
          <Loader color={"#ffffff"} loading={true} size={4} margin={2} />
        ) : (
          <TextWrapper
            text={`${dataLabel} ${dataValue}`}
            fontWeight={600}
            color={theme.color.transparent[100]}
            align={"right"}
          />
        )}
      </div>
      {children}
    </IContainer>
  );
};

export default InputContainer;

const IContainer = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px;
`;
