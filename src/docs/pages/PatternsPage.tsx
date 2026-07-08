import { type ReactNode } from 'react'
import { patterns } from '../manifest'
import { navigate } from '../router'
import { Icon } from '../icons'
import { NotFoundPage } from './NotFoundPage'
import { DocsPageHeader, DocsHero } from '../PageHeader'
import { DottedDemoScreen } from '../../screens/DottedDemoScreen'

type PatternSlug = (typeof patterns)[number]['slug']
type BasicPatternSlug = Exclude<PatternSlug, 'conversation-timestamp'>

const CONTENT: Record<
  BasicPatternSlug,
  {
    title: string
    eyebrow: string
    lead: string
    examples: { kind: string; copy: string; action: string; secondary?: string }[]
    rules: string[]
    pitfalls: string[]
  }
> = {
  empty: {
    eyebrow: 'Patterns · 空状态',
    title: '没有内容时怎么呈现',
    lead: '空容器不是 bug，是产品的一个 view。AI 最容易把"暂无数据"画成灰色 emoji 就完事——这是最低质量的产物。空状态必须给图、给话、给下一步。',
    examples: [
      {
        kind: 'first-time',
        copy: '记下你的第一个想法。AI 会替你整理、归档、在合适的时候推回来。',
        action: '马上开始',
      },
      {
        kind: 'no-result',
        copy: '没找到「咖啡」相关的记录。换个关键词试试，或者清除筛选。',
        action: '清除筛选',
        secondary: '修改关键词',
      },
      {
        kind: 'first-time · 频道',
        copy: '还没有频道。建一个频道把同类想法收到一起，AI 会自动给它们生成总结。',
        action: '新建频道',
      },
    ],
    rules: [
      'first-time 必须解释使用价值，不只说"还没有内容"',
      'no-result 必须给「清除筛选」或「修改关键词」的明确出口',
      '每个空状态至少给一个动作按钮',
    ],
    pitfalls: [
      '只放灰色 emoji + "没有数据" 文案',
      '把 loading 当 empty 渲染（先转 spinner，超时后才进 empty）',
      'fullscreen 空状态没有返回键',
    ],
  },
  loading: {
    eyebrow: 'Patterns · 加载态',
    title: '让等待感觉更短',
    lead: '感知速度 = 实际速度 × 形态。同样 800ms，spinner 像很慢，骨架屏像几乎没等。AI 默认会写 "Loading..."——这是最差的做法。',
    examples: [
      {
        kind: 'skeleton',
        copy: '骨架屏：保留布局位，灰色块占位。适合列表、卡片、详情页。',
        action: '推荐',
      },
      {
        kind: 'spinner',
        copy: '菊花：仅用于按钮内、表单提交、< 1s 的快速操作。',
        action: '受限',
      },
      {
        kind: 'progressive',
        copy: '渐进式：先显示已加载部分，未加载部分骨架。最快感知，但实现成本高。',
        action: '理想',
      },
    ],
    rules: [
      '> 200ms 的等待必须有视觉反馈，不能让按钮看起来"没反应"',
      '骨架屏块的形状要近似真实内容，不要全是相同矩形',
      '加载完成用 fade-in（duration-fast），避免突然闪现',
    ],
    pitfalls: [
      '直接显示 "Loading..." 文字',
      '骨架屏全屏盖住已渲染的导航 / 头部',
      '把骨架屏的灰色用得跟禁用态一样深，让人以为是错误',
    ],
  },
  permission: {
    eyebrow: 'Patterns · 权限态',
    title: '没登录 / 没付费 / 缺权限',
    lead: '权限受限不是错误，是一种正常状态。必须明确告诉用户：缺什么、怎么补、补完之后能做什么。',
    examples: [
      {
        kind: 'not-logged-in',
        copy: '此页面只对登录用户开放。登录后你能查看所有历史记录、跨设备同步。',
        action: '去登录',
        secondary: '回到首页',
      },
      {
        kind: 'feature-gated',
        copy: '导出功能需要 Pro 套餐。每月 ¥29，可导出全部记忆为 markdown / JSON / PDF。',
        action: '了解 Pro',
        secondary: '稍后再说',
      },
      {
        kind: 'os-permission',
        copy: 'Dots 需要相册访问权限来分析你的截图。我们不会上传任何图片到服务器。',
        action: '去设置开启',
      },
    ],
    rules: [
      '说清楚缺什么权限、为什么需要',
      '说清楚开通/授权后能做什么',
      '永远给一个"先不开通"的出口（不要堵死）',
    ],
    pitfalls: [
      '只显示"无权限"四个字',
      '威胁式文案："不开通无法继续使用"',
      '把付费墙做成不可关闭的全屏弹窗',
    ],
  },
  error: {
    eyebrow: 'Patterns · 错误态',
    title: '网络断 / 接口挂 / 数据脏',
    lead: '错误是必然事件。好错误状态的标志是：用户能立即知道下一步该做什么。AI 默认会写 "Error: xxx"——这把内部错误暴露给了用户。',
    examples: [
      {
        kind: 'network',
        copy: '网络好像断了一下。检查一下 Wi-Fi，再试一次。',
        action: '重试',
        secondary: '查看网络设置',
      },
      {
        kind: 'server',
        copy: '我们这边出了点问题。已经记录到日志，1 分钟后再试。',
        action: '重试',
        secondary: '回到首页',
      },
      {
        kind: 'validation',
        copy: '邮箱格式不对。请检查 @ 符号和域名。',
        action: '我知道了',
      },
    ],
    rules: [
      '告诉用户发生了什么（用人话，不是 stack trace）',
      '告诉用户下一步能做什么（重试 / 改输入 / 联系支持）',
      '不要让用户面对"未知错误"',
    ],
    pitfalls: [
      '直接显示 "500 Internal Server Error"',
      '错误文案用红字大号惊吓用户',
      'error toast 自动消失，用户没来得及读',
    ],
  },
}

