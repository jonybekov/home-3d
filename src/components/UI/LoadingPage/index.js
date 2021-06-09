import React, { useRef, useEffect } from "react";
import Logo from "../Logo";
import LoadingIndicator from "../LoadingIndicator";
import Button from "../Button";
import { useLoader } from "../../../state/Store";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { LoadingContent, LoadingPageWrapper } from "./style";
import gsap from "gsap";

export default () => {
  const pageRef = useRef();
  const contentRef = useRef();
  const buttonRef = useRef();
  const logoRef = useRef();
  const bgImageRef = useRef();
  const { progress, reset } = useLoader();
  const { t } = useTranslation();
  const location = useLocation();

  const closeAnimation = () => {
    const tl = gsap.timeline();
    const indicatorProgressRef = document.querySelector(".indicator-progress");
    // const indicatorTextRef = document.querySelectorAll(".indicator-text");

    tl.to(buttonRef.current, 0.1, { y: -20, opacity: 0 });
    tl.to(logoRef.current, 0.3, { y: -20, opacity: 0 });
    tl.to(indicatorProgressRef, 0.3, { x: -20, scaleX: 0 });
    tl.to(".indicator-text", 0.3, {
      x: -20,
      opacity: 0,
      stagger: 0.2
    });
    tl.to(contentRef.current, 0.4, { x: "-100%" });
    tl.to(bgImageRef.current, 1, {
      opacity: 0,
      onComplete: () => {
        const video = document.getElementById("video");
        reset();
        bgImageRef.current.style.display = "none";

        if (video) {
          video.play();
        }
        pageRef.current.classList.add("hidden");
      }
    });
  };

  const onClose = () => {
    closeAnimation();
  };

  return (
    <LoadingPageWrapper ref={pageRef}>
      <LoadingContent ref={contentRef}>
        <div className='inner'>
          <div className='logo-animations' ref={logoRef}>
            <Logo />
          </div>
          <LoadingIndicator progress={progress} />

          {progress >= 100 ? (
            <div ref={buttonRef} onClick={onClose}>
              <Button
                size='large'
                variant='white'
                className={progress >= 100 ? "animate" : null}
              >
                {t("enterBtn")}
              </Button>
            </div>
          ) : null}
        </div>
        <div className='copyright'>
          <p className='text'>powered by</p>
          <a href='https://raisense.uz'>
            <img src='/assets/images/raisense_white.png' alt='' />
          </a>
        </div>
      </LoadingContent>
      <div className='bg-image' ref={bgImageRef}>
        {location.pathname === "/hall" ? (
          <img src='/hall_wallpaper.webp' alt='' />
        ) : (
          <img src='/room_1_wallpaper.webp' alt='' />
        )}
      </div>
    </LoadingPageWrapper>
  );
};
