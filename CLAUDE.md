# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio single-page application (`minan-portfolio`) built with React 18, Vite, TypeScript, Tailwind CSS, and Framer Motion. Visual design follows a warm editorial / warm brutalism aesthetic (`#FAF7F2` cream background, `#2D2621` text, peach/coral accents).

## Commands

```bash
npm install            # Install dependencies
npm run dev            # Start local dev server (http://localhost:5173)
npm run build          # Type check and build for production (tsc && vite build)
npm run preview        # Preview production build locally
```

There is no dedicated test runner; `npm run build` serves as the primary static type-checking and build verification step.

## High-Level Architecture

- **Single-Page Flow (`src/App.tsx`)**:
  - `Navbar` (`src/components/layout/Navbar.tsx`): Floating capsule navigation with section scroll triggers (`#home`, `#experience`, `#essays`, `#contact`).
  - `HeroSection` (`src/components/sections/HeroSection.tsx`): Profile info, tags, status indicator, bio, skill categories, and social links.
  - `ExperienceSection` (`src/components/sections/ExperienceSection.tsx`): Career timeline cards and key impact metric cards.
  - `EssaySection` (`src/components/sections/EssaySection.tsx`): Editorial card layout with Markdown reading modal (`EssayModal`).
  - `ContactFooter` (`src/components/sections/ContactFooter.tsx`): Full-page climax footer with contact triggers and channels.

- **Data-Driven Content (`src/data/`)**:
  - `profile.ts`: Core user bio, statistics, skill category lists, and social channels (`ProfileData`).
  - `timeline.ts`: Career and experience history items (`TimelineItem[]`).
  - `essays.ts`: Essay metadata and full Markdown content rendered in the modal (`EssayItem[]`).
  - TypeScript interfaces are defined centrally in `src/types/index.ts`.

- **Styling & Design System**:
  - Theme tokens are configured in `tailwind.config.js` under `colors.warm.*` (`bg`, `card`, `card-subtle`, `text`, `text-muted`, `peach`, `coral`, `matcha`, `border`).
  - Global styles and typography imports (`Plus Jakarta Sans`, `Outfit`) reside in `src/styles/index.css`.
  - Path alias `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`).
