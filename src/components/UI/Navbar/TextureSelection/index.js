import React, { useState } from "react";
import { useModel } from "../../../../state/Store";
import { TextureLoader, RepeatWrapping, sRGBEncoding, Color } from "three";
import {
  TextureSelectionWrapper,
  Title,
  SelectionList,
  SelectionItem,
  DoorItem
} from "./style";
import { useTranslation } from "react-i18next";

const onSelectItem = (model, item, type, setSelectedItem) => {
  const { textureImg } = item;
  const loader = new TextureLoader();
  const color = new Color(item.color);
  // loader.crossOrigin = "";

  if (model) {
    model.traverse((o) => {
      if (o.name.includes(type)) {
        if (type === "Wall") {
          o.material.color = color;
          // o.material.shininess = 6;
        } else if (type === "Door") {
          loader.load(
            textureImg,
            (texture) => {
              texture.repeat.set(4, 4);
              texture.wrapS = RepeatWrapping;
              texture.wrapT = RepeatWrapping;
              texture.flipY = false;
              o.material.map = texture;
              o.material.needsUpdate = true;
            },
            (xhr) => {},
            (error) => {
              console.log(error);
            }
          );
        } else {
          loader.load(
            textureImg,
            (texture) => {
              texture.repeat.set(4, 4);
              texture.encoding = sRGBEncoding;
              texture.wrapS = RepeatWrapping;
              texture.wrapT = RepeatWrapping;
              o.material.map = texture;
              // o.material.needsUpdate = true;
            },
            (xhr) => {},
            (error) => {
              console.log(error);
            }
          );
        }

        // o.material = floorMaterial;
        // o.material.needsUpdate = true;
      }
    });

    setSelectedItem(item);
  }
};

export default function TextureSelection({
  data,
  type,
  doorSelection = false
}) {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState({
    id: null
  });

  const model = useModel((state) => state.model);

  // const type = "Floor";

  return (
    <TextureSelectionWrapper isDoorSelection={doorSelection}>
      <Title>{t("accordion:selectedPlaceholder")}:</Title>
      <SelectionList>
        {data.map((item) => {
          const isSelected = selectedItem.id === item.id;

          return (
            <SelectionItem
              onClick={() => onSelectItem(model, item, type, setSelectedItem)}
              isDoorSelection={doorSelection}
              key={item.id}
              className={isSelected ? "is-selected" : null}
              src={item.textureImg ? item.textureImg : item.color}
              isColor={item.color}
              title={item.name}
            >
              {isSelected ? (
                <div
                  id='tick-mark'
                  className={doorSelection ? "door" : null}
                ></div>
              ) : null}
              {doorSelection ? (
                <DoorItem>
                  <div className='door-img'>
                    <img src={item.textureImg} alt='' />
                  </div>
                  <div className='info-details'>
                    <h1>IKEA - 9203</h1>
                    <p>
                      <strong> color:</strong> white wood
                    </p>
                    <p>
                      <strong>lock:</strong> german hurtz
                    </p>
                  </div>
                </DoorItem>
              ) : null}
            </SelectionItem>
          );
        })}
      </SelectionList>
    </TextureSelectionWrapper>
  );
}
