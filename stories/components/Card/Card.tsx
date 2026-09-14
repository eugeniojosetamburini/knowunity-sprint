import type { HTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';

import styles from './Card.module.css';
import { TopicIcon, DurationIcon, MenuIcon } from './icons';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import defaultIllustration from '../../../public/images/card-image.png';

export type CardProps = {
  /** Supports an embedded newline for the two-line title look in Figma's default. */
  title?: string;
  topicCountText?: string;
  durationText?: string;
  /** The illustration slot — a plain image fill, swapped per instance. Defaults to the Figma sample illustration. */
  children?: ReactNode;
  /** Called when the card's own row is tapped (not the menu button). */
  onOpenMenu?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'>;

export function Card({
  title = 'Renaissance\nPhilosophy',
  topicCountText = '3 topics',
  durationText = '2-3 minutes',
  children,
  onOpenMenu,
  className,
  ...rest
}: CardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <div className={styles.metaRows}>
          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <TopicIcon />
            </span>
            <span className={styles.metaText}>{topicCountText}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <DurationIcon />
            </span>
            <span className={styles.metaText}>{durationText}</span>
          </div>
        </div>
        <ButtonIcon
          variant="primary"
          size="s"
          icon={<MenuIcon />}
          aria-label="More options"
          onClick={onOpenMenu}
        />
      </div>
      <div className={styles.illustrationSlot}>
        {children ?? (
          <Image src={defaultIllustration} alt="" className={styles.illustration} fill sizes="157px" />
        )}
      </div>
    </div>
  );
}
