import cover1 from '../../assets/dotted/media-note-coast.png'
import cover2 from '../../assets/dotted/media-note-moon.png'
import cover3 from '../../assets/dotted/media-note-wave.png'
import cover4 from '../../assets/dotted/sources-july/yi-2.png'
import avatar1 from '../../assets/dotted/sources-july/sailor-logo.png'
import avatar2 from '../../assets/dotted/sources-july/yi-logo.png'
import { DotsMediaNote, type DotsMediaNoteItem } from '../../screens/dotted/DotsMediaNote'
import componentSource from '../../screens/dotted/DotsMediaNote.tsx?raw'
import colorSource from '../../screens/dotted/mediaNoteColor.ts?raw'
import appStylesSource from '../../App.css?raw'
import { DemoFrame } from './_DemoStub'

const usageSource = `<DotsMediaNote
  notes={notes}
  onNoteClick={(note, index) => openNote(note, index)}
  onMoreClick={openNotes}
/>`

const mediaNoteStylesStart = appStylesSource.indexOf('.dots-media-note {')
const mediaNoteStylesEnd = appStylesSource.indexOf('.dots-media-video {', mediaNoteStylesStart)
const mediaNoteStylesSource = appStylesSource.slice(mediaNoteStylesStart, mediaNoteStylesEnd).trim()

const codeTabs = [
  { id: 'usage', label: '使用示例', language: 'JSX', code: usageSource },
  { id: 'component', label: 'React 组件', language: 'TSX', code: componentSource.trim() },
  { id: 'color', label: '算色算法', language: 'TS', code: colorSource.trim() },
  { id: 'styles', label: 'CSS 样式', language: 'CSS', code: mediaNoteStylesSource },
] as const

const notes: DotsMediaNoteItem[] = [
  { cover: cover1, coverAlt: '夕阳下的海岸与浪花', title: '赛里木湖自驾路线，沿途每一帧都像电影', author: '水手旅行记', avatar: avatar1, likes: 862 },
  { cover: cover2, coverAlt: '黑色天空中的月食过程', title: '新疆的蓝，终于在赛里木湖看到了', author: '水手旅行记', avatar: avatar1, likes: 421, mediaType: 'video' },
  { cover: cover3, coverAlt: '白色海浪与水面', title: '第一次去伊犁，路线这样安排就够了', author: '一一在路上', avatar: avatar2, likes: 236 },
  { cover: cover4, coverAlt: '伊犁旅行沿途风景', title: '夏天一定要去一次伊犁', author: '一一在路上', avatar: avatar2, likes: 189 },
]

const examples = [
  { state: 'single', name: '单篇笔记', spec: '161.5 × 215.3', notes: notes.slice(0, 1) },
  { state: 'group-two', name: '两篇笔记', spec: '2 × 3:4', notes: notes.slice(0, 2) },
  { state: 'group-three', name: '三篇笔记', spec: '3 × 3:4', notes: notes.slice(0, 3) },
  { state: 'group-overflow', name: '更多笔记', spec: '3 篇 + 入口', notes },
] as const

export function MediaNoteDemo() {
  return (
    <DemoFrame
      codeTabs={codeTabs}
      stage={
        <div className="media-image-demo media-note-demo">
          {examples.map((example) => (
            <section className="media-image-demo__example" key={example.state}>
              <header className="media-image-demo__example-header">
                <strong>{example.name}</strong>
                <code>{example.state}</code>
                <span>{example.spec}</span>
              </header>
              <DotsMediaNote notes={[...example.notes]} />
            </section>
          ))}
        </div>
      }
    />
  )
}
