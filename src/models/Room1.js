import React, { useMemo, useRef } from "react";
import {
  TextureLoader,
  sRGBEncoding,
  PMREMGenerator,
  LinearToneMapping,
  DefaultLoadingManager
} from "three";
import { useLoader, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useModel } from "../state/Store";

export default function Model() {
  const { scene, gl } = useThree();
  const { setModel, setLightMaps, setScene } = useModel((state) => state);
  const loader = new GLTFLoader();
  const pmremGenerator = new PMREMGenerator(gl);
  let pngCubeRenderTarget = useRef();
  let pngBackground = useRef();
  let envMap = useRef();
  let envMap2 = useRef();
  // const video = document.getElementById("video");
  // const videoTexture = new VideoTexture(video);
  // videoTexture.encoding = sRGBEncoding;

  // videoTexture.minFilter = LinearFilter;
  // videoTexture.magFilter = LinearFilter;
  // videoTexture.format = RGBFormat;

  let [
    exteriorLightMap,
    interiorLightMap_1,
    interiorLightMap_2,
    interiorLightMap_3,
    Empty_ExteriorMap
  ] = useLoader(TextureLoader, [
    "/assets/textures/room2/Exterior_LightMap_compressed.jpg",
    "/assets/textures/room2/Interior_1_LightMap_compressed.webp",
    "/assets/textures/room2/Interior_2_LightMap_compressed.webp",
    "/assets/textures/room2/Interior_3_LightMap_compressed.webp",
    "/assets/textures/room2/Exterior_Empty_LightMap.webp"
  ]);

  useMemo(() => {
    DefaultLoadingManager.onLoad = () => pmremGenerator.dispose();
    setLightMaps({
      empty: [Empty_ExteriorMap],
      nonEmpty: [exteriorLightMap]
    });
    setScene(scene);

    const textureLoader = new TextureLoader();

    textureLoader.load("assets/environment/room_2_1.webp", (texture) => {
      texture.encoding = sRGBEncoding;
      pngCubeRenderTarget.current = pmremGenerator.fromEquirectangular(texture);
      pngBackground.current = pngCubeRenderTarget.current.texture;
      // scene.background = pngBackground;
      texture.dispose();
      envMap.current = pngCubeRenderTarget.current.texture;
    });

    textureLoader.load("assets/environment/room_2_2.webp", (texture) => {
      texture.encoding = sRGBEncoding;
      pngCubeRenderTarget.current = pmremGenerator.fromEquirectangular(texture);
      pngBackground.current = pngCubeRenderTarget.current.texture;
      envMap2.current = pngCubeRenderTarget.current.texture;
      texture.dispose();
    });

    textureLoader.load("assets/environment/hdri3_compressed.jpg", (texture) => {
      texture.encoding = sRGBEncoding;
      pngCubeRenderTarget.current = pmremGenerator.fromEquirectangular(texture);
      pngBackground.current = pngCubeRenderTarget.current.texture;
      scene.background = pngBackground.current;
      texture.dispose();
    });

    pmremGenerator.compileEquirectangularShader();

    gl.toneMapping = LinearToneMapping;
    gl.toneMappingExposure = 4;
    gl.outputEncoding = sRGBEncoding;
    gl.physicallyCorrectLights = true;
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);

    exteriorLightMap.flipY = false;
    interiorLightMap_1.flipY = false;
    interiorLightMap_2.flipY = false;
    interiorLightMap_3.flipY = false;

    loader.load(
      // resource URL
      "/Room_2.gltf",
      // called when the resource is loaded
      function(gltf) {
        setModel(gltf.scene);
        scene.add(gltf.scene);
        gltf.scene.traverse((o) => {
          if (o.isMesh) {
            console.log(o.name);
            o.material.envMapIntensity = 0.2;
            o.material.lightMapIntensity = 2;

            if (
              o.name.includes("Exterior") &&
              !o.name.includes("Curtain_Exterior")
            ) {
              o.material.lightMap = exteriorLightMap;
              if (o.material.name.includes("Door_Handle")) {
                o.material.envMap = envMap;
              }
            } else if (o.name.includes("Interior_1")) {
              o.material.lightMap = interiorLightMap_1;
              o.material.lightMapIntensity = 2;
            } else if (o.name.includes("Interior_2")) {
              o.material.lightMap = interiorLightMap_2;
              o.material.lightMapIntensity = 1;
              if (
                o.material.name.includes("Mac_Corpus") ||
                o.material.name.includes("Mac_Screen") ||
                o.material.name.includes("Mac_Keyboard")
              ) {
                o.material.envMap = envMap;
                o.material.envMapIntensity = 0.3;
              }
              if (o.material.name.includes("TV_Screen")) {
                o.material.envMap = envMap2;
                o.material.roughness = 0;
                o.material.envMapIntensity = 0.3;
              }
            } else if (o.name.includes("Interior_3")) {
              o.material.lightMap = interiorLightMap_3;
              o.material.lightMapIntensity = 1;
              o.material.envMap = envMap;
              o.material.envMapIntensity = 0.3;
              o.material.roughness = 0;
            } else if (o.name.includes("Glasses")) {
              o.material.envMap = envMap;
              o.material.roughness = 0;
              o.material.refractionRatio = 0;
              o.material.opacity = 0.2;
              o.material.metalness = 1;
              o.material.envMapIntensity = 2;
            } else if (o.name.includes("Lamp")) {
              if (o.material.name.includes("Lamp_Corpus")) {
                o.material.envMap = envMap;
                o.material.roughness = 0.2;
                o.material.envMapIntensity = 1;
              }
            } else {
              o.material.envMapIntensity = 1;
            }
            o.material.needsUpdate = true;
          }
        });
      },
      // called while loading is progressing
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function(error) {
        throw error;
        // console.log("An error happened", error);
      }
    );
  }, []);

  // useMemo(() => {

  // }, []);

  //   console.log(scene);
  // let [
  //   exteriorLightMap,
  //   interiorLightMap_1,
  //   interiorLightMap_2,
  //   interiorLightMap_3,
  //   exteriorAOMap,
  //   interiorAOMap_1,
  //   interiorAOMap_2,
  //   interiorAOMap_3
  // ] = useLoader(TextureLoader, [
  //   "/assets/textures/AssalomHall/CoffeTable.jpg",
  //   "/assets/textures/AssalomHall/CurtainCarpets.jpg",
  //   "/assets/textures/AssalomHall/Decor.jpg",
  //   "/assets/textures/AssalomHall/Exterior.jpg",
  //   "/assets/textures/AssalomHall/Exterior2.jpg",
  //   "/assets/textures/AssalomHall/Frames.jpg",
  //   "/assets/textures/AssalomHall/Furniture.jpg",
  //   "/assets/textures/AssalomHall/Sofa.jpg",
  //   "/assets/textures/AssalomHall/Table.jpg",
  //   "/assets/textures/AssalomHall/TV_Shelf.jpg"
  // ]);

  //   let texture = useLoader(
  //     TextureLoader,
  //     "assets/environment/hdri3_compressed.jpg"
  //   );

  return (
    <></>
    // <ModelContext.Provider>
    // {/* <primitive object={model.current} dispose={null} /> */}
    // {/* </ModelContext.Provider> */}
  );
}
