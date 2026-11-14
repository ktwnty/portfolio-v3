import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Marquee from "./Marquee";
import ProfileCard from "./ProfileCard";
import SelectedWorks from "./SelectedWorks";
import PersonalPulse from "./PersonalPulse";
import Capabilities from "./Capabilities";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip, Draggable, InertiaPlugin);

export default function App() {
  useEffect(() => {
    // fonts change text metrics, so re-measure all scroll triggers once they load
    let alive = true;
    document.fonts.ready.then(() => alive && ScrollTrigger.refresh());
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="bg-grid min-h-screen bg-carbon text-white">
      {/* global ambient glow: SelectedWorks retints --amb while a project card is hovered */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(75% 60% at 50% 40%, var(--amb), transparent 70%)" }}
      />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <ProfileCard />
        <SelectedWorks />
        <PersonalPulse />
        <Capabilities />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
