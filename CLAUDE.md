# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 4.x personal blog website (visual style inspired by Nudge Folio). Content is organized into three collections: `blog`, `notes`, and `quotes`. Deployed to Cloudflare Pages (`blog1`).

The project codebase is located in the `blog/` subdirectory.

## Commands

All commands should be run inside the `blog/` directory:

```bash
cd blog
npm install            # Install dependencies
npm run dev            # Start local dev server (default: http://localhost:4321)
npm run build          # Build for production (includes astro check)
npm run preview        # Preview production build locally
npx astro check        # Run type checking and template diagnostics
```

There is no dedicated unit test or lint suite; `astro check` serves as the static verification step.

## High-Level Architecture

- **Content Collections**: All posts reside in `blog/src/content/{blog,notes,quotes}/`. Schemas are defined in `blog/src/content/config.ts`. All three collections share identical frontmatter schemas (`title`, `description` optional, `date`, `tags` optional, `draft` optional).
- **Page Structure & Symmetry**:
  - Listing: `blog/src/pages/{blog,notes,quotes}/index.astro` (all filter out `draft: true` and sort descending by date; `quotes` omits `TagFilter`).
  - Details: `blog/src/pages/{blog,notes,quotes}/[...slug].astro`.
  - Tags: `blog/src/pages/{blog,notes,quotes}/tags/[tag].astro`.
- **Styling & Theming**:
  - Dark mode is controlled via `<html data-theme="dark">`.
  - Color tokens are defined as CSS variables in `blog/src/styles/global.css`. Avoid hardcoding standard Tailwind colors; use semantic CSS variable utilities (e.g. `var(--color-bg)`).
- **Path Aliases**: `@/` maps to `blog/src/`. Use `@/components/...` instead of relative paths.
- **Visuals & Components**:
  - 3D gallery on the landing page: `blog/src/components/CircularGallery.tsx` (React + `ogl`).
  - Interactive background: Unicorn Studio script embedded via `id="unicorn-bg"`.
  - Scroll reveal: `[data-scroll-reveal]` with `IntersectionObserver` configured in `blog/src/layouts/Layout.astro`.

## Deployment

Pushes to `main` trigger GitHub Actions (`.github/workflows/deploy.yml`): Node 22 -> `npm ci` -> `npm run build` -> deploy `dist/` to Cloudflare Pages project `blog1`. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.
