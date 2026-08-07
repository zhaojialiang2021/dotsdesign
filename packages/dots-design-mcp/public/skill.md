# Dots Design System Skill

> 把这份内容粘到 Cursor / Claude Code 的系统提示里，再开始生成 UI。
> AI-native 设计系统：给机器读的契约。Harness 是 AI 的执行轨道；约束被违反 = 幻觉。

## 使用约定
- **颜色**：仅引用 `var(--<token-name>)`（见下方 Tokens 段），禁止 hex/rgba 字面量。
- **间距**：仅用 `var(--space-1)` ~ `var(--space-10)`，禁止自定义 px。
- **圆角**：5 级封闭枚举 `radius-small / medium / large / x-large / full`。
- **字号**：从 typography 令牌挑（headline-h1/h2/h3, body-primary/secondary, callout, subhead, footnote, caption-1/2）。
- **组件**：见下方 Component Harness。props 必须命中 values 枚举；states 必须全覆盖；constraints 和 harness 规则不能违反。
- **校验**：生成完跑 `npm run lint:tokens`，0 违规才算合格。

---
# Dots Design Tokens (machine-readable)

> 自动生成自 `tokens/*.json`。AI 在生成 Dots 风格 UI 时，所有数值必须从此处取，禁止 hardcoded hex / px。

**约束**：
- 颜色只能引用下表令牌名。Light/Dark 双模式下，dark 值见每条的 `(dark: ...)` 后缀。
- 间距、圆角是封闭枚举，禁止自定义中间值（不能写 `14px`，只能用 `space.4` = 16px）。
- 组件规范字体仅 PingFang SC，禁止其他字体。

## Color

