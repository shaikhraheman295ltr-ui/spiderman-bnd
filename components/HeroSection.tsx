"use client";

import { useRef, useEffect, useCallback, useState } from "react";

const V1_FRAMES = 200;
const V1_PATH = "/hero-frames-v1/frame";
const EXT = ".jpg";
const pad = (n: number) => String(n).padStart(5, "0");
const FPS = 10;

const COPY = [
  { text: "SPIDER-MAN", type: "title", start: 0.05, end: 0.35 },
  { text: "The world forgot him.", type: "line", start: 0.25, end: 0.55 },
  { text: "He didn't forget them.", type: "line", start: 0.45, end: 0.75 },
  { text: "A Brand New Day.", type: "accent", start: 0.65, end: 0.95 },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const v1Images = useRef<HTMLImageElement[]>([]);
  const loadingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [autoplayDone, setAutoplayDone] = useState(false);
  const animFrameRef = useRef<number>(0);
  const currentV1Frame = useRef(0);
  const lastFrameTime = useRef(0);

  const loadImage = useCallback(
    (folder: string, index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => { setLoadedCount((c) => c + 1); resolve(img); };
        img.onerror = () => { setLoadedCount((c) => c + 1); resolve(img); };
        img.src = `${folder}${pad(index + 1)}${EXT}`;
      });
    },
    []
  );

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    const promises: Promise<HTMLImageElement>[] = [];
    for (let i = 0; i < V1_FRAMES; i++) promises.push(loadImage(V1_PATH, i));
    Promise.all(promises).then((results) => {
      results.forEach((img, i) => { v1Images.current[i] = img; });
      setReady(true);
    });
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
    const copyEl = copyRef.current;
    if (!canvas || !copyEl) return;

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

    const frameInterval = 1000 / FPS;
    const copyItems = copyEl.querySelectorAll<HTMLDivElement>(".copy-item");
    const copyData = COPY.map((c, i) => ({ el: copyItems[i], ...c }));

    copyData.forEach(({ el }) => {
      if (el) { el.style.opacity = "0"; el.style.transform = "translateY(60px) scale(0.9)"; }
    });

    const checkReady = setInterval(() => {
      if (v1Images.current.length === V1_FRAMES && v1Images.current[0]?.complete) {
        clearInterval(checkReady);
        startAutoplay();
      }
    }, 100);

    function startAutoplay() {
      lastFrameTime.current = 0;
      currentV1Frame.current = 0;

      function play(timestamp: number) {
        if (!lastFrameTime.current) lastFrameTime.current = timestamp;
        const delta = timestamp - lastFrameTime.current;

        if (delta >= frameInterval) {
          lastFrameTime.current = timestamp;

          const frame = currentV1Frame.current;
          const progress = frame / V1_FRAMES;

          const img = v1Images.current[frame];
          if (img && img.complete && img.naturalWidth) {
            ctx!.save();
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
            drawFrame(ctx!, W, H, img);
            ctx!.restore();
          }

          copyData.forEach(({ el, start, end }) => {
            if (!el) return;
            const mid = (start + end) / 2;
            const halfRange = (end - start) / 2;
            const dist = Math.abs(progress - mid);
            const opacity = dist < halfRange ? 1 - dist / halfRange : 0;
            el.style.opacity = String(Math.max(0, opacity));
            el.style.transform = `translateY(${(progress - mid) * 200}px) scale(${0.9 + 0.1 * opacity})`;
          });

          currentV1Frame.current++;

          if (currentV1Frame.current < V1_FRAMES) {
            animFrameRef.current = requestAnimationFrame(play);
          } else {
            setAutoplayDone(true);
          }
        } else {
          animFrameRef.current = requestAnimationFrame(play);
        }
      }

      animFrameRef.current = requestAnimationFrame(play);
    }

    return () => {
      clearInterval(checkReady);
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [loadImage, drawFrame]);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "title": return "font-display text-[clamp(4rem,16vw,16rem)] leading-none text-red red-glow-text";
      case "line": return "font-sans text-sm md:text-base text-silver tracking-[0.3em] uppercase";
      case "accent": return "font-editorial italic text-3xl md:text-5xl text-gold gold-glow-text";
      default: return "text-white";
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background snap-start">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {!ready && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-background">
          <div className="w-12 h-12 border-2 border-red border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 font-mono text-xs text-muted tracking-widest uppercase">
            LOADING FRAMES <span className="text-red">{loadedCount}</span>/{V1_FRAMES}
          </p>
          <div className="mt-3 w-48 h-0.5 bg-web/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-red transition-all duration-200"
              style={{ width: `${(loadedCount / V1_FRAMES) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="web-overlay" />

      <div
        className="absolute inset-0 z-overlay pointer-events-none flex items-center justify-center"
        style={{ opacity: autoplayDone ? 1 : 0, backgroundColor: "rgba(10,10,15,0.95)", transition: "opacity 0.6s" }}
      >
        {autoplayDone && (
          <div className="text-center">
            <span className="font-mono text-xs text-red tracking-[0.3em] uppercase animate-pulse">Scroll to continue</span>
          </div>
        )}
      </div>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-content text-center pointer-events-none">
        <span className="font-display text-lg md:text-3xl text-gold tracking-[0.15em] opacity-70 drop-shadow-lg">
          SPIDER-MAN: BRAND NEW DAY
        </span>
      </div>

      <div ref={copyRef} className="absolute inset-0 z-content flex items-center justify-center pointer-events-none">
        {COPY.map((item, i) => (
          <div key={i} className={`copy-item absolute text-center ${getTypeStyles(item.type)}`}>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
