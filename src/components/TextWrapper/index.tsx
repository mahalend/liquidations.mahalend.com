import React from "react";
import styled from "styled-components";

export interface TextWrapperProps {
  fontFamily?: "Inter" | "Syne";
  fontStyle?: string;
  fontWeight?: "bold" | 300 | 600;
  fontSize?: 44 | 32 | 24 | 18 | 16 | 14 | 12;
  FletterSpacing?: string;
  Fcolor?: string;
  text: string | JSX.Element;
  align?: "left" | "center" | "right";
  className?: string;
  lineHeight?: string;
}

const TextWrapper = (props: TextWrapperProps) => {
  const {
    fontFamily = "Inter",
    fontStyle = "normal",
    fontWeight = 300,
    fontSize = 14,
    FletterSpacing = "normal",
    Fcolor = "#FFFFFF",
    text = "",
    className = "",
    align = "left",
  } = props;

  if (typeof text === "string") {
    return (
      <StyledText
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        letterSpacing={FletterSpacing}
        fcolor={Fcolor}
        style={{ color: Fcolor }}
        className={className}
        align={align}
      >
        {text}
      </StyledText>
    );
  } else {
    return (
      <StyledDiv
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        letterSpacing={FletterSpacing}
        fcolor={Fcolor}
        style={{ color: Fcolor }}
        className={className}
        align={align}
      >
        {text}
      </StyledDiv>
    );
  }
};

export default TextWrapper;

interface StyledTextProps {
  fontFamily: "Inter" | "Syne";
  fontStyle: string;
  fontWeight: "bold" | 300 | 600;
  fontSize: 44 | 32 | 24 | 18 | 16 | 14 | 12;
  letterSpacing: string;
  align: "left" | "center" | "right";
  fcolor: string;
}

const StyledText = styled.p<StyledTextProps>`
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  letter-spacing: ${(props) => props.letterSpacing};
  text-align: ${(props) => props.align};
`;

const StyledDiv = styled.div<StyledTextProps>`
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  letter-spacing: ${(props) => props.letterSpacing};
  text-align: ${(props) => props.align};
`;
