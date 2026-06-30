"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils";

const BIO = {
  name: "Tom Holland",
  fullName: "Thomas Stanley Holland",
  born: "June 1, 1996",
  birthplace: "Kingston upon Thames, London, England",
  height: "5'8\" (173 cm)",
  partner: "Zendaya (engaged)",
  netWorth: "Est. $25M+",
  instagram: "60M+ followers",
  awards: "BAFTA Rising Star Award (2017), 3x Saturn Awards",
  gross: "$9.9B worldwide",
  sober: "4 years (since 2022)",
};

const TIMELINE = [
  { year: "2008", event: "Billy Elliot the Musical — West End debut" },
  { year: "2012", event: "Film debut in The Impossible alongside Naomi Watts" },
  { year: "2015", event: "Cast as Spider-Man / Peter Parker in the MCU" },
  { year: "2016", event: "First appearance as Spider-Man in Captain America: Civil War" },
  { year: "2017", event: "First solo film Spider-Man: Homecoming + BAFTA Rising Star Award" },
  { year: "2019", event: "Spider-Man: Far From Home — global box office $1.1B" },
  { year: "2021", event: "Spider-Man: No Way Home — highest-grossing film of the year ($1.9B)" },
  { year: "2022", event: "Starred in Uncharted; went sober (Dry January became permanent)" },
  { year: "2024", event: "Founded production company Billy17 with brother Harry" },
  { year: "2026", event: "Spider-Man: Brand New Day + The Odyssey (Christopher Nolan)" },
];

const QUOTES = [
  '"I couldn\'t have asked for a better job. I came to work every day with a real sense of purpose."',
  '"The movie is already the best Spider-Man movie that we\'ve ever made."',
];

export default function TomHollandSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const timeline = timelineRef.current;
    const stats = statsRef.current;
    if (!el || !content || !image || !timeline || !stats) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { opacity: 0, x: -80, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", end: "top 30%", scrub: 1 },
        }
      );

      gsap.fromTo(
        content.querySelector(".bio-header"),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 65%", end: "top 35%", scrub: 1 },
        }
      );

      const statItems = stats.querySelectorAll<HTMLDivElement>(".stat-item");
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: stats, start: "top 80%", end: "top 40%", scrub: 1 },
        }
      );

      const timelineItems = timeline.querySelectorAll<HTMLDivElement>(".timeline-item");
      gsap.fromTo(
        timelineItems,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5, stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: timeline, start: "top 75%", end: "bottom 25%", scrub: 1.5 },
        }
      );

      const quoteEls = content.querySelectorAll<HTMLDivElement>(".quote");
      gsap.fromTo(
        quoteEls,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 40%", scrub: 1 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tom-holland"
      ref={sectionRef}
      className="relative w-full bg-background overflow-hidden snap-start"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-red/[0.02] via-transparent to-blue/[0.02]" />

      <div className="relative z-content max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
        <div className="text-center mb-16">
          <SectionLabel className="block text-center">The Man Behind the Mask</SectionLabel>
          <h2 className="font-display text-5xl md:text-8xl text-white tracking-wider mt-4">
            Tom Holland
          </h2>
          <p className="font-editorial italic text-xl md:text-2xl text-silver mt-2">
            Peter Parker &bull; Spider-Man &bull; BAFTA Winner
          </p>
        </div>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div
            ref={imageRef}
            className="relative aspect-[3/4] rounded-sm overflow-hidden border border-web/30 opacity-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url(/images/cast/1.jpg)",
                filter: "grayscale(10%) contrast(1.05)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="font-mono text-[10px] text-red tracking-[0.3em] uppercase">
                Photo &copy; Marvel Studios 2026
              </span>
            </div>
          </div>

          <div>
            <div className="bio-header opacity-0">
              <div className="flex flex-wrap gap-3 mb-6">
                {["Actor", "Producer", "Dancer", "Philanthropist"].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-red tracking-widest uppercase px-3 py-1.5 border border-red/20 rounded-full bg-red/[0.03]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-sans text-sm md:text-base text-silver leading-relaxed max-w-xl">
                Thomas Stanley Holland is an English actor who rose to international fame
                as Peter Parker / Spider-Man in the Marvel Cinematic Universe. With his
                films grossing over <span className="text-red font-semibold">$9.9 billion</span> worldwide,
                he is one of the highest-grossing actors of all time.
              </p>

              <p className="font-sans text-sm md:text-base text-silver leading-relaxed mt-4 max-w-xl">
                Born in Kingston upon Thames, London, Holland began his career at age nine
                in dance classes, leading to a role in <span className="text-white">Billy Elliot the Musical</span>.
                He defeated 1,500 teenagers worldwide to land the role of Spider-Man in 2015,
                making his debut in Captain America: Civil War at just 19 years old.
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {[
                { label: "Born", value: "June 1, 1996" },
                { label: "Age", value: "30" },
                { label: "Height", value: '5\'8"' },
                { label: "Films", value: "25+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="stat-item opacity-0 bg-surface/50 border border-web/20 rounded-sm p-4 text-center"
                >
                  <span className="font-mono text-lg md:text-2xl text-red font-bold block">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[9px] text-muted tracking-widest uppercase mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6">
              {Object.entries(BIO).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="font-mono text-[9px] text-muted tracking-widest uppercase">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="font-sans text-sm text-white mt-0.5">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {QUOTES.map((q, idx) => (
                <div key={idx} className="quote opacity-0 border-l-2 border-red/50 pl-4 py-2">
                  <p className="font-editorial italic text-base md:text-lg text-white leading-relaxed">
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={timelineRef} className="mt-24">
          <h3 className="font-display text-3xl md:text-5xl text-white tracking-wider text-center mb-12">
            Journey to Stardom
          </h3>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red/50 via-red/20 to-transparent" />

            <div className="space-y-0">
              {TIMELINE.map((item, idx) => (
                <div
                  key={idx}
                  className="timeline-item opacity-0 relative pl-12 md:pl-0 md:even:text-right pb-10"
                >
                  <div className="md:w-1/2 md:odd:pr-12 md:even:pl-12 md:even:ml-auto">
                    <div className="flex items-center gap-3 md:odd:flex-row md:even:flex-row-reverse">
                      <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-2 border-red bg-background flex-shrink-0 z-10" />
                      <span className="font-mono text-sm text-red font-bold">{item.year}</span>
                    </div>
                    <p className="font-sans text-sm text-silver mt-1 leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
