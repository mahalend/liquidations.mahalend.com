import React from "react";
import Loader from "react-spinners/PulseLoader";
import styled from "styled-components";

import theme from "../../theme";
import IconLoader, { IconLoaderProps } from "../IconLoader";
import { BackgroundAbsolute } from "../Selector";
import TextWrapper from "../TextWrapper";

interface CollateralDropDownProps {
  selectedSymbol: IconLoaderProps["iconName"];
  symbols?: IconLoaderProps["iconName"][];
  multiIcons?: boolean;
  multiIconsSymbols?: IconLoaderProps["iconName"][];
  showDropDown?: boolean;
  toggleDropDown?: () => void;
  hasDropDown?: boolean;
  ondropDownValueChange?: (value: IconLoaderProps["iconName"]) => void;
  border?: string;
  loading?: boolean;
}

const CollateralDropDown = (props: CollateralDropDownProps) => {
  const {
    loading = false,
    selectedSymbol,
    symbols,
    multiIcons = false,
    multiIconsSymbols,
    showDropDown = false,
    toggleDropDown,
    hasDropDown = false,
    ondropDownValueChange,
    border = "0 6px 6px 0",
  } = props;

  return (
    <MainContainer>
      {!multiIcons ? (
        <Container
          style={{ borderRadius: border }}
          className={"single-line-center-start"}
          onClick={() => {
            if (toggleDropDown) toggleDropDown();
          }}
        >
          {loading ? (
            <Loader color={"#ffffff"} loading={loading} size={4} margin={2} />
          ) : (
            <IconLoader
              iconName={selectedSymbol}
              iconType={"tokenSymbol"}
              height={20}
              width={20}
            />
          )}
          {!loading && (
            <TextWrapper
              text={selectedSymbol}
              fontWeight={600}
              color={theme.color.transparent[100]}
              className={"m-l-8"}
            />
          )}
          {hasDropDown && (
            <IconLoader
              iconName={showDropDown ? "ArrowUp" : "ArrowDown"}
              iconType={"arrow"}
              height={16}
              width={16}
              className={"m-l-8"}
            />
          )}
        </Container>
      ) : (
        <Container
          style={{ borderRadius: border }}
          className={"single-line-center-start"}
          onClick={() => {
            if (toggleDropDown) toggleDropDown();
          }}
        >
          {multiIconsSymbols?.map((data, index) => {
            return (
              <IconLoader
                key={`${data}${index}`}
                iconName={data}
                iconType={"tokenSymbol"}
                height={20}
                width={20}
                className={index !== 0 ? "m-l--4" : ""}
              />
            );
          })}
          <div className="m-l-8 single-line-center-start">
            {multiIconsSymbols?.map((data, index) => {
              return (
                <TextWrapper
                  key={`${data}${index}`}
                  text={index === 0 ? data : `-${data}`}
                  fontWeight={600}
                  color={theme.color.transparent[100]}
                />
              );
            })}
          </div>
          {hasDropDown && (
            <IconLoader
              iconName={showDropDown ? "ArrowUp" : "ArrowDown"}
              iconType={"arrow"}
              height={16}
              width={16}
              className={"m-l-8"}
            />
          )}
        </Container>
      )}
      {showDropDown && (
        <BackgroundAbsolute
          onClick={() => {
            if (toggleDropDown) toggleDropDown();
          }}
        />
      )}

      {hasDropDown && showDropDown && (
        <CustomDropDownContainer>
          {symbols?.map((item, index) => {
            return (
              <CustomDropDownLi
                onClick={() => {
                  if (ondropDownValueChange) ondropDownValueChange(item);
                }}
                key={index}
              >
                <IconLoader
                  iconName={item}
                  iconType={"tokenSymbol"}
                  height={20}
                  width={20}
                />
                <CustomDropDownLiText>{item}</CustomDropDownLiText>
              </CustomDropDownLi>
            );
          })}
        </CustomDropDownContainer>
      )}
    </MainContainer>
  );
};

export default CollateralDropDown;

const MainContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const Container = styled.div`
  height: 44px;
  padding: 12px;
  background: #1f1e1e;
`;

const CustomDropDownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 111;
  background: #1f1e1e;
  border-radius: 6px;
  min-width: max-content;
`;

const CustomDropDownLi = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 12px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(62, 62, 62, 0.31);
  }
`;

const CustomDropDownLiText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  margin-left: 5px;
`;
