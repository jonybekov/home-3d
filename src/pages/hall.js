import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import Navbar from "../components/UI/Navbar";
import LoadingPage from "../components/UI/LoadingPage";
import Camera from "../components/Camera";
import FloorCircle from "../components/FloorCircle";
import Instructions from "../components/UI/Instructions";
import LoadingManager from "../components/LoadingManager";
import { withResizeDetector } from "react-resize-detector";
import Tour from "reactour";

const Controls = React.lazy(() => import("../components/Controls"));
const Model = React.lazy(() => import("../models/Hall"));

const config = {
  controls: {
    floorCircle: { yLevel: -0.03 },
  },
  camera: {},
};

const steps = [
  {
    selector: ".first-step",
    content: "This is the first step",
  },
];

const Hall = ({ width }) => {
  const [fov, setFov] = useState(55);
  const [isTourOpen, setIsTourOpen] = useState(true);

  // {!process.env.NODE_ENV || process.env.NODE_ENV === "development" ? (
  //   <>
  //     <Stats />
  //   </>
  // ) : (
  //   ""
  // )}

  useEffect(() => {
    if (width < 500) {
      setFov(85);
    } else {
      setFov(55);
    }
  }, [width]);

  return (
    <>
      <Canvas gl={{ antialias: true }}>
        <LoadingManager total={46} />
        <Camera fov={fov} position={[1, 1.37, 0]} lookAt={[0, 0, 10]} />
        <Suspense fallback={"Loading.."}>
          <FloorCircle />
          <Model name={"Hall"} />
          <Controls settings={config.controls} />
        </Suspense>
      </Canvas>
      <video
        id='video'
        loop
        crossOrigin='anonymous'
        style={{ display: "none" }}
      >
        <source
          src='/assets/video/promo_compressed.mp4'
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        />
      </video>
      <Instructions />
      <LoadingPage />
      <Navbar active='room-1' />
      {/* <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      /> */}
    </>
  );
};

export default withResizeDetector(Hall);
