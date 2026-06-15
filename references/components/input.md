---
name: Input
status: complete
last_updated: 2026-06-15
used_by: [dotted-demo]
---

# Input 输入栏

点点输入栏是对话页底部容器，不是普通表单输入框。它负责文本输入、语音/键盘切换、拍照、Skill 选中和发送。

## 容器

| 属性 | 值 |
|------|------|
| 总高度 | 96px（含底部安全区） |
| 背景 | `Bg 1` |
| 圆角 | `radius.input-container` = 28px 28px 0 0 |
| 阴影 | `shadow.1` |
| 边框 | 0.5px `Separator 3` |
| 底部安全区 | 34px |

键盘升起时，输入栏贴在键盘上方，消息流需要被顶上去并保持最新消息可见。

## 输入框

| 属性 | 值 |
|------|------|
| 高度 | 48px |
| 背景 | `Fill A` |
| 圆角 | `radius.input` = 16px |
| 文字 | `dialog-input`，`Title` |
| placeholder | `Placeholder` |
| padding | 0 16px |
| 边框 | 0.5px `Separator 3` |

输入框必须真实可输入。输入文字后，右侧语音和拍照 icon 合并为发送按钮。

## 工具按钮

| 按钮 | 规格 |
|------|------|
| 左侧加号 | 24×24px，颜色 `Paragraph` |
| 语音/键盘切换 | 24×24px，颜色 `Paragraph` |
| 拍照 | 24×24px，颜色 `Paragraph` |
| 发送 | 40×40px 圆形，背景 `info 5`，箭头白色 |

点击语音按钮从输入状态回到语音态；点击消息空白区域时键盘收起。

## Skill 选中

点击输入框上方 Skill 胶囊后，自动拉起输入框，并在输入框上方展示选中的 Skill。

| 属性 | 值 |
|------|------|
| 选中容器背景 | `Bg 3` |
| 选中容器圆角 | 28px |
| Skill icon / 文本 | `Title` |
| 关闭 icon | `Description` |
| Skill 与输入框距离 | 16px |

点击关闭 icon 移除 Skill，输入框仍保持可输入。
