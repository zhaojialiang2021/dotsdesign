# Dots 产品策略

> 最后更新：2026-06-23
> 每次季度策略访谈后更新本文档

## 要解决的问题

Dots 是外部业务方的 AI 对话产品。当前最重要的问题不是补齐完整 App，而是验证一条可复制的 AI 设计系统工作流：Figma 规范进入仓库，沉淀成可读文档、可运行页面、可被 AI 执行的组件契约，最后能稳定上线预览。

这套系统的底层逻辑是 **Harness Engineering**：不是只把组件画出来，而是给 AI 搭一条可以执行、可以验证、可以复用的工程轨道。每个组件都必须同时回答四个问题：它长什么样、它表达什么语义、AI 生成时边界在哪里、生成后怎么判断合格。

## 怎么做

第一版围绕「点点对话页」建立基座：状态栏、导航、消息流、Skill 胶囊、输入态、键盘态、AI 生成卡片都要能在 docs 站里实时预览。所有视觉规格写进 `references/`，切图进入 `src/assets/dotted/`，代码只作为规格的运行结果。

在这个基座上继续沉淀 Component Harness：每次页面还原后，不只抽一个样式组件，还要抽出它的语义定义、schema、状态矩阵、交互约束、禁止事项和验证方式。页面 demo 是验证夹具，不是一次性展示稿。

## 服务谁

第一批用户是 Dots 的业务设计与研发协作者。他们需要快速判断：一张 Figma 画板能否被稳定还原成页面 demo，后续能否继续扩展成组件库、页面库和 AI 生成约束。

第二批用户是 AI agent。它们不会长期记忆设计偏好，也不会凭审美判断补齐缺失规则。它们需要的是封闭枚举、明确约束、可复制的使用说明和可运行的验收方式。

## 关键指标

- **还原准确率**：页面 demo 与 Figma 关键节点在布局、颜色、字号、间距上的偏差可被定位并持续修正。
- **流程跑通率**：Figma → 规格文档 → 页面 demo → GitHub → Vercel 预览这条链路不中断。
- **组件沉淀率**：每次页面还原后，都能抽出可复用的 Dots 组件或交互规则。
- **Harness 完整率**：核心组件必须具备语义定义、props schema、状态矩阵、constraints、do/don't、验证清单。
- **AI 生成合规率**：未见过项目上下文的 agent 读取 `/skill.md` 后，生成页面时 token、组件和状态使用能被检查通过。

## 功能轨道

### Track A: 点点对话页（当前优先级最高）
- 默认语音态：快捷 Skill 胶囊、按住说话、键盘入口、相机入口。
- 输入态：真实输入框、系统键盘切图、发送按钮、发送后收起键盘。
- 消息流：用户消息、Dots 回复、AI 生成卡片都作为消息体展示。

### Track B: Component Harness
- DotMessageBubble：用户 / Dots 两类消息气泡，AI 生成卡片也属于消息体。
- DotInputDock：语音态 / 输入态 / Skill 选中态。
- DotSkillChip：快捷胶囊与已选 Skill 行。
- DotGeneratedCard：AI 生成内容卡片。
- Button / Input / Card / Sheet / Empty State：沉淀为通用组件 harness，供页面 demo 和 agent 复用。

### Track C: Pattern Harness
- Conversation Flow：消息、时间戳、输入栏、键盘、发送后的滚动规则。
- Skill Selection：快捷 Skill、选中 Skill、关闭 Skill、输入框联动。
- AI Generated Content：文本回复、富文本卡片、图组、注意事项、下一步动作。

### Track D: AI 接入
- 将 Dots 的令牌、组件契约、页面规格暴露为 npm MCP 包、线上静态文档和本地项目模式。
- npm MCP 包是跨电脑、跨团队的默认接入方式；Vercel 是人看 demo 和文档的预览入口；本地模式只用于维护者调试。
- 让后续 agent 在生成 Dots 页面时先读规格和 demo 工作流，不凭截图或旧代码猜。
- Copy for AI 输出必须包含组件语义、生成规则和验证方式，而不是只给 props 表。

## 待决策

- [ ] Dots 独立站的正式域名与 Vercel 项目名
- [ ] GitHub 仓库是长期 private 还是上线后 public
- [ ] Dots 组件命名是否保留英文前缀 `Dot*`
- [ ] 是否把 Pattern Harness 独立成 `/docs/patterns/*` 的深度页面
