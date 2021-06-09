import React, { useRef } from "react";
import Circle from "./Circle";
// import Cube from "../Cubes/Cube";

export default (props) => {
  const group = useRef();
  // const texture1 = "../../assets/images/circle.png";

  // console.log(texture1);
  return (
    <group ref={group} name='floorCircle'>
      {/* <Cube></Cube> */}
      <Circle
        texture='/assets/images/circle.png'
        transparent={true}
        opacity='1'
      />
      <Circle
        texture='/assets/images/marker.png'
        transparent={true}
        opacity='1'
      />
    </group>
  );
};
