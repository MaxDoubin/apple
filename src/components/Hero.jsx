import React, { useEffect, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { heroVideo, smallHeroVideo } from "../assets";

const getInitialVideoSource = () =>
  typeof window !== "undefined" && window.innerWidth < 760
    ? smallHeroVideo
    : heroVideo;

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(getInitialVideoSource);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 759px)");
    const updateVideoSource = ({ matches }) => {
      setVideoSrc(matches ? smallHeroVideo : heroVideo);
    };

    updateVideoSource(mediaQuery);
    mediaQuery.addEventListener("change", updateVideoSource);

    return () => mediaQuery.removeEventListener("change", updateVideoSource);
  }, []);

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });

    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2,
    });
  }, []);

  return (
    <section
      aria-labelledby="hero"
      className="nav-height relative w-full bg-black"
    >
      <div className="flex-center h-5/6 w-full flex-col">
        <h1 id="hero" className="hero-title">
          iPhone 15 Pro
        </h1>

        <div className="w-9/12 md:w-10/12">
          <video
            autoPlay
            muted
            playsInline
            aria-hidden="true"
            key={videoSrc}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex translate-y-20 flex-col items-center opacity-0"
      >
        <a href="#highlights" className="btn">
          Explore highlights
        </a>
        <p className="text-xl font-normal">Unofficial interactive product demo</p>
      </div>
    </section>
  );
};

export default Hero;
