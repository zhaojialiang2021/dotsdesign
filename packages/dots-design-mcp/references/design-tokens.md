# Dots 设计令牌

> 真相源：`references/design-system.md` 与 `tokens/*.json`。
> 所有页面、组件、demo 必须引用 token 名，不允许硬编码颜色、圆角、间距或动效数值。

---

## 设备画布

| Token | 值 | 用途 |
|------|------|------|
| `phone.width` | `430px` | iOS 大屏设计稿宽度 |
| `phone.height` | `932px` | iOS 大屏设计稿高度 |
| `phone.radius` | `54px` | 模拟真机外壳圆角 |
| `safe.top` | `59px` | 状态栏/安全区顶部 |
| `safe.bottom` | `34px` | 底部安全区 |
| `safe.nav` | `65px` | 导航栏高度 |

小屏 `max-width: 460px` 时切全屏，去掉外壳圆角和阴影；整体缩放通过 `--phone-scale` 控制。

---

## 颜色

### Backgrounds

| Token | Light | Dark | 用途 |
|------|------|------|------|
| `Bg` / `--bg-base` | `#F3F3F3` | `#242424` | 主背景色，对话流等一级界面 |
| `Bg 1` / `--bg-1` | `#F7F7F7` | `#282828` | 底部栏、导航栏背景 |
| `Bg 2` / `--bg-2` | `#FAFAFA` | `#2D2D2D` | 键盘升起低栏背景 |
| `Bg 3` / `--bg-3` | `#FFFFFF` | `#323232` | 半屏、弹窗、弹出层背景 |
| `Mask Bg 1` / `--bg-mask-1` | `rgba(0,0,0,0.2)` | Always | 退后界面的浅遮罩 |
| `Mask Bg 2` / `--bg-mask-2` | `rgba(0,0,0,0.4)` | Always | 退后界面的深遮罩 |
| `Bg Light` / `--bg-light` | `#FFFFFF` | Always | 纯白背景 |
| `Bg Black` / `--bg-black` | `#141414` | Always | 纯黑背景 |

### Labels

| Token | Light | Dark | 用途 |
|------|------|------|------|
| `Title` / `--title` | `#141414` | `rgba(255,255,255,0.94)` | 一级标题、对话流文本 |
| `Paragraph` / `--paragraph` | `rgba(20,20,20,0.8)` | `rgba(255,255,255,0.8)` | 段落、二级标题、icon |
| `Description` / `--description` | `rgba(20,20,20,0.6)` | `rgba(255,255,255,0.6)` | 描述、未选中字色 |
| `Description Lighter` / `--description-lighter` | `rgba(20,20,20,0.4)` | `rgba(255,255,255,0.4)` | 更弱描述 |
| `Placeholder` / `--placeholder` | `rgba(20,20,20,0.16)` | `rgba(255,255,255,0.16)` | 输入栏、loading 占位文字 |
| `Disabled` / `--disabled` | `rgba(20,20,20,0.09)` | `rgba(255,255,255,0.09)` | 禁用色 |
| `Link` / `--link` | `#0D4087` | `#93BFF1` | 文字链 |

Always Mode 文本使用 `--light-title` / `--light-paragraph` / `--light-description`；反色场景使用 `--dark-title` / `--dark-paragraph` / `--dark-description`。

### Fills

| Token | Light | Dark | 用途 |
|------|------|------|------|
| `Fill 1` / `--fill-1` | `rgba(255,255,255,0.05)` | `rgba(50,50,50,0.05)` | loading 气泡等色 |
| `Fill 2` / `--fill-2` | `rgba(255,255,255,0.1)` | `rgba(50,50,50,0.1)` | 富文本、分享卡悬浮容器底色 |
| `Fill 3` / `--fill-3` | `rgba(255,255,255,0.2)` | `rgba(50,50,50,0.2)` | 填充 3 |
| `Fill 4` / `--fill-4` | `rgba(255,255,255,0.5)` | `rgba(50,50,50,0.5)` | 填充 4 |
| `Fill 5` / `--fill-5` | `rgba(255,255,255,0.8)` | `rgba(50,50,50,0.8)` | AI 卡片/富文本背景 |
| `Fill A` / `--fill-a` | `#FFFFFF` | `#323232` | 输入框、模型侧气泡底色 |
| `Fill B` / `--fill-b` | `#E6E6E6` | `#1C1C1C` | 用户侧气泡、轻提示组件底色 |
| `Fill C` / `--fill-c` | `rgba(50,50,50,0.92)` | `rgba(68,68,68,0.8)` | 长按面板底色 |

