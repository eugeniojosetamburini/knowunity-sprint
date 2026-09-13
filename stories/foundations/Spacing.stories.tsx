import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RESPONSIVE_VIEWPORT_VALUE } from 'storybook/viewport';

import { Spacing } from './Spacing';

const meta = {
  title: 'Foundations/Spacing',
  component: Spacing,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    viewport: { value: RESPONSIVE_VIEWPORT_VALUE },
  },
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
