# Dots Design System Skill

> 把这份内容粘到 Cursor / Claude Code 的系统提示里，再开始生成 UI。
> AI-native 设计系统：给机器读的契约。约束被违反 = 幻觉。

## 使用约定
- **颜色**：仅引用 `var(--<token-name>)`（见下方 Tokens 段），禁止 hex/rgba 字面量。
- **间距**：仅用 `var(--space-1)` ~ `var(--space-10)`，禁止自定义 px。
- **圆角**：5 级封闭枚举 `radius-small / medium / large / x-large / full`。
- **字号**：从 typography 令牌挑（headline-h1/h2/h3, body-primary/secondary, callout, subhead, footnote, caption-1/2）。
- **组件**：见下方 Component Contracts。props 必须命中 values 枚举；states 必须全覆盖；constraints 不能违反。
- **校验**：生成完跑 `npm run lint:tokens`，0 违规才算合格。

---
# Dots Design Tokens (machine-readable)

> 自动生成自 `tokens/*.json`。AI 在生成 Dots 风格 UI 时，所有数值必须从此处取，禁止 hardcoded hex / px。

**约束**：
- 颜色只能引用下表令牌名。Light/Dark 双模式下，dark 值见每条的 `(dark: ...)` 后缀。
- 间距、圆角是封闭枚举，禁止自定义中间值（不能写 `14px`，只能用 `space.4` = 16px）。
- 字体仅 PingFang SC，禁止其他字体。

## Color

