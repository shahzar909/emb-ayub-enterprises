'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const ventures = [
  {
    name: "AdzSquare",
    color: "#C89A45",
    letter: "A",
    href: "https://www.adzsquare.com",
    soon: false,
    logo: "/ad.webp",
  },
  {
    name: "Masala Udyog",
    color: "#D8B25C",
    letter: "M",
    href: "https://masalaudyog.co.in",
    soon: false,
    logo: "/masala.webp",
  },
  {
    name: "Tax & Audit",
    color: "#6D4AA2",
    letter: "T",
    href: "#",
    soon: true,
  },
  {
    name: "Consulting",
    color: "#8E65C7",
    letter: "C",
    href: "#",
    soon: true,
  },
  {
    name: "Technology",
    color: "#A77AD6",
    letter: "T",
    href: "#",
    soon: true,
  },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background ── */}
      {/* ───────────────── Background ───────────────── */}

<motion.div
  style={{ y: bgY }}
  className="absolute inset-0 -z-20"
>

  {/* Base Purple Gradient */}

  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(180deg,#4A2378 0%,#3A195F 45%,#2C114B 100%)",
    }}
  />

  {/* Top Purple Glow */}

  <div
    className="absolute left-1/2 top-[-380px] h-[900px] w-[900px] -translate-x-1/2 rounded-full"
    style={{
      background:
        "radial-gradient(circle, rgba(116,82,168,.42) 0%, rgba(0,0,0,0) 72%)",
      filter: "blur(110px)",
    }}
  />

  {/* Left Glow */}

  <div
    className="absolute left-[-180px] top-[15%] h-[700px] w-[700px] rounded-full"
    style={{
      background:
        "radial-gradient(circle, rgba(90,45,130,.40) 0%, transparent 75%)",
      filter: "blur(90px)",
    }}
  />

  {/* Right Gold Glow */}

  <div
    className="absolute bottom-[-180px] right-[-160px] h-[650px] w-[650px] rounded-full"
    style={{
      background:
        "radial-gradient(circle, rgba(200,154,69,.18) 0%, transparent 75%)",
      filter: "blur(100px)",
    }}
  />

  {/* Center Beam */}

  <div
    className="absolute top-0 left-1/2 h-[900px] w-[700px] -translate-x-1/2 pointer-events-none"
    style={{
      background:
        "radial-gradient(circle at top, rgba(200,154,69,.22), transparent 72%)",
      filter: "blur(100px)",
    }}
  />

  {/* Grain */}

  <div
    className="absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage:
        "radial-gradient(rgba(255,255,255,.7) .7px, transparent .7px)",
      backgroundSize: "22px 22px",
    }}
  />

  {/* Architectural SVG */}

  <svg
    className="absolute right-0 top-0 h-full w-[55%] opacity-70"
    viewBox="0 0 800 900"
    preserveAspectRatio="xMaxYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >

    <rect
      x="420"
      y="80"
      width="160"
      height="680"
      fill="rgba(255,255,255,.05)"
      stroke="#D8B25C"
      strokeWidth="0.8"
    />

    <rect
      x="430"
      y="90"
      width="140"
      height="660"
      fill="none"
      stroke="rgba(255,255,255,.18)"
      strokeWidth="0.4"
    />

    {[450,470,490,510,530,550,570].map((x)=>(

      <line
        key={x}
        x1={x}
        y1="80"
        x2={x}
        y2="760"
        stroke="rgba(255,255,255,.12)"
        strokeWidth="0.5"
      />

    ))}

    {Array.from({length:32},(_,i)=>80+i*21).map((y)=>(

      <line
        key={y}
        x1="420"
        y1={y}
        x2="580"
        y2={y}
        stroke="rgba(255,255,255,.08)"
        strokeWidth="0.3"
      />

    ))}

{/* Accent Lines */}

<line
  x1="380"
  y1="110"
  x2="620"
  y2="110"
  stroke="rgba(216,178,92,.25)"
  strokeWidth="1"
/>

