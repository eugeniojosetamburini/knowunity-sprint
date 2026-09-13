import type { Preview } from '@storybook/nextjs-vite'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import '../build/css/tokens.css'
import './preview.css'

// The app is mobile iOS only, 390px wide, dark mode only (docs/design-brief.md).
// This is the story canvas's default screen size; documentation pages ignore
// this and render at full width since they render stories inline, not in the
// sized viewport frame.
const MOBILE_390 = {
  name: 'Mobile (390px)',
  styles: { width: '390px', height: '844px' },
  type: 'mobile',
} as const;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    viewport: {
      options: { mobile390: MOBILE_390, ...INITIAL_VIEWPORTS },
    },

    backgrounds: {
      disable: true, // dark mode only — no light/dark toggle needed
    },
  },

  initialGlobals: {
    viewport: { value: 'mobile390', isRotated: false },
  },
};

export default preview;