"use client";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";

export default function HomeProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filters, setFilters] = useState<string[]>(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadProjects() {
      const q = query(
        collection(db, "projects"),
        orderBy("order", "asc"),
        limit(6)
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProjects(data);

      const unique = new Set<string>();
      data.forEach((p: any) => {
        if (p.Filter && typeof p.Filter === "string") unique.add(p.Filter);
      });

      setFilters(["All", ...Array.from(unique)]);
    }

    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p: any) => p.Filter?.includes(activeFilter));
  }, [projects, activeFilter]);

  const pillBase =
    "px-5 py-2 rounded-full border text-sm transition backdrop-blur";
  const pillActive =
    "bg-yellow-400 text-[#0E1120] border-yellow-300 shadow-[0_10px_30px_rgba(250,204,21,0.18)]";
  const pillInactive =
    "bg-white/[0.04] text-white/90 border-white/15 hover:bg-white/[0.07] hover:border-white/25";

  return (
    <section
      className="relative py-24 overflow-hidden
                 bg-gradient-to-b from-[#1A1E2E] to-[#0E1120]"
    >
      {/* ===== Background (match About/Contact) ===== */}
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
        {/* blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/25 blur-[130px] rounded-full" />
        <div className="absolute top-10 -right-24 w-96 h-96 bg-indigo-600/20 blur-[150px] rounded-full" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-blue-600/15 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <p
            className="uppercase tracking-widest text-xs text-white/60"
            data-aos="fade-down"
            data-aos-duration="800"
            data-aos-delay="150"
            data-aos-easing="ease-out-cubic"
          >
            — Portfolio
          </p>

          <h2
            className="text-center text-4xl md:text-5xl font-extrabold text-white mt-3"
            data-aos="fade-down"
            data-aos-duration="800"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          >
            Featured Projects
          </h2>

          {/* yellow accent like Hero */}
          <div className="w-16 h-[3px] mt-5 bg-yellow-400 rounded-full mx-auto" />

          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Beberapa project pilihan yang pernah saya kerjakan.
          </p>
        </div>

        {/* Filters */}
        <div
          className="flex justify-center mb-10"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="300"
          data-aos-easing="ease-out-cubic"
        >
          <div className="inline-flex flex-wrap justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur px-4 py-3">
            {filters.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={[pillBase, isActive ? pillActive : pillInactive].join(
                    " "
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          data-aos="zoom-in"
          data-aos-duration="800"
          data-aos-delay="350"
          data-aos-easing="ease-out-cubic"
        >
          {filteredProjects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg
                       border border-white/15 bg-white/[0.04] backdrop-blur
                       text-white px-6 py-3
                       hover:bg-yellow-400 hover:text-[#0E1120] hover:border-yellow-300
                       transition"
          >
            See All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
