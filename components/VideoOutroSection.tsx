"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const V2_FRAMES = 231;
const V2_PATH = "/hero-frames-v2/frame";
const EXT = ".jpg";
const pad = (n: number) => String(n).padStart(5, "0");
const FPS = 24;

export default function VideoOutroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const animationRef = useRef<number>(0);
  const currentFrame = useRef(0);
  const isPlaying = useRef(false);
  const lastFrameTime = useRef(0);

  const loadImage = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
        img.src = `${V2_PATH}${pad(index + 1)}${EXT}`;
      });
    },
    []
  );

  useEffect(() => {
    const loadAll = async () => {
      const promises: Promise<HTMLImageElement>[] = [];
      for (let i = 0; i < V2_FRAMES; i++) {
        promises.push(loadImage(i));
      }
      const results = await Promise.all(promises);
      results.forEach((img, i) => {
        images.current[i] = img;
      });
      setReady(true);
    };
    loadAll();
  }, [loadImage]);

  const drawFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      img: HTMLImageElement
    ) => {
      if (!img || !img.complete || !img.naturalWidth) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (w - sw) / 2;
      const sy = (h - sh) / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, sx, sy, sw, sh);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = 0;
    let H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const frameInterval = 1000 / FPS;

    const play = (timestamp: number) => {
      if (!lastFrameTime.current) lastFrameTime.current = timestamp;
      const delta = timestamp - lastFrameTime.current;

      if (delta >= frameInterval) {
        lastFrameTime.current = timestamp;

        if (currentFrame.current < V2_FRAMES - 1) {
          currentFrame.current++;
        } else {
          currentFrame.current = 0;
        }

        const img = images.current[currentFrame.current];
        if (img && img.complete && img.naturalWidth) {
          ctx.save();
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          drawFrame(ctx, W, H, img);
          ctx.restore();
        }
      }

      if (isPlaying.current) {
        animationRef.current = requestAnimationFrame(play);
      }
    };

    if (prefersReducedMotion()) return;

    const ctxGsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          isPlaying.current = true;
          lastFrameTime.current = 0;
          animationRef.current = requestAnimationFrame(play);
        },
        onLeave: () => {
          isPlaying.current = false;
          cancelAnimationFrame(animationRef.current);
        },
        onEnterBack: () => {
          isPlaying.current = true;
          lastFrameTime.current = 0;
          animationRef.current = requestAnimationFrame(play);
        },
        onLeaveBack: () => {
          isPlaying.current = false;
          cancelAnimationFrame(animationRef.current);
        },
      });
    }, section);

    return () => {
      ctxGsap.revert();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-background overflow-hidden snap-start"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
          <div className="w-12 h-12 border-2 border-red border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 30%, transparent 70%, rgba(10,10,15,0.8) 100%)",
        }}
      />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <span className="font-mono text-[10px] text-muted tracking-[0.3em] uppercase">
          In Theaters July 31
        </span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-red animate-pulse" />
        <span className="font-mono text-[10px] text-muted tracking-[0.3em] uppercase">
          Playing
        </span>
      </div>
    </section>
  );
}
