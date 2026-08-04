// 基于 references/design-tokens.md 的展示分组与用途说明
// 实际值通过 getComputedStyle 从 :root 读取，保持单一真相

export type TokenGroup = {
  title: string
  desc?: string
  tokens: TokenItem[]
}

export type TokenItem = {
  /** CSS 变量名（含 --） */
  name: string
  /** 用途说明 */
  usage: string
}

export const colorGroups: TokenGroup[] = [
  {
    title: 'Background · 背景',
    tokens: [
      { name: '--bg-base', usage: 'Bg · 基准层，主背景色' },
      { name: '--bg-0', usage: 'Bg 0 · 最底层，卡片容器后层背景' },
      { name: '--bg-0-lighter', usage: 'Bg 0 Lighter · 最底层浅色背景' },
      { name: '--bg-1', usage: 'Bg 1 · 基准层上模块背景' },
      { name: '--bg-2', usage: 'Bg 2 · Alert 等弹出层背景' },
      { name: '--mask-bg', usage: 'Mask Bg · Always Mode 遮罩背景' },
    ],
  },
  {
    title: 'Labels · 文字',
    tokens: [
      { name: '--title', usage: 'Title · 一级标题' },
      { name: '--paragraph', usage: 'Paragraph · 二级标题、段落' },
      { name: '--description', usage: 'Description · 描述、未选中文字' },
      { name: '--disabled', usage: 'Disabled · 禁用色' },
      { name: '--placeholder', usage: 'Placeholder · 占位文本' },
      { name: '--link', usage: 'Link · 段落和话题链接' },
      { name: '--link-accent', usage: 'Link Accent · 强调链接' },
    ],
  },
  {
    title: 'Fills · 填充',
    tokens: [
      { name: '--fill-1', usage: 'Fill 1 · 次级按钮、标签、输入框底色' },
      { name: '--fill-2', usage: 'Fill 2 · 操作组件按下色' },
      { name: '--fill-3', usage: 'Fill 3 · 弱标签色' },
      { name: '--fill-4', usage: 'Fill 4 · 标签色' },
      { name: '--fill-5', usage: 'Fill 5 · 强标签、气泡、轻提示底色' },
    ],
  },
  {
    title: 'Inverted Fill · 反色填充',
    tokens: [
      { name: '--inverted-fill-1', usage: '反色填充 1' },
      { name: '--inverted-fill-2', usage: '反色填充 2' },
      { name: '--inverted-fill-3', usage: '反色填充 3' },
      { name: '--inverted-fill-4', usage: '反色填充 4' },
      { name: '--inverted-fill-5', usage: '反色填充 5' },
    ],
  },
  {
    title: 'Separators · 分割/描边',
    tokens: [
      { name: '--separator-base', usage: 'Separator · 分割线、描边' },
      { name: '--separator-2', usage: 'Separator 2 · 较深色二级描边' },
      { name: '--separator-opaque', usage: 'Opaque Separator · 多条线重叠时使用' },
    ],
  },
  {
    title: 'Dots brand · 点点品牌',
    tokens: [
      { name: '--dots-accent-fill', usage: 'Dots Accent Fill · 按钮、开关等交互底色' },
      { name: '--dots-accent-text', usage: 'Dots Accent Text · 品牌文字和图标' },
      { name: '--dots-accent-surface', usage: 'Dots Accent Surface · 标签等浅品牌背景' },
      { name: '--dots-accent-border-subtle', usage: 'Dots Accent Border Subtle · 标签低强调描边' },
      { name: '--dots-accent-border', usage: 'Dots Accent Border · 按钮中强调描边' },
      { name: '--dots-accent-icon-muted', usage: 'Dots Accent Icon Muted · 弱化辅助图标' },
      { name: '--dots-accent-highlight', usage: 'Dots Accent Highlight · 高亮答案底色' },
    ],
  },
  {
    title: '小红书品牌',
    tokens: [
      { name: '--xhs-red', usage: 'XHS Red · 小红书品牌强调色' },
      { name: '--xhs-red-soft', usage: 'XHS Red Soft · 小红书品牌弱强调背景' },
    ],
  },
  {
    title: 'Semantic · 语义',
    tokens: [
      { name: '--warning', usage: 'Warning · 警告填充及文字' },
      { name: '--warning-soft', usage: 'Warning Soft · 警告浅色填充' },
      { name: '--success', usage: 'Success · 成功填充及文字' },
      { name: '--success-soft', usage: 'Success Soft · 成功浅色填充' },
      { name: '--info', usage: 'Info · 信息填充及文字' },
      { name: '--info-soft', usage: 'Info Soft · 信息浅色填充' },
    ],
  },
  {
    title: 'Neutral · 中性',
    tokens: [
      { name: '--neutral-white', usage: 'White · 主题自适应白色' },
      { name: '--neutral-black', usage: 'Black · 主题自适应黑色' },
    ],
  },
  {
    title: 'Always Mode · 固定颜色',
    tokens: [
      { name: '--light-title', usage: 'Light Title · 固定亮色一级标题' },
      { name: '--light-paragraph', usage: 'Light Paragraph · 固定亮色段落' },
      { name: '--light-description', usage: 'Light Description · 固定亮色描述' },
      { name: '--light-disabled', usage: 'Light Disabled · 固定亮色禁用' },
      { name: '--dark-title', usage: 'Dark Title · 固定暗色一级标题' },
      { name: '--dark-paragraph', usage: 'Dark Paragraph · 固定暗色段落' },
      { name: '--dark-description', usage: 'Dark Description · 固定暗色描述' },
      { name: '--dark-disabled', usage: 'Dark Disabled · 固定暗色禁用' },
      { name: '--light-fill-1', usage: 'Light Fill 1 · 固定亮色填充' },
      { name: '--light-fill-2', usage: 'Light Fill 2 · 固定亮色二级填充' },
      { name: '--light-fill-3', usage: 'Light Fill 3 · 固定亮色三级填充' },
      { name: '--light-fill-4', usage: 'Light Fill 4 · 固定亮色四级填充' },
      { name: '--light-fill-5', usage: 'Light Fill 5 · 固定亮色五级填充' },
      { name: '--dark-fill-1', usage: 'Dark Fill 1 · 固定暗色填充' },
      { name: '--dark-fill-2', usage: 'Dark Fill 2 · 固定暗色二级填充' },
      { name: '--dark-fill-3', usage: 'Dark Fill 3 · 固定暗色三级填充' },
      { name: '--dark-fill-4', usage: 'Dark Fill 4 · 固定暗色四级填充' },
      { name: '--dark-fill-5', usage: 'Dark Fill 5 · 固定暗色五级填充' },
      { name: '--light-separator', usage: 'Light Separator · 固定亮色描边' },
      { name: '--light-separator-2', usage: 'Light Separator 2 · 固定亮色二级描边' },
      { name: '--dark-separator', usage: 'Dark Separator · 固定暗色描边' },
      { name: '--dark-separator-2', usage: 'Dark Separator 2 · 固定暗色二级描边' },
      { name: '--always-white', usage: 'White · 固定白色' },
      { name: '--always-black', usage: 'Black · 固定黑色' },
    ],
  },
]

