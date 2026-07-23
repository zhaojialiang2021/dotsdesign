import { useCallback, useEffect, useState } from 'react'

export type Locale = 'zh' | 'en'
const KEY = 'dots-docs-locale-v2'

function readInitial(): Locale {
  if (typeof window === 'undefined') return 'zh'
  try {
    const stored = window.localStorage.getItem(KEY)
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  // 没有手动选择过语言时，设计文档默认中文。
  return 'zh'
}

let _locale: Locale = readInitial()
const listeners = new Set<(l: Locale) => void>()

function setLocaleGlobal(l: Locale) {
  _locale = l
  try {
    window.localStorage.setItem(KEY, l)
  } catch {
    /* ignore */
  }
  document.documentElement.lang = l === 'en' ? 'en' : 'zh-CN'
  listeners.forEach((cb) => cb(l))
}

// 初始化时同步 lang 属性
if (typeof document !== 'undefined') {
  document.documentElement.lang = _locale === 'en' ? 'en' : 'zh-CN'
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(_locale)

  useEffect(() => {
    const cb = (l: Locale) => setLocale(l)
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
  }, [])

  const change = useCallback((l: Locale) => {
    setLocaleGlobal(l)
  }, [])

  return { locale, setLocale: change }
}

// === 词表 ===
type Dict = Record<string, { zh: string; en: string }>

const DICT: Dict = {
  // 顶部两组（Dots 已合并进 System）
  'area.system': { zh: '设计系统', en: 'System' },
  'area.reports': { zh: '项目demo', en: 'Project Demo' },
  'area.writing': { zh: '构建的思考', en: 'Notes on Building' },

  // 入门组
  'group.start': { zh: '入门', en: 'Getting Started' },
  'nav.intro': { zh: '介绍', en: 'Introduction' },
  'nav.manifesto': { zh: '宣言', en: 'Manifesto' },

  // 基础组
  'group.foundations': { zh: '基础', en: 'Foundations' },
  'foundation.color': { zh: '颜色', en: 'Color' },
  'foundation.typography': { zh: '字体', en: 'Typography' },
  'foundation.spacing': { zh: '间距', en: 'Spacing' },
  'foundation.radius': { zh: '圆角', en: 'Radius' },
  'foundation.motion': { zh: '动效', en: 'Motion' },

  // 规则组
  'group.guidelines': { zh: '规则', en: 'Guidelines' },
  'nav.principles': { zh: '设计原则', en: 'Principles' },
  'nav.haptics': { zh: '触觉反馈', en: 'Haptics' },
  'nav.workflow': { zh: '设计工作流', en: 'Workflow' },

  // 组件 + Patterns
  'group.components': { zh: '组件', en: 'Components' },
  'group.patterns': { zh: '模式', en: 'Patterns' },
  'group.reports': { zh: '项目demo', en: 'Project Demo' },
  'badge.deep': { zh: '深度', en: 'deep' },

  // 资源组
  'group.resources': { zh: '资源', en: 'Resources' },
  'nav.ai-workflows': { zh: 'AI 工作流', en: 'AI Workflows' },
  'nav.changelog': { zh: '更新日志', en: 'Changelog' },

  // 页面 base case（合并进 System）
  'group.live-samples': { zh: '页面', en: 'Live Samples' },
  'group.articles': { zh: '构建的思考', en: 'Notes on Building' },

  // Theme + locale 切换
  'theme.system': { zh: '系统', en: 'System' },
  'theme.light': { zh: '浅色', en: 'Light' },
  'theme.dark': { zh: '深色', en: 'Dark' },
  'theme.label': { zh: '主题', en: 'Theme' },
  'locale.label': { zh: '语言', en: 'Language' },
  'locale.zh': { zh: '中', en: '中' },
  'locale.en': { zh: 'EN', en: 'EN' },

  // CMDK
  'cmdk.search': { zh: '搜索', en: 'Search' },
  'cmdk.placeholder': {
    zh: '搜索页面、组件、思考…',
    en: 'Search pages, components, notes…',
  },
  'cmdk.empty': { zh: '没有匹配项', en: 'No matches' },
  'cmdk.move': { zh: '移动', en: 'navigate' },
  'cmdk.go': { zh: '跳转', en: 'open' },
  'cmdk.invoke': { zh: '唤起', en: 'invoke' },

  // SoonPage 通用
  'soon.tba': { zh: '内容稍后到位。', en: 'Content coming soon.' },

  // CMDK 底栏
  'cmdk.kbd.move': { zh: '移动', en: 'navigate' },
  'cmdk.kbd.go': { zh: '跳转', en: 'open' },
  'cmdk.kbd.invoke': { zh: '唤起', en: 'invoke' },
  'cmdk.recent': { zh: '最近访问', en: 'Recent' },

  // ComponentPage 各 section 标题
  'component.harness': { zh: 'Harness', en: 'Harness' },
  'component.harness.lead': {
    zh: '这部分定义 AI 如何理解、生成和验证这个组件。它比视觉样式更靠近执行契约。',
    en: 'How AI understands, generates, and validates this component. This is the execution contract beyond visuals.',
  },
  'component.live-demo': { zh: '实时预览', en: 'Live Demo' },
  'component.live-demo.lead': {
    zh: '可调 props 实时预览。所有数值来自 tokens / schema，不可硬编码。',
    en: 'Live preview with adjustable props. All values come from tokens / schema; no hardcoding allowed.',
  },
  'component.props': { zh: '属性', en: 'Props' },
  'component.props.lead': {
    zh: '所有 prop 都是封闭枚举，AI 必须从 values 中选择。',
    en: 'All props are closed enums; AI must pick from listed values.',
  },
  'component.states': { zh: '状态', en: 'States' },
  'component.states.lead': {
    zh: '完整状态矩阵 —— 渲染时必须每个状态都有定义，否则 AI 会瞎补。',
    en: 'Full state matrix. Every state must be explicitly defined; otherwise the AI will improvise.',
  },
  'component.anatomy': { zh: '结构', en: 'Anatomy' },
  'component.anatomy.lead': {
    zh: '每个组成部分用什么 token、约束在哪。SVG 图解中的标号对应下表 part。',
    en: 'Which token each part uses and its constraint. Numbers in the SVG match the table below.',
  },
  'component.constraints': { zh: '约束', en: 'Constraints' },
  'component.constraints.lead': {
    zh: 'AI 生成时违反这些约束 = 幻觉。可被 lint 抓出来。',
    en: 'Violating these constraints during AI generation = hallucination. Caught by lint.',
  },
  'component.do-dont': { zh: '建议 / 禁止', en: "Do / Don't" },
  'component.do': { zh: '建议', en: 'Do' },
  'component.dont': { zh: '禁止', en: "Don't" },
  'component.copy-ai': { zh: '复制给 AI', en: 'Copy for AI' },
  'component.copy-schema': { zh: '复制 Schema', en: 'Schema JSON' },
  'component.deep-tag': { zh: '深度组件', en: 'deep' },

  // 内容文案 - 通用
  'common.copied': { zh: '已复制', en: 'Copied' },
  'common.copy-failed': { zh: '复制失败', en: 'Copy failed' },
  'a11y.skip': { zh: '跳到主内容', en: 'Skip to content' },

  // 页脚 prev / next
  'footer.prev': { zh: '上一页', en: 'Previous' },
  'footer.next': { zh: '下一页', en: 'Next' },

  // AI Workflows 页 UI 文案
  'aiw.title': {
    zh: '把这套设计系统接进 AI',
    en: 'Plug this design system into your AI',
  },
  'aiw.lead': {
    zh: '默认用 npm MCP 包接入 Codex、Claude Code 或 Cursor；Vercel 负责给人看 demo 和文档，本地模式只用于维护者调试。',
    en: 'Use the npm MCP package for Codex, Claude Code, or Cursor by default. Vercel is for human docs and demos; local mode is for maintainers.',
  },
  'aiw.step.title': {
    zh: '三步接入 AI 工具',
    en: 'Three steps to plug into AI tools',
  },
  'aiw.step.lead': {
    zh: '推荐把 Dots 作为 MCP server 接进 AI 工具，让 agent 按需读取规范、页面模板和 demo 工作流。',
    en: 'Add Dots as an MCP server so the agent can read specs, page templates, and demo workflows on demand.',
  },
  'aiw.step1.title': { zh: '配置 npm MCP 包', en: 'Configure the npm MCP package' },
  'aiw.step2.title': { zh: '让 AI 先读工作流', en: 'Ask the AI to read the workflow first' },
  'aiw.step2.body.before': { zh: '开始做 demo 前，让 AI 调用 ', en: 'Before building a demo, ask the AI to call ' },
  'aiw.step2.body.middle': {
    zh: '，再按需搜索组件、页面和框架文档。',
    en: ', then search component, page, and framework docs as needed.',
  },
  'aiw.step2.body.after': {
    zh: '',
    en: '',
  },
  'aiw.step3.title': { zh: '用 Vercel 看结果', en: 'Review the result on Vercel' },
  'aiw.step3.body.before': {
    zh: 'MCP 给 AI 读规范，Vercel 给人看 demo。维护者发包前运行 ',
    en: 'MCP feeds specs to AI; Vercel shows demos to humans. Before publishing, maintainers run ',
  },
  'aiw.step3.body.after': {
    zh: '，保证 npm 包里的文档快照和仓库一致。',
    en: ' to keep the npm package snapshot aligned with the repo.',
  },
  'aiw.endpoints.title': { zh: 'HTTP 端点', en: 'HTTP Endpoints' },
  'aiw.endpoints.lead': {
    zh: '构建产物直接 expose 为 HTTP 路由。任何 fetch / curl 都能拉到当前最新契约，无需 clone 仓库。',
    en: 'Build artifacts are exposed as HTTP routes. Any fetch / curl returns the current contract — no need to clone the repo.',
  },
  'aiw.endpoints.col.method': { zh: '方法', en: 'Method' },
  'aiw.endpoints.col.path': { zh: '路径', en: 'Path' },
  'aiw.endpoints.col.desc': { zh: '说明', en: 'Description' },
  'aiw.mcp.title': { zh: 'MCP 工具能力', en: 'MCP tools' },
  'aiw.mcp.lead': {
    zh: '让 AI 在生成过程中实时查询页面基座、组件规格和回答 loading 规则，而不是把全量契约塞进上下文。',
    en: 'Let the AI query page bases, component specs, and answer-loading rules during generation instead of stuffing the full contract into context.',
  },
  'aiw.mcp.tools-title': { zh: '6 个工具', en: '6 tools' },
  'aiw.mcp.config-title': { zh: '维护者本地模式', en: 'Maintainer local mode' },
  'aiw.prompts.title': { zh: 'Prompt 示例库', en: 'Prompt Library' },
  'aiw.prompts.lead': {
    zh: '点击复制 prompt 直接粘到 Cursor / Claude。所有 prompt 都已包含「用令牌名、不许 hardcode」的约束。',
    en: 'Copy a prompt and paste it into Cursor / Claude. Every prompt already contains the "use token names, no hardcoding" constraint.',
  },

  // 404
  'nf.eyebrow': { zh: '404 · 没找到', en: '404 · Not Found' },
  'nf.title': { zh: '没找到这一页', en: 'Page not found' },
  'nf.lead.before': { zh: '路径 ', en: 'The path ' },
  'nf.lead.after': {
    zh: ' 不在路由表里。可能是链接拼错了，或者这个页面已经被移除。',
    en: ' is not in the route table. The link may be mistyped, or the page has been removed.',
  },
  'nf.back': { zh: '回首页', en: 'Home' },
  'nf.explore': { zh: '逛逛深度组件', en: 'Browse components' },
  'nf.suggestions': { zh: '你可能想找的', en: 'You might be looking for' },
}

export function t(key: keyof typeof DICT, locale?: Locale): string {
  const entry = DICT[key]
  if (!entry) return String(key)
  return entry[locale ?? _locale] ?? entry.zh
}

/** 在 hook 内拿 t 函数，自动跟随当前 locale */
export function useT() {
  const { locale } = useLocale()
  return useCallback((key: keyof typeof DICT) => t(key, locale), [locale])
}
