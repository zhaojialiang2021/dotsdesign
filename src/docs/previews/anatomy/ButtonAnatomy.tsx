import { AnatomyFrame, Annotation, Guide } from './_AnatomyFrame'

const sizes = [
  { name: 'xLarge', y: 44, h: 48, w: 168, label: '48 / min 112 / px 32' },
  { name: 'large', y: 102, h: 44, w: 150, label: '44 / min 102 / px 24' },
  { name: 'medium', y: 156, h: 36, w: 124, label: '36 / min 82 / px 20' },
  { name: 'small', y: 202, h: 28, w: 96, label: '28 / min 63 / px 12' },
  { name: 'mini', y: 240, h: 24, w: 80, label: '24 / min 52 / px 8' },
  { name: 'micro', y: 274, h: 20, w: 64, label: '20 / min 40 / px 8' },
]

export function ButtonAnatomy() {
  return (
    <AnatomyFrame width={760} height={340}>
      <g transform="translate(76, 44)">
        <rect x="0" y="0" width="220" height="96" rx="18" fill="var(--fill-a)" stroke="var(--separator-2)" />
        <rect x="28" y="24" width="164" height="48" rx="24" fill="var(--info-5)" />
        <text
          x="110"
          y="55"
          fontSize="16"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fontWeight="500"
          fill="var(--bg-light)"
          textAnchor="middle"
        >
          立即查看
        </text>
        <Guide x1={28} y1={82} x2={192} y2={82} />
        <Guide x1={28} y1={18} x2={60} y2={18} />
        <Annotation x={28} y={48} label="container" index={1} align="left" />
        <Annotation x={110} y={48} label="label" index={2} align="right" />
        <text
          x="110"
          y="108"
          fontSize="11"
          fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
          fill="currentColor"
          opacity="0.48"
          textAnchor="middle"
        >
          width = min-width + content + padding
        </text>
      </g>

      <g transform="translate(376, 22)">
        {sizes.map((s) => (
          <g key={s.name} transform={`translate(0, ${s.y})`}>
            <rect width={s.w} height={s.h} rx={s.h / 2} fill="var(--info-5)" />
            <text
              x={s.w / 2}
              y={s.h / 2 + 5}
              fontSize={s.h >= 36 ? 14 : s.h >= 28 ? 12 : 10}
              fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
              fontWeight="500"
              fill="var(--bg-light)"
              textAnchor="middle"
            >
              {s.name}
            </text>
            <text
              x="190"
              y={s.h / 2 + 4}
              fontSize="11"
              fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
              fill="currentColor"
              opacity="0.5"
            >
              {s.label}
            </text>
          </g>
        ))}
      </g>

      <g transform="translate(76, 184)">
        <text
          x="0"
          y="0"
          fontSize="12"
          fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
          fill="currentColor"
          opacity="0.5"
        >
          variants
        </text>
        <rect x="0" y="18" width="86" height="28" rx="14" fill="var(--info-5)" />
        <rect x="98" y="18" width="86" height="28" rx="14" fill="transparent" stroke="var(--info-6)" />
        <rect x="196" y="18" width="86" height="28" rx="14" fill="transparent" stroke="var(--separator-2)" />
        <rect x="0" y="58" width="86" height="28" rx="14" fill="var(--fill-c)" stroke="var(--separator-light-5)" />
        <text x="43" y="37" fontSize="12" textAnchor="middle" fill="var(--bg-light)" fontWeight="500">
          filled
        </text>
        <text x="141" y="37" fontSize="12" textAnchor="middle" fill="var(--info-6)" fontWeight="500">
          outline
        </text>
        <text x="239" y="37" fontSize="12" textAnchor="middle" fill="var(--title)" fontWeight="500">
          neutral
        </text>
        <text x="43" y="77" fontSize="12" textAnchor="middle" fill="var(--bg-light)" fontWeight="500">
          ghost
        </text>
      </g>

      <text
        x="380"
        y="326"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.4"
        textAnchor="middle"
      >
        Button · variant + size + width rule
      </text>
    </AnatomyFrame>
  )
}
