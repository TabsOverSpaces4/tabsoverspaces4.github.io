# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run deploy     # Build + deploy to GitHub Pages (gh-pages)
```

There are no tests in this project.

## Environment Variables

The "Ask Me Anything" modal requires a Perplexity API key:

```
VITE_PERPLEXITY_API_KEY=your_key_here
```

Without this key, the AI chatbot will show an error on submit but the rest of the site works fine.

## Architecture

This is a React + Vite + Tailwind CSS v4 portfolio site deployed to GitHub Pages at `tabsoverspaces4.github.io`.

### Routing

Two routes defined in `src/App.jsx`:
- `/` — Main portfolio page (`src/pages/Portfolio/Portfolio.jsx`)
- `/projects/assistai` — Product landing page for the AssistAI Chrome extension (`src/pages/AssistAI/AssistAIPage.jsx`)

A `ScrollToTop` component in `App.jsx` resets scroll position on every route change.

### Data layer

All portfolio content (personal info, experience, education, projects, skills) lives in a single file: `src/data/portfolio.js`. This is the only place to edit content — components read from it, nothing is hardcoded in the page components.

`portfolioContext` exported from `src/data/portfolio.js` is the system prompt injected into the Perplexity AI call in `AskMeAnythingModal`. It defines the persona and contains the full resume text.

### Key shared components

- `Reveal` — Framer Motion scroll-triggered fade-in wrapper; wraps most page sections
- `SectionHeading` — Consistent section title styling
- `AskMeAnythingModal` — AI chatbot modal (Cmd/Ctrl+K to open, or clicking the profile image). Calls Perplexity `sonar-pro` model and logs Q&A to Google Sheets via a Google Apps Script webhook
- `ContactForm` — Posts form data to the same Google Apps Script webhook URL
- `ProjectCard` — Wrapper for project entries; handles hover state
- `LatestWorkCard` — Compact card shown in hero area for the most recent project

### AssistAI page

`src/pages/AssistAI/` is self-contained with its own components, hooks, and styles. It has a dark-only theme (`bg-[#07080f]`) independent of the portfolio's light/dark toggle.

### Theming

The portfolio supports light/dark mode toggled by adding/removing the `dark` class on `<html>`. Theme is persisted in `localStorage` and initialized from system preference. Orange (`orange-500`) is the primary accent color throughout.

### Styling

Tailwind CSS v4 is used via the `@tailwindcss/vite` plugin (not PostCSS config). Utility classes are used directly; there are no custom Tailwind config files — `index.css` contains only base styles.

### Deployment

The site is deployed via `gh-pages` to GitHub Pages. The `public/404.html` contains the SPA redirect hack so client-side routes (like `/projects/assistai`) work on direct load.
