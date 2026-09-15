import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TopNav } from './TopNav';

const DESCRIPTION =
  "The home-level five-element bar: hamburger menu, PRO / streak / fire badges, the recall due-count badge, and the alarm icon. Sits in Scaffold's top-navigation slot on Home and Due list. USE: home-level screens only — design-system.md's appBar covers flow screens (one left icon, up to two right elements) and explicitly excludes this bar from appBar's own layouts. DON'T: reach for this on a flow screen (recap, recording, result) — those use appBar's progress/back pattern, not badges.";

const meta = {
  title: 'Components/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // TopNav calls next/navigation's useRouter (app router); Storybook's
    // nextjs-vite framework only mounts that mock when told it's app-dir code.
    nextjs: { appDirectory: true },
    docs: { description: { component: DESCRIPTION } },
  },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Due list (recall badge inert)',
  parameters: { docs: { description: { story: DESCRIPTION } } },
  args: { dueCount: '4' },
};

export const WithRecallLink: Story = {
  name: 'Home (recall badge navigates)',
  parameters: {
    docs: { description: { story: 'On Home the recall badge is the hero entry into the due list (docs/sprint-context.md). recallHref makes it navigate; on the due list itself it is left unset.' } },
  },
  args: { dueCount: '4', recallHref: '/due-list' },
};
