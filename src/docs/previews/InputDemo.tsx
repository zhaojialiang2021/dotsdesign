import { useRef, useState } from 'react'
import { Icon } from '../icons'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'

type Variant = 'field' | 'extension'
type VisualState = 'default' | 'focused' | 'filled' | 'disabled' | 'error'
type PrefixType = 'text' | 'icon' | 'dropdown'
type SuffixType = 'text' | 'limit' | 'link' | 'icon' | 'image'

const VARIANTS = ['field', 'extension'] as const
const STATES = ['default', 'focused', 'filled', 'disabled', 'error'] as const
const PREFIX_TYPES = ['text', 'icon', 'dropdown'] as const
const SUFFIX_TYPES = ['text', 'limit', 'link', 'icon', 'image'] as const
const SAMPLE_VALUE = '生活里有问题，就问点点。'
const MAX_LENGTH = 24

export function InputDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [variant, setVariant] = useState<Variant>('field')
  const [visualState, setVisualState] = useState<VisualState>('focused')
  const [prefix, setPrefix] = useState(true)
  const [prefixType, setPrefixType] = useState<PrefixType>('dropdown')
  const [suffix, setSuffix] = useState(true)
  const [suffixType, setSuffixType] = useState<SuffixType>('limit')
  const [value, setValue] = useState('')

  const disabled = visualState === 'disabled'
  const error = visualState === 'error'
  const filled = value.length > 0
  const effectiveState = disabled ? 'disabled' : error ? 'error' : visualState === 'focused' ? 'focused' : filled ? 'filled' : 'default'

  function focusInput() {
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  function handleStateChange(next: VisualState) {
    setVisualState(next)
    if (next === 'default') setValue('')
    if (next === 'filled' && !value) setValue(SAMPLE_VALUE)
    if (next === 'focused') focusInput()
    if (next === 'disabled') inputRef.current?.blur()
    if (next === 'error' && !value) setValue('请输入内容')
  }

  function handleInput(next: string) {
    setValue(next)
    if (!disabled && !error) setVisualState('focused')
  }

  function clearValue() {
    if (disabled) return
    setValue('')
    if (!error) setVisualState('focused')
    focusInput()
  }

  const fieldClass = [
    'dots-input-spec__field',
    `dots-input-spec__field--${variant}`,
    `is-${effectiveState}`,
  ].join(' ')

  const code = `<TextField\n  variant="${variant}"\n  state="${effectiveState}"\n  prefix={${prefix}}\n  prefixType="${prefixType}"\n  suffix={${suffix}}\n  suffixType="${suffixType}"\n  value="${value}"\n/>`

  return (
    <DemoFrame
      caption="Input / TextField · Live"
      code={code}
      stage={
        <div className="dots-input-spec" data-state={effectiveState}>
          <label className="dots-input-spec__label" htmlFor="dots-input-spec-live">
            当前组合
          </label>
          <div className={fieldClass}>
            <div className="dots-input-spec__row">
              {prefix ? <PrefixSlot type={prefixType} /> : null}
              <input
                ref={inputRef}
                id="dots-input-spec-live"
                className="dots-input-spec__native"
                placeholder="请输入内容"
                value={value}
                maxLength={MAX_LENGTH}
                disabled={disabled}
                aria-invalid={error}
                onFocus={() => {
                  if (!disabled && !error) setVisualState('focused')
                }}
                onBlur={() => {
                  if (!disabled && !error) setVisualState(value ? 'filled' : 'default')
                }}
                onChange={(event) => handleInput(event.target.value)}
              />
              {effectiveState === 'focused' && filled ? (
                <button className="dots-input-spec__clear" type="button" aria-label="清除内容" onMouseDown={(event) => event.preventDefault()} onClick={clearValue}>
                  <Icon.Close size={12} />
                </button>
              ) : null}
              {suffix ? <SuffixSlot type={suffixType} valueLength={value.length} maxLength={MAX_LENGTH} disabled={disabled} /> : null}
            </div>
            {error && variant === 'field' ? (
              <p className="dots-input-spec__error">请输入有效内容</p>
            ) : null}
          </div>
          <div className="dots-input-spec__meta">
            value: {value || 'empty'} · state: {effectiveState}
          </div>
        </div>
      }
      controls={
        <>
          <DemoControl label="variant">
            <PropPicker options={VARIANTS} value={variant} onChange={setVariant} />
          </DemoControl>
          <DemoControl label="state">
            <PropPicker options={STATES} value={visualState} onChange={handleStateChange} />
          </DemoControl>
          <DemoControl label="prefix">
            <PropPicker options={[true, false] as const} value={prefix} onChange={setPrefix} />
          </DemoControl>
          <DemoControl label="prefixType">
            <PropPicker options={PREFIX_TYPES} value={prefixType} onChange={setPrefixType} />
          </DemoControl>
          <DemoControl label="suffix">
            <PropPicker options={[true, false] as const} value={suffix} onChange={setSuffix} />
          </DemoControl>
          <DemoControl label="suffixType">
            <PropPicker options={SUFFIX_TYPES} value={suffixType} onChange={setSuffixType} />
          </DemoControl>
        </>
      }
    />
  )
}

function PrefixSlot({ type }: { type: PrefixType }) {
  if (type === 'icon') {
    return (
      <span className="dots-input-spec__slot dots-input-spec__slot--icon" aria-label="图标前缀">
        <Icon.UserPlus size={24} />
      </span>
    )
  }

  if (type === 'dropdown') {
    return (
      <button className="dots-input-spec__slot dots-input-spec__dropdown" type="button">
        <span>选择</span>
        <Icon.ChevronDown size={16} />
      </button>
    )
  }

  return <span className="dots-input-spec__slot dots-input-spec__slot--text">文字前缀</span>
}

function SuffixSlot({
  type,
  valueLength,
  maxLength,
  disabled,
}: {
  type: SuffixType
  valueLength: number
  maxLength: number
  disabled: boolean
}) {
  if (type === 'limit') return <span className="dots-input-spec__slot dots-input-spec__slot--limit">{valueLength}/{maxLength}</span>
  if (type === 'link') return <button className="dots-input-spec__suffix-link" type="button" disabled={disabled}>按钮</button>
  if (type === 'icon') return <span className="dots-input-spec__slot dots-input-spec__slot--icon"><Icon.EyeOff size={24} /></span>
  if (type === 'image') return <span className="dots-input-spec__image-suffix" aria-label="图片后缀" />
  return <span className="dots-input-spec__slot dots-input-spec__slot--text">文字后缀</span>
}
