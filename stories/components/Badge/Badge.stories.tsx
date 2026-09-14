import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from './Badge';

const RECALL_DESCRIPTION =
  "A small count indicator anchored to a nav icon, signaling something is due without blocking access to it. USE: any corner-icon that needs an at-a-glance number. DON'T: use green for anything except a positive/actionable due-count — it isn't a generic notification color.";

const COMPONENT_DESCRIPTION =
  RECALL_DESCRIPTION +
  ' This Figma component set has four variants: recall (due-count, green), streak (blue), fire (coral), and pro (a static "PRO" wordmark badge with no count). Only "recall" carries its own Figma description; fire/streak/pro follow its same shape and color-pairing convention.';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: COMPONENT_DESCRIPTION,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['recall', 'streak', 'fire', 'pro'] },
    showCount: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RecallShowCountTrue: Story = {
  name: 'variant=recall, showCount=true',
  parameters: { docs: { description: { story: RECALL_DESCRIPTION } } },
  args: { variant: 'recall', showCount: true, count: '5+' },
};

export const RecallShowCountFalse: Story = {
  name: 'variant=recall, showCount=false',
  parameters: {
    docs: {
      description: {
        story:
          RECALL_DESCRIPTION +
          ' Known gap: design-system.md documents showCount=false as rendering "dot-only", but the live Figma component just hides the count text — there is no dot element to fall back on. Built to match the live component, flagging the doc as stale rather than inventing a dot.',
      },
    },
  },
  args: { variant: 'recall', showCount: false },
};

export const VariantStreak: Story = {
  name: 'variant=streak, showCount=true',
  parameters: {
    docs: {
      description: {
        story:
          'No separate Figma description for this variant — it follows `recall`\'s shape (mark + count) with its own color pairing (accent.blue.onSubtle / accent.blue.subtle) and its own default count ("2", matching the Figma example instance).',
      },
    },
  },
  args: { variant: 'streak', showCount: true },
};

export const VariantStreakShowCountFalse: Story = {
  name: 'variant=streak, showCount=false',
  parameters: {
    docs: {
      description: {
        story: 'Same as variant=streak, with the count hidden — leaving just the streak mark.',
      },
    },
  },
  args: { variant: 'streak', showCount: false },
};

export const VariantFire: Story = {
  name: 'variant=fire, showCount=true',
  parameters: {
    docs: {
      description: {
        story:
          'No separate Figma description for this variant — it follows `recall`\'s shape (mark + count) with its own color pairing (accent.coral.bold / accent.coral.onBold) and its own default count ("3", matching the Figma example instance).',
      },
    },
  },
  args: { variant: 'fire', showCount: true },
};

export const VariantFireShowCountFalse: Story = {
  name: 'variant=fire, showCount=false',
  parameters: {
    docs: {
      description: {
        story: 'Same as variant=fire, with the count hidden — leaving just the fire mark.',
      },
    },
  },
  args: { variant: 'fire', showCount: false },
};

export const VariantPro: Story = {
  name: 'variant=pro',
  parameters: {
    docs: {
      description: {
        story:
          'No separate Figma description for this variant, and no count — it\'s a static "PRO" wordmark badge (pro.bold pill, pro.onBold lettering), not a due-count indicator. showCount/count have no effect here.',
      },
    },
  },
  args: { variant: 'pro' },
};
