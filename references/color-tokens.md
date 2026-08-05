# Color Tokens

来源：`/Users/zhaojialiang/Downloads/Token-Color.pdf`

状态：complete
最后校对：2026-07-28

本文件是颜色规范的人类可读真相源，执行数据位于 `tokens/color.json`。`Light / Dark` 是自适应 token，`Always Mode` 是固定 token。所有 token 名统一使用英文；PDF 中的 `Primary` 明确为小红书品牌色，归入 `XHS brand`；点点绿色统一归入 `Dots brand`。

PDF 中 `Light Dots text` 的色值文字缺失；根据同组 Dark 值与 Dots bg 色块校正为 `#56D1BF`。带透明度的值在本文件保留为 `#HEX 百分比`，构建数据使用等价 `rgba()`。

规范页展示使用扁平分组：分组不包卡片外框，单个 Token 不使用独立卡片底色和圆角，仅用行分隔与 64×64px 色块建立层级，避免“页面 → 分组卡片 → Token 卡片 → 色块”重复套层。色块右侧依次纵向展示名称、用途说明和计算值；名称只显示可读部分，不显示 CSS 变量前缀 `--`，点击复制仍返回完整 `var(--token-name)`。

## Light / Dark

| Type | Token | CSS variable | 用途 | Light | Dark |
| --- | --- | --- | --- | --- | --- |
| Backgrounds | Bg | `--bg-base` | 基准层：主背景色 | `#FFFFFF` | `#29292E` |
| Backgrounds | Bg 0 | `--bg-0` | 最底层：卡片容器后层背景 | `#F5F5F5` | `#19191E` |
| Backgrounds | Bg 0 Lighter | `--bg-0-lighter` | 最底层浅色背景 | `#FAFAFA` | `#141418` |
| Backgrounds | Bg 1 | `--bg-1` | 次高层：基准层上模块背景 | `#F5F5F5` | `#222226` |
| Backgrounds | Bg 2 | `--bg-2` | 最高层：Alert 等弹出层背景 | `#FFFFFF` | `#29292E` |
| Labels | Title | `--title` | 一级标题 | `#000000 80%` | `#FFFFFF 84%` |
| Labels | Paragraph | `--paragraph` | 二级标题、段落 | `#000000 62%` | `#FFFFFF 56%` |
| Labels | Description | `--description` | 描述、未选中文字 | `#000000 45%` | `#FFFFFF 36%` |
| Labels | Disabled | `--disabled` | 禁用色 | `#000000 27%` | `#FFFFFF 21%` |
| Labels | Placeholder | `--placeholder` | 占位文本 | `#000000 27%` | `#FFFFFF 21%` |
| Labels | Link | `--link` | 段落和话题链接 | `#133667` | `#C6D9EF` |
| Labels | Link Accent | `--link-accent` | 强调链接 | `#3D8AF5` | `#C6D9EF` |
| Fills | Fill 1 | `--fill-1` | 次级按钮、标签、输入框底色 | `#303034 5%` | `#FFFFFF 4%` |
| Fills | Fill 2 | `--fill-2` | 操作组件按下色 | `#303034 10%` | `#FFFFFF 8%` |
| Fills | Fill 3 | `--fill-3` | 弱标签色 | `#303034 20%` | `#FFFFFF 12.5%` |
| Fills | Fill 4 | `--fill-4` | 标签色 | `#303034 50%` | `#FFFFFF 32%` |
| Fills | Fill 5 | `--fill-5` | 强标签、气泡、轻提示底色 | `#303034 99%` | `#FFFFFF 99%` |
| Fills | Inverted Fill 1 | `--inverted-fill-1` | 反色次级按钮、标签、输入框底色 | `#FFFFFF 4%` | `#303034 5%` |
| Fills | Inverted Fill 2 | `--inverted-fill-2` | 反色操作组件按下色 | `#FFFFFF 8%` | `#303034 10%` |
| Fills | Inverted Fill 3 | `--inverted-fill-3` | 反色弱标签色 | `#FFFFFF 12.5%` | `#303034 20%` |
| Fills | Inverted Fill 4 | `--inverted-fill-4` | 反色标签色 | `#FFFFFF 32%` | `#303034 50%` |
| Fills | Inverted Fill 5 | `--inverted-fill-5` | 反色强标签、气泡、轻提示底色 | `#FFFFFF 99%` | `#303034 99%` |
| Separators | Separator | `--separator-base` | 分割线、描边 | `#000000 8%` | `#000000 20%` |
| Separators | Separator 2 | `--separator-2` | 较深色二级描边 | `#000000 20%` | `#FFFFFF 16%` |
| Separators | Opaque Separator | `--separator-opaque` | 多条线重叠时使用 | `#EAEAEA` | `#222226` |
| XHS brand | XHS Red | `--xhs-red` | 小红书品牌强调色 | `#FF2442` | `#FF2E4D` |
| XHS brand | XHS Red Soft | `--xhs-red-soft` | 小红书品牌弱强调背景 | `#FFEDF0` | `#301C1F` |
| Semantic | Warning | `--warning` | 警告填充及浅色填充上的文字 | `#FF7D03` | `#FF9E3D` |
| Semantic | Warning Soft | `--warning-soft` | 警告浅色填充 | `#FFF2E6` | `#30271F` |
| Semantic | Success | `--success` | 成功填充及浅色填充上的文字 | `#02B940` | `#36E271` |
| Semantic | Success Soft | `--success-soft` | 成功浅色填充 | `#EAF8EF` | `#1C2E22` |
| Semantic | Info | `--info` | 信息填充及浅色填充上的文字 | `#3D8AF5` | `#4790F5` |
| Semantic | Info Soft | `--info-soft` | 信息浅色填充 | `#ECF4FE` | `#1D2633` |
| Neutral | White | `--neutral-white` | 主题自适应白色 | `#FFFFFF` | `#000000` |
| Neutral | Black | `--neutral-black` | 主题自适应黑色 | `#000000` | `#FFFFFF` |
| Dots brand | Dots Accent Surface | `--dots-accent-surface` | 标签等浅品牌背景 | `#56D1BF 8%` | `#56D1BF 12%` |
| Dots brand | Dots Accent Text | `--dots-accent-text` | 品牌文字和图标 | `#56D1BF` | `#56D1BF` |
| Dots brand | Dots Accent Fill | `--dots-accent-fill` | 按钮、开关等交互底色 | `#56D1BF` | `#56D1BF` |

