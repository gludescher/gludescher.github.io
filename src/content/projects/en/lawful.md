---
title: Lawful
summary: Multi-tenant web software to manage law firms, their clients and their legal cases, with boards, tasks and per-firm permission profiles. A Rails API and a React frontend, piloted with a real firm.
kind: Full-stack · Multi-tenant SaaS
stack: [Ruby on Rails, PostgreSQL, React, TypeScript, Mantine, TanStack Query, Pundit, Docker, RSpec]
order: 1
images:
  - src: /projects/lawful/legal-cases-board.jpg
    alt: The legal cases board, with one column per status and cards showing the client, the court and the assigned users.
  - src: /projects/lawful/tasks-board.jpg
    alt: The tasks board, with due dates, overdue badges and assigned users on each card.
  - src: /projects/lawful/legal-case-form.jpg
    alt: The legal case form, with the parties, the classification, the assigned users and the case's task list.
  - src: /projects/lawful/permission-matrix.jpg
    alt: The permission matrix of a profile, with see, create, edit and delete switches for each resource.
  - src: /projects/lawful/clients-list.jpg
    alt: The clients list, mixing individuals (PF) and companies (PJ) with their CPF or CNPJ.
---

## The problem

Law firms juggle their staff, their clients and a long list of ongoing legal cases, often across spreadsheets and chat. Lawful is a web app that puts that in one place, where every firm sees **only its own data** and decides what each person on its team may do.

## What I've built

A full-stack product in two repositories: **`lawful-api`**, a Rails 8 API-only app on PostgreSQL (Devise, Pundit, `discard`, Pagy, CPF/CNPJ validation), and **`lawful-web`**, a React + TypeScript + Vite frontend with Mantine, TanStack Query and React Router. The sample data in the screenshots is fictional.

- **Clients, individuals and companies.** Both kinds share one `clients` table, with CPF and CNPJ validation (including the new alphanumeric CNPJ) and details such as address, ZIP code and marital status.
- **Legal cases, as a table or a board.** Cases carry classification, dates and amounts. A list view and a drag-and-drop board view allow users to optimize their work when managing cases.
- **Tasks tied to cases.** A task has a due date, a type, a fatal date, assigned users and optionally a legal case. Tasks have the same list and board views as cases, and overdue ones are flagged so it's clear what needs action first.
- **Team and assignments.** Users can be assigned to cases and tasks and can be included in teams.
- **Profiles and permissions.** Each firm defines its own profiles, with see, create, edit and delete per resource. The API enforces them and the interface adapts to what the signed-in user can do.
- **Isolation between firms,** covered by dedicated tests for every resource, since data confidentiality is non-negotiable for law firms.

## Interesting engineering decisions

- **Tenant isolation in the data layer, proven by tests.** Every business model includes a `LawFirmScoped` concern (`acts_as_tenant` plus soft delete), and the tenant comes from the signed-in user. Users are scoped too: the only queries that run without a tenant are the three lookups Devise makes, overridden in one place, and email stays unique across firms because sign-in has nothing else to go on. Shared isolation examples run against six resources. PostgreSQL row-level security is a deliberate later step, not built yet.
- **Permissions a new endpoint can't forget.** Pundit authorizes every action against the policy of its controller before it runs, and the list of resources is derived from the policy files, so a new module adds one policy and nothing else. A policy declares what must be visible first (`requires :clients`), and profiles that break that are refused. The API is the one that enforces the rules; the frontend only uses them to decide what to show.
- **Soft delete with an explicit `.kept`, not a default scope.** The `discard` docs warn that a default scope leaks into associations, `find` and uniqueness validations, so every query that should ignore deleted records says so and the specs cover "deleted record does not appear". Soft-deleting a case soft-deletes its tasks.
- **Cookie sessions for a same-origin SPA.** Devise's session cookie with CSRF protection: Rails sets a token cookie that React sends back as a header, and Vite proxies `/api`, so there is no CORS to configure. Profile photos are served through an authenticated endpoint instead of Active Storage's signed URLs, so they keep the same tenant scoping as everything else, and the first-access endpoint only accepts users still on a temporary password (valid for 7 days).
- **Optimistic boards.** Dragging a card moves it in the TanStack Query cache at once and adjusts the column totals; a failure rolls it back with a notification, and the columns are refetched afterwards. Each column loads 10 cards at a time with its total from the API.
- **Plan-driven development.** Each feature starts as a step-by-step plan with checkboxes (`docs/feature/`), each step ends with passing tests, scope is explicit (what is *out* is written down) and decisions are recorded as they are made.
- **A real pilot environment.** A separate Docker Compose project with its own database runs `main` from git worktrees, migrates and restarts itself after every merge, and is exposed to the pilot firm through Tailscale Funnel, without disturbing the development servers on other branches.

Tests run locally: RSpec on the API and Vitest with Testing Library and MSW on the web. The API's CI runs Brakeman and RuboCop.
