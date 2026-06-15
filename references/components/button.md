---
name: Button
status: complete
last_updated: 2026-06-15
used_by: [docs, dotted-demo, bottom-sheet]
figma_source: ReDs Components / Button 按钮规范 / node 55137:12496
---

# Button

Button 用于触发一个即时任务。点点按钮规范继承 ReDs 的尺寸、宽度、场景和继承关系，但视觉语言替换为 Dots tokens：主操作使用 `info 5`，中性容器使用 `Separator 2`，图底按钮使用 `Fill C`。

按钮文案必须短，优先使用「谓语 + 宾语」或「谓语」：`立即查看`、`去看看`、`发送`、`关注`。不要把解释性长句塞进按钮。

## 视觉层级

| Variant | 用途 | 背景 | 文字 | 边框 |
|---|---|---|---|---|
| `filled` | 主操作、当前页面唯一最强动作 | `info 5` / `--info-5` | `Bg Light` / `--bg-light` | `info 5` |
| `outline` | 强调但不是唯一主动作 | 透明 | `info 6` / `--info-6` | `info 6` |
| `neutral` | 空态、取消、弱操作 | 透明 | `Title` / `--title` | `Separator 2` / `--separator-2` |
| `ghost` | 图片、彩色或深色背景上的按钮 | `Fill C` / `--fill-c` | `Bg Light` / `--bg-light` | `Separator Light 5` |

`filled` 不使用小红书红 `--primary`。红色只保留给社区语境或不可逆风险提示，不作为点点主 CTA。

## 尺寸

| Size | Height | Min width | Padding X | Font | 场景 |
|---|---:|---:|---:|---|---|
| `xLarge` | 48px | 112px | 32px | 16px / 24px / 500 | 限定场景，大型吸底或强运营动作 |
| `large` | 44px | 102px | 24px | 16px / 24px / 500 | 表单提交、主流程底部按钮 |
| `medium` | 36px | 82px | 20px | 14px / 22px / 500 | 空态动作、页面内按钮 |
| `small` | 28px | 63px | 12px | 13px / 20px / 500 | 卡片内按钮、列表右侧操作 |
| `mini` | 24px | 52px | 8px | 12px / 18px / 500 | 紧凑卡片、标签附近操作 |
| `micro` | 20px | 40px | 8px | 10px / 14px / 500 | 限定场景，直播/悬浮/极小关注按钮 |

`xLarge` 和 `micro` 只能在明确限定场景使用，不能作为日常默认尺寸。默认从 `medium` 或 `large` 开始选。

## 宽度规则

- 文案短于最小宽度时，按钮使用 `min-width`，文字居中。
- 文案变长时，按钮宽度随内容增长，同时保留对应尺寸的左右 padding。
- `fullWidth=true` 只在表单、底部固定操作、页面主 CTA 中使用，宽度跟随父容器。
- 卡片内按钮不要固定同一宽度，除非同一组按钮需要横向对齐。

## 状态

| State | 规则 |
|---|---|
| `default` | 使用当前 `variant` + `size` |
| `pressed` | `scale(.97)`，opacity 降到 `.6`，不额外换颜色 |
| `disabled` | 背景使用 `Disabled`，文字使用 `Placeholder` 或 `Description Lighter` |
| `loading` | 保持按钮尺寸不变，文案可替换为 loading 指示 |
| `selected` | 用于关注类按钮，例如 `已关注`、`互相关注`，层级从 `outline/neutral` 降低 |

图底/彩色背景按钮不展示 disabled 态。不可用时应隐藏或移出该背景区。

## 场景规则

### 表单底部

整页表单使用 `large + filled + fullWidth`。按钮固定在底部容器内时，按钮宽度由父容器决定，不单独写死。

### 空态动作

空态里只有一个补救动作时，使用 `medium + neutral`。不要把空态动作做成强主按钮，除非该动作就是当前页面唯一目标。

### 卡片按钮

卡片内主动作使用 `small` 或 `mini`。当按钮和卡片标题同屏出现时，按钮不能抢过标题层级。

### 图片或彩色背景

图片、插画、复杂彩色背景上优先使用 `filled` 或 `ghost`。不要在图底使用低识别度的描边按钮，也不要放 disabled 态。

### 继承关系

点击按钮进入下一级页面后，如果动作仍然延续，按钮层级可以根据当前页面目标重新判断。例如列表页的 `添加` 可以是 `outline`，详情页只有一个核心动作时可以升级为 `filled`。

## Icon Button

| 属性 | 值 |
|---|---|
| 尺寸 | 40×40px 或 48×48px |
| 图标 | 24×24px |
| 图标色 | `Paragraph` / `--paragraph` |
| 背景 | 默认透明；选中态可用 `Inverted Fill 1` |
| 无文字 | 必须提供 `aria-label` |

## 禁止

- 不使用黑色实心按钮作为点点主 CTA。
- 不使用 `--primary` 小红书红作为点点主按钮。
- 不在同一个视图里放两个同层级 `filled` 主操作。
- 不为 hover 单独发明颜色；桌面 hover 只做轻微背景或按压反馈。
- 不在按钮中嵌套链接或另一个按钮。
