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

export default function DueList() {
  const router = useRouter();
  return (
    <Scaffold topBar={<TopNav dueCount={dueCountLabel} />} bottomNav={<BottomNav chatActive={false} onSelectChat={() => router.push('/')} />}>
      <div className={styles.content}>
        <div className={styles.greeting}>
          <p className={styles.greetingText}>Hey John</p>
          <h1 className={styles.headline}>Let&rsquo;s review what you&rsquo;ve learned so far</h1>
        </div>

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
