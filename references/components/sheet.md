---
name: Sheet
status: draft
last_updated: 2026-06-25
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
