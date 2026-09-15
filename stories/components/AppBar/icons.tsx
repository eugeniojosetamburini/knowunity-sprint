// Exact path data from the Voice Review Screen's flow bar (Figma 15783:6710):
// back-icon "arrow-left" (15784:9899) and more-icon "more-horizontal"
// (15784:9774), both 18×18. The baked #F4F2FF stroke matches
// --color-text-primary exactly, so both use currentColor and inherit
// ButtonIcon tertiary's color — same convention as MenuIcons' glyphs.
//
// Screen-local for now: design-system.md's `appBar` (back / progress / more)
// isn't in Storybook yet — see component-gaps.md. When a second Voice Review
// Screen needs this bar, these move with it into stories/components/AppBar.

export function ArrowLeftIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M9 3.7494L3.7494 9L9 14.2506M3.7494 9H14.2506"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MoreHorizontalIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M9 9.7506C9.41417 9.7506 9.74993 9.41455 9.74993 9C9.74993 8.58546 9.41417 8.2494 9 8.2494C8.58583 8.2494 8.25008 8.58546 8.25008 9C8.25008 9.41455 8.58583 9.7506 9 9.7506Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14.2495 9.7506C14.6636 9.7506 14.9994 9.41455 14.9994 9C14.9994 8.58546 14.6636 8.2494 14.2495 8.2494C13.8353 8.2494 13.4996 8.58546 13.4996 9C13.4996 9.41455 13.8353 9.7506 14.2495 9.7506Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3.75053 9.7506C4.1647 9.7506 4.50045 9.41455 4.50045 9C4.50045 8.58546 4.1647 8.2494 3.75053 8.2494C3.33635 8.2494 3.0006 8.58546 3.0006 9C3.0006 9.41455 3.33635 9.7506 3.75053 9.7506Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
