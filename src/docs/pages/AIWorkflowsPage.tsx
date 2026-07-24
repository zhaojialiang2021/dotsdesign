import { useState } from 'react'
import { useToast } from '../useToast'
import { Icon } from '../icons'
import { useLocale, useT } from '../useLocale'
import { DocsPageHeader } from '../PageHeader'

const ENDPOINTS: { method: string; path: string; desc: string }[] = [
  { method: 'GET', path: '/skill.md', desc: '一站式 Skill 包：design + components + 使用约定（推荐 AI 直接拉这个）' },
  { method: 'GET', path: '/design.md', desc: 'Token 紧凑 markdown' },
  { method: 'GET', path: '/tokens.json', desc: '扁平 token 列表（含 dark 模式覆盖）' },
  { method: 'GET', path: '/components.md', desc: '5 个深度组件契约 markdown' },
  { method: 'GET', path: '/components.json', desc: '组件契约 JSON' },
  { method: 'GET', path: '/llms.txt', desc: '站点入口索引（给 AI agent 当 robots.txt 用）' },
]

const PROMPTS: { title: string; body: string }[] = [
  {
    title: '生成一个登录页',
    body: `参考 https://docs.dots.design/skill.md 的设计契约，给 Dots 生成一个登录页：
- 顶部品牌区（logo + 一句标语）
- 邮箱输入 + 密码输入（用 Input 组件 schema，状态完整覆盖 empty/focus/error/disabled）
- 主 CTA（Button intent=primary, size=large, fullWidth=true）
- 次要操作"忘记密码"（Button intent=ghost）
- 加载中 / 错误反馈用 Empty State kind=error
要求所有颜色、间距、字号、圆角必须用令牌名，禁止 hardcoded hex/px。`,
  },
  {
    title: '做一个文件上传组件',
    body: `按 Dots 设计系统做一个文件上传组件，状态完整：
- empty：拖拽提示 + 点击选择
- loading：进度条 + 取消按钮
- error：错误信息 + 重试按钮
- success：文件名 + 移除按钮
不能漏任何状态。所有 token 必须命中 https://docs.dots.design/tokens.json。`,
  },
  {
    title: '做一个删除确认弹窗',
    body: `按 Dots 契约做一个删除确认弹窗：
- 用 Modal（不是 Sheet —— 删除是不可逆操作，必须强制选择）
- 主 CTA "删除" intent=destructive
- 次 CTA "取消" intent=secondary
- 配 light haptic
所有间距用 var(--space-N)。`,
  },
  {
    title: '检查我的代码是否合规',
    body: `检查这段代码是否符合 Dots 设计系统：
1. 所有颜色是否引用 var(--<token-name>)
2. 所有间距是否引用 var(--space-N)
3. 圆角是否在 5 级枚举内
4. 组件 props 是否命中 schema values
5. 状态是否完整（特别是 empty / error / loading）

[贴你的代码]`,
  },
]

const STEP_COPY = {
  zh: {
    step1Intro: '把下面这段配置放进 Codex、Claude Code、Cursor 等 AI 工具的 MCP 配置里，然后重启 AI 工具。这里用的是 npm 包，不绑定你的电脑路径，别人换一台电脑也能通过 npx 拉到同一套 Dots 规范。',
    step1Result: '接入成功的标志很简单：AI 工具里能看到 dots-design，并且让它调用 get_demo_workflow 时能返回内容。如果看不到，先重启工具，再检查包名、命令和网络。',
    step2Body: '开始做 demo 前，先让 AI 调用 get_demo_workflow。它会告诉 AI：先读哪些规范、要基于哪个页面模板、哪些 demo 规则不能漏。这个步骤是为了让 AI 按当前系统做事，而不是凭记忆拼页面。',
    step3Body: '制作阶段先让 AI 在本地跑出 HTML 或页面 demo。你能打开 localhost 地址并看到效果，就可以继续改；localhost 只能自己看。需要给产品、设计或同事看时，再把确认过的版本发布到 Vercel。',
  },
  en: {
    step1Intro: 'Paste this config into the MCP settings of Codex, Claude Code, Cursor, or another AI tool, then restart the tool. It uses the npm package, so it is not tied to one local path.',
    step1Result: 'Success means dots-design appears in the AI tool and get_demo_workflow returns content. If not, restart the tool and check the package name, command, and network.',
    step2Body: 'Before building a demo, ask the AI to call get_demo_workflow. It tells the AI which specs to read first, which page base to use, and which demo rules cannot be skipped.',
    step3Body: 'Preview locally during production. If a localhost URL opens and the demo looks right, keep iterating there. localhost is private to your computer; publish to Vercel only when you need a shareable link.',
  },
}

