import { type OmniCallResponse } from './omni.js';
export declare function readOmniProviderResponse(response: Response, modelId: string, signal?: AbortSignal): Promise<OmniCallResponse>;
