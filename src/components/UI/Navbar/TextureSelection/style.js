import styled, { css } from "styled-components";

export const TextureSelectionWrapper = styled.div``;
export const Title = styled.h3``;
export const SelectionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -6px;
  margin-right: -6px;

  ${({ isDoorSelection }) =>
    isDoorSelection &&
    css`
      flex-direction: column;
    `}
`;
export const SelectionItem = styled.button`
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  margin: 6px;
  width: calc((100% / 3) - 12px);
  height: 70px;
  background: ${({ isColor, src }) => (isColor ? src : `url(${src})`)};
  background-size: cover;
  transform: none;
  transition: transform 0.08s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0;

  &:focus {
    box-shadow: 0 0 0 5px #555555;
    outline: none;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  &.is-selected {
    transform: scale(0.95);

    &:hover {
      transform: scale(0.95);
    }

    &:before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      transition: 0.2s all;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  ${({ isDoorSelection }) =>
    isDoorSelection &&
    css`
      width: 100%;
      height: auto;
      transform: none;
      background-image: none;

      &:hover {
        transform: none;
      }
    `}

  #tick-mark {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-bottom: 12px;
    transition: 0.2s all;
  }

  #tick-mark.door {
    position: absolute;
    left: 40px;
  }

  #tick-mark::before {
    position: absolute;
    left: 0;
    top: 50%;
    height: 50%;
    width: 3px;
    background-color: #fff;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
  }

  #tick-mark::after {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #fff;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
  }
`;

export const DoorItem = styled.div`
  width: 100%;
  height: auto;
  display: flex;

  .door-img {
    height: 100px;
    width: 100px;

    img {
      width: 100%;
      border-radius: 6px;
      height: 100%;
      object-fit: cover;
    }
  }

  .info-details {
    padding-left: 12px;
  }
`;
