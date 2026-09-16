"use client";

import { useCallback, useSyncExternalStore } from "react";

// Text fallback session state (SPEC.md #14).
//
// Two things have to outlive a navigation: **whether the student is in text
// mode**, which is sticky for the rest of the session rather than per-term,
// and **what they typed for each term**, which the result screen echoes back.
//
// `sessionStorage` holds both (decided 2026-09-15 with the user). This is a
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
