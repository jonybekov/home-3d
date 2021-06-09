import React from "react";
import { useTranslation } from "react-i18next";

export default function Instructions() {
  const { t } = useTranslation();

  return (
    <>
      <div className='instructions'>
        <div className='instructions__inner'>
          <div className='click-drag'>
            <div className='click-img'>
              <img src='assets/images/hand.png' alt='' />
            </div>
            <p>{t("instructionsText")}</p>
          </div>
          <div className='tap'>
            <div className='tap-img'>
              <img src='assets/images/tap.png' alt='' />
            </div>
            <p>{t("instructionsText2")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
