import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isSunday = new Date().getDay() === 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain rounded-full" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            M.Sohaib &nbsp;
            <span className="sm:block hidden"> | Founder OF SYNEX STUDIO</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`text-[18px] font-medium cursor-pointer ${
                nav.title === "Fiverr"
                  ? `px-3 py-1.5 rounded-md border transition-all duration-200 ${
                      isSunday
                        ? "border-gray-500 text-gray-400"
                        : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    }`
                  : active === nav.title
                  ? "text-white"
                  : "text-secondary hover:text-white"
              }`}
              onClick={() => setActive(nav.title)}
            >
              <a
                href={nav.link ? nav.link : `#${nav.id}`}
                target={nav.link ? "_blank" : "_self"}
                rel={nav.link ? "noopener noreferrer" : ""}
              >
                {nav.title}
                {nav.title === "Fiverr" && (
                  <span className="ml-2 text-[12px] opacity-70">
                    {isSunday ? "off" : "on"}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a
                    href={nav.link ? nav.link : `#${nav.id}`}
                    target={nav.link ? "_blank" : "_self"}
                    rel={nav.link ? "noopener noreferrer" : ""}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;