| 令牌 | 值 | 说明 |
|---|---|---|
| `color.bg.0` | `#F5F5F5` (dark: `#19191E`) | Bg 0：最底层，卡片容器后层背景 |
| `color.bg.1` | `#F5F5F5` (dark: `#222226`) | Bg 1：基准层上模块背景 |
| `color.bg.2` | `#FFFFFF` (dark: `#29292E`) | Bg 2：弹出层等最高层背景 |
| `color.bg.base` | `#FFFFFF` (dark: `#29292E`) | Bg：基准层，主背景色 |
| `color.bg.0-lighter` | `#FAFAFA` (dark: `#141418`) | Bg 0 Lighter：最底层浅色背景 |
| `color.title` | `rgba(0,0,0,0.8)` (dark: `rgba(255,255,255,0.84)`) | Title：一级标题 |
| `color.paragraph` | `rgba(0,0,0,0.62)` (dark: `rgba(255,255,255,0.56)`) | Paragraph：二级标题、段落 |
| `color.description` | `rgba(0,0,0,0.45)` (dark: `rgba(255,255,255,0.36)`) | Description：描述、未选中文字 |
| `color.disabled` | `rgba(0,0,0,0.27)` (dark: `rgba(255,255,255,0.21)`) | Disabled：禁用色 |
| `color.placeholder` | `rgba(0,0,0,0.27)` (dark: `rgba(255,255,255,0.21)`) | Placeholder：占位文本色 |
| `color.link` | `#133667` (dark: `#C6D9EF`) | Link：段落和话题链接 |
| `color.link-accent` | `#3D8AF5` (dark: `#C6D9EF`) | Link Accent：强调链接 |
| `color.fill.1` | `rgba(48,48,52,0.05)` (dark: `rgba(255,255,255,0.04)`) | Fill 1：次级按钮、标签、输入框底色 |
| `color.fill.2` | `rgba(48,48,52,0.1)` (dark: `rgba(255,255,255,0.08)`) | Fill 2：操作组件按下色 |
| `color.fill.3` | `rgba(48,48,52,0.2)` (dark: `rgba(255,255,255,0.125)`) | Fill 3：弱标签色 |
| `color.fill.4` | `rgba(48,48,52,0.5)` (dark: `rgba(255,255,255,0.32)`) | Fill 4：标签色 |
| `color.fill.5` | `rgba(48,48,52,0.99)` (dark: `rgba(255,255,255,0.99)`) | Fill 5：强标签、气泡、轻提示底色 |
| `color.inverted-fill.1` | `rgba(255,255,255,0.04)` (dark: `rgba(48,48,52,0.05)`) | Inverted Fill 1：反色次级按钮、标签、输入框底色 |
| `color.inverted-fill.2` | `rgba(255,255,255,0.08)` (dark: `rgba(48,48,52,0.1)`) | Inverted Fill 2：反色操作组件按下色 |
| `color.inverted-fill.3` | `rgba(255,255,255,0.125)` (dark: `rgba(48,48,52,0.2)`) | Inverted Fill 3：反色弱标签色 |
| `color.inverted-fill.4` | `rgba(255,255,255,0.32)` (dark: `rgba(48,48,52,0.5)`) | Inverted Fill 4：反色标签色 |
| `color.inverted-fill.5` | `rgba(255,255,255,0.99)` (dark: `rgba(48,48,52,0.99)`) | Inverted Fill 5：反色强标签、气泡、轻提示底色 |
| `color.separator.2` | `rgba(0,0,0,0.2)` (dark: `rgba(255,255,255,0.16)`) | Separator 2：较深色二级描边 |
| `color.separator.base` | `rgba(0,0,0,0.08)` (dark: `rgba(255,255,255,0.12)`) | Separator：分割线、描边 |
| `color.separator.opaque` | `#EAEAEA` (dark: `#222226`) | Opaque Separator：多条线重叠时使用 |
| `color.xhs.red` | `#FF2442` (dark: `#FF2E4D`) | XHS Red：小红书品牌强调色 |
| `color.xhs.red-soft` | `#FFEDF0` (dark: `#301C1F`) | XHS Red Soft：小红书品牌弱强调背景 |
| `color.warning` | `#FF7D03` (dark: `#FF9E3D`) | Warning：警告填充及浅色填充上的文字 |
| `color.warning-soft` | `#FFF2E6` (dark: `#30271F`) | Warning Soft：警告浅色填充 |
| `color.success` | `#02B940` (dark: `#36E271`) | Success：成功填充及浅色填充上的文字 |
| `color.success-soft` | `#EAF8EF` (dark: `#1C2E22`) | Success Soft：成功浅色填充 |
| `color.info` | `#3D8AF5` (dark: `#4790F5`) | Info：信息填充及浅色填充上的文字 |
| `color.info-soft` | `#ECF4FE` (dark: `#1D2633`) | Info Soft：信息浅色填充 |
| `color.neutral.white` | `#FFFFFF` (dark: `#000000`) | White：主题自适应白色 |
| `color.neutral.black` | `#000000` (dark: `#FFFFFF`) | Black：主题自适应黑色 |
| `color.dots-accent.surface` | `rgba(86,209,191,0.08)` (dark: `rgba(86,209,191,0.12)`) | Dots Accent Surface：标签等浅品牌背景 |
| `color.dots-accent.text` | `#56D1BF` | Dots Accent Text：品牌文字和图标 |
| `color.dots-accent.fill` | `#56D1BF` | Dots Accent Fill：按钮、开关等交互底色 |
| `color.dots-accent.border-subtle` | `rgba(86,209,191,0.1)` | Dots Accent Border Subtle：标签低强调描边 |
| `color.dots-accent.border` | `rgba(86,209,191,0.4)` | Dots Accent Border：按钮中强调描边 |
| `color.dots-accent.icon-muted` | `rgba(52,179,157,0.4)` | Dots Accent Icon Muted：弱化辅助图标 |
| `color.dots-accent.highlight` | `rgba(86,209,191,0.12)` | Dots Accent Highlight：高亮答案底色 |
| `color.mask-bg` | `rgba(0,0,0,0.4)` | Mask Bg：Always Mode 遮罩背景 |
| `color.light.title` | `rgba(255,255,255,0.84)` | Light Title：亮色一级标题 |
| `color.light.paragraph` | `rgba(255,255,255,0.56)` | Light Paragraph：亮色二级标题、段落 |
| `color.light.description` | `rgba(255,255,255,0.36)` | Light Description：亮色描述 |
| `color.light.disabled` | `rgba(255,255,255,0.21)` | Light Disabled：亮色禁用 |
| `color.light.fill-1` | `rgba(255,255,255,0.04)` | Light Fill 1 |
| `color.light.fill-2` | `rgba(255,255,255,0.08)` | Light Fill 2 |
| `color.light.fill-3` | `rgba(255,255,255,0.125)` | Light Fill 3 |
| `color.light.fill-4` | `rgba(255,255,255,0.32)` | Light Fill 4 |
| `color.light.fill-5` | `rgba(255,255,255,0.99)` | Light Fill 5 |
| `color.light.separator` | `rgba(255,255,255,0.07)` | Light Separator |
| `color.light.separator-2` | `rgba(255,255,255,0.16)` | Light Separator 2 |
| `color.dark.title` | `rgba(0,0,0,0.8)` | Dark Title：暗色一级标题 |
| `color.dark.paragraph` | `rgba(0,0,0,0.62)` | Dark Paragraph：暗色二级标题、段落 |
| `color.dark.description` | `rgba(0,0,0,0.45)` | Dark Description：暗色描述 |
| `color.dark.disabled` | `rgba(0,0,0,0.27)` | Dark Disabled：暗色禁用 |
| `color.dark.fill-1` | `rgba(48,48,52,0.05)` | Dark Fill 1 |
| `color.dark.fill-2` | `rgba(48,48,52,0.1)` | Dark Fill 2 |
| `color.dark.fill-3` | `rgba(48,48,52,0.2)` | Dark Fill 3 |
| `color.dark.fill-4` | `rgba(48,48,52,0.5)` | Dark Fill 4 |
| `color.dark.fill-5` | `rgba(48,48,52,0.99)` | Dark Fill 5 |
| `color.dark.separator` | `rgba(0,0,0,0.08)` | Dark Separator |
| `color.dark.separator-2` | `rgba(0,0,0,0.2)` | Dark Separator 2 |
| `color.always.white` | `#FFFFFF` | White：Always Mode 白色 |
| `color.always.black` | `#000000` | Black：Always Mode 黑色 |
| `color.always.media-overlay` | `rgba(36,36,36,0.32)` | 媒体卡底部文字蒙层 |
| `color.always.video-control-overlay` | `rgba(0,0,0,0.20)` | 横版视频底部控件渐变终点 |
| `color.always.video-duration-shadow` | `rgba(0,0,0,0.12)` | 横版视频右上时长局部遮罩 |
| `color.always.ask-dots-action` | `#34B39D` | 问点点搜索引导的立即总结文字 |
| `color.always.ask-dots-island-surface` | `rgba(255,255,255,0.90)` | 问点点搜索引导新版玻璃表面 |
| `color.always.ask-dots-island-border` | `rgba(86,209,191,0.20)` | 问点点搜索引导新版薄荷描边 |
| `color.always.ask-dots-guide-surface` | `#FDFFFE` | 问点点方案 B 引导卡：#83F2DF 2% 叠加白色 |
| `color.legacy.accent-yellow` | `#FFCC00` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.accent-green` | `#34C759` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.accent-pink` | `#FF6482` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.accent-brown` | `#916964` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.accent-event-blue` | `#5B9BDB` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.deco-teal` | `#81D5CA` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.deco-sky` | `#84B1EB` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.deco-lavender` | `#9F8CCF` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.deco-sage` | `#A0C484` | 兼容旧页面，不属于现行颜色规范 |
| `color.legacy.deco-rose` | `#AA7D78` | 兼容旧页面，不属于现行颜色规范 |

