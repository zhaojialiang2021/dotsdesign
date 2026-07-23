# MessageBubble 消息体

> status: complete
> last_updated: 2026-07-21
> 真相源：`references/frameworks/answer-loading.md`、`references/pages/dotted-demo.md`。

消息体是点点对话页的基础单元，承载用户消息、Dots 文本回复、判断态、流式输出和 response 卡片。页面 demo 只能引用该组件规范，不允许复制私有气泡样式。

## Harness 定义

MessageBubble 是点点对话流的核心 Component Harness，不是普通气泡样式。

- 语义：表达一次对话中的消息单位，负责“谁说的、当前处于什么阶段、展示什么内容”。
- 生成规则：AI 生成对话页时必须先选 `role` 和 `state`，再选择普通文字、判断态、思考态或流式回复。
- 验证方式：检查左右对齐、背景、圆角、连续消息间距、判断态到流式态的替换、response 的自然拓展。

## 组件结构

```tsx
<DotsMessage role="user | dots" state="default | thinking | streaming | response | complete">
  <DotsMessageBubble />
</DotsMessage>
```

`DotsMessage` 负责左右对齐、消息间距和生命周期位置；`DotsMessageBubble` 负责文字气泡、判断态容器、逐字流式文本和 response 壳体。

## 文字气泡

| 属性 | User | Dots |
|------|------|------|
| 对齐 | 右对齐 | 左对齐 |
| 背景 | 弱灰填充 | `Fill A` |
| 边框 | 0.5px 白色弱描边 | 无 |
| 圆角 | 单行 18px，多行 22px | 单行 18px，多行 22px |
| padding | 12px 16px | 12px 16px |
| 最大宽度 | 293px | 300px |
| 字体 | 16px / 28px / Regular | 16px / 28px / Regular |

文字颜色使用 `Title`。多行文本完整展示，保留换行，允许长词换行。

用户气泡内每一行文字下方都显示 0.75px 虚线。虚线使用 `Separator 2`，dash 2px / gap 2px，宽度跟随当前行真实文本宽度，不写死成固定两条。

## 判断与思考

判断态、连续长思考、tool call、快速回答和真实感 loading 的状态机统一由 [`answer-loading.md`](../frameworks/answer-loading.md) 定义。

组件侧只提供这些稳定能力：

- 左侧 36×36 Lottie / icon 状态位。
- 脑雾背景容器，背景透明度和 blur 由框架控制。
- 标题、正文、来源内容的正常文档流布局。
- 当前内容流式输出，已完成内容保持静态。
- Lottie 到完成对勾的原地溶解过渡。
- 连接线避开图形本体，最后一个节点和展开正文下方不继续画线。

## B 版流式输出

B 版是当前唯一保留的流式输出方案。

- 文本按字符进入真实 DOM 文档流。
- 正在输出时，最后约 10 个字符进入透明度梯度。
- 最末字符约 34% 透明度，向前逐步过渡到 100%。
- 每次新字符进入时，旧尾部字符通过 260ms ease-out 逐步变实。
- 输出完成后，用 760ms 把尾部梯度柔和恢复为 100%，不能硬切。
- 不使用 Canvas、整段白色遮罩或闪烁光标。

标题和正文分阶段输出：标题尾部透明度恢复后，正文或检索结果再进入，避免标题和内容同时抢焦点。

## Response 壳体

response 卡片属于 Dots 消息体，不是浮层。

| 属性 | 值 |
|------|------|
| 宽度 | 361px |
| 背景 | `Fill A` |
| 边框 | 0.5px `Separator 2` |
| 圆角 | 22px |
| padding | 20px 16px |
| 状态行 | 14px / 20px，`Description` |
| 正文 | 16px / 28px，`Title` |

response 不做明显位移，只做轻淡入。正文流式输出时卡片向下拓展，不自动把页面顶到回答结尾。底部操作栏只在正文完整输出结束后展示。

## 消息流间距

| 场景 | 值 |
|------|------|
| 单条消息行上下 padding | 4px 0 16px |
| 对话流左右 padding | 16px |
| 对话流顶部 padding | 12px |
| 时间戳 | 居中，12px / 17px，`Placeholder` |

时间戳作为消息流里的独立 stream item，不属于 User 或 Dots 气泡。会话首条消息前显示完整时间锚点；相邻消息间隔达到 15 分钟或跨天时，在下一条消息前插入新的时间戳。

## 交互

| 交互 | 行为 |
|------|------|
| 点击气泡 | 不改变气泡样式 |
| 长按气泡 | 打开长按面板，面板样式另行定义 |
| 发送新消息 | 新消息追加到底部，消息流滚动到最新消息 |
| AI 回答流式输出 | 同一条 Dots 气泡或 response 卡片持续追加文本 |
| response 超出可视区域 | 输入区上方显示“至底”悬浮按钮，点击平滑滚动到底部并隐藏 |
| 点击思考脑雾 | 打开思考中 / 思考过程半层 |
| 点击 response 状态行 | 打开思考过程 / 来源半层 |
