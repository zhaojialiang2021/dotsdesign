import cover1 from '../../assets/dotted/sources-july/sailor-1.png'
import cover2 from '../../assets/dotted/sources-july/sailor-2.png'
import cover3 from '../../assets/dotted/sources-july/yi-1.png'
import cover4 from '../../assets/dotted/sources-july/yi-2.png'
import avatar1 from '../../assets/dotted/sources-july/sailor-logo.png'
import avatar2 from '../../assets/dotted/sources-july/yi-logo.png'
import { DotsMediaNote, type DotsMediaNoteItem } from '../../screens/dotted/DotsMediaNote'
import { DemoFrame } from './_DemoStub'

const notes: DotsMediaNoteItem[] = [
  { cover: cover1, coverAlt: '赛里木湖公路与雪山', title: '赛里木湖自驾路线，沿途每一帧都像电影', author: '水手旅行记', avatar: avatar1, likes: 862 },
  { cover: cover2, coverAlt: '赛里木湖蓝色湖面', title: '新疆的蓝，终于在赛里木湖看到了', author: '水手旅行记', avatar: avatar1, likes: 421, mediaType: 'video' },
  { cover: cover3, coverAlt: '伊犁草原与山谷', title: '第一次去伊犁，路线这样安排就够了', author: '一一在路上', avatar: avatar2, likes: 236 },
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
      code={'<DotsMediaNote notes={notes} onNoteClick={openNote} onMoreClick={openNotes} />'}
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
