import { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

import gsap from "gsap";
import * as THREE from "three";

import { models, sizes } from "../constants";
import ModelView from "./ModelView";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: models[0].title,
    color: models[0].color,
    img: models[0].img,
  });

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  // Initialize timeline in useGSAP for better lifecycle management, or ensure it's stable
  const tl = useRef(gsap.timeline({
    onStart: () => console.log("Model transition timeline started from tl ref"),
    onComplete: () => console.log("Model transition timeline completed from tl ref"),
  }));

  useEffect(() => {
    console.log(`Model size changed to: ${size}. Small rotation: ${smallRotation}, Large rotation: ${largeRotation}`);

    // Clear previous animations from the timeline before adding new ones
    // to prevent appending to a completed or partially played timeline.
    tl.current.clear();

    if (size === "large") {
      animateWithGsapTimeline(tl.current, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
        ease: "expo.inOut", // Added ease
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl.current, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
        ease: "expo.inOut", // Added ease
      });
    }
    // Optionally, restart the timeline if it might have completed.
    // tl.current.play(0); // This ensures it plays from the start.
    // However, animateWithGsapTimeline just adds to it. GSAP handles playing new tweens.
  }, [size, smallRotation, largeRotation]); // Added smallRotation and largeRotation to dependencies

  useGSAP(() => {
    // Initial animation for the heading, independent of model size changes
    gsap.to("#heading", { y: 0, opacity: 1 });

    // Initialize the timeline reference here if preferred
    // tl.current = gsap.timeline(...);
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
