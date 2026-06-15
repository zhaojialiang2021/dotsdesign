---
name: TypeTag
status: complete
last_updated: 2026-06-15
used_by: [dotted-demo, skill-selector, rich-card]
---

# TypeTag / Skill 胶囊

点点里的标签主要用于 Skill 选择、选项标签和内容类型提示。对话页里顶部 Skill 胶囊必须可横滑，到边界时有系统弹性。

## Skill 胶囊

| 属性 | 默认态 | 选中态 |
|------|------|------|
| 背景 | `Inverted Fill 1` | `Bg 3` |
| 边框 | 0.5px `Separator 2` | 0.5px `info 5` |
| 字色 | `Description` | `Title` |
| icon 色 | `Description` | `Title` |
| 圆角 | `radius.tag` 20px | `radius.tag` 20px |
| padding | 8px 14px | 8px 14px |

选中 Skill 后，输入框上方展示选中态 Skill；关闭 icon 颜色为 `Description`。

## 选项标签

| 属性 | 值 |
|------|------|
| 背景 | `Inverted Fill 1` |
| 边框 | 0.5px `Separator 2` |
| 圆角 | `radius.option` = 12px |
| padding | 8px 14px |
| 字体 | 14px / 400 |

## 横滑行为

- 容器横向滚动，隐藏滚动条。
- iOS / WebKit 使用 `-webkit-overflow-scrolling: touch`。
- 到头/到底保留系统弹性回弹，不做硬停止。
- 所有 icon 和图片禁止拖动。
