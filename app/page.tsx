'use client';

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { TopNav } from "@/stories/components/TopNav/TopNav";
import { Button } from "@/stories/components/Button/Button";
import { MascotSlot } from "@/stories/components/MascotSlot/MascotSlot";
import { Pill } from "@/stories/components/Pill/Pill";
import { AiChat } from "@/stories/components/AiChat/AiChat";
import { BottomNav } from "@/stories/components/BottomNav/BottomNav";
import { ChatBubble } from "@/stories/components/ChatBubble/ChatBubble";
import tokens from "../tokens/tokens.json";
import { dueCountLabel } from "./due-terms";
import styles from "./page.module.css";

// Home screen — the real Figma frame (home-screen-knowie, 15702:3864), built
// 1:1 from Storybook components. Pill/AiChat taps have nowhere to go (other
// tools, out of scope for this feature) and are left inert; the recall
// badge in TopNav is the hero entry into the due list. The bottom nav's
// chat tab routes back here, matching the due list's wiring.
//
// The coach mark (Figma 16615:4178) is a ChatBubble with tail="top", hung
// under the top nav so its tail points at the recall badge — the thing it is
// telling the student about. It fades in a second after the screen settles,
// holds, then fades out on its own: nothing on the screen depends on it, and
// it is not interactive (the badge it points at is the affordance), so it is
// pointer-events: none and never traps anything underneath.

const { duration, easing } = tokens.primitive.motion;

// Same screen-enter language as Scaffold's <main>: fade plus an 8px rise on
// motion.easing.out. Read straight from tokens.json by path because motion.js
// needs numbers, not CSS variables, and semantic.motion still has no
// screen-transition entry — the gap component-gaps.md already records for
// Scaffold.
const COACH_MARK_RISE = tokens.primitive.size.space['200'].$value.value;
const COACH_MARK_IN = {
  duration: duration.slow.$value / 1000,
  ease: easing.out.$value as [number, number, number, number],
};
// Leaving, so motion.easing.in — whose token note says most exits in this app
// are instant navigations. This one isn't, it's an animated departure.
// duration.base is 200ms, which is also the 60-70% of the entrance that an
// exit wants.
const COACH_MARK_OUT = {
  duration: duration.base.$value / 1000,
  ease: easing.in.$value as [number, number, number, number],
};
// Neither of these has a token (the motion durations are all one-shot
// transition lengths; the longest is 300ms). The 1s delay was specified; the
// 5s hold is how long the bubble stays fully visible before it leaves, and it
// starts once the entrance has finished rather than when it began.
const COACH_MARK_DELAY_MS = 1000;
const COACH_MARK_HOLD_MS = 5000;

export default function Home() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [coachMarkShown, setCoachMarkShown] = useState(false);

  useEffect(() => {
    const appear = setTimeout(() => setCoachMarkShown(true), COACH_MARK_DELAY_MS);
    const dismiss = setTimeout(
      () => setCoachMarkShown(false),
      COACH_MARK_DELAY_MS + COACH_MARK_IN.duration * 1000 + COACH_MARK_HOLD_MS,
    );
    return () => {
      clearTimeout(appear);
      clearTimeout(dismiss);
    };
  }, []);

  return (
    <Scaffold
      topBar={<TopNav dueCount={dueCountLabel} recallHref="/due-list" />}
      bottomNav={<BottomNav onSelectChat={() => router.push('/')} />}
    >
      <section className={styles.intro}>
        {/* The live region itself stays mounted so the bubble arriving inside
            it is what gets announced; a region inserted already-full is not
            announced reliably. */}
        <div className={styles.coachMark} role="status">
          <AnimatePresence>
            {coachMarkShown && (
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : COACH_MARK_RISE }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: COACH_MARK_OUT }}
                transition={COACH_MARK_IN}
              >
                <ChatBubble tail="top" state="default" neutralText="You’ve got subjects to review!" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MascotSlot size="2XL" />
        <div className={styles.introText}>
          <h1 className={styles.headline}>Invite a friend, you both get $0.50</h1>
          <p className={styles.subcopy}>You both get gift cards from 100+ brands.</p>
        </div>
        <Button variant="primary" size="m">
          Refer
        </Button>
      </section>

      <div className={styles.tools}>
        <div className={styles.pillRow}>
          <Pill variant="scan" />
          <Pill variant="flashcards" />
          <Pill variant="quiz" />
          <Pill variant="summarize" />
        </div>
        <AiChat />
      </div>
    </Scaffold>
  );
}