const CHECK_BLOCKS = {
  zh: [
    {
      title: '怎么才算接入成功',
      items: [
        'AI 工具的 MCP 列表里能看到 dots-design。',
        '让 AI 调用 get_demo_workflow，能返回 demo 制作流程、页面基座规则和验收清单。',
        '搜索“回答 loading”或“页面模板”时，AI 能读到对应规范。',
        '让 AI 做 demo 时，它会先跑一个本地地址给你看，而不是一上来要求发布。',
      ],
    },
    {
      title: '失败了先查什么',
      items: [
        '看配置里的包名是不是 dots-design-mcp，命令是不是 npx，参数里有没有 -y。',
        '改完 MCP 配置后必须重启 AI 工具；不重启经常不会生效。',
        '如果提示找不到包，先在终端试一下 npx -y dots-design-mcp，确认这台电脑能访问 npm。',
        '如果 AI 还是凭记忆写，就直接要求它先调用 get_demo_workflow，再继续做页面。',
        '如果仍然失败，把 AI 工具名、报错文案和 MCP 配置一起发给维护者排查。',
      ],
    },
    {
      title: '本地预览和 Vercel 怎么分工',
      items: [
        '本地预览是制作阶段用的：自己看效果、快速改、快速刷新。localhost 只能你自己打开。',
        'Vercel 是分享阶段用的：需要给产品、设计或同事看时，再发布一个线上链接。',
        '接入 MCP 不等于必须部署 Vercel；AI 工具可以先只在本地把 demo 跑起来。',
      ],
    },
  ],
  en: [
    {
      title: 'What success looks like',
      items: [
        'The AI tool shows a dots-design MCP server.',
        'Calling get_demo_workflow returns the demo workflow, page-base rules, and checklist.',
        'Searching “answer loading” or “page template” returns the matching specs.',
        'When asked to build a demo, the AI gives you a local preview URL instead of asking you to publish first.',
      ],
    },
    {
      title: 'If it fails, check these first',
      items: [
        'Confirm the package name is dots-design-mcp and the command uses npx -y.',
        'Restart the AI tool after editing MCP config; otherwise the change often will not load.',
        'If the package cannot be found, try npx -y dots-design-mcp in a terminal to confirm this computer can reach npm.',
        'If the AI still writes from memory, explicitly ask it to call get_demo_workflow before continuing.',
        'If it still fails, send the AI tool name, error text, and MCP config to the maintainer.',
      ],
    },
    {
      title: 'Local preview vs. Vercel',
      items: [
        'Local preview is for making the demo: inspect, adjust, and refresh quickly.',
        'Vercel is for sharing: publish only when someone else needs a link.',
        'Connecting MCP does not require Vercel; the AI can build and run the demo locally first.',
      ],
    },
  ],
}

const VERIFY_PROMPT = {
  zh: `请先调用 dots-design 的 get_demo_workflow，确认你能读取 Dots 的 demo 制作流程。

然后告诉我四件事：
1. 是否接入成功；
2. 你读到了哪些关键规则；
3. 如果接入失败，下一步应该检查什么；
4. 如果我要做一个页面 demo，你会先本地预览还是直接发布到 Vercel，为什么。

注意：本地预览能打开，就足够继续制作；Vercel 只是需要分享给别人时再用。`,
  en: `Call get_demo_workflow from dots-design first and confirm that you can read the Dots demo workflow.

Then tell me four things:
1. Whether the integration works;
2. Which key rules you found;
3. If the integration fails, what should be checked next;
4. If I ask for a page demo, whether you would preview locally first or publish to Vercel directly, and why.

Note: a working local preview is enough for production iteration; Vercel is only for sharing with others.`,
}

