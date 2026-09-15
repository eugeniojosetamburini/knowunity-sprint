import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import styles from './BottomNav.module.css';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { ChatIcon, SearchIcon, TargetIcon, TrophyIcon } from './icons';
import { Avatar } from './Avatar';

type ClickHandler = ButtonHTMLAttributes<HTMLButtonElement>['onClick'];

export type BottomNavProps = {
  onSelectChat?: ClickHandler;
  onSelectSearch?: ClickHandler;
  onSelectTarget?: ClickHandler;
  onSelectTrophy?: ClickHandler;
  onSelectAvatar?: ClickHandler;
  /** The avatar's photo slot — see Avatar.tsx for why there's no default image. */
  avatar?: ReactNode;
  /** Figma's `chatActive` variant on the myai-chat glyph: true draws it opaque/emphasized, false matches the other three muted tabs. Defaults to true. */
  chatActive?: boolean;
  chatLabel?: string;
  searchLabel?: string;
  targetLabel?: string;
  trophyLabel?: string;
  avatarLabel?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export function BottomNav({
  onSelectChat,
  onSelectSearch,
  onSelectTarget,
  onSelectTrophy,
  onSelectAvatar,
  avatar,
  chatActive = true,
  chatLabel = 'MyAI',
  searchLabel = 'Search',
  targetLabel = 'Target',
  trophyLabel = 'Trophy',
  avatarLabel = 'Profile',
  className,
  ...rest
}: BottomNavProps) {
  return (
    <nav className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <ButtonIcon
        variant="tertiary"
        size="m"
        icon={<ChatIcon active={chatActive} />}
        aria-label={chatLabel}
        onClick={onSelectChat}
      />
      <ButtonIcon variant="tertiary" size="m" icon={<SearchIcon />} aria-label={searchLabel} onClick={onSelectSearch} />
      <ButtonIcon variant="tertiary" size="m" icon={<TargetIcon />} aria-label={targetLabel} onClick={onSelectTarget} />
      <ButtonIcon variant="tertiary" size="m" icon={<TrophyIcon />} aria-label={trophyLabel} onClick={onSelectTrophy} />
      <Avatar aria-label={avatarLabel} onClick={onSelectAvatar}>
        {avatar}
      </Avatar>
    </nav>
  );
}
