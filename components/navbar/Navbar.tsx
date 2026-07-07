"use client";
import Link from "next/link";
import CompileLogo from "../CompileLogo";
import { usePathname } from "next/navigation";
import NavbarLogo from "../NavbarLogo";

const Navbar = () => {
  const path = usePathname();

  const links = [
    {
      name: "Work",
      link: "/work",
    },

    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
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
      <NavbarLogo />
      {/* links */}
      <div className="flex gap-3">
        {links.map((link, idx) => (
          <Link
            className={`rounded-full
    px-3
    py-1.5
    text-sm
    font-medium
    text-foreground
    transition-all
    duration-300
    hover:border-primary/20
    hover:bg-primary/5
    hover:text-primary
    ${path === link.link ? "border border-primary/20 bg-primary/5 text-primary" : "border border-transparent"}
  `}
            href={link.link}
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
