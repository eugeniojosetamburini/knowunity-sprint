import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Scaffold.module.css';

export type ScaffoldProps = {
  /** Slot – Top navigation. A TopNav, or a screen's own progress/back row. It owns its own padding. */
  topBar?: ReactNode;
  /** Slot – Content. Rendered inside <main>, which fills the frame between the two bars. */
  children: ReactNode;
  /** Slot – Bottom nav. Sticky to the viewport bottom so it sits in the same place on every route. */
  bottomNav?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function Scaffold({ topBar, children, bottomNav, className, ...rest }: ScaffoldProps) {
  return (
    <div className={[styles.screen, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.frame}>
        {topBar && <header className={styles.topBar}>{topBar}</header>}
        <main className={styles.main}>{children}</main>
        {bottomNav && <div className={styles.bottomNav}>{bottomNav}</div>}
      </div>
    </div>
  );
}
