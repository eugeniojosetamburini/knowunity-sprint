'use client';

import { useEffect, useId, useRef, useState, type HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import styles from './AppBar.module.css';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { ProgressIndicator, type ProgressIndicatorProgress } from '../ProgressIndicator/ProgressIndicator';
import { ArrowLeftIcon, MoreHorizontalIcon } from './icons';

// AppBar — the flow-screen top bar: a back arrow, the session's progress
// bar, and the ⋯ menu (design-system.md, "a top bar with one left icon and
// up to two elements on the right"). Every Voice Review Screen uses it:
// Entry/recap, prompt, processing and every result screen.
//
// Purpose-built rather than a generic three-slot container, following
// `TopNav`: the bar's composition is identical on every screen it appears
// on, and only the back destination and the progress value change. That is
// what keeps four screens from drifting apart, which is exactly what
// happened while this was inlined per-screen.
//
// Note on the design-system wording: the bar is a left icon, a *centre*
// progress bar and a right icon, which its "up to two elements on the
// right" description doesn't quite capture. The built bar follows the
// frames; the doc's phrasing is what's imprecise. Flagged, not resolved
// either way.
//
// Goes in Scaffold's topBar slot, which already provides the <header>, so
// this renders a plain <div> and owns only its own padding.

export type AppBarMenuItem = {
  label: string;
  onSelect: () => void;
  /** Destructive items are tinted and announced as the dangerous choice. */
  tone?: 'default' | 'destructive';
};

export type AppBarProps = {
  /** Where the back arrow goes. */
  backHref?: string;
  /** Accessible name for the back arrow — say where it goes, not "back". */
  backLabel?: string;
  /**
   * The session progress, as a term-level value (see progressForTerm in
   * app/due-terms.ts). Omit it on a screen that has a bar but no progress,
   * e.g. the Summary (SPEC.md #10) — the bar then centres nothing and the
   * two icons keep their positions.
   */
  progress?: ProgressIndicatorProgress;
  /**
   * A centred screen title, for a screen that has the bar but no session
   * progress — the Summary (SPEC.md #10, node 15731:3970) is the only one,
   * and its frame puts "Summary" exactly where the other frames put the
   * bar. Mutually exclusive with `progress`: they share the centre slot,
   * and no frame in the flow draws both.
   *
   * Figma sets this text in Greed Standard **Medium** (500). There is no
   * 500 weight anywhere in tokens/tokens.json — only regular, 600 and bold
   * — so it renders at typography.body.s.bold (600), the nearest rung.
   * Flagged, not invented (see AppBar.module.css).
   */
  title?: string;
  /**
   * The ⋯ menu's items (SPEC.md #16, built 2026-09-15). Pass them and ⋯
   * opens a menu anchored under it; leave them off and ⋯ stays the inert
   * tap target it is on screens with nothing to put in it (the entry and
   * Summary screens). The menu lives here rather than on each screen for
   * the same reason the rest of the bar does: four screens carry it, and
   * four copies would drift.
   */
  menuItems?: AppBarMenuItem[];
  /**
   * A bare ⋯ handler, for a screen that wants the tap without a menu.
   * Ignored when `menuItems` is passed.
   */
  onMore?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function AppBar({
  backHref = '/due-list',
  backLabel = 'Back to due list',
  progress,
  title,
  menuItems,
  onMore,
  className,
  ...rest
}: AppBarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);

  // A menu that can't be dismissed without choosing something is a trap, so
  // both the usual escapes work: Escape, and a tap anywhere outside it.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <ButtonIcon
        variant="tertiary"
        size="s"
        icon={<ArrowLeftIcon />}
        aria-label={backLabel}
        onClick={() => router.push(backHref)}
      />
      <div className={styles.progress}>
        {progress && (
          <ProgressIndicator
            variant="primary"
            thickness="24"
            progress={progress}
            aria-label="Review session progress"
          />
        )}
        {!progress && title && <p className={styles.title}>{title}</p>}
      </div>
      <div className={styles.more} ref={menuRef}>
        <ButtonIcon
          variant="tertiary"
          size="s"
          icon={<MoreHorizontalIcon />}
          aria-label="More options"
          aria-haspopup={menuItems ? 'menu' : undefined}
          aria-expanded={menuItems ? menuOpen : undefined}
          aria-controls={menuItems && menuOpen ? menuId : undefined}
          onClick={menuItems ? () => setMenuOpen((open) => !open) : onMore}
        />

        {menuItems && menuOpen && (
          <div className={styles.menu} id={menuId} role="menu">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={[styles.menuItem, item.tone === 'destructive' && styles.destructive]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  setMenuOpen(false);
                  item.onSelect();
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
