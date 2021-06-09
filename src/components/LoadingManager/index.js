import React from "react";
import { DefaultLoadingManager } from "three";
import { useLoader } from "../../state/Store";

export default ({ total = 40 }) => {
  const { setProgress } = useLoader();

  React.useEffect(() => {
    DefaultLoadingManager.onProgress = function (url, itemsLoaded) {
      const progressPercent = Math.floor((itemsLoaded / total) * 100);

      setProgress(progressPercent);
    };
  }, []);

  return <group></group>;
};
