import Loader from "../components/Loader";
import SmoothScroll from "../components/SmoothScroll";
import SiteHeader from "../components/SiteHeader";
import Hero from "../components/Hero";
import SloganTransition from "../components/SloganTransition";
import FeaturedWork from "../components/FeaturedWork";
import Archive from "../components/Archive";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <SiteHeader />
        <Loader />
        <Hero />
        <div className="relative isolate">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[calc(100%_-_100vh)] bg-[#0c0b0a]"
            aria-hidden="true"
          />
          <SloganTransition />
          <div className="relative z-10 -mt-[100vh] bg-[#0c0b0a]">
            <FeaturedWork />
          </div>
        </div>
        <Archive />
        <About />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
