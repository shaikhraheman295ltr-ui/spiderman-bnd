"use client";

import { useRef, useEffect, useCallback, useState } from "react";

const V3_FRAMES = 210;
const V3_PATH = "/hero-frames-v3/frame";
const EXT = ".jpg";
const pad = (n: number) => String(n).padStart(5, "0");
const FPS = 12;
const LOOP = true;

export default function V3AutoplaySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const animRef = useRef<number>(0);
  const currentFrame = useRef(0);
  const lastTime = useRef(0);

  const loadImage = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
        img.src = `${V3_PATH}${pad(index + 1)}${EXT}`;
      });
    },
    []
  );

  useEffect(() => {
    const loadAll = async () => {
      const promises: Promise<HTMLImageElement>[] = [];
      for (let i = 0; i < V3_FRAMES; i++) promises.push(loadImage(i));
      const results = await Promise.all(promises);
      results.forEach((img, i) => { images.current[i] = img; });
      setReady(true);
    };
    loadAll();
  }, [loadImage]);

  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, img: HTMLImageElement) => {
      if (!img || !img.complete || !img.naturalWidth) return;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - iw * scale) / 2, (h - ih * scale) / 2, iw * scale, ih * scale);
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
    let W = 0, H = 0;

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

    const interval = 1000 / FPS;

    function play(timestamp: number) {
      if (!lastTime.current) lastTime.current = timestamp;
      const delta = timestamp - lastTime.current;

      if (delta >= interval) {
        lastTime.current = timestamp;

        const img = images.current[currentFrame.current];
        if (img && img.complete && img.naturalWidth) {
          ctx!.save();
          ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
          drawFrame(ctx!, W, H, img);
          ctx!.restore();
        }

        if (currentFrame.current < V3_FRAMES - 1) {
          currentFrame.current++;
        } else if (LOOP) {
          currentFrame.current = 0;
        } else {
          return;
        }
      }

      animRef.current = requestAnimationFrame(play);
    }

    const checkReady = setInterval(() => {
      if (images.current.length === V3_FRAMES && images.current[0]?.complete) {
        clearInterval(checkReady);
        animRef.current = requestAnimationFrame(play);
      }
    }, 100);

    return () => {
      clearInterval(checkReady);
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-background overflow-hidden snap-start"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
          <div className="w-12 h-12 border-2 border-red border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-background/20" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <span className="font-mono text-[10px] text-muted tracking-[0.3em] uppercase">
          The Story Continues
        </span>
      </div>
    </section>
  );
}
