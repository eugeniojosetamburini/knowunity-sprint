import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RESPONSIVE_VIEWPORT_VALUE } from 'storybook/viewport';

import { Radius } from './Radius';

const meta = {
  title: 'Foundations/Radius',
  component: Radius,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    viewport: { value: RESPONSIVE_VIEWPORT_VALUE },
  },
} satisfies Meta<typeof Radius>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
