import type { ReactNode } from 'react'
import statusCap from '../../assets/dotted/base-status-cap.svg'
import statusWifi from '../../assets/dotted/base-status-wifi.svg'
import statusCellular from '../../assets/dotted/base-status-cellular.svg'
import navMenu from '../../assets/dotted/base-nav-menu.svg'
import avatar from '../../assets/dotted/base-avatar.svg'
import navCreate from '../../assets/dotted/base-nav-create.svg'
import descending from '../../assets/dotted/base-descending.svg'
import { DottedInputDock } from './DottedInputDock'

export function DottedConversationShell({
  dialog,
  floatingActions,
  composer,
  overlay,
  showJumpToBottom = false,
  onJumpToBottom,
}: {
  dialog: ReactNode
  floatingActions?: ReactNode
  composer?: ReactNode
  overlay?: ReactNode
  showJumpToBottom?: boolean
  onJumpToBottom?: () => void
}) {
  return (
    <div className="dotted-demo-page dots-message-surface" data-node-id="2060:30262">
      <div className="dotted-demo">
        <main className="dotted-demo__dialog" aria-label="点点对话区">
          {dialog}
        </main>

        <header className="dotted-demo__topbar" data-node-id="1354:11505">
          <div className="dotted-demo__statusbar" aria-label="系统状态栏">
            <div className="dotted-demo__status-time">9:41</div>
            <div className="dotted-demo__status-levels" aria-hidden="true">
              <img className="dotted-demo__cellular" src={statusCellular} alt="" />
              <img className="dotted-demo__wifi" src={statusWifi} alt="" />
              <span className="dotted-demo__battery">
                <img className="dotted-demo__battery-cap" src={statusCap} alt="" />
                <span className="dotted-demo__battery-fill" />
              </span>
            </div>
          </div>

          <nav className="dotted-demo__nav" aria-label="点点导航">
            <button className="dotted-demo__nav-btn" type="button" aria-label="打开菜单">
              <img src={navMenu} alt="" aria-hidden="true" />
            </button>
            <div className="dotted-demo__avatar-title">
              <img className="dotted-demo__avatar" src={avatar} alt="" aria-hidden="true" />
              <div className="dotted-demo__title">点点</div>
            </div>
            <button className="dotted-demo__nav-btn" type="button" aria-label="新建对话">
              <img src={navCreate} alt="" aria-hidden="true" />
            </button>
          </nav>
        </header>

        {showJumpToBottom ? (
          <button className="dotted-demo__jump-bottom" type="button" aria-label="跳转到回答底部" onClick={onJumpToBottom}>
            <img src={descending} alt="" aria-hidden="true" />
          </button>
        ) : null}

        {floatingActions}

        {composer ?? <DottedInputDock />}

        {overlay}
      </div>
    </div>
  )
}
