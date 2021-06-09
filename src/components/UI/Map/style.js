import styled, { css } from "styled-components";
import { lighten, rgba } from "polished";

export const MapWrapper = styled.div`
  background: ${({ theme }) => lighten(0.58, theme.colors.primary.normal)};
  border-radius: 8px;
  padding: 12px;
  margin: 0 24px;

  .map-content {
    position: relative;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 12px;

    svg {
      /* width: 100%; */
    }
  }
`;

export const MapPoints = styled.ul`
  list-style: none;
  position: absolute;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const MapPoint = styled.li`
  width: 18px;
  height: 18px;
  position: absolute;
  top: ${({ topOffset }) => topOffset}px;
  left: ${({ leftOffset }) => leftOffset}px;
  border-radius: 50%;

  border: 2px solid #ccc;
  box-shadow: inset 0 0 0 4px #eee;
  background-color: #ccc;

  ${({ active, theme }) =>
    active &&
    css`
      box-shadow: none;
      border: none;
      width: 10px;
      height: 10px;
      background-color: ${theme.colors.primary.normal};
      box-shadow: 0 0 0 5px ${rgba(theme.colors.primary.normal, 0.5)},
        0 0 0 10px ${rgba(theme.colors.primary.normal, 0.1)};
    `}
`;
