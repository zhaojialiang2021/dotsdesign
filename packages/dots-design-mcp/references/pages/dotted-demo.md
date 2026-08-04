---
name: 点点demo
status: draft
last_updated: 2026-08-04
used_by: [docs-pages, reports]
---

# 点点demo

点点demo 是 Dots 独立设计系统的页面样本，用来验证「Figma 规范 → 规格文档 → 页面 demo → GitHub → Vercel 预览」这条流程能否跑通。

本页只定义点点对话页基座和项目 demo 的页面组织方式。回答 loading、长思考、快速回答、tool call 来源展示、思考半层和来源半层的通用规则，统一见 [`answer-loading.md`](../frameworks/answer-loading.md)。

## 页面结构

1. iOS 状态栏：时间 9:41，右侧信号、Wi-Fi、电池。
2. 顶部导航：左侧返回，头像 + 标题「点点」，右侧更多。
3. 对话区：真实消息流容器，复用 `DotsMessageBubble`；项目 demo 不展示默认问候气泡。
4. 底部输入区：渐隐底座 + 48px 输入框。
5. 输入框内容：左侧语音图标，占位文案「发消息或按住说话...」，右侧相机和添加。
6. 底部标注：`内容由AI生成` + iOS home indicator。

## 页面规格

- 画板为 393×852px。
- 手机外壳圆角使用 `phone.radius`（80px），使用连续圆角 / squircle 裁切。
- 外壳使用 8px 纯白外描边，不占用内部画布尺寸。
- 顶部基座高 110px：状态栏 54px，导航栏 56px。
- 导航栏左右 padding 16px；返回、更多图标 24×24px；头像 24×24px，圆角 8px；标题 16px / 24px / Medium。
- 对话区从 y=110px 开始延伸到底部，左右 padding 16px，隐藏滚动条并保留触控惯性滚动。
- 对话区底部通过 128px 内边距给输入区和渐隐遮罩预留空间；内容允许进入底部渐隐区域，但不能被输入框遮挡。

## Demo 基座规则

页面级或 Pattern 级 demo 必须基于真实页面模板生成，不允许脱离页面模板另造展示基座。

Figma「7月方案」节点 `2060:30262` 是点点对话页唯一基础底座。底座由 `DottedConversationShell` 提供，固定负责 393×852 Light-only 画布、顶部系统栏与导航、可滚动消息区、至底入口、底部输入区和安全区；`DottedDemoScreen` 只负责回答流程与功能模块组合。

对话页能力必须复用：

- `DottedConversationShell`
- `DottedDemoScreen`（需要回答流程时）
- iOS 状态栏
- 点点导航栏
- 真实消息流
- `DotsMessageBubble`
- 底部输入区

底座开放四类叠加位置：

- `dialog`：用户消息、AI 回答、媒体组件和过程状态。
- `floatingActions`：至底、快速回答等不占据消息流布局的动作。
- `composer`：语音、键盘、Skill 选中等输入状态。
- `overlay`：思考半层、来源半层和后续模态功能层。

后续 demo 只能向这些位置注入功能，不得复制或替换状态栏、导航、滚动容器、安全区和默认输入底座。基础底座样式变化必须由所有页面、Pattern 和 Report demo 共同继承。

汇报说明、进度控制器、切换开关和设计备注只能放在手机画板外侧，不能在手机画板内重建一套展示框架。

## 项目 Demo

`conversation-streaming`、`long-thinking` 和 `ask-dots-island-demo` 属于「项目demo」一级类目。点击顶部导航「项目demo」后进入沉浸式项目 demo 页面，不使用 docs 普通顶部导航、侧栏或页面框架。

项目 demo 底座以 Figma「7月方案」节点 `1944:83302` 为准：

