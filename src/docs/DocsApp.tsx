import { lazy, Suspense, useEffect, useRef } from 'react'
import { navigate, useHash, parseDocsRoute } from './router'
import { DocsLayout } from './DocsLayout'
// LandingPage 是首屏关键路径，保持同步
import { LandingPage } from './pages/LandingPage'
import { NotFoundPage } from './pages/NotFoundPage'

const DocsHome = lazy(() => import('./pages/DocsHome').then((m) => ({ default: m.DocsHome })))

// 路由懒加载：每个 page 独立 chunk，按需下载
const FoundationsPage = lazy(() =>
  import('./pages/FoundationsPage').then((m) => ({ default: m.FoundationsPage })),
)
const PrinciplesPage = lazy(() =>
  import('./pages/PrinciplesPage').then((m) => ({ default: m.PrinciplesPage })),
)
const HapticsPage = lazy(() => import('./pages/HapticsPage').then((m) => ({ default: m.HapticsPage })))
const ComponentPage = lazy(() =>
  import('./pages/ComponentPage').then((m) => ({ default: m.ComponentPage })),
)
const PagePage = lazy(() => import('./pages/PagePage').then((m) => ({ default: m.PagePage })))
const PatternsPage = lazy(() => import('./pages/PatternsPage').then((m) => ({ default: m.PatternsPage })))
const ReportsPage = lazy(() => import('./pages/ReportsPage').then((m) => ({ default: m.ReportsPage })))
const AIWorkflowsPage = lazy(() =>
  import('./pages/AIWorkflowsPage').then((m) => ({ default: m.AIWorkflowsPage })),
)
const PitchPage = lazy(() => import('./pages/PitchPage').then((m) => ({ default: m.PitchPage })))
const ChangelogPage = lazy(() =>
  import('./pages/ChangelogPage').then((m) => ({ default: m.ChangelogPage })),
)
const WritingPage = lazy(() => import('./pages/WritingPage').then((m) => ({ default: m.WritingPage })))
const WritingIndexPage = lazy(() =>
  import('./pages/WritingIndexPage').then((m) => ({ default: m.WritingIndexPage })),
)

function PageFallback() {
  return null // 极简：闪一下空白比 spinner 更不打扰
}

export function DocsApp() {
  const hash = useHash()
  const route = parseDocsRoute(hash)
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (hash === '#/docs/patterns/conversation-streaming') {
      navigate('/docs/reports/conversation-streaming')
    }
  }, [hash])

  // 路由变化时回到顶部 + 写入访问历史
  useEffect(() => {
    if (typeof window === 'undefined') return
    // 等浏览器把新页内容 commit 进 DOM 再滚
    const t = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, 0)
    // 记录访问历史给 cmdk 用（去掉 #/ 前缀）
    const path = hash.replace(/^#\/?/, '/')
    if (path.startsWith('/docs') && route.kind !== 'not-found') {
      try {
        const prevPath = prevPathRef.current
        if (
          route.kind === 'pitch' &&
          prevPath &&
          prevPath.startsWith('/docs') &&
          prevPath !== path
        ) {
          sessionStorage.setItem('dots-pitch-return', prevPath)
        }
        const KEY = 'dots-docs-history'
        const v = localStorage.getItem(KEY)
        const list: string[] = v ? JSON.parse(v) : []
        const next = [path, ...list.filter((x) => x !== path)].slice(0, 5)
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
    }
    if (path.startsWith('/docs') && route.kind !== 'not-found') {
      prevPathRef.current = path
    }
    return () => window.clearTimeout(t)
  }, [hash, route])

  if (route.kind === 'report') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ReportsPage slug={route.slug} />
      </Suspense>
    )
  }

  return (
    <DocsLayout route={route}>
      <Suspense fallback={<PageFallback />}>
        {route.kind === 'home' && <LandingPage />}
        {route.kind === 'intro' && <DocsHome />}
        {route.kind === 'workflow' && <DocsHome />}
        {route.kind === 'foundations' && <FoundationsPage sub={route.sub} />}
        {route.kind === 'principles' && <PrinciplesPage />}
        {route.kind === 'haptics' && <HapticsPage />}
        {route.kind === 'component' && <ComponentPage slug={route.slug} />}
        {route.kind === 'patterns' && <PatternsPage slug={route.slug} />}
        {route.kind === 'ai-workflows' && <AIWorkflowsPage />}
        {route.kind === 'changelog' && <ChangelogPage />}
        {route.kind === 'pitch' && <PitchPage />}
        {route.kind === 'page' && <PagePage slug={route.slug} />}
        {route.kind === 'writing-index' && <WritingIndexPage />}
        {route.kind === 'writing' && <WritingPage slug={route.slug} />}
        {route.kind === 'not-found' && <NotFoundPage path={route.path} />}
      </Suspense>
    </DocsLayout>
  )
}
