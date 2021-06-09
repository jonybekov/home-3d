import React from "react";

export default () => {
  return (
    <div className='credits'>
      <a href='#' target='_BLANK'></a>
      <style>{`
        .credits {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 10;
          color: white;
          font-family: "Noto Sans JP", sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: -0.02em;
          opacity: 0.5;
          transition: all 0.6s;
        }

        .credits:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
