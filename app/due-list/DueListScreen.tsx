'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Scaffold } from "@/stories/components/Scaffold/Scaffold";
import { TopNav } from "@/stories/components/TopNav/TopNav";
import { Card } from "@/stories/components/Card/Card";
import { MascotSlot } from "@/stories/components/MascotSlot/MascotSlot";
import { BottomNav } from "@/stories/components/BottomNav/BottomNav";
import { dueTopics, dueCountLabel, topicCountText } from "../due-terms";
import variationIllustration from "../../public/images/card-image-variation.png";
import styles from "./page.module.css";

// Due list — the Figma frame "Direction C1 – Due list, delinearized" (node
// 15734:4996), matched 1:1: two cards with the frame's own content and its
// two illustrations (data in app/due-terms.ts), "Hey John", the mascot slot,
// the underlined footer link, and a bottom nav with the chat tab inactive
// (the frame's myai-chat glyph is muted here, unlike Home's).
//
// **All caught up (SPEC.md #2a) — `?caughtUp=1`, no Figma frame.** Where the
// last topic's Summary lands, since there is no next topic to chain into.
// Composed from the brief, not traced: the bars, the greeting and the
// footer link stay exactly where the list puts them, the cards are replaced
// by a short reassurance line, and the recall badge clears to "0". The
// query-param entry lets the state be presented without having to walk a
// whole session first. (The pattern came from the entry screen's old
// `?mic=denied`, dropped 2026-09-15 with that screen's denied state, so
// this is now the only query-param state in the prototype.)
// Everything decided here is listed in the build notes — nothing about this
// state is drawn anywhere.
//
// The flag arrives as a prop rather than from `useSearchParams` because
// this route is statically prerendered: reading the hook here fails the
// build unless the whole screen is wrapped in a Suspense boundary. Next's
// own guidance is to read the Page's `searchParams` prop instead and pass
// it down, which `page.tsx` does. (The entry screen gets away with
// `useSearchParams` only because its route is dynamic.)

export function DueListScreen({ caughtUp }: { caughtUp: boolean }) {
  const router = useRouter();

  return (
    <Scaffold
      topBar={<TopNav dueCount={caughtUp ? "0" : dueCountLabel} />}
      bottomNav={<BottomNav chatActive={false} onSelectChat={() => router.push('/')} />}
    >
      <div className={styles.content}>
        <div className={styles.greeting}>
          <p className={styles.greetingText}>Hey John</p>
          <h1 className={styles.headline}>
            {caughtUp ? "You’re all caught up" : "Let’s review what you’ve learned so far"}
          </h1>
        </div>

        {caughtUp && (
          <p className={styles.caughtUpBody}>
            Nothing is due right now. Come back tomorrow, or pick a topic to review early.
          </p>
        )}

        {!caughtUp && (
        <ul className={styles.topicList}>
          {dueTopics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/recap/${topic.id}`} className={styles.cardLink}>
                <Card
                  title={topic.title}
                  topicCountText={topicCountText(topic)}
                  durationText={topic.durationText}
                >
                  {topic.illustration === "variation" ? (
                    // Card's documented illustration swap (see its "Custom
                    // illustration" story): the slot is a plain image fill.
                    <Image
                      src={variationIllustration}
                      alt=""
                      fill
                      sizes="157px"
                      style={{ objectFit: "cover", borderRadius: "var(--size-radius-400)" }}
                    />
                  ) : undefined}
                </Card>
              </Link>
            </li>
          ))}
        </ul>
        )}

        <div className={styles.closing}>
          <MascotSlot size="XL" />
          {/* Real tap target per docs/sprint-context.md; no on-demand topic
              picker screen exists yet, so it has nowhere to navigate to. */}
          <button type="button" className={styles.chooseOwnLink}>
            Choose your own topics
          </button>
        </div>
      </div>
    </Scaffold>
  );
}
