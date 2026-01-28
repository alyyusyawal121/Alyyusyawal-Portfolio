"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import ProjectCard from "@/components/ProjectCard";
import BackButton from "../../components/BackButton";

type Project = {
  id: string;
  Filter?: string;
  [key: string]: any;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<string[]>(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const snap = await getDocs(q);

        const data = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Project[];
        if (!mounted) return;

        setProjects(data);

        const unique = new Set<string>();
        data.forEach((p) => {
          if (p.Filter && typeof p.Filter === "string") unique.add(p.Filter);
        });
        setFilters(["All", ...Array.from(unique)]);
      } catch (e) {
        console.error("Failed to load projects:", e);
        if (mounted) {
          setProjects([]);
          setFilters(["All"]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.Filter?.includes(activeFilter));
  }, [projects, activeFilter]);

  const pillBase =
    "px-5 py-2 rounded-full text-sm transition border backdrop-blur";
  const pillActive =
    "bg-yellow-400 text-[#0E1120] border-yellow-300 shadow-[0_10px_30px_rgba(250,204,21,0.18)]";
  const pillInactive =
    "bg-white/[0.04] text-white/90 border-white/15 hover:bg-white/[0.07] hover:border-white/25";

  return (
    <section className="relative min-h-screen overflow-hidden text-white bg-gradient-to-b from-[#1A1E2E] to-[#0E1120]">
      {/* ===== Background (match About/Contact) ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/25 blur-[130px] rounded-full" />
        <div className="absolute top-10 -right-24 w-96 h-96 bg-indigo-600/20 blur-[150px] rounded-full" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-blue-600/15 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* Top bar */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <BackButton />
          <div className="hidden sm:block text-sm text-white/60">
            {loading ? "Loading..." : `${filteredProjects.length} project`}
            {!loading && filteredProjects.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-xs text-white/60">
            — Portfolio
          </p>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Projects
          </h2>

          <div className="w-16 h-[3px] mt-5 bg-yellow-400 rounded-full mx-auto" />

          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Explore my selected works — web development, UI, and experiments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur px-4 py-3">
            {filters.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={[pillBase, isActive ? pillActive : pillInactive].join(" ")}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[320px] rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
            <p className="text-lg font-semibold">Tidak ada project</p>
            <p className="text-white/60 mt-2">
              Coba pilih filter lain atau kembali ke “All”.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className="mt-6 px-5 py-2 rounded-full border border-white/20 bg-white/[0.04]
                         hover:bg-yellow-400 hover:text-[#0E1120] hover:border-yellow-300 transition"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