## phone

| 令牌 | 值 | 说明 |
|---|---|---|
| `phone.width` | `430px` | iOS 大屏设计稿宽度 |
| `phone.height` | `932px` | iOS 大屏设计稿高度 |
| `phone.radius` | `80px` | 模拟真机外壳超级圆角 |

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

## media-image

| 令牌 | 值 | 说明 |
|---|---|---|
| `media-image.single-portrait-width` | `165px` | AI 回答流单张竖图宽度 |
| `media-image.single-portrait-height` | `220px` | AI 回答流单张竖图高度 |
| `media-image.single-landscape-width` | `219px` | AI 回答流单张横图宽度 |
| `media-image.single-landscape-height` | `164px` | AI 回答流单张横图高度 |
| `media-image.group-gap` | `6px` | AI 回答流多图横向间距 |
| `media-image.group-button-gap` | `12px` | 图组到更多图片入口的间距 |
| `media-image.radius` | `16px` | AI 回答流图片圆角 |
| `media-image.more-height` | `44px` | 更多图片入口固定高度 |
| `media-image.more-radius` | `40px` | 更多图片入口圆角 |
| `media-image.more-avatar` | `14px` | 更多图片入口头像尺寸 |

## media-note

| 令牌 | 值 | 说明 |
|---|---|---|
| `media-note.container-width` | `329px` | AI 回答流笔记卡内容宽度 |
| `media-note.gap` | `6px` | 笔记卡横向间距 |
| `media-note.button-gap` | `12px` | 笔记卡组到更多入口的间距 |
| `media-note.radius` | `16px` | 笔记卡圆角 |
| `media-note.large-width` | `161.5px` | 单张和两张笔记卡宽度 |
| `media-note.large-height` | `215.333px` | 单张和两张笔记卡高度 |
| `media-note.large-padding-top` | `20px` | 大笔记卡内容顶部留白 |
| `media-note.large-padding-x` | `12px` | 大笔记卡内容水平留白 |
| `media-note.large-padding-bottom` | `12px` | 大笔记卡内容底部留白 |
| `media-note.large-content-gap` | `6px` | 大笔记卡标题与作者行间距 |
| `media-note.large-avatar` | `16px` | 大笔记卡作者头像尺寸 |
| `media-note.large-like-icon` | `14px` | 大笔记卡点赞图标尺寸 |
| `media-note.compact-padding-top` | `16px` | 三列笔记卡内容顶部留白 |
| `media-note.compact-padding-x` | `10px` | 三列笔记卡内容水平留白 |
| `media-note.compact-padding-bottom` | `10px` | 三列笔记卡内容底部留白 |
| `media-note.compact-content-gap` | `4px` | 三列笔记卡标题与互动行间距 |
| `media-note.compact-avatar` | `14px` | 三列笔记卡作者头像尺寸；小卡只展示头像，不展示用户名 |
| `media-note.compact-like-icon` | `12px` | 三列笔记卡点赞图标尺寸 |
| `media-note.video-badge` | `20px` | 视频笔记右上角播放标识尺寸 |
| `media-note.more-height` | `44px` | 更多笔记入口固定高度 |
| `media-note.more-radius` | `40px` | 更多笔记入口圆角 |
| `media-note.more-avatar` | `14px` | 更多笔记入口头像尺寸 |

## media-video

| 令牌 | 值 | 说明 |
|---|---|---|
| `media-video.portrait-width` | `240px` | 回答流竖版视频宽度 |
| `media-video.portrait-height` | `320px` | 回答流竖版视频高度 |
| `media-video.portrait-radius` | `22px` | 竖版视频圆角 |
| `media-video.landscape-width` | `329px` | 回答流横版视频宽度 |
| `media-video.landscape-height` | `185.0625px` | 回答流横版视频高度 |
| `media-video.landscape-radius` | `22px` | 横版视频圆角 |
| `media-video.control-padding` | `16px` | 横版视频底部控件内边距 |
| `media-video.control-gap` | `16px` | 作者信息与播放控件间距 |
| `media-video.author-gap` | `6px` | 头像与作者名间距 |
| `media-video.control-size` | `18px` | 头像、声音和播放控件尺寸 |
| `media-video.duration-padding` | `12px` | 时长标签顶部和右侧留白 |
| `media-video.duration-mask-width` | `60px` | 时长标签局部遮罩宽度 |
| `media-video.duration-mask-height` | `40px` | 时长标签局部遮罩高度 |

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
| `duration.morph` | `800ms` | 大幅共享元素形变，容纳轻微越界与回稳 |
| `duration.fast` | `250ms` | 兼容旧变量：状态切换 |
| `duration.normal` | `250ms` | 兼容旧变量：页面切换 |
| `duration.slow` | `350ms` | 兼容旧变量：大幅位移 |

## Motion · Curve

