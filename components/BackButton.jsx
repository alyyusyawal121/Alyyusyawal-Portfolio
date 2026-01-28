"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center gap-2  px-5 py-2 rounded-md
           hover:bg-white hover:text-black transition group"

    >
      <FiArrowLeft className="text-lg transition-transform group-hover:-translate-x-1" />
    </button>
  );
}
