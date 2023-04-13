import React from "react";
import Loader from "react-spinners/BeatLoader";

import theme from "../../theme";
import TextWrapper, { TextWrapperProps } from "../TextWrapper";

interface Iprops {
  label?: string;
  value?: string;
  valueTag?: string;
  isValueLoading?: boolean;

  labelFontSize?: TextWrapperProps["fontSize"];
  labelFontWeight?: TextWrapperProps["fontWeight"];
  labelFontColor?: string;

  valueFontSize?: TextWrapperProps["fontSize"];
  valueFontWeight?: TextWrapperProps["fontWeight"];
  valueFontColor?: string;
  className?: string;
}

const DataField = (props: Iprops) => {
  const {
    label,
    value,
    valueTag,
    isValueLoading = false,
    labelFontSize = 14,
    labelFontColor = theme.color.transparent[100],
    labelFontWeight = 300,
    valueFontSize = 14,
    valueFontColor = "#FFFFFF",
    valueFontWeight = 300,
    className = "",
  } = props;

  return (
    <div className={`single-line-center-between ${className}`}>
      <div className="single-line-center-start">
        {label && (
          <TextWrapper
            text={label}
            fontWeight={labelFontWeight}
            color={labelFontColor}
            fontSize={labelFontSize}
          />
        )}
      </div>
      <div className="single-line-center-start">
        {value && isValueLoading ? (
          <Loader color={"#ffffff"} loading={true} size={2} margin={2} />
        ) : (
          <TextWrapper
            text={value || ""}
            fontWeight={valueFontWeight}
            color={valueFontColor}
            fontSize={valueFontSize}
          />
        )}
        {valueTag && (
          <div className="tags m-l-4">
            <TextWrapper
              text={valueTag}
              fontWeight={valueFontWeight}
              fontSize={valueFontSize}
              color={"#FFFFFF88"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataField;
