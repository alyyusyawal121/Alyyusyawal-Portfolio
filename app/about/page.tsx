"use client";

import { motion } from "framer-motion";
import BackButton from "../../components/BackButton";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiFirebase,
  SiGit,
  SiGithub,
  SiFigma,
  SiPython,
  SiMysql,
  SiCanva,
  SiJupyter,
} from "react-icons/si";


function TechBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur hover:bg-white/10 transition">
      <Icon className="text-lg" />
      <span>{label}</span>
    </div>
  );
}

function TechCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle ? <p className="text-sm text-gray-400 mt-1">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

export default function AboutDetail() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1A1E2E] to-[#0E1120]">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        {/* Top bar */}
        <div className="mb-10 text-white">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-white"
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">About Me</h1>
            <p className="mt-3 text-gray-400 max-w-2xl">
              A short overview about me, my interests, and the tools I use to build.
            </p>
          </div>

          {/* About content */}
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: About Text */}
            <div className="space-y-5 text-base leading-relaxed text-gray-200 text-justify">
              <p>
                Hi! I’m Alyyusyawal Arjuna Widardi, a junior programmer based in Surabaya
                who is naturally curious and enjoys learning new things. I like exploring
                how thoughtful design and clean code can turn simple ideas into meaningful
                digital experiences—especially in the context of web development.
              </p>

              <p>
                My current focus is building websites using modern web technologies, while
                also exploring graphic design and machine learning to broaden my perspective.
                Through hands-on projects, experimentation, and continuous learning, I aim
                to grow steadily, adapt to new challenges, and improve the way technology is
                designed and experienced.
              </p>
            </div>

            {/* Right: Profile / Highlight card */}
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
            <img src="/profile2.1.jpg" className="w-full h-full object-cover object-top" />
          </div>
        </div>
          </div>

          {/* Tools & Technologies */}
          <div className="mt-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Tools & Technologies</h2>
              <p className="mt-2 text-gray-400 max-w-2xl">
                A curated stack I use for building modern web experiences and exploring new areas.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Card 1 */}
              <TechCard title="Technologies" subtitle="UI, component-based development">
                <div className="flex flex-wrap gap-2">
                  <TechBadge icon={SiReact} label="React" />
                  <TechBadge icon={SiNextdotjs} label="Next.js" />
                  <TechBadge icon={SiTailwindcss} label="Tailwind CSS" />                  <TechBadge icon={SiJavascript} label="JavaScript" />
                  <TechBadge icon={SiTypescript} label="TypeScript" />
                  <TechBadge icon={SiPython} label="Python" />
                </div>
              </TechCard>


              {/* Card 3 */}
              <TechCard title="Tools & Platforms" subtitle="Workflow, data, and productivity">
                <div className="flex flex-wrap gap-2">
                  <TechBadge icon={SiGit} label="Git" />
                  <TechBadge icon={SiGithub} label="GitHub" />
                  <TechBadge icon={SiFirebase} label="Firebase" />
                  <TechBadge icon={SiMysql} label="MySQL" />
                  <TechBadge icon={SiFigma} label="Figma" />
                  <TechBadge icon={SiCanva} label="Canva" />
                  <TechBadge icon={SiJupyter} label="Jupyter Notebook" />
                  

                  {/* Google Colab (no official icon) */}
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur">
                    <span className="text-lg">🧪</span>
                    <span>Google Colab</span>
                  </div>
                </div>
              </TechCard>

            </div>

            {/* Optional note */}
            <p className="mt-8 text-sm text-gray-400">
              *I keep improving my stack as I learn through projects and experimentation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