- 所有项目 Demo 必须通过共享 `ReportDemoCanvas` 渲染。该底座统一提供项目菜单、分享/关闭、背景拖动、50%–150% 缩放和刷新复位；页面实现只能注入画板内容及可选的方案控制，不得私有复制拖动或缩放状态。
- 视口外层保留 20px `--bg-base` 边框，作为独立顶层遮罩覆盖平移内容；手机画板和控制区只能在边框内可见，拖动时不得越过或遮盖边框。内部演示画布使用 `--bg-0-lighter` 和 24px 低对比度点阵。
- 外层画布、工具栏、菜单、Toast、方案面板和顶层边框跟随站点当前主题；沉浸式路由即使绕过普通 `DocsLayout`，也必须读取 `dots-docs-theme` 并把解析后的主题写到文档根节点。手机画板与手机内页面固定为 Light-only 主题岛，不继承站点深色令牌。
- 页面、画布、手机内容和内部控件的所有可滚动区域始终隐藏滚动条，同时保留鼠标滚轮、触控板、触控惯性和键盘滚动能力。
- 画布左上角内缩 16px 放置 44px × 44px 项目切换按钮，圆角 12px，只显示 Figma `menu_b` 图标，不显示当前项目名称。
- 点击项目切换按钮后，按 Figma 节点 `1944:84413` 在入口下方 8px 展开项目菜单：菜单宽 218px，水平 padding 12px、垂直 padding 8px、圆角 16px；每个项目占 40px 高，只显示 14px / 20px、字重 600 的单行项目名称和右侧 16px 箭头，不重复展示说明。名称列可收缩，一行容纳不下时以省略号截断，箭头始终固定宽度且不可被挤压。所有项目默认保持透明，不额外标记当前项目。
- 画布右上角内缩 16px 放置分享与关闭组合浮层。浮层宽 88px、高 44px、圆角 12px，两个 44px 操作区中间用 0.5px `--separator-base` 分隔，图标分别使用 Figma `share_new_b` 与 `close_b`。
- 项目菜单项只在 hover 或键盘聚焦时使用 `--bg-0-lighter`，圆角 12px。分享和关闭按钮在 hover、按下和操作完成后不改变背景色或图标颜色，点击后直接执行对应操作。
- 分享按钮复制当前页面的完整 URL，包含 Hash 路由；复制成功后按 Figma 节点 `1944:83638` 在画布顶部居中显示「链接已复制」Toast：高 40px、水平 padding 16px、圆角 20px、背景 `--dark-fill-5`，文字使用 14px / 20px PingFang SC 和 `--always-white`。Toast 使用 `duration.in` 从画布上边缘向下进入，完整停留 2 秒后使用 `duration.out` 渐隐退出，不弹出模态层。
- 关闭按钮返回 `/docs` 主页。
- 画布右下角内缩 16px 放置 120px × 44px 的画布工具条，圆角 12px。左侧两个 44px 操作区使用 Figma 原始加号、减号图标，分别把手机画板与右侧控制器组成的完整内容组放大或缩小 5%；默认 100%，范围限制在 50%–150%。点阵背景、左上项目入口、右上分享/关闭和右下工具条不参与缩放。
- 当前 demo 有两个及以上可切换方案时，工具条右侧 44px 操作区使用 Figma 原始方案切换图标，缩放操作区与方案入口之间使用 0.5px `--separator-base` 分隔；没有更多方案时隐藏入口和分隔线，工具条收窄为 88px，只保留放大与缩小。达到缩放边界时按钮继续保持原样，但不再改变比例。
- 点击方案入口后，在工具条上方 8px 展开方案面板。面板右侧与画布保持 16px，宽 220px，圆角 16px；面板从固定的右下锚点向上生长，高度由标题和内容决定，不写死高度。
- 方案面板标题为「方案切换」，标题允许随内容纵向自适应；右侧关闭按钮使用 Figma 原始关闭图标。面板只在点击关闭按钮后关闭，点击画布或重复点击方案入口都不关闭。
- 方案面板直接控制当前 demo：`胶囊` 对应 `toolNoteDisplayVariant = consistent`，`信息卡` 对应 `toolNoteDisplayVariant = preview-detail`；「右侧图标动画」控制 `sourceImageMotionVariant` 的静态与动效状态。面板中的切换必须立即反映到手机画板。
- 所有非内容区域（包括点阵画布、最外层白边和控制区内部空白）都支持鼠标或单指拖动；拖动时展示 `grab / grabbing` 光标反馈，平移与缩放叠加生效。手机内容、实际进度控件、左上角菜单、右上角操作、右下角画布工具和方案面板均不触发拖动；刷新页面后画布回到居中位置。
- 当前项目 Demo 列表中的每个页面都必须显示缩放工具条。只有存在两个及以上方案的页面显示第三个方案入口；其他页面使用 88px 的纯缩放工具条。

沉浸式页面初始进入时，手机画板与右侧控制区作为一组在可用视口内上下居中，不附加底部偏移。左右列间距默认 72px，最大宽 1062px；右侧标题、进度条和按钮与手机画板共用同一条水平中心线。

点阵只用于画板外的演示舞台，不进入手机页面内容。

手机画板外层不加投影，只保留圆角裁切和外描边。

## 回答 Loading Demo

