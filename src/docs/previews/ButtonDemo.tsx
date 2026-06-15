import { useState, type ReactNode } from 'react'
import buttonVisualBg from '../../assets/dotted/dots-button-visual-bg.jpg'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'

const VARIANTS = ['filled', 'outline', 'neutral', 'ghost'] as const
const SIZES = ['xLarge', 'large', 'medium', 'small', 'mini', 'micro'] as const

type ButtonVariant = (typeof VARIANTS)[number]
type ButtonSize = (typeof SIZES)[number]

const sizeMeta: Record<ButtonSize, { label: string; scene: string }> = {
  xLarge: { label: '48 / 112', scene: '限定强动作' },
  large: { label: '44 / 102', scene: '表单底部' },
  medium: { label: '36 / 82', scene: '空态动作' },
  small: { label: '28 / 63', scene: '卡片按钮' },
  mini: { label: '24 / 52', scene: '紧凑按钮' },
  micro: { label: '20 / 40', scene: '极小悬浮' },
}

const variantLabel: Record<ButtonVariant, string> = {
  filled: '主操作',
  outline: '强调次级',
  neutral: '中性弱操作',
  ghost: '图底按钮',
}

export function ButtonDemo() {
  const [variant, setVariant] = useState<ButtonVariant>('filled')
  const [size, setSize] = useState<ButtonSize>('medium')
  const [fullWidth, setFullWidth] = useState(false)

  const code = `<Button variant="${variant}" size="${size}"${fullWidth ? ' fullWidth' : ''}>\n  立即查看\n</Button>`

  return (
    <DemoFrame
      caption="Button · Dots spec"
      code={code}
      stage={
        <div className="dots-button-spec">
          <section className="dots-button-spec__preview" aria-label="当前组合">
            <div>
              <div className="dots-button-spec__eyebrow">当前组合</div>
              <div className="dots-button-spec__title">
                {variantLabel[variant]} · {size}
              </div>
              <p className="dots-button-spec__desc">
                短文案保持最小宽度，长文案按内容增长；主操作只在当前视图出现一次。
              </p>
            </div>
            <div className={`dots-button-spec__preview-box ${variant === 'ghost' ? 'is-visual' : ''}`}>
              {variant === 'ghost' ? (
                <img
                  className="dots-button-spec__preview-bg"
                  src={buttonVisualBg}
                  alt=""
                  draggable={false}
                  aria-hidden="true"
                />
              ) : null}
              <DotsButton variant={variant} size={size} fullWidth={fullWidth}>
                立即查看
              </DotsButton>
            </div>
          </section>

          <section className="dots-button-spec__matrix" aria-label="尺寸矩阵">
            {SIZES.map((item) => (
              <div className="dots-button-spec__row" key={item}>
                <div className="dots-button-spec__row-label">
                  <strong>{item}</strong>
                  <span>{sizeMeta[item].label}</span>
                  <em>{sizeMeta[item].scene}</em>
                </div>
                <DotsButton variant="filled" size={item}>
                  关注
                </DotsButton>
                <DotsButton variant="outline" size={item}>
                  添加
                </DotsButton>
                <DotsButton variant="neutral" size={item}>
                  已关注
                </DotsButton>
              </div>
            ))}
          </section>

          <section className="dots-button-spec__scenarios" aria-label="典型场景">
            <Scenario title="表单底部" note="large / filled / fullWidth">
              <DotsButton variant="filled" size="large" fullWidth>
                提交
              </DotsButton>
            </Scenario>
            <Scenario title="空态动作" note="large / neutral / fullWidth">
              <DotsButton variant="neutral" size="large" fullWidth>
                重新生成
              </DotsButton>
            </Scenario>
            <Scenario title="卡片内动作" note="large / filled / fullWidth">
              <DotsButton variant="filled" size="large" fullWidth>
                去看看
              </DotsButton>
            </Scenario>
            <Scenario title="图片背景" note="large / ghost / fullWidth" visual>
              <DotsButton variant="ghost" size="large" fullWidth>
                查看详情
              </DotsButton>
            </Scenario>
          </section>
        </div>
      }
      controls={
        <>
          <DemoControl label="variant">
            <PropPicker options={VARIANTS} value={variant} onChange={setVariant} />
          </DemoControl>
          <DemoControl label="size">
            <PropPicker options={SIZES} value={size} onChange={setSize} />
          </DemoControl>
          <DemoControl label="fullWidth">
            <PropPicker options={[false, true] as const} value={fullWidth} onChange={setFullWidth} />
          </DemoControl>
        </>
      }
    />
  )
}

function DotsButton({
  variant,
  size,
  fullWidth = false,
  disabled = false,
  children,
}: {
  variant: ButtonVariant
  size: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  children: string
}) {
  return (
    <button
      className={[
        'dots-button-spec__button',
        `dots-button-spec__button--${variant}`,
        `dots-button-spec__button--${size}`,
        fullWidth ? 'dots-button-spec__button--full' : '',
      ].join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Scenario({
  title,
  note,
  visual = false,
  children,
}: {
  title: string
  note: string
  visual?: boolean
  children: ReactNode
}) {
  return (
    <div className={`dots-button-spec__scenario ${visual ? 'is-visual' : ''}`}>
      {visual ? (
        <img
          className="dots-button-spec__scenario-bg"
          src={buttonVisualBg}
          alt=""
          draggable={false}
          aria-hidden="true"
        />
      ) : null}
      <div>
        <strong>{title}</strong>
        <span>{note}</span>
      </div>
      {children}
    </div>
  )
}
