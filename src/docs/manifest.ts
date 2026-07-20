// 文档站资产清单 —— 单一真相源
// 增删组件/页面，先改这里再加路由配置

export type ComponentSlug =
  | 'button'
  | 'input'
  | 'card'
  | 'sheet'
  | 'empty-state'
  | 'switch'
  | 'divider'
  | 'toast'
  | 'message-bubble'
  | 'live-waveform'

export type PageSlug =
  | 'dotted-demo'

export type ComponentMeta = {
  slug: ComponentSlug
  name: string
  status: 'placeholder' | 'draft' | 'complete'
  /** 深度组件使用 Component Harness：schema-driven 固定结构。其余保留作 backlog */
  depth?: 'deep' | 'shallow'
  filledInBatch?: 1 | 2 | 3 | null
}

export type PageMeta = {
  slug: PageSlug
  name: string
  subtitle: string
  /** 在主 App 里对应的 ScreenId */
  screenId: string
  /** 这个页面用到了哪些深度组件（活样本锚点，brief §3.2） */
  uses?: ComponentSlug[]
}

export const components: ComponentMeta[] = [
  // 5 个深度组件 —— brief §5.3
  { slug: 'button', name: 'Button', status: 'draft', depth: 'deep' },
  { slug: 'input', name: 'Input', status: 'placeholder', depth: 'deep' },
  { slug: 'card', name: 'Card', status: 'draft', depth: 'deep' },
  { slug: 'sheet', name: 'Sheet', status: 'placeholder', depth: 'deep' },
  { slug: 'empty-state', name: 'Empty State', status: 'placeholder', depth: 'deep' },
  // 其余浅组件 —— backlog
  { slug: 'switch', name: 'Switch', status: 'placeholder', depth: 'shallow' },
  { slug: 'divider', name: 'Divider', status: 'placeholder', depth: 'shallow' },
  { slug: 'toast', name: 'Toast', status: 'placeholder', depth: 'shallow' },
  { slug: 'message-bubble', name: 'MessageBubble', status: 'complete', depth: 'deep' },
  { slug: 'live-waveform', name: 'LiveWaveform', status: 'draft', depth: 'deep' },
]

export const pages: PageMeta[] = [
  {
    slug: 'dotted-demo',
    name: '点点对话页',
    subtitle: '聊天 · Skill · AI 生成卡片',
    screenId: 'dotted-demo',
    uses: ['message-bubble', 'input', 'card'],
  },
]

// === Patterns（v1 四个）===
export type PatternMeta = {
  slug: 'empty' | 'loading' | 'permission' | 'error' | 'conversation-timestamp'
  name: string
  desc: string
  status: 'placeholder' | 'draft' | 'complete'
}

export const patterns: PatternMeta[] = [
  { slug: 'conversation-timestamp', name: '对话时间戳', desc: '消息流里什么时候露出时间，什么时候收起时间', status: 'draft' },
  { slug: 'empty', name: '空状态', desc: '没有内容时怎么呈现 —— AI 最容易忘记的状态', status: 'placeholder' },
  { slug: 'loading', name: '加载态', desc: '骨架屏 / 加载条 / 占位 —— 决定首屏感知速度', status: 'placeholder' },
  { slug: 'permission', name: '权限态', desc: '没登录 / 没付费 / 缺权限 —— 必须留有出口', status: 'placeholder' },
  { slug: 'error', name: '错误态', desc: '网络断 / 接口挂 / 数据脏 —— 给用户能动的下一步', status: 'placeholder' },
]

// === 项目demo ===
export type ReportDemoMeta = {
  slug: 'conversation-streaming' | 'long-thinking' | 'floating-cards-animation'
  name: string
  desc: string
  status: 'placeholder' | 'draft' | 'complete'
}

export const reportDemos: ReportDemoMeta[] = [
  { slug: 'conversation-streaming', name: '回答loading新增长思考模式', desc: 'AI 回答前的思考态和回答中的流式输出', status: 'draft' },
  { slug: 'long-thinking', name: '真实感 loading', desc: '连续思考、工具调用和最终回答的完整演示', status: 'draft' },
  { slug: 'floating-cards-animation', name: '景深浮动卡片动画', desc: '多层卡片、应用图标和背景景深的营销动效 demo', status: 'draft' },
]

// === Writing（5 篇思考）===
export type WritingMeta = {
  slug:
    | 'manifesto'
    | 'prompt-to-harness'
    | 'when-making-is-not-scarce'
    | 'when-ai-takes-the-wheel'
    | 'how-i-fed-my-design-system-to-ai'
  title: string
  desc: string
  status: 'placeholder' | 'draft' | 'published'
}

export const writings: WritingMeta[] = [
  {
    slug: 'manifesto',
    title: '也是给 AI 设计的 Design System',
    desc: 'AI-native 设计系统的理念与方法论',
    status: 'draft',
  },
  {
    slug: 'prompt-to-harness',
    title: '从 Prompt 到 Harness',
    desc: 'AI Agent 时代的人机协作，正在从表达意图走向组织执行',
    status: 'published',
  },
  {
    slug: 'how-i-fed-my-design-system-to-ai',
    title: '我是怎么把自己的设计系统接进 AI 的',
    desc: 'Dots 的实操路径：从 markdown 到 schema 到 MCP',
    status: 'draft',
  },
  {
    slug: 'when-making-is-not-scarce',
    title: '当"做出来"不再稀缺',
    desc: '当 AI 让"做出来"不再昂贵，设计师真正稀缺的能力是什么',
    status: 'published',
  },
  {
    slug: 'when-ai-takes-the-wheel',
    title: '当 AI 坐进驾驶位',
    desc: '从 Copilot 到 Driving：在驾驶位上工作的四个变化和一个核心能力',
    status: 'published',
  },
]