const QUICK_PATH = {
  zh: [
    {
      title: 'MCP 负责读规范',
      body: 'AI 通过 dots-design-mcp 读取设计规范、页面模板、组件契约和 demo 工作流。目标是让 AI 自己查资料，不需要你每次复制一大段文档。',
    },
    {
      title: '本地负责做 demo',
      body: 'AI 先在你的电脑上生成并打开 HTML 或页面 demo。这个阶段不需要线上链接，能打开本地预览就说明可以继续迭代。',
    },
    {
      title: 'Vercel 负责分享',
      body: '只有需要给别人看时，才把确认过的版本发布到 Vercel。Vercel 不是 MCP 接入的前置条件。',
    },
  ],
  en: [
    {
      title: 'MCP reads the system',
      body: 'The AI uses dots-design-mcp to read specs, page templates, component contracts, and demo workflows.',
    },
    {
      title: 'Local preview builds demos',
      body: 'The AI generates and opens the demo on your computer first. No public link is needed during iteration.',
    },
    {
      title: 'Vercel shares results',
      body: 'Publish to Vercel only when product, design, or teammates need a shareable preview link.',
    },
  ],
}

const TROUBLESHOOTING = {
  zh: [
    {
      symptom: 'MCP 列表里没有 dots-design',
      fix: '先重启 AI 工具，再检查配置是不是放在当前工具真正读取的 MCP 配置文件里。',
    },
    {
      symptom: '提示找不到 dots-design-mcp',
      fix: '先确认这台电脑能访问 npm；再检查包名是否写成 dots-design-mcp，命令是否是 npx，参数是否有 -y。',
    },
    {
      symptom: 'AI 看得到工具，但还是凭空写 demo',
      fix: '直接要求它先调用 get_demo_workflow，再调用 search_design_system 查页面模板或组件规范。',
    },
    {
      symptom: '本地地址打不开',
      fix: '通常是本地预览服务没启动，或者端口变了。让 AI 重新启动本地服务，并给你最新地址。',
    },
    {
      symptom: 'Vercel 链接不是最新效果',
      fix: '检查代码是否已经推到 GitHub，以及 Vercel 部署是否完成。Vercel 只是分享链接，不影响 MCP 接入。',
    },
  ],
  en: [
    {
      symptom: 'dots-design does not appear in the MCP list',
      fix: 'Restart the AI tool first, then confirm the config is in the MCP config file that this tool actually reads.',
    },
    {
      symptom: 'dots-design-mcp cannot be found',
      fix: 'Confirm the computer can reach npm. Then check that the package is dots-design-mcp, the command is npx, and args include -y.',
    },
    {
      symptom: 'The AI sees the tools but still invents the demo',
      fix: 'Ask it to call get_demo_workflow first, then search_design_system for the page template or component spec.',
    },
    {
      symptom: 'The local URL does not open',
      fix: 'The local preview server is probably not running, or the port changed. Ask the AI to restart it and give you the latest URL.',
    },
    {
      symptom: 'The Vercel link is not showing the latest work',
      fix: 'Check whether the code was pushed to GitHub and whether the Vercel deployment finished. Vercel is only for sharing and does not affect MCP.',
    },
  ],
}

export function AIWorkflowsPage() {
  const t = useT()
  const { show, node: toastNode } = useToast()

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(
      () => show(t('common.copied')),
      () => show(t('common.copy-failed')),
    )
  }

  return (
    <>
      <DocsPageHeader title={t('aiw.title')} subtitle={t('aiw.lead')} />

      <SectionQuickPath />
      <SectionThreeStep onCopy={copy} />
      <SectionReadiness />
      <SectionVerifyPrompt onCopy={copy} />
      <SectionTroubleshooting />
      <SectionEndpoints onCopy={copy} />
      <SectionMcp />
      <SectionPromptLibrary onCopy={copy} />

      {toastNode}
    </>
  )
}

