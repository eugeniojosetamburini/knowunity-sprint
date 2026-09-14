import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ResultTable } from './ResultTable';

const DESCRIPTION =
  "A post-session breakdown of every term covered — how hard it was, and when it's due again. USE: the reference list at the end of a recall session, one row per term. DON'T: hand-set row borders per row — that's fragile if rows get reordered or the list length changes; the divider between rows should be handled by the list structure, not baked into each row individually.";

const meta = {
  title: 'Components/ResultTable',
  component: ResultTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
} satisfies Meta<typeof ResultTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    rows: [
      { term: 'Humanism', difficulty: 'easy', dueText: 'Review in 1 week' },
      { term: 'Anthropocentrism', difficulty: 'easy', dueText: 'Review in 1 week' },
      { term: 'Link to antiquity', difficulty: 'medium', dueText: 'Review tomorrow' },
      { term: 'Medieval theocentrism', difficulty: 'difficult', dueText: 'Review in 1hr' },
    ],
  },
};

export const SingleTerm: Story = {
  name: 'Single row',
  parameters: {
    docs: {
      description: {
        story: 'A one-term session — the shortest list this component has to render (the brief\'s floor is three to five terms).',
      },
    },
  },
  args: {
    rows: [{ term: 'Humanism', difficulty: 'difficult', dueText: 'Review in 1hr' }],
  },
};
