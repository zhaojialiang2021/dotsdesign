import authorAvatar from '../../assets/dotted/sources-july/yi-logo.png'
import demoVideo from '../../assets/dotted/media-video-demo.mp4'
import { DotsMediaVideo } from '../../screens/dotted/DotsMediaVideo'
import { DemoFrame } from './_DemoStub'

const examples = [
  {
    state: 'portrait',
    name: '竖版视频',
    spec: '240 × 320 · 3:4',
    video: {
      src: demoVideo,
      label: '竖版旅行视频',
      orientation: 'portrait' as const,
      duration: '01:46',
      author: '王悦伊',
      avatar: authorAvatar,
    },
  },
  {
    state: 'landscape',
    name: '横版视频',
    spec: '329 × 185.0625 · 16:9',
    video: {
      src: demoVideo,
      label: '横版旅行视频',
      orientation: 'landscape' as const,
      duration: '01:46',
      author: '王悦伊',
      avatar: authorAvatar,
    },
  },
] as const

export function MediaVideoDemo() {
  return (
    <DemoFrame
      code={'<DotsMediaVideo video={video} onClick={playVideo} />'}
      stage={
        <div className="media-image-demo media-video-demo">
          {examples.map((example) => (
            <section className="media-image-demo__example" key={example.state}>
              <header className="media-image-demo__example-header">
                <strong>{example.name}</strong>
                <code>{example.state}</code>
                <span>{example.spec}</span>
              </header>
              <DotsMediaVideo video={example.video} />
            </section>
          ))}
        </div>
      }
    />
  )
}
