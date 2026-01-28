"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import BackButton from "../../../components/BackButton";

type Project = {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  liveUrl?: string;
  Github?: string;
  Technology?: string[];
  Filter?: string;
};

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!id || typeof id !== "string") {
          if (mounted) {
            setProject(null);
            setLoading(false);
          }
          return;
        }

        const ref = doc(db, "projects", id);
        const snap = await getDoc(ref);

        if (!mounted) return;

        if (!snap.exists()) {
          setProject(null);
        } else {
          setProject({ id: snap.id, ...(snap.data() as any) });
        }
      } catch (e) {
        console.error("Failed to load project:", e);
        if (mounted) setProject(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const tech = useMemo(
    () => (Array.isArray(project?.Technology) ? project!.Technology! : []),
    [project]
  );

  // ===== LOADING =====
  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden text-white bg-gradient-to-b from-[#1A1E2E] to-[#0E1120]">
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
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-24">
          <div className="mb-10 flex items-center justify-between">
            <BackButton />
            <div className="h-9 w-44 rounded-full bg-white/10 border border-white/10 animate-pulse" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur overflow-hidden">
            <div className="h-[340px] sm:h-[460px] lg:h-[520px] bg-white/5 animate-pulse" />
            <div className="p-6 sm:p-10">
              <div className="h-10 w-2/3 bg-white/10 rounded-lg animate-pulse" />
              <div className="mt-6 flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-20 rounded-full bg-white/10 border border-white/10 animate-pulse"
                  />
                ))}
              </div>
              <div className="mt-8 h-px w-full bg-white/10" />
              <div className="mt-8 space-y-3">
                <div className="h-5 w-48 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-10/12 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===== NOT FOUND =====
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A1E2E] to-[#0E1120] text-white flex flex-col justify-center items-center px-6">
        <div className="max-w-md text-center rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-8">
          <h1 className="text-3xl font-bold mb-3">Project Not Found</h1>
          <p className="text-white/70 mb-6">
            Project yang kamu cari tidak ditemukan atau sudah dihapus.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2
                       hover:bg-yellow-400 hover:text-[#0E1120] hover:border-yellow-300 transition"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  // ===== CONTENT =====
  return (
    <section className="relative min-h-screen overflow-hidden text-white bg-gradient-to-b from-[#1A1E2E] to-[#0E1120]">
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

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-24">
        {/* Top bar */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <BackButton />

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full
                           border border-white/15 bg-white/[0.04] backdrop-blur
                           px-4 py-2 text-sm text-white/90
                           hover:bg-yellow-400 hover:text-[#0E1120] hover:border-yellow-300 transition"
              >
                <FiExternalLink className="text-lg" />
                <span className="hidden sm:inline">Live Site</span>
              </a>
            )}

            {project.Github && (
              <a
                href={project.Github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full
                           border border-white/15 bg-white/[0.04] backdrop-blur
                           px-4 py-2 text-sm text-white/90
                           hover:bg-yellow-400 hover:text-[#0E1120] hover:border-yellow-300 transition"
              >
                <FiGithub className="text-lg" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {/* Image FULL (no crop) */}
          <div className="relative">
            <div className="relative h-[340px] sm:h-[460px] lg:h-[520px] bg-gradient-to-br from-[#151822] to-[#0E1120]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_55%)]" />
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.28),transparent_55%)]" />

              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title ?? "Project image"}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
                  className="object-contain p-4 sm:p-6"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/60">
                  No image
                </div>
              )}

              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
            </div>

            {/* Title overlay */}
            <div className="absolute left-6 right-6 bottom-6">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 backdrop-blur px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400/15 border border-yellow-300/30" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/70">
                    Project Detail
                  </p>
                  <h1 className="text-xl sm:text-2xl font-extrabold leading-snug">
                    {project.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-6 sm:p-10">
            {tech.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-white/85
                               hover:border-yellow-300/40 hover:text-yellow-200 transition"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-white/90 mb-3">
                About this project
              </h2>
              <p className="text-white/75 leading-relaxed text-base sm:text-lg text-justify">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
