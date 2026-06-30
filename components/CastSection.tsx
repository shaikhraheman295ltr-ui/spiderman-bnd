"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils";

const CAST = [
  { name: "Tom Holland", role: "Peter Parker / Spider-Man", image: "/images/cast/1.jpg" },
  { name: "Zendaya", role: "MJ", image: "/images/cast/2.jpg" },
  { name: "Sadie Sink", role: "Newcomer", image: "/images/cast/3.jpg" },
  { name: "Michael Mando", role: "Scorpion", image: "/images/cast/4.jpg" },
  { name: "Mark Ruffalo", role: "Bruce Banner", image: "/images/cast/5.jpg" },
  { name: "Jon Bernthal", role: "The Punisher", image: "/images/cast/6.jpg" },
];

export default function CastSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    if (prefersReducedMotion() || isMobile) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxScroll = totalWidth - viewportWidth;

      gsap.to(track, {
        x: -maxScroll,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const img = card.querySelector<HTMLDivElement>(".cast-image");
        if (!img) return;

        gsap.to(img, {
          y: -60 + i * 10,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "left center",
            end: "right center",
            scrub: 1,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section
        id="cast"
        ref={sectionRef}
        className="relative w-full bg-background overflow-hidden snap-start py-24"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red/5 via-transparent to-transparent" />
        <div className="relative z-content max-w-7xl mx-auto px-4">
          <SectionLabel className="text-center mb-12">Starring</SectionLabel>
          <div className="grid grid-cols-2 gap-4">
            {CAST.map((member) => (
              <div
                key={member.name}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-web/10"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center cinematic-image group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-display text-lg text-white tracking-wider">
                    {member.name}
                  </h3>
                  <p className="font-editorial italic text-[10px] text-muted mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="cast"
      ref={sectionRef}
      className="relative w-full bg-background overflow-hidden snap-start"
      style={{ height: "100vh" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red/5 via-transparent to-transparent" />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
        <SectionLabel className="text-center">Starring</SectionLabel>
      </div>

      <div
        ref={trackRef}
        className="flex items-center h-full gap-8 px-[10vw]"
      >
        {CAST.map((member, i) => (
          <div
            key={member.name}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative flex-shrink-0 w-[280px] md:w-[340px] h-[420px] md:h-[500px] overflow-hidden cursor-pointer"
          >
            <div
              className="cast-image absolute inset-0 w-full h-[120%] cinematic-image"
              style={{
                backgroundImage: `url(${member.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red shadow-lg shadow-red/50"
                style={{
                  animation: "scanLine 2s linear infinite",
                }}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="font-display text-2xl text-white tracking-wider">
                {member.name}
              </h3>
              <p className="font-editorial italic text-sm text-muted mt-1">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scanLine {
          0% { transform: translateY(0); }
          100% { transform: translateY(420px); }
        }
      `}</style>
    </section>
  );
}
