"use client";
import NavbarLogo from "../NavbarLogo";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("hero");
  //use effect to clear the the scroll id when going back to the hero
  useEffect(() => {
    const handleScroll = () => {
      const expertise = document.getElementById("expertise");

      if (!expertise) return;

      // User is above the Expertise section
      if (window.scrollY < expertise.offsetTop - 300) {
        setActiveLink("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    {
      name: "Work",
      link: "work",
    },
    {
      name: "Expertise",
      link: "expertise",
    },
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact",
      link: "contact",
    },
  ];
  return (
    <nav
      className="
    fixed
    top-6
    left-1/2
    z-50
    flex
    h-16
    w-[min(900px,calc(100%-2rem))]
    -translate-x-1/2
    items-center
    justify-between
    rounded-full
    border
    border-[#2D1F16]/10
    bg-[#FFF8F0]/65
    px-6
    backdrop-blur-xl
    shadow-[0_8px_30px_rgba(45,31,22,0.06)]
  "
    >
      {/* logo*/}
      <NavbarLogo onClick={() => setActiveLink("hero")} />
      {/* links */}
      <div className="flex gap-3">
        {links.map((link, idx) => (
          <Link
            onSetActive={() => setActiveLink(link.link)}
            to={link.link}
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            ignoreCancelEvents={false}
            spyThrottle={500}
            className={`rounded-full cursor-pointer
    px-3 py-1.5 text-sm font-medium transition-all duration-300
    hover:border-primary/20 hover:bg-primary/5 hover:text-primary
    ${
      activeLink === link.link
        ? "border border-primary/20 bg-primary/5 text-primary"
        : "border border-transparent text-foreground"
    }
  `}
            key={idx}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        <button
          className="
        group
        relative
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-[#2D1F16]
        px-4
        py-2
        text-sm
        font-medium
        text-[#FFF8F0]
        transition-all
        duration-300
        hover:bg-[#3A281C]
        hover:scale-[1.02]
        hover:cursor-pointer
        active:scale-[1.8] 
      "
        >
          Let’s talk
          <span
            className="
          text-[#F59E0B]
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
          >
            →
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
