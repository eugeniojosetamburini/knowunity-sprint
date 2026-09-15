'use client';

import { useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { TopNav } from "@/stories/components/TopNav/TopNav";
import { Button } from "@/stories/components/Button/Button";
import { MascotSlot } from "@/stories/components/MascotSlot/MascotSlot";
import { Pill } from "@/stories/components/Pill/Pill";
import { AiChat } from "@/stories/components/AiChat/AiChat";
import { BottomNav } from "@/stories/components/BottomNav/BottomNav";
import { dueCountLabel } from "./due-terms";
import styles from "./page.module.css";

// Home screen — the real Figma frame (home-screen-knowie, 15702:3864), built
// 1:1 from Storybook components. Pill/AiChat taps have nowhere to go (other
// tools, out of scope for this feature) and are left inert; the recall
// badge in TopNav is the hero entry into the due list. The bottom nav's
// chat tab routes back here, matching the due list's wiring.

export default function Home() {
  const router = useRouter();
  return (
    <Scaffold
      topBar={<TopNav dueCount={dueCountLabel} recallHref="/due-list" />}
      bottomNav={<BottomNav onSelectChat={() => router.push('/')} />}
    >
      <section className={styles.intro}>
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
