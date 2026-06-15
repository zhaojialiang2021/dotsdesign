// tailwind.preset.cjs —— 由 scripts/build-tokens.mjs 生成
// 在 docs 站的 tailwind.config 里 `presets: [require('@/tokens/build/tailwind.preset.cjs')]` 引入。
module.exports = {
  theme: {
    extend: {
      colors: {
  "bg-0": "var(--bg-0)",
  "bg-1": "var(--bg-1)",
  "bg-2": "var(--bg-2)",
  "bg-3": "var(--bg-3)",
  "bg-base": "var(--bg-base)",
  "bg-light": "var(--bg-light)",
  "bg-black": "var(--bg-black)",
  "bg-mask-1": "var(--bg-mask-1)",
  "bg-mask-2": "var(--bg-mask-2)",
  "title": "var(--title)",
  "paragraph": "var(--paragraph)",
  "description": "var(--description)",
  "description-lighter": "var(--description-lighter)",
  "placeholder": "var(--placeholder)",
  "disabled": "var(--disabled)",
  "link": "var(--link)",
  "label-primary": "var(--label-primary)",
  "label-secondary": "var(--label-secondary)",
  "label-tertiary": "var(--label-tertiary)",
  "label-quaternary": "var(--label-quaternary)",
  "dark-title": "var(--dark-title)",
  "dark-paragraph": "var(--dark-paragraph)",
  "dark-description": "var(--dark-description)",
  "dark-placeholder": "var(--dark-placeholder)",
  "dark-link": "var(--dark-link)",
  "light-title": "var(--light-title)",
  "light-paragraph": "var(--light-paragraph)",
  "light-description": "var(--light-description)",
  "light-description-1": "var(--light-description-1)",
  "light-placeholder": "var(--light-placeholder)",
  "light-disabled": "var(--light-disabled)",
  "light-link": "var(--light-link)",
  "fill-1": "var(--fill-1)",
  "fill-2": "var(--fill-2)",
  "fill-3": "var(--fill-3)",
  "fill-4": "var(--fill-4)",
  "fill-5": "var(--fill-5)",
  "fill-a": "var(--fill-a)",
  "fill-b": "var(--fill-b)",
  "fill-c": "var(--fill-c)",
  "fill-primary": "var(--fill-primary)",
  "fill-secondary": "var(--fill-secondary)",
  "fill-tertiary": "var(--fill-tertiary)",
  "fill-quaternary": "var(--fill-quaternary)",
  "inverted-fill-1": "var(--inverted-fill-1)",
  "inverted-fill-2": "var(--inverted-fill-2)",
  "inverted-fill-3": "var(--inverted-fill-3)",
  "inverted-fill-4": "var(--inverted-fill-4)",
  "inverted-fill-5": "var(--inverted-fill-5)",
  "separator-2": "var(--separator-2)",
  "separator-3": "var(--separator-3)",
  "separator-4": "var(--separator-4)",
  "separator-base": "var(--separator-base)",
  "separator-light-1": "var(--separator-light-1)",
  "separator-light-2": "var(--separator-light-2)",
  "separator-light-3": "var(--separator-light-3)",
  "separator-light-4": "var(--separator-light-4)",
  "separator-light-5": "var(--separator-light-5)",
  "line-opaque": "var(--line-opaque)",
  "line-non-opaque": "var(--line-non-opaque)",
  "info-2": "var(--info-2)",
  "info-3": "var(--info-3)",
  "info-4": "var(--info-4)",
  "info-5": "var(--info-5)",
  "info-6": "var(--info-6)",
  "info-base": "var(--info-base)",
  "primary": "var(--primary)",
  "brand-blue": "var(--brand-blue)",
  "brand-blue-light": "var(--brand-blue-light)",
  "brand-blue-border": "var(--brand-blue-border)",
  "brand-blue-text": "var(--brand-blue-text)",
  "backdrop": "var(--backdrop)",
  "accent-yellow": "var(--accent-yellow)",
  "accent-green": "var(--accent-green)",
  "accent-pink": "var(--accent-pink)",
  "accent-brown": "var(--accent-brown)",
  "accent-event-blue": "var(--accent-event-blue)",
  "deco-teal": "var(--deco-teal)",
  "deco-sky": "var(--deco-sky)",
  "deco-lavender": "var(--deco-lavender)",
  "deco-sage": "var(--deco-sage)",
  "deco-rose": "var(--deco-rose)"
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
  "modal": "var(--shadow-modal)"
},
    },
  },
}
