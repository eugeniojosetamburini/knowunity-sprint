import { colorGroups } from './tokens-data';
import { useTokenValue } from './useTokenValue';

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function Swatch({
  cssVar,
  name,
  description,
}: {
  cssVar: string;
  name: string;
  description: string;
}) {
  const resolved = useTokenValue(cssVar);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--size-space-150)' }}>
      <div
        style={{
          height: 56,
          borderRadius: 'var(--size-radius-150)',
          border: '1px solid var(--color-border-default)',
          background: `var(--${cssVar})`,
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-family-default)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-primary)',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-family-default)',
          fontSize: 'var(--font-size-2xs)',
          color: 'var(--color-text-tertiary)',
        }}
      >
        {resolved || 'Resolving…'}
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

export function Colors() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-space-800)',
        padding: 'var(--size-space-400)',
        background: 'var(--color-background-page)',
      }}
    >
      {colorGroups.map(({ group, tokens }) => (
        <section key={group}>
          <h2
            style={{
              fontFamily: 'var(--font-family-default)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)' as never,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--size-space-300)',
            }}
          >
            {capitalize(group)} colors
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: 'var(--size-space-400)',
            }}
          >
            {tokens.map((token) => (
              <Swatch
                key={token.cssVar}
                cssVar={token.cssVar}
                name={token.name}
                description={token.description}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
