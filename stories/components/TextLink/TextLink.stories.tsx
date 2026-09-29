import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TextLink } from './TextLink';

const DESCRIPTION =
  'The underlined text link — "Type instead", "Use voice instead", "Choose your own topics", "Change review time". USE: a low-emphasis action that sits outside the button hierarchy, where a Secondary button would read as too loud. DON\'T: use it as a screen\'s forward action — that is a Button. It always carries a 44pt tap area; `flush` hands the vertical padding back to the layout for a link whose row is traced from a frame.';

const meta = {
  title: 'Components/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: DESCRIPTION } } },
  argTypes: { flush: { control: 'boolean' } },
  args: { children: 'Type instead' },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { flush: false },
};

export const Flush: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Vertical tap padding handed back to the layout, so the link occupies exactly its text box. Used by the voice screens, where the link sits on a measured row inside the 259px trigger zone.',
      },
    },
  },
  args: { flush: true, children: 'Use voice instead' },
};