| 令牌 | 值 | 说明 |
|---|---|---|
| `curve.out` | `cubic-bezier(.32,.72,0,1)` | 通用出场/进入 |
| `curve.spring` | `cubic-bezier(.34,1.56,.64,1)` | 弹性效果 |
| `curve.morph-spring` | `linear(0, 0.053 5%, 0.175 10%, 0.3246 15%, 0.4754 20%, 0.6122 25%, 0.7277 30%, 0.8197 35%, 0.8893 40%, 0.9394 45%, 0.9734 50%, 0.9949 55%, 1.012 60%, 1.024 65%, 1.03 70%, 1.028 75%, 1.022 80%, 1.015 85%, 1.009 90%, 1.004 95%, 1)` | 共享元素展开弹簧；约 70% 时越过目标 3%，随后回到精确尺寸 |
| `curve.morph-settle` | `linear(0, 0.035 5%, 0.09 10%, 0.16 15%, 0.24 20%, 0.32 25%, 0.4 30%, 0.48 35%, 0.55 40%, 0.62 45%, 0.68 50%, 0.73 55%, 0.78 60%, 0.82 65%, 0.86 70%, 0.91 75%, 0.98 80%, 1.03 85%, 1.015 90%, 1.004 95%, 1)` | 共享元素收回弹簧；前段保留形变可读性，最后 25% 加速归位，并在约 85% 时越过目标 3% 后回稳 |
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
| `shadow.media-note-text` | `0 0.5px 1px rgba(0,0,0,0.30)` | 笔记卡封面文字阴影 |
| `shadow.community-search-field` | `0 4px 18px rgba(0,0,0,0.06)` | 社区搜索结果页搜索框阴影 |
| `shadow.ask-dots-island` | `0 8px 16px rgba(0,0,0,0.08), 0 3px 80px rgba(102,170,159,0.20)` | 问点点搜索引导新版黑色投影与薄荷柔光 |
| `shadow.ask-dots-guide` | `0 4px 20px rgba(0,0,0,0.08)` | 问点点方案 A 引导卡投影 |
| `shadow.ask-dots-choice-guide` | `0 4px 10px rgba(0,0,0,0.20)` | 问点点方案 B 指向式双行引导卡投影 |
| `shadow.ask-dots-compact-guide` | `0 4px 20px rgba(0,0,0,0.20)` | 问点点方案 C 双行引导卡投影 |

## Font Family

| 令牌 | 值 | 说明 |
|---|---|---|
| `font.family` | `'PingFang SC', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif` | 组件规范唯一字体栈 |

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
| `typography.media-note-meta` | 12px | 400 | 18px | 大笔记卡作者和点赞信息 |
| `typography.media-note-title-compact` | 12px | 500 | 18px | 三列笔记卡标题 |
| `typography.media-note-meta-compact` | 10px | 400 | 14px | 三列笔记卡点赞信息；用户名不展示 |
| `typography.media-video-author` | 12px | 400 | 18px | 横版视频作者名 |
| `typography.media-video-duration` | 11px | 500 | 16px | 横版视频时长标签 |
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

> 自动生成自 `components/*.schema.json`。AI 在生成 Dots 风格 UI 时，组件 props 必须从 values 枚举中选；states 必须全覆盖；constraints 不能违反；harness 规则必须执行。

## Button (`button`)

**Category**: action

触发即时任务的动作单元。Dots Button 继承 ReDs 的六档尺寸、宽度和场景规则，主色映射为 Dots Accent Fill，图底场景使用 ghost。

### Harness
- **Semantic**: 用于触发即时任务的动作单元，负责表达当前界面的行动优先级。
- **Generation Rules**
  - 先判断当前视图是否已经存在 filled 主操作。
  - 根据场景选择 size：表单底部用 large，空态用 medium，卡片内用 small 或 mini。
  - 图片或彩色背景只允许使用 filled 或 ghost。
- **Validation**
  - 同一视图 filled 不超过 1 个。
  - filled 背景为 Dots Accent Fill，文字为固定白色。
  - fullWidth 只出现在主流程、表单底部或固定操作栏。

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
- 不要把小红书红 --xhs-red 用作点点主按钮。
- 不要在图底按钮上展示 disabled 态。
- 不要让 xLarge 或 micro 成为默认尺寸。
- 不要在 button 内嵌 button 或链接。

---

## Card (`card`)

**Category**: container

组合容器。承载相关信息的最小单元，是 patterns 的起点。Dots 风格：hairline 边框、20px / 12px 圆角、不滥用阴影。

### Harness
- **Semantic**: 用于组织相关信息的最小容器，是 pattern 的起点，不承担页面分区装饰。
- **Generation Rules**
  - 先判断内容是否真的需要容器；页面 section 不默认包 Card。
  - interactive=true 时整卡可点击并支持键盘。
  - 普通页面优先 default 或 tinted，elevated 只给弹层使用。
- **Validation**
  - Card 内不得嵌套 Card。
  - 非弹层卡片不得使用阴影。
  - hover 只改变轻微背景，不改变布局尺寸。

### Props
- `variant`: "default" | "tinted" | "elevated" _(default: `"default"`)_
  default 透明 + hairline；tinted 浅灰底 (bg-1) 不带边；elevated 仅用于弹层卡，带 shadow-modal
- `padding`: "compact" | "standard" | "comfortable" _(default: `"standard"`)_
  compact space-3 / standard space-4 / comfortable space-5
- `interactive`: false | true _(default: `false`)_
  是否可点击。true 时 hover 加 Fill 1 背景，cursor=pointer

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

### Harness
- **Semantic**: 用于解释空容器、失败或首次进入状态，并给用户下一步。
- **Generation Rules**
  - 先区分 empty、no-result、no-permission、error、first-time。
  - 除 inline 外必须给至少一个动作按钮。
  - error 必须给重试或查看详情。
- **Validation**
  - 空态不能只有一句“没有数据”。
  - first-time 必须解释价值。
  - fullscreen 空态必须有返回或继续路径。

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

