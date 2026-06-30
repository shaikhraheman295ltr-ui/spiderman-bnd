"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

const VIDEO_PATH = "/SPIDER-MAN__BRAND_NEW_DAY_-_New_Trailer_-_Hindi___Exclusively_In_Cinemas_July_30%281080p%29.mp4";

export default function TrailerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
      setEnded(false);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    setEnded(true);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="trailer"
      ref={sectionRef}
      className="relative w-full bg-background py-32 overflow-hidden snap-start"
    >
      <div className="absolute inset-0 bg-gradient-radial from-red/5 via-transparent to-transparent opacity-20" />

      <div className="relative z-content max-w-6xl mx-auto px-6">
        <SectionLabel className="block text-center mb-4">
          Watch
        </SectionLabel>
        <h2 className="font-display text-5xl md:text-7xl text-white text-center tracking-wider mb-16">
          Official Trailer
        </h2>

        <div
          ref={contentRef}
          className="relative aspect-video rounded-sm overflow-hidden border border-web/30 bg-black opacity-0 group"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={VIDEO_PATH}
            muted={muted}
            playsInline
            onEnded={handleEnded}
            preload="metadata"
          />

          <div className="absolute inset-0 bg-black/20" />

          {!playing && !ended && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
              onClick={togglePlay}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-red flex items-center justify-center group-hover:bg-red group-hover:scale-110 transition-all duration-300">
                  <Play className="w-8 h-8 text-red group-hover:text-white transition-colors duration-300 ml-1" fill="currentColor" />
                </div>
                <span className="font-mono text-xs text-red tracking-[0.3em] uppercase">
                  Play Trailer
                </span>
              </div>
            </div>
          )}

          {ended && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 bg-black/60"
              onClick={togglePlay}
            >
              <div className="flex flex-col items-center gap-3">
                <span className="font-mono text-xs text-red tracking-[0.3em] uppercase">Replay</span>
                <Play className="w-8 h-8 text-red" fill="currentColor" />
              </div>
            </div>
          )}

          {playing && (
            <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 transition-opacity duration-300 ${isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              <button
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background/80 border border-web/30 text-white hover:bg-red transition-colors duration-200"
              >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background/80 border border-web/30 text-white hover:bg-red transition-colors duration-200"
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="font-mono text-3xl text-red font-bold">4K</span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              Resolution
            </span>
          </div>
          <div className="w-px h-8 bg-web hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-3xl text-red font-bold">Hindi</span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              Audio
            </span>
          </div>
          <div className="w-px h-8 bg-web hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-3xl text-red font-bold">Dolby</span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              Atmos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