| 令牌 | 值 | 说明 |
|---|---|---|
| `color.bg.0` | `#FFFFFF` (dark: `#323232`) | 兼容旧 schema：BG-0，映射到 Bg 3 |
| `color.bg.1` | `#F7F7F7` (dark: `#282828`) | Bg 1：底部栏、导航栏背景 |
| `color.bg.2` | `#FAFAFA` (dark: `#2D2D2D`) | Bg 2：键盘升起低栏背景 |
| `color.bg.3` | `#FFFFFF` (dark: `#323232`) | Bg 3：半屏、弹窗、弹出层背景 |
| `color.bg.base` | `#F3F3F3` (dark: `#242424`) | Bg：主背景色，对话流等一级界面 |
| `color.bg.light` | `#FFFFFF` | Bg Light：纯白背景，不随主题切换 |
| `color.bg.black` | `#141414` | Bg Black：纯黑背景，不随主题切换 |
| `color.bg.mask-1` | `rgba(0,0,0,0.2)` | Mask Bg 1：浅遮罩 |
| `color.bg.mask-2` | `rgba(0,0,0,0.4)` | Mask Bg 2：深遮罩 |
| `color.title` | `#141414` (dark: `rgba(255,255,255,0.94)`) | Title：一级标题、对话流文本 |
| `color.paragraph` | `rgba(20,20,20,0.8)` (dark: `rgba(255,255,255,0.8)`) | Paragraph：二级标题、段落、icon |
| `color.description` | `rgba(20,20,20,0.6)` (dark: `rgba(255,255,255,0.6)`) | Description：描述、未选中字色 |
| `color.description-lighter` | `rgba(20,20,20,0.4)` (dark: `rgba(255,255,255,0.4)`) | Description Lighter：更弱描述 |
| `color.placeholder` | `rgba(20,20,20,0.16)` (dark: `rgba(255,255,255,0.16)`) | Placeholder：输入栏、loading 占位文本 |
| `color.disabled` | `rgba(20,20,20,0.09)` (dark: `rgba(255,255,255,0.09)`) | Disabled：禁用色 |
| `color.link` | `#0D4087` (dark: `#93BFF1`) | Link：文字链 |
| `color.label.primary` | `#141414` (dark: `rgba(255,255,255,0.94)`) | 兼容旧 schema：Label-Primary，映射到 Title |
| `color.label.secondary` | `rgba(20,20,20,0.6)` (dark: `rgba(255,255,255,0.6)`) | 兼容旧 schema：Label-Secondary，映射到 Description |
| `color.label.tertiary` | `rgba(20,20,20,0.16)` (dark: `rgba(255,255,255,0.16)`) | 兼容旧 schema：Label-Tertiary，映射到 Placeholder |
| `color.label.quaternary` | `rgba(20,20,20,0.09)` (dark: `rgba(255,255,255,0.09)`) | 兼容旧 schema：Label-Quaternary，映射到 Disabled |
| `color.dark.title` | `rgba(255,255,255,0.94)` (dark: `#141414`) | Dark Title：浅色背景上的反色一级标题 |
| `color.dark.paragraph` | `rgba(255,255,255,0.8)` (dark: `rgba(20,20,20,0.8)`) | Dark Paragraph：浅色背景上的反色段落/icon |
| `color.dark.description` | `rgba(255,255,255,0.6)` (dark: `rgba(20,20,20,0.6)`) | Dark Description |
| `color.dark.placeholder` | `rgba(255,255,255,0.16)` (dark: `rgba(20,20,20,0.16)`) | Dark Placeholder |
| `color.dark.link` | `#93BFF1` (dark: `#0D4087`) | Dark Link |
| `color.light.title` | `#141414` | Light Title：Always Mode 一级标题 |
| `color.light.paragraph` | `rgba(20,20,20,0.8)` | Light Paragraph：Always Mode 段落/icon |
| `color.light.description` | `rgba(20,20,20,0.6)` | Light Description |
| `color.light.description-1` | `rgba(20,20,20,0.4)` | Light Description 1 |
| `color.light.placeholder` | `rgba(20,20,20,0.16)` | Light Placeholder |
| `color.light.disabled` | `rgba(20,20,20,0.09)` | Light Disabled |
| `color.light.link` | `#133667` | Light Link |
| `color.fill.1` | `rgba(255,255,255,0.05)` (dark: `rgba(50,50,50,0.05)`) | Fill 1：loading 气泡等色 |
| `color.fill.2` | `rgba(255,255,255,0.1)` (dark: `rgba(50,50,50,0.1)`) | Fill 2：富文本、分享卡悬浮容器底色 |
| `color.fill.3` | `rgba(255,255,255,0.2)` (dark: `rgba(50,50,50,0.2)`) | Fill 3 |
| `color.fill.4` | `rgba(255,255,255,0.5)` (dark: `rgba(50,50,50,0.5)`) | Fill 4 |
| `color.fill.5` | `rgba(255,255,255,0.8)` (dark: `rgba(50,50,50,0.8)`) | Fill 5：AI 卡片/富文本背景 |
| `color.fill.a` | `#FFFFFF` (dark: `#323232`) | Fill A：输入框、模型侧气泡底色 |
| `color.fill.b` | `#E6E6E6` (dark: `#1C1C1C`) | Fill B：用户侧气泡/轻提示底色 |
| `color.fill.c` | `rgba(50,50,50,0.92)` (dark: `rgba(68,68,68,0.8)`) | Fill C：长按面板底色 |
| `color.fill.primary` | `rgba(50,50,50,0.2)` (dark: `rgba(255,255,255,0.2)`) | 兼容旧 schema：Fill-Primary，映射到 Inverted Fill 3 |
| `color.fill.secondary` | `rgba(50,50,50,0.1)` (dark: `rgba(255,255,255,0.1)`) | 兼容旧 schema：Fill-Secondary，映射到 Inverted Fill 2 |
| `color.fill.tertiary` | `rgba(50,50,50,0.05)` (dark: `rgba(255,255,255,0.05)`) | 兼容旧 schema：Fill-Tertiary，映射到 Inverted Fill 1 |
| `color.fill.quaternary` | `rgba(20,20,20,0.02)` (dark: `rgba(91,88,88,0.26)`) | 兼容旧 schema：Fill-Quaternary，映射到 info 3 |
| `color.inverted-fill.1` | `rgba(50,50,50,0.05)` (dark: `rgba(255,255,255,0.05)`) | Inverted Fill 1 |
| `color.inverted-fill.2` | `rgba(50,50,50,0.1)` (dark: `rgba(255,255,255,0.1)`) | Inverted Fill 2 |
| `color.inverted-fill.3` | `rgba(50,50,50,0.2)` (dark: `rgba(255,255,255,0.2)`) | Inverted Fill 3 |
| `color.inverted-fill.4` | `rgba(50,50,50,0.5)` (dark: `rgba(255,255,255,0.5)`) | Inverted Fill 4 |
| `color.inverted-fill.5` | `rgba(50,50,50,0.8)` (dark: `rgba(255,255,255,0.8)`) | Inverted Fill 5 |
| `color.separator.2` | `rgba(20,20,20,0.08)` (dark: `rgba(255,255,255,0.08)`) | Separator 2：模型侧气泡、容器描边 |
| `color.separator.3` | `rgba(20,20,20,0.1)` (dark: `rgba(255,255,255,0.1)`) | Separator 3：query 气泡描边 |
| `color.separator.4` | `rgba(255,255,255,0.2)` (dark: `rgba(50,50,50,0.2)`) | Separator 4：容器白色描边 |
| `color.separator.base` | `rgba(255,255,255,0.75)` (dark: `rgba(255,255,255,0.1)`) | Separator：用户侧气泡描边 |
| `color.separator.light-1` | `rgba(255,255,255,0.08)` | Light Separator 1 |
| `color.separator.light-2` | `rgba(255,255,255,0.2)` | Light Separator 2 |
| `color.separator.light-3` | `rgba(255,255,255,0.75)` | Light Separator 3 |
| `color.separator.light-4` | `rgba(20,20,20,0.08)` | Light Separator 4 |
| `color.separator.light-5` | `rgba(50,50,50,0.2)` | Light Separator 5 |
| `color.line.opaque` | `rgba(20,20,20,0.1)` (dark: `rgba(255,255,255,0.1)`) | 兼容旧 schema：Line-Opaque，映射到 Separator 3 |
| `color.line.non-opaque` | `rgba(20,20,20,0.08)` (dark: `rgba(255,255,255,0.08)`) | 兼容旧 schema：Line-NonOpaque，映射到 Separator 2 |
| `color.info.2` | `rgba(175,217,241,0.2)` (dark: `rgba(71,94,106,0.2)`) | info 2：富文本蓝色 |
| `color.info.3` | `rgba(20,20,20,0.02)` (dark: `rgba(91,88,88,0.26)`) | info 3：富文本灰色 |
| `color.info.4` | `rgba(111,210,189,0.3)` | info 4：文本选中绿色 |
| `color.info.5` | `#6FD2BD` | info 5：品牌主色/纯绿色 |
| `color.info.6` | `#21C3A1` | info 6：文本选中分割栏绿色 |
| `color.info.base` | `rgba(253,240,145,0.2)` (dark: `rgba(108,104,69,0.2)`) | info：富文本黄色 |
| `color.primary` | `#FF2442` | 小红书社区红，仅用于社区关注/发布场景 |
| `color.brand.blue` | `#6FD2BD` | 兼容旧 schema：Brand-Blue，映射到 info 5 |
| `color.brand.blue-light` | `rgba(111,210,189,0.3)` | 兼容旧 schema：Brand-Blue-Light，映射到 info 4 |
| `color.brand.blue-border` | `#21C3A1` | 兼容旧 schema：Brand-Blue-Border，映射到 info 6 |
| `color.brand.blue-text` | `#21C3A1` | 兼容旧 schema：Brand-Blue-Text，映射到 info 6 |
| `color.backdrop` | `rgba(0,0,0,0.4)` | 兼容旧 schema：弹层遮罩，映射到 Mask Bg 2 |
| `color.accent.yellow` | `#FFCC00` | 兼容：待办标签 |
| `color.accent.green` | `#34C759` | 兼容：日记标签 |
| `color.accent.pink` | `#FF6482` | 兼容：持续月录标签 |
| `color.accent.brown` | `#916964` | 兼容：文件标签 |
| `color.accent.event-blue` | `#5B9BDB` | 兼容：事件追踪标签 |
| `color.deco.teal` | `#81D5CA` | 兼容：Live 图功能图标背景 |
| `color.deco.sky` | `#84B1EB` | 兼容：Web 端 / 时间碎片图标背景 |
| `color.deco.lavender` | `#9F8CCF` | 兼容：AI 溯源图标背景 |
| `color.deco.sage` | `#A0C484` | 兼容：频道数量图标背景 |
| `color.deco.rose` | `#AA7D78` | 兼容：音视频解析图标背景 |

