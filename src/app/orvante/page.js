"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OrvantePage() {
  const [activeNav, setActiveNav] = useState("Home");
  const [statementProgress, setStatementProgress] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statementRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Statement scroll fill calculation
      if (statementRef.current) {
        const rect = statementRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setStatementProgress(Math.max(0, Math.min(1, progress * 1.5)));
      }

      // Trust section counter trigger
      if (trustRef.current) {
        const rect = trustRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const statementText = "We believe the strongest brands are built through strategy, not just aesthetics. Every campaign is designed to capture attention, inspire action, and create lasting business growth.";
  const words = statementText.split(" ");

  return (
    <div className="min-h-screen bg-[#dadada] text-[#111] selection:bg-[#111] selection:text-[#f4f4f4]" style={{ fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)" }}>
      {/* Google Fonts import for Archivo & Inter Tight */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap');
        
        .font-archivo {
          font-family: 'Archivo', sans-serif;
        }
        .font-inter {
          font-family: 'Inter Tight', sans-serif;
        }
      `}</style>

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full overflow-hidden bg-[#dadada] px-4 py-8 md:px-14 md:py-12 lg:min-h-[938px]">
        {/* Background Photo */}
        <div className="absolute left-[338px] top-[-86px] hidden h-[1024px] w-[764px] overflow-hidden opacity-95 lg:block pointer-events-none" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
          <Image
            src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7dc8b8f3-4ccb-4599-8ce4-7f7c7881bad9.webp"
            alt="Orvante Hero Portrait"
            fill
            priority
            className="object-cover object-top filter grayscale contrast-125"
          />
        </div>

        {/* Navigation Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex h-12 items-center rounded-full bg-white p-1.5 shadow-sm">
            {["Home", "Studio", "Works", "Blog"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`relative px-5 py-2 text-sm font-medium transition-colors ${
                  activeNav === item ? "text-white" : "text-[#111] hover:opacity-75"
                }`}
              >
                {activeNav === item && (
                  <span className="absolute inset-0 rounded-full bg-black -z-10 transition-all duration-300" />
                )}
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden text-xs font-medium tracking-wide text-[#555] md:inline-block">
              Sunday / 17.06 – 27 June 2026
            </span>
            <Link
              href="#contact"
              className="inline-flex h-[46px] items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              Contact Us ↗
            </Link>
          </div>
        </div>

        {/* Hero Title & About */}
        <div className="relative z-20 mt-16 lg:mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="font-archivo text-6xl font-bold tracking-[-0.06em] leading-[0.86] md:text-8xl lg:text-[90px]" style={{ fontStretch: "104%" }}>
                PURE <span className="text-[#666]">/</span> DESIGN
                <span className="ml-4 text-2xl md:text-4xl font-light text-[#555] font-inter"> (’25)</span>
              </h1>

              <div className="mt-12 max-w-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-black" /> (ABOUT)
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#333]">
                  Building stunning website that every brand deserves to be seen.
                </p>
                <div className="mt-6">
                  <Link
                    href="#contact"
                    className="inline-flex h-[44px] items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                  >
                    Book A Call ↗
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column Content */}
            <div className="mt-12 lg:mt-0 lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-md shadow-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs">✓</span>
                <span className="text-xs font-medium">True Growth</span>
              </div>

              <p className="mt-8 text-sm font-medium text-[#448]">
                We’re available <br />
                <span className="text-black">● for you</span>
              </p>

              {/* Q Industrial Card */}
              <div className="mt-8 inline-block text-left w-full max-w-[320px] rounded-2xl bg-white/60 p-4 backdrop-blur-md shadow-lg">
                <div className="flex items-center justify-between text-xs text-[#555] mb-2">
                  <span>Out Now</span>
                  <span>Q Industrial</span>
                  <span>[2025]</span>
                </div>
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-black">
                  <Image
                    src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9340eb08-877d-4d08-91fb-b70754541d98.webp"
                    alt="Q Industrial"
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="h-[2px] w-full bg-[#ccc] relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-black" />
                  </div>
                  <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs">↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Frame & Brand Plate */}
        <div className="relative z-20 mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-end">
          {/* Stats Card 1 */}
          <div className="rounded-2xl bg-[#cdcdcd] p-6 shadow-md border border-white/40">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold font-archivo">400+</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#444]">Trusted Partner</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#666]">
              <span>Halcyon</span> · <span>Ostra</span> · <span>Fenwick</span> · <span>Monolo</span>
            </div>
            <div className="mt-6">
              <Link href="#contact" className="inline-flex items-center gap-2 text-xs font-semibold text-black hover:underline">
                Book a call ↗
              </Link>
            </div>
          </div>

          {/* Stats Card 2 - Studio Feed */}
          <div className="rounded-2xl bg-[#cdcdcd] p-6 shadow-md border border-white/40">
            <div className="flex items-center justify-between text-xs font-semibold text-[#555]">
              <span>Studio Feed</span>
              <span>05/06</span>
            </div>
            <div className="relative mt-3 h-28 w-full overflow-hidden rounded-xl">
              <Image
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a9d3641f-d629-46e5-8d2d-5f75386b803d.webp"
                alt="Studio Feed"
                fill
                className="object-cover grayscale contrast-125"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-bold">
              <span>230+</span>
              <span className="text-right text-[#555]">Projects successfully launched worldwide</span>
            </div>
          </div>

          {/* Brand Plate & Logos */}
          <div className="flex flex-col justify-end lg:items-end">
            <div className="rounded-2xl bg-black/90 p-5 text-white shadow-xl backdrop-blur-md w-full max-w-[364px]">
              <div className="flex items-center justify-between">
                <span className="font-archivo text-xl font-bold tracking-widest">ORVANTE</span>
                <div className="space-y-1">
                  <div className="h-0.5 w-5 bg-white" />
                  <div className="h-0.5 w-5 bg-white" />
                </div>
              </div>
              <p className="mt-3 text-[11px] text-[#aaa]">Lumon · Paperfold · Northwind</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BAR & STATEMENT SECTION ================= */}
      <section className="bg-black text-[#f4f4f4] py-28 px-4 md:px-14">
        {/* Black Bar */}
        <div className="mx-auto max-w-7xl border-b border-white/20 pb-6 mb-24 flex flex-wrap items-center justify-between font-archivo text-xs uppercase tracking-widest text-[#888]">
          <span>EST 2019</span>
          <div className="flex items-center gap-3 text-white cursor-pointer hover:opacity-80">
            <span>SCROLL DOWN</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white">↓</span>
          </div>
          <span className="text-[#888]">LIVE IN DETAILS</span>
        </div>

        {/* Statement Scroll Fill */}
        <div ref={statementRef} className="mx-auto max-w-5xl py-16 text-center">
          <p className="text-3xl md:text-5xl lg:text-[52px] font-medium leading-[1.33] tracking-[-0.028em]">
            {words.map((word, i) => {
              // Calculate word color based on scroll progress
              const threshold = i / words.length;
              const isFilled = statementProgress > threshold;
              return (
                <span
                  key={i}
                  className="transition-colors duration-300 inline-block mr-[0.3em]"
                  style={{
                    color: isFilled ? "#f4f4f4" : "#6f6f6f",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>

          <div className="mt-20 border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between text-sm text-[#888]">
            <p>Performance-driven marketing, from strategy to execution.</p>
            <p className="mt-2 md:mt-0 text-[#f4f4f4] italic">Built for growing brands.</p>
          </div>
        </div>
      </section>

      {/* ================= TRUST PANEL SECTION ================= */}
      <section ref={trustRef} className="bg-black text-[#f4f4f4] pb-32 px-4 md:px-14">
        <div className="mx-auto max-w-[1302px] rounded-[14px] border border-white/28 bg-[#0a0a0a] p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl font-medium leading-tight">
                Trusted by <br />
                Hundreds of <br />
                Growing <br />
                Businesses
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[#888] max-w-md">
                We partner with ambitious category leaders to engineer brand systems, high-performance digital platforms, and automated acquisition loops that scale revenue predictably.
              </p>
            </div>

            {/* Right Cards Grid */}
            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              
              {/* Card 1: Avatars & 56M+ */}
              <div className="rounded-[8px] bg-[#d6d6d6] text-black p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex -space-x-3 overflow-hidden">
                    {[
                      "300f41b1-3de5-4153-afde-06e15e753ad0",
                      "bfff4cdf-4fda-4491-ada6-62f3b6236492",
                      "943b121e-fe72-479f-93ae-aa8cd1650f69",
                      "c673306f-2b81-4c3d-a7d2-3df61d481abb",
                      "2e4fcf11-d0fc-4f31-8f7a-dfe751777141",
                      "ab458fcd-4c2c-426f-8213-21cc3c7274be",
                      "c1fcd833-5ac9-41e9-9352-fead7e64fa24",
                      "4c2b3307-e555-4633-949c-efd3b7e09d82"
                    ].map((hash, idx) => (
                      <div key={idx} className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                          src={`https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${hash}.webp`}
                          alt={`Avatar ${idx + 1}`}
                          fill
                          className="object-cover grayscale"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-4xl font-bold font-archivo">{statsAnimated ? "56M+" : "0M+"}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#555] mt-1">Global Collaborations</p>
                </div>
              </div>

              {/* Card 2: Awards & Laurel */}
              <div className="rounded-[8px] bg-[#262626] text-white p-6 flex flex-col justify-between shadow-lg border border-white/10">
                <div>
                  <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#aaa]">
                    Award Winning
                  </span>
                  <p className="text-4xl font-bold font-archivo mt-4">{statsAnimated ? "10+" : "0+"}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#aaa] mt-1">Industry Awards</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-white">BEST GROWTH PARTNER 2026</p>
                    <p className="text-[#888] text-[11px]">Recognized globally for excellence.</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-bold text-xs">★</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
