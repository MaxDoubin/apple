import React, { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { pauseImg, playImg, replayImg } from "../assets";
import { highlightsSlides } from "../constants";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to(".carousel-slide", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to(".carousel-video", {
      scrollTrigger: {
        trigger: ".carousel-video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [videoId]);

  useEffect(() => {
    const activeVideo = videoRef.current[videoId];

    if (!activeVideo || loadedData.length < highlightsSlides.length) return;

    if (!isPlaying) {
      activeVideo.pause();
      return;
    }

    if (startPlay) {
      activeVideo.play().catch(() => {
        setVideo((current) => ({ ...current, isPlaying: false }));
      });
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetadata = (event) => {
    setLoadedData((previous) => [...previous, event]);
  };

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 1200 ? "10vw" : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) anim.restart();

      const animUpdate = () => {
        const activeVideo = videoRef.current[videoId];
        const activeSlide = highlightsSlides[videoId];

        if (!activeVideo || !activeSlide) return;

        anim.progress(activeVideo.currentTime / activeSlide.videoDuration);
      };

      if (isPlaying) gsap.ticker.add(animUpdate);
      else gsap.ticker.remove(animUpdate);

      return () => gsap.ticker.remove(animUpdate);
    }
  }, [videoId, isPlaying]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;

      case "play":
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((list, i) => (
          <div key={list.id} className="carousel-slide pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center size-full overflow-hidden rounded-3xl bg-black">
                <video
                  playsInline
                  preload="metadata"
                  muted
                  aria-hidden="true"
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i < highlightsSlides.length - 1
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((current) => ({ ...current, isPlaying: true }))
                  }
                  onPause={() =>
                    setVideo((current) => ({ ...current, isPlaying: false }))
                  }
                  onLoadedMetadata={handleLoadedMetadata}
                  className={`${list.id === 2 && "translate-x-44"} carousel-video pointer-events-none`}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute left-[5%] top-12 z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-center relative mt-10">
        <div
          aria-hidden="true"
          className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur"
        >
          {highlightsSlides.map((slide, i) => (
            <span
              key={slide.id}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="relative mx-2 size-3 rounded-full bg-gray-200"
            >
              <span
                className="absolute size-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button
          type="button"
          aria-label={
            isLastVideo
              ? "Replay highlights"
              : !isPlaying
                ? "Play highlights"
                : "Pause highlights"
          }
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt=""
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
