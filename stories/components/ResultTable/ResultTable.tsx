import type { HTMLAttributes } from 'react';

import styles from './ResultTable.module.css';

export type ResultTableDifficulty = 'easy' | 'medium' | 'difficult';

export type ResultTableRow = {
  term: string;
  difficulty: ResultTableDifficulty;
  /** e.g. "Review in 1 week". Free text, since spaced-repetition intervals aren't a fixed enum. */
  dueText: string;
};

const DIFFICULTY_LABEL: Record<ResultTableDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  difficult: 'Difficult',
};

const DEFAULT_ROWS: ResultTableRow[] = [
  { term: 'Humanism', difficulty: 'easy', dueText: 'Review in 1 week' },
  { term: 'Anthropocentrism', difficulty: 'easy', dueText: 'Review in 1 week' },
  { term: 'Link to antiquity', difficulty: 'medium', dueText: 'Review tomorrow' },
  { term: 'Medieval theocentrism', difficulty: 'difficult', dueText: 'Review in 1hr' },
];

export type ResultTableProps = {
  /** One entry per term covered. Defaults to the Figma sample rows. */
  rows?: ResultTableRow[];
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function ResultTable({ rows = DEFAULT_ROWS, className, ...rest }: ResultTableProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      {rows.map((row, index) => (
        <div className={styles.row} key={`${row.term}-${index}`}>
          <div className={styles.info}>
            <p className={styles.term}>{row.term}</p>
            <p className={[styles.difficulty, styles[row.difficulty]].join(' ')}>{DIFFICULTY_LABEL[row.difficulty]}</p>
          </div>
          <span className={styles.duePill}>{row.dueText}</span>
        </div>
      ))}
    </div>
  );
}
