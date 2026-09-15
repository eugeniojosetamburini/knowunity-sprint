# Knowunity Design System — Rules

This is the rules file. It says which component to reach for and how things
are named. It does not contain values — for any actual color, size, or type
setting, look it up in `tokens/tokens.json` by path. If a path you need isn't there,
that's a gap to raise, not something to fill in here.

---

## Component selection

- **A single, standalone tap action** → `button`. One Primary per screen —
  the token layer enforces this too (`semantic.color.interactive.primary`'s
  own description says max one per screen). Everything else competing for
  attention is Secondary or Tertiary. Abandon/cancel/delete actions use the
  Destructive variant instead — never pair Destructive with a Primary on the
  same screen, same reasoning as the two-Primaries rule.
- **An icon-only tap** (close, back, menu) → `buttonIcon`. One per corner
  slot. The icon it shows is a swap-in, not fixed — confirm it exists in the
  icon library before assuming it does. XS is for tight, low-emphasis
  triggers inside cards and rows (a card's menu button, an add-topic
  control) — don't substitute it for the standard S size in a top bar.
- **Exactly two stacked or side-by-side choices** → `buttonGroup`. Never for
  three or more — confirmed the MCQ and hint-ladder screens use plain stacked
  `button` instances instead, not this component.
- **A removable tag, filter pill, multi-select option, or small label** →
  `chips`. See its full entry below for current color options.
- **A small, non-interactive label with an optional leading/trailing icon**
  (scheduling info, metadata, timestamps) — this is a distinct need from
  `chips`; see the note under Component reference if this gets built again.
  Don't reach for `chips` here just because the two look similar — the real
  difference (tappable vs. not) has to be a different component, not just a
  different color.
- **Icon sizing inside another component** → `iconSlot`. Never placed
  standalone; it has no fill and no states of its own.
- **Any appearance of Knowie**, at any size → `mascotSlot` for the generic
  image slot, `Mascot` for the actual character illustration with an
  emotional state. 64px (XL) is the floor for `mascotSlot` — there's no
  smaller variant, so a small placement is still the XL instance, not a
  separate asset.
- **A top-of-screen progress bar** → `progressIndicator`. Which color variant
  to use follows which surface owns the screen, not which feature happens to
  live there today — don't hardcode a color choice to a feature that might
  move.
- **A transient, dismissible system message** → `snackbar`. Only for things
  the student doesn't have to act on and that can disappear without losing
  information.
- **Free-text entry outside the main chat box** → `textBlock`. This is an
  editable input, not a text-display container — don't use it to render
  read-only copy. Knowie's own dialogue now has a real component —
  `chatBubble` — so this is no longer an open gap; see below.
