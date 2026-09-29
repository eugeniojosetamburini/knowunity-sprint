"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import type { Grade } from "../../due-terms";

// Recall-session state that has to outlive a navigation.
//
// **Renamed from `textMode.ts` on 2026-09-21**, when it stopped being
// about text mode: it began as the text fallback's flag (SPEC.md #14) and
// now holds five things:
//
//   1. **whether the student is in text mode**, sticky for the rest of the
//      session rather than per-term;
//   2. **what they typed for each term**, which the result screen echoes
//      back;
//   3. **the difficulty grade they tapped on each result**, which the
//      Summary reads (added 2026-09-21). Before this, `Radio` selection was
//      local `useState` on the result screen: it died on navigation, so the
//      Summary fell back to each outcome's *recommended* grade and printed
//      review intervals the student had never chosen — tap Difficult, Easy,
//      Easy and the Summary still read Easy, Difficult, Medium. SPEC.md's
//      "last tap wins" was true only within one visit to one screen.
//   4. **whether the student took a term's hint, and answered again after
//      it** (added 2026-09-21). The miss loop is hint → re-record → result;
//      without this the second result was byte-identical to the first and
//      nothing in the app knew a hint had been used. `outcomeAfterHint` in
//      app/due-terms.ts says what a hinted second attempt resolves to.
//   5. **whether the mic was refused** (added 2026-09-21), so the text
//      fallback can say *why* it is showing (voice-ux.md §3: tell them what
//      they're missing and how to re-enable). A refusal also switches text
//      mode on — sprint-context.md's "permission denied routes to text-first
//      mode" — where it used to leave a disabled mic and nothing else.
//
// `sessionStorage` holds all of it (decided 2026-09-15 with the user). This is a
// deliberate exception to SPEC.md's "session state doesn't persist" — that
// line is about *review* progress, and text mode is an accessibility setting,
// not progress. Choosing it over a threaded query param means no navigation
// in the flow can silently drop the student back to a microphone by
// forgetting to pass a param; choosing it over React context means it
// survives a hard reload, which matters when the reason you are typing is
// that the mic was refused. It clears when the tab closes, so a fresh
// session starts at voice — which is the intended default.
//
// Read through `useSyncExternalStore` rather than `useState` + `useEffect`
// so the value is consistent for every component in a render and doesn't
// need an effect to hydrate. `getServerSnapshot` returns the voice default,
// so a server render never disagrees with the client on first paint; on a
// hard reload *into* text mode there is therefore one frame of voice before
// it corrects. Client-side navigation — which is how the whole flow moves —
// reads the store synchronously and never flashes.

const MODE_KEY = "knowie.textMode";
const answerKey = (topicId: string, index: number) => `knowie.answer.${topicId}.${index}`;
// One key per topic rather than one per term: the Summary wants every grade
// at once, and `useSyncExternalStore` requires a snapshot that is stable
// between calls — a per-term key would mean building a fresh object on each
// snapshot read, which re-renders forever. A single JSON string compares
// equal by value, so the object is parsed once behind a `useMemo`.
const gradesKey = (topicId: string) => `knowie.grades.${topicId}`;
const hintsKey = (topicId: string) => `knowie.hints.${topicId}`;
const MIC_KEY = "knowie.micDenied";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab writing the same key should be picked up too.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

// Every read is wrapped: Safari's private mode throws on sessionStorage
// access rather than returning null, and a throw here would take the whole
// screen down for a setting that is meant to be a safety net.
function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Storage unavailable — text mode then lasts only as long as the
    // current screen. Still better than throwing.
  }
  emit();
}

/** Whether the student has switched to typing, and a setter. Sticky for the session. */
export function useTextMode(): readonly [boolean, (enabled: boolean) => void] {
  const enabled = useSyncExternalStore(
    subscribe,
    () => read(MODE_KEY) === "1",
    () => false,
  );

  const setEnabled = useCallback((next: boolean) => {
    write(MODE_KEY, next ? "1" : "0");
  }, []);

  return [enabled, setEnabled] as const;
}

/** What the student typed for one term, or null if they spoke it (or haven't answered). */
export function useTypedAnswer(topicId: string, index: number): string | null {
  return useSyncExternalStore(
    subscribe,
    () => read(answerKey(topicId, index)),
    () => null,
  );
}

export function saveTypedAnswer(topicId: string, index: number, answer: string) {
  write(answerKey(topicId, index), answer);
}

// Per-topic records keyed by term index — grades and hint state share one
// shape and one parse, so a hand-edited or half-written value degrades to
// "nothing recorded" instead of taking a screen down.
function parseRecord<T>(raw: string | null): Partial<Record<number, T>> {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Partial<Record<number, T>>;
  } catch {
    return {};
  }
}

function useRecord<T>(key: string): Partial<Record<number, T>> {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );
  return useMemo(() => parseRecord<T>(raw), [raw]);
}

/** Every grade the student has tapped in this topic, keyed by term index. */
export function useGrades(topicId: string): Partial<Record<number, Grade>> {
  return useRecord<Grade>(gradesKey(topicId));
}

/** Record the grade tapped for one term. Writing on every tap is what makes last-tap-wins true. */
export function saveGrade(topicId: string, index: number, grade: Grade) {
  write(gradesKey(topicId), JSON.stringify({ ...parseRecord<Grade>(read(gradesKey(topicId))), [index]: grade }));
}

// A term's hint state: absent (no hint taken) → "hinted" (the Hint screen was
// opened) → "retried" (the student answered again afterwards, so the result
// they land on is the second attempt's). One-way within a session: a term
// that has been retried stays retried, and there is no second hint to take.
export type HintState = "hinted" | "retried";

/** Every term in this topic whose hint has been taken, keyed by term index. */
export function useHints(topicId: string): Partial<Record<number, HintState>> {
  return useRecord<HintState>(hintsKey(topicId));
}

/** The Hint screen was opened for this term. */
export function markHinted(topicId: string, index: number) {
  const current = parseRecord<HintState>(read(hintsKey(topicId)));
  if (current[index]) return;
  write(hintsKey(topicId), JSON.stringify({ ...current, [index]: "hinted" }));
}

/** The student submitted an answer; if they had taken the hint first, that answer is the second attempt. */
export function markRetriedIfHinted(topicId: string, index: number) {
  const current = parseRecord<HintState>(read(hintsKey(topicId)));
  if (current[index] !== "hinted") return;
  write(hintsKey(topicId), JSON.stringify({ ...current, [index]: "retried" }));
}

/** Whether the mic was refused this session. Cleared the next time a request is granted. */
export function useMicDenied(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => read(MIC_KEY) === "1",
    () => false,
  );
}

export function setMicDenied(denied: boolean) {
  write(MIC_KEY, denied ? "1" : "0");
}

/**
 * Forget everything a topic's session recorded: typed answers, grades and hint
 * state. Called when the student taps Ready on the recap, so a topic they
 * abandoned via ⋯ → End session really does come back "untouched, as though
 * never started" (sprint-context.md) — without this, a second run through
 * would open on the first run's grades, echoed answers and hint state. Text
 * mode and the mic flag are the student's setting, not the topic's progress,
 * and are left alone.
 */
export function resetTopicSession(topicId: string) {
  try {
    const stale: string[] = [];
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const key = sessionStorage.key(i);
      if (key && (key.startsWith(`knowie.answer.${topicId}.`) || key === gradesKey(topicId) || key === hintsKey(topicId))) {
        stale.push(key);
      }
    }
    stale.forEach((key) => sessionStorage.removeItem(key));
  } catch {
    // Storage unavailable — nothing was kept, so nothing to forget.
  }
  emit();
}
