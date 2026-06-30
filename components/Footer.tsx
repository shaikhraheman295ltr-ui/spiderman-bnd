"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-background border-t border-web/10 snap-start">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-display text-xl text-white tracking-wider">
              SPIDER-MAN: BRAND NEW DAY
            </span>
            <p className="font-sans text-xs text-muted leading-relaxed mt-3 max-w-xs">
              In theaters July 31, 2026. Experience the next chapter of the Spider-Man saga only in theaters.
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] text-red tracking-[0.3em] uppercase">Connect</span>
            <div className="flex flex-col gap-2 mt-3">
              {[
                { label: "Instagram", href: "https://instagram.com/spidermanmovie" },
                { label: "Twitter / X", href: "https://twitter.com/SpiderManMovie" },
                { label: "YouTube", href: "https://youtube.com/@Marvel" },
                { label: "TikTok", href: "https://tiktok.com/@spidermanmovie" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-white/60 hover:text-red transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 font-mono text-[10px] text-muted tracking-[0.3em] uppercase hover:text-red transition-colors duration-200"
            >
              Back to top
              <span className="inline-block group-hover:-translate-y-1 transition-transform duration-200">
                &uarr;
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-web/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[9px] text-muted tracking-widest uppercase text-center md:text-left">
            &copy; {new Date().getFullYear()} Marvel Studios. All Rights Reserved. Spider-Man is a trademark of Marvel Characters, Inc.
          </p>
          <p className="font-mono text-[9px] text-muted tracking-widest uppercase">
            Sony Pictures Releasing
          </p>
        </div>
      </div>
    </footer>
  );
}
