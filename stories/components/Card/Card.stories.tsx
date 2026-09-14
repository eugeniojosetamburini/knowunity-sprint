import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';
import { fn } from 'storybook/test';

import { Card } from './Card';
import variationIllustration from '../../../public/images/card-image-variation.png';

const DESCRIPTION =
  "A tappable summary card for a topic or study set — title, quick facts, and an entry point into it. USE: any row in a browsable list of study content. DON'T: add a third meta row. If a third fact is needed, that's a sign the card needs restructuring, not another icon row bolted on. Built from ButtonIcon (variant=\"primary\", size=\"s\") for the menu button slot, per design-system.md. Known gaps: no Pressed state for the row itself, and no empty/loading state for the illustration.";

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  args: {
    onOpenMenu: fn(),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    title: 'Renaissance\nPhilosophy',
    topicCountText: '3 topics',
    durationText: '2-3 minutes',
  },
};

export const CustomIllustration: Story = {
  name: 'Custom illustration (swapped per instance)',
  parameters: {
    docs: {
      description: {
        story:
          'The illustration slot is "a plain image fill, swapped per instance" (design-system.md) — pass any content as children to replace the default illustration.',
      },
    },
  },
  args: {
    title: 'World History',
    topicCountText: '5 topics',
    durationText: '4-5 minutes',
    children: (
      <Image
        src={variationIllustration}
        alt=""
        fill
        sizes="157px"
        style={{ objectFit: 'cover', borderRadius: 'var(--size-radius-400)' }}
      />
    ),
  },
};
