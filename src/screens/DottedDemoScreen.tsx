import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type WheelEvent,
} from 'react'
import dotsActionAddCircle from '../assets/dotted/dots-action-add-circle.svg'
import dotsActionCamera from '../assets/dotted/dots-action-camera.svg'
import dotsActionKeyboard from '../assets/dotted/dots-action-keyboard.svg'
import dotsActionMessageMenu from '../assets/dotted/dots-action-message-menu.svg'
import dotsActionSend from '../assets/dotted/dots-action-send.svg'
import dotsChipCameraGuide from '../assets/dotted/dots-chip-camera-guide.svg'
import dotsChipGoods from '../assets/dotted/dots-chip-goods.svg'
import dotsChipOutfit from '../assets/dotted/dots-chip-outfit.svg'
import dotsChipTravel from '../assets/dotted/dots-chip-travel.svg'
import dotsKeyboard from '../assets/dotted/dots-keyboard-ios-latest.png'
import dotsNavBack from '../assets/dotted/dots-nav-back.svg'
import dotsNavMore from '../assets/dotted/dots-nav-more.svg'
import dotsStatusCap from '../assets/dotted/dots-status-cap.svg'
import dotsStatusCellular from '../assets/dotted/dots-status-cellular.svg'
import dotsStatusWifi from '../assets/dotted/dots-status-wifi.svg'
import { DotsGeneratedCard } from './dotted/DotsGeneratedCard'
import { DotsMessage, DotsMessageBubble, type DotsMessageRole } from './dotted/DotsMessageBubble'

const prompts = [
  { label: '穿搭指南', icon: dotsChipOutfit, selectedIconClass: 'dotted-demo__selected-skill-icon--outfit' },
  { label: '好物买手', icon: dotsChipGoods, selectedIconClass: 'dotted-demo__selected-skill-icon--goods' },
  { label: '旅行攻略', icon: dotsChipTravel, selectedIconClass: 'dotted-demo__selected-skill-icon--travel' },
  { label: '上帝摄像机', icon: dotsChipCameraGuide, selectedIconClass: 'dotted-demo__selected-skill-icon--camera-guide' },
]

type SkillPrompt = (typeof prompts)[number]

type DotsHistoryMessage = {
  id: string
  type: 'message'
  role: DotsMessageRole
  text: string
  hasTail?: boolean
  isRecognizing?: boolean
  isCanceling?: boolean
  isLoading?: boolean
}

type DotsHistoryTime = {
  id: string
  type: 'time'
  text: string
}

type DotsHistoryAiCard = {
  id: string
  type: 'ai-card'
  role: 'dots'
}

type DotsHistoryItem = DotsHistoryMessage | DotsHistoryTime | DotsHistoryAiCard

const dotsReplyText = '收到，我会继续按这个护肤场景帮你补充。'
const dotsVoiceMessageText = '我今晚想厚涂黑绷带，怎么用更稳？'
const voiceRecognitionSteps = [
  '我今晚想厚涂黑绷带',
  '我今晚想厚涂黑绷带，怎么用',
  '我今晚想厚涂黑绷带，怎么用更稳？',
]
const voiceWaveformBars = [4, 10, 14, 6, 8, 20, 10, 12, 10, 4, 10, 10, 16, 6, 12, 14, 8, 12, 8, 8, 16, 12, 12, 6, 12, 8, 8]

const dotsHistoryItems: DotsHistoryItem[] = [
  {
    id: 'user-single',
    type: 'message',
    role: 'user',
    text: '黑绷带面霜怎么用比较好？',
  },
  {
    id: 'user-two-line',
    type: 'message',
    role: 'user',
    text: '我想晚上厚涂，但又怕太闷。\n这个能每天用吗？',
    hasTail: true,
  },
  {
    id: 'time-now',
    type: 'time',
    text: '刚刚',
  },
  {
    id: 'dots-single',
    type: 'message',
    role: 'dots',
    text: '可以，我按用量、手法和频率给你整理一下。',
  },
  {
    id: 'dots-two-line',
    type: 'message',
    role: 'dots',
    text: '核心是少量预热后按压上脸。\n健康肌肤一周3-4次就够，先别叠加高浓A醇或果酸。',
    hasTail: true,
  },
  {
    id: 'dots-ai-card',
    type: 'ai-card',
    role: 'dots',
  },
]