## phone

| 令牌 | 值 | 说明 |
|---|---|---|
| `phone.width` | `430px` | iOS 大屏设计稿宽度 |
| `phone.height` | `932px` | iOS 大屏设计稿高度 |
| `phone.radius` | `54px` | 模拟真机外壳圆角 |

## safe

| 令牌 | 值 | 说明 |
|---|---|---|
| `safe.top` | `59px` | 状态栏/安全区顶部 |
| `safe.bottom` | `34px` | 底部安全区 |
| `safe.nav` | `65px` | 导航栏高度 |

## dialog

| 令牌 | 值 | 说明 |
|---|---|---|
| `dialog.flow-padding-x` | `12px` | 对话流左右 padding |
| `dialog.gap-cross-side` | `20px` | 不同侧消息间距 |
| `dialog.gap-tail` | `26px` | 有引脚的消息间距 |
| `dialog.gap-ai` | `16px` | AI 连续消息间距 |
| `dialog.gap-user` | `8px` | 用户连续消息间距 |
| `dialog.bubble-max` | `346px` | 对话气泡最大宽度 |
| `dialog.bubble-padding-y` | `12px` | 气泡垂直 padding |
| `dialog.bubble-padding-x` | `20px` | 气泡水平 padding |
| `dialog.tail` | `24px` | 气泡尾巴宽高 |
| `dialog.tail-offset` | `-11px` | 气泡尾巴底部偏移 |
| `dialog.input-height` | `48px` | 输入区域高度 |
| `dialog.input-total-height` | `96px` | 输入栏含安全区总高 |
| `dialog.icon` | `24px` | 输入栏图标尺寸 |

