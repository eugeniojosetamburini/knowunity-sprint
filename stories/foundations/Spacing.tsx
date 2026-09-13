import { spacingScale } from './tokens-data';

function Bar({
  label,
  value,
  unit,
  description,
}: {
  label: string;
  value: number;
  unit: string;
  description: string;
}) {
  const isNegative = value < 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-space-400)' }}>
      <div
        style={{
          width: 96,
          flexShrink: 0,
          fontFamily: 'var(--font-family-default)',
          fontSize: 'var(--font-size-2xs)',
          color: 'var(--color-text-primary)',
        }}
      >
        space.{label}
      </div>
      <div
        style={{
          height: 16,
          width: Math.abs(value),
          minWidth: value === 0 ? 1 : undefined,
          background: isNegative ? 'transparent' : 'var(--color-accent-brand-bold)',
          border: isNegative ? '1px dashed var(--color-border-strong)' : undefined,
          borderRadius: 'var(--size-radius-100)',
          flexShrink: 0,
        }}
      />
      <div
        style={{
          width: 64,
          flexShrink: 0,
          fontFamily: 'var(--font-family-default)',
          fontSize: 'var(--font-size-2xs)',
          color: 'var(--color-text-tertiary)',
        }}
      >
        {value}
        {unit}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-family-default)',
          fontSize: 'var(--font-size-2xs)',
          color: 'var(--color-text-secondary)',
        }}
      >
        {description}
      </div>
    </div>
  );
}

export function Spacing() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-space-300)',
        padding: 'var(--size-space-400)',
        background: 'var(--color-background-page)',
      }}
    >
      {spacingScale.map((token) => (
        <Bar
          key={token.cssVar}
          label={token.label}
          value={token.value}
          unit={token.unit}
          description={token.description}
        />
      ))}
    </div>
  );
}
