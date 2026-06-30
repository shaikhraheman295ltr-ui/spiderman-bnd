"use client";

import SectionLabel from "@/components/ui/SectionLabel";

const CREW = [
  { role: "Director", name: "Destin Daniel Cretton" },
  { role: "Written by", name: "Chris McKenna & Erik Sommers" },
  { role: "Produced by", name: "Kevin Feige & Amy Pascal" },
  { role: "Music by", name: "Michael Giacchino" },
  { role: "Cinematography", name: "Mauro Fiore" },
  { role: "Production Design", name: "Darren Gilford" },
];

export default function CrewSection() {
  return (
    <section className="relative w-full bg-background py-24 md:py-32 overflow-hidden snap-start">
      <div className="absolute inset-0 bg-gradient-to-b from-blue/[0.02] via-transparent to-red/[0.02]" />

      <div className="relative z-content max-w-4xl mx-auto px-4 md:px-8 text-center">
        <SectionLabel className="block text-center mb-4">Filmmakers</SectionLabel>
        <h2 className="font-display text-4xl md:text-7xl text-white tracking-wider mb-16">
          Behind the Camera
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-left">
          {CREW.map((member) => (
            <div key={member.name} className="border-l border-web/20 pl-4">
              <span className="font-mono text-[10px] text-muted tracking-[0.25em] uppercase">
                {member.role}
              </span>
              <p className="font-sans text-sm md:text-base text-white mt-1">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
