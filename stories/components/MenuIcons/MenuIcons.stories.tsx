import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MenuIcons } from './MenuIcons';

const DESCRIPTION =
  'An icon-only tap target reusing `ButtonIcon` (variant="tertiary", size="m") with a real icon swapped in — the same role buttonIcon\'s own description already covers: "An icon-only tap (close, back, menu) → buttonIcon." USE: the menu/hamburger and alarm/clock entry points in a top bar or home screen bar. DON\'T: pair either icon with a visible text label — that combination is what `button` is for.';

const meta = {
  title: 'Components/MenuIcons',
  component: MenuIcons,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['hamburger', 'clock'] },
  },
} satisfies Meta<typeof MenuIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantHamburger: Story = {
  name: 'variant=hamburger',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    variant: 'hamburger',
  },
};

export const VariantClock: Story = {
  name: 'variant=clock',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    variant: 'clock',
  },
};