- **A top bar with one left icon and up to two elements on the right** →
  `appBar` (built: `stories/components/AppBar`). If a bar needs more than
  that (the home screen's five-element bar is the example), it's already
  outside this system — don't invent a seventh variant to force it in.
  Note the built bar is a left icon, a *centre* progress bar and a right
  icon, which this line's "up to two elements on the right" doesn't quite
  describe — the frames are what it follows; this wording wants tightening.
- **The home-level five-element bar** (hamburger / PRO / streak / fire /
  due-count / alarm) → `topNav` (built: `stories/components/TopNav`). Its own
  component precisely because it doesn't fit `appBar`; home-level screens
  only, never a flow screen.
- **The screen shell itself** → `Scaffold` (built: `stories/components/Scaffold`,
  see "Scaffold composition" below). Every route renders inside it; a page
  never draws its own frame.
- **A tappable summary row for a topic or study set** → `card`.
- **A flow screen's footer actions, pinned to the bottom of the frame** →
  `actionSheet` (built: `stories/components/ActionSheet`). A rounded-top
  surface with a handle, holding that screen's buttons in one equal-width
  row; it goes in the scaffold's bottom-nav slot, which is what pins it.
  This is a *persistent footer*, not the scrimmed sheet in slot 5 — it never
  dims what's behind it and is never dismissed.
- **The tap target that starts and shows the state of voice capture** →
  `voiceInput`.
- **A post-session outcome summary** → `resultCard` (percentage, segmented
  bar, legend, written summary) paired with `resultTable` (one row per term
  covered). They're built to be used together, not as alternatives to each
  other.
- **A due-count indicator anchored to a nav icon** → `badge`.
- **A home-screen shortcut into a specific tool** (scan, flashcards, quiz,
  summarize) → `pill`. One `variant` per instance, not a generic label —
  don't reuse it for anything that isn't one of those four entry points.
- **A named type style** (Display, Headline, Body, Caption tiers) →
  `semantic.typography.*` in tokens/tokens.json. Don't hand-set family, weight,
  size, and line height separately when a matching named style already
  covers the combination.

---

## Component reference

This section covers components added after the initial file was written, in
more depth than the one-line entries above — properties, every state, and
what each one means. Descriptions are quoted directly from each component in
Figma, not paraphrased. As with everything else in this file, look up any
color/size/spacing value in `tokens/tokens.json`; nothing here repeats a raw value.

### `badge`
Variant axis: `variant` — `recall` / `streak` / `fire` / `pro`.

**Properties:** `variant` (`recall` / `streak` / `fire` / `pro`, default
`recall`) · `count` (text, default `"5+"` — the due-count text; ignored
while `showCount` is false, and by `variant="pro"`, which carries no count)
· `showCount` (boolean, default `true` — false hides the count text and
leaves just the mark; no effect on `variant="pro"`).

**Behavior:** `badge` is a tap target, not a passive indicator — the
component's own description ("without blocking access to it") already
implies this. `variant="recall"` specifically navigates to the due list, and
does so even with nothing due (`showCount=false`), for on-demand review
outside the spaced-repetition schedule.

**Description, as written on the component:**
> A small count indicator anchored to a nav icon, signaling something is due
> without blocking access to it.
>
> **USE:** any corner-icon that needs an at-a-glance number.
>
> **DON'T:** use green for anything except a positive/actionable due-count —
> it isn't a generic notification color.

**Known gap:** there's no hidden/zero state. Nothing currently represents
"nothing due" (badge absent entirely) — that has to be handled by whoever
places the instance (hide it), not by the component itself.

### `card`
A single component, no variants.

**Properties:** `title` (text) · `topicCountText` (text) · `durationText`
(text). The illustration is a plain image fill, swapped per instance. The
menu-button slot holds a real `buttonIcon` instance (`Primary`, `S`) — not
`Brand`/`XS`, which is reserved for the voice add-topic control specifically.

**Description, as written on the component:**
> A tappable summary card for a topic or study set — title, quick facts, and
> an entry point into it.
>
> **USE:** any row in a browsable list of study content.
>
> **DON'T:** add a third meta row. If a third fact is needed, that's a sign
> the card needs restructuring, not another icon row bolted on.

**Known gaps:** no Pressed state for the row itself (separate from the menu
button's own Pressed, which it already has as a real instance), and no
empty/loading state for the illustration.

### `voiceInput`
Variant axis: `state` — `Idle` / `Disabled` / `Listening`.

**Description, as written on the component:**
> The tap target that starts and shows the state of voice capture.
>
> **USE:** the tap target that starts and shows the state of voice capture.
>
> **DON'T:** rely on the glow color alone to convey Listening — mascot status
> already has to survive with motion and color stripped out, and this
> affordance carries the same requirement.

**What each state means:** `Idle` — not recording, waiting for a tap.
`Disabled` — Knowie is processing; nothing should register as a tap while in
this state. `Listening` — actively capturing the student's answer; carries a
waveform mark, not a mic icon, in its center (layer name `waveformMark` —
don't rename it back to a mic icon, it was confused for one once already).

**Known gaps:** the `voice/onListening` token exists for a waveform-mark use
that isn't fully resolved yet — check with whoever owns that token before
assuming its current binding is final.

### `chatBubble`
Variant axis: `State` — `Default` / `Correct` / `Incorrect` / `partial`.
(Property name is capitalized here, unlike every other `state` property in
this file — see Naming and structure conventions below. `partial` is itself
lowercase, unlike its three sibling values — a second, smaller
inconsistency introduced when it was added, not fixed here either.)
`Default` is the neutral, no-label-row state — used for anything Knowie is
asking or saying that isn't feedback on an answer. `partial` covers a
correct-but-incomplete answer — a distinct gap from the "Hint" gap noted
below, which is about the mid-ladder nudge screen (still unresolved; adding
`partial` doesn't close it).

**Properties:** each state has its own independent text property
(`neutralText`, `correctText`, `incorrectText`, `partialText`) — not a
single shared property. Sharing one across all four overwrites each state's
own default message; keep them separate if this gets rebuilt.

**Token note:** `partial`'s label, tail, and body all bind to
`accent.coral.bold` / `accent.coral.onBold`, not a `feedback.*` token —
tokens.json has no `feedback.warning` scale (bold/subtle/onBold/onSubtle)
to match `feedback.error`/`feedback.success`, only a single flat
`text.warning`. `accent.coral` is what the Figma component actually binds
to, even though that token's own description says "not errors or
warnings." Followed as designed; flagging the mismatch rather than
resolving it.

**Known gap:** `partial`'s label has no icon, unlike `Correct`/`Incorrect`
(which both pair an icon with the label text) — matches the Figma
component exactly, not an oversight in the build.

**Description, as written on the component:**
> Knowie's dialogue container, for anything Knowie says or asks.
>
> **USE:** anything Knowie says or asks, in any tone.
>
> **DON'T:** repurpose `textBlock` for this — that's an editable input, this
> is read-only display, which is exactly the mix-up this file already warns
> about above.

**Known gap:** no Hint state. A hint-ladder nudge currently falls back to
`Default`, with nothing visually distinguishing "Knowie is nudging you" from
"Knowie is asking a plain question." Adding one needs either a new token
family or a deliberate decision to reuse existing tokens — `accent.coral`
is now spoken for by `partial`, so a Hint treatment reusing it would read as
the same state; pick a different family if this gets built.

### `resultCard`
A single component, no variants.

**Description, as written on the component:**
> A post-session outcome breakdown — a percentage, a segmented bar showing
> correct/partial/incorrect distribution, a legend, and a short written
> summary.
>
> **USE:** once, at the end of a recall session, to summarize how the
> student did.
>
> **DON'T:** reuse the segmented bar on its own elsewhere as a generic
> progress indicator — its three colors are specific to this outcome
> breakdown, not a general-purpose multi-part progress pattern.

### `resultTable`
A single component, no variants. Built to pair with `resultCard`, not as a
standalone alternative.

**Description, as written on the component:**
> A post-session breakdown of every term covered — how hard it was, and when
> it's due again.
>
> **USE:** the reference list at the end of a recall session, one row per
> term.
>
> **DON'T:** hand-set row borders per row — that's fragile if rows get
> reordered or the list length changes; the divider between rows should be
> handled by the list structure, not baked into each row individually.

**Known gap:** rows currently do hand-set their own borders (mixed per-side
stroke weight), which is the exact thing the DON'T above is warning against.
The color is correctly bound; the structural fragility is still unresolved.

### `Mascot`
Variant axis: `State` (capitalized — see naming note below) — `standby` /
`excited` / `confused` / `thinking`. Distinct from `mascotSlot`: `mascotSlot`
is a generic image-slot wrapper used anywhere Knowie appears; `Mascot` is the
actual character illustration carrying a specific emotional state.

**Description, as written on the component:**
> Knowie's mascot illustration, showing the character's emotional state —
> standby, excited, confused, or thinking.
>
> **USE:** anywhere Knowie's reaction to the student needs a face, not just
> words — celebrating a correct answer, showing confusion at an off-base
> one, or thinking while processing.
>
> **DON'T:** rely on color or expression alone to carry meaning that isn't
> backed up elsewhere (in copy, in the chat bubble's own state) — this has to
> keep reading correctly even if someone can't perceive the illustration's
> subtler emotional cues.

### `radio`
Variant axis: `state` — `Default` / `Easy` / `Medium` / `Difficult`.
`Default` is the unselected look (shared across any grade before it's
picked); `Easy`/`Medium`/`Difficult` are each a selected, colored state with
their own checkmark. Originally built under the working name
`intervalOption` and briefly named `scaffold` in Figma — renamed to `radio`
to resolve a collision with the unrelated "Scaffold composition" concept
below (the screen shell every screen builds inside).

**Description, as written on the component:**
> One choice in the post-answer recall-difficulty picker.
>
> **USE:** always shown as a full set, one row per grade, with one
> pre-selected.
>
> **DON'T:** ship an incomplete set — the spaced-repetition logic downstream
> needs a row for every grade it can receive.

**Known gaps:** the labeled grades are Easy/Medium/Difficult, three values —
confirmed the full set this scale needs (not a subset of a four-grade
Again/Hard/Good/Easy scale; `docs/voice-ux.md`'s states table is explicit
about this). Each row also still stacks two fills (a base surface color plus
a color tint) rather than one resolved fill per state — both fills are
properly bound to real tokens, so it isn't a hardcoded-value problem, just a
fragile structure. The headline labels needed a new Text Style
(`semantic.typography.headlineCondensed`, Greed Condensed SemiBold 24px)
since nothing in the existing type scale matched that size/family
combination — added to `tokens/tokens.json`, resolved. The body text under
each label turned out to have an exact match already: `typography.headline.xxs.regular`
(15px, 16px line height, 0.15px tracking).

### `chips` — current state
`brand` is a live color option on the component (alongside `primary`/`pro`),
supporting recap/topic tagging — matches the treatment used elsewhere for
Knowie's recap terms.

### `actionSheet`
No variant axis. One composition: a rounded-top surface carrying a drag
handle and a single row of equal-width buttons. Sized by its content; the
result screens' instances come out at the frames' 120px with a pair of
`button` (size L) children.

**Description, as written on the component:**
> The sheet pinned to the bottom of a flow screen, carrying that screen's
> footer actions.
>
> **USE:** in the scaffold's bottom-nav slot with `bottomNavFlush`, which
> pins it to the frame's bottom and lets it run edge to edge; put the
> screen's buttons in it as children and they share the row equally.
>
> **DON'T:** mistake it for slot 5 — that is the modal, scrimmed sheet the
> exit-session confirm needs. This one is a persistent footer that never
> dims the screen behind it and is never dismissed; its handle is drawn
> because the frames draw it, not because it drags.

**Where it came from:** inlined on the Pass result screen first, then
promoted when Incorrect and Partial needed the identical sheet. The split is
deliberate and worth preserving — the *positioning* (sticky to the viewport
bottom, so it can't differ between routes) lives in the scaffold's slot 4,
and only the *appearance* lives in this component.

**Known gaps:** the handle is decorative — nothing drags, and there is no
collapsed state, because no frame calls for one. One Primary per screen
still applies inside it: the result screens pair a Secondary (Retry) with
the Primary (Continue), never two Primaries. The frames' upward drop shadow
is `effect.elevation.sheet`; its top edge is an inside stroke, reproduced as
an inset shadow so it stays out of layout.

---

## Scaffold composition

The scaffold is the screen shell. Every screen builds inside it, not around
it — it already handles the safe areas. It's a real component now
(`stories/components/Scaffold`, props `topBar` / `children` / `bottomNav`
matching slots 2–4 below); slot 1 isn't rendered (OS chrome) and slot 5
isn't built yet. It owns the frame's width and centering and keeps the
bottom nav sticky to the viewport, so those can't differ between routes.

1. **Status bar (fixed, not a slot).** System clock and battery. Never put
   custom content here.
2. **Slot – Top navigation.** One `appBar` instance. Nothing else belongs in
   this slot.
3. **Slot – Content.** The screen's actual body. Everything that scrolls
   lives here.
4. **Slot – Bottom nav.** Either the tab bar (home-level screens) or the
   primary action button(s) for a flow screen. I haven't confirmed from the
   file whether a screen can use both at once — treat it as one or the
   other until that's checked. The flow-screen form is an `actionSheet`,
   which needs the slot's flush treatment (`bottomNavFlush`) so it can run
   edge to edge and draw its own surface instead of taking the tab bar's
   padding and page background.
5. **Slot – Bottom-sheet, plus its scrim.** Collapsed to a sliver by default.
   The dimming background is already wired to appear once a sheet's content
   is placed in the slot — don't hand-build a separate overlay for it. This
   is the *modal* sheet, and it is not `actionSheet`: the two are different
   components with different jobs, and slot 5 is still unbuilt.

---

## Naming conventions

- **Primitive color:** hue name plus a step number (`blue.400`, `violet.900`),
  except the alpha ramp, which is named by direction and intensity
  (`alpha.light-24`, `alpha.dark-50`) since there's no single hue to number.
- **Semantic color:** `<group>.<role>` or `<group>.<hue>.<role>`
  (`background.surface`, `accent.blue.bold`). Multi-word roles are camelCase
  (`onBold`, `primaryActive`).
- **Size scale (icon, illustration, radius, space, stroke):** a step number
  that does not map 1:1 to its pixel value (`icon.300` is not 300px) — always
  resolve through tokens/tokens.json rather than guessing the pixel value from the
  name.
- **Components:** camelCase (`buttonIcon`, `progressIndicator`,
  `voiceInput`, `chatBubble`, `radio`). One exception in practice: `Mascot`
  was built with a capitalized first letter, breaking this rule — worth
  fixing when it's next touched, not a new convention to copy.
- Variant *properties* are camelCase (`variant`, `size`, `state`); variant
  *values* are capitalized when they're a fixed enum (`Primary`,
  `Secondary`) and lowercase when they're closer to a raw setting (`pro`,
  `active=true`). **One inconsistency remains:** `chatBubble`'s state
  property is still capitalized (`State`), unlike every other component in
  the file (`button`, `buttonIcon`, `voiceInput`, `Mascot`, `radio` all use
  lowercase `state`). Treat lowercase as correct and `chatBubble` as needing
  a fix, not as an equally-valid alternative — it was fixed on `Mascot` and
  `radio` already, `chatBubble` is the one still outstanding.
- **One real inconsistency worth knowing about:** the Size collection's own
  top-level group names are capitalized (`Icon`, `Illustration`, `Radius`,
  `Space`, `Stroke`) while every other collection's groups are lowercase.
  Match whichever collection you're extending — don't silently "fix" this by
  picking one casing for a new group.

### Conventions established while adding new components

- **Component descriptions follow a fixed shape:** one or two sentences of
  plain explanation, then a bolded **USE:** line, then a bolded **DON'T:**
  line, each as its own paragraph. Every component added this way should
  match that shape exactly — it's what a tool or a person skimming component
  metadata is going to look for.
- **A text property that holds the component's main editable content is
  named in Title Case** (`Text`, `CTA`, `title`, `count` — mixed in
  practice, but lean Title Case for anything analogous to `chips`' `Text` or
  `button`'s `CTA`), **while the layer it's bound to stays lowercase**
  (`text`, `label`). The property is the public-facing name; the layer is
  internal structure.
- **Icon-bearing components nest a real `iconSlot` instance**, never a
  static icon baked in as a plain vector or group. This file's icon-swap
  library is currently broken (every key in it fails to resolve), so a
  nested `iconSlot` won't actually be swappable in practice yet — but the
  structure should still be correct so it starts working the moment that's
  fixed, rather than needing every component rebuilt later.
- **When a component needs a state its neighbors already have a pattern
  for** (Pressed, Disabled, Loading), derive it the same way the existing
  states do rather than leaving it half-built — e.g. Disabled is
  consistently a neutral, variant-agnostic treatment across every component
  that has it (`background/surface` + `text/disabled`, regardless of the
  component's own color), and Pressed is consistently the base color plus a
  shared translucent overlay token, never a bespoke "pressed" color per
  component.
- **A component-set's own outer frame should carry no visual styling of its
  own** (no fill, stroke, or radius) — it's a structural grouping container,
  not something anyone sees rendered. A few components picked up a stray
  raw stroke/radius on this frame during building; if you see one, it's
  leftover noise to clear, not a real design decision to preserve.
- **When no existing Text Style matches a size/family combination in use,
  say so and create one rather than leaving the text unstyled** — but check
  line-height as well as size before declaring a match; two styles can
  share a pixel size and still differ in line height, in which case neither
  one is a real match.
- **A single shared text property does not work across multiple variants
  that need independent default content.** If a set has three states and
  each one has to say something different by default, that's three
  properties, not one shared across all three — a shared property means
  editing one state's default silently overwrites the others.

---

## Never do this

- **Never invent a value that isn't in `tokens/tokens.json`.** If something is
  missing, say so instead of filling the gap.
- **Never use a CSS fallback value like `var(--token, #333)`.** If a token
  resolves to nothing, that's a bug to fix, not to hide.
- **Sentence case on every label, button, and heading.** Capitals only for
  proper nouns.
- **Never put an appearance word in a semantic name.** A word that describes
  how a color looks belongs in the primitive layer only — the semantic layer
  names roles, not looks.
- **Never read a primitive directly.** Components consume the semantic
  layer, and the semantic layer references the primitives.
- **Never stack more than one Primary button on a screen.** This is stated
  directly in the token layer, not just a style preference. The same logic
  extends to Destructive — never pair it with a Primary either.
- **Never use `buttonGroup` for more than two options.** It has no
  configuration past two.
- **Never invent a `mascotSlot` size smaller than the defined floor.** If
  Knowie needs to look smaller than that, scale the existing instance down —
  don't add a new size.
- **Never force a bar that needs more than one left icon and two right-side
  elements into `appBar`.** Flag the mismatch instead of adding a variant.
- **Never let content sit under the status bar or home indicator.** Build
  inside the scaffold's slots — they already account for both.
- **Never rely on mascot expression, animation, or color alone to signal
  system status** (listening, processing, result). It has to stay legible
  with motion and color both stripped out. `voiceInput`'s Listening state
  and `Mascot`'s per-state descriptions both carry this same requirement —
  it isn't unique to the original mascot rule.
- **Never use `actionSheet` as a modal.** It has no scrim, no dismissal and
  no collapsed state by design. A sheet that needs to interrupt the student
  and be dismissed is slot 5's, which isn't built — flag that instead of
  bending this one into it.
- **Never use `textBlock` to render read-only copy.** `chatBubble` now
  exists specifically to close this gap — reach for that instead of
  repurposing `textBlock` or inventing a one-off text container.
- **Never reuse `chips`' `brand` color as a general-emphasis color** if it
  gets rebuilt. It's scoped to recap/topic tagging specifically — a
  deliberate, narrow exception to the file's two-color rule for `chips`, not
  an invitation to add more colors freely.
