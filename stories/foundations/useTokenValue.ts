import { useSyncExternalStore } from 'react';

// Reads the actual resolved value of a CSS custom property from the
// generated build/css/tokens.css (already loaded in .storybook/preview.tsx),
// rather than re-deriving it from tokens.json — so what's shown is exactly
// what the browser will paint.
//
// Read through `useSyncExternalStore` rather than `useState` + `useEffect`:
// the value is external state that lives in the stylesheet, not state this
// component owns, and setting state from an effect to copy it in is what
// `react-hooks/set-state-in-effect` flags (it schedules a second render
// pass on every mount). The same pattern the app's own `textMode.ts` uses
// to read sessionStorage.
//
// `subscribe` is a no-op: token values are baked into a stylesheet at build
// time and nothing changes them at runtime, so there is no change to
// subscribe to — but the hook still needs a stable subscribe function, so
// it is defined once at module scope rather than inline.
//
// `getServerSnapshot` returns '' so the server render and the hydrating
// client render agree; the real value arrives on the render straight after
// hydration, exactly as the effect used to deliver it.

const subscribe = () => () => {};

const readToken = (cssVar: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--${cssVar}`).trim();

export function useTokenValue(cssVar: string): string {
  return useSyncExternalStore(
    subscribe,
    () => readToken(cssVar),
    () => '',
  );
}
