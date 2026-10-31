import type { Context } from '@deepseek-ai/cordis';
import type { FsTarget, FsVersion } from '@deepseek-ai/dsh-fs';
import type { ToolExecution } from '@deepseek-ai/dsh-tools';
import { type OmniFile, type OmniKind, type OmniFileMetadata } from './api/index.js';
export declare function mediaType(path: string): OmniFile['mimeType'];
export declare function mediaKind(mime: string): OmniKind;
export interface LocalMedia extends OmniFileMetadata {
    target: FsTarget;
    version: FsVersion;
}
export declare function mediaMetadata(file: LocalMedia): OmniFileMetadata;
/** 只检查元信息，大文件内容由文件服务分块读取，沿用原有访问边界。 */
export declare function inspectMedia(ctx: Context, paths: string[], exec: ToolExecution, limitMB?: number): Promise<LocalMedia[]>;
export declare function readMedia(ctx: Context, files: LocalMedia[], signal: AbortSignal): Promise<OmniFile[]>;