## rich

| 令牌 | 值 | 说明 |
|---|---|---|
| `rich.gap-level-1` | `32pt` | 富文本一级模块间距 |
| `rich.gap-level-2` | `22pt` | 富文本二级模块间距 |
| `rich.gap-level-3` | `16pt` | 富文本三级模块间距 |
| `rich.text-padding-x` | `24pt` | 文字类原子左右间距 |
| `rich.block-padding-x` | `14pt` | 图片、图组、地图、商品卡等内容块左右间距 |
| `rich.card-top` | `28pt` | 卡片容器顶部到 H1 |
| `rich.card-action-gap` | `28pt` | 最后内容到按钮区顶部 |
| `rich.card-bottom` | `30pt` | 按钮区底部到容器底部 |

## Spacing

| 令牌 | 值 | 说明 |
|---|---|---|
| `space.1` | `4px` | 微调 |
| `space.2` | `8px` | 紧凑间距 / 用户连续消息 |
| `space.3` | `12px` | 对话流左右 padding / 气泡垂直 padding |
| `space.4` | `16px` | AI 连续消息 / 小区块 |
| `space.5` | `20px` | 不同侧消息间距 |
| `space.6` | `24px` | 气泡尾巴 / 文字左右间距 |
| `space.7` | `32px` | 富文本一级模块间距约值 |
| `space.8` | `40px` | 大区块间距 |
| `space.9` | `48px` | 输入区域 / CTA 高度 |
| `space.10` | `64px` | 大段留白 |

## Radius

