import styled, { css } from "styled-components";

export const Contacts = styled.div`
  padding: 32px 20px;

  .contact-item {
    display: inline-flex;
    font-size: 1rem;
    align-items: center;
    margin-bottom: 22px;

    span {
      font-weight: 500;
      border-bottom: 1px solid;

      &:hover {
        color: #555;
        border-bottom: 1px solid #fff;
      }
    }
  }

  img {
    width: 20px;
    margin-right: 8px;
  }
`;

export const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  z-index: 10;
  transition: transform 0.3s;

  transform: translateX(300px);
  &.show-nav {
    transform: translateX(0px);
  }
`;
export const NavbarIcon = styled.button`
  outline: none;
  border: 1px solid #eee;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  font-size: 1.5rem;
  padding: 8px 24px;
  margin-top: 32px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  height: 45px;
  color: ${({ theme }) => theme.colors.primary.normal};
  transform: translateX(-68px);
  position: absolute;
  top: 20;
  left: 0;
  z-index: 9;

  #nav-icon4 {
    width: 18px;
    height: 18px;
    position: relative;
    margin: 0 auto;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
  }

  #nav-icon4 span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: ${({ theme }) => theme.colors.primary.normal};
    border-radius: 14px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  #nav-icon4 span:nth-child(1) {
    top: 0px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  #nav-icon4 span:nth-child(2) {
    top: 6px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  #nav-icon4 span:nth-child(3) {
    top: 12px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  #nav-icon4.open span:nth-child(1) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 0px;
    left: 4px;
  }

  #nav-icon4.open span:nth-child(2) {
    width: 0%;
    opacity: 0;
  }

  #nav-icon4.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    top: 14px;
    left: 4px;
  }
`;
export const NavbarContent = styled.div`
  background-color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 300px;
  height: 100vh;
  padding: 24px 0;
  box-shadow: -8px 0px 20px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;

  .logo {
    margin: 0 auto;
    width: fit-content;
    svg {
      width: 80px;
    }
  }

  .title {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary.normal};
    font-weight: bold;
  }
`;

export const LanguageButton = styled.button`
  background-color: #fff;
  cursor: pointer;
  outline: none;
  border: 0;

  ${({ active, theme }) =>
    active
      ? css`
          background-color: ${theme.colors.primary.normal};
          color: #fff;
        `
      : css`
          color: ${theme.colors.primary.normal};

          &:hover {
            background-color: #f2f2f2;
          }
        `};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
`;

export const AccordionWrapper = styled.section`
  .accordion__button {
    /* background-color: ${({ theme }) => theme.colors.primary.normal}; */
    background-color: #fff;
    color: ${({ theme }) => theme.colors.primary.normal};
    font-weight: 500;
    flex-direction: row-reverse;
    display: flex;
    justify-content: space-between;
    margin: 0;
    border: 0;
    /* outline: 0; */
    user-select: none;

    &:before {
      width: 8px;
      height: 8px;
    }
  }
`;
