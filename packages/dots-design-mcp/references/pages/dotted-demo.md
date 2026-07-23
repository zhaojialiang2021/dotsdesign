---
name: 点点demo
status: draft
last_updated: 2026-07-21
used_by: [docs-pages, reports]
---

# 点点demo

点点demo 是 Dots 独立设计系统的页面样本，用来验证「Figma 规范 → 规格文档 → 页面 demo → GitHub → Vercel 预览」这条流程能否跑通。

本页只定义点点对话页基座和项目 demo 的页面组织方式。回答 loading、长思考、快速回答、tool call 来源展示、思考半层和来源半层的通用规则，统一见 [`answer-loading.md`](../frameworks/answer-loading.md)。

## 页面结构

1. iOS 状态栏：时间 9:41，右侧信号、Wi-Fi、电池。
2. 顶部导航：左侧返回，头像 + 标题「点点」，右侧更多。
3. 对话区：真实消息流容器，复用 `DotsMessageBubble`；项目 demo 不展示默认问候气泡。
4. 底部输入区：渐隐底座 + 48px 输入框。
5. 输入框内容：左侧语音图标，占位文案「发消息或按住说话...」，右侧相机和添加。
6. 底部标注：`内容由AI生成` + iOS home indicator。

## 页面规格

- 画板为 393×852px。
- 手机外壳圆角 48px，使用连续圆角 / squircle 裁切。
- 外壳使用 8px 纯白外描边，不占用内部画布尺寸。
- 顶部基座高 110px：状态栏 54px，导航栏 56px。
- 导航栏左右 padding 16px；返回、更多图标 24×24px；头像 24×24px，圆角 8px；标题 16px / 24px / Medium。
- 对话区从 y=110px 开始延伸到底部，左右 padding 16px，隐藏滚动条并保留触控惯性滚动。
- 对话区底部通过 128px 内边距给输入区和渐隐遮罩预留空间；内容允许进入底部渐隐区域，但不能被输入框遮挡。

## Demo 基座规则

页面级或 Pattern 级 demo 必须基于真实页面模板生成，不允许脱离页面模板另造展示基座。

对话页能力必须复用：

- `DottedDemoScreen`
- iOS 状态栏
- 点点导航栏
- 真实消息流
- `DotsMessageBubble`
- 底部输入区

汇报说明、进度控制器、切换开关和设计备注只能放在手机画板外侧，不能在手机画板内重建一套展示框架。

## 项目 Demo

`conversation-streaming` 和 `long-thinking` 属于「项目demo」一级类目。点击顶部导航「项目demo」后进入沉浸式项目 demo 页面，不使用 docs 普通顶部导航、侧栏或页面框架。页面右上角固定显示关闭入口，点击后返回 `/docs` 主页。

沉浸式页面的手机画板与右侧控制区作为一组居中展示。左右列间距默认 72px，最大宽 1062px；上下布局时手机画板、进度条和按钮共用同一条居中轴线，整体在可用视口内垂直居中。

手机画板外层不加投影，只保留圆角裁切和外描边。

## 回答 Loading Demo

回答 loading demo 使用 [`answer-loading.md`](../frameworks/answer-loading.md) 中的长思考链路和快速回答链路。

右侧控制器只承担演示控制：

- 标题：`回答loading新增长思考模式`
- 节点：`判断 / think / content / think / tool call / think / tool call / think / response / 完成`
- 初始按钮：`开始演示`
- 播放后按钮：`暂停` / `继续` + `重新开始`
- 点击节点：跳到对应状态并继续播放后续内容

控制器不展示大段说明、状态描述、旧版分步骤按钮或页脚导航。

## 真实感 Loading Demo

真实感 loading demo 是从回答 loading 长思考链路中拆出的单独 demo，聚焦一个 tool call 的真实加载过程。

页面路由：`#/docs/reports/long-thinking`

标题：`真实感 loading`

页面基座沿用点点对话页，具体电视机文案、数字滚动、卡片轮转和收起规则见 [`answer-loading.md`](../frameworks/answer-loading.md#真实感-loading-demo)。

## 切图清单

当前代码接入 `src/assets/dotted/` 下的切图资源：

| 资源名 | 用途 |
|--------|------|
| `think-back.svg` | 顶部返回 |
| `think-user-avatar.svg` | 导航头像 |
| `think-more.svg` | 顶部更多 |
| `think-status-cellular.svg` | 状态栏信号 |
| `think-status-wifi.svg` | 状态栏 Wi-Fi |
| `think-status-cap.svg` | 状态栏电池帽 |
| `think-message-voice.svg` | 输入框左侧语音入口 |
| `think-camera.svg` | 输入框相机入口 |
| `think-add-circle.svg` | 输入框添加入口 |
| `think-lottie/cloud.json` | 判断过程和 think 过程 Lottie |
| `think-lottie/pen.json` | tool call 过程 Lottie |
| `think-lottie/glass.json` | 搜索类 tool call Lottie |
| `think-response-avatar-1.png` / `think-response-avatar-2.png` | response 状态行头像 |
| `think-response-arrow.svg` | response 状态行右箭头 |
| `think-response-copy.svg` / `think-response-share.svg` / `think-response-dislike.svg` / `think-response-refresh.svg` | response 底部操作栏图标 |
| `think-descending.svg` | response 长内容快速跳到回答底部 |
| `source-logo-yt.png` / `source-logo-sailormmoon.png` / `source-logo-alice.png` / `source-logo-breeze.png` | 来源头像 |
| `source-image-*` | 来源笔记图片 |
| `source-quote.svg` / `source-like.svg` | 来源引用和点赞图标 |

## 触觉反馈

| 交互 | 意图 |
|------|------|
| 点击返回/更多 | light |
| 点击语音入口 | light |
| 按住输入框语音 | medium |
| 点击相机/添加 | light |
| 点击至底按钮 | light |
| 点击 response 状态行 | light |
| 点击思考脑雾 | light |
| 发送新消息 | success |

## 依赖组件

| 组件 | 状态 | 用途 |
|------|------|------|
| DottedDemoScreen | 已实现 | 当前点点页面模板和 project demo 基座 |
| DotsMessageBubble | 已实现 | User / Dots 文本消息气泡统一样式 |
| Card | 已实现 | response、来源卡、tool call 信息卡 |
| Sheet | draft | 思考过程和来源半层 |
| Answer Loading Framework | draft | 回答加载、长思考、快速回答和真实感 loading |

## 多宽度适配

| 宽度 | 规则 |
|------|------|
| Mobile 393px | 规范画板规格 |
| Tablet | 保持手机画板预览，不拉伸页面 |
| Desktop | 沉浸式项目 demo 居中展示手机画板和控制器 |
