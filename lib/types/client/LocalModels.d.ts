import type { MediaSenseSettingsWrite } from '../api/index.js';
export type LocalDraft = MediaSenseSettingsWrite['localModels'][number] & {
    hasApiKey?: boolean;
};
export declare function LocalModels({ models, disabled, onChange }: {
    models: LocalDraft[];
    disabled: boolean;
    onChange: (models: LocalDraft[]) => void;
}): import("react").JSX.Element;
