"use client";

import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import NavbarLogo from "@/components/NavbarLogo";
import { CodeXml, Folder, House } from "lucide-react";

const links = [
  { name: "Home", link: "hero", number: "01", icon: House },
  { name: "Expertise", link: "expertise", number: "02", icon: CodeXml },
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
      <nav className="relative mt-12 flex-1" aria-label="Primary navigation">
        <ul className="space-y-2">
          {links.map((item) => {
            const isActive = active === item.link;

            const Icon = item.icon;

            return (
              <li className={`${isActive ? "ml-5" : ""}`} key={item.link}>
                <Link
                  to={item.link}
                  spy
                  smooth
                  offset={-100}
                  onSetActive={() => setActive(item.link)}
                  className="group relative flex cursor-pointer items-center gap-6 py-3 focus-visible:outline-none"
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Number */}
                  <span>
                    <Icon
                      className={`text-xs font-medium ${
                        isActive
                          ? "text-amber-500 fill-amber-500 scale-150"
                          : "text-slate-300 group-hover:text-slate-400"
                      }`}
                    />
                  </span>

                  {/* Label */}
                  <span
                    className={`font-medium   py-5 px-5  ${
                      isActive
                        ? "text-slate-900 text-2xl font-bold"
                        : "text-slate-400 group-hover:text-slate-600  group-hover:ml-2 text-lg "
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
      <div className="mb-8 space-y-4">
        <div className="h-px bg-slate-100" />
        <p className="text-xs leading-relaxed text-slate-400">
          Creating thoughtful digital experiences with attention to detail and
          user needs.
        </p>
      </div>
    </aside>
  );
};

export default SidebarNavbar;
