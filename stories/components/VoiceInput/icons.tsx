// Exact path data from the voiceInput Figma nodes (source SVGs pulled via
// get_design_context on node 15810:5640, then downloaded from their asset
// URLs). Every fill/stroke that matched a real token is tokenized below;
// nothing here is invented geometry.

// node 15785:9991/9994 ("voiceCircleInner"), the mic glyph only — the
// circle it sits in is drawn as a plain div in VoiceInput.module.css
// (background.floating), same reasoning ChatBubble's tail comment gives for
// preferring CSS over a re-exported asset when the shape is a plain fill.
// viewBox is the source asset's own 76x76 box (matching size.illustration.950,
// the inner circle's diameter) — width/height are 100% so the glyph renders
// at that same native scale inside the circle, not shrunk to an icon-scale box.
export function MicIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 76 76" fill="none" aria-hidden="true" focusable="false">
      <path
        id="micIcon"
        d="M38 47.3341V51.3344M28.6656 35.3331V38C28.6656 40.4756 29.649 42.8497 31.3996 44.6002C33.1501 46.3507 35.5244 47.3341 38 47.3341C40.4756 47.3341 42.8499 46.3507 44.6004 44.6002C46.351 42.8497 47.3344 40.4756 47.3344 38V35.3331M38 24.6656C40.2094 24.6656 42.0005 26.4566 42.0005 28.6659V38C42.0005 40.2093 40.2094 42.0003 38 42.0003C35.7906 42.0003 33.9995 40.2093 33.9995 38V28.6659C33.9995 26.4566 35.7906 24.6656 38 24.6656Z"
        stroke="var(--color-text-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// node 15785:9999 ("micButtonCore"), the Listening state's full visual —
// gradient fill, three drop-shadow glow layers, and the waveformMark bars.
// The gradient stops and bar fill are real tokens (voice.listening,
// accent.brand.bold, text.primary). The three drop-shadow layers' color
// (rgb(232,121,192), i.e. voice.listening) is tokenized too; their alpha
// steps (0.4/0.2/0.1) have no matching token in tokens.json and are kept
// raw here, same as this file's box-shadow precedent in Button.module.css.
export function MicButtonCoreIcon() {
  return (
    <svg
      width="182"
      height="184"
      viewBox="0 0 182 184"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#voiceInputListeningGlow)">
        <rect
          x="35"
          y="35"
          width="112"
          height="114"
          rx="56"
          fill="url(#voiceInputListeningGradient)"
          shapeRendering="crispEdges"
        />
        <g id="waveformMark">
          <path
            d="M70.3333 86C70.3333 84.8954 71.2287 84 72.3333 84C73.4379 84 74.3333 84.8954 74.3333 86V98C74.3333 99.1046 73.4379 100 72.3333 100C71.2287 100 70.3333 99.1046 70.3333 98V86Z"
            fill="var(--color-text-primary)"
          />
          <path
            d="M79.6666 80.6667C79.6666 79.5621 80.5621 78.6667 81.6666 78.6667C82.7712 78.6667 83.6666 79.5621 83.6666 80.6667V103.333C83.6666 104.438 82.7712 105.333 81.6666 105.333C80.5621 105.333 79.6666 104.438 79.6666 103.333V80.6667Z"
            fill="var(--color-text-primary)"
          />
          <path
            d="M89 75.3333C89 74.2288 89.8954 73.3333 91 73.3333C92.1045 73.3333 93 74.2288 93 75.3333V108.667C93 109.771 92.1045 110.667 91 110.667C89.8954 110.667 89 109.771 89 108.667V75.3333Z"
            fill="var(--color-text-primary)"
          />
          <path
            d="M98.3333 80.6667C98.3333 79.5621 99.2287 78.6667 100.333 78.6667C101.438 78.6667 102.333 79.5621 102.333 80.6667V103.333C102.333 104.438 101.438 105.333 100.333 105.333C99.2287 105.333 98.3333 104.438 98.3333 103.333V80.6667Z"
            fill="var(--color-text-primary)"
          />
          <path
            d="M107.667 86C107.667 84.8954 108.562 84 109.667 84C110.771 84 111.667 84.8954 111.667 86V98C111.667 99.1046 110.771 100 109.667 100C108.562 100 107.667 99.1046 107.667 98V86Z"
            fill="var(--color-text-primary)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="voiceInputListeningGlow"
          x="0"
          y="0"
          width="182"
          height="184"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="17.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.909804 0 0 0 0 0.47451 0 0 0 0 0.752941 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="7.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.909804 0 0 0 0 0.47451 0 0 0 0 0.752941 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="5.33333" />
          <feGaussianBlur stdDeviation="10.6667" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.909804 0 0 0 0 0.47451 0 0 0 0 0.752941 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="voiceInputListeningGradient"
          x1="91"
          y1="35"
          x2="91"
          y2="149"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-voice-listening)" />
          <stop offset="1" stopColor="var(--color-accent-brand-bold)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
