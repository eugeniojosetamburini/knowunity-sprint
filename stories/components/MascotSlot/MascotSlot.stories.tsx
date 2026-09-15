import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MascotSlot } from './MascotSlot';

const DESCRIPTION =
  'Knowie the mascot. Four sizes only: XL(64) / 2XL(120) / 3XL(200) / 4XL(320). 64×64 is the floor — confirmed there is no smaller variant, so anywhere Knowie appears at ~32-40px (e.g. the chat avatar) is still the XL instance, just displayed smaller, not a separate small asset. USE: every Knowie appearance, big or small, is this one set — there\'s no second "small mascot" component to look for. DON\'T: use Knowie\'s expression or animation as the listening/processing/stuck indicator on its own. It has to keep working with prefers-reduced-motion on and with color stripped out — a facial expression fails both alone.';

const meta = {
  title: 'Components/MascotSlot',
  component: MascotSlot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['XL', '2XL', '3XL', '4XL'] },
  },
} satisfies Meta<typeof MascotSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeXl: Story = {
  name: 'size=XL',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    size: 'XL',
  },
};

export const Size2Xl: Story = {
  name: 'size=2XL',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    size: '2XL',
  },
};

export const Size3Xl: Story = {
  name: 'size=3XL',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    size: '3XL',
  },
};

export const Size4Xl: Story = {
  name: 'size=4XL',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    size: '4XL',
  },
};
