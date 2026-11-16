import { motion } from "motion/react";
import type { MouseEvent } from "react";

interface Props {
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  href: string;
  index: number;
  cta: string;
}

export default function ProjectCard({ title, kind, summary, stack, href, index, cta }: Props) {
  // Track the cursor so the spotlight gradient follows it.
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7"
    >
      <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <p className="font-mono text-xs tracking-widest text-accent-2 uppercase">{kind}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold">{title}</h3>
        <p className="mt-3 text-muted">{summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {stack.map((s) => (
            <li key={s} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-auto pt-6 text-sm font-medium text-accent transition group-hover:translate-x-1">
          {cta}
        </span>
      </div>
    </motion.a>
  );
}
