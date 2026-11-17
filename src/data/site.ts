import type { Locale } from "../i18n";

// Details shared by every language.
export const site = {
  name: "Guilherme Ludescher",
  // Photo lives in /public. Set to null to show an initials placeholder instead.
  photo: "/me.jpg" as string | null,
  cv: { en: "/cv/Guilherme-Ludescher-CV-EN.pdf", pt: "/cv/Guilherme-Ludescher-CV-PT.pdf" } as Record<Locale, string>,
  // Update once the repo/domain is decided (also in astro.config.mjs).
  url: "https://gludescher.github.io",
  links: {
    github: "https://github.com/gludescher",
    linkedin: "https://www.linkedin.com/in/guilherme-ludescher",
    email: "mailto:guiludescher@gmail.com",
  },
};

interface Job {
  period: string;
  company: string;
  role: string;
  stack: string[];
  points: string[];
}

interface Profile {
  title: string;
  tagline: string;
  description: string;
  location: string;
  about: string[];
  skills: { group: string; items: string[] }[];
  languages: { name: string; level: string }[];
  experience: Job[];
}

// Per-language profile content. Keep both versions in sync when editing.
export const profile: Record<Locale, Profile> = {
  en: {
    title: "Backend Software Engineer",
    tagline:
      "Backend-focused engineer with a full-stack streak. 6+ years shipping production systems in Clojure and Ruby on Rails, most recently building business banking at Nubank. Now building Lawful and Possum, two personal projects with real commercial use, and open to new opportunities.",
    description:
      "Portfolio of Guilherme Ludescher, backend software engineer (Clojure, Ruby on Rails, React, PostgreSQL) based in São Paulo, Brazil.",
    location: "São Paulo, Brazil, and open to relocation",
    about: [
      "I'm a software engineer who enjoys working in a team and understanding the business before writing code. My focus is backend, but I've spent most of my career full-stack, owning features from the database to the interface.",
      "Most recently I was at Nubank on the business accounts team, working on microservices in Clojure with Datomic and Kafka, plus mobile and web. Before that I led technical planning and product decisions at a dental clinic software company, and started my career in HR tech.",
      "I studied Computer Engineering at Escola Politécnica da USP and completed a graduate course in Tech Leadership and Management.",
    ],
    skills: [
      { group: "Backend", items: ["Clojure", "Ruby on Rails", "Python", "C#", "GraphQL", "Kafka", "Datomic"] },
      { group: "Data", items: ["PostgreSQL", "SQL Server", "MySQL", "Pandas", "NiFi"] },
      { group: "Frontend & mobile", items: ["React", "Vue.js", "Angular", "TypeScript", "Flutter"] },
      { group: "Infra & practice", items: ["Docker", "AWS", "Automated testing", "Code review", "Observability"] },
    ],
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Fluent" },
      { name: "Spanish", level: "Advanced" },
      { name: "German", level: "Intermediate" },
    ],
    experience: [
      {
        period: "Sep 2026 – Present",
        company: "Independent",
        role: "Software Engineer, own projects",
        stack: ["Ruby on Rails", "React", "Flutter", "PostgreSQL"],
        points: [
          "Designing and building Lawful (multi-tenant SaaS for law firms) and Possum (point of sale app) end to end. See the case studies above.",
        ],
      },
      {
        period: "2025 – Sep 2026",
        company: "Nubank",
        role: "Software Engineer",
        stack: ["Clojure", "Flutter", "Datomic", "Kafka"],
        points: [
          "Built locked deposits for business accounts: product that reached thousands of customers and raised over R$100 million in funding.",
          "Business accounts team at an international digital bank, on a microservice infrastructure.",
          "Backend, mobile and web development with an AI-first approach to building product.",
          "Full ownership of the software lifecycle: development, testing and observability.",
        ],
      },
      {
        period: "2023 – 2025",
        company: "Capim",
        role: "Full/Senior Software Engineer",
        stack: ["Ruby on Rails", "Vue.js", "Docker", "PostgreSQL"],
        points: [
          "Led the migration of the subscription provider from Stripe to Pagar.me, cutting subscription costs by 30% and growing the target market by about 20% by accepting new card brands and PIX.",
          "Dental clinic management software; 400% increase in client base while improving UX and tackling technical challenges.",
          "Led technical planning and product decisions, and worked with external backend and frontend APIs.",
          "Led a forum for codebase standard-setting and global improvements.",
        ],
      },
      {
        period: "2020 – 2023",
        company: "Qulture.Rocks",
        role: "Junior/Full Software Engineer",
        stack: ["Ruby on Rails", "React", "GraphQL", "PostgreSQL"],
        points: [
          "HR, company culture and performance management software, full-stack with a backend focus.",
          "Active in product decisions and customer interaction, in an agile team with strong code review and automated testing culture.",
        ],
      },
      {
        period: "2020",
        company: "BTG Pactual",
        role: "Intern, Data Science & Engineering",
        stack: ["Python", "Pandas", "AWS", "NiFi"],
        points: ["Sentiment analysis ML applied to asset trading, and big data ingestion and pre-processing."],
      },
      {
        period: "2019",
        company: "Control iD",
        role: "Intern",
        stack: ["C#", ".NET", "Angular", "MySQL", "SQL Server"],
        points: ["Security and access control software: project leadership, direct client contact and technical support, plus backlog and product management."],
      },
    ],
  },

  pt: {
    title: "Engenheiro de Software Backend",
    tagline:
      "Engenheiro com foco em backend e veia full-stack. Mais de 6 anos entregando sistemas em produção em Clojure e Ruby on Rails, mais recentemente na conta PJ do Nubank. Agora construo o Lawful e o Possum, dois projetos pessoais com uso comercial real, e estou aberto a novas oportunidades.",
    description:
      "Portfólio de Guilherme Ludescher, engenheiro de software backend (Clojure, Ruby on Rails, React, PostgreSQL) em São Paulo.",
    location: "São Paulo, disposto a relocação pela oportunidade certa",
    about: [
      "Sou engenheiro de software, gosto de trabalhar em equipe e de entender o negócio antes de escrever código. Meu foco é backend, mas passei a maior parte da carreira como full-stack, sendo dono de funcionalidades do banco de dados à interface.",
      "Até recentemente estive no Nubank, no time de contas PJ, trabalhando com microsserviços em Clojure, Datomic e Kafka, além de mobile e web. Antes disso, liderei planejamentos técnicos e decisões de produto em uma empresa de software para clínicas odontológicas, e comecei a carreira em HR tech.",
      "Sou formado em Engenharia de Computação na Escola Politécnica da USP e fiz uma pós-graduação em Liderança e Gestão em Tecnologia.",
    ],
    skills: [
      { group: "Backend", items: ["Clojure", "Ruby on Rails", "Python", "C#", "GraphQL", "Kafka", "Datomic"] },
      { group: "Dados", items: ["PostgreSQL", "SQL Server", "MySQL", "Pandas", "NiFi"] },
      { group: "Frontend e mobile", items: ["React", "Vue.js", "Angular", "TypeScript", "Flutter"] },
      { group: "Infra e práticas", items: ["Docker", "AWS", "Testes automatizados", "Code review", "Observabilidade"] },
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Fluente" },
      { name: "Espanhol", level: "Avançado" },
      { name: "Alemão", level: "Intermediário" },
    ],
    experience: [
      {
        period: "Set 2026 – Atual",
        company: "Independente",
        role: "Engenheiro de Software, projetos próprios",
        stack: ["Ruby on Rails", "React", "Flutter", "PostgreSQL"],
        points: [
          "Projetando e construindo o Lawful (SaaS multi-tenant para escritórios de advocacia) e o Possum (app de ponto de venda) de ponta a ponta. Veja os estudos de caso acima.",
        ],
      },
      {
        period: "2025 – Set 2026",
        company: "Nubank",
        role: "Engenheiro de Software",
        stack: ["Clojure", "Flutter", "Datomic", "Kafka"],
        points: [
          "Construí as caixinhas de longo prazo para contas PJ: produto que alcançou milhares de clientes e captou mais de R$ 100 milhões em funding.",
          "Time de contas PJ de um banco digital internacional, em uma infraestrutura de microsserviços.",
          "Desenvolvimento backend, mobile e web, com uma abordagem AI-first para construir produto.",
          "Responsabilidade total pelo ciclo de vida do software: desenvolvimento, testes e observabilidade.",
        ],
      },
      {
        period: "2023 – 2025",
        company: "Capim",
        role: "Engenheiro de Software Pleno/Sênior",
        stack: ["Ruby on Rails", "Vue.js", "Docker", "PostgreSQL"],
        points: [
          "Liderei a migração do provedor de assinaturas do Stripe para o Pagar.me, reduzindo os custos de assinatura em 30% e ampliando o mercado-alvo em cerca de 20% ao aceitar novas bandeiras de cartão e PIX.",
          "Software de gestão para clínicas odontológicas; aumento de 400% da base de clientes, com melhorias de UX e desafios técnicos.",
          "Liderei planejamentos técnicos e decisões de produto, e trabalhei com APIs externas de backend e frontend.",
          "Liderei um fórum para definir padrões de código e melhorias globais na base.",
        ],
      },
      {
        period: "2020 – 2023",
        company: "Qulture.Rocks",
        role: "Engenheiro de Software Júnior/Pleno",
        stack: ["Ruby on Rails", "React", "GraphQL", "PostgreSQL"],
        points: [
          "Software de RH, cultura organizacional e gestão de desempenho, full-stack com foco em backend.",
          "Participação ativa em decisões de produto e contato com clientes, em um time ágil com forte cultura de code review e testes automatizados.",
        ],
      },
      {
        period: "2020",
        company: "BTG Pactual",
        role: "Estagiário, Ciência e Engenharia de Dados",
        stack: ["Python", "Pandas", "AWS", "NiFi"],
        points: ["Machine learning de análise de sentimento aplicado a trading de ativos, e ingestão e pré-processamento de big data."],
      },
      {
        period: "2019",
        company: "Control iD",
        role: "Estagiário",
        stack: ["C#", ".NET", "Angular", "MySQL", "SQL Server"],
        points: ["Software de segurança e controle de acesso: liderança de projetos, contato direto com clientes e suporte técnico, além de gestão de backlog e de produto."],
      },
    ],
  },
};
