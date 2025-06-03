import React, { useEffect, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { heroVideo, smallHeroVideo } from "../assets";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo,
  );

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) setVideoSrc(smallHeroVideo);
    else setVideoSrc(heroVideo);
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => window.removeEventListener("resize", handleVideoSrcSet);
  }, []);

  useGSAP(() => {
    console.log("Hero animations starting");
    // Animate #hero title
    // Assuming #hero starts at opacity 0 and some y offset via CSS (e.g., hero-title class)
    // Or, for a guaranteed start, set initial style: e.g., style={{ opacity: 0, transform: 'translateY(20px)' }} on the <p>
    // For now, we follow the task's direct GSAP call.
    gsap.to("#hero", {
      opacity: 1,
      y: 0, // Animate to y=0 (its natural position)
      duration: 1.5,
      ease: "expo.out",
      delay: 1.5,
      onStart: () => console.log("Hero title animation started"),
    });

    // Animate #cta children (button and text)
    // #cta itself is initially opacity-0 and translate-y-20 via className
    // We animate its children from a further offset and opacity 0
    gsap.from("#cta > *", {
      opacity: 0,
      y: 20, // Start 20px below their final position within #cta
      duration: 1,
      ease: "expo.out",
      delay: 1.8, // Slightly after the hero title
      stagger: 0.2,
      onStart: () => console.log("CTA children animation started"),
    });
  }, []);

  return (
    <section className="nav-height relative w-full bg-black">
      <div className="flex-center h-5/6 w-full flex-col">
        <p id="hero" className="hero-title" style={{ opacity: 0 }}> {/* Ensure hero starts invisible for the animation */}
          iPhone 15 Pro
        </p>

        <div className="w-9/12 md:w-10/12">
          <video
            autoPlay
            muted
            playsInline
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
          Buy
        </a>
        <p className="text-xl font-normal">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
