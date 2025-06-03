import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps, // Expect animationProps to potentially contain duration and ease
) => {
  // Destructure duration and ease from animationProps, providing defaults if not present
  const { duration = 1, ease = "power2.inOut", ...restAnimationProps } = animationProps;

  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: duration, // Use duration from animationProps
    ease: ease,       // Use ease from animationProps
  });

  timeline.to(
    firstTarget,
    {
      ...restAnimationProps, // Pass remaining animation props
      duration: duration,   // Ensure this also uses the main duration
      ease: ease,           // And the main ease
    },
    "<",
  );

  timeline.to(
    secondTarget,
    {
      ...restAnimationProps, // Pass remaining animation props
      duration: duration,   // And this one too
      ease: ease,           // And the main ease
    },
    "<",
  );
};
