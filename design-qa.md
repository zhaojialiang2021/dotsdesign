# Docs Intro 视觉 QA

## 对比目标

- Source visual truth: `/var/folders/c0/pt636m8d4t358yfwrvd0983h0000gn/T/codex-clipboard-0c3f05f9-f244-4ca7-a760-6bc2e04c65f3.png`
- Current page before change: `/var/folders/c0/pt636m8d4t358yfwrvd0983h0000gn/T/codex-clipboard-85ca9f3a-4d3a-40eb-9716-1a69ea823f15.png`
- Desktop implementation: `/tmp/dots-intro-editorial-desktop.png`
- Mobile implementation: `/tmp/dots-intro-editorial-mobile.png`
- Route: `#/docs/intro`
- State: Light Mode，默认态

## 设计转译

- 标题区改为上下结构，标题与说明共享同一阅读起点，避免中文长标题在窄列中断行。
- 使用大段纵向留白区分章节，去掉内容区横向分隔，减少表格化的视觉噪音。
- 将「Dots Design System 是什么」「设计工作流」「AI 接入方式」统一为连续三栏，使用细线分隔，不使用卡片背景、圆角和外框。
- 保留 Dots 自己的字体、色彩令牌、图标和信息架构，不复制 Anthropic 的品牌字体与文案风格。

## 桌面检查

- Hero、章节标题和章节说明统一左对齐上下排列，标题保持完整，说明控制在 760px 内。
- 三栏内容等宽，竖线与内容高度一致；标题强于正文，正文行宽没有连成大段。
- 三组模块标题统一为 17px / 600，AI 接入标题不再单独放大。
- 三组模块说明统一为 14px / 400 / 1.65，使用 Paragraph 色并限制 280px 行宽。
- 设计工作流改为单个浅色容器，去掉栏间分割线，桌面端以右箭头串联三步，移动端箭头向下。
- 设计工作流容器圆角使用 `--radius-workflow-card`（32px）。
- Intro Hero 标题提升为桌面 36px、移动端 30px，统一使用 700 字重。
- Intro Hero 底部增加 0.5px `--separator-base` 分割线，仅分隔首屏与正文。
- AI 接入方式复用工作流浅色容器、32px 圆角与箭头流程，去掉栏间分割线。
- Intro 章节标题从 28px 降为 24px，Hero 仍保持 36px。
- Dots 三栏模块将标题到内容、图标到标题的间距统一收紧为 24px。
- Hero 元信息到分割线的底部留白增加为 96px。
- 章节间只使用 `--space-9` 至 `--space-10` 留白区分，不使用横向分隔线。
- 「从哪里开始」继续使用扁平表格列表，与前面的编辑型结构一致。

## 移动端检查

- Hero 和章节段首回落为单列，标题、说明、元信息顺序正常。
- 三栏模块回落为单列，使用留白区分，不保留卡片壳和横向分隔线。
- 标题与正文没有截断，左右 padding 和换行正常。

## Runtime

- `npm run mcp:sync` 通过。
- `npm run build` 通过。
- 浏览器控制台无 warning / error。

## Findings

- 无 P0 / P1 / P2 问题。
- 有意差异：参考页使用品牌衬线正文并展示四列内容；Dots 保留既有无衬线字体系和三项叙事，不做一比一品牌复制。

final result: passed

---

# Color 色卡信息层级视觉 QA

## 对比目标

- Source visual truth: `/var/folders/c0/pt636m8d4t358yfwrvd0983h0000gn/T/codex-clipboard-818aa56c-b900-41ad-a0dc-bcaaf4d3417e.png`
- Implementation: `/tmp/color-swatches-large.png`
- Route: `#/docs/foundations/color`
- State: Light Mode，1440×1000

## 视觉检查

- 色块统一为 64×64px，名称、说明和值按从上到下的顺序纵向排列。
- 名称展示隐藏 CSS 自定义属性前缀 `--`，点击色卡仍复制完整的 `var(--token-name)`。
- 小红书颜色分组标题统一为「小红书品牌」，不再使用「宿主品牌」。
- 三列网格、行间距和底部分隔线保持一致，页面无横向溢出。

## Runtime

- `pnpm exec tsc --noEmit` 通过。
- `pnpm run build` 通过。
- 浏览器控制台无 error。

## Findings

- 无 P0 / P1 / P2 问题。
- 构建仍有既存的 `lottie-web` direct eval 警告，不影响本次改动。

final result: passed

---

# ProcessIndicator 章节说明气泡视觉 QA

## 对比目标

- Source visual truth: `/var/folders/c0/pt636m8d4t358yfwrvd0983h0000gn/T/codex-clipboard-6e6f34e8-6992-4759-8de0-f1ba441b1306.png`
- Desktop implementation: `/tmp/process-indicator-tooltip.png`
- Mobile implementation: `/tmp/process-indicator-tooltip-mobile.png`
- Combined comparison: `/tmp/process-indicator-tooltip-comparison.png`
- Route: `#/docs/components/process-indicator`
- State: Light Mode，Harness 标题 hover / focus

## 视觉检查

- 原来常驻在章节标题下的六段通用说明均从正文流中移除。
- Harness、实时预览、属性、状态、结构和约束标题统一提供说明气泡。
- 桌面端 hover 后气泡显示完整，不造成页面横向溢出。
- 键盘 focus 可触发同一气泡，并通过 `aria-describedby` 关联说明。
- 390×844 视口下气泡左右各保留 24px 安全边距，内容正常换行。
- 修改前截图为 1424×312；桌面实现截图为 1092×267；移动实现截图为 342×630；合并对比图为 1600×700。

## Runtime

- `pnpm exec tsc --noEmit` 通过。
- `pnpm run build` 通过。
- 浏览器控制台无 error。

## Findings

- 无 P0 / P1 / P2 问题。
- 构建仍有既存的 `lottie-web` direct eval 警告，不影响本次改动。

final result: passed

---

# Button 尺寸矩阵视觉 QA

## 对比目标

- Source visual truth: `/var/folders/c0/pt636m8d4t358yfwrvd0983h0000gn/T/codex-clipboard-2eeb9e90-62e2-4c96-91a0-5507adfaa762.png`
- Route: `#/docs/components/button`
- State: Light Mode，默认态

## 桌面检查

- 尺寸矩阵只保留 24px 圆角的最外层轮廓。
- 表头下方与各尺寸行之间不再使用横向分割线。
- 容器四周留白提升为顶部 24px、左右 32px、底部 32px，首尾内容不再贴近轮廓。
- Size、Filled、Outline、Neutral 四列依靠固定网格和一致留白保持对齐。
- 代码示例保持为矩阵之外的独立模块，不与尺寸矩阵合并。

## Runtime

- `pnpm run mcp:sync` 通过。
- `pnpm run lint:tokens` 通过。
- `pnpm exec tsc --noEmit` 通过。
- `pnpm run build` 通过。

## Findings

- 无 P0 / P1 / P2 问题。
- 构建仍有既存的 `lottie-web` direct eval 警告，不影响本次改动。

final result: passed
