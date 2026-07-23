---
status: draft
used_by: dotted-demo, voice-input, ai-processing
last_updated: 2026-06-25
---

# LiveWaveform 实时波形

LiveWaveform 是点点语音与 AI 处理链路里的状态组件。它复刻的是 ElevenLabs Live Waveform 的组件语义：用实时波形表达声音强弱、监听状态和处理状态；实现上使用点点自己的 token、字体和 Harness 规则，不复制外部实现。

## 语义

这个组件负责把音频强度实时可视化。它可以接收上层传入的音量数据，也可以在用户明确点击后调用浏览器麦克风；不允许页面加载时自动请求权限，不允许保存音频。

- `idle`：入口可用，但没有采集声音。只做低幅呼吸。
- `listening`：正在接收声音。波形随输入强弱滚动。
- `processing`：语音已提交，AI 正在解析。使用规则脉冲，避免误导用户以为还在录音。

## Props

| Prop | Values | Default | 说明 |
| --- | --- | --- | --- |
| `state` | `idle` / `listening` / `processing` | `idle` | 波形的业务状态。 |
| `source` | `microphone` / `levels` / `demo` | `levels` | 音频来源。microphone 必须由用户显式点击启动。 |
| `mode` | `scrolling` / `static` | `scrolling` | 实时输入用 scrolling；列表、卡片、减少动态效果场景用 static。 |
| `size` | `compact` / `regular` / `large` | `regular` | compact 放输入栏，regular 放面板，large 放独立录音页。 |
| `density` | `compact` / `comfortable` / `dense` | `comfortable` | 控制柱数量密度。 |
| `tone` | `brand` / `ink` / `inverse` | `brand` | 适配浅底、文本底、深色或图片底。 |

## 行为约束

- `source=microphone` 时，必须由用户点击触发 `getUserMedia`，禁止自动弹权限。
- 停止监听、切换到 `idle` 或 `processing` 时，必须停止 `MediaStreamTrack` 并关闭 `AudioContext`。
- 无麦克风权限时要进入明确的 `denied` / `error` 状态，不能继续伪装成监听中。
- `prefers-reduced-motion: reduce` 时，滚动波形必须退化为静态波形。
- 所有颜色从 token 读取，不允许 hardcoded 颜色。
- 状态由外部 props 控制；真实监听状态通过 `microphoneStatus` 或等价状态反馈给业务层。

## 实时监听

组件支持真实麦克风监听，但只能在用户点击后启动。实现参数必须稳定，避免不同 demo 各自发明一套监听算法。

| 项 | 规格 |
|---|---|
| 权限入口 | 用户点击 `开始实时监听` 或业务层等价按钮 |
| 采样 | `AudioContext` + `AnalyserNode` |
| `fftSize` | `1024` |
| `smoothingTimeConstant` | `0.72` |
| media constraints | `echoCancellation` / `noiseSuppression` / `autoGainControl` 开启 |
| 停止 | 停止所有 `MediaStreamTrack`，关闭 `AudioContext` |
| 状态 | `idle` / `requesting` / `listening` / `stopped` / `denied` / `unsupported` / `error` |

## 尺寸与密度

| Size | 高度 | 用途 |
|---|---:|---|
| `compact` | 64px | 输入栏、对话页语音条 |
| `regular` | 92px | 组件规范主预览 |
| `large` | 124px | 独立录音页、强调型演示 |

| Density | 柱数 | Gap | 用途 |
|---|---:|---:|---|
| `compact` | 36 | 5px | 小空间，稳定感优先 |
| `comfortable` | 52 | 4px | 默认规范展示 |
| `dense` | 72 | 3px | 需要更细颗粒度的监听反馈 |

## 色彩

| Tone | Active | Idle | Processing | 用途 |
|---|---|---|---|---|
| `brand` | `info 5` | `Separator 2` | `info 6` | 默认浅底语音状态 |
| `ink` | `Title` | `Description Lighter` | `Paragraph` | 文本密集或低彩场景 |
| `inverse` | `Bg Light` | `Separator 4` | `Bg Light` | 深色、图片或反色背景 |

`listening` 的波形可以实时变化，语音输入条本身的入场/出场只做颜色和透明度过渡，不做弹跳位移，避免让用户误解控件位置发生变化。

## 何时使用

- 对话页输入栏正在听用户说话。
- 语音消息正在转文字。
- AI 正在解析语音请求。
- 语音按钮需要比普通 loading 更明确地表达“声音相关状态”。

## 不要这样用

- 不要把它当普通装饰波纹。
- 不要在后台任务、网络加载、文件上传里使用 LiveWaveform。
- 不要在一个视图里同时放多个高幅滚动波形。
