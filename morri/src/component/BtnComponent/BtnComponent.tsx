import React, { ReactNode } from "react";
import styled from "@emotion/styled";

interface BtnComponentProps {
  btnColorType: "close" | "primary";
  btnText: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const StyledButton = styled.button<{ colorType: "close" | "primary" }>`
  padding: 8px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Add space between icon and text */
  color: #ffffff;
  background-color: ${({ colorType }) =>
    colorType === "close" ? "#3E5C63" : "#EFB26A"};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  /* Disabled styles */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const BtnComponent: React.FC<BtnComponentProps> = ({
  btnColorType,
  btnText,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledButton
      colorType={btnColorType}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {btnText}
    </StyledButton>
  );
};

export default BtnComponent;
