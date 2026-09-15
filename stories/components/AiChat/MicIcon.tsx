// Exact path data from the Figma "aiChat" node's mic glyph (node 15974:6841),
// a small solid-fill mic icon distinct from VoiceInput's own MicIcon (an
// outline/stroke glyph drawn at VoiceInput's own 76x76 circle scale — wrong
// shape and wrong scale for this 24px inline context, so not reused).
// Fixed to --color-text-primary (matching the baked-in #F4F2FF exactly)
// rather than currentColor: this icon sits inside aiChat's pill alongside a
// text-secondary label, so it needs its own color independent of the
// button's text color.
export function MicIcon({ size = 24 }: { size?: number }) {
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
        d="M12.0014 2C9.23999 2 7.00141 4.23858 7.00141 7V11C7.00141 13.7614 9.23999 16 12.0014 16C14.7628 16 17.0014 13.7614 17.0014 11V7C17.0014 4.23858 14.7628 2 12.0014 2Z"
        fill="var(--color-text-primary)"
      />
      <path
        d="M5.85459 14.4556C5.55395 13.9924 4.93466 13.8605 4.47138 14.1612C4.00809 14.4618 3.87625 15.0811 4.1769 15.5444C5.30052 17.2758 7.44787 19.5784 11.0014 19.9488V21C11.0014 21.5523 11.4491 22 12.0014 22C12.5537 22 13.0014 21.5523 13.0014 21V19.9488C16.555 19.5784 18.7023 17.2758 19.8259 15.5444C20.1266 15.0811 19.9947 14.4618 19.5314 14.1612C19.0682 13.8605 18.4489 13.9924 18.1482 14.4556C17.1086 16.0576 15.2015 18 12.0014 18C8.80131 18 6.8942 16.0576 5.85459 14.4556Z"
        fill="var(--color-text-primary)"
      />
    </svg>
  );
}
