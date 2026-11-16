---
title: Lawful
summary: Multi-tenant web software to manage law firms, their clients and their legal cases. A Rails API and a React frontend, piloted with a real firm.
kind: Full-stack · Multi-tenant SaaS
stack: [Ruby on Rails, PostgreSQL, React, TypeScript, Mantine, TanStack Query, Docker, RSpec]
order: 1
repos:
  - { label: API (Rails), url: "https://github.com/gludescher/lawful-api" }
  - { label: Web (React), url: "https://github.com/gludescher/lawful-web" }
---

## The problem

Law firms juggle their staff, their clients and a long list of ongoing legal cases, often across spreadsheets and chat. Lawful is a web app that puts that in one place, where every firm sees **only its own data**.

## What I built

A full-stack product, split into two repositories with history preserved:

- **`lawful-api`**: a Rails 8 API-only app on PostgreSQL. Authentication with Devise (session cookie plus CSRF), authorization with Pundit, soft deletes with `discard`, pagination with Pagy, background jobs on Solid Queue, and Brazilian CPF/CNPJ validation for individual and company clients.
- **`lawful-web`**: a React + TypeScript + Vite frontend with Mantine, TanStack Query for data fetching and React Router. Vite proxies `/api` to Rails so the frontend and API share an origin, which the session cookie requires.

## Interesting engineering decisions

- **Multitenancy first.** Tenancy is built on `acts_as_tenant` with a `law_firm_id` on every record, and the plan puts the isolation tests ahead of the features. PostgreSQL row-level security is a deliberate follow-up, not an afterthought.
- **Domain modeling.** Individuals (PF) and companies (PJ) share one `clients` table with a `kind` discriminator. The model is called `LegalCase` rather than `Case` to avoid clashing with Ruby's `case` keyword.
- **Plan-driven development.** Each step in `PLAN.md` ends with passing tests, scope is explicit (what is *out* of v0 is written down), and decisions are recorded as they are made.
- **A real pilot environment.** A separate Docker Compose setup runs `main` from git worktrees with its own database and is exposed to the pilot firm through Tailscale Funnel, without disturbing the development servers.
- **Tested end to end.** RSpec on the API, Vitest with Testing Library and MSW on the web, and CI on the API repository.