| 令牌 | 值 | 说明 |
|---|---|---|
| `radius.bubble` | `22px` | 对话气泡 |
| `radius.ai-card` | `36px` | AI 富文本卡片 |
| `radius.inner-card` | `14px` | 卡片内元素 |
| `radius.tag` | `20px` | 标签 |
| `radius.input` | `16px` | 输入框 |
| `radius.option` | `12px` | 选项标签 |
| `radius.cta` | `24px` | CTA 按钮 |
| `radius.input-container` | `28px 28px 0 0` | 输入栏容器 |
| `radius.sheet` | `20px 20px 0 0` | 底部弹窗 |
| `radius.community-card` | `8px` | 社区笔记卡片 |
| `radius.avatar` | `50%` | 头像圆形 |
| `radius.small` | `6px` | 兼容旧文档：小圆角 |
| `radius.medium` | `8px` | 兼容旧文档：社区卡片/导航项 |
| `radius.large` | `12px` | 兼容旧文档：选项标签 |
| `radius.xlarge` | `22px` | 兼容旧文档：映射到气泡圆角 |
| `radius.full` | `9999px` | 胶囊 / 头像 |

## Motion · Duration

| 令牌 | 值 | 说明 |
|---|---|---|
| `duration.in` | `250ms` | 元素入场 |
| `duration.expand` | `350ms` | 内容展开 |
| `duration.delayed-in` | `300ms` | 延迟入场 |
| `duration.out` | `250ms` | 元素退场 |
| `duration.sheet` | `400ms` | 弹窗/底部弹窗出入场，允许 350-450ms |
| `duration.fast` | `250ms` | 兼容旧变量：状态切换 |
| `duration.normal` | `250ms` | 兼容旧变量：页面切换 |
| `duration.slow` | `350ms` | 兼容旧变量：大幅位移 |

## Motion · Curve

| 令牌 | 值 | 说明 |
|---|---|---|
| `curve.out` | `cubic-bezier(.32,.72,0,1)` | 通用出场/进入 |
| `curve.spring` | `cubic-bezier(.34,1.56,.64,1)` | 弹性效果 |
| `curve.default` | `cubic-bezier(.32,.72,0,1)` | 兼容旧变量：映射到 Dots ease-out |
| `curve.ease-out` | `cubic-bezier(.32,.72,0,1)` | 兼容旧变量：映射到 Dots ease-out |

## press

| 令牌 | 值 | 说明 |
|---|---|---|
| `press.scale-min` | `0.95` | 按压缩放下限 |
| `press.scale-max` | `0.97` | 按压缩放上限 |
| `press.opacity` | `0.5` | 按压透明度 |

## Shadow

| 令牌 | 值 | 说明 |
|---|---|---|
| `shadow.1` | `0 8px 24px rgba(20,20,20,0.04)` (dark: `0 8px 24px rgba(20,20,20,0.08)`) | 卡片、容器阴影 |
| `shadow.2` | `0 16px 48px rgba(20,20,20,0.12)` (dark: `0 16px 48px rgba(20,20,20,0.24)`) | 面板阴影 |
| `shadow.3` | `0 24px 72px rgba(20,20,20,0.20)` (dark: `0 24px 72px rgba(20,20,20,0.40)`) | 高层面板阴影 |
| `shadow.modal` | `0 16px 48px rgba(20,20,20,0.12)` (dark: `0 16px 48px rgba(20,20,20,0.24)`) | 兼容旧变量：映射到 shadow 2 |

## Font Family

| 令牌 | 值 | 说明 |
|---|---|---|
| `font.family` | `'PingFang SC', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif` | 唯一字体栈 |

## Typography

