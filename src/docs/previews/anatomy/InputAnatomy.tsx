import { AnatomyFrame, Annotation, Guide } from './_AnatomyFrame'

export function InputAnatomy() {
  return (
    <AnatomyFrame width={760} height={330}>
      <g transform="translate(150, 64)">
        <rect x="0" y="0" width="393" height="78" rx="0" fill="var(--bg-light)" />
        <rect x="0" y="0" width="393" height="48" rx="0" fill="var(--bg-light)" />

        <text x="16" y="30" fontSize="16" fontFamily="var(--font-component)" fill="var(--paragraph)">
          选择
        </text>
        <path d="M58 22l5 5 5-5" stroke="var(--paragraph)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        <text x="86" y="30" fontSize="16" fontFamily="var(--font-component)" fill="var(--title)">
          生活里有问题，就问点点。
        </text>

        <circle cx="306" cy="24" r="10" fill="var(--disabled)" />
        <path d="M302 20l8 8M310 20l-8 8" stroke="var(--bg-light)" strokeWidth="1.5" strokeLinecap="round" />

        <text x="332" y="30" fontSize="12" fontFamily="var(--font-component)" fill="var(--description)">
          12/24
        </text>
        <text x="16" y="68" fontSize="12" fontFamily="var(--font-component)" fill="var(--input-spec-warning)">
          请输入有效内容
        </text>
      </g>

      <g transform="translate(166, 190)">
        <rect x="0" y="0" width="361" height="48" rx="12" fill="var(--fill-tertiary)" />
        <text x="16" y="30" fontSize="16" fontFamily="var(--font-component)" fill="var(--input-spec-figma-placeholder)">
          extension 单行错误态不额外占行
        </text>
        <rect x="0" y="66" width="361" height="48" rx="12" fill="var(--input-spec-error-bg)" />
        <text x="16" y="96" fontSize="16" fontFamily="var(--font-component)" fill="var(--title)">
          error background / 48
        </text>
      </g>

      <Annotation x={150} y={64} label="container" index={1} align="left" />
      <Annotation x={166} y={102} label="prefix" index={2} align="left" />
      <Annotation x={236} y={112} label="native-input" index={3} align="right" />
      <Annotation x={456} y={102} label="clear-action" index={4} align="right" />
      <Annotation x={500} y={112} label="suffix" index={5} align="right" />
      <Annotation x={166} y={150} label="error-message" index={6} align="left" />

      <Guide x1={133} y1={64} x2={133} y2={112} />
      <text x="123" y="92" fontSize="11" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.5" textAnchor="end">
        48
      </text>
      <Guide x1={560} y1={64} x2={560} y2={142} />
      <text x="572" y="106" fontSize="11" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.5">
        78 error
      </text>

      <text x="380" y="304" fontSize="11" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.45" textAnchor="middle">
        Input / TextField · prefix + native input + clear + suffix · field / extension
      </text>
    </AnatomyFrame>
  )
}
