import type { Volatile } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import { type OmniPreferences, type MediaSenseLocalModel, type MediaSenseModelSource } from './api/index.js';
export declare const SETTINGS_ID = "media-sense";
export type LocalModel = MediaSenseLocalModel & {
    apiKey: string;
};
export type ModelSource = 'local' | 'host';
export interface Config {
    storagePath?: string;
    settingsId?: string;
    preferences: Volatile<Record<string, OmniPreferences>>;
    source?: Volatile<ModelSource | ''>;
    localModels?: Volatile<LocalModel[]>;
    lastSourceScope?: Volatile<string>;
}
export interface RuntimeConfig extends Config {
    externalSource?: MediaSenseModelSource | undefined;
    write?: (patch: object) => Promise<void>;
}
export declare const Config: z;
export declare function sourceOf(config: RuntimeConfig): ModelSource;
export declare function preferenceScope(config: RuntimeConfig, source: ModelSource): string;
export declare function preferencesOf(config: RuntimeConfig, source?: ModelSource): OmniPreferences;
