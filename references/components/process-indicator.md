---
name: ProcessIndicator
status: draft
last_updated: 2026-07-29
used_by: [message-bubble, dotted-demo, answer-loading]
---

# ProcessIndicator 过程状态

ProcessIndicator 是 AI 回答过程中的语义状态位。它把 Lottie 文件封装成稳定的业务状态，页面和 MessageBubble 只选择状态，不直接引用动画资源。

## Harness 定义

- 语义：表达 AI 当前正在思考、调用工具、搜索或已经完成。
- 生成规则：先根据业务阶段选择 `kind`，再由组件映射对应动画；不得按视觉偏好随意选动画。
- 验证方式：检查 36×36 状态位、播放和静止首帧、完成态资源以及减少动态效果降级。

## 状态映射

| kind | 资源 | 用途 |
|------|------|------|
| `reading` | `book.json` | 读取知识、资料和长内容 |
| `insight` | `bulb.json` | 形成观点或发现关键信息 |
| `thinking` | `cloud.json` | 判断、规划和一般思考 |
| `document` | `doc.json` | 生成、整理或解析文档 |
| `review` | `eyes.json` | 观察、比对和校验结果 |
| `search` | `glass.json` | 站内、全网和来源检索 |
| `tool-call` | `pen.json` | 外部工具调用或执行动作 |
| `highlight` | `star.json` | 重点、推荐和高价值结果 |
| `complete` | `think-check-complete.svg` | 当前过程已完成 |

`preview.json` 是 834×338 的整组总览动画，只用于文档预览，不进入 36×36 ProcessIndicator 状态位。

文档实时预览使用单一分组表面，不套用通用三栏 DemoFrame：

- 组件名称与用途只在页面头部出现一次，实时预览内部不重复标题和说明。
- 实时预览外层不使用背景、描边或圆角，只负责左右两栏布局。
- 左侧使用固定尺寸的预览舞台，只展示当前语义状态动画，不重复状态名称或代码；切换状态时舞台尺寸不变化。
- 右侧使用单列状态列表承载 9 个封闭语义状态；一次只展开一个状态，点击条目同时更新左侧预览。
- 当前状态条目展开用途说明和播放控制，避免把 `kind` 与 `playback` 做成两组横向分段控件。
- 状态条目之间使用 0.5px `separator-base` 分割线，不再额外展示一套 3×3 状态网格。
- `preview.json` 仅作为归档源资产，不在实时预览中展示。

## 组件结构

```tsx
<ProcessIndicator
  kind="reading | insight | thinking | document | review | search | tool-call | highlight | complete"
  playing
/>
```

组件默认占用 36×36px 状态位，并始终保持 1:1 比例。进入 MessageBubble 的连续思考列表时，可由父级缩放为 32×32px；进入过程半层时可缩放为 24×24px。

## 行为

- 当前最新过程播放对应 Lottie。
- 已出现但不是当前过程的状态停在第一帧。
- 完成时在原位置由 Lottie 溶解为完成对勾，不做位移。
- `prefers-reduced-motion: reduce` 时停在第一帧；完成态仍显示对勾。
- 动画只解释状态变化，不作为装饰。

## 约束

- 页面和业务组件不得直接 import `think-lottie` 下的 JSON 文件。
- `kind` 必须来自封闭枚举，不能把资源 URL 作为 prop 暴露。
- 组件不控制回答流程，只展示上层传入的状态。
- 没有可见文案时作为装饰隐藏于无障碍树；独立使用时必须提供 `label`。

## 依赖关系

- `MessageBubble` 提供状态位的布局位置。
- `Answer Loading Framework` 决定状态机和切换时机。
- `DottedDemoScreen` 只消费 ProcessIndicator，不维护 Lottie 播放实现。
