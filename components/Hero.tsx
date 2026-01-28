"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaInstagram, FaGithub, FaLinkedin, FaGoogleDrive } from "react-icons/fa";
import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

type ProfileData = {
  cv?: string;
  github?: string;
  linkedin?: string;
  drive?: string;
  instagram?: string;
};

export default function Hero() {
  const [profile, setProfile] = useState<Required<ProfileData>>({
    cv: "",
    github: "",
    linkedin: "",
    drive: "",
    instagram: "",
  });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const snap = await getDoc(doc(db, "profile", "main"));
        if (!mounted) return;

        if (snap.exists()) {
          const data = snap.data() as ProfileData;
          setProfile({
            cv: data.cv ?? "",
            github: data.github ?? "",
            linkedin: data.linkedin ?? "",
            drive: data.drive ?? "",
            instagram: data.instagram ?? "",
          });
        }
      } catch (e) {
        console.error("Failed to load profile:", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const { cv, github, linkedin, drive, instagram } = profile;

  return (
    <section className="w-full bg-[#1A1E2E] text-white py-24 md:py-28 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr_1.2fr] md:grid-cols-2 grid-cols-1 items-center gap-12">

        {/* NAME + SOCIAL */}
        <div>
          <h1 className="text-5xl font-extrabold leading-tight" data-aos="fade-up">
            Alyyusyawal <br /> Arjuna Widardi
          </h1>

          <div className="w-16 h-[3px] mt-5 bg-yellow-400 rounded-full" data-aos="fade-right" />

          <div className="flex gap-6 mt-8 text-2xl text-gray-300" data-aos="fade-up" data-aos-delay="150">
            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer noopener" className="hover:text-yellow-400 transition">
                <FaInstagram />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer noopener" className="hover:text-yellow-400 transition">
                <FaGithub />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-yellow-400 transition">
                <FaLinkedin />
              </a>
            )}
            {drive && (
              <a href={drive} target="_blank" rel="noreferrer noopener" className="hover:text-yellow-400 transition">
                <FaGoogleDrive />
              </a>
            )}
          </div>
        </div>

        {/* IMAGE */}
        <div
          className="relative transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,255,0.25)]
                     w-[240px] h-[300px] mx-auto translate-y-6 md:w-[300px] md:h-[380px] lg:w-[320px] lg:h-[400px]"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          <div className="absolute inset-0 rounded-3xl bg-blue-500/20 translate-x-4 translate-y-8 blur-3xl opacity-40" />
          <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-2 scale-105 opacity-90 shadow-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#151822] to-[#0E1120] rounded-3xl border-[3px] border-white rotate-3 shadow-[0_10px_40px_rgba(0,0,0,0.25)] overflow-hidden">
            <Image src="/profile_portfolio1.png" alt="Profile" fill className="object-cover object-top translate-y-2" />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <p className="uppercase tracking-widest text-xs opacity-60">Introduction</p>

          <h2 className="fade-up text-5xl font-extrabold leading-tight sm:text-2xl md:text-2xl lg:text-3xl mt-3">
            A Junior Programmer 
          </h2>

          <p
            className="text-[0.95rem] md:text-base lg:text-lg text-left text-pretty opacity-70 mt-5 leading-[1.7] max-w-[90%]"
            data-aos="fade-left"
            data-aos-delay="450"
          >
            A junior programmer who’s always curious and never stops learning.
            My passion lies in building websites, but I also enjoy exploring
            graphic design, and machine learning. I love discovering new things and constantly seek to grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8" data-aos="fade-up" data-aos-delay="100">
            {cv && (
              <a
                href={cv}
                target="_blank"
                rel="noreferrer noopener"
                className="text-yellow-400 font-medium hover:text-yellow-300 transition"
              >
                Download CV
              </a>
            )}

            <a
             href='#contact'
                rel="noreferrer noopener" 
            className="text-yellow-400 font-medium cursor-pointer hover:text-yellow-300 transition">
              Contact Me
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
