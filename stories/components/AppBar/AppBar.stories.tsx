import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AppBar } from './AppBar';

const DESCRIPTION =
  "The flow-screen top bar: a back arrow, the session's progress bar, and the ⋯ menu (design-system.md, \"a top bar with one left icon and up to two elements on the right\"). USE: in Scaffold's topBar slot on every Voice Review Screen — entry/recap, prompt, processing and the result screens. DON'T: use it on a home-level screen, which has the five-element bar instead (`TopNav`), and don't rebuild the bar inline on a screen — the composition is fixed here so the screens can't drift apart.";

const meta = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // The back arrow and the ⋯ both route via the app router.
    nextjs: { appDirectory: true },
    docs: { description: { component: DESCRIPTION } },
  },
  argTypes: {
    progress: { control: 'select', options: [undefined, '0', '25', '50', '75', '100'] },
  },
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'progress=25 (term 1)',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    progress: '25',
    backHref: '/due-list',
    backLabel: 'Back to due list',
  },
};

export const Term2: Story = {
  name: 'progress=75 (term 2)',
  parameters: {
    docs: {
      description: {
        story:
          'Progress is a property of the term, not of the screen — every screen for a given term shows the same value. See progressForTerm in app/due-terms.ts.',
      },
    },
  },
  args: { progress: '75' },
};

export const NoProgress: Story = {
  name: 'progress omitted',
  parameters: {
    docs: {
      description: {
        story:
          'For a screen that has the bar but no session progress, e.g. the Summary (SPEC.md #10). The progress slot still holds its space, so the back arrow and ⋯ stay exactly where they sit on every other screen in the flow.',
      },
    },
  },
  args: {},
};
