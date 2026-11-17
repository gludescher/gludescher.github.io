---
title: Lawful
summary: Software web multi-tenant para gestão de escritórios de advocacia, seus clientes e seus processos, com quadros, tarefas e perfis de permissão por escritório. Uma API em Rails e um frontend em React, em piloto com um escritório real.
kind: Full-stack · SaaS multi-tenant
stack: [Ruby on Rails, PostgreSQL, React, TypeScript, Mantine, TanStack Query, Pundit, Docker, RSpec]
order: 1
imagesNote: Os dados de exemplo das capturas de tela são fictícios.
images:
  - src: /projects/lawful/legal-cases-board.jpg
    alt: O quadro de processos, com uma coluna por status e cartões mostrando o cliente, o tribunal e os responsáveis.
  - src: /projects/lawful/tasks-board.jpg
    alt: O quadro de tarefas, com prazos, selos de atraso e responsáveis em cada cartão.
  - src: /projects/lawful/legal-case-form.jpg
    alt: O formulário de processo, com as partes, a classificação, os responsáveis e a lista de tarefas do processo.
  - src: /projects/lawful/permission-matrix.jpg
    alt: A matriz de permissões de um perfil, com chaves de ver, criar, editar e apagar para cada recurso.
  - src: /projects/lawful/clients-list.jpg
    alt: A lista de clientes, misturando pessoas físicas (PF) e jurídicas (PJ) com seu CPF ou CNPJ.
---

## O problema

Escritórios de advocacia precisam gerenciar equipe, clientes e uma longa lista de processos em andamento, muitas vezes espalhados entre planilhas e conversas. O Lawful é um app web que reúne e otimiza isso em um só lugar, em que cada escritório vê **somente os próprios dados** e decide o que cada pessoa da equipe pode fazer.

## O que já construí

Um produto full-stack em dois repositórios: **`lawful-api`**, um app Rails 8 somente API com PostgreSQL (Devise, Pundit, `discard`, Pagy, validação de CPF/CNPJ), e **`lawful-web`**, um frontend em React + TypeScript + Vite com Mantine, TanStack Query e React Router.

- **Clientes, pessoas físicas e jurídicas.** Os dois tipos compartilham a tabela `clients`, com validação de CPF e CNPJ (inclusive o novo CNPJ alfanumérico) e dados como endereço, CEP e estado civil.
- **Processos, em tabela ou em quadro.** Os processos têm classificação, datas e valores. Uma visão em tabela e uma visão em quadro com drag and drop ajudam os usuários a otimizar o trabalho na gestão dos processos.
- **Tarefas ligadas a processos.** Uma tarefa tem prazo, tipo, data fatal, responsáveis e, opcionalmente, um processo. As tarefas têm as mesmas visões em tabela e em quadro dos processos, e as atrasadas são sinalizadas para deixar claro o que precisa de ação primeiro.
- **Equipe e responsáveis.** Os usuários podem ser atribuídos a processos e tarefas e incluídos em equipes.
- **Perfis e permissões.** Cada escritório define os próprios perfis, com ver, criar, editar e apagar por recurso. A API faz valer as regras e a interface se adapta ao que o usuário logado pode fazer.
- **Isolamento entre escritórios,** coberto por testes dedicados para cada recurso, já que a confidencialidade dos dados é inegociável para escritórios de advocacia.

## Decisões de engenharia

- **Isolamento entre escritórios na camada de dados, provado por testes.** Todo modelo de negócio inclui o concern `LawFirmScoped` (`acts_as_tenant` mais soft delete), e o escritório vem do usuário logado. Os usuários também são isolados: as únicas consultas sem escritório são as três buscas que o Devise faz, sobrescritas em um só lugar.
- **Permissões que um endpoint novo não consegue esquecer.** O Pundit autoriza cada ação contra a policy do seu controller antes de ela rodar, e a lista de recursos é derivada dos arquivos de policy, então um módulo novo adiciona uma policy e mais nada. Uma policy declara o que precisa ser visível antes (`requires :clients`), e perfis que quebram isso são recusados. Quem faz valer as regras é a API; o frontend só as usa para decidir o que mostrar.
- **Soft delete com `.kept` explícito, sem default scope.** A documentação do `discard` alerta que um default scope vaza para associações, `find` e validações de unicidade, então toda consulta que deve ignorar registros apagados diz isso, e os specs cobrem "registro apagado não aparece". Apagar um processo apaga também as suas tarefas.
- **Sessão por cookie em um SPA de mesma origem.** Cookie de sessão do Devise com proteção CSRF: o Rails define um cookie com o token que o React devolve em um header, e o Vite faz proxy de `/api`, então não há CORS para configurar. As fotos de perfil passam por um endpoint autenticado, e não pelas URLs assinadas do Active Storage, para manter o mesmo isolamento por escritório do resto.
- **Quadros otimistas.** Arrastar um cartão o move no cache do TanStack Query na hora e ajusta os totais das colunas; uma falha desfaz a mudança com uma notificação, e as colunas são recarregadas depois. Cada coluna carrega 10 cartões por vez, com o total vindo da API.
- **Desenvolvimento guiado por plano.** Cada funcionalidade começa como um plano passo a passo com checkboxes (`docs/feature/`), cada passo termina com os testes passando, o escopo é explícito (o que fica *fora* está escrito) e as decisões são registradas à medida que são tomadas.
- **Um ambiente piloto real.** Um projeto Docker Compose separado, com banco próprio, roda a `main` a partir de git worktrees, aplica as migrações e reinicia sozinho a cada merge, e é exposto ao escritório piloto pelo Tailscale Funnel, sem atrapalhar os servidores de desenvolvimento em outras branches.

Os testes rodam localmente: RSpec na API e Vitest com Testing Library e MSW no frontend. O CI da API roda Brakeman e RuboCop.
