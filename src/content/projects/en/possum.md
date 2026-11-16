---
title: Possum
summary: An offline-first point of sale app for restaurants that sell at events. Built with Flutter on a local SQLite database, with receipt printing, per-event numbering and backup to Google Drive.
kind: Mobile · Offline-first POS
stack: [Flutter, Dart, Drift, SQLite, Riverpod, ESC/POS, Google Drive API]
order: 2
repos:
  - { label: Source, url: "https://github.com/gludescher/possum" }
images:
  - { src: "/projects/possum/checkout.png", alt: "Possum checkout screen with an order in progress" }
  - { src: "/projects/possum/item-options.png", alt: "Options dialog for a burger" }
  - { src: "/projects/possum/events.png", alt: "Events screen with the active event's totals" }
  - { src: "/projects/possum/sales.png", alt: "Sales history with filters and totals" }
  - { src: "/projects/possum/catalog.png", alt: "Catalog management" }
  - { src: "/projects/possum/receipt-models.png", alt: "Receipt model settings" }
---

## The problem

Selling at a street fair or festival means taking many small orders fast, on one tablet, often with weak or no internet. Possum covers exactly that counter-sale flow: tap products, tweak them, finalize in one step, print the receipt, and know the totals at the end of the event.

## What I built

A tablet-first Flutter app (Android, landscape) where **local storage is the source of truth**, so no account, login or network is needed to sell.

- **Fast checkout** with per-category option groups (single or multiple choice, with quantities and prices) and a live line total.
- **Events** with sequential sale numbers that restart per event, plus totals, average ticket, expected cash and a per-category breakdown.
- **Receipt printing** to one or more 58 mm ESC/POS network printers, with configurable receipt models. A print failure never blocks a sale.
- **Backup and restore** of the whole database to a file or to Google Drive.

## Interesting engineering decisions

- **Money is integer centavos, always.** No floating point anywhere near a price, and the domain layer is free of UI and storage dependencies.
- **Sales are immutable history.** Sale items snapshot the product name and price, and deletes are soft, so changing the catalog never rewrites the past and sale numbers are never reused.
- **Feature-first architecture** with enforced layering (`domain` imports no Flutter, Riverpod or Drift; `core` imports no feature), documented in `STRUCTURE.md`.
- **Real schema migrations.** Drift schema versions are dumped and never edited, with generated migration tests for every upgrade step.
- **Disciplined scope.** A written plan, a list of ideas deferred past v0, and a rule to ask before inferring requirements. It's a small tool on purpose.
