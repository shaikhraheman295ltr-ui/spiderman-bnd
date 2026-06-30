"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils";

const GALLERY_IMAGES = Array.from(
  { length: 12 },
  (_, i) => `/images/gallery/${i + 1}.jpg`
);

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const closeMs = 150;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const imgs = imagesRef.current.filter(Boolean);

      gsap.fromTo(
        imgs,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    GALLERY_IMAGES.forEach((src, i) => {
      const img = new Image();
      img.onload = () => setLoadedImages((prev) => new Set(prev).add(i));
      img.onerror = () => setLoadedImages((prev) => new Set(prev).add(i));
      img.src = src;
    });
  }, []);

  const openModal = useCallback((src: string) => {
    setModalSrc(src);
    setModalOpen(true);
    setTimeout(() => {
      const modal = modalRef.current;
      if (modal) {
        modal.classList.remove("is-closing");
        modal.classList.add("is-open");
      }
    }, 10);
  }, []);

  const closeModal = useCallback(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.classList.remove("is-open");
      modal.classList.add("is-closing");
      setTimeout(() => {
        modal.classList.remove("is-closing");
        setModalOpen(false);
      }, closeMs);
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, closeModal]);

  const getGridClass = (i: number) => {
    const spans = [
      "col-span-2 row-span-2 min-h-[400px]",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1 min-h-[280px]",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1 min-h-[280px]",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1 min-h-[280px]",
    ];
    return spans[i] || "col-span-1 row-span-1";
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden snap-start"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red/[0.02] to-transparent" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/30 to-transparent" />

      <div className="relative z-content max-w-7xl mx-auto px-4 md:px-6">
        <SectionLabel className="block text-center mb-4">
          Gallery
        </SectionLabel>
        <h2 className="font-display text-5xl md:text-7xl text-white text-center tracking-wider mb-16">
          Moments in the Dark
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[280px]">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              ref={(el) => { imagesRef.current[i] = el; }}
              className={`relative overflow-hidden rounded opacity-0 ${getGridClass(i)}`}
            >
              <button
                onClick={() => openModal(src)}
                className="w-full h-full bg-cover bg-center group cursor-pointer transition-transform duration-700 hover:scale-105 text-left"
                style={{
                  backgroundImage: loadedImages.has(i) ? `url(${src})` : "none",
                  backgroundColor: loadedImages.has(i) ? "transparent" : "#0F0F18",
                  filter: "grayscale(20%) contrast(1.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <span className="font-mono text-xs text-red tracking-widest uppercase bg-background/80 px-4 py-2 rounded border border-red/30">
                    View
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div
          ref={modalRef}
          className="t-modal fixed inset-0 z-modal flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="dialog"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] mx-4 rounded-sm overflow-hidden border border-web/30"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalSrc}
              alt="Gallery"
              className="w-full h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 border border-web/30 text-white hover:bg-red transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
