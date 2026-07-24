import { components, pages } from '../manifest'
import { navigate } from '../router'
import { Icon } from '../icons'
import { DocsHero } from '../PageHeader'

/**
 * DocsHome —— Dots 设计系统入口页。
 * 介绍和设计工作流合并在这里，避免入口拆散后重复解释同一套方法。
 */
export function DocsHome() {
  return (
    <>
      <DocsHero
        title={
          <>
            给 AI 也设计的<em>设计系统</em>
          </>
        }
        lead="Dots 把设计意图写成可读取、可生成、可检查的契约。文档是真相源，组件和页面是验证夹具，AI agent 先读规则再生成界面。"
        meta={
          <>
            <span>Docs as source</span>
            <span className="docs-hero__dot" />
            <span>Harness Engineering</span>
            <span className="docs-hero__dot" />
            <span>{components.length} 个组件 · {pages.length} 个页面</span>
          </>
        }
      />

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">Dots 是什么</h2>
        <p className="docs-section-block__subheading">
          这不是组件陈列页，而是一套让人和 AI 共同执行的设计系统。
        </p>
        <div className="docs-problem-grid">
          <div className="docs-problem">
            <div className="docs-problem__num">Token 是边界</div>
            <p className="docs-problem__text">
              颜色、字号、间距、圆角和动效都来自封闭令牌，减少随手写值带来的偏差。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">组件是契约</div>
            <p className="docs-problem__text">
              每个组件都说明语义、状态、约束和验收方式，开发和 agent 都按同一份规则实现。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">Demo 是验证</div>
            <p className="docs-problem__text">
              页面 demo 用真实业务流检查组件组合是否成立，结论再回写成下一次可复用的规范。
            </p>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">设计工作流</h2>
        <p className="docs-section-block__subheading">
          先写清楚目标和约束，再画页面、写代码、跑检查。不要让 AI 凭截图猜规则。
        </p>
        <div className="docs-problem-grid">
          <div className="docs-problem">
            <div className="docs-problem__num">1. 定义问题</div>
            <p className="docs-problem__text">
              从需求进入，确认场景、目标、状态和验收标准。复杂需求先拆成可验证的页面或组件。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">2. 读取规则</div>
            <p className="docs-problem__text">
              按 strategy、persona、tokens、principles、haptics 和目标文档读取，先对齐系统边界。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">3. 生成与检查</div>
            <p className="docs-problem__text">
              基于页面模板生成 demo 或代码，再检查 token、状态、交互、视觉和构建结果。
            </p>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">AI 接入方式</h2>
        <p className="docs-section-block__subheading">
          Dots 可以通过 npm / MCP 给 Codex、Claude Code 等工具提供同一套规则，让 demo 制作从“贴截图”变成“读规范”。
        </p>
        <div className="docs-stat-grid">
          <div className="docs-stat">
            <div className="docs-stat__label">先读</div>
            <div className="docs-stat__value">MCP</div>
            <div className="docs-stat__hint">agent 获取规则、页面模板和 demo 工作流。</div>
          </div>
          <div className="docs-stat">
            <div className="docs-stat__label">再做</div>
            <div className="docs-stat__value">Demo</div>
            <div className="docs-stat__hint">基于真实页面基座生成，不脱离产品场景。</div>
          </div>
          <div className="docs-stat">
            <div className="docs-stat__label">最后收敛</div>
            <div className="docs-stat__value">Docs</div>
            <div className="docs-stat__hint">稳定规则统一沉淀回设计系统。</div>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">从哪里开始</h2>
        <p className="docs-section-block__subheading">
          按当前任务选入口。做页面看 demo，接入 AI 看工作流，落地实现看 token 和组件。
        </p>
        <div className="docs-explore__grid">
          <ExploreLink
            label="AI 工作流"
            desc="npm / MCP 接入和 demo 制作规则"
            onClick={() => navigate('/docs/ai-workflows')}
          />
          <ExploreLink
            label="设计令牌"
            desc="颜色、字号、间距、圆角和动效"
            onClick={() => navigate('/docs/foundations/color')}
          />
          <ExploreLink
            label="设计原则"
            desc="边界情况的判断标准"
            onClick={() => navigate('/docs/principles')}
          />
          <ExploreLink
            label={`组件库 · ${components.length}`}
            desc="组件契约和实时预览"
            onClick={() => navigate(`/docs/components/${components[0].slug}`)}
          />
          <ExploreLink
            label={`页面 Demo · ${pages.length}`}
            desc="真实业务流里的页面基座"
            onClick={() => navigate(`/docs/pages/${pages[0].slug}`)}
          />
          <ExploreLink
            label="触觉反馈"
            desc="交互反馈的意图分级"
            onClick={() => navigate('/docs/haptics')}
          />
          <ExploreLink
            label="项目 demo"
            desc="当前验证中的汇报演示"
            onClick={() => navigate('/docs/reports/conversation-streaming')}
          />
        </div>
      </section>
    </>
  )
}

function ExploreLink({
  label,
  desc,
  onClick,
}: {
  label: string
  desc: string
  onClick: () => void
}) {
  return (
    <button className="docs-explore__item" onClick={onClick}>
      <div className="docs-explore__label">
        {label}
        <Icon.ChevronRight size={14} />
      </div>
      <div className="docs-explore__desc">{desc}</div>
    </button>
  )
}
