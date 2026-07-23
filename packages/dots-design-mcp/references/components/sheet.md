---
name: Sheet
status: draft
last_updated: 2026-07-21
used_by: [component-harness, ai-workflows]
---

# Sheet 底部面板

Sheet 用于承载短流程、设置项和 AI 工作流中的阶段性配置。它是页面上方浮出的临时操作层，不替代完整页面。

## 结构

```
Sheet
├── mask
├── container
│   ├── handle
│   ├── header
│   │   ├── title
│   │   └── close
│   ├── body
│   └── footer
```

进入 Sheet 后必须有关闭入口。关闭入口放在 header 右侧，点击后回到进入前的站内页面；如果没有来源记录，回到 `#/docs/intro`。

## 视觉

| 项 | 规格 |
|------|------|
| container 背景 | `Bg 3` / `--bg-3` |
| mask | `Mask Bg 1`，需要弱化底层但不制造深色压迫 |
| 圆角 | `radius.sheet`，20px 20px 0 0 |
| header 高度 | 56px |
| title | `Title`，PingFang SC 17px / 600 |
| close | 24px icon button，颜色 `Paragraph` |
| body padding | 20px 24px 24px |
| footer padding | 12px 24px + safe area |

## 行为

- 打开时从底部进入，使用 `duration.sheet` 和 `curve.out`。
- 关闭时回到底部，不能横向滑走。
- 点击 mask 关闭只用于低风险配置；关键确认流程必须通过明确按钮关闭。
- body 内容可滚动，header 和 footer 固定。
- 所有文案示例在规范页中保持同一套中文占位，不混用旧业务文案。

## 与 AI 工作流的关系

AI 工作流页从侧栏进入时，标题右侧显示「关闭」按钮。这个关闭逻辑属于页面壳能力，但视觉和交互规则遵循 Sheet 的关闭入口原则：始终给用户一条明确返回路径。

## Answer Loading 半层

回答 loading 使用两类底部半层：思考过程半层和来源半层。通用状态机见 [`answer-loading.md`](../frameworks/answer-loading.md)。

| 项 | 规格 |
|------|------|
| 低半层高度 | 639px |
| 高半层高度 | 798px |
| 背景 | `Bg0 Lighter` / `#FAFAFA` |
| 顶部圆角 | 38px |
| 遮罩 | 20% 黑色 |
| grabber | 36×5px，圆角 100px，`#CCCCCC` |
| 动画 | 从底部拉起，420ms，`cubic-bezier(0.16, 0.84, 0.32, 1)` |

半层上滑时在手势过程中进入高半层，不等松手。向下拖动超过 96px 时直接关闭。点击单个思考类目只展开或收起内容，不能改变半层高度。

思考过程卡片白底、圆角 16px、padding 12px。左侧状态圆 24×24px，连接线为 1px 竖向虚线，dash/gap 1.5px，颜色 `Separator 2`。连接线只连接过程节点，避开图形本体。

只有有正文、检索结果或来源结果的类目才显示 chevron 并支持点击展开；无内容类目不显示箭头，也不绑定点击。多个类目可以同时展开，不互斥。

来源半层滚动到参考来源区域后，标题和筛选胶囊组成的导航需要吸顶；吸顶区域背景同半层，防止内容穿透。
