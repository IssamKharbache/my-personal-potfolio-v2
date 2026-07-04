import Link from "next/link";
import { MagneticButton } from "../ui/magnetic-button";
import CompileLogo from "../CompileLogo";

const Navbar = () => {
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
      {/* logo — same compile animation as the loading screen, picks up right as the loader hands off */}
      <Link href="/">
        <CompileLogo size="sm" />
      </Link>
      {/* links */}
      <div className="flex gap-3">
        {links.map((link, idx) => (
          <Link
            className="
    rounded-full
    border
    border-transparent
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
  "
            href={link.link}
            key={idx}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        <MagneticButton>
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
        active:scale-[0.98]
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
        </MagneticButton>
      </div>
    </nav>
  );
};

export default Navbar;
