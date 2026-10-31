export { modelVendors, modelVendorSdkVersion } from './model-vendors.generated.js';
export declare function modelVendorId(value: string): string;
/** 模型厂商的展示名称，独立于请求适配器和协议。 */
export declare function modelVendorLabel(id: string, name: string, provider: string): string;
