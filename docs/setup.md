# Media Sense 配置手册

[← 回到首页](../README.md)

## 安装

使用 [GitHub](https://github.com/xhznAI/media-sense) 来源安装时，需要连接 GitHub 和软件包源。如遇下载问题，可以在安装对话框中切换安装源。

### 桌面版与 Web 界面

1. 打开 DSH 侧栏的「插件」，点击「添加插件」。
2. 在输入框粘贴以下来源，点击安装：

```text
github:xhznAI/media-sense#v0.1.1
```

3. 安装完成后启用 Media Sense。
4. 打开「设置 → Media Sense」，添加并选择模型。

### 终端安装到 Web profile

```sh
dsh plugin --profile web add github:xhznAI/media-sense#v0.1.1
```

安装后重启该 Web profile。自定义 profile 请将 `web` 替换成自己的名称；桌面版优先使用上面的界面入口，避免操作到另一套 DSH 安装。

### 本地安装包

在源码目录构建并打包，或使用已经构建好的 `.tgz` 文件；构建步骤见[开发文档](development.md)。在 DSH「添加插件」中填入 `file:/安装包的绝对路径.tgz`，也可安装到 Web profile：

```sh
dsh plugin --profile web add file:/path/to/nex-assistant-media-sense-0.1.1.tgz
```

### 更新

安装来源中的 `v0.1.1` 固定到该发布标签。新版本发布后，使用新标签安装；按当前 DSH 版本提供的更新入口操作，或卸载插件后用新来源重新安装。重新安装前自行备份模型配置，更新后检查模型选择。

## 添加模型

在「自配模型」点击「添加模型」，填写以下字段后保存。

| 字段 | 填什么 |
| --- | --- |
| 显示名称 | 便于自己辨认的名字，例如「会议录音」 |
| 模型 ID | 服务商的准确型号，参见[推荐表](../README.md#模型怎么选) |
| 接口格式 | 模型实际使用的协议，不按厂商名称猜测 |
| 接口地址 | 下面列出的基础地址，或兼容服务商给出的地址 |
| API Key | 对应服务商的 Key；无需认证的本地服务可以留空 |
| 输入能力 | 只勾选该模型实际支持的音频、视频能力 |

保存后，分别选择音频模型与视频模型。`Reasoning effort` 不确定时保留 `Default`，使用供应商默认行为。修改支持保存与撤销；已选型号不可用时会提示，不会自动替换模型。

## 接口地址

| 接口格式 | 官方基础地址或获取方式 |
| --- | --- |
| Google Gemini | `https://generativelanguage.googleapis.com` |
| OpenAI Chat Completions | `https://api.openai.com/v1` |
| Qwen Omni | 从百炼控制台复制当前地域、业务空间的 Chat Completions 基础地址，以 `/compatible-mode/v1` 结尾 |
| MiMo Omni | `https://api.xiaomimimo.com/v1` |
| Kimi Video | `https://api.moonshot.cn/v1` |
| GLM Video | `https://open.bigmodel.cn/api/paas/v4`；先确认下方兼容性限制 |

不要在基础地址后重复添加 `/chat/completions`。第三方代理必须实现所选协议的媒体字段；能调用普通文本模型并不能证明音视频兼容。

Qwen 的业务空间地址以[百炼官方文档](https://help.aliyun.com/zh/model-studio/qwen-omni)为准；Key 的地域也需对应。MiMo 的[音频](https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/audio-understanding)与[视频](https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/video-understanding)、[Kimi 视觉输入](https://platform.kimi.com/docs/guide/use-kimi-vision-model)均有官方调用示例。

## 文件大小与格式

| 限制 | 当前行为 |
| --- | --- |
| 每次素材总量 | 音频、视频分别设置，默认 **25 MB**，可按模型调整为 1–2000 MB；MB 为 1,000,000 字节 |
| 直接请求 | 完整请求体最多 **100 MB**，包含 Base64 和 JSON 开销 |
| MiMo | 单附件编码后最多 **50 MB**，原文件约 37.5 MB，前缀也计入 |
| Gemini 大文件 | 超过直接发送额度时使用 Files API，4 MiB 分块，传输总量最多 2000 MB |
| Kimi、GLM | 直接发送本地视频，不使用供应商 Files API |

上述限制同时生效，调大界面中的上限不会绕过服务商限制。Gemini 服务端必须支持文件上传、查询和删除；调用结束、失败或取消后，插件会尝试清理远端文件。参见 [Gemini Files API](https://ai.google.dev/gemini-api/docs/files)。

上传额度按模型和音视频类型分别保存，即使使用同一个模型也可以设置不同上限。自配来源与外部来源分别保存。含视频时使用视频模型与其上限计算全部附件；同时发送音频和视频时，该模型必须声明支持两种输入。

**格式注意事项：**

- 标准 OpenAI Chat Completions 音频适配只发送 WAV、MP3。
- Kimi 的 MOV、AVI、WMV 会转换为其接口要求的 MIME 名称。
- GLM 视频允许 MP4、MOV、MKV；旧 GLM-4V-Plus 另有限制：单视频最多 20 MB。
- 模型自己的格式、时长、上下文限制仍然适用。需要转码或裁剪时，可让 DSH 使用 FFmpeg。

### GLM 视频的兼容性边界

当前适配器使用本地视频的 Base64 数据，格式参考官方 [ZCode 的视频适配补丁](https://github.com/zai-org/zcode/blob/main/patches/%40ai-sdk__openai-compatible%402.0.60.patch)。但官方 [GLM-V 示例工具](https://github.com/zai-org/GLM-V/blob/main/skills/glmv-prompt-gen/scripts/prompt_gen.py)注明视频仅支持 URL，不接受 Base64；[GLM-4.6V 文档](https://docs.bigmodel.cn/cn/guide/models/vlm/glm-4.6v)的视频示例也使用 URL。

因此首页将 `glm-4.6v` 标为候选，而非已验证可用的推荐。需要先确认所用接口接受视频 Base64。本插件目前不会把本地视频上传到公开存储，也不能用一个远程 URL 替代 `files` 中的本地文件路径。

## FFmpeg

设置页会检测 FFmpeg 和 FFprobe；已有的直接复用，缺失的可点击安装。DSH 也可以调用 `media_sense_prepare_ffmpeg({})` 完成同一操作。

| 项目 | 说明 |
| --- | --- |
| 自动安装平台 | Windows x64、macOS x64 / ARM64、Linux x64 / ARM64 |
| 下载来源 | npmmirror 固定 `ffmpeg-static` 资源 `b6.1.1` |
| 校验 | SHA-256 与文件大小，附上游 LICENSE、README |
| 缓存位置 | `$DSH_HOME/tools/omni-ffmpeg` |
| 系统影响 | 不修改系统 PATH，不需要管理员权限 |

不支持自动下载的架构可以使用本机已有程序。模型理解工具本身不依赖 FFmpeg；检测、安装也不会自动转码素材。FFmpeg 二进制按需下载，不打入插件 npm 包。

## 文件与 Key

- 本次指令、选中的媒体及文件名会发送到你配置的模型服务；不附带整段会话历史或其他工具记录。
- 本地文件通过 DSH 文件服务读取，遵循宿主的文件访问权限。
- Key 由 Host 用于请求所配置的接口；读取设置时只返回 `hasApiKey`。编辑时不填新 Key 会保留原值，点击清除并保存才删除。
- 设置保存在本地。可选的 `storagePath` 支持跨 profile 共用配置，使用原子写入与仅所有者读写权限。
- FFmpeg 固定下载地址不接收模型或账号凭据。

字幕、转写结果若提示被截断，请缩短素材后重试。模型输出是否准确仍需结合原始素材核对。