## Input / TextField (`input`)

**Category**: form

点点文本输入字段。按 ReDs TextField 规范沉淀为可复用组件：普通 393x48、拓展 361x48、前后缀组合、聚焦清除、禁用与错误态必须完整覆盖。

### Harness
- **Semantic**: 采集短文本输入的基础控件，显式承载编辑状态、前后缀上下文、错误反馈和可清除动作。
- **Generation Rules**
  - 从 variant 选择 field 或 extension，不要混用两套尺寸和圆角。
  - prefix=true 时必须选择 prefixType；suffix=true 时必须选择 suffixType。
  - focused 且 value 非空时生成 clear-action，清除后继续保持 focused。
  - limit 后缀必须实时读取 value.length，不允许写死 0/24。
  - disabled 态必须同时禁用输入、清除和后缀 action。
- **Validation**
  - default、focused、filled、disabled、error 五态都有可见输出。
  - field error 为 78px 并显示错误提示；extension error 为 48px 并保留单行结构。
  - prefix/suffix 与输入文字间距稳定，状态切换不抖动。
  - 文档页 demo 可以真实输入，并能实时反映字数和清除状态。

### Props
- `variant`: "field" | "extension" _(default: `"field"`)_
  field 为普通文本字段，393x48；extension 为拓展文本字段，361x48、12px 圆角、弱填充背景。
- `prefix`: false | true _(default: `false`)_
  是否显示前缀槽。前缀槽固定在输入文字左侧，不参与文本滚动。
- `prefixType`: "text" | "icon" | "dropdown" _(default: `"text"`)_
  前缀内容类型：纯文字、24px 图标、文字加下拉箭头。仅 prefix=true 时生效。
- `suffix`: false | true _(default: `false`)_
  是否显示后缀槽。后缀槽固定在输入文字右侧，和聚焦清除按钮保持 12px 间距。
- `suffixType`: "text" | "limit" | "link" | "icon" | "image" _(default: `"text"`)_
  后缀内容类型：纯文字、字数计数、文字按钮、24px 图标、48x24 图片。仅 suffix=true 时生效。
- `maxLength`: 24 | 48 _(default: `24`)_
  字数计数时使用的最大长度。Figma 默认展示 0/24。

### States
`default`, `focused`, `filled`, `disabled`, `error`

### Constraints
- **field_error_reserves_message_row**: field 的 error 态总高为 78px，48px 输入行下方必须显示 12px Caption 错误提示。
- **extension_error_stays_single_row**: extension 的 error 态仍保持 48px 高度，用错误底色表达，不在容器内额外占提示行。
- **prefix_suffix_spacing_fixed**: 前缀、输入文字、清除按钮、后缀之间的水平间距固定为 12px；dropdown 内文字和箭头为 4px。
- **focused_clear_action**: focused 且有输入内容时必须提供清除入口；清除后焦点仍留在输入框。
- **disabled_blocks_editing**: disabled 态不可输入、不可清除、不可触发后缀 action。
- **native_input_required**: demo 和生产实现必须使用真实 input/textarea，不能只用 div 模拟文字。

### Anatomy
- **container**: 输入字段容器；field 不强调外轮廓，extension 使用弱填充和 12px 圆角。
- **prefix**: 可选前缀槽，支持 text / icon / dropdown 三种结构。
- **native-input**: 真实可输入区域，负责 value、placeholder、focus、disabled。
- **clear-action**: 聚焦且有内容时出现的清除按钮。
- **suffix**: 可选后缀槽，支持 text / limit / link / icon / image 五种结构。
- **error-message**: field error 专属提示行；extension error 不额外占行。

### Do
- 输入态必须用真实 input/textarea，支持键盘输入、清除和 disabled。
- field 和 extension 分开实现，不能只靠圆角/背景临时覆盖。
- prefix/suffix 是插槽，不要把它们拼进输入值。
- error 态必须有明确反馈；field 显示提示行，extension 使用错误底色。

### Don't
- 不要复用旧 search/password 输入框逻辑覆盖 TextField 规范。
- 不要用 placeholder 当 label；需要 label 时在容器外单独提供。
- 不要把 --xhs-red 小红书红用于光标、后缀按钮或聚焦反馈。
- 不要在 focused 态改变容器尺寸，清除按钮出现不应造成布局跳动。
- 不要把 ReDs 临时色直接提升为全局 token；需要沉淀时先补 token 文档。

---

## LiveWaveform (`live-waveform`)

**Category**: voice

实时语音波形组件。用于表达点点正在待机、监听或处理语音输入，是语音入口、AI 对话页和生成等待态的可复用状态 harness。

### Harness
- **Semantic**: 表达声音输入或语音处理的实时强度。可以消费上游 audio level，也可以在用户显式触发后调用浏览器麦克风并实时渲染输入强度；不保存音频。
- **Generation Rules**
  - 先判断业务状态：idle 只做低幅呼吸；listening 使用实时滚动；processing 使用规则脉冲。
  - 如果 source=microphone，必须由按钮点击触发权限请求，页面加载时不得自动调用 getUserMedia。
  - 语音入口优先使用 size=compact；沉浸式录音面板可使用 regular 或 large。
  - 必须使用 tone 命中当前背景：浅底品牌色用 brand，深底或图片底用 inverse。
- **Validation**
  - source=microphone 时必须真实读取麦克风输入，不能只用模拟动画。
  - 麦克风权限必须由用户显式点击触发，不能自动弹权限。
  - 停止监听或切换到非 listening 状态时必须释放 MediaStreamTrack 和 AudioContext。
  - 波形颜色必须来自 Dots token，不允许硬编码 hex/rgba。
  - prefers-reduced-motion=true 时必须退化成静态波形。
  - idle/listening/processing 三态必须可被外部 props 控制。

