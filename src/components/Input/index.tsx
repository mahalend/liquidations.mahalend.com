import React from "react";
import styled from "styled-components";

import theme from "../../theme";
import { escapeRegExp } from "../../utils";

export interface InputProps {
  value: string;
  setValue: (text: string) => void;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  disabled?: boolean;
  placeholder?: string;
  maxTag?: boolean;
  onMaxClick?: () => void;
  border?: string;
  className?: string;
  useEnforcer?: boolean;
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

const Input = (props: InputProps) => {
  const {
    value = "",
    setValue,
    inputMode = "decimal",
    disabled = false,
    placeholder = "00.00",
    maxTag = false,
    onMaxClick,
    border = "6px 0 0 6px",
    className = "",
    useEnforcer = true,
  } = props;

  const onValueChange = (value: string) => {
    setValue(value);
  };

  const enforcer = (nextUserInput: string) => {
    if (!useEnforcer) {
      onValueChange(nextUserInput);
      return;
    }

    if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
      onValueChange(nextUserInput);
    }
  };

  return (
    <InputContainer style={{ borderRadius: border }} className={className}>
      <CustomInput
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        type={"string"}
        onChange={(event) => {
          enforcer(event.target.value);
        }}
      />
      {maxTag && (
        <MaxTagConatiner
          onClick={() => {
            if (onMaxClick) onMaxClick();
          }}
        >
          MAX
        </MaxTagConatiner>
      )}
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  background: ${theme.color.dark[500]};
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const CustomInput = styled.input`
  padding: 12px;
  color: #ffffff;
  fontfamily: Inter !important;
  background: transparent;
  border-style: none;
  width: 100%;
  height: 44px;
  font-weight: 600;

  &:focus {
    outline: none;
  }

  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type="number"] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`;

const MaxTagConatiner = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #f7653b;
  padding: 10px 12px;
  background: transparent;
  border-radius: 0 6px 6px 0;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
