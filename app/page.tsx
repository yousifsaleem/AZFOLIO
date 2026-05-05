import Loader from "../components/Loader";
import Hero from "../components/Hero";
import SloganTransition from "../components/SloganTransition";
import FeaturedWork from "../components/FeaturedWork";
import Archive from "../components/Archive";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Loader />
      <Hero />
      <SloganTransition />
      <FeaturedWork />
      <Archive />
      <About />
      <Contact />
    </main>
  );
}
