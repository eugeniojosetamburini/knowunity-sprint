import { radiusScale } from './tokens-data';

function RadiusBox({
  cssVar,
  label,
  value,
  unit,
  description,
}: {
  cssVar: string;
  label: string;
  value: number;
  unit: string;
  description: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--size-space-200)' }}>
      <div
        style={{
          width: 64,
          height: 64,
          background: 'var(--color-background-surface)',
          border: '1px solid var(--color-border-default)',
          borderRadius: `var(--${cssVar})`,
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-family-default)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-primary)',
        }}
      >
        radius.{label}
      </div>
      <div
        style={{
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
          textAlign: 'center',
          maxWidth: 140,
        }}
      >
        {description}
      </div>
    </div>
  );
}

export function Radius() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--size-space-600)',
        padding: 'var(--size-space-400)',
        background: 'var(--color-background-page)',
      }}
    >
      {radiusScale.map((token) => (
        <RadiusBox
          key={token.cssVar}
          cssVar={token.cssVar}
          label={token.label}
          value={token.value}
          unit={token.unit}
          description={token.description}
        />
      ))}
    </div>
  );
}