export function PatternsPage({ slug }: { slug?: string }) {
  if (!slug) return <PatternsIndex />

  const meta = patterns.find((p) => p.slug === slug)
  if (!meta) return <NotFoundPage path={`patterns/${slug}`} />
  if (slug === 'conversation-timestamp') return <ConversationTimestampPage />
  const c = CONTENT[slug as BasicPatternSlug]
  if (!c) return <NotFoundPage path={`patterns/${slug}`} />

  return (
    <>
      <DocsPageHeader title={c.title} subtitle={c.lead} />

      <Section heading="三个典型例子" subheading="文案 + 主操作 + 次操作。所有按钮都引用 Button schema。">
        <div className="docs-pattern-examples">
          {c.examples.map((e, i) => (
            <PatternCard key={i} example={e} />
          ))}
        </div>
      </Section>

      <Section heading="Do / Don't">
        <div className="docs-do-dont">
          <div className="docs-do-dont__col docs-do-dont__col--do">
            <div className="docs-do-dont__title">Do</div>
            <ul>
              {c.rules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="docs-do-dont__col docs-do-dont__col--dont">
            <div className="docs-do-dont__title">Don't</div>
            <ul>
              {c.pitfalls.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}

const timestampLogic = [
  ['会话首条消息', '显示完整日期或「今天 HH:mm」', '让用户知道这段对话从什么时候开始。'],
  ['两条消息间隔 < 15 分钟', '不重复显示时间戳', '连续阅读不被打断。'],
  ['两条消息间隔 >= 15 分钟', '在下一条消息前插入时间戳', '标记上下文发生过暂停。'],
  ['跨天', '显示「昨天 / 周几 / 日期」', '避免只看 HH:mm 时误判发生日期。'],
  ['发送中新消息', '不提前插入未来时间戳', '等消息进入流后按真实 createdAt 计算。'],
]

function ConversationTimestampPage() {
  return (
    <>
      <DocsPageHeader
        title="对话时间戳能力"
        subtitle="把时间戳从装饰文字变成 Conversation Flow 的规则：只在用户需要重新定位上下文时出现。"
        meta={
          <>
            <span>Pattern <strong>Conversation Flow</strong></span>
            <span>状态 <strong>draft</strong></span>
          </>
        }
      />

      <section className="docs-timestamp-hero">
        <div className="docs-timestamp-phone" aria-label="点点对话页时间戳 demo">
          <DottedDemoScreen />
        </div>

        <div className="docs-timestamp-brief">
          <p className="docs-timestamp-brief__eyebrow">Design Decision</p>
          <h2>时间戳不是消息，也不是分割线</h2>
          <p>
            左侧直接使用点点对话页基座和真实消息气泡。时间戳是对话流的弱锚点：居中、低对比、不占用气泡角色。用户连续对话时不打断阅读，
            只有当时间间隔让上下文可能断开时才出现。
          </p>
          <div className="docs-timestamp-checks">
            <span>13px dialog-time</span>
            <span>Placeholder 色</span>
            <span>不带背景</span>
            <span>不响应点击</span>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">插入逻辑</h2>
        <p className="docs-section-block__subheading">
          这张表是给 agent 和开发看的判断规则。页面渲染只接收排序后的消息事件，不在样式层猜时间。
        </p>
        <div className="docs-timestamp-table">
          {timestampLogic.map(([condition, behavior, reason]) => (
            <div className="docs-timestamp-row" key={condition}>
              <div className="docs-timestamp-row__condition">{condition}</div>
              <div className="docs-timestamp-row__behavior">{behavior}</div>
              <div className="docs-timestamp-row__reason">{reason}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">结构约束</h2>
        <div className="docs-timestamp-rules">
          <div>
            <strong>时间戳作为 stream item</strong>
            <p>数据层类型为 `time`，和 `message`、`ai-card` 同级，不能塞进任意一条消息气泡内部。</p>
          </div>
          <div>
            <strong>样式沿用 MessageBubble 规范</strong>
            <p>对话左右 padding 仍是 12px；时间戳居中，使用 `dialog-time` 和 `Placeholder`，不新增颜色。</p>
          </div>
          <div>
            <strong>滚动规则不变</strong>
            <p>键盘拉起、发送新消息、语音识别完成后仍滚动到底部；时间戳跟随消息流自然滚动。</p>
          </div>
        </div>
      </section>
    </>
  )
}

function PatternsIndex() {
  return (
    <>
      <DocsHero
        title="四个最容易被 AI 瞎编的状态"
        lead="v1 不做完整 patterns 库。只做四个 —— 它们是价值密度最高、AI 生成时最容易“忘记”的地方。讲清楚每个状态的形态、文案、出口，零样本生成合规率才能上得去。"
      />
      <section className="docs-section-block">
        <div className="docs-explore__grid">
          {patterns.map((p) => (
            <button
              key={p.slug}
              className="docs-explore__item"
              onClick={() => navigate(`/docs/patterns/${p.slug}`)}
            >
              <div className="docs-explore__label">
                {p.name}
                <Icon.ChevronRight size={14} />
              </div>
              <div className="docs-explore__desc">{p.desc}</div>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

function PatternCard({
  example,
}: {
  example: { kind: string; copy: string; action: string; secondary?: string }
}) {
  return (
    <div className="docs-pattern-card">
      <div className="docs-pattern-card__kind">{example.kind}</div>
      <div className="docs-pattern-card__copy">{example.copy}</div>
      <div className="docs-pattern-card__actions">
        <button className="mb-button mb-button--primary mb-button--compact">
          {example.action}
        </button>
        {example.secondary && (
          <button className="mb-button mb-button--ghost mb-button--compact">
            {example.secondary}
          </button>
        )}
      </div>
    </div>
  )
}

function Section({
  heading,
  subheading,
  children,
}: {
  heading: string
  subheading?: string
  children: ReactNode
}) {
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{heading}</h2>
      {subheading && <p className="docs-section-block__subheading">{subheading}</p>}
      {children}
    </section>
  )
}