| 令牌 | size | weight | line-height | 说明 |
|---|---|---|---|---|
| `typography.rich-h1` | 20pt | 600 | 34pt | 富文本总标题 H1 |
| `typography.rich-h2` | 18pt | 600 | 31pt | 富文本一级模块标题 H2 |
| `typography.rich-h3` | 17pt | 600 | 29pt | 富文本二级模块标题 H3 |
| `typography.rich-h4` | 16pt | 600 | 27pt | 富文本三级模块标题 H4 |
| `typography.rich-paragraph` | 16pt | 400 | 27pt | 富文本正文段落、列表、引用 |
| `typography.rich-table` | 14pt | 400 | 24pt | 富文本表格内容 |
| `typography.dialog-bubble` | 16px | 400 | 1.69em | 对话气泡正文 |
| `typography.dialog-input` | 16px | 400 | 48px | 输入框文字 |
| `typography.dialog-time` | 13px | 400 | 18px | 对话时间标签 |
| `typography.community-card-title` | 14px | 500 | 20px | 社区卡片标题，最多两行 |
| `typography.support` | 12px | 400 | 17px | 辅助文字 |
| `typography.headline-h1` | 20pt | 600 | 34pt | 兼容旧文档：映射到 Rich H1 |
| `typography.headline-h2` | 18pt | 600 | 31pt | 兼容旧文档：映射到 Rich H2 |
| `typography.headline-h3` | 17pt | 600 | 29pt | 兼容旧文档：映射到 Rich H3 |
| `typography.body-primary` | 16px | 400 | 1.69em | 兼容旧文档：对话气泡正文 |
| `typography.body-secondary` | 14px | 400 | 20px | 辅助正文 |
| `typography.callout` | 16px | 500 | 22px | 按钮/强调文本 |
| `typography.subhead` | 14px | 400 | 20px | 副标题、列表项 |
| `typography.footnote` | 13px | 400 | 18px | 脚注、时间标签 |
| `typography.caption-1` | 12px | 400 | 17px | 说明、分组标题 |
| `typography.caption-2` | 11px | 400 | 13px | 极小说明 |


---

# Dots Component Contracts (machine-readable)

> 自动生成自 `components/*.schema.json`。AI 在生成 Dots 风格 UI 时，组件 props 必须从 values 枚举中选；states 必须全覆盖；constraints 不能违反。

## Button (`button`)

**Category**: action

触发即时任务的动作单元。Dots Button 继承 ReDs 的六档尺寸、宽度和场景规则，主色映射为 info 5，图底场景使用 ghost。

### Props
- `variant`: "filled" | "outline" | "neutral" | "ghost" _(default: `"filled"`)_
  视觉层级。filled 是唯一主操作；outline 是强调次级动作；neutral 用于空态、取消和弱操作；ghost 只用于图片、彩色或深色背景。
- `size`: "xLarge" | "large" | "medium" | "small" | "mini" | "micro" _(default: `"medium"`)_
  xLarge 48px / large 44px / medium 36px / small 28px / mini 24px / micro 20px。xLarge 与 micro 仅限特定场景。
- `icon`: "none" | "leading" | "trailing" | "only" _(default: `"none"`)_
  图标位置。only 是纯图标按钮，必须提供 aria-label；文字按钮默认不带图标。
- `fullWidth`: false | true _(default: `false`)_
  是否占满父容器。只用于表单底部、固定操作栏和页面主 CTA。
- `selected`: false | true _(default: `false`)_
  用于关注类按钮的已选中状态，例如 已关注 / 互相关注。选中后通常降低层级。

### States
`default`, `pressed`, `disabled`, `loading`, `selected`

### Constraints
- **max_filled_per_view**: 同一视图最多一个 variant=filled 的主操作，避免主次失焦。
- **copy_pattern**: 按钮文案必须短，优先使用 谓语+宾语 或 谓语，例如 立即查看、去看看、发送、关注。
- **width_hugs_content_after_min_width**: 短文案使用 min-width 居中；长文案宽度随内容增长，并保留对应尺寸的左右 padding。
- **full_width_requires_main_flow**: fullWidth 只能用于表单底部、固定操作栏或页面主 CTA，不用于卡片内普通按钮。
- **ghost_requires_visual_background**: ghost 只用于图片、彩色或深色背景；图底按钮不展示 disabled 态。
- **icon_only_requires_aria_label**: icon=only 时必须提供 aria-label。

### Anatomy
- **container**: 承载视觉层级、尺寸、最小宽度和左右 padding；长文案时宽度 hug content。
- **label**: 按钮文案，必须短，优先 谓语+宾语 或 谓语。
- **icon**: 可选图标。leading/trailing 与文字同色；only 形态必须有 aria-label。

