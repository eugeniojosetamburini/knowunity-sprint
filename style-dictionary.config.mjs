import StyleDictionary from 'style-dictionary';

// The token tree in tokens/tokens.json has a top-level grouping
// ("primitive" or "semantic") that exists to organize the source file,
// not to appear in the generated variable name. This transform drops
// that first path segment so `semantic.color.interactive.primary`
// becomes `--color-interactive-primary` instead of
// `--semantic-color-interactive-primary`.
StyleDictionary.registerTransform({
  name: 'name/kebab-no-root',
  type: 'name',
  transform: (token) => token.path.slice(1).join('-'),
});

// Banner written into the top of every generated file, so anyone opening
// build/css/tokens.css knows to edit tokens/tokens.json instead.
StyleDictionary.registerFileHeader({
  name: 'generated/do-not-edit',
  fileHeader: async () => [
    'This file is generated from tokens/tokens.json by Style Dictionary.',
    'Do not edit it by hand — your changes will be overwritten the next',
    'time `npm run tokens` runs. Edit tokens/tokens.json instead.',
  ],
});

export default {
  source: ['tokens/tokens.json'],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/kebab-no-root',
        'time/seconds',
        'html/icon',
        'size/px',
        'color/css',
        'asset/url',
        'fontFamily/css',
        'cubicBezier/css',
        'strokeStyle/css/shorthand',
        'border/css/shorthand',
        'transition/css/shorthand',
        'shadow/css/shorthand',
      ],
      // Only split apart typography tokens (font family/weight/size/line-height/
      // letter-spacing) into separate variables. Color tokens are also stored as
      // an object in tokens/tokens.json, but color/css below already resolves
      // those to a single hex value, so they must not be split too.
      expand: {
        include: (token) => token.$type === 'typography',
        // Style Dictionary's default DTCG mapping treats typography.lineHeight
        // as a unitless "number" (a multiplier of font size). This project's
        // tokens.json instead gives every lineHeight an explicit px dimension
        // (see primitive.font.lineHeight), so it must go through the same
        // size/px transform as fontSize, not be left as a bare number.
        typesMap: {
          typography: { lineHeight: 'dimension' },
        },
      },
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            fileHeader: 'generated/do-not-edit',
          },
        },
      ],
    },
  },
};
