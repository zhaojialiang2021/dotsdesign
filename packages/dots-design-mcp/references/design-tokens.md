# Dots 设计令牌

> 真相源：`references/design-system.md` 与 `tokens/*.json`。
> 所有页面、组件、demo 必须引用 token 名，不允许硬编码颜色、圆角、间距或动效数值。

---

## 设备画布

| Token | 值 | 用途 |
|------|------|------|
| `phone.width` | `430px` | iOS 大屏设计稿宽度 |
| `phone.height` | `932px` | iOS 大屏设计稿高度 |
| `phone.radius` | `80px` | 模拟真机外壳超级圆角 |
| `safe.top` | `59px` | 状态栏/安全区顶部 |
| `safe.bottom` | `34px` | 底部安全区 |
| `safe.nav` | `65px` | 导航栏高度 |

小屏 `max-width: 460px` 时切全屏，去掉外壳圆角和阴影；整体缩放通过 `--phone-scale` 控制。

---

## 颜色

> 人类可读真相源：`references/color-tokens.md`。执行真相源：`tokens/color.json`。

### Adaptive colors

| Type | Token / CSS variable | Light | Dark | 用途 |
|------|------|------|------|------|
| Backgrounds | `Bg` / `--bg-base` | `#FFFFFF` | `#29292E` | 基准层：主背景色 |
| Backgrounds | `Bg 0` / `--bg-0` | `#F5F5F5` | `#19191E` | 最底层：卡片容器后层背景 |
| Backgrounds | `Bg 0 Lighter` / `--bg-0-lighter` | `#FAFAFA` | `#141418` | 最底层浅色背景 |
| Backgrounds | `Bg 1` / `--bg-1` | `#F5F5F5` | `#222226` | 基准层上模块背景 |
| Backgrounds | `Bg 2` / `--bg-2` | `#FFFFFF` | `#29292E` | Alert 等弹出层背景 |
| Labels | `Title` / `--title` | `#000000 80%` | `#FFFFFF 84%` | 一级标题 |
| Labels | `Paragraph` / `--paragraph` | `#000000 62%` | `#FFFFFF 56%` | 二级标题、段落 |
| Labels | `Description` / `--description` | `#000000 45%` | `#FFFFFF 36%` | 描述、未选中文字 |
| Labels | `Disabled` / `--disabled` | `#000000 27%` | `#FFFFFF 21%` | 禁用色 |
| Labels | `Placeholder` / `--placeholder` | `#000000 27%` | `#FFFFFF 21%` | 占位文本 |
| Labels | `Link` / `--link` | `#133667` | `#C6D9EF` | 段落和话题链接 |
| Labels | `Link Accent` / `--link-accent` | `#3D8AF5` | `#C6D9EF` | 强调链接 |
| Fills | `Fill 1-5` / `--fill-1` … `--fill-5` | `#303034 5% / 10% / 20% / 50% / 99%` | `#FFFFFF 4% / 8% / 12.5% / 32% / 99%` | 从次级控件到强标签、气泡、轻提示 |
| Fills | `Inverted Fill 1-5` / `--inverted-fill-1` … `--inverted-fill-5` | `#FFFFFF 4% / 8% / 12.5% / 32% / 99%` | `#303034 5% / 10% / 20% / 50% / 99%` | 反色填充阶梯 |
| Separators | `Separator` / `--separator-base` | `#000000 8%` | `#000000 20%` | 分割线、描边 |
| Separators | `Separator 2` / `--separator-2` | `#000000 20%` | `#FFFFFF 16%` | 较深色二级描边 |
| Separators | `Opaque Separator` / `--separator-opaque` | `#EAEAEA` | `#222226` | 多条线重叠时使用 |

### Brand and semantic colors

| Type | Token / CSS variable | Light | Dark | 用途 |
|------|------|------|------|------|
| XHS brand | `XHS Red` / `--xhs-red` | `#FF2442` | `#FF2E4D` | 小红书品牌强调色 |
| XHS brand | `XHS Red Soft` / `--xhs-red-soft` | `#FFEDF0` | `#301C1F` | 小红书品牌弱强调背景 |
| Semantic | `Warning` / `--warning` | `#FF7D03` | `#FF9E3D` | 警告填充及文字 |
| Semantic | `Warning Soft` / `--warning-soft` | `#FFF2E6` | `#30271F` | 警告浅色填充 |
| Semantic | `Success` / `--success` | `#02B940` | `#36E271` | 成功填充及文字 |
| Semantic | `Success Soft` / `--success-soft` | `#EAF8EF` | `#1C2E22` | 成功浅色填充 |
| Semantic | `Info` / `--info` | `#3D8AF5` | `#4790F5` | 信息填充及文字 |
| Semantic | `Info Soft` / `--info-soft` | `#ECF4FE` | `#1D2633` | 信息浅色填充 |
| Dots brand | `Dots Accent Surface` / `--dots-accent-surface` | `#56D1BF 8%` | `#56D1BF 12%` | 标签等浅品牌背景 |
| Dots brand | `Dots Accent Text` / `--dots-accent-text` | `#56D1BF` | `#56D1BF` | 品牌文字和图标 |
| Dots brand | `Dots Accent Fill` / `--dots-accent-fill` | `#56D1BF` | `#56D1BF` | 按钮、开关等交互底色 |

### Always Mode

固定颜色包括：

