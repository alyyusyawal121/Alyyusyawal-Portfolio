import About from "@/components/About";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";
export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <ContactMe />
      </section>
    </>
  );
}
