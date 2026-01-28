'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiUser, HiFolder, HiMail } from "react-icons/hi";
import React, { useEffect, useState } from "react";

export default function Sidebar() {

  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  // === Scroll Spy ===
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { href: "#", icon: HiHome, id: "home" },
    { href: "#about", icon: HiUser, id: "about" },
    { href: "#projects", icon: HiFolder, id: "projects" },
    { href: "#contact", icon: HiMail, id: "contact" },
  ];

  return (
<aside
  className="
    hidden md:flex     
    fixed left-0 
    top-[90px]          
    md:top-46           
      
    h-[40vh]            
    md:h-[50vh]         

    w-[52px]           
    md:w-[42px]         

    bg-[#2D3647]
    rounded-r-[25px]
    flex-col items-center justify-center
    gap-10 md:gap-12
    shadow-xl 
    z-[999]
  "
>

      {navItems.map((item) => {
        
        // menentukan active:
        const isActive =
          item.href.startsWith("#")
            ? activeSection === item.id
            : pathname === item.href;

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={true}
            className="relative group flex justify-center w-full"
          >
            {/* Active marker */}
            <div
              className={`
                absolute left-0 top-1/2 -translate-y-1/2
                w-[4px] h-[24px] rounded-r-full bg-white
                transition-all duration-300
                ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"}
              `}
            />

            {/* Icon */}
            <div
              className={`
                w-[20px] h-[20px]
                flex items-center justify-center
                rounded-xl text-white transition-all
                ${isActive ? "bg-white/20 scale-110" : "hover:bg-white/10 hover:scale-105"}
              `}
            >
              <Icon size={20} />
            </div>
          </Link>
        );
      })}
    </aside>
  );
}