### Props
- `state`: "idle" | "listening" | "processing" _(default: `"idle"`)_
  波形语义状态。idle 是可输入但未采集；listening 表示正在接收语音；processing 表示已提交并等待 AI 解析。
- `source`: "microphone" | "levels" | "demo" _(default: `"levels"`)_
  音频来源。microphone 表示组件通过用户点击启动麦克风；levels 表示消费上游音量数组；demo 表示文档或占位演示。
- `mode`: "scrolling" | "static" _(default: `"scrolling"`)_
  波形更新方式。scrolling 用于实时输入；static 用于列表、卡片或 reduce motion 场景。
- `size`: "compact" | "regular" | "large" _(default: `"regular"`)_
  波形高度。compact 用于输入栏和按钮；regular 用于面板；large 用于独立语音页。
- `density`: "compact" | "comfortable" | "dense" _(default: `"comfortable"`)_
  柱数量密度。compact 信息少但清爽；dense 更像实时声谱，适合宽容器。
- `tone`: "brand" | "ink" | "inverse" _(default: `"brand"`)_
  颜色语义。brand 使用点点主色；ink 用文本色；inverse 用于深色、图片和彩色背景。

### States
`idle`, `requesting`, `listening`, `processing`, `stopped`, `denied`, `muted`, `error`

### Constraints
- **microphone_requires_user_gesture**: source=microphone 时，getUserMedia 必须由用户点击触发。
- **microphone_stream_released_on_stop**: 停止监听或退出 listening 时，必须停止所有 MediaStreamTrack 并关闭 AudioContext。
- **microphone_fallback_state**: 权限被拒绝或设备不可用时，必须显示 denied/error/unsupported 状态。
- **motion_respects_user_setting**: 用户开启减少动态效果时，scrolling 必须退化为 static。
- **min_visible_height**: 可交互语音入口的波形高度不低于 48px，避免被误认为普通装饰线。
- **state_is_controlled**: 状态由上层业务传入，不能靠组件内部猜测录音生命周期。

### Anatomy
- **surface**: 承载波形的视觉容器，可独立放入输入栏、面板或卡片。
- **waveform-canvas**: 实际波形绘制区域，只负责渲染，不负责音频采集。
- **bars**: 竖向圆角柱。高度由 audio level 或模拟 level 控制。
- **status**: 可选状态标签，用于文档、调试或无障碍说明，也承载 microphoneStatus。

### Do
- 语音输入中使用 state=listening + mode=scrolling。
- 需要真实监听时使用 source=microphone，并提供开始/停止入口。
- AI 正在解析语音时使用 state=processing。
- 在输入栏中使用 compact，保持和操作按钮同层级。
- 如果业务已有音频采集链路，把真实音量数据通过 source=levels 传入。

### Don't
- 不要在页面加载时自动请求麦克风权限。
- 不要用模拟动画冒充 source=microphone。
- 不要在停止后继续占用麦克风。
- 不要用随机颜色或渐变替代 token。
- 不要把 idle 做成高频动效。
- 不要在 reduce motion 场景继续滚动动画。

---

## MediaImage (`media-image`)

**Category**: conversation-media

插入 AI response 正文内容流的图片媒体组件。支持单张横竖图、多图三列和超过三张时的更多图片入口。

### Harness
- **Semantic**: 用图片补充相邻文字内容，不承担来源卡、笔记卡或视频播放语义。
- **Generation Rules**
  - 先读取图片总数；单图再读取媒体方向，多图统一裁切为 3:4。
  - 两张图仍使用三图单张尺寸，不拉伸填满空余列。
  - 超过三张只展示前三张，并在图组下方展示更多图片入口。
- **Validation**
  - 单张横图 219×164px，单张竖图 165×220px。
  - 多图间距 6px、圆角 16px，三列撑满 329px 内容宽度。
  - 超过三张时入口文案展示图片总数。
  - 图片块前后存在文字承接。

### Props
- `count`: 1 | 2 | 3 | 4 _(default: `1`)_
  图片数量。4 代表大于三张的 overflow 场景。
- `singleOrientation`: "portrait" | "landscape" _(default: `"landscape"`)_
  仅单图使用，由媒体元数据提供。
- `moreAction`: true | false _(default: `true`)_
  超过三张时是否提供打开完整图片浏览器的动作。

### States
`single-portrait`, `single-landscape`, `group-two`, `group-three`, `group-overflow`

### Constraints
- **maximum_visible_images**: 内容流最多展示前三张图片。
- **group_uses_three_column_size**: 两张和三张使用相同单张尺寸。
- **group_crop_ratio**: 多图统一以 3:4 裁切。
- **overflow_uses_more_button**: 超过三张时图组下方必须出现更多图片入口。

### Anatomy
- **image-grid**: 承载最多三张图片的横向网格。
- **image**: 单图保留方向尺寸，多图统一 3:4 裁切。
- **more-button**: 超过三张时展示总数并打开完整图片浏览器。

### Do
- 图片前后使用文字说明内容关系。
- 多图按输入顺序展示前三张。
- 为内容图片提供真实 alt。

### Don't
- 不要在两张图时拉宽单张图片。
- 不要用第三张上的 +N 遮罩替代更多图片入口。
- 不要连续堆叠多个媒体块。

---

## MediaNote (`media-note`)

**Category**: conversation-media

插入 AI response 正文内容流的笔记媒体组件。

