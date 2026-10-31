# 图片来源

[← 回到首页](../../README.md)

| 文件 | 来源 |
| --- | --- |
| `media-sense-hero.png` | 使用 Codex 内置 imagegen 生成的介绍插画，不是应用截图 |
| `settings-overview.jpg` | DSH 0.2.1-rc.5 的真实 Media Sense 设置页面 |
| `model-setup.jpg` | 同一运行实例中的真实模型配置页面 |
| `audio-understanding.jpg` | DSH Desktop 已完成会话中的音频理解结果，展示测试配音的时间戳转写与摘要 |
| `video-understanding.jpg` | 同一会话中的视频理解结果，展示东京夜景视频的对白翻译、画面顺序与总结 |

设置页和模型配置截图使用独立、空白的演示环境，API Key 留空，不代表已对图中模型执行推理测试。

两张理解结果截图直接取自 DSH Desktop 的实际会话，未改写画面中的提问或模型回答。视频调用记录确认使用 `media_sense_call`，媒体模型为 `gemini-3.8-flash`；输入框中的 DeepSeek 是主对话模型。截图前收起会话侧栏、文件预览和调用详情，避开账号、个人路径与凭据。这里只发布结果截图，不包含原始音视频。

## 封面生成提示词

```text
Use case: ads-marketing.
Asset type: a wide GitHub README hero illustration for the open-source plugin Media Sense, approximately 2.4:1 aspect ratio.
Primary request: a playful, memorable product introduction, with the exact Chinese headline "给 DSH 装上耳朵和眼睛" and the product name "MEDIA SENSE". This plugin gives DeepSeek Harness audio/video understanding and FFmpeg setup.
Style: a beautifully art-directed editorial sticker illustration, crisp heavy dark outlines, warm ivory paper background with extremely faint grid, cobalt blue and sunny yellow with a small coral accent. Fun but designed, substantial negative space, not a corporate dashboard.
Composition: large highly legible "MEDIA SENSE" typography in the left half, with the exact headline below. On the right, a single charming chunky video-camera character with expressive eyes wearing oversized headphones, surrounded by a small audio waveform and a floating film strip. A tasteful tiny caption "Audio · Video · FFmpeg" may appear at the bottom.
Constraints: do not render a fake application UI or a fake screenshot; this is clearly an illustration. No DeepSeek logo, no unrelated brand marks, no personal information, no watermark, no other copy. Keep all text and art inset from the edges, balanced for a README header. Render the two required text strings accurately, no gibberish.
```
