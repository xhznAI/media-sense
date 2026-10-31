import type { OmniKind, OmniReasoningEffort, OmniReasoningPreference } from '../api/index.js';
export declare function ReasoningPicker({ kind, value, efforts, disabled, onChange }: {
    kind: OmniKind;
    value?: OmniReasoningPreference;
    efforts: OmniReasoningEffort[];
    disabled: boolean;
    onChange: (effort: OmniReasoningPreference) => void;
}): import("react").JSX.Element;
