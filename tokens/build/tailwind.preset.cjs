// tailwind.preset.cjs —— 由 scripts/build-tokens.mjs 生成
// 在 docs 站的 tailwind.config 里 `presets: [require('@/tokens/build/tailwind.preset.cjs')]` 引入。
module.exports = {
  theme: {
    extend: {
      colors: {
  "bg-0": "var(--bg-0)",
  "bg-1": "var(--bg-1)",
  "bg-2": "var(--bg-2)",
  "bg-base": "var(--bg-base)",
  "bg-0-lighter": "var(--bg-0-lighter)",
  "title": "var(--title)",
  "paragraph": "var(--paragraph)",
  "description": "var(--description)",
  "disabled": "var(--disabled)",
  "placeholder": "var(--placeholder)",
  "link": "var(--link)",
  "link-accent": "var(--link-accent)",
  "fill-1": "var(--fill-1)",
  "fill-2": "var(--fill-2)",
  "fill-3": "var(--fill-3)",
  "fill-4": "var(--fill-4)",
  "fill-5": "var(--fill-5)",
  "inverted-fill-1": "var(--inverted-fill-1)",
  "inverted-fill-2": "var(--inverted-fill-2)",
  "inverted-fill-3": "var(--inverted-fill-3)",
  "inverted-fill-4": "var(--inverted-fill-4)",
  "inverted-fill-5": "var(--inverted-fill-5)",
  "separator-2": "var(--separator-2)",
  "separator-base": "var(--separator-base)",
  "separator-opaque": "var(--separator-opaque)",
  "xhs-red": "var(--xhs-red)",
  "xhs-red-soft": "var(--xhs-red-soft)",
  "warning": "var(--warning)",
  "warning-soft": "var(--warning-soft)",
  "success": "var(--success)",
  "success-soft": "var(--success-soft)",
  "info": "var(--info)",
  "info-soft": "var(--info-soft)",
  "neutral-white": "var(--neutral-white)",
  "neutral-black": "var(--neutral-black)",
  "dots-accent-surface": "var(--dots-accent-surface)",
  "dots-accent-text": "var(--dots-accent-text)",
  "dots-accent-fill": "var(--dots-accent-fill)",
  "dots-accent-border-subtle": "var(--dots-accent-border-subtle)",
  "dots-accent-border": "var(--dots-accent-border)",
  "dots-accent-icon-muted": "var(--dots-accent-icon-muted)",
  "dots-accent-highlight": "var(--dots-accent-highlight)",
  "mask-bg": "var(--mask-bg)",
  "light-title": "var(--light-title)",
  "light-paragraph": "var(--light-paragraph)",
  "light-description": "var(--light-description)",
  "light-disabled": "var(--light-disabled)",
  "light-fill-1": "var(--light-fill-1)",
  "light-fill-2": "var(--light-fill-2)",
  "light-fill-3": "var(--light-fill-3)",
  "light-fill-4": "var(--light-fill-4)",
  "light-fill-5": "var(--light-fill-5)",
  "light-separator": "var(--light-separator)",
  "light-separator-2": "var(--light-separator-2)",
  "dark-title": "var(--dark-title)",
  "dark-paragraph": "var(--dark-paragraph)",
  "dark-description": "var(--dark-description)",
  "dark-disabled": "var(--dark-disabled)",
  "dark-fill-1": "var(--dark-fill-1)",
  "dark-fill-2": "var(--dark-fill-2)",
  "dark-fill-3": "var(--dark-fill-3)",
  "dark-fill-4": "var(--dark-fill-4)",
  "dark-fill-5": "var(--dark-fill-5)",
  "dark-separator": "var(--dark-separator)",
  "dark-separator-2": "var(--dark-separator-2)",
  "always-white": "var(--always-white)",
  "always-black": "var(--always-black)",
  "always-media-overlay": "var(--always-media-overlay)",
  "always-video-control-overlay": "var(--always-video-control-overlay)",
  "always-video-duration-shadow": "var(--always-video-duration-shadow)",
  "legacy-accent-yellow": "var(--legacy-accent-yellow)",
  "legacy-accent-green": "var(--legacy-accent-green)",
  "legacy-accent-pink": "var(--legacy-accent-pink)",
  "legacy-accent-brown": "var(--legacy-accent-brown)",
  "legacy-accent-event-blue": "var(--legacy-accent-event-blue)",
  "legacy-deco-teal": "var(--legacy-deco-teal)",
  "legacy-deco-sky": "var(--legacy-deco-sky)",
  "legacy-deco-lavender": "var(--legacy-deco-lavender)",
  "legacy-deco-sage": "var(--legacy-deco-sage)",
  "legacy-deco-rose": "var(--legacy-deco-rose)"
},
      spacing: {
  "1": "var(--space-1)",
  "2": "var(--space-2)",
  "3": "var(--space-3)",
  "4": "var(--space-4)",
  "5": "var(--space-5)",
  "6": "var(--space-6)",
  "7": "var(--space-7)",
  "8": "var(--space-8)",
  "9": "var(--space-9)",
  "10": "var(--space-10)"
},
      borderRadius: {
  "bubble": "var(--radius-bubble)",
  "ai-card": "var(--radius-ai-card)",
  "inner-card": "var(--radius-inner-card)",
  "tag": "var(--radius-tag)",
  "input": "var(--radius-input)",
  "option": "var(--radius-option)",
  "cta": "var(--radius-cta)",
  "input-container": "var(--radius-input-container)",
  "sheet": "var(--radius-sheet)",
  "community-card": "var(--radius-community-card)",
  "avatar": "var(--radius-avatar)",
  "small": "var(--radius-small)",
  "medium": "var(--radius-medium)",
  "large": "var(--radius-large)",
  "xlarge": "var(--radius-x-large)",
  "full": "var(--radius-full)"
},
      fontSize: {
  "rich-h1": [
    "20pt",
    {
      "lineHeight": "34pt",
      "fontWeight": "600"
    }
  ],
  "rich-h2": [
    "18pt",
    {
      "lineHeight": "31pt",
      "fontWeight": "600"
    }
  ],
  "rich-h3": [
    "17pt",
    {
      "lineHeight": "29pt",
      "fontWeight": "600"
    }
  ],
  "rich-h4": [
    "16pt",
    {
      "lineHeight": "27pt",
      "fontWeight": "600"
    }
  ],
  "rich-paragraph": [
    "16pt",
    {
      "lineHeight": "27pt",
      "fontWeight": "400"
    }
  ],
  "rich-table": [
    "14pt",
    {
      "lineHeight": "24pt",
      "fontWeight": "400"
    }
  ],
  "dialog-bubble": [
    "16px",
    {
      "lineHeight": "1.69em",
      "fontWeight": "400"
    }
  ],
  "dialog-input": [
    "16px",
    {
      "lineHeight": "48px",
      "fontWeight": "400"
    }
  ],
  "dialog-time": [
    "13px",
    {
      "lineHeight": "18px",
      "fontWeight": "400"
    }
  ],
  "community-card-title": [
    "14px",
    {
      "lineHeight": "20px",
      "fontWeight": "500"
    }
  ],
  "media-note-meta": [
    "12px",
    {
      "lineHeight": "18px",
      "fontWeight": "400"
    }
  ],
  "media-note-title-compact": [
    "12px",
    {
      "lineHeight": "18px",
      "fontWeight": "500"
    }
  ],
  "media-note-meta-compact": [
    "10px",
    {
      "lineHeight": "14px",
      "fontWeight": "400"
    }
  ],
  "media-video-author": [
    "12px",
    {
      "lineHeight": "18px",
      "fontWeight": "400"
    }
  ],
  "media-video-duration": [
    "11px",
    {
      "lineHeight": "16px",
      "fontWeight": "500"
    }
  ],
  "support": [
    "12px",
    {
      "lineHeight": "17px",
      "fontWeight": "400"
    }
  ],
  "headline-h1": [
    "20pt",
    {
      "lineHeight": "34pt",
      "fontWeight": "600"
    }
  ],
  "headline-h2": [
    "18pt",
    {
      "lineHeight": "31pt",
      "fontWeight": "600"
    }
  ],
  "headline-h3": [
    "17pt",
    {
      "lineHeight": "29pt",
      "fontWeight": "600"
    }
  ],
  "body-primary": [
    "16px",
    {
      "lineHeight": "1.69em",
      "fontWeight": "400"
    }
  ],
  "body-secondary": [
    "14px",
    {
      "lineHeight": "20px",
      "fontWeight": "400"
    }
  ],
  "callout": [
    "16px",
    {
      "lineHeight": "22px",
      "fontWeight": "500"
    }
  ],
  "subhead": [
    "14px",
    {
      "lineHeight": "20px",
      "fontWeight": "400"
    }
  ],
  "footnote": [
    "13px",
    {
      "lineHeight": "18px",
      "fontWeight": "400"
    }
  ],
  "caption-1": [
    "12px",
    {
      "lineHeight": "17px",
      "fontWeight": "400"
    }
  ],
  "caption-2": [
    "11px",
    {
      "lineHeight": "13px",
      "fontWeight": "400"
    }
  ]
},
      transitionDuration: {
  "in": "250ms",
  "expand": "350ms",
  "delayed-in": "300ms",
  "out": "250ms",
  "sheet": "400ms",
  "fast": "250ms",
  "normal": "250ms",
  "slow": "350ms"
},
      transitionTimingFunction: {
  "out": "cubic-bezier(.32,.72,0,1)",
  "spring": "cubic-bezier(.34,1.56,.64,1)",
  "default": "cubic-bezier(.32,.72,0,1)",
  "ease-out": "cubic-bezier(.32,.72,0,1)"
},
      boxShadow: {
  "1": "var(--shadow-1)",
  "2": "var(--shadow-2)",
  "3": "var(--shadow-3)",
  "modal": "var(--shadow-modal)",
  "media-note-text": "var(--shadow-media-note-text)"
},
    },
  },
}
