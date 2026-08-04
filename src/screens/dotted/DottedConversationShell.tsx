import type { ReactNode } from 'react'
import navMenu from '../../assets/dotted/base-nav-menu.svg'
import avatar from '../../assets/dotted/base-avatar.svg'
import navCreate from '../../assets/dotted/base-nav-create.svg'
import descending from '../../assets/dotted/base-descending.svg'
import mainBack from '../../assets/dotted/think-back.svg'
import mainAvatar from '../../assets/dotted/think-user-avatar.svg'
import mainMore from '../../assets/dotted/think-more.svg'
import { IOSStatusBar } from '../shared/IOSStatusBar'
import { DottedInputDock } from './DottedInputDock'

export type DottedConversationShellVariant = 'standalone' | 'main-site'

export function DottedConversationShell({
  dialog,
  floatingActions,
  composer,
  overlay,
  showJumpToBottom = false,
  onJumpToBottom,
  onBack,
  shellVariant = 'standalone',
}: {
  dialog: ReactNode
  floatingActions?: ReactNode
  composer?: ReactNode
  overlay?: ReactNode
  showJumpToBottom?: boolean
  onJumpToBottom?: () => void
  onBack?: () => void
  shellVariant?: DottedConversationShellVariant
}) {
  const isMainSite = shellVariant === 'main-site'

  return (
    <div
      className={`dotted-demo-page dots-message-surface${isMainSite ? ' dotted-demo-page--main-site' : ''}`}
      data-node-id={isMainSite ? '2245:75646' : '2060:30262'}
      data-shell-variant={shellVariant}
    >
      <div className="dotted-demo">
        <main className="dotted-demo__dialog" aria-label="点点对话区">
          {dialog}
        </main>

        <header className="dotted-demo__topbar" data-node-id={isMainSite ? '2245:75509' : '1354:11505'}>
          <IOSStatusBar className="dotted-demo__statusbar" label="系统状态栏，时间 9:41" />

          {isMainSite ? (
            <nav className="dotted-demo__nav dotted-demo__nav--main-site" aria-label="点点主站导航">
              <div className="dotted-demo__nav-leading">
                <button className="dotted-demo__nav-action" type="button" aria-label="返回" onClick={onBack}>
                  <img src={mainBack} alt="" aria-hidden="true" />
                </button>
                <div className="dotted-demo__avatar-title dotted-demo__avatar-title--main-site">
                  <img className="dotted-demo__avatar" src={mainAvatar} alt="" aria-hidden="true" />
                  <div className="dotted-demo__title">点点</div>
                </div>
              </div>
              <button className="dotted-demo__nav-action" type="button" aria-label="更多">
                <img src={mainMore} alt="" aria-hidden="true" />
              </button>
            </nav>
          ) : (
            <nav className="dotted-demo__nav" aria-label="点点导航">
              <button className="dotted-demo__nav-btn" type="button" aria-label="打开菜单">
                <img className="dotted-demo__nav-icon dotted-demo__nav-icon--menu" src={navMenu} alt="" aria-hidden="true" />
              </button>
              <div className="dotted-demo__avatar-title">
                <img className="dotted-demo__avatar" src={avatar} alt="" aria-hidden="true" />
                <div className="dotted-demo__title">点点</div>
              </div>
              <button className="dotted-demo__nav-btn" type="button" aria-label="新建对话">
                <img className="dotted-demo__nav-icon dotted-demo__nav-icon--create" src={navCreate} alt="" aria-hidden="true" />
              </button>
            </nav>
          )}
        </header>

        {showJumpToBottom ? (
          <button className="dotted-demo__jump-bottom" type="button" aria-label="跳转到回答底部" onClick={onJumpToBottom}>
            <img src={descending} alt="" aria-hidden="true" />
          </button>
        ) : null}

        {floatingActions}

        {composer ?? <DottedInputDock shellVariant={shellVariant} />}

        {overlay}
      </div>
    </div>
  )
}
