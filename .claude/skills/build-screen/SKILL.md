---
name: build-screen
description: Applies when building or editing any screen in this prototype (the voice-based active-recall flow for Knowunity). Triggers on requests to build, implement, add, or revise a screen, route, or flow step under app/. Covers new screens and edits to existing ones alike.
---

# Building a screen in this prototype

This project is a mocked, presentation-only voice-recall clickthrough — mobile
iOS, 390px, dark mode only. Follow this method for every screen, in order.
Don't skip steps because a screen "looks simple."

## 1. Read SPEC.md for this screen

Find the screen's entry in `SPEC.md`. Note its **States**, its listed
**Components** (with exact variant/prop values already specified there), what
the student **can do**, and any **flag** called out for that screen. If the
screen isn't in `SPEC.md` at all, stop and say so before inventing one — don't
guess a screen into existence.

## 2. Check whether this screen has a Figma frame

Some screens in `SPEC.md` are marked "built" with a real node ID in the
"Yummy Knowie Design System" file (📍 Flow page); others are marked "not
built." Use the Figma Desktop MCP tools to confirm the frame exists and to
read it — don't trust the SPEC.md status label blindly, it can drift.

When it exists, also export the frame as a PNG right away — `get_screenshot`
on the node with `contentsOnly: true`, then `curl` the URL to a file. You
will measure against that render in step 9. Measure positions from the
render, not from the node tree's numbers: the "Top Nav Default" group in
these frames carries a uniform ~0.907 scale-tool artifact (43.53px buttons,
10.88px padding), which are not design values. Figma frames also start with
a 48px status bar the app doesn't render — subtract it when comparing y.

Then write down, from the frame, a **content checklist** you will tick off
explicitly in your reply at the end — matching the layout is only half of
"matches Figma":

- how many of each repeated instance there are (cards, chips, rows, badges)
  — build exactly that many, even if the frame repeats one placeholder;
- the exact copy of every text node, including the badge counts;
- which image each image slot shows — `ls public/images/` first, the user
  uploads a screen's assets there (`card-image.png` / `card-image-variation.png`
  are the first and second card illustrations); never a component's default
  image or a Figma export when a matching file exists;
- every component's variant state in the frame: `BottomNav`'s `chatActive`
  (muted on Due list, emphasized on Home), `Chips` color, `Radio` state,
  `VoiceInput` state, Badge `showCount`.

If the existing mocked data (`app/due-terms.ts`) contradicts the frame, change
the data to the frame's content — never keep data that puts a different
number of things, or different words, on screen than Figma does.

This determines what "done" means for the screen (see the two branches at the
end of this file).

## 3. Query Storybook for every component you'll use

Before touching any component, call `mcp__storybook__docs-list` (or
`docs-show` / `docs-show-story` for a specific one) and read its actual props.
Never assume a prop exists because it sounds right, because a sibling
component has it, or because `SPEC.md`'s prose implies it. If `SPEC.md` names
a variant/prop that Storybook doesn't confirm, trust Storybook and flag the
mismatch.

## 4. Compose only from what's in Storybook

`stories/components/*` is the only place to look for something to reuse.
Most of the Figma library was never built in code, so "it's in Figma" is not
a reason to assume it exists here. If a component exists in Storybook, use it
exactly as documented — don't fork it, don't add undocumented props, don't
reach for raw markup when a real component covers the need.

## 5. When something you need isn't in Storybook

Don't stop to ask. Build it inline inside the screen, composed from
`tokens/tokens.json` values (see step 6) — never as a new entry under
`stories/components/`.

Then add one line to `component-gaps.md` at the repo root (create it if it
doesn't exist) recording what it was and which screen needed it, e.g.:

```
- Exit-session confirm sheet — needed by Exit-session confirm dialog screen
```

**Before adding a new line**, check whether the same gap is already listed
from a different screen. If it is, this is now the second screen that needs
it — at that point, build it properly as a real Storybook component (with a
story, in `stories/components/`) instead of inlining it again, and use that
component on both screens. Update the `component-gaps.md` line to note it's
now built, rather than deleting the history.

## 6. Every value from the generated tokens

No raw hex, no raw px, no invented spacing/radius/type value. Every color,
size, spacing, and type setting resolves through `tokens/tokens.json` (the
generated CSS custom properties in `build/css/tokens.css`) — semantic layer
only, never a primitive read directly from a component. If a value you need
has no matching token, say so in the screen's own code comment (matching the
pattern already used across `stories/components/*`, e.g. Card's and Badge's
"no matching space token" notes) rather than inventing one or falling back to
a raw value.

