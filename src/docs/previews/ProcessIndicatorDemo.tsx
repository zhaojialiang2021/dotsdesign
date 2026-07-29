import { useState } from 'react'
import {
  ProcessIndicator,
  type ProcessIndicatorKind,
} from '../../screens/dotted/ProcessIndicator'
import { DemoFrame } from './_DemoStub'

const indicatorKinds = [
  'reading',
  'insight',
  'thinking',
  'document',
  'review',
  'search',
  'tool-call',
  'highlight',
  'complete',
] as const
const playbackStates = ['playing', 'paused'] as const

const indicatorCopy: Record<ProcessIndicatorKind, { name: string; desc: string }> = {
  reading: { name: '阅读', desc: '读取知识、资料和长内容' },
  insight: { name: '洞察', desc: '形成观点或发现关键信息' },
  thinking: { name: '思考', desc: '判断、规划和一般思考过程' },
  document: { name: '文档', desc: '生成、整理或解析文档' },
  review: { name: '检查', desc: '观察、比对和校验结果' },
  search: { name: '搜索', desc: '正在检索站内或全网内容' },
  'tool-call': { name: '工具调用', desc: '正在执行外部工具或操作' },
  highlight: { name: '亮点', desc: '标记重点、推荐或高价值结果' },
  complete: { name: '完成', desc: '当前过程已经结束' },
}

export function ProcessIndicatorDemo() {
  const [kind, setKind] = useState<ProcessIndicatorKind>('thinking')
  const [playback, setPlayback] = useState<(typeof playbackStates)[number]>('playing')
  const current = indicatorCopy[kind]
  const playing = playback === 'playing'
  const code = `<ProcessIndicator kind="${kind}" playing={${playing}} />`

  return (
    <DemoFrame
      code={code}
      stage={
        <div className="process-indicator-demo">
          <section className="process-indicator-demo__preview">
            <div className="process-indicator-demo__preview-visual">
              <ProcessIndicator
                kind={kind}
                playing={playing}
                className="process-indicator-demo__active"
                label={current.name}
              />
            </div>
          </section>

          <div className="process-indicator-demo__list" aria-label="过程状态">
            {indicatorKinds.map((item) => {
              const active = item === kind
              return (
                <section
                  className={[
                    'process-indicator-demo__item',
                    active ? 'is-active' : '',
                  ].filter(Boolean).join(' ')}
                  key={item}
                >
                  <button
                    type="button"
                    className="process-indicator-demo__item-trigger"
                    onClick={() => setKind(item)}
                    aria-expanded={active}
                  >
                    <span className="process-indicator-demo__item-title">
                      <strong>{indicatorCopy[item].name}</strong>
                      <small>{item}</small>
                    </span>
                    <span className="process-indicator-demo__chevron" aria-hidden="true" />
                  </button>

                  {active ? (
                    <div className="process-indicator-demo__item-details">
                      <p>{indicatorCopy[item].desc}</p>
                      <div className="process-indicator-demo__playback" aria-label="播放状态">
                        {playbackStates.map((state) => (
                          <button
                            type="button"
                            className={state === playback ? 'is-active' : ''}
                            aria-pressed={state === playback}
                            key={state}
                            onClick={() => setPlayback(state)}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>
              )
            })}
          </div>
        </div>
      }
    />
  )
}
