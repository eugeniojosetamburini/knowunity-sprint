import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Pill.module.css';
import { ScanIcon, FlashcardsIcon, QuizIcon, SummarizeIcon } from './icons';

export type PillVariant = 'scan' | 'flashcards' | 'quiz' | 'summarize';

const CONTENT: Record<PillVariant, { icon: ReactNode; label: string }> = {
  scan: { icon: <ScanIcon />, label: 'Scan' },
  flashcards: { icon: <FlashcardsIcon />, label: 'Flashcards' },
  quiz: { icon: <QuizIcon />, label: 'Quiz' },
  summarize: { icon: <SummarizeIcon />, label: 'Summarize' },
};

export type PillProps = {
  variant?: PillVariant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Pill({ variant = 'scan', className, type = 'button', ...rest }: PillProps) {
  const { icon, label } = CONTENT[variant];

  return (
    <button type={type} className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
