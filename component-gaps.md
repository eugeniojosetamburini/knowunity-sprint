# Component gaps

Things a screen needed that weren't in Storybook at the time (see
`.claude/skills/build-screen`, step 5). A gap hit by a second screen gets
promoted to a real component; the line stays, marked built, as history.

- Screen shell (`.screen` / `.frame`, 390px, page background) — hand-rolled on Home, Due list, and Recap; drifted between them (different bar heights, bottom nav position, scrollbar shift). **Built as `Scaffold`** (`stories/components/Scaffold`), all three routes migrated.
- Home-level top bar (hamburger / PRO / streak / fire / recall badge / alarm) — inlined on Home, then again on Due list. **Built as `TopNav`** (`stories/components/TopNav`), both screens migrated. Not an `appBar` variant, per design-system.md's own note.
- Flow-screen top bar (back arrow / progress / more) — design-system.md's `appBar` (one left icon, up to two right elements), not in Storybook. Inlined on Entry/recap (`app/recap/[topicId]`: `.appBar` + `icons.tsx` for the 18px arrow-left and more-horizontal glyphs). **Open** — every Voice Review Screen (#4–#9) uses the same bar; promote it to `AppBar` on the second screen.
- "Greed Narrow-TRIAL" headline style (Home's referral headline, 28px/34px) — no font file and no token anywhere in the project. **Open.** Home falls back to `typography.headline.m`; flagged in `app/page.module.css`.
- Scaffold slot 5, bottom sheet + scrim — needed by the Exit-session confirm dialog (SPEC.md #15). **Open**, nothing built.
- "Choose your own topics" destination (Due list) — the link is a real tap target but no topic-picker screen exists. **Open**, not a component gap so much as a missing screen.
