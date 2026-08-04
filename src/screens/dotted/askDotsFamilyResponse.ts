import astronomy1 from '../../assets/dotted/ask-dots-island/response/astronomy-1.png'
import astronomy2 from '../../assets/dotted/ask-dots-island/response/astronomy-2.png'
import astronomy3 from '../../assets/dotted/ask-dots-island/response/astronomy-3.png'
import greenhouse1 from '../../assets/dotted/ask-dots-island/response/greenhouse-1.png'
import greenhouse2 from '../../assets/dotted/ask-dots-island/response/greenhouse-2.png'
import greenhouse3 from '../../assets/dotted/ask-dots-island/response/greenhouse-3.png'
import natural1 from '../../assets/dotted/ask-dots-island/response/natural-1.png'
import natural2 from '../../assets/dotted/ask-dots-island/response/natural-2.png'
import natural3 from '../../assets/dotted/ask-dots-island/response/natural-3.png'
import rankAstronomy from '../../assets/dotted/ask-dots-island/response/rank-astronomy.png'
import rankGreenhouse from '../../assets/dotted/ask-dots-island/response/rank-greenhouse.png'
import rankNaturalHistory from '../../assets/dotted/ask-dots-island/response/rank-natural-history.png'
import rankWestBund from '../../assets/dotted/ask-dots-island/response/rank-west-bund.png'
import rankWorldSkills from '../../assets/dotted/ask-dots-island/response/rank-worldskills.png'
import statusArrow from '../../assets/dotted/ask-dots-island/response/status-arrow.svg'
import statusAvatar1 from '../../assets/dotted/ask-dots-island/response/status-avatar-1.png'
import statusAvatar2 from '../../assets/dotted/ask-dots-island/response/status-avatar-2.png'
import westBund1 from '../../assets/dotted/ask-dots-island/response/west-bund-1.png'
import westBund2 from '../../assets/dotted/ask-dots-island/response/west-bund-2.png'
import westBund3 from '../../assets/dotted/ask-dots-island/response/west-bund-3.png'
import worldSkills1 from '../../assets/dotted/ask-dots-island/response/worldskills-1.png'
import worldSkills2 from '../../assets/dotted/ask-dots-island/response/worldskills-2.png'
import worldSkills3 from '../../assets/dotted/ask-dots-island/response/worldskills-3.png'
import type { DottedFinalResponseBlock, DottedResponseConfig } from '../DottedDemoScreen'

const responseBlocks: DottedFinalResponseBlock[] = [
  {
    type: 'paragraph',
    text: '上海周末遛娃的选择非常丰富，我为你整理了室内科普、户外自然和商场放电三大类的好去处，你可以根据天气和孩子的兴趣来挑选：',
  },
  {
    type: 'ranking',
    items: [
      { image: rankNaturalHistory, title: '上海自然博物馆', description: '逼真恐龙会动会吼，还有化石挖掘，恐龙迷的快乐老家。', recommendation: '38% 人推荐' },
      { image: rankAstronomy, title: '上海天文馆', description: '沉浸式体验宇宙浪漫，看1:1空间站模型，还能飞越银河系。', recommendation: '27% 人推荐' },
      { image: rankGreenhouse, title: '世博温室花园', description: '全程恒温25℃的玻璃穹顶，分沙漠、雨林、峡谷三大场馆，还有儿童浅水区，夏天避暑首选。', recommendation: '24% 人推荐' },
      { image: rankWestBund, title: '西岸梦中心', description: '专为低龄宝宝设计，项目多不排队，旋转木马、小火车超友好。', recommendation: '12% 人推荐' },
      { image: rankWorldSkills, title: '世界技能博物馆', description: '由老仓库改造，互动项目超多，孩子可以体验各种职业，免费且能玩一整天。', recommendation: '8% 人推荐' },
    ],
  },
  { type: 'heading', text: '上海自然博物馆' },
  { type: 'paragraph', text: '全球顶级的自然科普地，有震撼的标本墙和恐龙模型，1.3米以下儿童免费，需提前在官微抢票。' },
  { type: 'image-row', images: [natural1, natural2, natural3] },
  { type: 'heading', text: '上海天文馆' },
  { type: 'paragraph', text: '内容极其丰富，互动体验强，但门票较难抢且距离市区较远，适合留出一整天时间。' },
  { type: 'image-row', images: [astronomy1, astronomy2, astronomy3] },
  { type: 'heading', text: '世博温室花园' },
  { type: 'paragraph', text: '全程恒温25℃的玻璃穹顶，分沙漠、雨林、峡谷三大场馆，还有儿童浅水区，夏天避暑首选。' },
  { type: 'image-row', images: [greenhouse1, greenhouse2, greenhouse3] },
  { type: 'heading', text: '西岸梦中心' },
  { type: 'paragraph', text: '免费开放式商圈，有巨型飞行员米奇装置、滨江浅滩戏水池，沿途草坪适合野餐骑行，氛围感极佳。' },
  { type: 'image-row', images: [westBund1, westBund2, westBund3] },
  { type: 'heading', text: '世界技能博物馆' },
  { type: 'paragraph', text: '位于杨浦滨江，由老仓库改造，互动项目超多，孩子可以体验各种职业，免费且能玩一整天。' },
  { type: 'image-row', images: [worldSkills1, worldSkills2, worldSkills3] },
]

const responseText = responseBlocks
  .map((block) => block.type === 'paragraph' || block.type === 'heading' || block.type === 'bullet' ? block.text : '')
  .join('')

export const askDotsFamilyResponse = {
  statusText: '搜索并总结47人真实经验',
  statusAvatars: [statusAvatar1, statusAvatar2],
  statusArrow,
  text: responseText,
  blocks: responseBlocks,
  sections: [
    { blocks: [0, 1] },
    { blocks: [2, 3, 4] },
    { blocks: [5, 6, 7] },
    { blocks: [8, 9, 10] },
    { blocks: [11, 12, 13] },
    { blocks: [14, 15, 16] },
  ],
  sourcesEnabled: false,
  imageAltPrefix: '上海周末遛娃地点',
} satisfies DottedResponseConfig
