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
| `media-note.compact-content-gap` | `4px` | 三列笔记卡标题与作者行间距 |
| `media-note.compact-avatar` | `14px` | 三列笔记卡作者头像尺寸 |
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
| `typography.media-note-meta-compact` | 10px | 400 | 14px | 三列笔记卡作者和点赞信息 |
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
