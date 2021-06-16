import React from "react";
import * as THREE from "three";
import { useThree, useFrame } from "react-three-fiber";
import { useDrag, useMove } from "react-use-gesture";
import lerp from "lerp";
import gsap from "gsap";
import _ from "lodash";
import { useModel } from "../../state/Store";

function findIntersectItems(array, activeFloor) {
  // var regex = /(Safe_Area|door|wall)/i;
  var result = [];
  array.filter(
    (o) =>
      (o.name === activeFloor && result.push(o)) ||
      result.push(findIntersectItems(o.children || [], activeFloor))
  );
  return _.flatMapDeep(result);
}

const intersectsObjects = (items) => {
  let flatArray = [];

  items.map((el) => {
    if (el.isGroup) {
      flatArray = [...el.children];
    } else if (el.isMesh) {
      flatArray.push(el);
    }
  });

  return flatArray;
};

function Controls({ settings }) {
  const PI_2 = Math.PI / 2;
  const dragSpeed = 3;
  const { yLevel } = settings.floorCircle;

  const { camera, gl, scene, raycaster, mouse } = useThree();

  const floorCircle = React.useRef();
  const yawObject = React.useRef(new THREE.Object3D());
  const pitchObject = React.useRef(new THREE.Object3D());
  const [isMoving, setIsMoving] = React.useState(false);
  const activeFloor = useModel((state) => state.activeFloor);
  let [floorRegex] = React.useState(/(floor|carpet|Safe_Area)/i);

  // drag functions
  let drag = useDrag(
    (state) => {
      const {
        down,
        delta: [mx, my],
        tap,
        first,
      } = state;

      if (tap) {
        raycaster.setFromCamera(mouse, camera);

        let sceneObj = _.find(scene.children, function (o) {
          return o.name === "Scene";
        });

        const intersectsItems = findIntersectItems(
          sceneObj.children,
          activeFloor
        );

        var intersects = raycaster.intersectObjects(intersectsItems, false);

        intersects.map((intersect, i) => {
          let isFloor =
            intersect.object.name.length > 0 &&
            intersect.object.name === activeFloor;

          // if use tapped to the floor tween camera to that position
          if (isFloor) {
            document.getElementsByTagName("body")[0].style.cursor = "pointer";

            setIsMoving(true);

            floorCircle.current.position.copy(intersect.point);

            let tl = gsap.timeline();

            tl.fromTo(
              floorCircle.current.children[0].material,
              0.4,
              {
                opacity: 1,
              },
              {
                opacity: 0,
                onComplete: () => {
                  document.getElementsByTagName("body")[0].style.cursor =
                    "grab";
                  floorCircle.current.children[0].material.opacity = 0;
                  floorCircle.current.children[0].scale.set(1, 1, 1);
                },
              },
              "-=0.4"
            );

            console.log("x: ", intersect.point.x, "z: ", intersect.point.z);

            gsap.to(camera.position, 0.8, {
              x: intersect.point.x,
              z: intersect.point.z,
              onUpdate: () => {
                camera.updateProjectionMatrix();
              },
              onComplete: () => {
                setIsMoving(false);
              },
            });
          }
        });
      }
      // if user starts dragging rotate camera accordingly
      else if (down) {
        let direction = -1;
        if (first) {
          let instructions = document.querySelector(".instructions");
          gsap.to(instructions, 1.5, {
            opacity: 0,
            onComplete: () => (instructions.style.display = "none"),
          });
          document.getElementsByTagName("body")[0].style.cursor = "grab";
        }
        document.getElementsByTagName("body")[0].style.cursor = "grabbing";
        yawObject.current.rotation.y += mx * (dragSpeed / 1000) * direction;
        pitchObject.current.rotation.x += my * (dragSpeed / 1000) * direction;

        pitchObject.current.rotation.x = Math.max(
          -PI_2,
          Math.min(PI_2, pitchObject.current.rotation.x)
        );
      } else {
        document.getElementsByTagName("body")[0].style.cursor = "grab";
      }
    },
    {
      domTarget: gl.domElement, // bind this hook to canvas
      filterTaps: true, //true if differenciating a click from a drag
    }
  );

  // mousemove function is only for desktop
  let move = useMove(
    (state) => {
      raycaster.setFromCamera(mouse, camera);
      let sceneObj = _.find(scene.children, function (o) {
        return o.name === "Scene";
      });

      if (sceneObj) {
        const intersectsItems = findIntersectItems(
          sceneObj.children,
          activeFloor
        );

        var intersects = raycaster.intersectObjects(intersectsItems, true);

        intersects.map((intersectItem) => {
          const name = intersectItem.object.name;

          switch (name) {
            case activeFloor:
              floorCircle.current.visible = true;
              floorCircle.current.position
                .copy(intersectItem.point)
                .add({ x: 0, y: yLevel, z: 0 });
              break;
            case "Furniture_Door":
              console.log("this is door");
              break;
            default:
              floorCircle.current.visible = false;
              break;
          }
        });

        if (intersects.length <= 0) {
          floorCircle.current.visible = false;
        }
      }
    },
    { domTarget: gl.domElement } // bind this hook to canvas
  );

  React.useEffect(drag, [scene]);
  React.useEffect(move, [scene]);

  React.useEffect(() => {
    // camera.rotation.order = "YXZ";
    // camera.rotation.set(0, 0, 0);
    floorCircle.current = _.find(scene.children, function (o) {
      return o.name === "floorCircle";
    });
    // floorCircle.current.visible = false;
  }, [scene]);

  useFrame(() => {
    camera.updateProjectionMatrix();

    camera.rotation.x = lerp(
      camera.rotation.x,
      -pitchObject.current.rotation.x,
      0.2
    );
    camera.rotation.y = lerp(
      camera.rotation.y,
      -yawObject.current.rotation.y,
      0.2
    );
  });

  return <group />;
}

export default Controls;
