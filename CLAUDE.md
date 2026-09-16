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
- Match the Figma frame 100% — content as much as layout: the exact number of repeated instances (cards, chips, rows), the exact copy of every text node, the exact image in every image slot, and every component's variant state (e.g. `BottomNav`'s `chatActive`, a `Badge`'s count text, a `Chips` color). "Layout matches" is not done. If existing mocked data contradicts the frame, change the data (`app/due-terms.ts`), never the screen.
- Before building or fixing any screen, `ls public/images/` (and `docs/reference/`): the assets a screen needs are uploaded there, and a name like `card-image-variation.png` is the second card's illustration. Use the uploaded file; never fall back to a component's default image or a downloaded Figma export when a matching file exists.
- Every route renders inside `Scaffold` (`stories/components/Scaffold`); never hand-roll a screen shell in a page's CSS module. Shell behavior (width, centering, scrolling, sticky bottom nav) is fixed in `Scaffold` and `app/globals.css` only.
- Before reporting any screen done, verify it by measurement in the real app on `localhost:3000` — `node scripts/verify-screen.mjs <route> --figma <png>` — against the Figma render, and confirm frame/bar/nav positions are identical to the route you came from. Not from Storybook, not by eye (`.claude/skills/build-screen`, step 9).
- Storybook is the source of truth for components, not for screens: its preview does not load `app/globals.css` (no `box-sizing` reset), so screen layout is only trusted on `localhost:3000`.

# Never

- Never edit `AGENTS.md`.
- Never invent a design-token value not present in `tokens/tokens.json`.
- Never hardcode a value that has a token.
- Never use a CSS fallback like `var(--token, #333)`.
- Never read a primitive token directly from a component — go through the semantic layer.
- Never use `chips` for non-tappable labels, or `buttonGroup` for 3+ options (`docs/design-system.md`).
- Never use `textBlock` for a field the student types into — it is a read-only title/caption pair. The input is `textField`. (This rule said the exact opposite until 2026-09-15; it was written from the Figma component's description, which contradicts the drawn component. See `docs/design-system.md`'s `textBlock` entry.)
- Never use `actionSheet` for a modal — slot 4 is a persistent footer, slot 5 (`bottomSheet`) interrupts and dims. Both are built.
- Never add auto-endpointing, multi-turn tutoring, real STT, real judging, or real audio/model calls (`docs/design-brief.md`, `docs/sprint-context.md`).
- Never give Knowie a voice/audio output.
- Never trap the student with no way forward (skip/text fallback always available).

# Storybook

When working on UI, use the storybook tools to read the component library
before answering or writing anything. Never assume a component prop exists.
Query the documentation, and use only props that are documented or shown in
a story. If a prop isn't there, stop and ask me.

**Start Storybook before starting Claude Code.** `.mcp.json` declares the
server as `type: "http"` at `http://localhost:6006/mcp`, so it cannot be
auto-started — it has to already be listening when the session begins. If
it isn't, the connection is refused *for the whole session* and the client
never retries, so the `mcp__storybook__*` tools stay unavailable even after
Storybook comes up later. Run `npm run storybook` (port 6006) first, and
leave that terminal open — the server dies with its parent shell.

If you find yourself in a session where the tools are already missing:
don't conclude the capability doesn't exist, and don't fall back to reading
component source — that is exactly what the rule above forbids. Tell me, so
I can restart. The endpoint can be checked with a POST (it's SSE, so a
plain GET will hang and look like a dead server):

```
curl -s --max-time 6 -X POST http://localhost:6006/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"probe","version":"1"}}}'
```

# File map