function DottedChatStream({
  items,
  onClick,
  streamRef,
}: {
  items: DotsHistoryItem[]
  onClick?: () => void
  streamRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="dotted-demo__chat-stream" aria-label="Dots 历史消息" onClick={onClick} ref={streamRef}>
      {items.map((item) => {
        if (item.type === 'time') {
          return (
            <div className="dotted-demo__chat-time" key={item.id}>
              {item.text}
            </div>
          )
        }

        if (item.type === 'ai-card') {
          return (
            <DotsMessage key={item.id} role={item.role} contentType="ai-card">
              <DotsGeneratedCard />
            </DotsMessage>
          )
        }

        const messageClassName = [
          item.isRecognizing ? 'dots-message-row--recognizing' : '',
          item.isCanceling ? 'dots-message-row--recognizing-cancel' : '',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <DotsMessageBubble key={item.id} role={item.role} hasTail={item.hasTail} className={messageClassName}>
            {item.isLoading ? (
              <span className="dotted-demo__recognition-loading" aria-label="正在识别语音">
                <span />
                <span />
                <span />
              </span>
            ) : (
              item.text
            )}
          </DotsMessageBubble>
        )
      })}
    </div>
  )
}

function DottedVoiceWaveform({ canceling = false }: { canceling?: boolean }) {
  return (
    <span
      className={`dotted-demo__voice-waveform${canceling ? ' dotted-demo__voice-waveform--canceling' : ''}`}
      aria-hidden="true"
    >
      {voiceWaveformBars.map((height, index) => (
        <span
          className="dotted-demo__voice-waveform-bar"
          // Figma gives the exact bar heights; animation only adds live input feedback.
          style={
            {
              '--bar-height': `${height}px`,
              '--bar-delay': `${index * -38}ms`,
            } as CSSProperties
          }
          key={`${height}-${index}`}
        />
      ))}
    </span>
  )
}