回答 loading demo 使用 [`answer-loading.md`](../frameworks/answer-loading.md) 中的长思考链路和快速回答链路。

右侧控制器只承担演示控制：

- 标题：`回答loading新增长思考模式`
- 节点：`判断 / think / content / think / tool call / think / tool call / think / response / 完成`
- 初始按钮：`开始演示`
- 播放后按钮：`暂停` / `继续` + `重新开始`
- 点击节点：跳到对应状态并继续播放后续内容

控制器不展示大段说明、状态描述、旧版分步骤按钮或页脚导航。

## 真实感 Loading Demo

真实感 loading demo 是从回答 loading 长思考链路中拆出的单独 demo，聚焦一个 tool call 的真实加载过程。

页面路由：`#/docs/reports/long-thinking`

标题：`真实感 loading`

页面基座沿用点点对话页，具体电视机文案、数字滚动、卡片轮转和收起规则见 [`answer-loading.md`](../frameworks/answer-loading.md#真实感-loading-demo)。

## 切图清单

当前代码接入 `src/assets/dotted/` 下的切图资源：

| 资源名 | 用途 |
|--------|------|
| `think-back.svg` | 顶部返回 |
| `think-user-avatar.svg` | 导航头像 |
| `think-more.svg` | 顶部更多 |
| `personal/statusbar-light.png` | 所有 Light-only demo 共用的完整 iOS 状态栏 |
| `think-message-voice.svg` | 输入框左侧语音入口 |
| `think-camera.svg` | 输入框相机入口 |
| `think-add-circle.svg` | 输入框添加入口 |
| `think-lottie/book.json` | `ProcessIndicator` 的阅读语义资源 |
| `think-lottie/bulb.json` | `ProcessIndicator` 的洞察语义资源 |
| `think-lottie/cloud.json` | `ProcessIndicator` 的判断和 think 语义资源 |
| `think-lottie/doc.json` | `ProcessIndicator` 的文档语义资源 |
| `think-lottie/eyes.json` | `ProcessIndicator` 的检查语义资源 |
| `think-lottie/glass.json` | `ProcessIndicator` 的搜索语义资源 |
| `think-lottie/pen.json` | `ProcessIndicator` 的 tool call 语义资源 |
| `think-lottie/star.json` | `ProcessIndicator` 的亮点语义资源 |
| `think-lottie/preview.json` | 文档页整组动画总览，不进入页面状态位 |
| `think-response-avatar-1.png` / `think-response-avatar-2.png` | response 状态行头像 |
| `think-response-arrow.svg` | response 状态行右箭头 |
| `think-response-copy.svg` / `think-response-share.svg` / `think-response-dislike.svg` / `think-response-refresh.svg` | response 底部操作栏图标 |
| `think-descending.svg` | response 长内容快速跳到回答底部 |
| `source-logo-yt.png` / `source-logo-sailormmoon.png` / `source-logo-alice.png` / `source-logo-breeze.png` | 来源头像 |
| `source-image-*` | 来源笔记图片 |
| `source-quote.svg` / `source-like.svg` | 来源引用和点赞图标 |

## 触觉反馈

| 交互 | 意图 |
|------|------|
| 点击返回/更多 | light |
| 点击语音入口 | light |
| 按住输入框语音 | medium |
| 点击相机/添加 | light |
| 点击至底按钮 | light |
| 点击 response 状态行 | light |
| 点击思考脑雾 | light |
| 发送新消息 | success |

## 依赖组件

| 组件 | 状态 | 用途 |
|------|------|------|
| DottedDemoScreen | 已实现 | 当前点点页面模板和 project demo 基座 |
| DotsMessageBubble | 已实现 | User / Dots 文本消息气泡统一样式 |
| MediaImage | 已实现 | response 正文中的单图、多图和更多图片入口 |
| MediaNote | 已实现 | response 正文中的单篇、两篇、三篇笔记和更多笔记入口 |
| MediaVideo | 已实现 | response 正文中的 3:4 竖版视频和 16:9 横版视频 |
| ProcessIndicator | draft | 思考、工具调用、搜索和完成状态位 |
| Card | 已实现 | response、来源卡、tool call 信息卡 |
| Sheet | draft | 思考过程和来源半层 |
| Answer Loading Framework | draft | 回答加载、长思考、快速回答和真实感 loading |

## 多宽度适配

| 宽度 | 规则 |
|------|------|
| Mobile 393px | 规范画板规格 |
| Tablet | 保持手机画板预览，不拉伸页面 |
| Desktop | 沉浸式项目 demo 居中展示手机画板和控制器 |
