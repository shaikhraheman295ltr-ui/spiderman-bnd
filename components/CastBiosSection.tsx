"use client";

import SectionLabel from "@/components/ui/SectionLabel";

const CAST = [
  {
    name: "Sadie Sink",
    role: "Newcomer",
    image: "/images/cast/3.jpg",
    bio: "Rising star from Stranger Things joins the MCU in a mysterious role that will redefine Spider-Man's world.",
  },
  {
    name: "Jon Bernthal",
    role: "The Punisher",
    image: "/images/cast/6.jpg",
    bio: "Frank Castle returns with brutal precision. Bernthal reprises his iconic role, bringing street-level fury to the MCU.",
  },
  {
    name: "Mark Ruffalo",
    role: "Bruce Banner",
    image: "/images/cast/5.jpg",
    bio: "The Smart Hulk lends scientific genius and gamma-powered muscle as the Avengers rally once more.",
  },
  {
    name: "Michael Mando",
    role: "Scorpion",
    image: "/images/cast/4.jpg",
    bio: "Mac Gargan's vendetta against Spider-Man reaches a breaking point. Mando's Scorpion is poised to strike.",
  },
];

export default function CastBiosSection() {
  return (
    <section className="relative w-full bg-background py-24 md:py-32 overflow-hidden snap-start">
      <div className="absolute inset-0 bg-gradient-to-b from-red/[0.02] via-transparent to-blue/[0.02]" />

      <div className="relative z-content max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <SectionLabel className="block text-center">Also Starring</SectionLabel>
          <h2 className="font-display text-4xl md:text-7xl text-white tracking-wider mt-4">
            The Cast
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {CAST.map((member) => (
            <div
              key={member.name}
              className="group relative flex gap-5 p-5 rounded-sm border border-web/10 bg-surface/30 hover:bg-surface/50 hover:border-red/30 transition-all duration-500"
            >
              <div className="relative w-24 h-28 md:w-28 md:h-32 flex-shrink-0 overflow-hidden rounded-sm">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-xl md:text-2xl text-white tracking-wider">
                  {member.name}
                </h3>
                <span className="font-mono text-[10px] text-red tracking-[0.25em] uppercase">
                  {member.role}
                </span>
                <p className="font-sans text-sm text-silver leading-relaxed mt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
