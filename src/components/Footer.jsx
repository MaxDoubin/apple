import React from "react";

import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="p-5 sm:px-10">
      <div className="screen-max-width">
        <div>
          <p className="text-gray text-xs font-semibold">
            This is an unofficial educational demo and does not provide
            shopping functionality.
          </p>
        </div>

        <div className="my-5 h-px w-full bg-neutral-700" aria-hidden />

        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <p className="text-gray text-xs font-semibold">
            &copy; {new Date().getFullYear()} iPhone 15 Pro Demo. Unofficial
            educational project.
          </p>

          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className="text-gray text-xs font-semibold">
                <span className="mx-2">{link}</span>
                {i !== footerLinks.length - 1 && "|"}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
