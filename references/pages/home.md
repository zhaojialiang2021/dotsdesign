# Docs Landing 首页

> status: draft
> last_updated: 2026-06-25
> route: `#/docs`
> source: `src/docs/pages/LandingPage.tsx`

首页不是 Dots App 聊天页，而是点点设计系统的文档入口。它负责说明这套系统如何把设计文档、组件 Harness、页面 demo 和上线流程放进同一个工作台。

---

## 页面目标

- 让首次进入的人立即知道：这是「为 AI 工作流创建的设计系统」。
- 默认中文展示，支持中英文切换；导航高度和样式在首页、设计系统页、构建的思考页之间保持一致。
- 首页只保留一个主入口按钮：`立即查看`，进入 `#/docs/intro`。

---

## 页面结构

```
Docs Landing
├── 顶部导航
│   ├── dots Design
│   ├── 设计系统
│   ├── 构建的思考
│   ├── 主题切换
│   └── 中英文切换
├── Hero
│   ├── kicker: 点点设计系统
│   ├── title: 为AI工作流 / 创建的设计系统
│   ├── lead
│   └── CTA: 立即查看
├── Intro
│   ├── 左侧标题与说明
│   └── 右侧整张插画背景
├── 四个同构入口卡片
└── Footer
    └── dots studio logo
```

---

## Hero

| 元素 | 规格 |
|------|------|
| 背景 | `info 5` 的浅品牌氛围色，纯色，不使用 ASCII 动画或额外装饰背景 |
| 标题 | 两行固定换行：`为AI工作流` / `创建的设计系统` |
| 正文 | 说明「文档是源头，demo 是验证，代码是最终交付」 |
| CTA | 单按钮 `立即查看`，黑色实心，指向 `#/docs/intro` |
| 字体 | 首页属于文档展示 UI：中文用 `GlowSans SC`，英文用 `PhonicTrial` |

禁止恢复双按钮；禁止把右侧 ASCII 背景动画加回来。

---

## Intro 插画区

左侧为「点点设计系统」标题和说明文字，右侧使用 `dots-landing-2.jpg` 作为整张铺开的插画背景。图片区域承担视觉主信号，不再叠加三张小卡片。

插画区域与左侧文字需要有明确对齐关系：整体分栏边界、入口卡片左边距保持同一套页面节奏。

---

## 入口卡片

入口卡片为四等分网格，每个小容器内部结构必须一致：

| Eyebrow | Title | Description | Link |
|------|------|------|------|
| 设计文档 | 设计系统 | 令牌、原则、组件和页面都写成可执行文档。 | `#/docs/intro` |
| 点点 App | 页面 Demo | 点点对话页作为第一条业务验证链路。 | `#/docs/pages/dotted-demo` |
| 可复用界面 | 组件 · N | 把高频界面单元沉淀成可复用规格。 | 第一个组件页 |
| 流程记录 | 构建笔记 | 记录这套设计工作流如何被搭出来。 | `#/docs/writing` |

卡片 hover 只把背景切到纯白，不做彩色 tile 或夸张动效。上下分割线使用同一套细线，不允许出现比其他分割线更粗的线。

---

## Footer

Footer 只保留左侧 `dots studio` logo。联系信息、邮箱、二维码、小红书号模块全部移除。

模块上下 padding 各 60px，保持轻量收口；不做大面积留白。

---

## 依赖资源

| 资源 | 用途 |
|------|------|
| `dots-landing-2.jpg` | Intro 右侧整张背景插画 |
| `dots-studio-footer-logo.png` | Footer logo |
| `dotapplogo.svg` | 浏览器标签页 icon |
| `GlowSans SC` | 文档展示中文 |
| `PhonicTrial` | 文档展示英文 |
| `SaansMono-TRIAL` | 代码、route、token 等等宽内容 |

组件规范与 Dots App Demo 不继承展示字体，必须回到 `PingFang SC`。
