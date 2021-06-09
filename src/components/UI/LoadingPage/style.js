import styled from "styled-components";

export const LoadingPageWrapper = styled.section`
  width: 100%;
  height: 100%;

  & > .bg-image {
    object-fit: contain;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 11;
    background-color: #fff;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;
  }
`;

export const LoadingContent = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.normal};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 12;
  color: #fff;
  height: 100%;
  width: 50%;
  clip-path: polygon(0 0, 100% 0, 71% 100%, 0% 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 64px;
  padding-right: 64px;
  box-shadow: 2px 0 5px 0 rgba(0, 0, 0, 0.3);

  /* box-sizing: border-box; */
  /* align-items: center; */

  .copyright {
    justify-self: flex-end;
    margin-top: auto;
    margin-bottom: 64px;

    .text {
      font-size: 14px;
      margin-bottom: 8px;
    }
    /* justify-self: flex-end; */
  }

  .inner {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    height: 200px;
  }

  @media (max-width: 567px) {
    width: 100%;
    clip-path: none;
    box-sizing: border-box;

    padding-left: 24px;
    padding-right: 24px;

    .inner {
      width: 100%;
    }
  }
`;
