@AGENTS.md

# Hard rules

- Read `docs/design-brief.md` and `docs/voice-ux.md` before designing any flow or screen.
- Read `docs/design-system.md` before touching any component — it says which component to use and how to name things.
- Look up every color/size/type value in `tokens/tokens.json` by path.
- Match `docs/reference/*.png` against `docs/design-brief.md` — the brief overrides the beta shown in the screenshots.
- Follow the Next.js rules injected below this file's own header (`AGENTS.md`) before writing any code.
- One Primary button per screen, one Destructive max, never both (`docs/design-system.md`).
- Mic permission fires on tap-to-record, never on screen entry (`docs/voice-ux.md`).
- Knowie replies in text only; the student is the only voice (`docs/design-brief.md`).
- Mobile iOS only, 390px wide, dark mode only (`docs/design-brief.md`).
- Build from the components `docs/design-system.md` already defines; stop and flag before adding a new one.
- Sentence case on every label, button, and heading — capitals only for proper nouns (`docs/design-system.md`).
- Build the committed concept in `docs/sprint-context.md` ("Committed concept:" line).

# Never

- Never edit `AGENTS.md`.
- Never invent a design-token value not present in `tokens/tokens.json`.
- Never hardcode a value that has a token.
- Never use a CSS fallback like `var(--token, #333)`.
- Never read a primitive token directly from a component — go through the semantic layer.
- Never use `chips` for non-tappable labels, `textBlock` for read-only text, or `buttonGroup` for 3+ options (`docs/design-system.md`).
- Never add auto-endpointing, multi-turn tutoring, real STT, real judging, or real audio/model calls (`docs/design-brief.md`, `docs/sprint-context.md`).
- Never give Knowie a voice/audio output.
- Never trap the student with no way forward (skip/text fallback always available).

# File map

- `AGENTS.md` — Next.js version-specific agent rules; read before writing any Next.js code, don't touch.
- `docs/design-brief.md` — the client brief: problem, constraints, success metrics, open questions. Read before any design decision.
- `docs/sprint-context.md` — decisions already made and explicitly out of scope. Read before proposing a flow or feature.
- `docs/voice-ux.md` — voice-UX principles and a prioritized states checklist. Read before designing the recording/processing/result loop.
- `docs/design-system.md` — component selection rules and naming conventions. Read before adding or using any UI component.
- `tokens/tokens.json` — every color, size, type, and spacing value. Read whenever you need an actual value.
- `docs/reference/*.png` — beta-app screenshots. Read when you need to see what already shipped, not as the target.
- `app/layout.tsx` — root layout, fonts, HTML shell. Read before changing global structure or fonts.
- `app/page.tsx` — current page (still Next.js boilerplate, not the feature). Read/replace when building the first real screen.
- `app/globals.css` — global resets and CSS vars; imports `build/css/tokens.css`. Read before adding global styles.
- `build/css/tokens.css` — generated from `tokens/tokens.json` by Style Dictionary. Never edit it by hand — edit `tokens/tokens.json` and run `npm run tokens`.
- `app/page.module.css` — styles scoped to `page.tsx`. Read/replace alongside `page.tsx`.
- `public/images/*.png` — Knowie mascot art actually served by the app. Use these for any `Mascot`/`mascotSlot` instance.
- `public/next.svg`, `public/vercel.svg` — used by the current boilerplate `page.tsx`; remove only when replacing that page.
- `.claude/skills/ui-designer/` — visual styling craft. Loads on styling/layout/design-token work.
- `.claude/skills/ux-designer/` — UX flow and psychology. Loads on flow/IA/usability work.
- `.claude/skills/ux-motion/` — animation/transition implementation. Loads on motion/micro-interaction work.
- `.claude/skills/prototyping-v5/` — interactive React-artifact prototype craft (swipe, sheets, gestures). Loads when building an interactive prototype.
- `.claude/launch.json` — VS Code launch config for `npm run dev` on port 3000.
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` — standard Next.js/TS/ESLint config, no project-specific overrides.
- `package.json` — Next 16.3.5 / React 19.2.8, scripts: `dev`, `build`, `start`, `lint`.
- `README.md` — default create-next-app instructions, not project-specific.
