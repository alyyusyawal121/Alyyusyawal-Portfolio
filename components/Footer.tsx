"use client";

import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0E1120] to-[#0A0C17] text-white overflow-hidden">
      
      {/* ===== BACKGROUND GLOW ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-72 h-72 bg-blue-500/20 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 w-72 h-72 bg-indigo-600/20 blur-[160px]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        
        {/* TOP */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-3xl font-extrabold tracking-tight">
            Alyyusyawal
            <span className="text-yellow-400">.</span>
          </h3>

          <p className="mt-4 text-white/70 max-w-md leading-relaxed">
            Junior Programmer & Web Enthusiast who loves building modern,
            clean, and meaningful digital experiences.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-6 mt-8 text-xl text-white/70">
            <a
              href="https://www.instagram.com/syawalenss?igsh=YWFjdGYycTk3anR4"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-yellow-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/alyyusyawal121"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-yellow-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/alyyusyawal-arjuna-widardi-657244322/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-yellow-400 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* BOTTOM */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>
            © {new Date().getFullYear()} Alyyusyawal Arjuna Widardi. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Built with <span className="text-yellow-400">♥</span> using Next.js & Firebase
          </p>
        </div>
      </div>
    </footer>
  );
}
