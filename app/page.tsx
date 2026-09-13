import Image from "next/image";
import styles from "./page.module.css";

// Due list — the hero entry point into the recall loop (docs/sprint-context.md).
// Static markup only: no client state, no routing yet. Each row is a real
// <button> because it's a genuine tap target once the recall screen exists,
// it just doesn't do anything yet.

const dueTerms = [
  { term: "Mitochondria", topic: "Cell biology", status: "New" },
  { term: "Supply and demand", topic: "Economics", status: "Reviewed 3 days ago" },
  { term: "Newton's second law", topic: "Physics", status: "Reviewed 5 days ago" },
  { term: "Photosynthesis", topic: "Cell biology", status: "Reviewed 1 week ago" },
];

export default function Home() {
  return (
    <div className={styles.screen}>
      <div className={styles.frame}>
        <header className={styles.appBar}>
          <h1 className={styles.appBarTitle}>Due for review</h1>
        </header>

        <main className={styles.content}>
          <section className={styles.intro}>
            <Image
              className={styles.mascot}
              src="/images/mascot-standby.png"
              alt="Knowie"
              width={64}
              height={64}
            />
            <div className={styles.introText}>
              <h2 className={styles.headline}>
                {dueTerms.length} terms are ready to review
              </h2>
              <p className={styles.subcopy}>
                Say each term out loud — Knowie checks how well you know it.
                No time limit, and you can always type instead.
              </p>
            </div>
          </section>

          <ul className={styles.dueList}>
            {dueTerms.map(({ term, topic, status }) => (
              <li key={term}>
                <button className={styles.card} type="button">
                  <span className={styles.cardTitle}>{term}</span>
                  <span className={styles.cardMeta}>
                    <span>{topic}</span>
                    <span className={styles.metaDot} aria-hidden="true" />
                    <span>{status}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
