import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Skills from "./components/skill";
import Projects from "./components/project";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Services from "./components/services";
import Preloader from "./components/preloader";
import ScrollPath from "./components/scrollPath";
import Butterfly from "./components/butterfly";
import CinematicIntro from "./components/CinematicIntro";

export default function Home() {
  return (
    <main className="relative">
      <Preloader />
      <CinematicIntro />
      <ScrollPath />
      <Butterfly />
      <div className="grain-effect" />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}