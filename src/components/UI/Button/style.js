import styled, { css } from "styled-components";

export const ButtonComponent = styled.button`
  border: 0;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;

  ${({ size }) =>
    size === "large" &&
    css`
      padding: 16px 96px;
      font-size: 18px;
      font-weight: 600;
    `}

  ${({ variant, theme }) =>
    variant === "white" &&
    css`
      color: ${theme.colors.primary.normal};

      &:hover {
        background-color: #eee;
      }
    `}
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.15),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.16), inset 0 0 0 0 rgba(0, 0, 0, 0.1),
    inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
  transition: box-shadow 0.2s, transform 0.2s;
  transform: none;

  &:hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.25),
      inset 0 -1px 0 0 rgba(0, 0, 0, 0.16), inset 0 0 0 0 rgba(0, 0, 0, 0.1),
      inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;
