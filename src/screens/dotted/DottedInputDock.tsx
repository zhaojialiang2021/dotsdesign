import keyboard from '../../assets/dotted/base-keyboard.svg'
import camera from '../../assets/dotted/base-camera.svg'
import add from '../../assets/dotted/base-add.svg'
import mainVoice from '../../assets/dotted/think-message-voice.svg'
import mainCamera from '../../assets/dotted/think-camera.svg'
import mainAdd from '../../assets/dotted/think-add-circle.svg'
import type { DottedConversationShellVariant } from './DottedConversationShell'

export function DottedInputDock({
  shellVariant = 'standalone',
}: {
  shellVariant?: DottedConversationShellVariant
}) {
  const isMainSite = shellVariant === 'main-site'

  return (
    <div className={`dotted-demo__dock${isMainSite ? ' dotted-demo__dock--main-site' : ''}`}>
      <div className="dotted-demo__composer" data-node-id={isMainSite ? '2209:71562' : '1354:11089'}>
        <div className="dotted-demo__composer-main">
          {isMainSite ? (
            <div className="dotted-demo__composer-prompt">
              <button className="dotted-demo__composer-icon" type="button" aria-label="切换语音输入">
                <img className="dotted-demo__composer-icon-img" src={mainVoice} alt="" aria-hidden="true" />
              </button>
              <span className="dotted-demo__composer-placeholder">发消息或按住说话...</span>
            </div>
          ) : (
            <>
              <button
                className="dotted-demo__composer-icon dotted-demo__composer-keyboard"
                type="button"
                aria-label="切换键盘输入"
              >
                <img className="dotted-demo__composer-icon-img" src={keyboard} alt="" aria-hidden="true" />
              </button>
              <span className="dotted-demo__composer-voice-label">按住说话</span>
            </>
          )}
          <div className="dotted-demo__composer-actions">
            <button className="dotted-demo__composer-icon" type="button" aria-label="拍照">
              <img className="dotted-demo__composer-icon-img dotted-demo__composer-icon-img--camera" src={isMainSite ? mainCamera : camera} alt="" aria-hidden="true" />
            </button>
            <button className="dotted-demo__composer-icon" type="button" aria-label="添加">
              <img className="dotted-demo__composer-icon-img" src={isMainSite ? mainAdd : add} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="dotted-demo__watermark">内容由AI生成</div>
      <div className="dotted-demo__home-indicator" aria-hidden="true" />
    </div>
  )
}
