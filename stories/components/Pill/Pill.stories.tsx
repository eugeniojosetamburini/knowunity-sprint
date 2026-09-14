import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Pill } from './Pill';

const DESCRIPTION =
  'A tappable content-type entry point, built from the design system\'s `chips` shape (the Figma layer behind each variant is named "chips"; "pill" is just the name of the frame grouping these four instances). USE: the four fixed entry points into a study mode — Scan, Flashcards, Quiz, Summarize. DON\'T: reuse this for a generic filter or tag — that\'s `chips` with its own Primary/pro colors, not this fixed four-variant set.';

const meta = {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['scan', 'flashcards', 'quiz', 'summarize'] },
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantScan: Story = {
  name: 'variant=scan',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { variant: 'scan' },
};

export const VariantFlashcards: Story = {
  name: 'variant=flashcards',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { variant: 'flashcards' },
};

export const VariantQuiz: Story = {
  name: 'variant=quiz',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { variant: 'quiz' },
};

export const VariantSummarize: Story = {
  name: 'variant=summarize',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { variant: 'summarize' },
};
