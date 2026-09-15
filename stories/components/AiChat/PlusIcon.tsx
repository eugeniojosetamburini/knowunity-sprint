// Exact path data from the Figma "aiChat" node's "+" glyph (nested inside
// its buttonIcon instance's Slot, node 15974:6872), recolored via
// currentColor instead of the baked-in #F4F2FF (matches --color-text-primary
// exactly) — same convention as ButtonIcon's own SquareIcon/PlusIcon.
// A separate component from ButtonIcon/PlusIcon.tsx, which that file's own
// header reserves specifically for the voice add-topic glyph (variant=
// "brand", size="xs") at a different viewBox — this one is aiChat's own
// "start a new chat" glyph, 24x24 to match variant="secondary" size="l".
export function PlusIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C12.5523 3 13 3.44772 13 4V11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H13V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H11V4C11 3.44772 11.4477 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
