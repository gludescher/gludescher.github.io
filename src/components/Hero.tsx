import { motion, useReducedMotion } from "motion/react";

interface Props {
  name: string;
  title: string;
  tagline: string;
  photo: string | null;
  cvHref: string;
  labels: { greeting: string; viewProjects: string; getInTouch: string; portraitAlt: string; downloadCv: string };
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ name, title, tagline, photo, cvHref, labels }: Props) {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.1 + i * 0.12, ease },
  });
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
      {/* Animated gradient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-accent/30 blur-[120px]"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent-2/20 blur-[120px]"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-[1fr_auto]">
        <div className="order-2 md:order-1">
          <motion.p {...item(0)} className="mb-4 font-mono text-sm tracking-widest text-accent-2 uppercase">
            {title}
          </motion.p>
          <motion.h1
            {...item(1)}
            className="font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {labels.greeting} <span className="text-gradient">{name.split(" ")[0]}</span>.
          </motion.h1>
          <motion.p {...item(2)} className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {tagline}
          </motion.p>
          <motion.div {...item(3)} className="mt-10 flex flex-wrap gap-4">
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
              download
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              {labels.downloadCv}
            </a>
          </motion.div>
        </div>

        {/* Portrait with a slowly rotating gradient ring */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative order-1 h-40 w-40 sm:h-52 sm:w-52 md:order-2 md:h-72 md:w-72"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
