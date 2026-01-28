"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaWhatsapp,
  FaDiscord,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

type ProfileData = {
  whatsapp?: string;
  discord?: string;
  gmail?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
};

const safeUrl = (url?: string) => {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
};

/** Reveal-on-scroll hook (tanpa library) */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

export default function ContactMe() {
  const [profile, setProfile] = useState<Required<ProfileData>>({
    whatsapp: "",
    discord: "",
    gmail: "",
    instagram: "",
    linkedin: "",
    github: "",
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
            whatsapp: (data.whatsapp ?? "").replace(/\s/g, ""),
            discord: (data.discord ?? "").trim(),
            gmail: (data.gmail ?? "").trim(),
            instagram: (data.instagram ?? "").trim(),
            linkedin: (data.linkedin ?? "").trim(),
            github: (data.github ?? "").trim(),
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

  const { whatsapp, discord, gmail, instagram, linkedin, github } = profile;

  const waLink = whatsapp ? `https://wa.me/${whatsapp.replace(/^\+/, "")}` : "";
  const discordLink =
    discord && discord.startsWith("http")
      ? discord
      : discord
      ? `https://discord.com/users/${discord}`
      : "";

  const gmailWebCompose = useMemo(() => {
    if (!gmail) return "";
    const to = encodeURIComponent(gmail);
    const su = encodeURIComponent("Hello Syawal");
    const body = encodeURIComponent("Hi Syawal, I’d like to discuss about ...");
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}`;
  }, [gmail]);

  const igLink = safeUrl(instagram);
  const liLink = safeUrl(linkedin);
  const ghLink = safeUrl(github);

  // reveal hooks
  const topBlock = useInView<HTMLDivElement>();
  const contactGrid = useInView<HTMLDivElement>();
  const socialBlock = useInView<HTMLDivElement>();
  const socialGrid = useInView<HTMLDivElement>();

  // base anim classes
  const revealBase =
    "transition duration-700 ease-out will-change-transform will-change-opacity";
  const hidden = "opacity-0 translate-y-4";
  const show = "opacity-100 translate-y-0";

  // helper stagger (ms)
  const stagger = (i: number) => ({ transitionDelay: `${i * 90}ms` });

  // shared card classes
  const cardBase =
    "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] " +
    "backdrop-blur-xl p-6 transition duration-300 " +
    "hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-1";

  // shine on hover
  const shine =
    "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 " +
    "bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 " +
    "translate-x-[-12%] translate-y-[-12%] group-hover:translate-x-[0%] group-hover:translate-y-[0%]";

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-28 lg:py-32 px-6 overflow-hidden
                 bg-gradient-to-b from-[#1A1E2E] to-[#0E1120] text-white"
    >
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* soft grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* blobs (float pelan) */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/25 blur-[130px] rounded-full float-9" />
        <div className="absolute top-10 -right-24 w-96 h-96 bg-indigo-600/20 blur-[150px] rounded-full float-11" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-blue-600/15 blur-[160px] rounded-full float-13" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ===== TOP: CONTACT ===== */}
        <div
          ref={topBlock.ref}
          className={[
            "text-center mb-12",
            revealBase,
            topBlock.inView ? show : hidden,
          ].join(" ")}
        >
          <p className="uppercase tracking-widest text-xs text-white/60">
            — Contact
          </p>

          <h2 className="font-extrabold text-4xl md:text-5xl mt-3">
            Contact Me
          </h2>

          <div className="w-16 h-[3px] mt-5 bg-yellow-400 rounded-full mx-auto" />

          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Have a project, collaboration, or just want to say hi? Reach me here.
          </p>
        </div>

        {/* ===== CONTACT CARDS ===== */}
        <div
          ref={contactGrid.ref}
          className={[
            "grid grid-cols-1 md:grid-cols-3 gap-6",
            revealBase,
            contactGrid.inView ? show : hidden,
          ].join(" ")}
        >
          {/* WhatsApp */}
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer noopener"
              className={cardBase}
              style={stagger(0)}
            >
              <div className={shine} />
              <div className="flex items-start justify-between relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-white/10 flex items-center justify-center transition duration-300 group-hover:scale-105">
                  <FaWhatsapp className="text-2xl text-blue-200 group-hover:text-yellow-300 transition duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/70 transition">
                  Fast reply
                </span>
              </div>

              <h3 className="font-bold text-lg mt-5 relative">WhatsApp</h3>
              <p className="text-white/70 mt-2 text-sm leading-relaxed relative">
                Quick chat for faster discussion and updates.
              </p>

              <div className="mt-5 text-yellow-400 group-hover:text-yellow-300 transition font-medium relative inline-flex items-center gap-2">
                Message me
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition" />
            </a>
          )}

          {/* Discord */}
          {discordLink && (
            <a
              href={discordLink}
              target="_blank"
              rel="noreferrer noopener"
              className={cardBase}
              style={stagger(1)}
            >
              <div className={shine} />
              <div className="flex items-start justify-between relative">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-white/10 flex items-center justify-center transition duration-300 group-hover:scale-105">
                  <FaDiscord className="text-2xl text-indigo-200 group-hover:text-yellow-300 transition duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/70 transition">
                  Community
                </span>
              </div>

              <h3 className="font-bold text-lg mt-5 relative">Discord</h3>
              <p className="text-white/70 mt-2 text-sm leading-relaxed relative">
                Let’s connect for casual chat and collaboration.
              </p>

              <div className="mt-5 text-yellow-400 group-hover:text-yellow-300 transition font-medium relative inline-flex items-center gap-2">
                Add / DM
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition" />
            </a>
          )}

          {/* Gmail */}
          {gmailWebCompose && (
            <a
              href={gmailWebCompose}
              target="_blank"
              rel="noreferrer noopener"
              className={cardBase}
              style={stagger(2)}
            >
              <div className={shine} />
              <div className="flex items-start justify-between relative">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 border border-white/10 flex items-center justify-center transition duration-300 group-hover:scale-105">
                  <FaEnvelope className="text-2xl text-yellow-200 group-hover:text-yellow-300 transition duration-300 group-hover:scale-110" />
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/70 transition">
                  Professional
                </span>
              </div>

              <h3 className="font-bold text-lg mt-5 relative">Gmail</h3>
              <p className="text-white/70 mt-2 text-sm leading-relaxed relative">
                Send details, proposals, or formal inquiries via email.
              </p>

              <div className="mt-5 text-yellow-400 group-hover:text-yellow-300 transition font-medium relative inline-flex items-center gap-2">
                Send email
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-yellow-500/15 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition" />
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ===== SOCIAL HEADER ===== */}
        <div
          ref={socialBlock.ref}
          className={[
            "text-center mt-14 mb-10",
            revealBase,
            socialBlock.inView ? show : hidden,
          ].join(" ")}
        >
          <p className="uppercase tracking-widest text-xs text-white/60">
            — Social
          </p>
          <h3 className="font-extrabold text-2xl md:text-3xl mt-3">
            You can connect with me
          </h3>
          <p className="text-white/70 mt-3">
            Follow for updates, new projects, and more.
          </p>
        </div>

        {/* ===== SOCIAL CARDS ===== */}
        <div
          ref={socialGrid.ref}
          className={[
            "grid grid-cols-1 md:grid-cols-3 gap-6",
            revealBase,
            socialGrid.inView ? show : hidden,
          ].join(" ")}
        >
          {/* Instagram */}
          {igLink && (
            <a
              href={igLink}
              target="_blank"
              rel="noreferrer noopener"
              className={cardBase}
              style={stagger(0)}
            >
              <div className={shine} />
              <div className="flex items-center gap-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-white/10 flex items-center justify-center transition duration-300 group-hover:scale-105">
                  <FaInstagram className="text-2xl text-blue-200 group-hover:text-yellow-300 transition duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Instagram</p>
                  <p className="text-sm text-white/60">Design & Reels</p>
                </div>
              </div>

              <div className="mt-5 text-yellow-400 group-hover:text-yellow-300 transition font-medium relative inline-flex items-center gap-2">
                Visit
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          )}

          {/* LinkedIn */}
          {liLink && (
            <a
              href={liLink}
              target="_blank"
              rel="noreferrer noopener"
              className={cardBase}
              style={stagger(1)}
            >
              <div className={shine} />
              <div className="flex items-center gap-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-white/10 flex items-center justify-center transition duration-300 group-hover:scale-105">
                  <FaLinkedin className="text-2xl text-blue-200 group-hover:text-yellow-300 transition duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <p className="font-bold">LinkedIn</p>
                  <p className="text-sm text-white/60">Career & networking</p>
                </div>
              </div>

              <div className="mt-5 text-yellow-400 group-hover:text-yellow-300 transition font-medium relative inline-flex items-center gap-2">
                Connect
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          )}

          {/* GitHub */}
          {ghLink && (
            <a
              href={ghLink}
              target="_blank"
              rel="noreferrer noopener"
              className={cardBase}
              style={stagger(2)}
            >
              <div className={shine} />
              <div className="flex items-center gap-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center transition duration-300 group-hover:scale-105">
                  <FaGithub className="text-2xl text-white/90 group-hover:text-yellow-300 transition duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <p className="font-bold">GitHub</p>
                  <p className="text-sm text-white/60">Repositories & code</p>
                </div>
              </div>

              <div className="mt-5 text-yellow-400 group-hover:text-yellow-300 transition font-medium relative inline-flex items-center gap-2">
                Explore
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
