import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ResultCard } from './ResultCard';

const DESCRIPTION =
  "A post-session outcome breakdown — a percentage, a segmented bar showing correct/partial/incorrect distribution, a legend, and a short written summary. USE: once, at the end of a recall session, to summarize how the student did. DON'T: reuse the segmented bar on its own elsewhere as a generic progress indicator — its three colors (feedback/success/bold, pro/accent, feedback/error/bold) are specific to this outcome breakdown, not a general-purpose multi-part progress pattern.";

const meta = {
  title: 'Components/ResultCard',
  component: ResultCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
} satisfies Meta<typeof ResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    percentage: '50%',
    subtitle: 'Something here',
    correctCount: 2,
    partialCount: 1,
    incorrectCount: 1,
    summary: 'A quick three line review of how the student did this time around.',
  },
};

export const AllUnaided: Story = {
  name: 'All correct, unaided',
  parameters: {
    docs: {
      description: {
        story: 'Every term explained unaided — the bar is a single solid color and the legend collapses the zero-count segments away visually.',
      },
    },
  },
  args: {
    percentage: '100%',
    subtitle: 'Nailed it',
    correctCount: 4,
    partialCount: 0,
    incorrectCount: 0,
    summary: 'Every term explained in your own words, no hints needed. That confidence is earned.',
  },
};
