"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initLenis } from "@/lib/lenis";
import dynamic from "next/dynamic";

const WebCursor = dynamic(() => import("@/components/WebCursor"), { ssr: false });
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const FloatingNav = dynamic(() => import("@/components/FloatingNav"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const SynopsisSection = dynamic(() => import("@/components/SynopsisSection"), { ssr: false });
const CastSection = dynamic(() => import("@/components/CastSection"), { ssr: false });
const TomHollandSection = dynamic(() => import("@/components/TomHollandSection"), { ssr: false });
const V3AutoplaySection = dynamic(() => import("@/components/V3AutoplaySection"), { ssr: false });
const ZendayaSection = dynamic(() => import("@/components/ZendayaSection"), { ssr: false });
const CastBiosSection = dynamic(() => import("@/components/CastBiosSection"), { ssr: false });
const GallerySection = dynamic(() => import("@/components/GallerySection"), { ssr: false });
const TrailerSection = dynamic(() => import("@/components/TrailerSection"), { ssr: false });
const SecretFilesSection = dynamic(() => import("@/components/SecretFilesSection"), { ssr: false });
const VideoOutroSection = dynamic(() => import("@/components/VideoOutroSection"), { ssr: false });
const CrewSection = dynamic(() => import("@/components/CrewSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), { ssr: false });

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const lenis = initLenis();

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={mainRef} className="relative bg-background snap-y snap-proximity">
      <Preloader />
      <WebCursor />
      <FloatingNav />
      <div id="hero-root" className="relative snap-start" style={{ height: "100vh" }}>
        <HeroSection />
      </div>
      <SynopsisSection />
      <CastSection />
      <V3AutoplaySection />
      <TomHollandSection />
      <ZendayaSection />
      <CastBiosSection />
      <GallerySection />
      <TrailerSection />
      <SecretFilesSection />
      <VideoOutroSection />
      <CrewSection />
      <Footer />
      <FinalCTA />
    </main>
  );
}
