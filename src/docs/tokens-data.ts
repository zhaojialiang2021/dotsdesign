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
      { name: '--bg-base', usage: 'Bg · 主背景色，对话流等一级界面' },
      { name: '--bg-1', usage: 'Bg 1 · 底部栏、导航栏背景' },
      { name: '--bg-2', usage: 'Bg 2 · 键盘升起低栏背景' },
      { name: '--bg-3', usage: 'Bg 3 · 半屏、弹窗、弹出层背景' },
      { name: '--bg-mask-1', usage: 'Mask Bg 1 · 浅遮罩' },
      { name: '--bg-mask-2', usage: 'Mask Bg 2 · 深遮罩' },
      { name: '--bg-light', usage: 'Bg Light · 纯白背景' },
      { name: '--bg-black', usage: 'Bg Black · 纯黑背景' },
    ],
  },
  {
    title: 'Labels · 文字',
    tokens: [
      { name: '--title', usage: 'Title · 一级标题、对话流文本' },
      { name: '--paragraph', usage: 'Paragraph · 段落、二级标题、icon' },
      { name: '--description', usage: 'Description · 描述、未选中字色' },
      { name: '--description-lighter', usage: 'Description Lighter · 更弱描述' },
      { name: '--placeholder', usage: 'Placeholder · 输入栏、loading 占位文字' },
      { name: '--disabled', usage: 'Disabled · 禁用色' },
      { name: '--link', usage: 'Link · 文字链' },
    ],
  },
  {
    title: 'Fills · 填充',
    tokens: [
      { name: '--fill-1', usage: 'Fill 1 · loading 气泡等色' },
      { name: '--fill-2', usage: 'Fill 2 · 富文本、分享卡悬浮容器底色' },
      { name: '--fill-3', usage: 'Fill 3' },
      { name: '--fill-4', usage: 'Fill 4' },
      { name: '--fill-5', usage: 'Fill 5 · AI 卡片/富文本背景' },
      { name: '--fill-a', usage: 'Fill A · 输入框、模型侧气泡底色' },
      { name: '--fill-b', usage: 'Fill B · 用户侧气泡/轻提示底色' },
      { name: '--fill-c', usage: 'Fill C · 长按面板底色' },
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
      { name: '--separator-base', usage: 'Separator · 用户侧气泡描边' },
      { name: '--separator-2', usage: 'Separator 2 · 模型侧气泡、容器描边' },
      { name: '--separator-3', usage: 'Separator 3 · query 气泡、输入框描边' },
      { name: '--separator-4', usage: 'Separator 4 · 容器白色描边' },
      { name: '--separator-light-1', usage: 'Light Separator 1' },
      { name: '--separator-light-2', usage: 'Light Separator 2' },
      { name: '--separator-light-3', usage: 'Light Separator 3' },
      { name: '--separator-light-4', usage: 'Light Separator 4' },
      { name: '--separator-light-5', usage: 'Light Separator 5' },
    ],
  },
  {
    title: 'Primary / Community',
    tokens: [
      { name: '--info-base', usage: 'info · 富文本黄色' },
      { name: '--info-2', usage: 'info 2 · 富文本蓝色' },
      { name: '--info-3', usage: 'info 3 · 富文本灰色' },
      { name: '--info-4', usage: 'info 4 · 文本选中绿色' },
      { name: '--info-5', usage: 'info 5 · 点点品牌主色/CTA' },
      { name: '--info-6', usage: 'info 6 · 文本选中分割栏绿色' },
      { name: '--primary', usage: '小红书社区红，仅限社区关注/发布场景' },
    ],
  },
]

export const spacingTokens: TokenItem[] = [
  { name: '--phone-width', usage: '430px · iOS 大屏设计稿宽度' },
  { name: '--phone-height', usage: '932px · iOS 大屏设计稿高度' },
  { name: '--phone-radius', usage: '54px · 模拟真机外壳圆角' },
  { name: '--safe-top', usage: '59px · 状态栏/安全区顶部' },
  { name: '--safe-bottom', usage: '34px · 底部安全区' },
  { name: '--safe-nav', usage: '65px · 导航栏高度' },
  { name: '--dialog-flow-padding-x', usage: '12px · 对话流左右 padding' },
  { name: '--dialog-gap-cross-side', usage: '20px · 不同侧消息间距' },
  { name: '--dialog-gap-tail', usage: '26px · 有引脚的消息间距' },
  { name: '--dialog-gap-ai', usage: '16px · AI 连续消息间距' },
  { name: '--dialog-gap-user', usage: '8px · 用户连续消息间距' },
  { name: '--dialog-bubble-max', usage: '346px · 气泡最大宽度' },
  { name: '--rich-gap-level-1', usage: '32pt · 富文本一级模块间距' },
  { name: '--rich-gap-level-2', usage: '22pt · 富文本二级模块间距' },
  { name: '--rich-gap-level-3', usage: '16pt · 富文本三级模块间距' },
]

export const radiusTokens: TokenItem[] = [
  { name: '--radius-bubble', usage: '22px · 气泡' },
  { name: '--radius-ai-card', usage: '36px · AI 富文本卡片' },
  { name: '--radius-inner-card', usage: '14px · 卡片内元素' },
  { name: '--radius-tag', usage: '20px · 标签' },
  { name: '--radius-input', usage: '16px · 输入框' },
  { name: '--radius-option', usage: '12px · 选项标签' },
  { name: '--radius-cta', usage: '24px · CTA 按钮' },
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
  { name: '--curve-out', usage: '通用出场/进入' },
  { name: '--curve-spring', usage: '弹性效果' },
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