### Do
- 表单底部使用 size=large + variant=filled + fullWidth=true。
- 空态动作使用 size=medium + variant=neutral。
- 卡片内按钮使用 small 或 mini，避免抢过卡片标题。
- 图片或彩色背景上使用 filled 或 ghost，不使用低识别度描边按钮。

### Don't
- 不要在同一视图放两个 variant=filled 的按钮。
- 不要把小红书红 --primary 用作点点主按钮。
- 不要在图底按钮上展示 disabled 态。
- 不要让 xLarge 或 micro 成为默认尺寸。
- 不要在 button 内嵌 button 或链接。

---

## Card (`card`)

**Category**: container

组合容器。承载相关信息的最小单元，是 patterns 的起点。Dots 风格：hairline 边框、20px / 12px 圆角、不滥用阴影。

### Props
- `variant`: "default" | "tinted" | "elevated" _(default: `"default"`)_
  default 透明 + hairline；tinted 浅灰底 (bg-1) 不带边；elevated 仅用于弹层卡，带 shadow-modal
- `padding`: "compact" | "standard" | "comfortable" _(default: `"standard"`)_
  compact space-3 / standard space-4 / comfortable space-5
- `interactive`: false | true _(default: `false`)_
  是否可点击。true 时 hover 加 fill-quaternary 背景，cursor=pointer

### States
`idle`, `hover`, `pressed`, `disabled`

### Constraints
- **no_nested_card**: Card 内不嵌套 Card —— 用分隔区或 List 替代
- **elevated_only_for_modal**: elevated（带阴影）只用于 Modal / Sheet 的容器，普通页面禁用
- **interactive_requires_role**: interactive=true 时必须设 role=button 并支持键盘

### Anatomy
- **container**: bg, border, shadow?, radius, padding
- **header (optional)**: 标题区，用 typography.headline-h3
- **body**: 正文区
- **footer (optional)**: 动作区，常含 Button

### Do
- 信息密集的列表用 default + 12px 圆角
- AI 回应卡 / 能力卡用 tinted 或 default + 20px 圆角
- interactive 卡片整块响应点击，不要让用户找小按钮

### Don't
- 不要在 Card 里再嵌 Card
- 不要给非弹层卡片加阴影
- 不要让 Card 边框和 Card 内 Divider 视觉上混淆

---

## Empty State (`empty-state`)

**Category**: feedback

AI 最容易忘记的状态。空容器不是 bug，是产品的一个 view —— 必须给图、给话、给下一步。

### Props
- `kind`: "empty" | "no-result" | "no-permission" | "error" | "first-time" _(default: `"empty"`)_
  empty：本来就没数据；no-result：搜索/筛选未命中；no-permission：受限；error：加载失败；first-time：用户首次进入，引导创建
- `size`: "inline" | "centered" | "fullscreen" _(default: `"centered"`)_
  inline 嵌入 list；centered 占当前容器中心；fullscreen 占整页
- `illustration`: "icon" | "spot" | "scene" | "none" _(default: `"icon"`)_
  icon 单图标 64x64；spot 中型插图 120x120；scene 大插图 200+；none 仅文字

### States
`idle`, `loading-action`

### Constraints
- **always_has_action**: 除 size=inline 外，必须给至少一个动作按钮（创建、刷新、返回、了解更多）
- **first_time_must_explain_value**: first-time 必须说明使用价值，不只说「还没有内容」
- **error_must_be_actionable**: error 必须给「重试」或「查看详情」，不留死路

### Anatomy
- **illustration**: icon.color, icon.size.*
- **title**: title.font, title.color
- **description (optional)**: description.font, description.color
- **primary-action**: Button intent=primary, size=standard
- **secondary-action (optional)**: Button intent=ghost

### Do
- first-time 用积极语言：「记下你的第一条想法」而不是「这里空空如也」
- no-result 给「清除筛选」或「修改关键词」的明确出口
- error 给重试按钮 + 简短错误描述，不要堆栈

### Don't
- 不要只显示一个灰色的 emoji + 「没有数据」就完事
- 不要在 fullscreen 空状态里让用户找返回键
- 不要把 loading 当 empty 渲染（先转 spinner，超时后才进 empty）

