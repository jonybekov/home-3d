import React, { useState } from "react";
import {
  NavbarWrapper,
  NavbarIcon,
  NavbarContent,
  AccordionWrapper,
  LanguageButton,
  Contacts,
} from "./style";
import Map from "../Map";
import { withTheme } from "styled-components";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import HomeInfo from "./HomeInfo";
import TextureSelection from "./TextureSelection";
import { useModel } from "../../../state/Store";
import { doorData, floorData, wallData } from "./data";
import Button from "../Button";
import { useTranslation } from "react-i18next";

const accordionList = [
  {
    id: 1,
    title: "flooring",
    type: "Floor",
    isDoorSelection: false,
    data: floorData,
  },
  {
    id: 2,
    title: "wallPaint",
    type: "Wall",
    isDoorSelection: false,
    data: wallData,
  },
  {
    id: 3,
    title: "doors",
    type: "Door",
    isDoorSelection: true,
    data: doorData,
  },
];

const Navbar = ({ active, theme }) => {
  let nav = React.useRef();
  let navIcon = React.useRef();
  const { t, i18n } = useTranslation();
  const isRussian = i18n.language === "ru" ? true : false;

  const [toggleFurniture, setToggleFurniture] = useState(false);

  const { model, scene, setActiveFloor, lightMaps } = useModel(
    (state) => state
  );

  function handleOpen() {
    if (nav.current.classList.contains("show-nav")) {
      nav.current.classList.remove("show-nav");
    } else {
      nav.current.classList.add("show-nav");
    }

    if (navIcon.current.classList.contains("open")) {
      navIcon.current.classList.remove("open");
    } else {
      navIcon.current.classList.add("open");
    }
  }

  function handleDisableFurniture() {
    if (model) {
      model.traverse((o) => {
        if (o.isMesh) {
          if (o.name.includes("Interior")) {
            o.visible = toggleFurniture;
          }

          if (o.name === "Empty_Safe_Area") {
            scene.remove(o);
            o.geometry.dispose();
            o.material.dispose();
          }

          if (!toggleFurniture) {
            setActiveFloor("Empty_Safe_Area");
            if (o.name.includes("Exterior")) {
              lightMaps.empty[0].flipY = false;
              o.material.lightMap = lightMaps.empty[0];
            } else if (o.name.includes("Furniture")) {
              lightMaps.empty[1].flipY = false;
              o.material.lightMap = lightMaps.empty[1];
            }
          } else {
            setActiveFloor("Safe_Area");
            if (o.name.includes("Exterior")) {
              lightMaps.nonEmpty[0].flipY = false;
              o.material.lightMap = lightMaps.nonEmpty[0];
            } else if (o.name.includes("Furniture")) {
              lightMaps.nonEmpty[1].flipY = false;
              o.material.lightMap = lightMaps.nonEmpty[1];
            }
          }

          setToggleFurniture(!toggleFurniture);
        }
      });
    }
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <NavbarWrapper ref={nav}>
      <NavbarIcon onClick={handleOpen}>
        <div id='nav-icon4' ref={navIcon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </NavbarIcon>
      <NavbarContent>
        <div className='logo' style={{ marginBottom: 20 }}>
          <img
            src='/assets/images/golden-house.svg'
            style={{ width: 120 }}
            alt=''
          />
        </div>
        <div className='title'>{t("subtitle")}</div>
        <div
          style={{
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <LanguageButton
            onClick={() => changeLanguage("uz")}
            active={!isRussian}
          >
            o'zbekcha
          </LanguageButton>
          <LanguageButton
            onClick={() => changeLanguage("ru")}
            active={isRussian}
          >
            русский
          </LanguageButton>
        </div>
        <Map />
        <HomeInfo />

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Button onClick={handleDisableFurniture}>
            {toggleFurniture
              ? t("enableFurnitureBtn")
              : t("disableFurnitureBtn")}
          </Button>
        </div>

        <AccordionWrapper>
          <Accordion allowZeroExpanded preExpanded={[1]}>
            {accordionList.map((item) => (
              <AccordionItem key={item.id} uuid={item.id}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    {t("accordion:" + item.title)}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <TextureSelection
                    doorSelection={item.isDoorSelection}
                    data={item.data}
                    type={item.type}
                  />
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionWrapper>
        <Contacts>
          <h2>{t("contactsTitle")}</h2>
          <a className='contact-item' href='mailto:want@home3d.uz'>
            <img src='/assets/images/email.svg' alt='' />
            <span>want@home3d.uz</span>
          </a>
          <a className='contact-item' href='tel:+998 97 721 07 66'>
            <img src='/assets/images/call.svg' alt='' />
            <span>+998 97 721 07 66</span>
          </a>
        </Contacts>
        <div
          style={{
            padding: "32px 20px 64px",
            textAlign: "center",
            fontSize: 14,
            color: "#ccc",
          }}
        >
          <p> home3d v0.1 beta</p>
          <p> {t("copyright")}</p>
          <p> 2020 © Raisense</p>
        </div>
      </NavbarContent>
    </NavbarWrapper>
  );
};

export default withTheme(Navbar);
