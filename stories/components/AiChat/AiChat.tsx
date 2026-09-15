import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import styles from './AiChat.module.css';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { PlusIcon } from './PlusIcon';
import { MicIcon } from './MicIcon';

export type AiChatProps = {
  /** The pill's placeholder-styled label. */
  label?: string;
  /** Accessible name for the "+" button. */
  newChatLabel?: string;
  /** Called when the "+" button is tapped — starts a new chat. */
  onNewChat?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  /** Called when the pill itself is tapped — opens the chat/query input. The mic glyph is decorative, not a second tap target (matches Figma: it's a plain icon inside the pill, not its own buttonIcon instance). */
  onOpenChat?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function AiChat({
  label = 'Ask anything',
  newChatLabel = 'New chat',
  onNewChat,
  onOpenChat,
  className,
  ...rest
}: AiChatProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <ButtonIcon variant="secondary" size="l" icon={<PlusIcon />} aria-label={newChatLabel} onClick={onNewChat} />
      <button type="button" className={styles.pill} onClick={onOpenChat}>
        <span className={styles.label}>{label}</span>
        <MicIcon />
      </button>
    </div>
  );
}
