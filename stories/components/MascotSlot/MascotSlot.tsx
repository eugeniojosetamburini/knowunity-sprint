import Image, { type StaticImageData } from 'next/image';
import type { HTMLAttributes } from 'react';

import styles from './MascotSlot.module.css';
import mascotTiny from '../../../public/images/mascotSlot-tiny.png';
import mascotStandard from '../../../public/images/mascotSlot.png';

export type MascotSlotSize = 'XL' | '2XL' | '3XL' | '4XL';

export type MascotSlotProps = {
  size?: MascotSlotSize;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const IMAGE: Record<MascotSlotSize, StaticImageData> = {
  XL: mascotTiny,
  '2XL': mascotStandard,
  '3XL': mascotStandard,
  '4XL': mascotStandard,
};

const SIZE_CLASS: Record<MascotSlotSize, string> = {
  XL: styles.sizeXl,
  '2XL': styles.size2xl,
  '3XL': styles.size3xl,
  '4XL': styles.size4xl,
};

export function MascotSlot({ size = 'XL', className, ...rest }: MascotSlotProps) {
  return (
    <div className={[styles.root, SIZE_CLASS[size], className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.base}>
        <div className={styles.imageWrap}>
          <Image src={IMAGE[size]} alt="" fill sizes="320px" className={styles.image} />
        </div>
      </div>
    </div>
  );
}
