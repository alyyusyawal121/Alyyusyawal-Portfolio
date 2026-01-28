"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative py-28 md:py-32 lg:py-40 
                 bg-gradient-to-b from-[#1A1E2E] to-[#0E1120] overflow-hidden"
    >
      {/* BLOBS BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/30 
                     blur-[120px] rounded-full will-change-transform"
          style={{ animation: "float-slow 12s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600/20 
                     blur-[150px] rounded-full will-change-transform"
          style={{ animation: "float-slow-2 14s ease-in-out infinite" }}
        />
      </div>

      {/* MAIN GRID */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 
                      grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — IMAGE CARD */}
        <div data-aos="zoom-in" data-aos-delay="100"
             className="relative w-[250px] h-[320px] md:w-[290px] md:h-[380px] lg:w-[310px] lg:h-[420px] mx-auto">

          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-blue-500/30 blur-3xl 
                          translate-x-4 translate-y-6 opacity-40" />

          {/* Blue accent */}
          <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-2 scale-105 shadow-xl" />

          {/* Foreground Card */}
          <div className="absolute inset-0 rounded-3xl rotate-3 border-[3px] border-white 
                          overflow-hidden bg-gradient-to-br from-[#1b1f33] to-[#121525] 
                          shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <img src="/profile.png" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* RIGHT — TEXT */}
        <div className="flex flex-col items-start font-lexend">

          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-white" data-aos="fade-down" data-aos-duration="800" data-aos-delay="400" data-aos-easing="ease-out-cubic">
            ABOUT ME
          </h2>

          <p className="mt-5 text-[0.95rem] md:text-base leading-[1.7] opacity-80 text-slate-100 max-w-xl" data-aos="zoom-out" data-aos-duration="800" data-aos-delay="400" data-aos-easing="ease-out-cubic">
            Curious about my journey? Get to know me better here.
          </p>

          {/* BUTTON TOGGLE */}
          <Link 
            aria-expanded={open}
            href={'/about'}
            className="mt-8 inline-flex items-center gap-2 rounded-lg 
                       bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2.5 
                       text-sm font-medium text-white shadow-lg 
                       hover:shadow-blue-700/30 transition-all duration-200 cursor-pointer"
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="400" data-aos-easing="ease-out-cubic"
                       
          >
            Learn More
          </Link>
        </div>
      </div>


    </section>
  );
}