export const spacingTokens: TokenItem[] = [
  { name: '--space-1', usage: '4px · 微调' },
  { name: '--space-2', usage: '8px · 紧凑间距' },
  { name: '--space-3', usage: '12px · 小元素内边距' },
  { name: '--space-4', usage: '16px · 常规间距' },
  { name: '--space-5', usage: '20px · 关联区块间距' },
  { name: '--space-6', usage: '24px · 常规页面内边距' },
  { name: '--space-7', usage: '32px · 模块间距' },
  { name: '--space-8', usage: '40px · 大区块间距' },
  { name: '--space-9', usage: '48px · 区域留白' },
  { name: '--space-10', usage: '64px · 大段留白' },
]

export const radiusTokens: TokenItem[] = [
  { name: '--radius-bubble', usage: '22px · 气泡' },
  { name: '--radius-ai-card', usage: '36px · AI 富文本卡片' },
  { name: '--radius-inner-card', usage: '14px · 卡片内元素' },
  { name: '--radius-tag', usage: '20px · 标签' },
  { name: '--radius-input', usage: '16px · 输入框' },
  { name: '--radius-option', usage: '12px · 选项标签' },
  { name: '--radius-cta', usage: '24px · CTA 按钮' },
  { name: '--radius-workflow-card', usage: '24px · 文档站卡片与工作流组合卡片' },
  { name: '--radius-input-container', usage: '28px 28px 0 0 · 输入栏容器' },
  { name: '--radius-sheet', usage: '20px 20px 0 0 · 底部弹窗' },
  { name: '--radius-community-card', usage: '8px · 社区笔记卡片' },
]

export const motionTokens: TokenItem[] = [
  { name: '--duration-in', usage: '250ms · 元素入场' },
  { name: '--duration-expand', usage: '350ms · 内容展开' },
  { name: '--duration-delayed-in', usage: '300ms · 延迟入场' },
  { name: '--duration-out', usage: '250ms · 元素退场' },
  { name: '--duration-sheet', usage: '400ms · 弹窗/底部弹窗出入场' },
  { name: '--duration-morph', usage: '800ms · 大幅共享元素形变' },
  { name: '--curve-out', usage: '通用出场/进入' },
  { name: '--curve-spring', usage: '弹性效果' },
  { name: '--curve-morph-spring', usage: '欠阻尼形变弹簧 · 双向越界后回稳' },
  { name: '--press-scale-min', usage: '0.95 · 按压缩放下限' },
  { name: '--press-scale-max', usage: '0.97 · 按压缩放上限' },
  { name: '--press-opacity', usage: '0.5 · 按压透明度' },
]

export type TypographyItem = {
  name: string
  size: string
  weight: string
  lineHeight: string
  usage: string
}

export const typographyTokens: TypographyItem[] = [
  { name: 'Rich-H1', size: '20pt', weight: '600', lineHeight: '34pt', usage: '富文本总标题' },
  { name: 'Rich-H2', size: '18pt', weight: '600', lineHeight: '31pt', usage: '富文本一级模块标题' },
  { name: 'Rich-H3', size: '17pt', weight: '600', lineHeight: '29pt', usage: '富文本二级模块标题' },
  { name: 'Rich-H4', size: '16pt', weight: '600', lineHeight: '27pt', usage: '富文本三级模块标题' },
  { name: 'Rich-Paragraph', size: '16pt', weight: '400', lineHeight: '27pt', usage: '段落、列表、引用' },
  { name: 'Rich-Table', size: '14pt', weight: '400', lineHeight: '24pt', usage: '表格内容' },
  { name: 'Dialog-Bubble', size: '16px', weight: '400', lineHeight: '1.69em', usage: '对话气泡正文' },
  { name: 'Dialog-Input', size: '16px', weight: '400', lineHeight: '48px', usage: '输入框文字' },
  { name: 'Dialog-Time', size: '13px', weight: '400', lineHeight: '18px', usage: '时间标签' },
  { name: 'Community-Card-Title', size: '14px', weight: '500', lineHeight: '20px', usage: '社区卡片标题' },
  { name: 'Support', size: '12px', weight: '400', lineHeight: '17px', usage: '辅助文字' },
]
