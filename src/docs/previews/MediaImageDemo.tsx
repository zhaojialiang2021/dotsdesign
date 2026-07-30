import landscapeImage from '../../assets/dotted/response/ili-1.png'
import portraitImage1 from '../../assets/dotted/sources-july/sailor-1.png'
import portraitImage2 from '../../assets/dotted/sources-july/sailor-2.png'
import portraitImage3 from '../../assets/dotted/sources-july/sailor-3.png'
import portraitImage4 from '../../assets/dotted/sources-july/yi-1.png'
import { DotsMediaImage, type DotsMediaImageItem } from '../../screens/dotted/DotsMediaImage'
import { DemoFrame } from './_DemoStub'

const portraitImages: DotsMediaImageItem[] = [
  { src: portraitImage1, alt: '伊犁旅行照片一', orientation: 'portrait' },
  { src: portraitImage2, alt: '伊犁旅行照片二', orientation: 'portrait' },
  { src: portraitImage3, alt: '伊犁旅行照片三', orientation: 'portrait' },
  { src: portraitImage4, alt: '伊犁旅行照片四', orientation: 'portrait' },
]

const examples = [
  {
    state: 'single-landscape',
    name: '单张横图',
    spec: '219 × 164',
    images: [{ src: landscapeImage, alt: '赛里木湖风景', orientation: 'landscape' as const }],
  },
  {
    state: 'single-portrait',
    name: '单张竖图',
    spec: '165 × 220',
    images: portraitImages.slice(0, 1),
  },
  {
    state: 'group-two',
    name: '两张图片',
    spec: '2 × 3:4',
    images: portraitImages.slice(0, 2),
  },
  {
    state: 'group-three',
    name: '三张图片',
    spec: '3 × 3:4',
    images: portraitImages.slice(0, 3),
  },
  {
    state: 'group-overflow',
    name: '更多图片',
    spec: '3 张 + 入口',
    images: portraitImages,
  },
] as const

export function MediaImageDemo() {
  return (
    <DemoFrame
      code={'<DotsMediaImage images={images} onMoreClick={openGallery} />'}
      stage={
        <div className="media-image-demo">
          {examples.map((example) => (
            <section className="media-image-demo__example" key={example.state}>
              <header className="media-image-demo__example-header">
                <strong>{example.name}</strong>
                <code>{example.state}</code>
                <span>{example.spec}</span>
              </header>
              <DotsMediaImage images={[...example.images]} onMoreClick={() => undefined} />
            </section>
          ))}
        </div>
      }
    />
  )
}