function SectionThreeStep({ onCopy }: { onCopy: (s: string) => void }) {
  const t = useT()
  const { locale } = useLocale()
  const copy = STEP_COPY[locale]
  const config = `{
  "mcpServers": {
    "dots-design": {
      "command": "npx",
      "args": ["-y", "dots-design-mcp"]
    }
  }
}`
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{t('aiw.step.title')}</h2>
      <p className="docs-section-block__subheading">{t('aiw.step.lead')}</p>

      <ol className="docs-step-list">
        <li>
          <div className="docs-step__main">
            <div className="docs-step__title">{t('aiw.step1.title')}</div>
            <div className="docs-step__body">
              <p style={{ marginTop: 0 }}>{copy.step1Intro}</p>
              <pre className="docs-codeblock docs-codeblock--config">
                <code>{config}</code>
                <button className="docs-codeblock__copy" onClick={() => onCopy(config)}>
                  <Icon.Copy size={13} />
                </button>
              </pre>
              <p style={{ marginBottom: 0 }}>{copy.step1Result}</p>
            </div>
          </div>
        </li>
        <li>
          <div className="docs-step__main">
            <div className="docs-step__title">{t('aiw.step2.title')}</div>
            <div className="docs-step__body">
              {copy.step2Body}
            </div>
          </div>
        </li>
        <li>
          <div className="docs-step__main">
            <div className="docs-step__title">{t('aiw.step3.title')}</div>
            <div className="docs-step__body">
              <p style={{ margin: 0 }}>{copy.step3Body}</p>
            </div>
          </div>
        </li>
      </ol>
    </section>
  )
}

