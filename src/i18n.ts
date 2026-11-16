// Locale helpers. English lives at the root ("/"), Portuguese under "/pt/".
export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const htmlLang: Record<Locale, string> = { en: "en", pt: "pt-BR" };
export const ogLocale: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };

export function getLocale(url: URL): Locale {
  return /^\/pt(\/|$)/.test(url.pathname) ? "pt" : "en";
}

/** Prefixes a root-relative path with the locale, e.g. ("pt", "/projects/x/") -> "/pt/projects/x/". */
export function localePath(locale: Locale, path = "/"): string {
  return locale === "en" ? path : `/pt${path}`;
}

/** The same page in the other locale. */
export function alternatePath(url: URL): { locale: Locale; href: string } {
  const path = url.pathname;
  if (getLocale(url) === "pt") {
    return { locale: "en", href: path.replace(/^\/pt/, "") || "/" };
  }
  return { locale: "pt", href: `/pt${path}` };
}

// Interface strings. Profile content (bio, experience, ...) lives in data/site.ts.
export const ui = {
  en: {
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.theme": "Toggle theme",
    "nav.language": "Ver em português",
    "hero.greeting": "Hi, I'm",
    "hero.viewProjects": "View projects",
    "hero.getInTouch": "Get in touch",
    "hero.portraitAlt": "Portrait of",
    "projects.title": "Selected work",
    "projects.subtitle": "Two projects I designed and built end to end.",
    "projects.readMore": "Read case study →",
    "projects.back": "← All projects",
    "projects.live": "Live",
    "experience.title": "Experience",
    "about.title": "About",
    "about.languages": "Languages",
    "contact.title": "Let's talk",
    "contact.text": "I'm open to backend and full-stack roles. Based in",
    "contact.cta": "Say hello",
  },
  pt: {
    "nav.projects": "Projetos",
    "nav.experience": "Experiência",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "nav.theme": "Alternar tema",
    "nav.language": "View in English",
    "hero.greeting": "Olá, eu sou o",
    "hero.viewProjects": "Ver projetos",
    "hero.getInTouch": "Entre em contato",
    "hero.portraitAlt": "Foto de",
    "projects.title": "Projetos em destaque",
    "projects.subtitle": "Dois projetos que idealizei e construí de ponta a ponta.",
    "projects.readMore": "Ler estudo de caso →",
    "projects.back": "← Todos os projetos",
    "projects.live": "Ao vivo",
    "experience.title": "Experiência",
    "about.title": "Sobre",
    "about.languages": "Idiomas",
    "contact.title": "Vamos conversar",
    "contact.text": "Estou aberto a vagas de backend e full-stack. Moro em",
    "contact.cta": "Diga olá",
  },
} satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)["en"];

export function useTranslations(locale: Locale) {
  return (key: UIKey) => ui[locale][key];
}