## Always Mode

| Type | Token | CSS variable | 用途 | Always |
| --- | --- | --- | --- | --- |
| Dots brand | Dots Accent Border Subtle | `--dots-accent-border-subtle` | 标签低强调描边 | `#56D1BF 10%` |
| Dots brand | Dots Accent Border | `--dots-accent-border` | 按钮中强调描边 | `#56D1BF 40%` |
| Dots brand | Dots Accent Icon Muted | `--dots-accent-icon-muted` | 弱化辅助图标 | `#34B39D 40%` |
| Dots brand | Dots Accent Highlight | `--dots-accent-highlight` | 高亮答案底色 | `#56D1BF 12%` |
| Backgrounds | Mask Bg | `--mask-bg` | 遮罩背景 | `#000000 40%` |
| Labels | Light Title | `--light-title` | 亮色一级标题 | `#FFFFFF 84%` |
| Labels | Light Paragraph | `--light-paragraph` | 亮色二级标题、段落 | `#FFFFFF 56%` |
| Labels | Light Description | `--light-description` | 亮色描述 | `#FFFFFF 36%` |
| Labels | Light Disabled | `--light-disabled` | 亮色禁用 | `#FFFFFF 21%` |
| Labels | Dark Title | `--dark-title` | 暗色一级标题 | `#000000 80%` |
| Labels | Dark Paragraph | `--dark-paragraph` | 暗色二级标题、段落 | `#000000 62%` |
| Labels | Dark Description | `--dark-description` | 暗色描述 | `#000000 45%` |
| Labels | Dark Disabled | `--dark-disabled` | 暗色禁用 | `#000000 27%` |
| Fills | Light Fill 1-5 | `--light-fill-1` … `--light-fill-5` | 固定亮色填充阶梯 | `#FFFFFF 4% / 8% / 12.5% / 32% / 99%` |
| Fills | Dark Fill 1-5 | `--dark-fill-1` … `--dark-fill-5` | 固定暗色填充阶梯 | `#303034 5% / 10% / 20% / 50% / 99%` |
| Separators | Light Separator | `--light-separator` | 亮色分割线、描边 | `#FFFFFF 7%` |
| Separators | Light Separator 2 | `--light-separator-2` | 亮色较深二级描边 | `#FFFFFF 16%` |
| Separators | Dark Separator | `--dark-separator` | 暗色分割线、描边 | `#000000 8%` |
| Separators | Dark Separator 2 | `--dark-separator-2` | 暗色较深二级描边 | `#000000 20%` |
| Neutral | White | `--always-white` | 固定白色 | `#FFFFFF` |
| Neutral | Black | `--always-black` | 固定黑色 | `#000000` |
| Dots search demo | Ask Dots Action | `--always-ask-dots-action` | 「立即总结」文字 | `#34B39D` |
| Dots search demo | Ask Dots Island Surface | `--always-ask-dots-island-surface` | 新版展开浮层玻璃表面 | `#FFFFFF 90%` |
| Dots search demo | Ask Dots Island Border | `--always-ask-dots-island-border` | 新版展开浮层薄荷描边 | `#56D1BF 20%` |
| Dots search demo | Ask Dots Guide Surface | `--always-ask-dots-guide-surface` | 方案 B 单行引导卡表面 | `#83F2DF 2% over White` |

## 迁移规则

旧变量只在生成的 CSS 中保留兼容别名，不再出现在规范页和新代码中：

- `--info-5` → `--dots-accent-fill`
- `--info-4` → `--dots-accent-highlight`
- `--info-6` → `--dots-accent-text`
- `--primary` → `--xhs-red`
- `--bg-3` → `--bg-2`
- `--fill-a` → `--bg-base`
- `--fill-b` → `--fill-5`
- `--fill-c` → `--dark-fill-5`
