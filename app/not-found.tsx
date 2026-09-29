"use client";

import { useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { Mascot } from "@/stories/components/Mascot/Mascot";
import { Button } from "@/stories/components/Button/Button";
import styles from "./not-found.module.css";

// The 404 screen. **No Figma frame** — nothing in the file draws one, and
// the composition is the due list's own all-caught-up state (#2a, also
// frameless): centred mascot, headline, one line of body copy, and a single
// primary button in Scaffold's bottom slot.
//
// Why it exists: Next renders its built-in 404 when a route doesn't match
// or a page calls `notFound()`, and that page lives outside `Scaffold` and
// outside `app/globals.css` — light or dark by the OS rather than by the
// app, no frame, no controls, no way back. Five routes here call
// `notFound()` (prompt, processing, result, hint, summary), so a mid-flow
// refresh on a stale term index landed there, as did any typo'd URL. A
// **root** `app/not-found.tsx` covers both cases at once: Next's docs for
// this file convention say the root one handles unmatched URLs for the
// whole app as well as thrown `notFound()` calls, so no per-segment copies
// are needed.
//
// A client component for the same reason the Summary screen is one: Button
// has no `href` prop (checked in Storybook), and nesting a <button> inside
// a <Link> would nest two interactive elements. The Summary's Continue
// already navigates via `useRouter` from the bottom slot; this matches it.
//
// No top bar: `AppBar` is the flow-screen bar and carries back / progress /
// ⋯, none of which mean anything here — a 404 has no previous screen to
// step back to and no session to end. `TopNav` is home-level and would
// claim a streak and a due count this screen can't stand behind. Scaffold
// supports a bare content slot (its "Content only" story), so the shell
// stays the app's while the bars stay honest.
//
// The copy is true rather than reassuring: nothing in this prototype stores
// progress, so an interrupted topic really is still due — the same promise
// the exit-session sheet makes when it says "They stay due".
export default function NotFound() {
  const router = useRouter();

  return (
    <Scaffold
      bottomNav={
        <Button variant="primary" size="l" onClick={() => router.push("/due-list")}>
          Back to due list
        </Button>
      }
    >
      <div className={styles.content}>
        <Mascot state="confused" className={styles.mascot} />
        <h1 className={styles.headline}>That page isn’t here</h1>
        <p className={styles.body}>
          The link may be old, or the session may have moved on. Nothing is lost — your topics
          are still due, so you can pick them up from the list.
        </p>
      </div>
    </Scaffold>
  );
}
