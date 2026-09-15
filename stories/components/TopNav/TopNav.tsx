'use client';

import type { HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import styles from './TopNav.module.css';
import { Badge } from '../Badge/Badge';
import { MenuIcons } from '../MenuIcons/MenuIcons';

export type TopNavProps = {
  /** The recall badge's due-count text, e.g. "4". */
  dueCount: string;
  /**
   * Where tapping the recall badge goes (e.g. "/due-list" from Home). Leave
   * unset on the due list itself, where it has nowhere further to go.
   */
  recallHref?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function TopNav({ dueCount, recallHref, className, ...rest }: TopNavProps) {
  const router = useRouter();

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <MenuIcons variant="hamburger" />
      <div className={styles.badges}>
        <Badge variant="pro" />
        <Badge variant="streak" />
        <Badge variant="fire" />
        <Badge
          variant="recall"
          count={dueCount}
          aria-label="Due for review"
          onClick={recallHref ? () => router.push(recallHref) : undefined}
        />
      </div>
      <MenuIcons variant="clock" />
    </div>
  );
}
