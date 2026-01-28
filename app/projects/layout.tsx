export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        relative min-h-screen overflow-hidden
        bg-gradient-to-b from-[#1A1E2E] to-[#0E1120]
        text-white
      "
    >
      {children}
    </section>
  );
}
