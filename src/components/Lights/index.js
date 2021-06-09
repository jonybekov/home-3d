import React from "react";
import { useControl } from "react-three-gui";

export default () => {
  const ambientLight = useControl("intensity", {
    type: "number",
    group: "AMBIENT LIGHT"
  });
  const hemisphereLight = useControl("intensity", {
    type: "number",
    group: "HEMISPHERE LIGHTS",
    value: 0.5
  });
  const pointLight = useControl("intensity", {
    type: "number",
    group: "POINT LIGHTS"
  });
  const directionalLight = useControl("intensity", {
    type: "number",
    group: "DIRECTIONAL LIGHTS"
  });
  const posX = useControl("posX", {
    type: "number",
    group: "POINT LIGHTS",
    min: -10,
    max: 10
  });
  const posY = useControl("posY", {
    type: "number",
    group: "POINT LIGHTS",
    min: -10,
    max: 10
  });
  const posZ = useControl("posZ", {
    type: "number",
    group: "POINT LIGHTS",
    min: -10,
    max: 10
  });
  return (
    <group>
      {/* <directionalLight position={[-3, 4, -6]} /> */}
      <ambientLight intensity={ambientLight} />
      <hemisphereLight intensity={hemisphereLight} />
      <pointLight
        intensity={pointLight}
        position-x={posX}
        position-y={posY}
        position-z={posZ}
      />
    </group>
  );
};
