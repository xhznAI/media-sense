export interface FfmpegAsset {
    readonly tool: 'ffmpeg' | 'ffprobe' | 'LICENSE' | 'README';
    readonly filename: string;
    readonly sha256: string;
    readonly bytes: number;
    readonly outputSha256: string;
    readonly outputBytes: number;
}
export declare const FFMPEG_MIRRORS: readonly ["https://cdn.npmmirror.com/binaries/ffmpeg-static", "https://registry.npmmirror.com/-/binary/ffmpeg-static"];
export declare function fileMatches(path: string, asset: FfmpegAsset): Promise<boolean>;
/** 固定地址、固定文件名与双重摘要；不解压归档路径，也不运行安装脚本。 */
export declare function downloadFfmpegAsset(asset: FfmpegAsset, target: string, signal: AbortSignal, progress: (bytes: number) => void, request?: typeof fetch): Promise<void>;
