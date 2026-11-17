import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

interface Props {
  name: string;
  title: string;
  tagline: string;
  photo: string | null;
  cvHref: string;
  labels: { greeting: string; viewProjects: string; getInTouch: string; portraitAlt: string; downloadCv: string };
}

export default function Hero({ name, title, tagline, photo, cvHref, labels }: Props) {
  const reduce = useReducedMotion();
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <section className="relative flex min-h-screen items-center overflow-x-clip px-6 pt-20">
      {/* Animated gradient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 -z-10 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[120px]"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent-2/15 blur-[120px]"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-[1fr_auto]">
        <div className="order-2 md:order-1">
          <p style={{ "--i": 0 } as CSSProperties} className="hero-in mb-4 font-mono text-sm tracking-widest text-accent-2 uppercase">
            {title}
          </p>
          <h1
            style={{ "--i": 1 } as CSSProperties}
            className="hero-in font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {labels.greeting} <span className="text-accent">{name.split(" ")[0]}</span>.
          </h1>
          <p style={{ "--i": 2 } as CSSProperties} className="hero-in mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {tagline}
          </p>
          <div style={{ "--i": 3 } as CSSProperties} className="hero-in mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition hover:scale-105"
            >
              {labels.viewProjects}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              {labels.getInTouch}
            </a>
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              {labels.downloadCv}
            </a>
          </div>
        </div>

        {/* Portrait with a slowly rotating gradient ring */}
        <div className="hero-portrait relative order-1 h-40 w-40 sm:h-52 sm:w-52 md:order-2 md:h-72 md:w-72">
          <motion.div
            aria-hidden
            className="absolute -inset-1 rounded-full"
            style={{ background: "conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))" }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-bg bg-surface">
            {photo ? (
              <img src={photo} alt={`${labels.portraitAlt} ${name}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-muted md:text-7xl">
                {initials}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
