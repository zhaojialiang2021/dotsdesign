---
name: Modal
status: complete
last_updated: 2026-06-15
used_by: [bottom-sheet, skill-selector, dotted-demo]
---

# Modal / Bottom Sheet

点点移动端优先使用底部弹窗。弹窗用于 Skill 详情、更多操作、引用/分享面板等需要退后当前界面的场景。

## Bottom Sheet

| 属性 | 值 |
|------|------|
| 遮罩 | `Mask Bg 2` = rgba(0,0,0,0.4) |
| 背景 | `Bg 3` |
| 圆角 | `radius.sheet` = 20px 20px 0 0 |
| 拖拽条 | 36×4px，圆角 2px，颜色 `Disabled` |
| 阴影 | `shadow.2` |
| 入场 | 350-450ms，`curve.out` |

## 居中弹窗

| 属性 | 值 |
|------|------|
| 背景 | `Bg 3` |
| 圆角 | 20px |
| 阴影 | `shadow.2` |
| 最大宽度 | 540px |
| 入场 | scale .95 + opacity 0 → scale 1 + opacity 1 |

## 交互

| 交互 | 行为 |
|------|------|
| 点击遮罩 | 关闭 |
| 下拉 Sheet | 超过 30% 高度关闭，否则回弹 |
| 点击关闭 | 关闭 |
| 点击确认 | 提交并关闭 |

按压反馈使用 opacity `.5`。关闭不触发成功反馈；只有明确提交触发成功反馈。
