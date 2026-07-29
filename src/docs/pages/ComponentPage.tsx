import { useId, type ReactNode } from 'react'
import type { ComponentSlug } from '../manifest'
import { components } from '../manifest'
import { renderMarkdown, getFrontmatter } from '../markdown'
import { getComponentSchema, schemaToLLMSpec, type ComponentSchema } from '../component-schema'
import { useToast } from '../useToast'
import { Icon } from '../icons'
import { NotFoundPage } from './NotFoundPage'
import { useT } from '../useLocale'
import { DocsPageHeader } from '../PageHeader'
import { SwitchPreview } from '../previews/SwitchPreview'
import { InputPreview } from '../previews/InputPreview'
import { DividerPreview } from '../previews/DividerPreview'
import { ToastPreview } from '../previews/ToastPreview'
import { MessageBubblePreview } from '../previews/MessageBubblePreview'
// 深度组件 live demo —— Day 4 逐个实现
import { ButtonDemo } from '../previews/ButtonDemo'
import { InputDemo } from '../previews/InputDemo'
import { SheetDemo } from '../previews/SheetDemo'
import { EmptyStateDemo } from '../previews/EmptyStateDemo'
import { LiveWaveformDemo } from '../previews/LiveWaveformDemo'
import { ProcessIndicatorDemo } from '../previews/ProcessIndicatorDemo'
// Anatomy SVG 图解 —— Day 10
import { ButtonAnatomy } from '../previews/anatomy/ButtonAnatomy'
import { InputAnatomy } from '../previews/anatomy/InputAnatomy'
import { SheetAnatomy } from '../previews/anatomy/SheetAnatomy'
import { EmptyStateAnatomy } from '../previews/anatomy/EmptyStateAnatomy'

const sources = import.meta.glob('../../../references/components/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadSpec(slug: ComponentSlug): string | null {
  const path = Object.keys(sources).find((p) => p.endsWith(`/${slug}.md`))
  return path ? sources[path] : null
}

const shallowPreviewMap: Partial<Record<ComponentSlug, () => React.ReactNode>> = {
  switch: () => <SwitchPreview />,
  input: () => <InputPreview />,
  divider: () => <DividerPreview />,
  toast: () => <ToastPreview />,
  'message-bubble': () => <MessageBubblePreview />,
}

const deepDemoMap: Partial<Record<ComponentSlug, React.ComponentType>> = {
  button: ButtonDemo,
  input: InputDemo,
  sheet: SheetDemo,
  'empty-state': EmptyStateDemo,
  'message-bubble': MessageBubblePreview,
  'process-indicator': ProcessIndicatorDemo,
  'live-waveform': LiveWaveformDemo,
}

const anatomyMap: Partial<Record<ComponentSlug, React.ComponentType>> = {
  button: ButtonAnatomy,
  input: InputAnatomy,
  sheet: SheetAnatomy,
  'empty-state': EmptyStateAnatomy,
}

export function ComponentPage({ slug }: { slug: string }) {
  const meta = components.find((c) => c.slug === slug)
  if (!meta) return <NotFound slug={slug} />

  if (meta.depth === 'deep') {
    const schema = getComponentSchema(meta.slug)
    if (!schema) return <NotFound slug={slug} note="schema 缺失" />
    const Demo = deepDemoMap[meta.slug]
    const Anatomy = anatomyMap[meta.slug]
    return <DeepComponentPage meta={meta} schema={schema} Demo={Demo} Anatomy={Anatomy} />
  }

  // 浅组件：保留旧渲染（兼容 backlog）
  const src = loadSpec(meta.slug)
  const Preview = shallowPreviewMap[meta.slug]
  const fm = src ? getFrontmatter(src) : {}
  return (
    <>
      <DocsPageHeader
        title={meta.name}
        meta={
          <>
            {fm.last_updated && <span>更新于 <strong>{fm.last_updated}</strong></span>}
            {fm.used_by && <span>用于 <strong>{fm.used_by}</strong></span>}
          </>
        }
      />
      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">实时预览</h2>
        {Preview ? (
          Preview()
        ) : (
          <div className="docs-card">
            <p className="docs-hint">该组件还未接入实时预览。属于 backlog 浅组件。</p>
          </div>
        )}
      </section>
      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">规格文档</h2>
        <div className="docs-flat-doc">
          {src ? renderMarkdown(src) : <p className="docs-hint">未找到规格文档。</p>}
        </div>
      </section>
    </>
  )
}

function SectionHeading({
  children,
  tooltip,
}: {
  children: ReactNode
  tooltip?: string
}) {
  const tooltipId = useId()

  return (
    <h2 className="docs-section-block__heading">
      {tooltip ? (
        <span
          aria-describedby={tooltipId}
          className="docs-section-heading__trigger"
          tabIndex={0}
        >
          {children}
          <span
            className="docs-section-heading__tooltip"
            id={tooltipId}
            role="tooltip"
          >
            {tooltip}
          </span>
        </span>
      ) : (
        children
      )}
    </h2>
  )
}

