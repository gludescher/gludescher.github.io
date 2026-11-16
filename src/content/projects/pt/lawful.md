---
title: Lawful
summary: Software web multi-tenant para gestão de escritórios de advocacia, seus clientes e seus processos. Uma API em Rails e um frontend em React, em piloto com um escritório real.
kind: Full-stack · SaaS multi-tenant
stack: [Ruby on Rails, PostgreSQL, React, TypeScript, Mantine, TanStack Query, Docker, RSpec]
order: 1
repos:
  - { label: API (Rails), url: "https://github.com/gludescher/lawful-api" }
  - { label: Web (React), url: "https://github.com/gludescher/lawful-web" }
---

## O problema

Escritórios de advocacia precisam dar conta da equipe, dos clientes e de uma longa lista de processos em andamento, muitas vezes espalhados entre planilhas e conversas. O Lawful é um app web que reúne tudo isso em um só lugar, em que cada escritório vê **somente os próprios dados**.

## O que eu construí

Um produto full-stack, dividido em dois repositórios com o histórico preservado:

- **`lawful-api`**: uma app Rails 8 somente API sobre PostgreSQL. Autenticação com Devise (cookie de sessão e CSRF), autorização com Pundit, soft delete com `discard`, paginação com Pagy, jobs em segundo plano com Solid Queue e validação de CPF/CNPJ para clientes pessoa física e jurídica.
- **`lawful-web`**: um frontend em React + TypeScript + Vite com Mantine, TanStack Query para busca de dados e React Router. O Vite faz proxy de `/api` para o Rails, então frontend e API compartilham a mesma origem, o que o cookie de sessão exige.

## Decisões de engenharia

- **Multitenancy em primeiro lugar.** O isolamento entre escritórios usa `acts_as_tenant` com um `law_firm_id` em cada registro, e o plano coloca os testes de isolamento antes das funcionalidades. O row-level security do PostgreSQL é um próximo passo deliberado, não um esquecimento.
- **Modelagem de domínio.** Pessoas físicas (PF) e jurídicas (PJ) compartilham a tabela `clients`, diferenciadas por um campo `kind`. O modelo se chama `LegalCase` e não `Case`, para não conflitar com a palavra reservada `case` do Ruby.
- **Desenvolvimento guiado por plano.** Cada etapa do `PLAN.md` termina com os testes passando, o escopo é explícito (o que fica *fora* da v0 está escrito) e as decisões são registradas à medida que são tomadas.
- **Um ambiente piloto real.** Um setup separado com Docker Compose roda a `main` a partir de git worktrees, com banco próprio, e é exposto ao escritório piloto pelo Tailscale Funnel, sem atrapalhar os servidores de desenvolvimento.
- **Testado de ponta a ponta.** RSpec na API, Vitest com Testing Library e MSW no frontend, e CI no repositório da API.
