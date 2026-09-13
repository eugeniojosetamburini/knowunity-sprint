import { useEffect, useState } from 'react';

// Reads the actual resolved value of a CSS custom property from the
// generated build/css/tokens.css (already loaded in .storybook/preview.tsx),
// rather than re-deriving it from tokens.json — so what's shown is exactly
// what the browser will paint.
export function useTokenValue(cssVar: string): string {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement).getPropertyValue(`--${cssVar}`).trim()
    );
  }, [cssVar]);

  return value;
}