function SectionReadiness() {
  const { locale } = useLocale()
  const blocks = CHECK_BLOCKS[locale]
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{locale === 'zh' ? '接入后怎么验证' : 'How to verify it works'}</h2>
      <p className="docs-section-block__subheading">
        {locale === 'zh'
          ? '不用猜有没有接好。按下面几项检查，先确认 AI 真能读到 Dots，再让它做 demo。'
          : 'Do not guess whether it worked. Check these items first, then ask the AI to build demos.'}
      </p>
      <div className="docs-ai-check-grid">
        {blocks.map((block) => (
          <div className="docs-card docs-ai-check-card" key={block.title}>
            <div className="docs-card__title">{block.title}</div>
            <ul className="docs-ai-check-list docs-text--subhead docs-text--secondary">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionQuickPath() {
  const { locale } = useLocale()
  const items = QUICK_PATH[locale]
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{locale === 'zh' ? '推荐接入路径' : 'Recommended path'}</h2>
      <p className="docs-section-block__subheading">
        {locale === 'zh'
          ? 'MCP 负责让 AI 读规范，本地预览负责让你看效果，Vercel 负责给别人看结果。不要把“接入成功”和“线上发布”混在一起。'
          : 'MCP is for the AI to read the system, local preview is for your own review, and Vercel is for sharing the result. Keep them separate.'}
      </p>
      <div className="docs-ai-path-grid">
        {items.map((item, index) => (
          <div className="docs-card docs-ai-path-card" key={item.title}>
            <div className="docs-ai-path-card__index">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="docs-card__title">{item.title}</div>
            <p className="docs-text--subhead docs-text--secondary">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionVerifyPrompt({ onCopy }: { onCopy: (s: string) => void }) {
  const { locale } = useLocale()
  const prompt = VERIFY_PROMPT[locale]
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{locale === 'zh' ? '复制这段验收 prompt' : 'Copy this verification prompt'}</h2>
      <p className="docs-section-block__subheading">
        {locale === 'zh'
          ? '配置完 MCP 后，把这段话发给 AI。它能按要求回答，就说明接入不是“看起来配置了”，而是真的能读到 Dots。'
          : 'After configuring MCP, send this to the AI. If it answers correctly, the integration is actually working.'}
      </p>
      <pre className="docs-codeblock docs-codeblock--prompt docs-codeblock--standalone">
        <code>{prompt}</code>
        <button className="docs-codeblock__copy" onClick={() => onCopy(prompt)}>
          <Icon.Copy size={13} /> Copy
        </button>
      </pre>
    </section>
  )
}

function SectionTroubleshooting() {
  const { locale } = useLocale()
  const items = TROUBLESHOOTING[locale]
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{locale === 'zh' ? '失败了怎么办' : 'If it fails'}</h2>
      <p className="docs-section-block__subheading">
        {locale === 'zh'
          ? '先看现象，再处理。大多数问题不是设计系统坏了，而是 MCP 配置没加载、本地服务没启动，或者线上部署还没完成。'
          : 'Start from the symptom. Most issues are config reloads, local preview servers, or unfinished deployments.'}
      </p>
      <div className="docs-card" style={{ padding: 0 }}>
        <table className="docs-table">
          <thead>
            <tr>
              <th>{locale === 'zh' ? '现象' : 'Symptom'}</th>
              <th>{locale === 'zh' ? '处理方式' : 'Fix'}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.symptom}>
                <td style={{ fontWeight: 600 }}>{item.symptom}</td>
                <td style={{ color: 'var(--label-secondary)', lineHeight: 1.7 }}>{item.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function SectionEndpoints({ onCopy }: { onCopy: (s: string) => void }) {
  const t = useT()
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{t('aiw.endpoints.title')}</h2>
      <p className="docs-section-block__subheading">{t('aiw.endpoints.lead')}</p>
      <div className="docs-card" style={{ padding: 0 }}>
        <table className="docs-table">
          <thead>
            <tr>
              <th>{t('aiw.endpoints.col.method')}</th>
              <th>{t('aiw.endpoints.col.path')}</th>
              <th>{t('aiw.endpoints.col.desc')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ENDPOINTS.map((e) => (
              <tr key={e.path}>
                <td>
                  <code>{e.method}</code>
                </td>
                <td>
                  <code>{e.path}</code>
                </td>
                <td style={{ color: 'var(--label-secondary)' }}>{e.desc}</td>
                <td>
                  <button
                    className="docs-copy-btn docs-copy-btn--small"
                    onClick={() => onCopy(`curl ${location.origin}${e.path}`)}
                  >
                    <Icon.Copy size={11} /> curl
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function SectionMcp() {
  const t = useT()
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{t('aiw.mcp.title')}</h2>
      <p className="docs-section-block__subheading">{t('aiw.mcp.lead')}</p>

      <div className="docs-card">
        <div className="docs-card__title">{t('aiw.mcp.tools-title')}</div>
        <ul className="docs-text--subhead docs-text--secondary" style={{ margin: 0, paddingLeft: 'var(--space-5)', lineHeight: 1.75 }}>
          <li>
            <code>search_design_system</code> · 搜索设计系统规范、页面模板、组件文档和 demo 规则
          </li>
          <li>
            <code>read_design_doc</code> · 读取指定文档
          </li>
          <li>
            <code>get_demo_workflow</code> · 返回 demo 制作前必须读取的文档顺序和关键规则
          </li>
          <li>
            <code>validate_demo_request</code> · 生成实现前检查清单
          </li>
          <li>
            <code>get_component_spec</code> · 读取组件规格
          </li>
          <li>
            <code>get_page_template</code> · 读取页面模板
          </li>
        </ul>
      </div>
    </section>
  )
}

function SectionPromptLibrary({ onCopy }: { onCopy: (s: string) => void }) {
  const t = useT()
  const [active, setActive] = useState(0)
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{t('aiw.prompts.title')}</h2>
      <p className="docs-section-block__subheading">{t('aiw.prompts.lead')}</p>
      <div className="docs-prompt-tabs">
        {PROMPTS.map((p, i) => (
          <button
            key={i}
            className={`docs-prompt-tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {p.title}
          </button>
        ))}
      </div>
      <pre className="docs-codeblock docs-codeblock--prompt docs-codeblock--standalone">
        <code>{PROMPTS[active].body}</code>
        <button
          className="docs-codeblock__copy"
          onClick={() => onCopy(PROMPTS[active].body)}
        >
          <Icon.Copy size={13} /> Copy
        </button>
      </pre>
    </section>
  )
}
