# InBeas Roadmap & MVP Tracker

Last updated: 2025-09-10

This document tracks delivery across phases. Tick items as they’re completed. Keep scope lean in Phase 1 to launch quickly.

Legend:
- [ ] Not started
- [x] Done

---

## Foundation (pre-MVP) — implemented
- [x] Home hero with professional headline and brand styling
- [x] Audience cards with CTAs (Newcomers/Families, Experts, Students)
- [x] Explore by region cards (Flemish, Brussels-Capital, Walloon)
- [x] Guides page filters (topic + audience)
- [x] Region query param handled on Guides page (`?region=`)
- [ ] Tag sample guides with `regions` so region filter visibly changes results

---

## Next up for Phase 1 (prioritized)
- [x] Seed region tags on a few guides so `?region=` visibly filters results
- [ ] Add "Start your checklist" CTA on Home linking to `checklist.html`
- [ ] Scaffold Onboarding Checklist (page, data file, save progress)
- [ ] Create Housing hub page with rental basics + move‑in checklist
- [ ] Map MVP: Leaflet map with geolocation and 2–3 categories (communes, hospitals, pharmacies)
- [ ] i18n scaffold (EN/FR/NL bundles + language switcher)
- [ ] Content hub scaffolding and publish first 2 articles

---

## Phase 1 – Launch Fast (MVP)
Goal: Core must‑haves for newcomers

### Sections to include
1) Home / Hero Section
- [ ] Tagline + CTA: “Start your life in Belgium with ease”
- [ ] Entry buttons: Onboarding Checklist | Housing | Essential Services
- Deliverables:
  - [ ] Update `index.html` hero copy and add 3 entry buttons

2) Onboarding Checklist (Core)
- [ ] Step‑by‑step interactive guide (commune registration, health, bank, utilities)
- [ ] Regional filters: Brussels | Flanders | Wallonia
- [ ] Save progress locally (localStorage)
- Deliverables:
  - [ ] `checklist.html`, `js/checklist.js`
  - [ ] `data/checklists.json` (tasks + rules by region)

3) Housing Section
- [ ] Rental process explained (rights, deposits, contracts)
- [ ] Links to Immoweb / HousingAnywhere
- [ ] “Move‑in checklist” (utilities, commune notification)
- Deliverables:
  - [ ] `housing.html`
  - [ ] Add curated outbound links; disclaimer re: ToS (no scraping at MVP)

4) Essential Services Map (deferred)
- [ ] Map view: commune offices, hospitals, pharmacies, schools, transport
- [ ] GPS‑based “near me” search
- Deliverables:
  - [ ] Map page and script files (to be added later)
  - [ ] `data/places.json` seeded with initial POIs

5) Content Hub (Knowledge Base)
- [ ] Listing page and simple article template
- [ ] Articles: “How to Register at Your Commune”, “Top 10 Things After Arrival”, “Banking Explained”
- Deliverables:
  - [ ] `articles.html`, `articles/article-template.html`
  - [ ] `articles/commune-registration.html`
  - [ ] `articles/top-10-after-arrival.html`
  - [ ] `articles/banking-explained.html`

6) Multilingual Support
- [ ] EN / FR / NL toggle in the header
- [ ] Language preference persistence and `<html lang>` updates
- Deliverables:
  - [ ] `i18n/en.json`, `i18n/fr.json`, `i18n/nl.json`
  - [ ] `js/i18n.js` and header language switcher wiring

7) Contact / Support
- [ ] Contact form or chatbot for FAQs
- Deliverables:
  - [ ] `contact.html` (form with validation) OR chatbot embed placeholder

8) About Us
- [x] Mission, who the app is for, trust markers (page exists; content can expand)
- Deliverables:
  - [ ] Expand `about.html` with trust markers (privacy, sources, partnerships)

Monetization integration (Phase 1)
- [ ] Affiliate links inside articles (banks, insurers) with disclosure
- [ ] Sponsored listings (housing agencies, schools)

---

## Phase 1 – MVP (0–4 months)
Goal: Launch fast with core must‑have features that solve the biggest pain points for newcomers.

### 1) Onboarding Checklist
- [ ] Checklist UI: step‑by‑step tasks (commune registration, health insurance, bank, utilities)
- [ ] Tailoring by region (Brussels, Flanders, Wallonia)
- [ ] Save progress locally (localStorage)
- [ ] Export/print checklist (PDF/print styles)

Deliverables:
- [ ] `checklist.html`, `js/checklist.js`
- [ ] `data/checklists.json` (profile + region rules)

### 2) Housing Section
- [ ] Housing hub with rental process explained (rights, deposits, contracts)
- [ ] “Move‑in checklist” (utilities, commune notification)
- [ ] Outbound listing links (Immoweb, HousingAnywhere) pre‑filtered by region/city
- [ ] Disclaimer on scraping/ToS; start with links only

Deliverables:
- [ ] `housing.html` content sections
- [ ] Add housing CTA from Home and Guides

### 3) Essential Services Map (deferred)
- [ ] Map page using Leaflet + OpenStreetMap
- [ ] Category toggles: commune offices, hospitals, pharmacies, transport, schools, language schools
- [ ] GPS “near me” search
- [ ] Seed places dataset and markers

Deliverables:
- [ ] Map page and script files (to be added later)
- [ ] `data/places.json`