---

## Input (`input`)

**Category**: form

单行文字输入。状态最多的组件——empty / focus / error / disabled / loading 必须全覆盖，否则 AI 生成时会随机漏。

### Props
- `size`: "compact" | "standard" _(default: `"standard"`)_
  compact 36px / standard 44px
- `kind`: "text" | "search" | "password" _(default: `"text"`)_
  类型。search 左侧带搜索图标；password 右侧带 eye 切换
- `leadingIcon`: false | true _(default: `false`)_
  是否显示前置图标位
- `trailingAction`: "none" | "clear" | "submit" _(default: `"none"`)_
  尾部动作。clear 已输入时显示叉号；submit 显示发送按钮

### States
`empty`, `focus`, `filled`, `error`, `disabled`, `loading`

### Constraints
- **error_requires_message**: error 状态必须配文案，不能只让边框变红
- **loading_disables_input**: loading 时输入框不可编辑（disabled 视觉），右侧显示菊花
- **placeholder_not_label**: placeholder 不能替代 label，必须有独立的 label 或 aria-label

### Anatomy
- **label**: label.font, label.color
- **container**: container.bg, container.border.*, container.radius, container.height.*
- **leading-icon**: icon.size, icon.color
- **value**: value.font, value.color
- **placeholder**: placeholder.color
- **trailing-action**: icon.size
- **error-message**: error.font, error.color

### Do
- label 写在输入框上方，不要和 placeholder 二选一
- error 状态同时改边框 + 显示文案 + 触发 haptic light
- loading 用菊花替代 trailingAction，禁用输入

### Don't
- 不要用 placeholder 当 label
- 不要让 disabled 看起来像 idle（区别于 read-only）
- 不要把验证错误悄悄塞在角落，必须显式占行

---

## Sheet (`sheet`)

**Category**: overlay

弹层 / 抽屉的语义统一。很多团队把 Sheet / Drawer / Modal / Action Sheet 混着用，Dots 强制语义区分：Sheet 是从屏幕边缘滑入的临时上下文，Modal 是中央对齐的强制选择。

### Props
- `side`: "bottom" | "right" _(default: `"bottom"`)_
  滑入方向。bottom 移动端常用（高度 50–90%），right 桌面常用（宽 320–480px）
- `size`: "compact" | "standard" | "full" _(default: `"standard"`)_
  compact 占屏 40%，standard 65%，full 95%（保留状态栏）
- `modal`: true | false _(default: `true`)_
  是否屏蔽背景点击。modal=true 时点遮罩外才关闭；false 时 sheet 像 popover
- `dragToDismiss`: true | false _(default: `true`)_
  是否允许下拉 / 右滑关闭。仅 side=bottom 且 size != full 生效

### States
`entering`, `open`, `closing`, `closed`

### Constraints
- **not_for_critical_choice**: 需要用户做不可逆决策时用 Modal，不用 Sheet（Sheet 容易被滑掉）
- **single_sheet_at_a_time**: 同一时刻只允许一个 Sheet 打开，禁止 Sheet 上叠 Sheet
- **drag_handle_required**: side=bottom 且 dragToDismiss=true 时必须显示拖拽 handle（视觉提示）

### Anatomy
- **backdrop**: backdrop.bg, duration.enter
- **container**: container.bg, container.shadow, container.radius.*, padding
- **drag-handle (bottom only)**: handle.bg, handle.size
- **header (optional)**: 标题 + 关闭按钮，typography.headline-h3
- **content**: 可滚动主体
- **footer (optional)**: 动作区，sticky 在底部

### Do
- 选择列表 / 筛选 / 详情预览用 Sheet
- side=bottom 时高度跟随内容，超过 90vh 时启用滚动
- 拖拽到 30% 阈值才触发关闭，避免误触

### Don't
- 不要用 Sheet 做关键确认（删除前的二次确认必须 Modal）
- 不要在 Sheet 上再叠 Sheet
- 不要让 Sheet 的圆角与全屏页混淆 —— 永远露出顶部状态栏的 backdrop

---
