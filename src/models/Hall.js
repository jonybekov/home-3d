import React, { useMemo } from "react";
import {
  TextureLoader,
  sRGBEncoding,
  PMREMGenerator,
  DefaultLoadingManager,
  ACESFilmicToneMapping,
  VideoTexture,
  MeshBasicMaterial,
  GammaEncoding,
} from "three";
import { useLoader, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useModel } from "../state/Store";

export default function Model() {
  const { scene, gl } = useThree();
  const { setModel, setScene, setLightMaps } = useModel((state) => state);
  const loader = new GLTFLoader();
  const pmremGenerator = new PMREMGenerator(gl);
  var pngCubeRenderTarget, pngBackground, envMap;
  const video = document.getElementById("video");
  const videoTexture = new VideoTexture(video);
  videoTexture.encoding = GammaEncoding;

  let [
    CoffeeTableMap,
    CurtainCarpetsMap,
    DecorMap,
    ExteriorMap,
    FramesMap,
    FurnitureMap,
    SofaMap,
    TableMap,
    TV_ShelfMap,
    Empty_ExteriorMap,
    Empty_FurnitureMap,
  ] = useLoader(TextureLoader, [
    "/assets/textures/AssalomHall/CoffeeTable3.webp",
    "/assets/textures/AssalomHall/CurtainCarpets3.webp",
    "/assets/textures/AssalomHall/Decor2.webp",
    "/assets/textures/AssalomHall/Exterior7.jpg",
    "/assets/textures/AssalomHall/Frames.webp",
    "/assets/textures/AssalomHall/Furniture2.webp",
    "/assets/textures/AssalomHall/Sofa2.webp",
    "/assets/textures/AssalomHall/Table2.webp",
    "/assets/textures/AssalomHall/TV_Shelf3.webp",
    "/assets/textures/AssalomHall/Empty_Exterior.webp",
    "/assets/textures/AssalomHall/Empty_Furniture.webp",
  ]);

  // let  = textures;

  useMemo(() => {
    DefaultLoadingManager.onLoad = () => pmremGenerator.dispose();

    setLightMaps({
      empty: [Empty_ExteriorMap, Empty_FurnitureMap],
      nonEmpty: [ExteriorMap, FurnitureMap],
    });

    setScene(scene);

    const textureLoader = new TextureLoader();

    textureLoader.load("/assets/environment/hall_envMap.webp", (texture) => {
      texture.encoding = sRGBEncoding;
      pngCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
      pngBackground = pngCubeRenderTarget.texture;
      texture.dispose();

      envMap = pngCubeRenderTarget.texture;
    });

    pmremGenerator.compileEquirectangularShader();

    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = 4;
    gl.outputEncoding = sRGBEncoding;
    gl.physicallyCorrectLights = true;
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);

    ExteriorMap.flipY = false;
    SofaMap.flipY = false;
    DecorMap.flipY = false;
    CurtainCarpetsMap.flipY = false;
    FramesMap.flipY = false;
    CoffeeTableMap.flipY = false;
    TV_ShelfMap.flipY = false;
    TableMap.flipY = false;
    FurnitureMap.flipY = false;

    loader.load(
      // resource URL
      "/Hall_v11.gltf",
      // called when the resource is loaded
      function (gltf) {
        setModel(gltf.scene);
        scene.add(gltf.scene);

        gltf.scene.traverse((o) => {
          if (o.isMesh) {
            console.log(o.name);
            // o.material.envMap = envMap;
            o.material.envMapIntensity = 0.2;
            o.material.lightMapIntensity = 2;

            if (o.name.includes("Interior_Chandeliers")) {
              o.material.envMap = envMap;
              o.material.envMapIntensity = 1;
              // o.material.lightMap = ChandeliersMap;
              // o.material.lightMapIntensity = 2;
            } else if (o.name.includes("CoffeeTable")) {
              o.material.lightMap = CoffeeTableMap;
              if (o.material.name.includes("CoffeeTable")) {
                o.material.envMap = envMap;
                o.material.envMapIntensity = 0.1;
              }
            } else if (o.name.includes("CurtainCarpet")) {
              o.material.lightMap = CurtainCarpetsMap;
              o.material.lightMapIntensity = 1.5;
            } else if (o.name.includes("Decor")) {
              o.material.lightMap = DecorMap;
              o.material.lightMapIntensity = 1;
            } else if (o.name.includes("Exterior")) {
              o.material.lightMap = ExteriorMap;
            } else if (o.name.includes("Frames")) {
              o.material.lightMap = FramesMap;
              o.material.envMap = envMap;
              o.material.envMapIntensity = 0.3;
              if (o.material.name.includes("Frame_Image")) {
                o.material.roughness = 0;
                o.material.envMapIntensity = 0.3;
              }
            } else if (o.name.includes("Sofa")) {
              o.material.lightMap = SofaMap;
            } else if (o.name.includes("Table")) {
              o.material.lightMap = TableMap;
              if (o.material.name.includes("Tables")) {
                o.material.envMap = envMap;
                o.material.envMapIntensity = 0.3;
              }
              if (o.material.name.includes("Chair_Base")) {
                o.material.envMap = envMap;
              }
              if (o.material.name.includes("Table_Leg_Copper")) {
                o.material.envMap = envMap;
                o.material.envMapIntensity = 0.1;
              }
            } else if (o.name.includes("TV_Shelf")) {
              o.material.lightMap = TV_ShelfMap;
            } else if (o.name.includes("TV_Screen")) {
              o.material = new MeshBasicMaterial({
                map: videoTexture,
              });

              videoTexture.flipY = false;
            } else if (o.name.includes("Door")) {
              o.material.lightMap = FurnitureMap;
            } else if (o.name.includes("Furniture")) {
              o.material.lightMap = FurnitureMap;
            } else if (
              o.name.includes("Dishes") ||
              o.name.includes("Glass") ||
              o.name.includes("TV_Strings") ||
              o.name.includes("Sofa")
            ) {
              o.material.envMap = envMap;
              o.material.envMapIntensity = 0.5;
              if (o.material.name.includes("Glass")) {
                o.material.refractionRatio = 0;
                o.material.envMapIntensity = 1;
              }
            }
            if (
              o.material.name.includes("Handle") ||
              o.material.name.includes("Curtain_Sides")
            ) {
              o.material.envMap = envMap;
            }
          }
        });
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        throw error;
        // console.log("An error happened", error);
      }
    );
  }, []);

  // useMemo(() => {

  // }, []);

  return <></>;
}
