import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "react-three-fiber";

export default ({ fov = 55, ...props }) => {
  // const { x, z } = pos;
  const ref = useRef();
  const { setDefaultCamera, gl } = useThree();
  // camera.position.set();
  useEffect(() => {
    ref.current.rotation.order = "YXZ";
    setDefaultCamera(ref.current);
  }, []);
  useFrame((state, delta) => {
    ref.current.updateMatrixWorld();
  });

  // gl.toneMapping = THREE.LinearToneMapping;
  gl.outputEncoding = THREE.sRGBEncoding;
  gl.physicallyCorrectLights = true;
  gl.shadowMap.enabled = true;

  return (
    <perspectiveCamera
      ref={ref}
      fov={55}
      far={100}
      near={0.1}
      // position={[1.3, 1.35, 2.6]}
      {...props}
    />
  );
};