### Harness
- **Semantic**: 用社区笔记补充相邻回答，并保留标题、作者和互动量。
- **Generation Rules**
  - 单篇和两篇使用相同的大卡尺寸，三篇及以上切换为三列紧凑卡。
  - 最多展示前三篇，超过三篇时在卡组下展示更多笔记入口。
  - 视频笔记在右上角展示播放标识。
- **Validation**
  - 所有卡片比例 3:4、圆角 16px、间距 6px。
  - 单篇宽 161.5px；两篇每张尺寸与单篇一致；三篇横向撑满 329px。
  - 封面、算色渐变、线性模糊、标题、作者头像、作者名和点赞量完整，文字、头像和点赞图标使用一致的投影。
  - 检查渐变两端 RGB 均为算色结果，顶部 alpha 为 0、底部 alpha 为 1。

### Props
- `count`: 1 | 2 | 3 | 4 _(default: `1`)_
  笔记数量，4 表示 overflow。
- `mediaType`: "image" | "video" _(default: `"image"`)_
  视频类型展示播放标识。
- `moreAction`: true | false _(default: `true`)_
  超过三篇时打开完整笔记列表。

### States
`single`, `group-two`, `group-three`, `group-overflow`

### Constraints
- **maximum_visible_notes**: 内容流最多展示前三篇笔记。
- **ratio**: 所有笔记卡固定为 3:4。
- **single_matches_two**: 单篇和两篇使用相同单卡尺寸。
- **overflow_uses_more_button**: 超过三篇必须展示更多入口。
- **color_sample_region**: 截取封面底部 25% 区域参与算色，不使用整张图片。
- **color_sampling**: 采用 Color Thief RGB MMCQ 逻辑，每 10 个像素采样一次；忽略 alpha 小于 125 的透明像素，以及 RGB 三通道均大于 250 的近白像素。
- **dominant_color**: 将采样像素压缩为 5-bit RGB，通过 MMCQ 中位切分量化颜色，并按像素数量选择占比最高的主色。
- **brightness_adjustment**: 主色由 RGB 转为 HSB，保持 H、S 不变：B≥80 时 B-40；20≤B<80 时 B-20；B<20 时 B=0，完成后转回 RGB。
- **color_gradient**: 内容区使用 0%-100% 线性渐变；两端 RGB 均取降调后的算色结果，顶部 alpha=0，底部 alpha=1。
- **progressive_blur**: 背景最大模糊为 20px，并使用同方向线性遮罩渐进出现，在内容区 78% 位置达到完整模糊强度。
- **color_fallback**: Canvas 跨域、无像素或算色失败时回退 Always Media Overlay，不能影响文字可读性。

### Anatomy
- **cover**: 3:4 裁切的笔记封面。
- **content**: 底部算色渐变和 20px 渐进模糊上的标题、作者和点赞信息。
- **more-button**: 超过三篇时展示总数。

### Do
- 保留笔记标题、作者与互动量。
- 按输入顺序展示前三篇。
- 点击卡片时保持原尺寸。

### Don't
- 不要把单篇卡拉满内容宽度。
- 不要在三列模式继续使用大卡字号。
- 不要给笔记卡添加按下缩小效果。

---

## MediaVideo (`media-video`)

**Category**: conversation-media

插入 AI response 正文内容流的视频组件，支持竖版和横版完整控件。

### Harness
- **Semantic**: 用视频补充相邻回答；点击后进入播放器。
- **Generation Rules**
  - 根据媒体方向选择 portrait 或 landscape。
  - 竖版严格使用 3:4；横版严格使用 16:9。
  - 两种方向均展示作者、声音、播放和时长，并允许声音与播放状态独立切换。
  - 视频默认暂停，点击播放按钮后才开始播放。
- **Validation**
  - 竖版 240×320px、圆角 22px。
  - 横版 329×185.0625px、圆角 22px。
  - 横版底部控件和右上时长的位置、字号与导出图标一致。

### Props
- `orientation`: "portrait" | "landscape" _(default: `"landscape"`)_
  由视频元数据提供。
- `duration`: "01:46" | "" _(default: `"01:46"`)_
  横版视频时长。
- `author`: "王悦伊" | "" _(default: `"王悦伊"`)_
  横版视频作者名。

### States
`portrait`, `landscape`

### Constraints
- **portrait_ratio**: 竖版视频固定为 3:4。
- **landscape_ratio**: 横版视频固定为 16:9。
- **both_orientations_have_controls**: 两种方向均展示设计稿中的完整覆盖控件。
- **controls_toggle_independently**: 声音和播放按钮独立切换。
- **default_paused**: 默认不自动播放。

### Anatomy
- **poster**: 按方向裁切的视频封面。
- **controls**: 两种方向展示的底部控件。
- **duration**: 右上角时长。

### Do
- 方向由视频元数据明确传入。
- 使用 Figma 导出的原始控件图标。

### Don't
- 不要把竖版拉满回答宽度。
- 不要让声音按钮触发播放切换。

---

## MessageBubble (`message-bubble`)

**Category**: conversation

点点对话流的消息体 harness。承载用户消息、Dots 文本回复、AI 富文本卡片、引用卡和图片内容，是页面 demo 不允许私自复制的核心规范。

### Harness
- **Semantic**: 表达一次对话中的消息单位，负责角色、内容类型、左右对齐、消息间距和消息进入流的位置。
- **Generation Rules**
  - 先选择 role=user 或 dots，再选择 contentType。
  - text 使用文字气泡；ai-card 使用富文本卡片，不嵌套在文字气泡里。
  - 连续消息根据 role 调整间距，换侧消息拉开距离。
