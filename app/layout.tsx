import type { Metadata } from "next";
import { Bebas_Neue, Inter, Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spider-Man: Brand New Day | In Theaters July 31, 2026",
  description:
    "The world may have forgotten Peter Parker. But he hasn't forgotten them. Marvel Studios & Sony Pictures present Spider-Man: Brand New Day. In Theaters July 31, 2026.",
  openGraph: {
    title: "Spider-Man: Brand New Day",
    description:
      "The world may have forgotten Peter Parker. But he hasn't forgotten them.",
    images: ["/images/gallery/1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${cormorant.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
