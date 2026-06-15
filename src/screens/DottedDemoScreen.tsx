import { useEffect, useRef, useState, type PointerEvent, type RefObject, type WheelEvent } from 'react'
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

        return (
          <DotsMessageBubble key={item.id} role={item.role} hasTail={item.hasTail}>
            {item.text}
          </DotsMessageBubble>
        )
      })}
    </div>
  )
}

export function DottedDemoScreen() {
  const chipsRef = useRef<HTMLDivElement>(null)
  const chatStreamRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef({
    active: false,
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    pressedPrompt: null as SkillPrompt | null,
  })
  const suppressChipClickRef = useRef(false)
  const releaseTimerRef = useRef<number | null>(null)
  const [isInputActive, setIsInputActive] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [sentMessageText, setSentMessageText] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<SkillPrompt | null>(null)
  const [chipsElasticX, setChipsElasticX] = useState(0)
  const [isChipsReleasing, setIsChipsReleasing] = useState(false)

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current)
      }
    }
  }, [])

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

  const handleChipsPointerDown = (event: PointerEvent<HTMLDivElement>) => {
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

  const handleChipsPointerMove = (event: PointerEvent<HTMLDivElement>) => {
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

  const handleChipsPointerUp = (event: PointerEvent<HTMLDivElement>) => {
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

  const handleChipsPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
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

  const hasMessageText = messageText.trim().length > 0
  const chatItems: DotsHistoryItem[] = sentMessageText
    ? [
        ...dotsHistoryItems,
        {
          id: 'sent-message',
          type: 'message',
          role: 'user',
          text: sentMessageText,
          hasTail: true,
        },
        {
          id: 'dots-reply',
          type: 'message',
          role: 'dots',
          text: dotsReplyText,
          hasTail: true,
        },
      ]
    : dotsHistoryItems
  const pageNodeId = selectedSkill ? '1422:2458' : isInputActive ? '1419:970' : '1421:1089'

  return (
    <div
      className={`dotted-demo-page dots-message-surface${isInputActive ? ' dotted-demo-page--input' : ''}${selectedSkill ? ' dotted-demo-page--skill' : ''}`}
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
          <div className="dotted-demo__dock">
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

            <div className="dotted-demo__composer">
              <div className="dotted-demo__voice-row">
                <div className="dotted-demo__leading-area">
                  <button className="dotted-demo__round-btn" type="button" aria-label="添加">
                    <img src={dotsActionAddCircle} alt="" aria-hidden="true" />
                  </button>
                </div>

                <button className="dotted-demo__voice" type="button">按住说话</button>

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
              </div>

              <div className="dotted-demo__ai-note">内容由 AI 生成</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
