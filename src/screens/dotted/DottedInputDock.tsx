import keyboard from '../../assets/dotted/base-keyboard.svg'
import camera from '../../assets/dotted/base-camera.svg'
import add from '../../assets/dotted/base-add.svg'

export function DottedInputDock() {
  return (
    <div className="dotted-demo__dock">
      <div className="dotted-demo__composer" data-node-id="1354:11089">
        <div className="dotted-demo__composer-main">
          <button
            className="dotted-demo__composer-icon dotted-demo__composer-keyboard"
            type="button"
            aria-label="切换键盘输入"
          >
            <img src={keyboard} alt="" aria-hidden="true" />
          </button>
          <span className="dotted-demo__composer-voice-label">按住说话</span>
          <div className="dotted-demo__composer-actions">
            <button className="dotted-demo__composer-icon" type="button" aria-label="拍照">
              <img src={camera} alt="" aria-hidden="true" />
            </button>
            <button className="dotted-demo__composer-icon" type="button" aria-label="添加">
              <img src={add} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="dotted-demo__watermark">内容由AI生成</div>
      <div className="dotted-demo__home-indicator" aria-hidden="true" />
    </div>
  )
}
