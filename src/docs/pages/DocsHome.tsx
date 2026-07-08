import { components, pages } from '../manifest'
import { navigate } from '../router'
import { Icon } from '../icons'
import { DocsHero } from '../PageHeader'

/**
 * DocsHome —— Dots 设计系统门面页。
 * 合并原「介绍」和「宣言」：先讲为什么，再讲 Harness 如何落地。
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
        lead="Dots 不是另一个组件展示站，而是一套把设计意图写成契约的工作台。文档是真相源，组件是 Harness，页面 demo 是验证夹具，AI agent 按这条轨道生成、复用和检查界面。"
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
        <h2 className="docs-section-block__heading">为什么要重做设计系统</h2>
        <p className="docs-section-block__subheading">
          传统设计系统默认读者是人。AI 进入之后，读者变成了「人 + 机器」：只写散文、截图和经验，已经不够了。
        </p>
        <div className="docs-problem-grid">
          <div className="docs-problem">
            <div className="docs-problem__num">文档读了也用不上</div>
            <p className="docs-problem__text">
              很多设计系统文档写得很完整，但新人真正交付时还是复制一个相似组件、改几个值。问题不是文档不够好，而是散文式规则很难被持续检索和执行。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">AI 会放大偏差</div>
            <p className="docs-problem__text">
              AI 写 UI 很快，但它会用训练数据里的平均值补空：随手写一个蓝色、一个圆角、一个 padding。看起来像设计系统，实际上每一处都不在系统里。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">约定必须升级成契约</div>
            <p className="docs-problem__text">
              「primary 用品牌色」是给人看的约定；「background 必须引用 info 5，variant 必须命中 schema」才是给机器读的契约。契约可以被生成，也可以被检查。
            </p>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">Dots 的答案：Harness Engineering</h2>
        <p className="docs-section-block__subheading">
          Harness 不是更多文档，而是把「怎么生成」和「怎么判断没跑偏」前置到设计系统里。
        </p>
        <div className="docs-problem-grid">
          <div className="docs-problem">
            <div className="docs-problem__num">Token Harness</div>
            <p className="docs-problem__text">
              颜色、字号、间距、圆角、动效都是封闭枚举。AI 不能自己发明一个中间值，代码也不能绕过 token 写硬编码。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">Component Harness</div>
            <p className="docs-problem__text">
              每个核心组件都包含语义定义、props schema、状态矩阵、交互约束、do / don't 和验证清单。组件不只是样式，而是可执行单位。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">Pattern / Page Harness</div>
            <p className="docs-problem__text">
              消息流、Skill 选择、语音输入、AI 生成卡片这些真实业务模式进入页面 demo。页面不是展示稿，而是验证组件组合是否成立的夹具。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">Agent Harness</div>
            <p className="docs-problem__text">
              文档、schema、Copy for AI 和后续 MCP 入口，让 agent 在生成前先读规则，生成后能跑检查，而不是凭截图和旧代码猜。
            </p>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">这套系统服务三类读者</h2>
        <p className="docs-section-block__subheading">
          Dots 的文档不是只给设计师看。它同时要让产品设计师能做判断、开发能落代码、agent 能执行。
        </p>

        <Principle
          num="01"
          title="产品设计师：定义什么算对"
          rule="先写清楚场景、目标、状态和验收标准，再进入 Figma 或代码。页面 demo 是验证业务流，不是堆一个好看的截图。"
          why="当 AI 能快速生成很多版本时，稀缺的不再是做出第一版，而是定义哪些约束必须被保留、哪些偏差应该被拒绝。"
        />
        <Principle
          num="02"
          title="开发：复用已经被验证的契约"
          rule="实现时优先引用已有 token、组件和页面 harness。新增内容必须补齐 schema、状态、约束和验证方式。"
          why="代码不是规范的替代品，而是规范的运行结果。只有当实现能回到文档解释自己为什么这样写，后续迭代才不会失控。"
        />
        <Principle
          num="03"
          title="AI agent：读契约，跑检查，暴露不确定"
          rule="agent 的工作顺序是读 strategy、tokens、principles、目标 harness，再生成代码并验证。无法规则化的审美判断必须交回给人。"
          why="AI 不是审美裁判。它真正适合做的是高频执行和一致性检查，所以系统要给它清晰边界，而不是让它自由发挥。"
        />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">验收标准也变了</h2>
        <p className="docs-section-block__subheading">
          传统指标是文档完整度和组件覆盖率。Dots 更关心一件事：一个没见过项目的 agent，读完契约后能不能生成合规页面。
        </p>
        <div className="docs-stat-grid">
          <div className="docs-stat">
            <div className="docs-stat__label">合法 token 使用率</div>
            <div className="docs-stat__value">≥ 95%</div>
            <div className="docs-stat__hint">颜色、间距、圆角、阴影都必须来自 Dots token。</div>
          </div>
          <div className="docs-stat">
            <div className="docs-stat__label">Props 命中率</div>
            <div className="docs-stat__value">100%</div>
            <div className="docs-stat__hint">组件属性必须命中 schema enum，不能临时扩展。</div>
          </div>
          <div className="docs-stat">
            <div className="docs-stat__label">状态完整性</div>
            <div className="docs-stat__value">5/5</div>
            <div className="docs-stat__hint">empty、loading、disabled、error、focus 等状态要能被覆盖。</div>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">从哪里开始</h2>
        <p className="docs-section-block__subheading">
          不同角色从不同入口开始，但最终都回到同一件事：把一次页面验证沉淀成下一次可复用的规则。
        </p>
        <div className="docs-explore__grid">
          <ExploreLink
            label="设计工作流"
            desc="PM / 设计 / agent 如何从想法跑到页面"
            onClick={() => navigate('/docs/workflow')}
          />
          <ExploreLink
            label="设计令牌"
            desc="所有视觉决策的封闭枚举"
            onClick={() => navigate('/docs/tokens')}
          />
          <ExploreLink
            label="设计原则"
            desc="遇到边界情况时怎么判断"
            onClick={() => navigate('/docs/principles')}
          />
          <ExploreLink
            label={`组件库 · ${components.length}`}
            desc="Component Harness 和实时预览"
            onClick={() => navigate(`/docs/components/${components[0].slug}`)}
          />
          <ExploreLink
            label={`页面 base case · ${pages.length}`}
            desc="真实业务流里的 Pattern Harness"
            onClick={() => navigate(`/docs/pages/${pages[0].slug}`)}
          />
          <ExploreLink
            label="触觉反馈"
            desc="交互反馈的意图分级"
            onClick={() => navigate('/docs/haptics')}
          />
          <ExploreLink
            label="项目汇报 PPT"
            desc="设计系统卖点演示，键盘翻页"
            onClick={() => navigate('/docs/pitch')}
          />
        </div>
      </section>
    </>
  )
}

function Principle({
  num,
  title,
  rule,
  why,
}: {
  num: string
  title: string
  rule: string
  why: string
}) {
  return (
    <div className="docs-principle">
      <div className="docs-principle__num">{num}</div>
      <div className="docs-principle__body">
        <h3 className="docs-principle__title">{title}</h3>
        <p className="docs-principle__text">{rule}</p>
        <blockquote className="docs-principle__why">{why}</blockquote>
      </div>
    </div>
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
