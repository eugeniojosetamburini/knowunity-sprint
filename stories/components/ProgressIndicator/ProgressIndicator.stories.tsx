import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProgressIndicator } from './ProgressIndicator';

const DESCRIPTION =
  'Top-of-screen progress bar. Primary/Coral colors × 24/16 thickness × progress locked to 25% steps (0/25/50/75/100) — no continuous fill. ' +
  "USE: Coral tracks the exam-plan/orange-accented screens; Primary tracks everything else. Pick one per screen based on which surface you're in — don't mix Coral and Primary bars across steps of what should read as a single flow. " +
  "DON'T: hardcode Coral for a feature just because it currently lives inside the exam plan. If the feature moves to a different surface, the color choice should move with it, not stay pinned to where it used to live.";

const meta = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'coral'] },
    thickness: { control: 'select', options: ['16', '24'] },
    progress: { control: 'select', options: ['0', '25', '50', '75', '100'] },
    showText: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryT24P0: Story = {
  name: 'variant=Primary, thickness=24, progress=0',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '24', progress: '0', showText: true },
};

export const PrimaryT24P25: Story = {
  name: 'variant=Primary, thickness=24, progress=25',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '24', progress: '25', showText: true },
};

export const PrimaryT24P50: Story = {
  name: 'variant=Primary, thickness=24, progress=50',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '24', progress: '50', showText: true },
};

export const PrimaryT24P75: Story = {
  name: 'variant=Primary, thickness=24, progress=75',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '24', progress: '75', showText: true },
};

export const PrimaryT24P100: Story = {
  name: 'variant=Primary, thickness=24, progress=100',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '24', progress: '100', showText: true },
};

export const PrimaryT16P0: Story = {
  name: 'variant=Primary, thickness=16, progress=0',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '16', progress: '0' },
};

export const PrimaryT16P25: Story = {
  name: 'variant=Primary, thickness=16, progress=25',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '16', progress: '25' },
};

export const PrimaryT16P50: Story = {
  name: 'variant=Primary, thickness=16, progress=50',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '16', progress: '50' },
};

export const PrimaryT16P75: Story = {
  name: 'variant=Primary, thickness=16, progress=75',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '16', progress: '75' },
};

export const PrimaryT16P100: Story = {
  name: 'variant=Primary, thickness=16, progress=100',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'primary', thickness: '16', progress: '100' },
};

export const CoralT24P0: Story = {
  name: 'variant=Coral, thickness=24, progress=0',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '24', progress: '0', showText: true },
};

export const CoralT24P25: Story = {
  name: 'variant=Coral, thickness=24, progress=25',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '24', progress: '25', showText: true },
};

export const CoralT24P50: Story = {
  name: 'variant=Coral, thickness=24, progress=50',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '24', progress: '50', showText: true },
};

export const CoralT24P75: Story = {
  name: 'variant=Coral, thickness=24, progress=75',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '24', progress: '75', showText: true },
};

export const CoralT24P100: Story = {
  name: 'variant=Coral, thickness=24, progress=100',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '24', progress: '100', showText: true },
};

export const CoralT16P0: Story = {
  name: 'variant=Coral, thickness=16, progress=0',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '16', progress: '0' },
};

export const CoralT16P25: Story = {
  name: 'variant=Coral, thickness=16, progress=25',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '16', progress: '25' },
};

export const CoralT16P50: Story = {
  name: 'variant=Coral, thickness=16, progress=50',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '16', progress: '50' },
};

export const CoralT16P75: Story = {
  name: 'variant=Coral, thickness=16, progress=75',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '16', progress: '75' },
};

export const CoralT16P100: Story = {
  name: 'variant=Coral, thickness=16, progress=100',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { 'aria-label': 'Study session progress', variant: 'coral', thickness: '16', progress: '100' },
};
