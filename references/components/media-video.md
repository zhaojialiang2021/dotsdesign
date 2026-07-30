# MediaVideo 回答流视频

> status: draft
> last_updated: 2026-07-30
> Figma 参考：`7月方案` 节点 `2045:27630`（竖版）、`2045:27750`（横版）。

MediaVideo 是插入 AI response 正文内容流的视频组件。竖版和横版均展示作者、声音、播放和时长控件。

## Harness 定义

- 语义：用视频补充相邻回答，点击后进入播放器。
- 生成规则：方向由媒体元数据提供；竖版 3:4，横版 16:9。
- 验证方式：检查固定尺寸、圆角、原始导出图标、控件位置、右上时长和独立切换状态。

文档实时预览沿用 ProcessIndicator 的扁平页面结构，竖版与横版直接铺开。

## Props

```tsx
<DotsMediaVideo
  video={{ src, label, orientation, duration, author, avatar }}
  onClick={openVideo}
  onMutedChange={setMuted}
  onPlayingChange={setPlaying}
/>
```

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `video.src` | `string` | 是 | 可播放的视频文件地址。 |
| `video.label` | `string` | 是 | 视频无障碍名称。 |
| `video.orientation` | `portrait / landscape` | 是 | 由媒体元数据提供。 |
| `video.duration` | `string` | 否 | 右上角时长。 |
| `video.author` | `string` | 否 | 底部作者名。 |
| `video.avatar` | `string` | 否 | 18px 作者头像。 |
| `onClick` | `() => void` | 否 | 点击封面打开播放器。 |
| `initialMuted` | `boolean` | 否 | 初始静音状态，默认 `true`。 |
| `initialPlaying` | `boolean` | 否 | 初始播放状态，默认 `false`。 |
| `onMutedChange` | `(muted) => void` | 否 | 声音状态变化。 |
| `onPlayingChange` | `(playing) => void` | 否 | 播放状态变化。 |

## 布局

| 场景 | 规格 |
|------|------|
| 竖版 | 240 × 320px，3:4，圆角 22px |
| 横版 | 329 × 185.0625px，16:9，圆角 22px |
| 描边 | 0.5px Separator |
| 封面 | `object-fit: cover` |

两种方向底部均使用透明到黑色 20% 的渐变，内边距 16px。头像、声音和播放控件均占 18px 控件框；头像与作者名间距 6px，作者信息与右侧控件间距 16px。作者文字为 12/18 Regular。

右上角局部遮罩为 60 × 40px；时长距离顶部和右侧均为 12px，使用 11/16 Medium。

## 交互与触觉

- 点击封面触发 `light`，进入播放器。
- 视频默认暂停，时间停在 `00:00`；只有点击播放按钮后才开始播放和计时。
- 不传独立 `poster`；默认预加载视频并以第一帧作为封面。
- 为避开编码开头的空白帧，初始停帧前移至 `0.1s`，界面时间仍按 `00:00` 显示。
- 点击声音按钮在静音与有声图标间切换。
- 点击播放按钮在暂停与播放图标间切换。
- 两个控件独立响应，不冒泡触发封面动作。
- 同一视频源在竖版容器中按 3:4 裁切，在横版容器中按 16:9 居中裁切。
- 右上角显示真实已播放时间；从 `00:00` 正向累计，暂停时停止，循环开始时回到 `00:00`。
- 封面和图标不可拖动。
- 整个视频卡提供明确的播放无障碍名称。

## 验收清单

- [ ] 竖版尺寸 240 × 320px、比例 3:4、圆角 22px。
- [ ] 横版尺寸 329 × 185.0625px、比例 16:9、圆角 22px。
- [ ] 两种方向的底部渐变、作者信息、声音与播放图标位置正确。
- [ ] 时长为 11/16 Medium，距离顶部和右侧 12px。
- [ ] 控件使用 Figma 导出的原始 SVG 路径。
- [ ] 声音和播放按钮可独立切换。
- [ ] 右上角已播放时间与真实播放进度同步。