## 7. Mobile only, 390px, dark mode — inside `Scaffold`

Every screen is a fixed 390px-wide frame, dark mode only — no light-mode
branch, no responsive breakpoints. Every route renders inside the `Scaffold`
component (`stories/components/Scaffold`, design-system.md's "Scaffold
composition"). It owns everything that must be identical across routes so
nothing shifts on navigation: the frame, its centering, the page background,
and the sticky bottom-nav slot. **Never hand-roll `.screen` / `.frame` in a
page's CSS module** — three pages each had their own copy once, and they
drifted (different bar heights, bottom nav at different positions, a
scrollbar-induced sideways jump between routes).

- Home-level screens: `<Scaffold topBar={<TopNav … />} bottomNav={<BottomNav />}>`.
- Flow screens: pass the screen's own progress/back row as `topBar`, usually
  no `bottomNav`.
- A page's module only styles that page's content. Shell-level behavior
  (width, scrolling, scrollbar, sticky nav) lives in `Scaffold` and
  `app/globals.css` only — if a shell problem shows up, fix it there once.

## 8. Build every state listed for the screen, including the failure ones

If `SPEC.md`'s **States** line for this screen lists more than one state
(idle/granted/denied, correct/incorrect/partial, etc.), build all of them —
not just the happy path. Cross-check against `docs/voice-ux.md`'s "States to
design" table: a state marked **Must** there is not optional because it's
inconvenient. A state marked **If time** or **Out of scope** there should be
skipped, not silently built anyway (see `docs/sprint-context.md`'s "Not
building" list) and not silently ignored if it's listed as "Must."

## 9. Verify by measurement, in the real app — before saying "done"

Looking at a screenshot is not verification. Every basic mistake this project
has shipped (icons rendered at 20px instead of 24px, text at 16px instead of
24px, a 64px bar instead of 56px, a bottom nav that moved between routes)
looked fine at a glance and was caught only by measuring. So:

1. Run `node scripts/verify-screen.mjs <route> --figma <the png from step 2>`
   with the dev server up. It prints, at 390px and 1280px: frame offset and
   width, whether the page scrolls, top-bar height, the first/last icon
   glyph edges, the first `<h1>`'s left edge and line count, the first card's
   edges, and the bottom nav's position — and pixel-scans the Figma render
   for the same edges. Every number should match Figma within ~1px; if one
   doesn't, that's a bug or a flagged gap, never "close enough."
2. Run it on the route you came from too (usually `/`). Frame left/width,
   top-bar height, and bottom-nav position must be identical between the two
   — that's what "nothing shifts when navigating" means, concretely.
3. Check any icon inside a `ButtonIcon`: its rendered `svgSize` must equal
   its declared size (a 24px glyph in a 20px slot used to get silently
   shrunk).
4. Verify on `localhost:3000`, not Storybook. Storybook's preview does not
   load `app/globals.css` (no `box-sizing: border-box` reset), so a
   component can look right there and overflow in the app.
5. Then, and only then, read the screenshot the script's Playwright run can
   take — for things numbers don't catch (wrong illustration, wrong copy).

Put the measurement table in your reply, not just in a code comment.

---

## When you're done: two branches

**If the screen has a Figma frame (step 2 found one):**
Match it — layout, copy, component choices, states. Then list every
difference between what you built and the frame: anything you couldn't match
exactly (missing token, missing component prop, ambiguous spacing) and why.
Don't silently resolve a mismatch in the frame's favor or your own — name it.
Include the step-9 measurements and tick off the step-2 content checklist
item by item (instance counts, copy, images, variant states).

**If the screen has no Figma frame:**
Read `docs/design-brief.md` and `docs/voice-ux.md` for how this state should
behave — the hard constraints (voice-in/text-out, push-to-talk, never trap
the student, judge generously) and the six voice-UX principles apply even
with nothing to trace pixels from. When you're done, tell me explicitly what
you had to decide that wasn't written down anywhere (in `SPEC.md`,
`docs/sprint-context.md`, `docs/design-brief.md`, or `docs/voice-ux.md`) —
copy choices, layout choices, interaction details. Don't bury these in code
comments only; surface them in your reply.
