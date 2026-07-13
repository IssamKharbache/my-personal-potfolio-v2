"use client";

import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import NextLink from "next/link";
import NavbarLogo from "@/components/NavbarLogo";
import { Folder, House, SquareTerminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  { name: "Home", link: "hero", number: "01", icon: House },
  {
    name: "Expertise",
    link: "expertise",
    number: "02",
    icon: SquareTerminal,
  },
  { name: "Work", link: "work", number: "03", icon: Folder },
] as const;

const SidebarNavbar = () => {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const onScroll = () => {
      if (window.scrollY < hero.offsetTop + hero.offsetHeight / 2) {
        setActive("hero");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-80 bg-white px-8 lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center">
        <NavbarLogo />
      </div>

      {/* Navigation */}
      <nav
        className="relative mt-12 flex-1 py-8 px-5"
        aria-label="Primary navigation"
      >
        <ul className="space-y-2">
          {links.map((item) => {
            const isActive = active === item.link;

            const Icon = item.icon;

            return (
              <li key={item.link}>
                <Link
                  to={item.link}
                  spy
                  smooth
                  offset={-100}
                  onSetActive={() => setActive(item.link)}
                  className="group relative flex cursor-pointer items-center gap-6 focus-visible:outline-none py-7 px-2"
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Number */}
                  <span>
                    <Icon
                      className={`text-xs font-medium ${
                        isActive
                          ? "text-amber-500  scale-150"
                          : "text-slate-300"
                      }`}
                    />
                  </span>

                  {/* Label */}
                  <span
                    className={`font-medium rounded px-7 py-2 group-hover:bg-gray-100 group-hover:border-l-3 group-hover:border-amber-500 duration-100 ${
                      isActive
                        ? "text-amber-500 text-2xl font-bold bg-gray-100 border-l-3 border-amber-500 ml-4  "
                        : "text-slate-400 group-hover:text-slate-600 text-lg "
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-center mb-8 space-y-4">
        <div className="flex gap-5">
          <NextLink href="https://github.com/IssamKharbache">
            <FaGithub
              size={35}
              className="text-gray-400 hover:fill-amber-600 cursor-pointer hover:scale-150 duration-300"
            />
          </NextLink>
          <NextLink
            href="https://www.linkedin.com/in/issam-kharbache/
"
          >
            <FaLinkedin
              size={35}
              className="text-gray-400 hover:fill-amber-600 cursor-pointer hover:scale-150 duration-300"
            />
          </NextLink>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNavbar;
