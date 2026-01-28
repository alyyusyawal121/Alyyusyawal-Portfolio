"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";

/** Sesuaikan field sesuai data di Firestore kamu */
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  Github?: string;
  liveUrl?: string;
  Technology?: string[];
  Filter?: string;
};

type ProjectCardProps = {
  project: Project;
};

function limitCharacters(text: string, limit: number): string {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer h-[380px]"
    >
      {/* Background Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition duration-500 group-hover:brightness-[45%]"
      />

      {/* GitHub icon (only if exists) */}
      {project.Github && (
        <a
          href={project.Github}
          target="_blank"
          rel="noreferrer noopener"
          className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition pointer-events-auto"
          aria-label="Open GitHub repository"
        >
          <FiGithub className="text-white text-2xl hover:text-gray-300" />
        </a>
      )}

      {/* Overlay */}
      <div
        className="
          absolute inset-0 flex flex-col justify-center items-center
          px-6 text-center
          opacity-0 group-hover:opacity-100
          transition duration-500
          z-10
        "
      >
        {/* Technologies */}
        <p className="text-gray-300 text-xs tracking-widest uppercase mb-1">
          {Array.isArray(project.Technology) ? project.Technology.join(" • ") : ""}
        </p>

        {/* Title */}
        <h3 className="text-white text-3xl font-bold mb-3 drop-shadow-xl">
          {project.title}
        </h3>

        {/* Limited Description */}
        <p className="text-gray-300 text-sm max-w-sm mb-6">
          {limitCharacters(project.description ?? "", 120)}
        </p>

        {/* Buttons */}
        <div className="flex gap-6 pointer-events-auto">
          <Link
            href={`/projects/${project.id}`}
            className="text-white border px-6 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            MORE
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