反色填充使用 `--inverted-fill-1` 到 `--inverted-fill-5`。

### Separators

| Token | Light | Dark | 用途 |
|------|------|------|------|
| `Separator` / `--separator-base` | `rgba(255,255,255,0.75)` | `rgba(255,255,255,0.1)` | 用户侧气泡描边 |
| `Separator 2` / `--separator-2` | `rgba(20,20,20,0.08)` | `rgba(255,255,255,0.08)` | 模型侧回复气泡、容器描边 |
| `Separator 3` / `--separator-3` | `rgba(20,20,20,0.1)` | `rgba(255,255,255,0.1)` | query 气泡、输入框描边 |
| `Separator 4` / `--separator-4` | `rgba(255,255,255,0.2)` | `rgba(50,50,50,0.2)` | 容器白色描边 |

### Primary / Community

| Token | 值 | 用途 |
|------|------|------|
| `info` / `--info-base` | `rgba(253,240,145,0.2)` | 富文本黄色 |
| `info 2` / `--info-2` | `rgba(175,217,241,0.2)` | 富文本蓝色 |
| `info 3` / `--info-3` | `rgba(20,20,20,0.02)` | 富文本灰色 |
| `info 4` / `--info-4` | `rgba(111,210,189,0.3)` | 文本选中绿色 |
| `info 5` / `--info-5` | `#6FD2BD` | 品牌主色/CTA |
| `info 6` / `--info-6` | `#21C3A1` | 文本选中分割栏绿色 |
| `--primary` | `#FF2442` | 小红书社区红，仅限社区关注/发布场景 |

禁止事项：不使用纯黑 `#000000` 做文字；不自行定义颜色；不把社区红用于点点对话场景。

---

## 字体

### 使用边界

点点有两套字体边界，不能混用：

- **组件规范 / Dots App UI / 页面 Demo**：统一使用 `PingFang SC`。Button、Input、MessageBubble、LiveWaveform、Sheet 等组件预览必须落到这个字体栈，不能被文档站展示字体污染。
- **Docs / Studio / Landing 等非规范展示 UI**：中文使用 `GlowSans SC`，英文使用 `PhonicTrial`，代码和等宽信息使用 `SaansMono-TRIAL`。
- **代码块、token 名、route、props**：统一使用 `SaansMono-TRIAL`；不可混用组件字体。

组件字体栈：

```css
'PingFang SC', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif
```

文档展示字体栈：

```css
--font-component: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
--font-display-cn: 'GlowSans SC', 'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif;
--font-display-en: 'PhonicTrial', 'GlowSans SC', 'PingFang SC', sans-serif;
--font-mono: 'SaansMono-TRIAL', 'SFMono-Regular', Consolas, monospace;
```

规范文案中如果写 `PingFang SC`，实际组件预览也必须使用 `--font-component`。文档页导航、首页 Hero、说明段落可以使用展示字体，但组件容器内部不能继承展示字体。

### 富文本字号

| Token | 字号 | 行高 | 字重 | 字距 | 用途 |
|------|------|------|------|------|------|
| `rich-h1` | `20pt` | `34pt` | `600` | `0.06em` | 总标题 |
| `rich-h2` | `18pt` | `31pt` | `600` | `0.06em` | 一级模块标题 |
| `rich-h3` | `17pt` | `29pt` | `600` | `0.06em` | 二级模块标题 |
| `rich-h4` | `16pt` | `27pt` | `600` | `0.06em` | 三级模块标题 |
| `rich-paragraph` | `16pt` | `27pt` | `400` | `0.06em` | 段落、列表、引用 |
| `rich-table` | `14pt` | `24pt` | `400` | `0.06em` | 表格内容 |

### 对话 UI 字号

