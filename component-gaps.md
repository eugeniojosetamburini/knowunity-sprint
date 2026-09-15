# Component gaps

Things a screen needed that weren't in Storybook at the time (see
`.claude/skills/build-screen`, step 5). A gap hit by a second screen gets
promoted to a real component; the line stays, marked built, as history.

- Screen shell (`.screen` / `.frame`, 390px, page background) — hand-rolled on Home, Due list, and Recap; drifted between them (different bar heights, bottom nav position, scrollbar shift). **Built as `Scaffold`** (`stories/components/Scaffold`), all three routes migrated.
- Home-level top bar (hamburger / PRO / streak / fire / recall badge / alarm) — inlined on Home, then again on Due list. **Built as `TopNav`** (`stories/components/TopNav`), both screens migrated. Not an `appBar` variant, per design-system.md's own note.
- Flow-screen top bar (back arrow / progress / more) — design-system.md's `appBar` (one left icon, up to two right elements), not in Storybook. Inlined on Entry/recap, the prompt screen, Processing and Result: Pass — four copies of the same markup and CSS. **Built as `AppBar`** (`stories/components/AppBar`, with stories), all four routes migrated; `BackButton.tsx` and the screen-local `icons.tsx` were absorbed into it and deleted. Purpose-built like `TopNav` rather than a generic slot container, with `progress` optional for a screen that has the bar but no session progress (e.g. Summary, SPEC.md #10).
- "Greed Narrow-TRIAL" headline style (Home's referral headline, 28px/34px) — no font file and no token anywhere in the project. **Open.** Home falls back to `typography.headline.m`; flagged in `app/page.module.css`.
- Scaffold slot 5, bottom sheet + scrim — needed by the Exit-session confirm dialog (SPEC.md #15). **Open**, nothing built. Not to be confused with slot 4's new flush form (below): slot 5 is the *modal, scrimmed* sheet, this one is a persistent footer.
- Flow-screen action sheet (rounded-top surface, drag handle, Retry + Continue row) — the footer on every result screen (SPEC.md #7/#8/#11). The positioning went into `Scaffold` as slot 4's flush form (`bottomNavFlush`), since pinning to the viewport bottom is shell behavior. **Built as `ActionSheet`** (`stories/components/ActionSheet`, with stories) when Incorrect and Partial needed the identical sheet; the Pass screen was migrated onto it. Flagged: `actionSheet` is not a component design-system.md names — worth adding there, or folding into slot 5's definition.
- "Choose your own topics" destination (Due list) — the link is a real tap target but no topic-picker screen exists. **Open**, not a component gap so much as a missing screen.
