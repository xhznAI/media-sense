# Media Sense 开发与接入

[← 回到首页](../README.md)

## 本地开发

使用 Node.js 24、Corepack、pnpm 11.25.0。在插件独立目录执行：

```sh
corepack pnpm install
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

构建只使用本目录与公开 npm 依赖，不读取父仓库、Nex 包或 DSH 子模块。测试覆盖独立启动、模型保存、媒体调用、文件权限、额度和 FFmpeg。

DSH 兼容范围为 `>=0.2.1-rc.3 <0.2.2-0`，通过 `peerDependencies` 声明；开发基线固定为 `0.2.1-rc.5`。升级开发基线不必同步收紧兼容范围。扩展到新的版本系列前，需核对公开接口并验证独立构建、测试及宿主加载。

## 构建与包体积

默认构建不生成 source map。需要本地调试时可以显式开启：

```sh
MEDIA_SENSE_SOURCEMAP=1 corepack pnpm build
```

`package.json` 的 `files` 使用白名单，只包含 JS、类型声明、语言文件、Cordis patch、README 与许可证声明。即使开启调试构建，`.map` 也不会进入安装包；文档插画、截图、源代码与测试同样不打包。这是包体积控制，不是秘密保护措施。

## GitHub 发布

仓库同时保留源码和 `lib/` 编译产物。版本标签直接包含可运行文件，不设置 `prepare`、`install` 等生命周期脚本，安装者无需构建。公开仓库为 [xhznAI/media-sense](https://github.com/xhznAI/media-sense)，许可证为 MIT。

修改源码后先重新构建，再将源码与对应产物一起提交。检查及打包流程：

```sh
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
git add src lib package.json pnpm-lock.yaml README.md docs scripts LICENSE THIRD_PARTY_NOTICES.md
corepack pnpm release:check
corepack pnpm pack --pack-destination release
```

`release:check` 检查编译入口、客户端注册、安装脚本、source map 与 Git 文件范围。首次发布标签为 `v0.1.0`；后续先更新 `package.json` 版本与文档安装命令，再创建对应标签。发布标签不覆盖，后续修正使用新版本。

推送提交和标签后，用干净的 DSH profile 从 `github:xhznAI/media-sense#版本标签` 安装并验证。GitHub 安装不要求包已发布到 npm。`release/` 保留本地 `.tgz` 交付文件，不提交进 Git；需要时可作为 GitHub Release 附件上传。

## 宿主加载

`dsh.bundle.patch` 指向 `cordis.patch.yml`。Host 需要公开服务 `workingDirectory`、`tools`、`fs`、`settings`、`webServer`；浏览器端使用原生设置、UI 和语言服务。

`dsh.client.platform` 为 `web`，覆盖浏览器与 Electron 桌面承载的 Web UI，不提供纯 CLI 界面。

默认设置标识为 `media-sense`；宿主可通过 `settingsId` 指定已有条目，也可用 `storagePath` 共享不同 profile 的配置。存储内容是来源隔离标识、模型与偏好，不包含账号业务数据。

## 工具与路由

| 入口 | 行为 |
| --- | --- |
| `media_sense_call({ files, instruction })` | 读取本地音视频，返回 `{ modelId, text, truncated }` |
| `media_sense_prepare_ffmpeg({})` | 检测与补齐 FFmpeg、FFprobe |
| `GET /media-sense/settings` | 读取设置，Key 只返回存在标记 |
| `PUT /media-sense/settings` | 保存设置 |
| `GET /media-sense/ffmpeg` | 查询检测、安装状态 |
| `POST /media-sense/ffmpeg` | 执行检测或安装 |

路由由 Host 认证，写入还要求同源 JSON。媒体工具只发送当前指令与媒体，不附带会话历史或工具，也不返回隐藏思考内容。`truncated: true` 时应缩小素材范围后重试。

## 可选模型来源

公开入口 `@nex-assistant/media-sense/api` 包含 schema、能力判断及 `MediaSenseModelSource`、`MediaSenseSources` 接口。该入口仅依赖 Zod，不加载 DSH、React 或 Host。模型 `provider` 为开放字符串。

插件在 Host 提供 `mediaSenseSources` 服务：适配器实现 `MediaSenseModelSource`，调用 `register(source)` 注册，取得卸载函数。

| 来源的职责 | 约定 |
| --- | --- |
| 展示与状态 | 提供本地化名称、可用状态 |
| 模型目录 | 动态 `listModels`，声明 `inputModalities` |
| 媒体调用 | 实现 `call`，自行处理目录、访问权限与身份 |
| 来源隔离 | `scope` 在同一身份下稳定，不同身份使用不同标识 |
| 文件访问 | 只使用本次调用交付的权限读取句柄 |

一次最多接入一个外部来源；替换时先卸载旧实例。外部来源与自配模型分别保存偏好；来源不可用时保留选择，由用户重连或手动切换。没有外部来源时直接使用自配模型。

列表筛选同时考虑 `inputModalities` 与已实现协议；混合媒体要求同一模型支持全部输入。宿主的登录、计费和旧字段迁移留在适配层，插件 UI 只描述媒体与模型能力。

## 更新固定资源

```sh
# 从固定公开 AI SDK 离线生成厂商与思考参数快照，测试会检查快照
corepack pnpm reasoning:update

# 更新 FFmpeg 固定下载资源清单
corepack pnpm ffmpeg:update
```

## 市场元数据与发布

`package.json` 提供 `dsh.bundle.patch`、作者、英文简介和搜索关键词；`locale/en.json`、`locale/zh.json` 提供 `meta.title`、`meta.description`，已配置导出并包含在安装包中。

`repository`、`homepage` 和 `bugs` 指向 GitHub 仓库；`license` 为 MIT。包名与 GitHub 仓库所有者互相独立，不需要注册同名 npm scope 才能通过 Git 安装。

市场索引需要可访问的 npm 或 Git 来源，并由目标市场将其加入来源列表。本地安装、打包不会自动完成收录。参见 [DSH 官方索引生成器](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/plugin-market-generator/README.zh.md)。