export function DottedDemoScreen() {
  const chipsRef = useRef<HTMLDivElement>(null)
  const chatStreamRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const voiceRecognitionTextRef = useRef('')
  const dragRef = useRef({
    active: false,
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    pressedPrompt: null as SkillPrompt | null,
  })
  const voiceHoldRef = useRef({
    canceling: false,
    pointerId: null as number | null,
    startY: 0,
  })
  const suppressChipClickRef = useRef(false)
  const releaseTimerRef = useRef<number | null>(null)
  const [isInputActive, setIsInputActive] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [sentMessageText, setSentMessageText] = useState('')
  const [voiceRecognitionText, setVoiceRecognitionText] = useState('')
  const [isVoiceRecognitionLoading, setIsVoiceRecognitionLoading] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillPrompt | null>(null)
  const [isVoiceRecording, setIsVoiceRecording] = useState(false)
  const [isVoiceCanceling, setIsVoiceCanceling] = useState(false)
  const [chipsElasticX, setChipsElasticX] = useState(0)
  const [isChipsReleasing, setIsChipsReleasing] = useState(false)

  const completeVoiceInput = useCallback((shouldCancel: boolean) => {
    voiceHoldRef.current.canceling = false
    voiceHoldRef.current.pointerId = null
    setIsVoiceRecording(false)
    setIsVoiceCanceling(false)

    if (!shouldCancel) {
      setSentMessageText(voiceRecognitionTextRef.current || dotsVoiceMessageText)
    }
    setVoiceRecognitionText('')
    setIsVoiceRecognitionLoading(false)
  }, [])

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVoiceRecording) return

    const handlePointerUp = (event: globalThis.PointerEvent) => {
      const voiceHold = voiceHoldRef.current
      if (voiceHold.pointerId !== event.pointerId) return

      const shouldCancel = voiceHold.canceling || voiceHold.startY - event.clientY > 48
      completeVoiceInput(shouldCancel)
    }

    const handlePointerCancel = (event: globalThis.PointerEvent) => {
      if (voiceHoldRef.current.pointerId !== event.pointerId) return
      completeVoiceInput(true)
    }

    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerCancel)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerCancel)
    }
  }, [completeVoiceInput, isVoiceRecording])

  useEffect(() => {
    if (!isInputActive) return

    const frameId = window.requestAnimationFrame(() => {
      const chatStream = chatStreamRef.current
      if (chatStream) {
        chatStream.scrollTop = chatStream.scrollHeight
      }
      messageInputRef.current?.focus()
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [isInputActive, selectedSkill, sentMessageText])

  useEffect(() => {
    if (!isVoiceRecording) return

    let step = 0
    let intervalId: number | null = null

    const loadingTimerId = window.setTimeout(() => {
      setIsVoiceRecognitionLoading(false)
      voiceRecognitionTextRef.current = voiceRecognitionSteps[0]
      setVoiceRecognitionText(voiceRecognitionSteps[0])

      intervalId = window.setInterval(() => {
        step = Math.min(step + 1, voiceRecognitionSteps.length - 1)
        voiceRecognitionTextRef.current = voiceRecognitionSteps[step]
        setVoiceRecognitionText(voiceRecognitionSteps[step])

        if (step === voiceRecognitionSteps.length - 1 && intervalId) {
          window.clearInterval(intervalId)
        }
      }, 520)
    }, 420)

    return () => {
      window.clearTimeout(loadingTimerId)
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [isVoiceRecording])

  useEffect(() => {
    if (!sentMessageText) return

    const frameId = window.requestAnimationFrame(() => {
      const chatStream = chatStreamRef.current
      if (chatStream) {
        chatStream.scrollTop = chatStream.scrollHeight
      }
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [sentMessageText])

  useEffect(() => {
    if (!isVoiceRecording || (!voiceRecognitionText && !isVoiceRecognitionLoading)) return

    const frameId = window.requestAnimationFrame(() => {
      const chatStream = chatStreamRef.current
      if (chatStream) {
        chatStream.scrollTop = chatStream.scrollHeight
      }
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [isVoiceRecording, voiceRecognitionText, isVoiceRecognitionLoading])

  const releaseChips = () => {
    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current)
    }
    setIsChipsReleasing(true)
    setChipsElasticX(0)
    releaseTimerRef.current = window.setTimeout(() => {
      setIsChipsReleasing(false)
      releaseTimerRef.current = null
    }, 360)
  }

  const setBoundedElastic = (value: number) => {
    setIsChipsReleasing(false)
    setChipsElasticX(Math.max(-24, Math.min(24, value)))
  }

  const handleChipsWheel = (event: WheelEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    if (!el) return

    const delta = Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    const atStart = el.scrollLeft <= 0
    const atEnd = el.scrollLeft >= maxScrollLeft - 1

    if ((atStart && delta < 0) || (atEnd && delta > 0)) {
      event.preventDefault()
      setBoundedElastic(delta < 0 ? 16 : -16)
      window.setTimeout(releaseChips, 90)
      return
    }

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault()
      el.scrollLeft += event.deltaY
    }
  }

  const handleChipsPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    if (!el) return

    const pressedChip = (event.target as HTMLElement).closest<HTMLButtonElement>('.dotted-demo__chip')
    const pressedPrompt = prompts.find((prompt) => prompt.label === pressedChip?.dataset.skill) ?? null

    dragRef.current = {
      active: true,
      isDragging: false,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      pressedPrompt,
    }
    el.setPointerCapture(event.pointerId)
    setIsChipsReleasing(false)
  }

  const handleChipsPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    const drag = dragRef.current
    if (!el || !drag.active) return

    const deltaX = event.clientX - drag.startX
    if (Math.abs(deltaX) <= 6 && !drag.isDragging) return

    drag.isDragging = true
    suppressChipClickRef.current = true
    const nextScrollLeft = drag.startScrollLeft - deltaX
    const maxScrollLeft = el.scrollWidth - el.clientWidth

    if (nextScrollLeft < 0) {
      el.scrollLeft = 0
      setBoundedElastic(-nextScrollLeft * 0.28)
      return
    }

    if (nextScrollLeft > maxScrollLeft) {
      el.scrollLeft = maxScrollLeft
      setBoundedElastic((maxScrollLeft - nextScrollLeft) * 0.28)
      return
    }

    el.scrollLeft = nextScrollLeft
    if (chipsElasticX !== 0) setChipsElasticX(0)
  }

  const handleChipsPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    const pressedPrompt = dragRef.current.pressedPrompt
    const shouldSelect = Boolean(pressedPrompt && !dragRef.current.isDragging)

    dragRef.current.active = false
    dragRef.current.pressedPrompt = null
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId)
    }

    if (shouldSelect && pressedPrompt) {
      suppressChipClickRef.current = true
      selectSkill(pressedPrompt)
      window.setTimeout(() => {
        suppressChipClickRef.current = false
      }, 0)
      return
    }

    releaseChips()
    window.setTimeout(() => {
      suppressChipClickRef.current = false
    }, 0)
  }

  const handleChipsPointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    dragRef.current.active = false
    dragRef.current.pressedPrompt = null
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId)
    }
    releaseChips()
  }

  const dismissInput = () => {
    messageInputRef.current?.blur()
    setIsInputActive(false)
  }

  const selectSkill = (prompt: SkillPrompt) => {
    setSelectedSkill(prompt)
    setIsInputActive(true)
    window.requestAnimationFrame(() => {
      messageInputRef.current?.focus()
    })
  }

  const removeSelectedSkill = () => {
    setSelectedSkill(null)
    window.requestAnimationFrame(() => {
      messageInputRef.current?.focus()
    })
  }

  const handleSkillClick = (prompt: SkillPrompt) => {
    if (suppressChipClickRef.current) return
    selectSkill(prompt)
  }

  const sendMessage = () => {
    const nextMessage = messageText.trim()
    if (!nextMessage) return

    setSentMessageText(nextMessage)
    setMessageText('')
    setSelectedSkill(null)
    messageInputRef.current?.blur()
    setIsInputActive(false)
  }

  const handleVoicePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    voiceHoldRef.current = {
      canceling: false,
      pointerId: event.pointerId,
      startY: event.clientY,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsInputActive(false)
    setSelectedSkill(null)
    voiceRecognitionTextRef.current = ''
    setVoiceRecognitionText('')
    setIsVoiceRecognitionLoading(true)
    setIsVoiceRecording(true)
    setIsVoiceCanceling(false)
  }

  const handleVoicePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const voiceHold = voiceHoldRef.current
    if (!isVoiceRecording || voiceHold.pointerId !== event.pointerId) return

    const nextCanceling = voiceHold.startY - event.clientY > 48
    voiceHold.canceling = nextCanceling
    setIsVoiceCanceling(nextCanceling)
  }

  const finishVoiceInput = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const voiceHold = voiceHoldRef.current
    if (voiceHold.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const shouldCancel = isVoiceCanceling || voiceHold.canceling || voiceHold.startY - event.clientY > 48
    completeVoiceInput(shouldCancel)
  }

  const cancelVoiceInput = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (voiceHoldRef.current.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    completeVoiceInput(true)
  }

  const hasMessageText = messageText.trim().length > 0
  const chatItems: DotsHistoryItem[] = [
    ...dotsHistoryItems,
    ...(sentMessageText
      ? [
          {
            id: 'sent-message',
            type: 'message' as const,
            role: 'user' as const,
            text: sentMessageText,
            hasTail: true,
          },
          {
            id: 'dots-reply',
            type: 'message' as const,
            role: 'dots' as const,
            text: dotsReplyText,
            hasTail: true,
          },
        ]
      : []),
    ...(isVoiceRecording && (voiceRecognitionText || isVoiceRecognitionLoading)
      ? [
          {
            id: 'voice-recognition',
            type: 'message' as const,
            role: 'user' as const,
            text: voiceRecognitionText,
            hasTail: true,
            isRecognizing: true,
            isCanceling: isVoiceCanceling,
            isLoading: isVoiceRecognitionLoading && !voiceRecognitionText,
          },
        ]
      : []),
  ]
  const pageNodeId = isVoiceRecording ? '1487:1299' : selectedSkill ? '1422:2458' : isInputActive ? '1419:970' : '1421:1089'

  return (
    <div
      className={`dotted-demo-page dots-message-surface${isInputActive ? ' dotted-demo-page--input' : ''}${selectedSkill ? ' dotted-demo-page--skill' : ''}${isVoiceRecording ? ' dotted-demo-page--voice' : ''}`}
      data-node-id={pageNodeId}
    >
      <div className="dotted-demo">
        <div className="dotted-demo__topbar" data-node-id="1417:540">
          <div className="dotted-demo__statusbar" data-node-id="1417:541">
            <div className="dotted-demo__status-time">9:41</div>
            <div className="dotted-demo__status-levels" aria-hidden="true">
              <img className="dotted-demo__cellular" src={dotsStatusCellular} alt="" />
              <img className="dotted-demo__wifi" src={dotsStatusWifi} alt="" />
              <span className="dotted-demo__battery">
                <img className="dotted-demo__battery-cap" src={dotsStatusCap} alt="" />
                <span className="dotted-demo__battery-fill" />
              </span>
            </div>
          </div>
        </div>

        <nav className="dotted-demo__nav" aria-label="点点导航">
          <button className="dotted-demo__nav-btn" type="button" aria-label="返回">
            <img src={dotsNavBack} alt="" aria-hidden="true" />
          </button>
          <div className="dotted-demo__title">点点</div>
          <button className="dotted-demo__nav-btn" type="button" aria-label="更多">
            <img src={dotsNavMore} alt="" aria-hidden="true" />
          </button>
        </nav>

        <main
          className="dotted-demo__blank"
          aria-label="空白对话区"
          onClick={isInputActive ? dismissInput : undefined}
        />

        <DottedChatStream
          items={chatItems}
          onClick={isInputActive ? dismissInput : undefined}
          streamRef={chatStreamRef}
        />

        {isInputActive ? (
          <>
            <div
              className={`dotted-demo__input-panel${selectedSkill ? ' dotted-demo__input-panel--skill' : ''}`}
              data-node-id={selectedSkill ? '1422:2462' : '1419:974'}
            >
              {selectedSkill && (
                <div className="dotted-demo__selected-skill" aria-label={`已选择${selectedSkill.label}`}>
                  <div className="dotted-demo__selected-skill-main">
                    <span
                      className={`dotted-demo__selected-skill-icon ${selectedSkill.selectedIconClass}`}
                      aria-hidden="true"
                    />
                    <span>{selectedSkill.label}</span>
                  </div>
                  <button
                    className="dotted-demo__selected-skill-close"
                    type="button"
                    aria-label="移除已选 Skill"
                    onClick={removeSelectedSkill}
                  />
                </div>
              )}

              <div className={`dotted-demo__text-input-area${selectedSkill ? ' dotted-demo__text-input-area--skill' : ''}`}>
                <label className="dotted-demo__placeholder-row" aria-label="给点点发消息">
                  <input
                    ref={messageInputRef}
                    type="text"
                    className="dotted-demo__message-input"
                    value={messageText}
                    placeholder="给点点发消息"
                    onChange={(event) => setMessageText(event.target.value)}
                  />
                </label>

                <div className="dotted-demo__input-action-row">
                  <button className="dotted-demo__round-btn" type="button" aria-label="添加">
                    <img src={dotsActionAddCircle} alt="" aria-hidden="true" />
                  </button>
                  {hasMessageText ? (
                    <button className="dotted-demo__send-btn" type="button" aria-label="发送" onClick={sendMessage}>
                      <img src={dotsActionSend} alt="" aria-hidden="true" draggable={false} />
                    </button>
                  ) : (
                    <div className="dotted-demo__trailing-area dotted-demo__trailing-area--input">
                      <button
                        className="dotted-demo__round-btn"
                        type="button"
                        aria-label="语音菜单"
                        onClick={dismissInput}
                      >
                        <img src={dotsActionMessageMenu} alt="" aria-hidden="true" />
                      </button>
                      <button className="dotted-demo__round-btn" type="button" aria-label="拍照">
                        <img src={dotsActionCamera} alt="" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="dotted-demo__keyboard">
                <img src={dotsKeyboard} alt="" aria-hidden="true" />
              </div>
            </div>
          </>
        ) : (
          <div className={`dotted-demo__dock${isVoiceRecording ? ' dotted-demo__dock--voice' : ''}`}>
            {!isVoiceRecording && (
              <div
                className="dotted-demo__chips"
                aria-label="快捷提示"
                ref={chipsRef}
                onWheel={handleChipsWheel}
                onPointerDown={handleChipsPointerDown}
                onPointerMove={handleChipsPointerMove}
                onPointerUp={handleChipsPointerUp}
                onPointerCancel={handleChipsPointerCancel}
              >
                <div
                  className={`dotted-demo__chips-track${isChipsReleasing ? ' dotted-demo__chips-track--release' : ''}`}
                  style={{ transform: `translateX(${chipsElasticX}px)` }}
                >
                  {prompts.map((prompt) => (
                    <button
                      className="dotted-demo__chip"
                      type="button"
                      key={prompt.label}
                      data-skill={prompt.label}
                      onClick={() => handleSkillClick(prompt)}
                    >
                      <img src={prompt.icon} alt="" aria-hidden="true" />
                      <span>{prompt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isVoiceRecording && (
              <div className={`dotted-demo__voice-hint${isVoiceCanceling ? ' dotted-demo__voice-hint--cancel' : ''}`}>
                {isVoiceCanceling ? '松手取消' : '松手发送，上移取消'}
              </div>
            )}

            <div className="dotted-demo__composer">
              <div className={`dotted-demo__voice-row${isVoiceRecording ? ' dotted-demo__voice-row--recording' : ''}`}>
                {!isVoiceRecording && (
                  <div className="dotted-demo__leading-area">
                    <button className="dotted-demo__round-btn" type="button" aria-label="添加">
                      <img src={dotsActionAddCircle} alt="" aria-hidden="true" />
                    </button>
                  </div>
                )}

                <button
                  className={`dotted-demo__voice${isVoiceRecording ? ' dotted-demo__voice--recording' : ''}${isVoiceCanceling ? ' dotted-demo__voice--canceling' : ''}`}
                  type="button"
                  aria-label={isVoiceRecording ? '正在语音输入' : '按住说话'}
                  onPointerDown={handleVoicePointerDown}
                  onPointerMove={handleVoicePointerMove}
                  onPointerUp={finishVoiceInput}
                  onPointerCancel={cancelVoiceInput}
                >
                  {isVoiceRecording ? <DottedVoiceWaveform canceling={isVoiceCanceling} /> : '按住说话'}
                </button>

                {!isVoiceRecording && (
                  <div className="dotted-demo__trailing-area">
                    <button
                      className="dotted-demo__round-btn"
                      type="button"
                      aria-label="键盘"
                      onClick={() => setIsInputActive(true)}
                    >
                      <img src={dotsActionKeyboard} alt="" aria-hidden="true" />
                    </button>
                    <button className="dotted-demo__round-btn" type="button" aria-label="拍照">
                      <img src={dotsActionCamera} alt="" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

              {!isVoiceRecording && <div className="dotted-demo__ai-note">内容由 AI 生成</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
