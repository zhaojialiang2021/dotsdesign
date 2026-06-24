---
name: Input / TextField
status: complete
last_updated: 2026-06-23
figma: ReDs Components / Text Field / node 47221:42516
used_by: [component-harness, dotted-demo]
---

# Input / TextField 输入组件

Input 在组件规范中指 TextField 文本字段，不等同于点点对话页底部输入栏。底部输入栏是页面级组合，会引用 TextField、Button、ActionBar 等能力；TextField 是可复用的基础输入控件。

本页按 ReDs Components 的 Text Field 画板沉淀点点版本：普通文本字段、拓展文本字段、前缀、后缀、清除、禁用和错误态都必须可交互验证。

## 结构

| 层级 | 说明 |
|------|------|
| container | 输入字段外层。决定尺寸、圆角、背景和错误态占位。 |
| prefix | 可选前缀槽，支持文字、图标、下拉选择。 |
| native-input | 真实 input，承载 value、placeholder、focus、disabled。 |
| clear-action | 聚焦且有输入内容时出现，点击后清空并保持焦点。 |
| suffix | 可选后缀槽，支持文字、字数、文字按钮、图标、图片。 |
| error-message | 普通 field 的错误提示行；extension 不在容器内额外占行。 |

## 变体

| variant | 尺寸 | 背景 | 圆角 | 用途 |
|------|------|------|------|------|
| field | 393 x 48px | Bg Light | 0 | 标准表单行、设置项输入。 |
| extension | 361 x 48px | Fill 1 / 弱填充 | 12px | 半屏、卡片、局部拓展输入。 |

field 的 error 态总高变为 78px：上方 48px 输入行，下方 18px 错误提示。extension 的 error 态仍然保持 48px，只改变容器底色。

## 状态

| state | 行为 |
|------|------|
| default | 空值，展示 placeholder。 |
| focused | 输入框获得焦点；有内容时展示 clear-action。 |
| filled | 失焦但有内容，展示输入值。 |
| disabled | 禁止输入、禁止清除、禁止后缀 action。 |
| error | 错误反馈。field 显示提示行；extension 单行错误底色。 |

## 前后缀

| slot | type | 规格 |
|------|------|------|
| prefix | text | 固定文字前缀，不进入输入值。 |
| prefix | icon | 24px 图标。 |
| prefix | dropdown | 文字 + 16px 下拉箭头，文字与箭头间距 4px。 |
| suffix | text | 固定文字后缀。 |
| suffix | limit | 实时字数，如 0/24。 |
| suffix | link | 文本按钮，颜色使用点点动作色 `--brand-blue-text`。 |
| suffix | icon | 24px 图标。 |
| suffix | image | 48 x 24px 图片。 |

## 交互规则

1. 输入区域必须是真实 input/textarea，不能用 div 模拟。
2. 输入文字后，limit 后缀实时更新；清除按钮只在 focused 且有内容时出现。
3. 点击清除后 value 置空，焦点仍停留在输入框。
4. disabled 态不响应输入、清除和后缀 action。
5. 状态切换不能改变水平布局节奏，前缀、输入文字、清除、后缀之间保持 12px 间距。
6. 输入光标、文本选择、后缀文字按钮等聚焦/动作反馈统一使用点点品牌绿系 token：`--brand-blue-text` / `--brand-blue-light`，禁止使用社区红 `--primary`。
7. placeholder 与 disabled 直接引用 `--placeholder` / `--disabled`，不要在组件内写临时 rgba。

## 与对话页输入栏的关系

点点对话页底部输入栏是组合组件：它包含语音态、键盘态、拍照、Skill 选中和发送按钮。这个组合不应该反向污染 TextField 的基础规范。需要实现对话页时，底部输入栏引用本页的输入文字规则，但容器、工具按钮和键盘交互仍以页面规范为准。

## Harness 校验

- default / focused / filled / disabled / error 必须全部可见。
- field 与 extension 必须分别验证尺寸、圆角和错误态。
- prefix/suffix 组合必须至少覆盖 text、dropdown、limit、link、icon。
- demo 必须可以真实输入，并且输入内容实时影响 filled、clear 和 limit。
