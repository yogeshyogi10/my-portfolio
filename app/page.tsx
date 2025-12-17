import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Skills from "./components/skill";
import Projects from "./components/project";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Services from "./components/services";

export default function Home() {
  return (
   <main>
    <Navbar/>
    <Hero/>
    <About/>
    <Skills/>
    <Projects/>
    <Services/>
    <Contact/>
    <Footer/>
   </main>
  );
}