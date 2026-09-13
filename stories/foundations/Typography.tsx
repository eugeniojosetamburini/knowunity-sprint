import { typeScale } from './tokens-data';

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function Sample({
  cssPrefix,
  label,
  description,
}: {
  cssPrefix: string;
  label: string;
  description: string;
}) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-border-default)',
        paddingBottom: 'var(--size-space-400)',
        marginBottom: 'var(--size-space-400)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-family-default)',
          fontSize: 'var(--font-size-2xs)',
          color: 'var(--color-text-tertiary)',
          marginBottom: 'var(--size-space-100)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: `var(--${cssPrefix}-fontFamily)`,
          fontWeight: `var(--${cssPrefix}-fontWeight)` as never,
          fontSize: `var(--${cssPrefix}-fontSize)`,
          lineHeight: `var(--${cssPrefix}-lineHeight)`,
          letterSpacing: `var(--${cssPrefix}-letterSpacing)`,
          color: 'var(--color-text-primary)',
        }}
      >
        Knowie explains it
      </div>
      <p
        style={{
          fontFamily: 'var(--font-family-default)',
          fontSize: 'var(--font-size-2xs)',
          color: 'var(--color-text-secondary)',
          marginTop: 'var(--size-space-100)',
        }}
      >
        {description}
      </p>
    </div>
  );
}

export function Typography() {
  const groups = Array.from(new Set(typeScale.map((t) => t.group)));

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
      {groups.map((group) => (
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
            {capitalize(group)}
          </h2>
          {typeScale
            .filter((t) => t.group === group)
            .map((t) => (
              <Sample
                key={t.cssPrefix}
                cssPrefix={t.cssPrefix}
                label={t.label}
                description={t.description}
              />
            ))}
        </section>
      ))}
    </div>
  );
}
