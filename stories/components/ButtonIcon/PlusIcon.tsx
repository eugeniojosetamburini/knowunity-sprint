// Exact path data from the Figma "plus-icon" glyph (node 15809:2706), the
// glyph reserved for the voice add-topic entry point (variant="brand",
// size="xs") — reproduced faithfully and recolored via currentColor.
export function PlusIcon({ size = 16.5 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16.5 16.5"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 7.5V0H7.5V7.5H0V9H7.5V16.5H9V9H16.5V7.5H9Z" fill="currentColor" />
    </svg>
  );
}
