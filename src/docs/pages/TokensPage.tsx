import { useState } from 'react'
import { DocsPageHeader } from '../PageHeader'
import {
  colorGroups,
  motionTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
  type TokenItem,
} from '../tokens-data'
import { useToast } from '../useToast'
import { Icon } from '../icons'

function readVar(name: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function copy(text: string, onDone: (msg: string) => void) {
  navigator.clipboard
    .writeText(text)
    .then(() => onDone(`已复制 ${text}`))
    .catch(() => onDone('复制失败'))
}

// === Color section（独立可用，Foundations/color 引用） ===
export function ColorSection() {
  const { show, node } = useToast()
  return (
    <>
      {colorGroups.map((g) => (
        <section className="docs-token-section" key={g.title}>
          <h2 className="docs-token-section__title">{g.title}</h2>
          {g.desc && (
            <div className="docs-hint docs-token-section__hint">
              <Icon.Sparkles size={14} />
              {g.desc}
            </div>
          )}
          <div className="docs-swatch-grid">
            {g.tokens.map((t) => (
              <Swatch key={t.name} token={t} onCopy={(s) => copy(s, show)} />
            ))}
          </div>
        </section>
      ))}
      {node}
    </>
  )
}

export function TypographySection() {
  return (
    <div className="docs-token-list">
      {typographyTokens.map((t) => (
        <div key={t.name} className="docs-type-row">
          <code className="docs-text--caption-1 docs-text--secondary docs-text--mono">{t.name}</code>
          <span
            style={{
              fontSize: t.size,
              fontWeight: Number(t.weight),
              lineHeight: t.lineHeight,
              letterSpacing: '-0.01em',
            }}
          >
            生活里有问题，就问点点。
          </span>
          <span className="docs-text--caption-2 docs-text--tertiary" style={{ textAlign: 'right' }}>
            {t.size} · {t.weight} · {t.lineHeight} · {t.usage}
          </span>
        </div>
      ))}
    </div>
  )
}

export function SpacingSection() {
  const { show, node } = useToast()
  return (
    <>
      <div className="docs-token-list">
        {spacingTokens.map((t) => (
          <SpacingRow key={t.name} token={t} onCopy={(s) => copy(s, show)} />
        ))}
      </div>
      {node}
    </>
  )
}

export function RadiusSection() {
  const { show, node } = useToast()
  return (
    <>
      <div className="docs-token-list">
        <div className="docs-radius-grid">
          {radiusTokens.map((t) => (
            <RadiusChip key={t.name} token={t} onCopy={(s) => copy(s, show)} />
          ))}
        </div>
      </div>
      {node}
    </>
  )
}

export function MotionSection() {
  const { show, node } = useToast()
  return (
    <>
      <div className="docs-motion-list">
        {motionTokens.map((t) => (
          <MotionRow key={t.name} token={t} onCopy={(s) => copy(s, show)} />
        ))}
      </div>
      {node}
    </>
  )
}

// 旧 TokensPage 保留作总览（兼容 #/docs/tokens 旧链接 → router 已重定向到 foundations/color）
// 但仍可被访问到 -- 五段全展示。
export function TokensPage() {
  return (
    <>
      <DocsPageHeader
        title="设计令牌"
        subtitle="点击任意令牌复制 CSS 变量名。"
      />

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">颜色</h2>
        <p className="docs-section-block__subheading">
          按用途分组。色块带半透明棋盘底，方便观察 alpha 通道
        </p>
        <ColorSection />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">字号</h2>
        <p className="docs-section-block__subheading">
          组件规范统一使用 PingFang SC；代码片段使用 SaansMono-TRIAL
        </p>
        <TypographySection />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">间距</h2>
        <p className="docs-section-block__subheading">
          基于 4px 栅格，--space-4（16px）是最常用
        </p>
        <SpacingSection />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">圆角</h2>
        <RadiusSection />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">动效</h2>
        <p className="docs-section-block__subheading">
          点击播放观察曲线。Duration 控时间，Curve 控加速度
        </p>
        <MotionSection />
      </section>
    </>
  )
}

function Swatch({ token, onCopy }: { token: TokenItem; onCopy: (s: string) => void }) {
  // 直接读 computed style 当初始值；token.name 变化时 React 自然重渲染，
  // 不需要 useEffect + setState（react-hooks/set-state-in-effect）。
  const val = readVar(token.name)

  return (
    <div
      className="docs-swatch"
      onClick={() => onCopy(`var(${token.name})`)}
      style={{ ['--swatch-color' as string]: `var(${token.name})` } as React.CSSProperties}
    >
      <span className="docs-swatch__chip" />
      <div className="docs-swatch__content">
        <div className="docs-swatch__name">{token.name.replace(/^--/, '')}</div>
        <div className="docs-swatch__usage">{token.usage}</div>
        <div className="docs-swatch__value">{val || '...'}</div>
      </div>
    </div>
  )
}

function SpacingRow({ token, onCopy }: { token: TokenItem; onCopy: (s: string) => void }) {
  const [value, usage] = token.usage.split(' · ')
  return (
    <div className="docs-spacing-row" onClick={() => onCopy(`var(${token.name})`)}>
      <code className="docs-spacing-row__name">{token.name}</code>
      <div className="docs-spacing-row__measure" aria-hidden="true">
        <span
          className="docs-spacing-row__bar"
          style={{ width: `calc(var(${token.name}) * 3)` }}
        />
      </div>
      <div className="docs-spacing-row__meta">
        <span className="docs-spacing-row__value">{value}</span>
        <span>{usage}</span>
      </div>
    </div>
  )
}

function RadiusChip({ token, onCopy }: { token: TokenItem; onCopy: (s: string) => void }) {
  return (
    <div className="docs-radius-chip" onClick={() => onCopy(`var(${token.name})`)}>
      <div className="docs-radius-chip__shape" style={{ borderRadius: `var(${token.name})` }} />
      <code className="docs-text--caption-1 docs-text--mono">{token.name}</code>
      <span
        className="docs-text--caption-2 docs-text--tertiary"
        style={{ textAlign: 'center' }}
      >
        {token.usage}
      </span>
    </div>
  )
}

function MotionRow({ token, onCopy }: { token: TokenItem; onCopy: (s: string) => void }) {
  const val = readVar(token.name)
  const [playing, setPlaying] = useState(0)
  const isDuration = token.name.startsWith('--duration')
  const isCurve = token.name.startsWith('--curve')
  const isPress = token.name.startsWith('--press')
  const previewStyle = {
    '--motion-preview-duration': isDuration ? `var(${token.name})` : 'var(--duration-slow)',
    '--motion-preview-easing': isCurve ? `var(${token.name})` : 'var(--curve-out)',
    '--motion-preview-scale': token.name.startsWith('--press-scale') ? `var(${token.name})` : '1',
    '--motion-preview-opacity': token.name === '--press-opacity' ? `var(${token.name})` : '1',
  } as React.CSSProperties

  return (
    <article className="docs-motion-row" style={previewStyle}>
      <div className="docs-motion-row__meta">
        <button
          className="docs-motion-row__token"
          onClick={() => onCopy(`var(${token.name})`)}
          type="button"
        >
          {token.name}
        </button>
        <div className="docs-motion-row__value">{val}</div>
        <div className="docs-motion-row__usage">{token.usage}</div>
      </div>

      <div className="docs-motion-preview">
        <button
          className="docs-motion-preview__play"
          onClick={() => setPlaying((p) => p + 1)}
          type="button"
        >
          <Icon.Play size={12} />
          播放
        </button>

        {isPress ? (
          <div className="docs-motion-press-stage">
            <span
              key={playing}
              className={`docs-motion-press-target ${playing > 0 ? 'is-playing' : ''}`}
            >
              按住
            </span>
          </div>
        ) : (
          <div className="docs-motion-tracks">
            {isCurve && (
              <div className="docs-motion-track-row">
                <span className="docs-motion-track-row__label">Linear</span>
                <div className="docs-motion-track">
                  <span
                    key={`linear-${playing}`}
                    className={`docs-motion-runner docs-motion-runner--reference ${
                      playing > 0 ? 'is-playing' : ''
                    }`}
                  />
                </div>
              </div>
            )}
            <div className="docs-motion-track-row">
              <span className="docs-motion-track-row__label">{isCurve ? 'Token' : val}</span>
              <div className="docs-motion-track">
                <span
                  key={`token-${playing}`}
                  className={`docs-motion-runner ${playing > 0 ? 'is-playing' : ''}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
