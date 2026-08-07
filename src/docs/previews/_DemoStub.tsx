// 深度组件 live demo 共用骨架：上方 stage（实际渲染），下方控件区（调 props），底部代码 + 复制按钮
import { useRef, useState, type ReactNode } from 'react'
import { useToast } from '../useToast'
import { useT } from '../useLocale'
import { Icon } from '../icons'

export function DemoFrame({
  stage,
  controls,
  caption,
  title,
  description,
  code,
  codeTabs,
}: {
  stage: ReactNode
  controls?: ReactNode
  caption?: string
  title?: string
  description?: string
  /** 当前 props 序列化的 JSX 字符串。提供时显示「复制 JSX」按钮 */
  code?: string
  /** 多份真实代码参考；提供时替代单一 JSX 代码块。 */
  codeTabs?: readonly { id: string; label: string; language: string; code: string }[]
}) {
  const t = useT()
  const { show, node: toastNode } = useToast()
  const hasIntro = Boolean(title || description)
  const [activeCodeTab, setActiveCodeTab] = useState(codeTabs?.[0]?.id ?? '')
  const [codeCopied, setCodeCopied] = useState(false)
  const selectedCode = codeTabs?.find((tab) => tab.id === activeCodeTab) ?? codeTabs?.[0]
  const codeBlockRef = useRef<HTMLPreElement>(null)
  const copiedTimerRef = useRef<number | undefined>(undefined)

  function selectCodeTab(id: string) {
    setActiveCodeTab(id)
    setCodeCopied(false)
    if (codeBlockRef.current) {
      codeBlockRef.current.scrollTop = 0
      codeBlockRef.current.scrollLeft = 0
    }
  }

  function copy() {
    const value = selectedCode?.code ?? code
    if (!value) return
    navigator.clipboard.writeText(value).then(
      () => {
        setCodeCopied(true)
        window.clearTimeout(copiedTimerRef.current)
        copiedTimerRef.current = window.setTimeout(() => setCodeCopied(false), 1800)
        show(t('common.copied') + ` · ${selectedCode?.label ?? 'JSX'}`)
      },
      () => show(t('common.copy-failed')),
    )
  }

  return (
    <>
      <div
        className={[
          'docs-demo',
          controls ? 'docs-demo--with-controls' : 'docs-demo--stage-only',
          hasIntro ? 'docs-demo--with-intro' : '',
        ].join(' ')}
      >
        {hasIntro ? (
          <div className="docs-demo__intro">
            {caption ? <div className="docs-demo__eyebrow">{caption}</div> : null}
            {title ? <h3 className="docs-demo__title">{title}</h3> : null}
            {description ? <p className="docs-demo__description">{description}</p> : null}
          </div>
        ) : null}
        <div className="docs-demo__stage">
          {!hasIntro && caption ? <div className="docs-stage__caption">{caption}</div> : null}
          <div className="docs-stage__inner">{stage}</div>
        </div>
        {controls ? <div className="docs-demo__controls">{controls}</div> : null}
      </div>
      {(selectedCode || code) && (
        <div className={`docs-demo__code-wrap ${codeTabs ? 'docs-demo__code-wrap--tabbed' : ''}`}>
          {codeTabs && codeTabs.length > 0 ? (
            <div className="docs-demo__code-toolbar">
              <div className="docs-demo__code-toolbar-main">
                <span className="docs-demo__code-terminal" aria-hidden="true">
                  <span>&gt;_</span>
                </span>
                <div className="docs-demo__code-tabs" role="tablist" aria-label="研发参考代码">
                  {codeTabs.map((tab) => (
                    <button
                      className={`docs-demo__code-tab ${tab.id === selectedCode?.id ? 'is-active' : ''}`}
                      type="button"
                      role="tab"
                      aria-selected={tab.id === selectedCode?.id}
                      onClick={() => selectCodeTab(tab.id)}
                      key={tab.id}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="docs-demo__code-toolbar-copy"
                type="button"
                onClick={copy}
                aria-label={`复制${selectedCode?.label ?? '代码'}`}
                title={`复制${selectedCode?.label ?? '代码'}`}
              >
                {codeCopied ? <Icon.Check size={18} /> : <Icon.Copy size={18} />}
              </button>
            </div>
          ) : null}
          <pre
            className={`docs-codeblock docs-demo__code ${codeTabs ? 'docs-demo__code--tabbed' : ''}`}
            ref={codeBlockRef}
          >
            <code>{selectedCode?.code ?? code}</code>
            {!codeTabs ? (
              <button className="docs-codeblock__copy" onClick={copy}>
                <Icon.Copy size={13} /> JSX
              </button>
            ) : null}
          </pre>
        </div>
      )}
      {toastNode}
    </>
  )
}

export function DemoControl({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="docs-demo__control">
      <div className="docs-demo__label">{label}</div>
      <div className="docs-demo__field">{children}</div>
    </div>
  )
}

export function PropPicker<T extends string | boolean>({
  options,
  value,
  onChange,
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="docs-segmented" style={{ marginBottom: 0 }}>
      {options.map((o) => (
        <button
          key={String(o)}
          className={`docs-segmented__btn ${o === value ? 'is-active' : ''}`}
          onClick={() => onChange(o)}
        >
          {String(o)}
        </button>
      ))}
    </div>
  )
}