- Dots brand：`--dots-accent-border-subtle`、`--dots-accent-border`、`--dots-accent-icon-muted`、`--dots-accent-highlight`
- 遮罩：`--mask-bg`
- 文本：`--light-title/paragraph/description/disabled` 与 `--dark-title/paragraph/description/disabled`
- 填充：`--light-fill-1` 到 `--light-fill-5` 与 `--dark-fill-1` 到 `--dark-fill-5`
- 描边：`--light-separator`、`--light-separator-2`、`--dark-separator`、`--dark-separator-2`
- 中性色：`--always-white`、`--always-black`

兼容旧页面的变量只在生成 CSS 中保留别名，不再用于新规范和新代码。禁止自行定义颜色；不要把 `XHS Red` 用于点点对话、系统组件或文档站。

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

Typography 规范页使用扁平 Token 列表，不包卡片背景、外边框或圆角；各字阶直接展示在 `Bg` 页面内容区域上，仅用行间距和分隔线组织信息。

### Docs 展示字阶

Docs 字阶只用于文档站的信息层级，不进入组件规范和 Dots App UI。

| 层级 | 字号 | 行高 | 字重 | 用途 |
|------|------|------|------|------|
| Docs H1 | `36px` | `1.15` | `700` | 介绍、索引、Foundation、组件、Pattern、页面详情 |
| Docs Section H2 | `24px` | `1.25` | `600` | 页面一级章节 |
| Docs Module Title | `17px` | `1.4` | `600` | 卡片、步骤、列表模块标题 |
| Docs Body | `15-16px` | `1.65` | `400` | 规范正文和解释 |
| Docs Compact | `14px` | `1.65` | `400` | 紧凑模块描述、目录辅助信息 |

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

Spacing 规范页只展示页面内元素通用的 10 级 `space` 封闭枚举。`phone.*`、`safe.*` 属于设备画布，尺寸和圆角不进入 Spacing 页；对话流与富文本语义间距保留在对应专项规范中。

### 通用间距

| Token | 值 | 用途 |
|------|------|------|
| `space.1` / `--space-1` | `4px` | 微调 |
| `space.2` / `--space-2` | `8px` | 紧凑间距 |
| `space.3` / `--space-3` | `12px` | 小元素内边距 |
| `space.4` / `--space-4` | `16px` | 常规间距 |
| `space.5` / `--space-5` | `20px` | 关联区块间距 |
| `space.6` / `--space-6` | `24px` | 常规页面内边距 |
| `space.7` / `--space-7` | `32px` | 模块间距 |
| `space.8` / `--space-8` | `40px` | 大区块间距 |
| `space.9` / `--space-9` | `48px` | 区域留白 |
| `space.10` / `--space-10` | `64px` | 大段留白 |

### Docs 布局节奏

| 场景 | 值 | 用途 |
|------|------|------|
| 桌面内容区左右留白 | `64px` | Docs 主内容与视口边界 |
| 移动端内容区左右留白 | `24px` | 窄屏 Docs 主内容 |
| 正文阅读列最大宽度 | `760px` | 标题说明、规范正文 |
| 桌面页头顶部内边距 | `32px` | 与介绍页 Hero 起始位置对齐 |
| 标题到副标题 | `12px` | 同一标题模块内部 |
| 副标题到首个内容 | `32px` | 标题模块与内容 |
| 普通章节间距 | `64px` | 相邻章节 |
| 强分段章节间距 | `80px` | 信息结构发生明显切换 |
| 分组表面内边距 | `32px` | 流程、步骤、成组入口 |

这些值描述文档站布局，不新增可供 App 组件调用的通用 spacing token。实现时优先映射到现有 `--space-*`，不得反向污染组件间距规范。

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

Radius 规范页直接在 `Bg` 页面内容区域展示形状样例，不包外层卡片背景、边框或圆角。

| Token | 值 | 用途 |
|------|------|------|
| `radius.bubble` / `--radius-bubble` | `22px` | 气泡 |
| `radius.ai-card` / `--radius-ai-card` | `36px` | AI 富文本卡片 |
| `radius.inner-card` / `--radius-inner-card` | `14px` | 卡片内元素 |
| `radius.tag` / `--radius-tag` | `20px` | 标签 |
| `radius.input` / `--radius-input` | `16px` | 输入框 |
| `radius.option` / `--radius-option` | `12px` | 选项标签 |
| `radius.cta` / `--radius-cta` | `24px` | CTA 按钮 |
| `radius.workflow-card` / `--radius-workflow-card` | `24px` | 文档站卡片与工作流组合卡片 |
| `radius.input-container` | `28px 28px 0 0` | 输入栏容器 |
| `radius.sheet` | `20px 20px 0 0` | 底部弹窗 |
| `radius.community-card` | `8px` | 社区笔记卡片 |
| `radius.avatar` | `50%` | 头像 |

---

## 动效

Motion 规范页直接在 `Bg` 页面内容区域展示，不包外层卡片。Duration 使用大位移轨道感知速度，Curve 同时播放 Linear 基准与 Token 曲线，Press 使用真实按钮尺寸展示缩放和透明度反馈。

交互展示参考 [Motion](https://github.com/motiondivision/motion) 的大位移 / spring 示例与 [bezier-easing](https://github.com/gre/bezier-easing) 的曲线对比思路；两者均为 MIT License。本项目使用原生 CSS Animation 实现，不新增运行时依赖。

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
