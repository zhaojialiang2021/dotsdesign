import { DotsButton } from '../ButtonDemo'

const sizes = [
  { name: 'xLarge', height: 48, minWidth: 112, padding: 32 },
  { name: 'large', height: 44, minWidth: 102, padding: 24 },
  { name: 'medium', height: 36, minWidth: 82, padding: 20 },
  { name: 'small', height: 28, minWidth: 63, padding: 12 },
  { name: 'mini', height: 24, minWidth: 52, padding: 8 },
  { name: 'micro', height: 20, minWidth: 40, padding: 8 },
] as const

const variants = [
  { name: 'filled', label: '主操作' },
  { name: 'outline', label: '强调次级' },
  { name: 'neutral', label: '中性弱操作' },
  { name: 'ghost', label: '图底按钮' },
] as const

export function ButtonAnatomy() {
  return (
    <div className="dots-button-anatomy">
      <section className="dots-button-anatomy__column">
        <div className="dots-button-anatomy__group">
          <div className="dots-button-anatomy__eyebrow">结构与宽度</div>
          <div className="dots-button-anatomy__structure">
            <div className="dots-button-anatomy__part-list">
              <span>
                <i>1</i>
                <strong>Container</strong>
                <small>承载尺寸、圆角与状态</small>
              </span>
              <span>
                <i>2</i>
                <strong>Label</strong>
                <small>使用动作型短文案</small>
              </span>
            </div>
            <div className="dots-button-anatomy__preview">
              <DotsButton variant="filled" size="xLarge">
                立即查看
              </DotsButton>
            </div>
            <code>min-width + content + padding</code>
          </div>
        </div>

        <div className="dots-button-anatomy__group">
          <div className="dots-button-anatomy__eyebrow">Variants</div>
          <div className="dots-button-anatomy__variants">
            {variants.map((variant) => (
              <div className="dots-button-anatomy__variant" key={variant.name}>
                <DotsButton variant={variant.name} size="medium">
                  {variant.name}
                </DotsButton>
                <span>{variant.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dots-button-anatomy__column">
        <div className="dots-button-anatomy__eyebrow">Sizes</div>
        <div className="dots-button-anatomy__sizes">
          {sizes.map((size) => (
            <div className="dots-button-anatomy__size" key={size.name}>
              <DotsButton variant="filled" size={size.name}>
                {size.name}
              </DotsButton>
              <code>
                {size.height} / min {size.minWidth} / px {size.padding}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
