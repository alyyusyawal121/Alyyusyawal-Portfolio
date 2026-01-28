import type { ReactNode } from "react";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#0B0E16] min-h-screen">
      {children}
    </div>
  );
}
