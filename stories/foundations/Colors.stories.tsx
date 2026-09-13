import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RESPONSIVE_VIEWPORT_VALUE } from 'storybook/viewport';

import { Colors } from './Colors';

// A page of color swatches needs more room than the 390px mobile frame
// every other component story defaults to, so this overrides back to
// full width — same reasoning as documentation pages.
const meta = {
  title: 'Foundations/Colors',
  component: Colors,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    viewport: { value: RESPONSIVE_VIEWPORT_VALUE },
  },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllGroups: Story = {};
