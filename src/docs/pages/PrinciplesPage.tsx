import { renderMarkdown } from '../markdown'
import { DocsPageHeader } from '../PageHeader'
// Vite 支持 ?raw 后缀直接把文件作为字符串导入
import principlesSrc from '../../../references/design-principles.md?raw'

const sourceNote = principlesSrc
  .match(/^>\s*(.+)$/m)?.[1]
  .replace(/`([^`]+)`/g, '$1')

const principlesBody = principlesSrc
  .replace(/\n>\s*[^\n]+\n\n---\n/, '\n')
  .replace(/^---$/gm, '')

export function PrinciplesPage() {
  return (
    <>
      <DocsPageHeader
        title="设计原则"
        subtitle={`${sourceNote ?? '原则用于解释 token 之外的判断。'} 每条规则从 references/design-principles.md 直接渲染，并附设计备注解释“为什么”。`}
      />
      <div className="docs-flat-doc">{renderMarkdown(principlesBody)}</div>
    </>
  )
}