| Token | 字号 | 字重 | 行高 | 字距 | 用途 |
|------|------|------|------|------|------|
| `dialog-bubble` | `16px` | `400` | `1.69em` | `0.06em` | 气泡正文 |
| `dialog-input` | `16px` | `400` | `48px` | `0.02em` | 输入框文字 |
| `dialog-time` | `13px` | `400` | `18px` | — | 时间标签 |
| `community-card-title` | `14px` | `500` | `20px` | — | 社区卡片标题 |
| `support` | `12px` | `400` | `17px` | — | 辅助文字 |

---

## 间距

### 富文本模块

| Token | 值 | 用途 |
|------|------|------|
| `rich.gap-level-1` | `32pt` | 一级模块之间 |
| `rich.gap-level-2` | `22pt` | 二级模块之间 |
| `rich.gap-level-3` | `16pt` | 三级模块之间 |
| `rich.text-padding-x` | `24pt` | 文字类原子左右间距 |
| `rich.block-padding-x` | `14pt` | 图片、图组、地图、商品卡等内容块左右间距 |
| `rich.card-top` | `28pt` | 容器顶部到总标题 |
| `rich.card-action-gap` | `28pt` | 最后内容到按钮区顶部 |
| `rich.card-bottom` | `30pt` | 按钮区底部到容器底部 |

### 对话流

| Token | 值 | 用途 |
|------|------|------|
| `dialog.flow-padding-x` | `12px` | 对话流左右 padding |
| `dialog.gap-cross-side` | `20px` | 不同侧消息间距 |
| `dialog.gap-tail` | `26px` | 有引脚的消息间距 |
| `dialog.gap-ai` | `16px` | AI 连续消息间距 |
| `dialog.gap-user` | `8px` | 用户连续消息间距 |
| `dialog.bubble-max` | `346px` | 气泡最大宽度 |
| `dialog.bubble-padding-y` | `12px` | 气泡垂直 padding |
| `dialog.bubble-padding-x` | `20px` | 气泡水平 padding |

---

## 圆角

| Token | 值 | 用途 |
|------|------|------|
| `radius.bubble` / `--radius-bubble` | `22px` | 气泡 |
| `radius.ai-card` / `--radius-ai-card` | `36px` | AI 富文本卡片 |
| `radius.inner-card` / `--radius-inner-card` | `14px` | 卡片内元素 |
| `radius.tag` / `--radius-tag` | `20px` | 标签 |
| `radius.input` / `--radius-input` | `16px` | 输入框 |
| `radius.option` / `--radius-option` | `12px` | 选项标签 |
| `radius.cta` / `--radius-cta` | `24px` | CTA 按钮 |
| `radius.input-container` | `28px 28px 0 0` | 输入栏容器 |
| `radius.sheet` | `20px 20px 0 0` | 底部弹窗 |
| `radius.community-card` | `8px` | 社区笔记卡片 |
| `radius.avatar` | `50%` | 头像 |

---

## 动效

| Token | 值 | 用途 |
|------|------|------|
| `curve.out` / `--curve-out` | `cubic-bezier(.32,.72,0,1)` | 通用出场/进入 |
| `curve.spring` / `--curve-spring` | `cubic-bezier(.34,1.56,.64,1)` | 弹性效果 |
| `duration.in` / `--duration-in` | `250ms` | 元素入场 |
| `duration.expand` / `--duration-expand` | `350ms` | 内容展开 |
| `duration.delayed-in` / `--duration-delayed-in` | `300ms` | 延迟入场 |
| `duration.out` / `--duration-out` | `250ms` | 元素退场 |
| `duration.sheet` / `--duration-sheet` | `400ms` | 弹窗/底部弹窗出入场 |

按压反馈：`scale(.95)` 到 `scale(.97)`，透明度 `.5`。交互元素必须禁用文本选中和 tap highlight。

---

## 阴影

| Token | Light | Dark | 用途 |
|------|------|------|------|
| `shadow.1` / `--shadow-1` | `0 8px 24px rgba(20,20,20,0.04)` | `0 8px 24px rgba(20,20,20,0.08)` | 卡片、容器 |
| `shadow.2` / `--shadow-2` | `0 16px 48px rgba(20,20,20,0.12)` | `0 16px 48px rgba(20,20,20,0.24)` | 面板 |
| `shadow.3` / `--shadow-3` | `0 24px 72px rgba(20,20,20,0.20)` | `0 24px 72px rgba(20,20,20,0.40)` | 高层面板 |
