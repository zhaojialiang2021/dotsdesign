# MessageBubble 消息体

> status: complete
> 真相源：`references/design-system.md` 7.1、11.2、11.3、11.4。

消息体是点点对话页的基础单元，承载用户消息、AI 文本回复、AI 富文本卡片、引用卡、图片/图组等内容。页面 demo 只能引用该组件规范，不允许复制一份私有气泡样式。

---

## Harness 定义

MessageBubble 是点点对话流的核心 Component Harness，不是普通气泡样式。所有用户消息、Dots 文本回复、AI 富文本卡片、引用卡、图片/图组都必须通过消息体进入对话流。

- **语义**：表达一次对话中的消息单位，负责“谁说的、说了什么、内容类型是什么”。
- **生成规则**：AI 生成对话页时必须先选 `role` 和 `contentType`，再选择文字气泡或富文本卡片，不能手写私有 bubble。
- **验证方式**：检查左右对齐、填充 token、尖角颜色、连续消息间距、发送后滚动到底、键盘收起。

---

## 组件结构

```tsx
<DotsMessage role="user | dots" contentType="text | ai-card | quote | image | link">
  <DotsMessageBubble />
  <DotsGeneratedCard />
</DotsMessage>
```

`DotsMessage` 负责左右对齐、消息间距和流式位置；`DotsMessageBubble` 只负责文字气泡；`DotsGeneratedCard` 是 AI 角色下的一种消息内容，不包进普通气泡里。

---

## 文字气泡

| 属性 | User | AI |
|------|------|------|
| 对齐 | 右对齐 | 左对齐 |
| 背景 | `Fill B` / `--fill-b` | `Fill A` / `--fill-a` |
| 文字 | `Title` / `--title` | `Title` / `--title` |
| 边框 | 0.5px `Separator` / `--separator-base` | 0.5px `Separator 2` / `--separator-2` |
| 圆角 | `radius.bubble` 22px | `radius.bubble` 22px |
| padding | 12px 20px | 12px 20px |
| 最大宽度 | 346px | 346px |
| 引脚 | 右下角，24×24px，bottom -11px | 左下角，24×24px，bottom -11px |

文字使用 `dialog-bubble`：16px / 400 / 1.69em / 0.06em。多行文本完整展示，保留换行，允许长词换行。

---

## AI 富文本卡片

AI 生成卡片属于消息体的一种，放在消息流内，左对齐。

| 属性 | 值 |
|------|------|
| 背景 | `Fill 5` / `--fill-5` |
| 文字 | 标题 `Title`，正文 `Paragraph`，标注 `Description` |
| 边框 | 0.5px `Separator 2` |
| 圆角 | `radius.ai-card` 36px |
| 阴影 | `shadow.1` |
| 内间距 | 顶部 28pt，文字左右 24pt，内容块左右 14pt，底部 28pt + 30pt |
| 富文本 | 使用 `rich-*` 字体与富文本结构规则 |

AI 富文本卡片可包含图片、图组、商品卡、社区用户声音、表格、高亮块等内容块；内容块之间必须有文字承接。

---

## 消息流间距

| 场景 | 值 |
|------|------|
| 不同侧消息间距 | 20px |
| 有引脚的消息间距 | 26px |
| AI 连续消息间距 | 16px |
| 用户连续消息间距 | 8px |
| 对话流左右 padding | 12px |
| 时间戳 | 居中，13px，`Placeholder` |

---

## 内容类型

| 类型 | 规范 |
|------|------|
| `text` | 使用文字气泡，按角色选择 `Fill A/B` |
| `ai-card` | 使用 AI 富文本卡片，不嵌套在文字气泡内 |
| `quote` | 外框 `Fill 5`，圆角 22px，正文 `Title`，来源 `Description` |
| `image` | 图组属于内容块，左右 14pt，圆角按内容类型定义 |
| `link` | 分享/外链卡属于内容块，背景 `Fill 5`，描边 `Separator 2` |

---

## 交互

| 交互 | 行为 |
|------|------|
| 点击气泡 | 不改变气泡样式 |
| 长按气泡 | 打开长按面板，面板背景 `Fill C` |
| 点击链接/来源 | 进入对应详情 |
| 发送新消息 | 新消息追加到消息流底部，键盘收起，消息流滚动到最新消息 |

按压反馈统一使用 `scale(.95-.97)` 与 `.5` 透明度；icon、图片禁止拖动。