- **Validation**
  - 用户消息右对齐，Dots 消息左对齐。
  - 用户气泡使用 Fill 5，AI 文本气泡使用 Bg，AI 卡片使用 Fill 5。
  - 气泡尖角颜色必须与气泡背景一致。
  - 发送新消息后键盘收起，消息流滚动到最新。

### Props
- `role`: "user" | "dots" _(default: `"dots"`)_
  消息角色。user 右对齐；dots 左对齐。
- `contentType`: "text" | "ai-card" | "quote" | "image" | "link" _(default: `"text"`)_
  消息内容类型。ai-card 属于消息体，不包进普通文字气泡。
- `tail`: "none" | "left" | "right" _(default: `"none"`)_
  气泡尖角。user 通常 right，dots text 通常 left；连续消息可 none。
- `sequence`: "single" | "first" | "middle" | "last" _(default: `"single"`)_
  同一角色连续消息的位置，用于控制间距和尖角。

### States
`default`, `pressed`, `streaming`, `failed`

### Constraints
- **role_controls_alignment**: role=user 必须右对齐；role=dots 必须左对齐。
- **ai_card_not_nested_in_text_bubble**: contentType=ai-card 时直接渲染 AI 富文本卡片，不再包文字气泡。
- **tail_matches_background**: 气泡尖角必须与对应气泡背景同色。
- **message_spacing_by_sequence**: 连续消息和换侧消息使用不同间距，不能当普通列表处理。

### Anatomy
- **message-row**: 负责左右对齐和消息流间距。
- **text-bubble**: 仅用于 contentType=text 的文字气泡。
- **bubble-tail**: 24×24px 尖角，颜色跟随气泡背景。
- **ai-card**: AI 生成卡片，作为消息体直接进入流。

### Do
- 页面 demo 直接引用 MessageBubble harness，不复制私有气泡样式。
- AI 生成卡片和文本回复都放入同一消息流。
- 发送后收起键盘并滚动到最新消息。

### Don't
- 不要把 AI 卡片包进普通文字气泡。
- 不要让用户消息出现在左侧。
- 不要让尖角颜色和气泡背景不一致。
- 不要把消息间距当普通列表 gap。

---

## ProcessIndicator (`process-indicator`)

**Category**: conversation

AI 回答过程状态组件。用封闭语义映射阅读、洞察、思考、文档、检查、搜索、工具调用、亮点和完成状态，避免页面直接依赖 Lottie 资源。

### Harness
- **Semantic**: 表达 AI 当前处于思考、工具调用、搜索或完成阶段，只负责状态呈现，不负责推进回答流程。
- **Generation Rules**
  - 先根据业务阶段选择 kind，不允许按动画外观随意选择。
  - 根据阅读、洞察、思考、文档、检查、搜索、工具调用和亮点语义选择 kind。
  - 只有当前最新过程播放动画；历史过程停在第一帧或进入 complete。
- **Validation**
  - kind 必须命中 schema 中的封闭枚举。
  - 页面不得直接引用 Lottie JSON 文件。
  - prefers-reduced-motion=true 时 Lottie 必须停在第一帧。
  - 完成态必须使用设计资源，不能用 CSS 手画对勾。

### Props
- `kind`: "reading" | "insight" | "thinking" | "document" | "review" | "search" | "tool-call" | "highlight" | "complete" _(default: `"thinking"`)_
  过程语义。组件内部把语义映射到固定 Lottie 或完成对勾资源。
- `playing`: true | false _(default: `true`)_
  是否播放当前 Lottie。false 时停在第一帧；complete 不受该属性影响。
- `loop`: true | false _(default: `true`)_
  是否循环播放。持续过程使用 true，一次性演示可使用 false。

### States
`playing`, `paused`, `complete`, `reduced-motion`

### Constraints
- **semantic_asset_mapping_is_closed**: 业务只能选择 kind，不能把 Lottie URL 作为 prop 传入。
- **default_slot_size**: 默认状态位为 36×36px；紧凑列表由父级缩放到 32px 或 24px。
- **motion_respects_user_setting**: 减少动态效果开启时，动画必须停在第一帧。
- **process_state_is_controlled**: kind 和 playing 由上层状态机传入，组件内部不能自行推进回答流程。

### Anatomy
- **slot**: 稳定占位，避免状态切换时文字和连接线跳动。
- **motion**: thinking、tool-call 和 search 对应的 Lottie 渲染层。
- **complete-icon**: 完成态设计资源，与 Lottie 在同一位置原地切换。

### Do
- 根据回答状态机选择 kind。
- 只让当前最新过程播放。
- 独立使用且没有可见文案时提供 label。

### Don't
- 不要在页面里直接 import Lottie JSON。
- 不要把动画当装饰随机使用。
- 不要让组件内部猜测回答流程。
- 不要忽略减少动态效果设置。

---

## Sheet (`sheet`)

**Category**: overlay

弹层 / 抽屉的语义统一。很多团队把 Sheet / Drawer / Modal / Action Sheet 混着用，Dots 强制语义区分：Sheet 是从屏幕边缘滑入的临时上下文，Modal 是中央对齐的强制选择。

### Harness
- **Semantic**: 用于从屏幕边缘引入临时上下文，承载可退出的辅助任务。
- **Generation Rules**
  - 先判断任务是否可被轻易关闭；不可逆确认必须用 Modal。
  - side=bottom 且 dragToDismiss=true 时显示 drag handle。
  - 内容超过 90vh 时主体滚动，footer 保持固定。
- **Validation**
  - 同一时间只有一个 Sheet。
  - Sheet 上不得再叠 Sheet。
  - full 尺寸仍需保留状态栏或退出入口。

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
