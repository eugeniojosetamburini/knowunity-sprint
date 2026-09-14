// Exact path data from the radio Figma nodes (source SVGs pulled via
// get_design_context on node 15812:6093, then downloaded from their asset
// URLs). Every fill matched a real token exactly, so all are tokenized
// instead of hardcoded — nothing here is invented geometry.

// node 3247:37830 ("check-circle"), reused for Easy/Medium/Difficult — same
// path, different fill per state (feedback.success.bold / accent.coral.onBold /
// feedback.error.onBold), passed in as a CSS variable rather than baking
// three near-identical copies of this icon.
export function CheckCircleIcon({ fill }: { fill: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM17.2071 9.70711C17.5976 9.31658 17.5976 8.68342 17.2071 8.29289C16.8166 7.90237 16.1834 7.90237 15.7929 8.29289L10.5 13.5858L8.20711 11.2929C7.81658 10.9024 7.18342 10.9024 6.79289 11.2929C6.40237 11.6834 6.40237 12.3166 6.79289 12.7071L9.79289 15.7071C10.1834 16.0976 10.8166 16.0976 11.2071 15.7071L17.2071 9.70711Z"
        fill={fill}
      />
    </svg>
  );
}

// node 3248:79346 ("circle"), the Default (unselected) state — two stacked
// fills, same as the Figma source: a base circle in background.surface (so
// it disappears against the Default row's own background.surface fill),
// plus a second identical ring in alpha.light-10 on top to give it a faint
// visible edge. design-system.md already flags this two-fill structure as a
// known fragility, not something introduced here — kept as-is since both
// fills are properly bound to real tokens, matching that note.
export function CircleIcon() {
  const ring =
    'M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d={ring} fill="var(--color-background-surface)" />
      <path d={ring} fill="var(--color-alpha-light-10)" />
    </svg>
  );
}
