---
title: Possum
summary: An offline-first point of sale app for restaurants that sell at events, field-tested at real ones. Built with Flutter for Android, Windows and Linux on a local SQLite database, with receipt printing, per-event numbering, costs and pricing, and backup to Google Drive.
kind: Cross-platform · Offline-first POS
stack: [Flutter, Dart, Drift, SQLite, Riverpod, ESC/POS, Google Drive API, GitHub Actions]
order: 2
images:
  - { src: "/projects/possum/checkout.png", alt: "Possum order screen with an order in progress in the side panel" }
  - { src: "/projects/possum/item-options.png", alt: "Options sheet for a burger, with doneness and extras" }
  - { src: "/projects/possum/sales.png", alt: "Sales list with filters and totals, and a sale open in the side panel" }
  - { src: "/projects/possum/events.png", alt: "Events screen with the active event's numbers" }
  - { src: "/projects/possum/product-form.png", alt: "Product form with its recipe, the suggested price and the resulting cost and margin" }
---

## The problem

Selling at a street fair or festival means taking many small orders fast, on one tablet, often with weak or no internet. Possum covers exactly that counter-sale flow: tap products, tweak them, finalize in one step, print the receipt, and know the totals at the end of the event. It has been field-tested at real events, where it did that job well.

## What I built

A cross-platform Flutter app, built for an Android tablet in landscape and also running on Windows and Linux, where **local storage is the source of truth**, so no account, login or network is needed to sell.

- **Fast checkout** with products by category, per-category option groups (single or multiple choice, with quantities and extra prices) and a live total.
- **Events and sales history.** Sale numbers restart with each event, and each event shows its totals, average ticket, expected cash and a per-category breakdown. The sales list filters by event, period, customer and status (an optional Vendido → Preparado → Entregue flow), with totals that follow the filters.
- **Costs and pricing** (optional). Raw materials and their purchases give each material a unit cost, from the last purchase or a weighted average of the last few. Product recipes add up to a cost, the app suggests a price from a margin, a markup or a fixed increase, and every sale keeps the cost it was sold at.
- **Receipt printing** to one or more 58 mm ESC/POS network printers, each with its own receipt models and copies. A print failure never blocks a sale.
- **Backup and restore** of the whole database to a file or to Google Drive.

## Interesting engineering decisions

- **Money is integer centavos, and percentages are integer hundredths.** No floating point anywhere near a price: a 60% margin is stored as `6000`, and the price, margin and markup math lives in a pure domain layer with unit tests.
- **Sales are immutable history.** Each sale item keeps a snapshot of the product's name, price and cost at the moment of sale, so editing the catalog or a recipe never rewrites past margins. Deletes are soft, and sale numbers are never reused.
- **Real schema migrations, and backups that survive them.** 32 Drift schema versions, each dumped and never edited, with a generated migration test for every upgrade step. A restore copies by column name, so a backup taken before a migration restores into the newer database, and the other way around.
- **Printing that never blocks a sale.** Every printer that is on prints at the same time, over one connection per printer (a USB printer behind a socket bridge accepts only one). A failing printer doesn't stop the others, and the sale is saved either way.
- **A shippable core, with optional features off by default.** A tag and a release branch keep a stable version while new work happens on feature branches. Costs, sale status and pictures each sit behind a setting that starts off, so the core stays simple for those who don't need them. A manual GitHub Actions workflow builds the Windows version.
- **Feature-first architecture and a wide test suite.** Enforced layers (`domain` imports no Flutter, Riverpod or Drift), with the flows in shared actions below the widgets. Close to 2,900 tests, with repository fakes that behave like the real storage (including failed and delayed saves) and widget tests at several screen sizes and text scales.
