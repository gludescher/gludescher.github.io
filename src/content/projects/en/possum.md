---
title: Possum
summary: An offline-first point of sale app for small businesses, focused on restaurants, field-tested at real events and food trucks. Built with Flutter for Android, Windows and Linux on a local SQLite database, with receipt printing, sales data, costs and pricing, and backup to Google Drive.
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

Selling at a street fair or festival means taking many small orders fast, on one tablet, often with weak or no internet. Possum covers exactly that counter-sale flow: select the products, adjust them, finalize the order, print the receipt automatically and know the totals at the end of the event. It has been field-tested at real events, where it did that job well.

## What I've built

A cross-platform Flutter app, built for an Android tablet and also able to run on Windows and Linux, where **local storage is the source of truth**, so no account, login or network is needed to sell.

- **Fast checkout.** Products filtered by category, option groups per category (single or multiple choice, extras and removals) and a live total.
- **Events and sales history.** Each event shows its totals, average ticket, expected cash and a per-category breakdown. The sales list filters by event, period, customer and status (an optional *Sold → Ready → Delivered* flow), with totals that follow the filters.
- **Costs and pricing.** Raw materials and their purchases give each material a unit cost, from the last purchase or a weighted average of the last few. Product recipes add up to a cost, the app suggests a price from a margin, a markup or a fixed increase, and every sale keeps the cost it was sold at.
- **Receipt printing.** Connected ESC/POS network printers, each with its own customizable receipt models and copies, allowing each part of the business to get only the relevant information when speed is essential. A sale is never stopped by a failing printer and any receipt can be re-printed on demand.
- **Data backup.** The whole database can be saved and restored, locally or to Google Drive, with a Google OAuth connection.

## Interesting engineering decisions

- **Money is integer centavos, and percentages are integer hundredths.** No floating point anywhere near a price: a 60% margin is stored as `6000`, and the price, margin and markup math lives in a pure domain layer with unit tests.
- **Sales are immutable history.** Each sale item keeps a snapshot of the product's name, price and cost at the moment of sale, so editing the catalog or a recipe never rewrites past margins.
- **Real schema migrations, and backups that survive them.** Every change to the database structure produces a new Drift schema version, each one dumped and never edited, with a generated migration test for every upgrade step. A restore copies by column name, so a backup taken before a migration restores into the newer database, and the other way around.
- **A shippable core, with optional features off by default.** A tag and a release branch keep a stable version while new work happens on feature branches. Costs, sale status and pictures each sit behind a setting that starts off, so the core stays simple for those who don't need them. A manual GitHub Actions workflow builds the Windows version.
- **Feature-first architecture and a wide test suite.** Enforced layers (`domain` imports no Flutter, Riverpod or Drift), with the flows in shared actions below the widgets. Automated tests cover every flow, with repository fakes that behave like the real storage (including failed and delayed saves) and widget tests at several screen sizes and text scales.