<line
  x1="380"
  y1="730"
  x2="620"
  y2="730"
  stroke="rgba(216,178,92,.25)"
  strokeWidth="1"
/>

<circle
  cx="500"
  cy="420"
  r="170"
  stroke="rgba(255,255,255,.08)"
  strokeWidth="1"
  fill="none"
/>

<circle
  cx="500"
  cy="420"
  r="250"
  stroke="rgba(216,178,92,.10)"
  strokeWidth="1"
  fill="none"
/>

<circle
  cx="500"
  cy="420"
  r="330"
  stroke="rgba(255,255,255,.05)"
  strokeWidth="1"
  fill="none"
/>

<path
  d="M500 80 L500 760"
  stroke="rgba(216,178,92,.18)"
  strokeWidth="1"
/>

<path
  d="M420 420 L580 420"
  stroke="rgba(216,178,92,.18)"
  strokeWidth="1"
/>
  </svg>

  {/* Bottom Waves */}

  <svg
    className="absolute inset-0 h-full w-full opacity-40"
    viewBox="0 0 1600 900"
    preserveAspectRatio="none"
  >

    <path
      d="M-250 760C180 520 760 520 1850 760"
      stroke="rgba(255,255,255,.18)"
      strokeWidth="1.5"
      fill="none"
    />

    <path
      d="M-250 830C260 620 820 620 1850 830"
      stroke="rgba(216,178,92,.20)"
      strokeWidth="1.2"
      fill="none"
    />

    <path
      d="M-250 900C340 710 920 710 1850 900"
      stroke="rgba(255,255,255,.12)"
      strokeWidth="1"
      fill="none"
    />

  </svg>

</motion.div>

{/* Soft vignette */}

<div
  className="absolute inset-0 -z-10 pointer-events-none"
  style={{
    background:
      "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,.25) 100%)",
  }}
/>
      {/* ── Content ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-28 pb-16 text-center"
      >

        {/* Badge */}
        {/* Badge */}

<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15, duration: 0.5 }}
  className="
    mb-8
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-white/15
    bg-white/10
    px-5
    py-2
    backdrop-blur-xl
  "
>
  <span className="h-2 w-2 rounded-full bg-[#D8B25C] animate-pulse" />

  <span
    className="
      text-[11px]
      font-semibold
      uppercase
      tracking-[0.28em]
      text-white/80
    "
  >
    EMB AYUB ENTERPRISES
  </span>
</motion.div>
        {/* Headline */}
        {/* Headline */}

<motion.h1
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.25,
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    max-w-4xl
    font-black
    leading-[1.05]
    text-white
  "
  style={{
    fontSize: "clamp(2.8rem,5vw,4.6rem)",
    letterSpacing: "-0.05em",
  }}
>
  Where{" "}

  <span
    style={{
      background:
        "linear-gradient(135deg,#E6C67A 0%,#C89A45 45%,#F3D68F 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    Vision
  </span>

  {" "}Becomes

  <br />

  Enterprise
</motion.h1>
<motion.p
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="
    mt-7
    max-w-2xl
    text-lg
    leading-8
    text-white/70
  "
>
  Sourced with Care, Delivered with Trust
</motion.p>
        {/* Buttons */}

<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.55 }}
  className="mt-10 flex flex-wrap items-center justify-center gap-4"
>
  {/* Primary Button */}

  <Link
    href="/#ventures"
    className="
      group
      inline-flex
      items-center
      gap-3
      rounded-2xl
      px-8
      py-3.5
      font-semibold
      text-white
      shadow-[0_15px_45px_rgba(0,0,0,.30)]
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_20px_55px_rgba(0,0,0,.40)]
    "
    style={{
      background:
        "linear-gradient(135deg,#A9782D 0%,#C89A45 50%,#E3C178 100%)",
    }}
  >
    Explore Ventures

    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>

  {/* Secondary Button */}

  <Link
    href="/#contact"
    className="
      inline-flex
      items-center
      rounded-2xl
      border
      border-white/15
      bg-white/10
      px-8
      py-3.5
      font-semibold
      text-white
      backdrop-blur-xl
      transition-all
      duration-300
      hover:bg-white/15
      hover:border-[#C89A45]/30
    "
  >
    Contact Us
  </Link>
</motion.div>
       {/* Venture Pills */}

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.75 }}
  className="mt-12 flex flex-wrap items-center justify-center gap-2"
