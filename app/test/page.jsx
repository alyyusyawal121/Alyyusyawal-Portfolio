"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function TestPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("order", "asc") // pakai field order di Firestore
        );
        const snapshot = await getDocs(q);

        const mapped = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("DATA DARI FIRESTORE:", mapped);
        setProjects(mapped);
      } catch (err) {
        console.error("Gagal load projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1A1E2E] to-[#0E1120] text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8">Projects dari Firestore</h1>

        {loading && <p className="opacity-70">Loading projects...</p>}

        {!loading && projects.length === 0 && (
          <p className="opacity-70">Belum ada project di Firestore.</p>
        )}

        <div className="mt-8 space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            >
              {/* title */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  {project.featured && (
                    <p className="text-xs uppercase tracking-[0.25em] text-yellow-400">
                      Featured Project
                    </p>
                  )}
                  <h2 className="text-2xl font-bold mt-1">{project.title}</h2>
                </div>

                {project.Github && (
                  <a
                    href={project.Github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-300 hover:text-blue-100 underline"
                  >
                    View GitHub
                  </a>
                )}
              </div>

              {/* description */}
              {project.description && (
                <p className="text-sm md:text-base opacity-80 leading-relaxed">
                  {project.description}
                </p>
              )}

              {/* order (opsional, cuma buat ngecek urutan) */}
              {typeof project.order === "number" && (
                <p className="mt-3 text-xs text-slate-400">
                  Order: <span className="font-mono">{project.order}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
