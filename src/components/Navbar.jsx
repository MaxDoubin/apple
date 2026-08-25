import React from "react";

import { appleImg, bagImg, githubImg, searchImg } from "../assets";
import { navLists, sourceCode } from "../constants";

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between p-5 sm:px-10">
      <nav aria-label="Primary" className="screen-max-width flex w-full">
        <a href="#" aria-label="Home">
          <img src={appleImg} alt="Apple" width={14} height={18} />
        </a>

        <ul className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <li key={nav} className="text-gray px-5 text-sm">
              {nav}
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
          <button
            type="button"
            aria-label="Search is not available in this demo"
            title="Search is not available in this demo"
            disabled
          >
            <img src={searchImg} alt="" width={18} height={18} />
          </button>
          <button
            type="button"
            aria-label="Shopping bag is not available in this demo"
            title="Shopping bag is not available in this demo"
            disabled
          >
            <img src={bagImg} alt="" width={18} height={18} />
          </button>
          <a
            href={sourceCode}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View source code on GitHub"
          >
            <img src={githubImg} alt="" width={18} height={18} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