// ===== 深度组件固定结构（brief §5.3） =====
function DeepComponentPage({
  schema,
  Demo,
  Anatomy,
}: {
  meta: { slug: ComponentSlug; name: string }
  schema: ComponentSchema
  Demo?: React.ComponentType
  Anatomy?: React.ComponentType
}) {
  const t = useT()
  const { show, node: toastNode } = useToast()
  const handleCopyForAI = () => {
    const md = schemaToLLMSpec(schema)
    navigator.clipboard.writeText(md).then(
      () => show(t('common.copied') + ' · LLM spec'),
      () => show(t('common.copy-failed')),
    )
  }
  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2)).then(
      () => show(t('common.copied') + ' · Schema JSON'),
      () => show(t('common.copy-failed')),
    )
  }

  return (
    <>
      <DocsPageHeader
        eyebrow={`${schema.category} · ${t('component.deep-tag')}`}
        title={schema.name}
        subtitle={schema.description}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button className="docs-copy-btn docs-copy-btn--primary" onClick={handleCopyForAI}>
              <Icon.Sparkles size={13} />
              {t('component.copy-ai')}
            </button>
            <button className="docs-copy-btn" onClick={handleCopySchema}>
              <Icon.FileJson size={13} />
              {t('component.copy-schema')}
            </button>
          </div>
        }
      />

      {schema.harness && (
        <section className="docs-section-block" id="harness">
          <SectionHeading tooltip={t('component.harness.lead')}>
            {t('component.harness')}
          </SectionHeading>
          <div className="docs-harness-grid">
            <div className="docs-harness-card">
              <div className="docs-harness-card__label">Semantic</div>
              <p>{schema.harness.semantic}</p>
            </div>
            <div className="docs-harness-card">
              <div className="docs-harness-card__label">Generation</div>
              <ul>
                {schema.harness.generation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="docs-harness-card">
              <div className="docs-harness-card__label">Validation</div>
              <ul>
                {schema.harness.validation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="docs-section-block" id="live-demo">
        <SectionHeading tooltip={t('component.live-demo.lead')}>
          {t('component.live-demo')}
        </SectionHeading>
        {Demo ? (
          <Demo />
        ) : (
          <div className="docs-card">
            <p className="docs-hint">Live demo 待实现 —— Day 4 交付。</p>
          </div>
        )}
      </section>

      <section className="docs-section-block" id="props">
        <SectionHeading tooltip={t('component.props.lead')}>
          {t('component.props')}
        </SectionHeading>
        <div className="docs-table-surface">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Values</th>
                <th>Default</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(schema.props).map(([name, def]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>
                    {def.values.map((v, i) => (
                      <code key={i} style={{ marginRight: 4 }}>
                        {JSON.stringify(v)}
                      </code>
                    ))}
                  </td>
                  <td>
                    <code>{JSON.stringify(def.default)}</code>
                  </td>
                  <td style={{ color: 'var(--label-secondary)' }}>{def.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section-block" id="states">
        <SectionHeading tooltip={t('component.states.lead')}>
          {t('component.states')}
        </SectionHeading>
        <div className="docs-state-row">
          {schema.states.map((s) => (
            <code key={s} className="docs-state-chip">
              {s}
            </code>
          ))}
        </div>
      </section>

      <section className="docs-section-block" id="anatomy">
        <SectionHeading tooltip={t('component.anatomy.lead')}>
          {t('component.anatomy')}
        </SectionHeading>
        {Anatomy && (
          <div className="docs-group-surface docs-group-surface--anatomy">
            <Anatomy />
          </div>
        )}
        <div className="docs-table-surface">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Part</th>
                <th>Tokens / 说明</th>
              </tr>
            </thead>
            <tbody>
              {schema.anatomy.map((a) => (
                <tr key={a.part}>
                  <td>
                    <code>{a.part}</code>
                  </td>
                  <td style={{ color: 'var(--label-secondary)' }}>
                    {a.description ??
                      a.tokens?.map((t) => (
                        <code key={t} style={{ marginRight: 4 }}>
                          {t}
                        </code>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section-block" id="constraints">
        <SectionHeading tooltip={t('component.constraints.lead')}>
          {t('component.constraints')}
        </SectionHeading>
        <div className="docs-table-surface">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Rule</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {schema.constraints.map((c) => (
                <tr key={c.rule}>
                  <td>
                    <code>{c.rule}</code>
                  </td>
                  <td style={{ color: 'var(--label-secondary)' }}>{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section-block" id="do-dont">
        <h2 className="docs-section-block__heading">{t('component.do-dont')}</h2>
        <div className="docs-do-dont">
          <div className="docs-do-dont__col docs-do-dont__col--do">
            <div className="docs-do-dont__title">{t('component.do')}</div>
            <ul>
              {schema.doDont.do.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="docs-do-dont__col docs-do-dont__col--dont">
            <div className="docs-do-dont__title">{t('component.dont')}</div>
            <ul>
              {schema.doDont.dont.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {toastNode}
    </>
  )
}

function NotFound({ slug }: { slug: string; note?: string }) {
  return <NotFoundPage path={`components/${slug}`} />
}
