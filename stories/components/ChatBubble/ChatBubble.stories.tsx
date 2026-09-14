import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ChatBubble } from './ChatBubble';

const DESCRIPTION =
  "Knowie's dialogue container, for anything Knowie says or asks. USE: anything Knowie says or asks, in any tone. DON'T: repurpose `textBlock` for this — that's an editable input, this is read-only display, which is exactly the mix-up design-system.md already warns against. Known gap: no Hint state — a hint-ladder nudge currently has nothing between Default and Correct/Incorrect.";

const meta = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: DESCRIPTION,
      },
    },
  },
  argTypes: {
    state: { control: 'select', options: ['default', 'correct', 'incorrect'] },
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StateDefault: Story = {
  name: 'state=Default',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'default',
    neutralText: "Tell me what you remember in your own words — I'll nudge you if you get stuck.",
  },
};

export const StateCorrect: Story = {
  name: 'state=Correct',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'correct',
    correctText: 'Humanism means this and that, maybe a little more detail here.',
  },
};

export const StateIncorrect: Story = {
  name: 'state=Incorrect',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'incorrect',
    incorrectText: 'Not quite, humanism means this and that, but not what you said, and some detail here.',
  },
};