>
  <span
    className="
      mr-2
      text-xs
      uppercase
      tracking-[0.25em]
      text-white/45
    "
  >
    Ventures
  </span>

  {ventures.map((v, i) => (
    <motion.a
      key={v.name}
      href={v.href}
      target={!v.soon ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85 + i * 0.06 }}
      className="
        group
        flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/10
        px-4
        py-2
        backdrop-blur-xl
        transition-all
        duration-300
        hover:bg-white/15
        hover:border-[#C89A45]/40
        hover:-translate-y-0.5
      "
    >
      {v.logo ? (
        <img
          src={v.logo}
          alt={v.name}
          className="h-5 w-5 rounded-full object-cover bg-white"
        />
      ) : (
        <span
          className="
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            text-[9px]
            font-bold
            text-white
          "
          style={{
            background:
              "linear-gradient(135deg,#A9782D,#C89A45,#D8B25C)",
          }}
        >
          {v.letter}
        </span>
      )}

      <span
        className="
          text-xs
          font-medium
          text-white
          transition-colors
          duration-300
          group-hover:text-[#F3D68F]
        "
      >
        {v.name}
      </span>

      {v.soon && (
        <span
          className="
            rounded-full
            bg-[#C89A45]/15
            px-2
            py-0.5
            text-[9px]
            font-semibold
            uppercase
            tracking-wider
            text-[#E6C67A]
          "
        >
          Soon
        </span>
      )}
    </motion.a>
  ))}
</motion.div>
        {/* Stats */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}
  className="
    mt-12
    w-full
    max-w-md
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-white/10
    backdrop-blur-2xl
    shadow-[0_25px_70px_rgba(0,0,0,.28)]
  "
>
  <div className="grid grid-cols-3 divide-x divide-white/10">

    {[
      { value: "2+", label: "Ventures" },
      { value: "100+", label: "Clients" },
      { value: "5+", label: "Industries" },
    ].map((item) => (
      <div
        key={item.label}
        className="
          py-6
          text-center
          transition-all
          duration-300
          hover:bg-white/5
        "
      >
        <p
          className="
            text-3xl
            font-black
            tracking-tight
            text-white
          "
        >
          {item.value}
        </p>

        <p
          className="
            mt-2
            text-xs
            uppercase
            tracking-[0.18em]
            text-[#E6C67A]
          "
        >
          {item.label}
        </p>
      </div>
    ))}

  </div>
</motion.div>
      </motion.div>

      {/* Floating decorative elements */}

<motion.div
  animate={{
    y: [0, -18, 0],
    rotate: [0, 3, 0],
  }}
  transition={{
    duration: 9,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute right-[7%] top-[22%] hidden xl:block pointer-events-none"
>
  <div
    className="
      h-24
      w-24
      rounded-[30px]
      border
      border-white/10
      bg-white/10
      backdrop-blur-3xl
      shadow-[0_30px_80px_rgba(0,0,0,.30)]
    "
  />
</motion.div>

<motion.div
  animate={{
    y: [0, 22, 0],
  }}
  transition={{
    duration: 11,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute left-[10%] bottom-[18%] hidden lg:block pointer-events-none"
>
  <div
    className="
      h-16
      w-16
      rounded-full
      border
      border-[#C89A45]/25
      bg-white/10
      backdrop-blur-2xl
      shadow-[0_25px_60px_rgba(0,0,0,.25)]
    "
  />
</motion.div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C74]">Scroll</span>
          <div className="flex h-10 w-6 justify-center rounded-full border border-[#DCCBAE]">
            <motion.div
              animate={{ y: [2, 18, 2] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="mt-2 h-2 w-2 rounded-full bg-[#C5953E]"
            />
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}