- `AGENTS.md` — Next.js version-specific agent rules; read before writing any Next.js code, don't touch.
- `docs/design-brief.md` — the client brief: problem, constraints, success metrics, open questions. Read before any design decision.
- `docs/sprint-context.md` — decisions already made and explicitly out of scope. Read before proposing a flow or feature.
- `docs/voice-ux.md` — voice-UX principles and a prioritized states checklist. Read before designing the recording/processing/result loop.
- `docs/design-system.md` — component selection rules and naming conventions. Read before adding or using any UI component.
- `tokens/tokens.json` — every color, size, type, and spacing value. Read whenever you need an actual value.
- `docs/reference/*.png` — beta-app screenshots. Read when you need to see what already shipped, not as the target.
- `component-gaps.md` — running list of things built inline during a screen build because they weren't in Storybook, and which have since been promoted to real components. Read before building a new screen.
- `SPEC.md` — the screen list, per-screen states/components/actions, mocked-recall behavior, and open questions. Read first for any screen work; its "built/not built" labels can drift — confirm in Figma.
- `stories/components/*` — the component library, one folder per component with its story. Storybook (`npm run storybook`, port 6006) is the source of truth for props. `Scaffold` is the screen shell; `TopNav` is the home-level bar; `AppBar` is the flow-screen bar (back / progress / ⋯) used by every Voice Review Screen; `ActionSheet` is the result screens' bottom footer — never rebuild any of them inline.
- `scripts/verify-screen.mjs` — measures a route at 390/1280px (frame, bars, glyph edges, text, cards, bottom nav) and pixel-scans a Figma PNG for the same edges. Run before calling any screen done.
- `app/layout.tsx` — root layout, fonts, HTML shell. Read before changing global structure or fonts.
- `app/globals.css` — font/token imports, the `box-sizing` reset, and the root overflow rules that keep every route's frame in the same place. Read before adding global styles; don't move `overflow` onto `body` (it breaks the sticky bottom nav).
- `app/page.tsx` + `app/page.module.css` — the Home screen (SPEC.md #1, Figma `home-screen-knowie`), built 1:1 inside `Scaffold`.
- `app/due-list/` — the Due list screen (SPEC.md #2, Figma "Direction C1 – Due list, delinearized").
- `app/recap/[topicId]/` — the Entry/recap screen (SPEC.md #3). Its `BackButton` and screen-local `icons.tsx` were absorbed into `AppBar` and deleted; the back arrow and ⋯ now come from that component.
- `app/recap/[topicId]/prompt/[termIndex]/` — the prompt screen in its three states (SPEC.md #4/#5/#5b), one route, the mic tap moving between them.
- `app/recap/[topicId]/processing/[termIndex]/` — the Processing screen (SPEC.md #6, Figma 15783:7209). A fixed ~1.8s delay, then this term's result.
- `app/recap/[topicId]/result/[termIndex]/` — the result screen in all three outcomes (SPEC.md #7/#8/#11): pass (Figma 15783:7408), incorrect (15783:7640) and partial (no frame, mirrors incorrect). One route; the term's scripted `outcome` picks which. Its Retry/Continue `ActionSheet` goes in `Scaffold`'s bottom-nav slot via `bottomNavFlush`.
- `app/recap/[topicId]/hint/[termIndex]/` — the Hint nudge (SPEC.md #9, Figma 15868:631), reached from Hint on a miss or partial. Closes the miss loop: re-record from here, or "Repeat question" back to the prompt. No second hint, no Reveal.
- `app/due-terms.ts` — the mocked due-term data shared by Home, Due list, and the whole voice flow: each term's `prompt`, its scripted `outcome` (term 1 passes, 2 misses, 3 is partial), Knowie's reply for each outcome (`answer` / `miss` / `partial`), its `hint` copy, and `progressForTerm`, which is the single source of the 25/75/100 progress rule — progress belongs to the term, so every screen for a term reads the same value and only changing term moves the bar. The only place that data lives, and it mirrors the Figma frames' content (two "Renaissance Philosophy" cards, three terms, "5+" due) — when a frame and this file disagree, this file changes.
- `public/images/` — every image asset the screens use, uploaded by the user: card illustrations (`card-image.png` first card, `card-image-variation.png` second), mascot states, the avatar, the PRO mark. Check here before assuming any image.
- `build/css/tokens.css` — generated from `tokens/tokens.json` by Style Dictionary. Never edit it by hand — edit `tokens/tokens.json` and run `npm run tokens`.
- `public/images/*.png` — Knowie mascot art actually served by the app. Use these for any `Mascot`/`mascotSlot` instance.
- `public/next.svg`, `public/vercel.svg` — create-next-app leftovers, referenced by nothing.
- `.claude/skills/ui-designer/` — visual styling craft. Loads on styling/layout/design-token work.
- `.claude/skills/ux-designer/` — UX flow and psychology. Loads on flow/IA/usability work.
- `.claude/skills/ux-motion/` — animation/transition implementation. Loads on motion/micro-interaction work.
- `.claude/skills/prototyping-v5/` — interactive React-artifact prototype craft (swipe, sheets, gestures). Loads when building an interactive prototype.
- `.claude/launch.json` — VS Code launch config for `npm run dev` on port 3000.
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` — standard Next.js/TS/ESLint config, no project-specific overrides.
- `package.json` — Next 16.3.5 / React 19.2.8, scripts: `dev`, `build`, `start`, `lint`.
- `README.md` — default create-next-app instructions, not project-specific.
