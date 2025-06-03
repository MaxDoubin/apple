import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { appleImg, bagImg, githubImg, searchImg } from "../assets";
import { navLists, sourceCode } from "../constants";

const Navbar = () => {
  useGSAP(() => {
    const icons = gsap.utils.toArray(".nav-icon-link img");
    icons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, { scale: 1.2, duration: 0.2, ease: "power1.inOut" });
      });
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, { scale: 1, duration: 0.2, ease: "power1.inOut" });
      });
    });
    // Cleanup function for event listeners (optional but good practice if component can unmount frequently)
    // return () => {
    //   icons.forEach((icon) => {
    //     // icon.removeEventListener('mouseenter', ...); // Need to store handlers to remove them
    //     // For this simple case, GSAP's context from useGSAP might handle some cleanup,
    //     // and without stored handlers, direct removal is tricky.
    //     // Given these are global navbar icons, they likely unmount only on app exit.
    //   });
    // };
  }, []);

  return (
    <header className="flex w-full items-center justify-between p-5 sm:px-10">
      <nav className="screen-max-width flex w-full">
        <a href="#">
          <img src={appleImg} alt="Apple" width={14} height={18} />
        </a>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="text-gray cursor-pointer px-5 text-sm transition-all hover:text-white"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
          <a href="#" className="nav-icon-link">
            <img src={searchImg} alt="Search" width={18} height={18} />
          </a>
          <a href="#" className="nav-icon-link">
            <img src={bagImg} alt="Bag" width={18} height={18} />
          </a>
          <a href={sourceCode} target="_blank" rel="noreferrer noopener" className="nav-icon-link">
            <img src={githubImg} alt="GitHub" width={18} height={18} /> {/* Corrected alt text */}
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