### 4) Multilingual Support (EN/FR/NL)
- [ ] i18n JSON bundles: `i18n/en.json`, `fr.json`, `nl.json`
- [ ] Language switcher; persist preference; set `<html lang>`
- [ ] Translate high‑traffic pages: Home, Guides, Housing

### 5) Basic Content Hub
- [ ] `articles.html` listing + article template
- [ ] Publish initial articles:
  - [ ] How to Register at Your Commune
  - [ ] Top 10 Things to Do After Arrival
  - [ ] Belgian Banking Explained
  - [ ] Health Insurance (Mutuelles) 101
  - [ ] Renting in Belgium: Rights & Contracts

### Monetization (Phase 1)
- [ ] Add affiliate links (banks, insurers, movers) with disclosures
- [ ] Sponsored listings (manual curation; flag in data)

---

## Phase 2 – Growth (4–8 months)
Goal: Expand usability & retention

New sections to add
1) Community Forum / Q&A
- [ ] Peer‑to‑peer questions + upvote system

2) Jobs & Career Support
- [ ] Integrations with VDAB, Actiris, Forem
- [ ] “How to write a Belgian CV” guide

3) Events & Social Integration
- [ ] Calendar: language exchanges, meetups, workshops
- [ ] RSVP system

4) Premium Services
- [ ] Paywall for templates (commune/rental letters)
- [ ] Relocation coaching via partners

Monetization (Phase 2)
- [ ] Premium subscriptions (€3–5/month)
- [ ] Sponsored partnerships (language schools, recruiters)

---

## Phase 3 – Differentiation & Scale (8–14 months)
Goal: Become the #1 integration platform

Advanced sections to build
1) Personalized Dashboard
- [ ] Custom onboarding checklist by user profile (student, worker, family)
- [ ] Notifications/reminders

2) Government Integrations
- [ ] Direct links to portals (eBox, My Brussels)
- [ ] eID / itsme login

3) Buddy / Mentorship Program
- [ ] Match newcomers with locals or expats

4) AI Assistant
- [ ] Multilingual Q&A chatbot
- [ ] Translation helper

5) Regional Expansion
- [ ] Dedicated landing pages for Brussels, Flanders, Wallonia
- [ ] Local partnerships with communes, NGOs

Monetization (Phase 3)
- [ ] B2B relocation packages for employers
- [ ] Premium ads for real estate & schools
- [ ] Government/NGO sponsorship

---

## Suggested Navigation (Phase 1 MVP)
- [ ] Home
- [ ] Onboarding Checklist
- [ ] Housing
- [ ] Services Map (deferred)
- [ ] Guides (Content Hub)
- [ ] About
- [ ] Contact
- [ ] 🌐 Language Switcher (EN/FR/NL)

Menu wiring:
- [ ] Update all page headers/footers to include new links and language toggle
- [ ] Ensure relative URLs work locally and on static hosting

---

## Phase 2 – Growth (4–8 months)
Goal: Expand usability, increase retention, and build community.

### 1) Community Forum / Q&A
- [ ] Peer Q&A (e.g., “Which commune is fastest for registration?”)
- [ ] Voting (up/down) and accepted answers

### 2) Job & Career Support
- [ ] Integrations: VDAB, Actiris, Forem (API or curated queries)
- [ ] Guides: Belgian CV format, LinkedIn networking
- [ ] Career coaching resources

### 3) Events & Social Integration
- [ ] Events calendar (language exchanges, meetups, cultural events)
- [ ] RSVP and reminders

### 4) Premium Tier Launch
- [ ] Templates (commune letters, rental letters)
- [ ] Relocation coaching (partner offering)
- [ ] Subscription (€3–5/month)

### Monetization (Phase 2)
- [ ] Premium subscriptions
- [ ] Partnerships (language schools, recruiters)

---

## Phase 3 – Differentiation & Scale (8–14 months)
Goal: Become the #1 integration platform in Belgium.

### 1) Advanced Personalization
- [ ] Checklists customized by profile (student, worker, family)
- [ ] Notifications (email/push): reminders and deadlines

### 2) Integration with Government & Services
- [ ] Deep links to portals (My Brussels, eBox)
- [ ] eID / itsme authentication for secure docs

### 3) Expats Buddy Program
- [ ] Matching newcomers with experienced residents
- [ ] Safety & moderation guidelines

### 4) AI Assistant
- [ ] Multilingual chatbot for common integration questions
- [ ] EN↔FR/NL translation support

### 5) Expansion Beyond Brussels
- [ ] Deep coverage of Flanders & Wallonia
- [ ] Partnerships with local communes/NGOs

### Monetization (Phase 3)
- [ ] B2B packages (companies relocating staff)
- [ ] Premium ads (real estate, language schools)
- [ ] Government/NGO partnerships

---

## Running log (tick updates here)
- [x] Added region cards on Home and wired `?region=` handling on Guides (data tagging pending)
- [x] Reworked “Who InBeas is for” into modern cards with thumbnails and CTAs
- [ ] Tag sample guides with `regions` to demonstrate region filter visibly
- [ ] Create `housing.html` and checklist scaffolding

> Editors: update this file as items are delivered; keep commits small and reference items (e.g., “MVP: Housing hub — rental rights section”).
