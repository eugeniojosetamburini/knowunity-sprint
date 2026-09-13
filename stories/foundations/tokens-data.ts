// Reads tokens/tokens.json directly (the single source of truth) and
// derives everything these foundation stories need: which CSS custom
// property each token resolves to, and its $description if it has one.
//
// The CSS variable name for any token is its path with the first
// segment ("primitive" or "semantic") dropped and the rest joined with
// "-" — this mirrors the `name/kebab-no-root` transform registered in
// style-dictionary.config.mjs, so a var name computed here always
// matches the one actually emitted into build/css/tokens.css.
import tokens from '../../tokens/tokens.json';

type TokenNode = {
  $value?: unknown;
  $description?: string;
};

const NO_DESCRIPTION = 'No description in tokens.json.';

function isLeaf(node: unknown): node is TokenNode {
  return typeof node === 'object' && node !== null && '$value' in node;
}

function walkLeaves(
  node: Record<string, unknown>,
  path: string[],
  onLeaf: (path: string[], leaf: TokenNode) => void
) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    const nextPath = [...path, key];
    if (isLeaf(value)) {
      onLeaf(nextPath, value);
    } else if (typeof value === 'object' && value !== null) {
      walkLeaves(value as Record<string, unknown>, nextPath, onLeaf);
    }
  }
}

// ---- Colors: every semantic.color.* leaf, grouped by its first segment ----

export type ColorToken = {
  cssVar: string;
  name: string; // dotted token name, e.g. "accent.blue.bold"
  description: string;
};

export type ColorGroup = {
  group: string;
  tokens: ColorToken[];
};

function buildColorGroups(): ColorGroup[] {
  const byGroup = new Map<string, ColorToken[]>();
  walkLeaves(
    tokens.semantic.color as unknown as Record<string, unknown>,
    ['color'],
    (path, leaf) => {
      const group = path[1];
      const list = byGroup.get(group) ?? [];
      list.push({
        cssVar: path.join('-'),
        name: path.slice(1).join('.'),
        description: leaf.$description ?? NO_DESCRIPTION,
      });
      byGroup.set(group, list);
    }
  );
  return Array.from(byGroup.entries()).map(([group, list]) => ({
    group,
    tokens: list,
  }));
}

export const colorGroups: ColorGroup[] = buildColorGroups();

// ---- Type scale: every semantic.typography.* leaf, in tokens.json order ----

export type TypeToken = {
  cssPrefix: string; // e.g. "typography-display-l" (before -fontSize etc.)
  group: string;
  label: string;
  description: string;
};

function buildTypeScale(): TypeToken[] {
  const result: TypeToken[] = [];
  walkLeaves(
    tokens.semantic.typography as unknown as Record<string, unknown>,
    ['typography'],
    (path, leaf) => {
      result.push({
        cssPrefix: path.join('-'),
        group: path[1],
        label: path.slice(2).join(' ').toUpperCase(),
        description: leaf.$description ?? NO_DESCRIPTION,
      });
    }
  );
  return result;
}

export const typeScale: TypeToken[] = buildTypeScale();

// ---- Spacing scale: primitive.size.space, sorted by value ----

export type SizeToken = {
  cssVar: string;
  label: string;
  value: number;
  unit: string;
  description: string;
};

function buildSizeScale(node: Record<string, unknown>, prefix: string[]): SizeToken[] {
  const result: SizeToken[] = [];
  walkLeaves(node, prefix, (path, leaf) => {
    const dimension = leaf.$value as { value: number; unit: string };
    result.push({
      cssVar: path.join('-'),
      label: path.slice(prefix.length).join('-'),
      value: dimension.value,
      unit: dimension.unit,
      description: leaf.$description ?? NO_DESCRIPTION,
    });
  });
  return result.sort((a, b) => a.value - b.value);
}

export const spacingScale: SizeToken[] = buildSizeScale(
  tokens.primitive.size.space as unknown as Record<string, unknown>,
  ['size', 'space']
);

// ---- Radius scale: primitive.size.radius, sorted by value ----

export const radiusScale: SizeToken[] = buildSizeScale(
  tokens.primitive.size.radius as unknown as Record<string, unknown>,
  ['size', 'radius']
);
