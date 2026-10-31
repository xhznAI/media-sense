import { type ReactNode } from 'react';
import type { OmniKind, OmniSettingsResponse } from '../api/index.js';
export declare function MediaIcon({ kind }: {
    kind: OmniKind;
}): import("react").JSX.Element;
type Model = OmniSettingsResponse['models'][number];
/** 复用客户端菜单的焦点、键盘和弹层定位，模型名称与重复的 ID 不再拼接。 */
export declare function ModelPicker({ kind, models, value, disabled, loading, onChange, children }: {
    kind: OmniKind;
    models: Model[];
    value: string;
    disabled: boolean;
    loading: boolean;
    onChange: (id: string) => void;
    children?: ReactNode;
}): import("react").JSX.Element;
export {};
