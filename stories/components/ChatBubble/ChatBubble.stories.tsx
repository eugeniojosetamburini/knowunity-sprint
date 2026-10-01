import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ChatBubble } from './ChatBubble';

const DESCRIPTION =
  "Knowie's dialogue container, for anything Knowie says or asks. USE: anything Knowie says or asks, in any tone. DON'T: repurpose `textBlock` for this — that's an editable input, this is read-only display, which is exactly the mix-up design-system.md already warns against. Known gap: no Hint state — a hint-ladder nudge currently has nothing between Default and Correct/Incorrect/Partial.";

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
    state: { control: 'select', options: ['default', 'correct', 'incorrect', 'partial'] },
    tail: { control: 'inline-radio', options: ['left', 'top'] },
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

export const StatePartial: Story = {
  name: 'state=Partial',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: {
    state: 'partial',
    partialText: 'You got this and that right, but something else is missing. Would you like me to share a hint?',
  },
};

export const TailTop: Story = {
  name: 'tail=top (the Home coach mark)',
  parameters: {
    docs: {
      description: {
        story:
          "The tail on the bubble's top edge, pointing up at whatever the bubble is talking about — Figma's Home coach mark (16615:4178), which is the same tail frame rotated −90°. Home aims it at the recall badge in the top nav by setting --chat-bubble-tail-inset from its own CSS module; left unset here, so the tail sits centred.",
      },
    },
  },
  args: {
    state: 'default',
    tail: 'top',
    neutralText: 'You\u2019ve got subjects to review!',
  },
};
