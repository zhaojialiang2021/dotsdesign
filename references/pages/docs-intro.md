# Docs Intro 入门页

> status: draft
> last_updated: 2026-07-23

## 目标

入门页合并「介绍」「宣言」「设计工作流」，作为 System 区的第一入口。页面只讲清楚三件事：Dots Design System 是什么、怎么协作、从哪里开始。

## 叙事顺序

1. Hero：与 AI 协作的设计系统。
2. Dots Design System 是什么：Token、组件、Demo 分别承担什么。
3. 设计工作流：定义问题、读取规则、生成与检查。
4. AI 接入方式：MCP / npm、Demo、Docs 的闭环。
5. 从哪里开始：AI 工作流、令牌、原则、组件、页面、触觉反馈、项目 demo。

## 导航规则

- 侧栏「入门」只保留「介绍」和「AI 工作流」。
- `/docs/workflow` 作为旧链接兼容，进入合并后的 `/docs/intro` 内容。
- `/docs/manifesto` 作为旧链接兼容，进入合并后的 `/docs/intro` 内容。
- Writing 区可保留长文版 manifesto，不作为入门导航入口。

## 视觉规则

- 页面采用编辑型长页结构：Hero 和每个章节标题区统一使用上下结构，标题在上、说明在下，保持单一阅读起点；内容区再根据语义使用多栏。
- Hero 主标题模块底部使用 `0.5px solid var(--separator-base)` 分隔首屏与正文；其余章节之间只通过 `--space-9` 至 `--space-10` 的纵向留白区分层级，不使用横向分隔线。
- Hero 元信息到分割线保留 96px 底部留白，由 `--space-10` 与 `--space-7` 组合，强化首屏结束感。
- 说明模块不使用独立卡片背景、圆角或外框，统一跟随页面 `--bg-base`；内容以连续三栏呈现，栏间使用 `0.5px solid var(--separator-base)` 分隔。
- 「设计工作流」使用单个 `--bg-0-lighter` 浅色容器承载三步，容器圆角使用 `--radius-workflow-card`（24px）；不使用栏间分割线，步骤之间使用向右箭头表达顺序，窄屏回落为单列并改用向下箭头。
- 「AI 接入方式」复用工作流容器样式，以 `--bg-0-lighter`、`--radius-workflow-card` 和箭头串联 MCP、Demo、Docs，不使用栏间分割线。
- 「Dots Design System 是什么」「设计工作流」和「AI 接入方式」在桌面宽度下各自单排三列展示，窄屏回落为单列并使用留白区分内容。
- 三组模块标题统一使用 `17px`、600 字重和 `Title`（`--title`），包括「Token 是边界」、流程步骤和「MCP / Demo / Docs」；三组说明文字统一使用 `14px`、400 字重、`1.65` 行高和 `Paragraph`（`--paragraph`），最大行宽为 `280px`。
- Hero 标题桌面端使用 `36px`、700 字重，窄屏使用 `30px`；强调词不使用下划线或额外装饰。
- 「Dots Design System 是什么」「设计工作流」「AI 接入方式」等章节标题统一使用 `24px`，与 Hero 主标题拉开层级。
- 「Dots Design System 是什么」每列顶部使用语义图标；图标、标题和正文形成稳定的纵向节奏，不额外使用装饰色。
- 「Dots Design System 是什么」标题说明到三栏内容、图标到模块标题的间距均使用 `--space-6`（24px），避免首个正文模块过度松散。
- 「从哪里开始」使用扁平入口列表：桌面端为「入口 / 说明」两列与右侧箭头，表头和每行使用 `0.5px solid var(--separator-base)` 分隔，不使用卡片背景和圆角；移动端标题与说明上下排列。
