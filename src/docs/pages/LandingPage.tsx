import { components } from '../manifest'
import { navigate } from '../router'
import { useLocale } from '../useLocale'
import dotsCardTwo from '../../assets/dotted/dots-landing-2.jpg'
import footerLogo from '../../assets/dotted/dots-studio-footer-logo.png'

export function LandingPage() {
  const { locale } = useLocale()
  const isZh = locale === 'zh'
  const productEntries = [
    {
      title: isZh ? '设计系统' : 'System',
      eyebrow: isZh ? '设计文档' : 'Design Docs',
      desc: isZh
        ? '令牌、原则、组件和页面都写成可执行文档。'
        : 'Tokens, principles, components, and pages are written as executable docs.',
      path: '/docs/intro',
    },
    {
      title: isZh ? '页面 Demo' : 'Demo',
      eyebrow: isZh ? '点点 App' : 'Dian Dian App',
      desc: isZh
        ? '点点对话页作为第一条业务验证链路。'
        : 'The Dian Dian chat screen is the first business validation loop.',
      path: '/docs/pages/dotted-demo',
    },
    {
      title: isZh ? `组件 · ${components.length}` : `Components · ${components.length}`,
      eyebrow: isZh ? '可复用界面' : 'Reusable UI',
      desc: isZh
        ? '把高频界面单元沉淀成可复用规格。'
        : 'Turn frequent interface units into reusable specs.',
      path: `/docs/components/${components[0].slug}`,
    },
    {
      title: isZh ? '构建笔记' : 'Writing',
      eyebrow: isZh ? '流程记录' : 'Process Notes',
      desc: isZh
        ? '记录这套设计工作流如何被搭出来。'
        : 'Notes on how this design workflow is being built.',
      path: '/docs/writing',
    },
  ]

  return (
    <div className="docs-landing">
      <section className="docs-landing__studio-hero">
        <div className="docs-landing__hero-copy">
          <p className="docs-landing__kicker">{isZh ? '点点设计系统' : 'dots design'}</p>
          <h1 className="docs-landing__studio-title">
            {isZh ? (
              <>
                为AI工作流
                <br />
                创建的设计系统
              </>
            ) : (
              <>
                Create frontier
                <br />
                design systems for AI workflows.
              </>
            )}
          </h1>
          <p className="docs-landing__studio-lead">
            {isZh
              ? '把点点的设计系统、组件规范、Figma 还原和上线流程放进同一个工作台。文档是源头，demo 是验证，代码是最终交付。'
              : 'A studio-style design system workspace for Dian Dian: docs as source, demos as proof, code as production output.'}
          </p>
          <div className="docs-landing__studio-actions">
            <button className="docs-landing__studio-button" onClick={() => navigate('/docs/intro')}>
              {isZh ? '立即查看' : 'View now'}
            </button>
          </div>
        </div>
      </section>

      <section className="docs-landing__intro-grid">
        <div className="docs-landing__intro-copy">
          <h2>{isZh ? '点点设计系统' : 'dots design'}</h2>
          <p>
            {isZh
              ? '这里不是另一个组件展示站，而是点点设计工作流的运行环境。每个规格都要能被设计师阅读、被 agent 执行、被开发接走。'
              : 'Not another component gallery, but the operating environment for Dian Dian design work.'}
          </p>
        </div>
        <div className="docs-landing__product-visual" aria-label="Dian Dian illustration preview">
          <img src={dotsCardTwo} alt="" />
        </div>
      </section>

      <section className="docs-landing__research">
        <div className="docs-landing__section-head">
          <h2>{isZh ? '研究沉淀' : 'Research'}</h2>
          <p>
            {isZh
              ? '把每一次点点页面验证，沉淀成下一次可复用的规则。'
              : 'Turn every Dian Dian page experiment into reusable design rules.'}
          </p>
        </div>
        <div className="docs-landing__research-grid">
          {productEntries.map((entry) => (
            <button key={entry.title} className="docs-landing__research-card" onClick={() => navigate(entry.path)}>
              <span>{entry.eyebrow}</span>
              <h3>{entry.title}</h3>
              <p>{entry.desc}</p>
              <small>{isZh ? '□ 了解更多' : '□ Learn More'}</small>
            </button>
          ))}
        </div>
      </section>

      <footer className="docs-landing__studio-footer">
        <div className="docs-landing__footer-brand">
          <img src={footerLogo} alt="dots studio" />
        </div>
      </footer>
    </div>
  )
}
