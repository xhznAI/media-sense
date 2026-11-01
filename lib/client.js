window.__ModuleLoader__.load({
	id: "@nex-assistant/media-sense",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/i18n.ts
		/** 文案原文作为类型化键，动态内容通过参数传入，不改写用户内容。 */
		const en = {
			"音视频理解与媒体工具": "Audio and video understanding and media tools",
			"模型来源": "Model source",
			"模型来源已变化，请重新加载设置后再保存。": "The model source changed. Reload settings before saving.",
			"自配模型": "Custom models",
			"外部模型": "External models",
			"此模型来源暂不可用，请重新连接或选择自配模型。": "This model source is unavailable. Reconnect or choose custom models.",
			"添加模型": "Add model",
			"添加支持音频或视频理解的模型。": "Add a model that supports audio or video understanding.",
			"新模型": "New model",
			"填写接口与模型信息": "Configure the endpoint and model",
			"显示名称": "Display name",
			"模型 ID": "Model ID",
			"接口格式": "API format",
			"接口地址": "Base URL",
			"已保存，留空保持不变": "Saved; leave blank to keep the key",
			"无需认证的本地服务可留空": "Optional for local services without authentication",
			"输入能力": "Input capabilities",
			"音频": "Audio",
			"视频": "Video",
			"请按模型实际支持的能力选择；接口格式决定可发送的音视频格式。": "Select the inputs your model supports. Available media formats depend on the API format.",
			"清除密钥": "Clear key",
			"保存后清除密钥": "Key will be cleared on save",
			"移除模型": "Remove model",
			"请检查模型名称、模型 ID、接口地址和输入能力。": "Check the model name, model ID, base URL and input capabilities.",
			"已就绪": "Ready",
			"检测失败": "Check failed",
			"版本与路径": "Version and path",
			"本机已有": "Installed on this computer",
			"Media Sense 已安装": "Installed by Media Sense",
			"检测中…": "Checking…",
			"未检测到": "Not detected",
			"正在下载安装… {percent}%": "Downloading and installing… {percent}%",
			"正在检查本机工具…": "Checking local tools…",
			"FFmpeg 安装进度": "FFmpeg installation progress",
			"重新检测": "Check again",
			"正在安装…": "Installing…",
			"重试安装": "Retry installation",
			"一键安装": "Install",
			"FFmpeg 请求失败，请重试。": "FFmpeg request failed. Please try again.",
			"当前系统暂不支持自动安装，请安装 FFmpeg 和 FFprobe 后重新检测。": "Automatic installation is not available on this platform. Install FFmpeg and FFprobe, then check again.",
			"FFmpeg 下载或校验失败，请检查网络后重试。": "FFmpeg download or verification failed. Check your connection and try again.",
			"FFmpeg 无法运行，请检查系统兼容性后重试。": "FFmpeg could not run. Check system compatibility and try again.",
			"磁盘空间不足，请清理空间后重试。": "Not enough disk space. Free up space and try again.",
			"FFmpeg 安装失败，请重试。": "FFmpeg installation failed. Please try again.",
			"此模型暂无可配置的思考强度。": "No configurable reasoning effort is available for this model.",
			"所选模型不支持此思考强度，请在 Media Sense 设置中重新选择。": "The selected model does not support this reasoning effort. Choose another in Media Sense settings.",
			"音频模型": "Audio model",
			"视频模型": "Video model",
			"正在读取模型…": "Loading models…",
			"自动选择（列表第一项）": "Automatic (first available model)",
			"暂无可用模型": "No models available",
			"语音转写与音频内容理解": "Transcription and audio understanding",
			"画面分析与视频片段理解": "Visual analysis and video understanding",
			"已选模型不可用，请重新选择。": "The selected model is unavailable. Please choose another.",
			"Media Sense 设置暂时不可用": "Media Sense settings are temporarily unavailable",
			"选择音频与视频理解使用的模型。": "Choose models for audio and video understanding.",
			"重新加载": "Reload",
			"重试": "Retry",
			"上传上限": "Upload limit",
			"音频模型上传上限": "Audio model upload limit",
			"视频模型上传上限": "Video model upload limit",
			"请输入 1–2000 的整数。": "Enter a whole number from 1 to 2000.",
			"默认 {size} MB，音频和视频分别设置；包含视频时，按视频上限计算全部附件。": "Defaults to {size} MB. Audio and video are configured separately; calls containing video use the video limit for all attachments.",
			"同时受模型的格式、时长与接口额度限制。": "Model format, duration and API limits also apply.",
			"有未保存的更改": "Unsaved changes",
			"媒体处理": "Media processing",
			"音视频处理与媒体信息分析": "Audio and video processing and media inspection",
			"可在这里安装，也可在任务需要时自动安装。": "Install here, or automatically when a task needs it.",
			"已保存": "Saved",
			"撤销更改": "Discard changes",
			"正在保存…": "Saving…",
			"保存更改": "Save changes",
			"模型目录暂时不可用": "The model catalog is unavailable",
			"请求来源无效": "Invalid request origin",
			"设置请求过大": "The settings request is too large",
			"所选音频模型不可用。": "The selected audio model is unavailable.",
			"所选视频模型不可用。": "The selected video model is unavailable.",
			"Media Sense 设置读取失败": "Failed to load Media Sense settings"
		};
		const zh = Object.fromEntries(Object.keys(en).map((key) => [key, key]));
		let locale;
		const subscribe = (listener) => locale?.subscribe(listener) ?? (() => {});
		const snapshot = () => locale?.getSnapshot().revision ?? 0;
		function useLocale() {
			(0, react.useSyncExternalStore)(subscribe, snapshot);
		}
		function installLocale(ctx) {
			locale = ctx.locale;
			ctx.effect(() => ctx.locale.register("media-sense", {
				zh,
				en
			}));
			ctx.effect(() => () => {
				if (locale === ctx.locale) locale = void 0;
			});
		}
		function tr(key, params = {}) {
			const values = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]));
			return locale ? locale.bind("media-sense")(key, values) : key.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
		}
		/** 仅供本插件产生的状态和错误使用，外部诊断原样保留。 */
		function message(value) {
			const prefix = value.startsWith("Error: ") ? "Error: " : "";
			const body = value.slice(prefix.length);
			for (const key of Object.keys(en)) if (body === key || body === en[key]) return prefix + tr(key);
			for (const key of Object.keys(en)) for (const template of [key, en[key]]) {
				const names = [];
				const parts = template.split(/(\{\w+\})/g).map((part) => {
					if (/^\{\w+\}$/.test(part)) {
						names.push(part.slice(1, -1));
						return "([\\s\\S]*?)";
					}
					return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
				});
				if (!names.length) continue;
				const match = new RegExp("^" + parts.join("") + "$").exec(body);
				if (match) return prefix + tr(key, Object.fromEntries(names.map((name, index) => [name, match[index + 1]])));
			}
			return value;
		}
		function localeTag() {
			return locale?.getSnapshot().active === "zh" ? "zh-CN" : "en-US";
		}
		//#endregion
		//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
		var util;
		(function(util) {
			util.assertEqual = (_) => {};
			function assertIs(_arg) {}
			util.assertIs = assertIs;
			function assertNever(_x) {
				throw new Error();
			}
			util.assertNever = assertNever;
			util.arrayToEnum = (items) => {
				const obj = {};
				for (const item of items) obj[item] = item;
				return obj;
			};
			util.getValidEnumValues = (obj) => {
				const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
				const filtered = {};
				for (const k of validKeys) filtered[k] = obj[k];
				return util.objectValues(filtered);
			};
			util.objectValues = (obj) => {
				return util.objectKeys(obj).map(function(e) {
					return obj[e];
				});
			};
			util.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
				const keys = [];
				for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key)) keys.push(key);
				return keys;
			};
			util.find = (arr, checker) => {
				for (const item of arr) if (checker(item)) return item;
			};
			util.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
			function joinValues(array, separator = " | ") {
				return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
			}
			util.joinValues = joinValues;
			util.jsonStringifyReplacer = (_, value) => {
				if (typeof value === "bigint") return value.toString();
				return value;
			};
		})(util || (util = {}));
		var objectUtil;
		(function(objectUtil) {
			objectUtil.mergeShapes = (first, second) => {
				return {
					...first,
					...second
				};
			};
		})(objectUtil || (objectUtil = {}));
		const ZodParsedType = util.arrayToEnum([
			"string",
			"nan",
			"number",
			"integer",
			"float",
			"boolean",
			"date",
			"bigint",
			"symbol",
			"function",
			"undefined",
			"null",
			"array",
			"object",
			"unknown",
			"promise",
			"void",
			"never",
			"map",
			"set"
		]);
		const getParsedType = (data) => {
			switch (typeof data) {
				case "undefined": return ZodParsedType.undefined;
				case "string": return ZodParsedType.string;
				case "number": return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
				case "boolean": return ZodParsedType.boolean;
				case "function": return ZodParsedType.function;
				case "bigint": return ZodParsedType.bigint;
				case "symbol": return ZodParsedType.symbol;
				case "object":
					if (Array.isArray(data)) return ZodParsedType.array;
					if (data === null) return ZodParsedType.null;
					if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return ZodParsedType.promise;
					if (typeof Map !== "undefined" && data instanceof Map) return ZodParsedType.map;
					if (typeof Set !== "undefined" && data instanceof Set) return ZodParsedType.set;
					if (typeof Date !== "undefined" && data instanceof Date) return ZodParsedType.date;
					return ZodParsedType.object;
				default: return ZodParsedType.unknown;
			}
		};
		//#endregion
		//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js
		const ZodIssueCode = util.arrayToEnum([
			"invalid_type",
			"invalid_literal",
			"custom",
			"invalid_union",
			"invalid_union_discriminator",
			"invalid_enum_value",
			"unrecognized_keys",
			"invalid_arguments",
			"invalid_return_type",
			"invalid_date",
			"invalid_string",
			"too_small",
			"too_big",
			"invalid_intersection_types",
			"not_multiple_of",
			"not_finite"
		]);
		var ZodError = class ZodError extends Error {
			get errors() {
				return this.issues;
			}
			constructor(issues) {
				super();
				this.issues = [];
				this.addIssue = (sub) => {
					this.issues = [...this.issues, sub];
				};
				this.addIssues = (subs = []) => {
					this.issues = [...this.issues, ...subs];
				};
				const actualProto = new.target.prototype;
				if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto);
				else this.__proto__ = actualProto;
				this.name = "ZodError";
				this.issues = issues;
			}
			format(_mapper) {
				const mapper = _mapper || function(issue) {
					return issue.message;
				};
				const fieldErrors = { _errors: [] };
				const processError = (error) => {
					for (const issue of error.issues) if (issue.code === "invalid_union") issue.unionErrors.map(processError);
					else if (issue.code === "invalid_return_type") processError(issue.returnTypeError);
					else if (issue.code === "invalid_arguments") processError(issue.argumentsError);
					else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < issue.path.length) {
							const el = issue.path[i];
							if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
							else {
								curr[el] = curr[el] || { _errors: [] };
								curr[el]._errors.push(mapper(issue));
							}
							curr = curr[el];
							i++;
						}
					}
				};
				processError(this);
				return fieldErrors;
			}
			static assert(value) {
				if (!(value instanceof ZodError)) throw new Error(`Not a ZodError: ${value}`);
			}
			toString() {
				return this.message;
			}
			get message() {
				return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
			}
			get isEmpty() {
				return this.issues.length === 0;
			}
			flatten(mapper = (issue) => issue.message) {
				const fieldErrors = {};
				const formErrors = [];
				for (const sub of this.issues) if (sub.path.length > 0) {
					const firstEl = sub.path[0];
					fieldErrors[firstEl] = fieldErrors[firstEl] || [];
					fieldErrors[firstEl].push(mapper(sub));
				} else formErrors.push(mapper(sub));
				return {
					formErrors,
					fieldErrors
				};
			}
			get formErrors() {
				return this.flatten();
			}
		};
		ZodError.create = (issues) => {
			return new ZodError(issues);
		};
		//#endregion
		//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
		const errorMap = (issue, _ctx) => {
			let message;
			switch (issue.code) {
				case ZodIssueCode.invalid_type:
					if (issue.received === ZodParsedType.undefined) message = "Required";
					else message = `Expected ${issue.expected}, received ${issue.received}`;
					break;
				case ZodIssueCode.invalid_literal:
					message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
					break;
				case ZodIssueCode.unrecognized_keys:
					message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
					break;
				case ZodIssueCode.invalid_union:
					message = `Invalid input`;
					break;
				case ZodIssueCode.invalid_union_discriminator:
					message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
					break;
				case ZodIssueCode.invalid_enum_value:
					message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
					break;
				case ZodIssueCode.invalid_arguments:
					message = `Invalid function arguments`;
					break;
				case ZodIssueCode.invalid_return_type:
					message = `Invalid function return type`;
					break;
				case ZodIssueCode.invalid_date:
					message = `Invalid date`;
					break;
				case ZodIssueCode.invalid_string:
					if (typeof issue.validation === "object") if ("includes" in issue.validation) {
						message = `Invalid input: must include "${issue.validation.includes}"`;
						if (typeof issue.validation.position === "number") message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
					} else if ("startsWith" in issue.validation) message = `Invalid input: must start with "${issue.validation.startsWith}"`;
					else if ("endsWith" in issue.validation) message = `Invalid input: must end with "${issue.validation.endsWith}"`;
					else util.assertNever(issue.validation);
					else if (issue.validation !== "regex") message = `Invalid ${issue.validation}`;
					else message = "Invalid";
					break;
				case ZodIssueCode.too_small:
					if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
					else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
					else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
					else if (issue.type === "bigint") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
					else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
					else message = "Invalid input";
					break;
				case ZodIssueCode.too_big:
					if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
					else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
					else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
					else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
					else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
					else message = "Invalid input";
					break;
				case ZodIssueCode.custom:
					message = `Invalid input`;
					break;
				case ZodIssueCode.invalid_intersection_types:
					message = `Intersection results could not be merged`;
					break;
				case ZodIssueCode.not_multiple_of:
					message = `Number must be a multiple of ${issue.multipleOf}`;
					break;
				case ZodIssueCode.not_finite:
					message = "Number must be finite";
					break;
				default:
					message = _ctx.defaultError;
					util.assertNever(issue);
			}
			return { message };
		};
		//#endregion
		//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js
		let overrideErrorMap = errorMap;
		function getErrorMap() {
			return overrideErrorMap;
		}
		//#endregion
		//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
		const makeIssue = (params) => {
			const { data, path, errorMaps, issueData } = params;
			const fullPath = [...path, ...issueData.path || []];
			const fullIssue = {
				...issueData,
				path: fullPath
			};
			if (issueData.message !== void 0) return {
				...issueData,
				path: fullPath,
				message: issueData.message
			};
			let errorMessage = "";
			const maps = errorMaps.filter((m) => !!m).slice().reverse();
			for (const map of maps) errorMessage = map(fullIssue, {
				data,
				defaultError: errorMessage
			}).message;
			return {
				...issueData,
				path: fullPath,
				message: errorMessage
			};
		};
		function addIssueToContext(ctx, issueData) {
			const overrideMap = getErrorMap();
			const issue = makeIssue({
				issueData,
				data: ctx.data,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					overrideMap,
					overrideMap === errorMap ? void 0 : errorMap
				].filter((x) => !!x)
			});
			ctx.common.issues.push(issue);
		}
		var ParseStatus = class ParseStatus {
			constructor() {
				this.value = "valid";
			}
			dirty() {
				if (this.value === "valid") this.value = "dirty";
			}
			abort() {
				if (this.value !== "aborted") this.value = "aborted";
			}
			static mergeArray(status, results) {
				const arrayValue = [];
				for (const s of results) {
					if (s.status === "aborted") return INVALID;
					if (s.status === "dirty") status.dirty();
					arrayValue.push(s.value);
				}
				return {
					status: status.value,
					value: arrayValue
				};
			}
			static async mergeObjectAsync(status, pairs) {
				const syncPairs = [];
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					syncPairs.push({
						key,
						value
					});
				}
				return ParseStatus.mergeObjectSync(status, syncPairs);
			}
			static mergeObjectSync(status, pairs) {
				const finalObject = {};
				for (const pair of pairs) {
					const { key, value } = pair;
					if (key.status === "aborted") return INVALID;
					if (value.status === "aborted") return INVALID;
					if (key.status === "dirty") status.dirty();
					if (value.status === "dirty") status.dirty();
					if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) finalObject[key.value] = value.value;
				}
				return {
					status: status.value,
					value: finalObject
				};
			}
		};
		const INVALID = Object.freeze({ status: "aborted" });
		const DIRTY = (value) => ({
			status: "dirty",
			value
		});
		const OK = (value) => ({
			status: "valid",
			value
		});
		const isAborted = (x) => x.status === "aborted";
		const isDirty = (x) => x.status === "dirty";
		const isValid = (x) => x.status === "valid";
		const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
		//#endregion
		//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js
		var errorUtil;
		(function(errorUtil) {
			errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
			errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
		})(errorUtil || (errorUtil = {}));
		//#endregion
		//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
		var ParseInputLazyPath = class {
			constructor(parent, value, path, key) {
				this._cachedPath = [];
				this.parent = parent;
				this.data = value;
				this._path = path;
				this._key = key;
			}
			get path() {
				if (!this._cachedPath.length) if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
				else this._cachedPath.push(...this._path, this._key);
				return this._cachedPath;
			}
		};
		const handleResult = (ctx, result) => {
			if (isValid(result)) return {
				success: true,
				data: result.value
			};
			else {
				if (!ctx.common.issues.length) throw new Error("Validation failed but no issues detected.");
				return {
					success: false,
					get error() {
						if (this._error) return this._error;
						const error = new ZodError(ctx.common.issues);
						this._error = error;
						return this._error;
					}
				};
			}
		};
		function processCreateParams(params) {
			if (!params) return {};
			const { errorMap, invalid_type_error, required_error, description } = params;
			if (errorMap && (invalid_type_error || required_error)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
			if (errorMap) return {
				errorMap,
				description
			};
			const customMap = (iss, ctx) => {
				const { message } = params;
				if (iss.code === "invalid_enum_value") return { message: message ?? ctx.defaultError };
				if (typeof ctx.data === "undefined") return { message: message ?? required_error ?? ctx.defaultError };
				if (iss.code !== "invalid_type") return { message: ctx.defaultError };
				return { message: message ?? invalid_type_error ?? ctx.defaultError };
			};
			return {
				errorMap: customMap,
				description
			};
		}
		var ZodType = class {
			get description() {
				return this._def.description;
			}
			_getType(input) {
				return getParsedType(input.data);
			}
			_getOrReturnCtx(input, ctx) {
				return ctx || {
					common: input.parent.common,
					data: input.data,
					parsedType: getParsedType(input.data),
					schemaErrorMap: this._def.errorMap,
					path: input.path,
					parent: input.parent
				};
			}
			_processInputParams(input) {
				return {
					status: new ParseStatus(),
					ctx: {
						common: input.parent.common,
						data: input.data,
						parsedType: getParsedType(input.data),
						schemaErrorMap: this._def.errorMap,
						path: input.path,
						parent: input.parent
					}
				};
			}
			_parseSync(input) {
				const result = this._parse(input);
				if (isAsync(result)) throw new Error("Synchronous parse encountered promise.");
				return result;
			}
			_parseAsync(input) {
				const result = this._parse(input);
				return Promise.resolve(result);
			}
			parse(data, params) {
				const result = this.safeParse(data, params);
				if (result.success) return result.data;
				throw result.error;
			}
			safeParse(data, params) {
				const ctx = {
					common: {
						issues: [],
						async: params?.async ?? false,
						contextualErrorMap: params?.errorMap
					},
					path: params?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data,
					parsedType: getParsedType(data)
				};
				const result = this._parseSync({
					data,
					path: ctx.path,
					parent: ctx
				});
				return handleResult(ctx, result);
			}
			"~validate"(data) {
				const ctx = {
					common: {
						issues: [],
						async: !!this["~standard"].async
					},
					path: [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data,
					parsedType: getParsedType(data)
				};
				if (!this["~standard"].async) try {
					const result = this._parseSync({
						data,
						path: [],
						parent: ctx
					});
					return isValid(result) ? { value: result.value } : { issues: ctx.common.issues };
				} catch (err) {
					if (err?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = true;
					ctx.common = {
						issues: [],
						async: true
					};
				}
				return this._parseAsync({
					data,
					path: [],
					parent: ctx
				}).then((result) => isValid(result) ? { value: result.value } : { issues: ctx.common.issues });
			}
			async parseAsync(data, params) {
				const result = await this.safeParseAsync(data, params);
				if (result.success) return result.data;
				throw result.error;
			}
			async safeParseAsync(data, params) {
				const ctx = {
					common: {
						issues: [],
						contextualErrorMap: params?.errorMap,
						async: true
					},
					path: params?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data,
					parsedType: getParsedType(data)
				};
				const maybeAsyncResult = this._parse({
					data,
					path: ctx.path,
					parent: ctx
				});
				const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
				return handleResult(ctx, result);
			}
			refine(check, message) {
				const getIssueProperties = (val) => {
					if (typeof message === "string" || typeof message === "undefined") return { message };
					else if (typeof message === "function") return message(val);
					else return message;
				};
				return this._refinement((val, ctx) => {
					const result = check(val);
					const setError = () => ctx.addIssue({
						code: ZodIssueCode.custom,
						...getIssueProperties(val)
					});
					if (typeof Promise !== "undefined" && result instanceof Promise) return result.then((data) => {
						if (!data) {
							setError();
							return false;
						} else return true;
					});
					if (!result) {
						setError();
						return false;
					} else return true;
				});
			}
			refinement(check, refinementData) {
				return this._refinement((val, ctx) => {
					if (!check(val)) {
						ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
						return false;
					} else return true;
				});
			}
			_refinement(refinement) {
				return new ZodEffects({
					schema: this,
					typeName: ZodFirstPartyTypeKind.ZodEffects,
					effect: {
						type: "refinement",
						refinement
					}
				});
			}
			superRefine(refinement) {
				return this._refinement(refinement);
			}
			constructor(def) {
				/** Alias of safeParseAsync */
				this.spa = this.safeParseAsync;
				this._def = def;
				this.parse = this.parse.bind(this);
				this.safeParse = this.safeParse.bind(this);
				this.parseAsync = this.parseAsync.bind(this);
				this.safeParseAsync = this.safeParseAsync.bind(this);
				this.spa = this.spa.bind(this);
				this.refine = this.refine.bind(this);
				this.refinement = this.refinement.bind(this);
				this.superRefine = this.superRefine.bind(this);
				this.optional = this.optional.bind(this);
				this.nullable = this.nullable.bind(this);
				this.nullish = this.nullish.bind(this);
				this.array = this.array.bind(this);
				this.promise = this.promise.bind(this);
				this.or = this.or.bind(this);
				this.and = this.and.bind(this);
				this.transform = this.transform.bind(this);
				this.brand = this.brand.bind(this);
				this.default = this.default.bind(this);
				this.catch = this.catch.bind(this);
				this.describe = this.describe.bind(this);
				this.pipe = this.pipe.bind(this);
				this.readonly = this.readonly.bind(this);
				this.isNullable = this.isNullable.bind(this);
				this.isOptional = this.isOptional.bind(this);
				this["~standard"] = {
					version: 1,
					vendor: "zod",
					validate: (data) => this["~validate"](data)
				};
			}
			optional() {
				return ZodOptional.create(this, this._def);
			}
			nullable() {
				return ZodNullable.create(this, this._def);
			}
			nullish() {
				return this.nullable().optional();
			}
			array() {
				return ZodArray.create(this);
			}
			promise() {
				return ZodPromise.create(this, this._def);
			}
			or(option) {
				return ZodUnion.create([this, option], this._def);
			}
			and(incoming) {
				return ZodIntersection.create(this, incoming, this._def);
			}
			transform(transform) {
				return new ZodEffects({
					...processCreateParams(this._def),
					schema: this,
					typeName: ZodFirstPartyTypeKind.ZodEffects,
					effect: {
						type: "transform",
						transform
					}
				});
			}
			default(def) {
				const defaultValueFunc = typeof def === "function" ? def : () => def;
				return new ZodDefault({
					...processCreateParams(this._def),
					innerType: this,
					defaultValue: defaultValueFunc,
					typeName: ZodFirstPartyTypeKind.ZodDefault
				});
			}
			brand() {
				return new ZodBranded({
					typeName: ZodFirstPartyTypeKind.ZodBranded,
					type: this,
					...processCreateParams(this._def)
				});
			}
			catch(def) {
				const catchValueFunc = typeof def === "function" ? def : () => def;
				return new ZodCatch({
					...processCreateParams(this._def),
					innerType: this,
					catchValue: catchValueFunc,
					typeName: ZodFirstPartyTypeKind.ZodCatch
				});
			}
			describe(description) {
				const This = this.constructor;
				return new This({
					...this._def,
					description
				});
			}
			pipe(target) {
				return ZodPipeline.create(this, target);
			}
			readonly() {
				return ZodReadonly.create(this);
			}
			isOptional() {
				return this.safeParse(void 0).success;
			}
			isNullable() {
				return this.safeParse(null).success;
			}
		};
		const cuidRegex = /^c[^\s-]{8,}$/i;
		const cuid2Regex = /^[0-9a-z]+$/;
		const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
		const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
		const nanoidRegex = /^[a-z0-9_-]{21}$/i;
		const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
		const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
		const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
		const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		let emojiRegex;
		const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
		const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
		const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
		const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
		const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
		const dateRegex = new RegExp(`^${dateRegexSource}$`);
		function timeRegexSource(args) {
			let secondsRegexSource = `[0-5]\\d`;
			if (args.precision) secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
			else if (args.precision == null) secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
			const secondsQuantifier = args.precision ? "+" : "?";
			return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
		}
		function timeRegex(args) {
			return new RegExp(`^${timeRegexSource(args)}$`);
		}
		function datetimeRegex(args) {
			let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
			const opts = [];
			opts.push(args.local ? `Z?` : `Z`);
			if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
			regex = `${regex}(${opts.join("|")})`;
			return new RegExp(`^${regex}$`);
		}
		function isValidIP(ip, version) {
			if ((version === "v4" || !version) && ipv4Regex.test(ip)) return true;
			if ((version === "v6" || !version) && ipv6Regex.test(ip)) return true;
			return false;
		}
		function isValidJWT(jwt, alg) {
			if (!jwtRegex.test(jwt)) return false;
			try {
				const [header] = jwt.split(".");
				if (!header) return false;
				const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
				const decoded = JSON.parse(atob(base64));
				if (typeof decoded !== "object" || decoded === null) return false;
				if ("typ" in decoded && decoded?.typ !== "JWT") return false;
				if (!decoded.alg) return false;
				if (alg && decoded.alg !== alg) return false;
				return true;
			} catch {
				return false;
			}
		}
		function isValidCidr(ip, version) {
			if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) return true;
			if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) return true;
			return false;
		}
		var ZodString = class ZodString extends ZodType {
			_parse(input) {
				if (this._def.coerce) input.data = String(input.data);
				if (this._getType(input) !== ZodParsedType.string) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.string,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const status = new ParseStatus();
				let ctx = void 0;
				for (const check of this._def.checks) if (check.kind === "min") {
					if (input.data.length < check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "string",
							inclusive: true,
							exact: false,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "max") {
					if (input.data.length > check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: check.value,
							type: "string",
							inclusive: true,
							exact: false,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "length") {
					const tooBig = input.data.length > check.value;
					const tooSmall = input.data.length < check.value;
					if (tooBig || tooSmall) {
						ctx = this._getOrReturnCtx(input, ctx);
						if (tooBig) addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: check.value,
							type: "string",
							inclusive: true,
							exact: true,
							message: check.message
						});
						else if (tooSmall) addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "string",
							inclusive: true,
							exact: true,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "email") {
					if (!emailRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "email",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "emoji") {
					if (!emojiRegex) emojiRegex = new RegExp(_emojiRegex, "u");
					if (!emojiRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "emoji",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "uuid") {
					if (!uuidRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "uuid",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "nanoid") {
					if (!nanoidRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "nanoid",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "cuid") {
					if (!cuidRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "cuid",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "cuid2") {
					if (!cuid2Regex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "cuid2",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "ulid") {
					if (!ulidRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "ulid",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "url") try {
					new URL(input.data);
				} catch {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "url",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
				else if (check.kind === "regex") {
					check.regex.lastIndex = 0;
					if (!check.regex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "regex",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "trim") input.data = input.data.trim();
				else if (check.kind === "includes") {
					if (!input.data.includes(check.value, check.position)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: {
								includes: check.value,
								position: check.position
							},
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "toLowerCase") input.data = input.data.toLowerCase();
				else if (check.kind === "toUpperCase") input.data = input.data.toUpperCase();
				else if (check.kind === "startsWith") {
					if (!input.data.startsWith(check.value)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: { startsWith: check.value },
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "endsWith") {
					if (!input.data.endsWith(check.value)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: { endsWith: check.value },
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "datetime") {
					if (!datetimeRegex(check).test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: "datetime",
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "date") {
					if (!dateRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: "date",
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "time") {
					if (!timeRegex(check).test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_string,
							validation: "time",
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "duration") {
					if (!durationRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "duration",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "ip") {
					if (!isValidIP(input.data, check.version)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "ip",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "jwt") {
					if (!isValidJWT(input.data, check.alg)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "jwt",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "cidr") {
					if (!isValidCidr(input.data, check.version)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "cidr",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "base64") {
					if (!base64Regex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "base64",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "base64url") {
					if (!base64urlRegex.test(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							validation: "base64url",
							code: ZodIssueCode.invalid_string,
							message: check.message
						});
						status.dirty();
					}
				} else util.assertNever(check);
				return {
					status: status.value,
					value: input.data
				};
			}
			_regex(regex, validation, message) {
				return this.refinement((data) => regex.test(data), {
					validation,
					code: ZodIssueCode.invalid_string,
					...errorUtil.errToObj(message)
				});
			}
			_addCheck(check) {
				return new ZodString({
					...this._def,
					checks: [...this._def.checks, check]
				});
			}
			email(message) {
				return this._addCheck({
					kind: "email",
					...errorUtil.errToObj(message)
				});
			}
			url(message) {
				return this._addCheck({
					kind: "url",
					...errorUtil.errToObj(message)
				});
			}
			emoji(message) {
				return this._addCheck({
					kind: "emoji",
					...errorUtil.errToObj(message)
				});
			}
			uuid(message) {
				return this._addCheck({
					kind: "uuid",
					...errorUtil.errToObj(message)
				});
			}
			nanoid(message) {
				return this._addCheck({
					kind: "nanoid",
					...errorUtil.errToObj(message)
				});
			}
			cuid(message) {
				return this._addCheck({
					kind: "cuid",
					...errorUtil.errToObj(message)
				});
			}
			cuid2(message) {
				return this._addCheck({
					kind: "cuid2",
					...errorUtil.errToObj(message)
				});
			}
			ulid(message) {
				return this._addCheck({
					kind: "ulid",
					...errorUtil.errToObj(message)
				});
			}
			base64(message) {
				return this._addCheck({
					kind: "base64",
					...errorUtil.errToObj(message)
				});
			}
			base64url(message) {
				return this._addCheck({
					kind: "base64url",
					...errorUtil.errToObj(message)
				});
			}
			jwt(options) {
				return this._addCheck({
					kind: "jwt",
					...errorUtil.errToObj(options)
				});
			}
			ip(options) {
				return this._addCheck({
					kind: "ip",
					...errorUtil.errToObj(options)
				});
			}
			cidr(options) {
				return this._addCheck({
					kind: "cidr",
					...errorUtil.errToObj(options)
				});
			}
			datetime(options) {
				if (typeof options === "string") return this._addCheck({
					kind: "datetime",
					precision: null,
					offset: false,
					local: false,
					message: options
				});
				return this._addCheck({
					kind: "datetime",
					precision: typeof options?.precision === "undefined" ? null : options?.precision,
					offset: options?.offset ?? false,
					local: options?.local ?? false,
					...errorUtil.errToObj(options?.message)
				});
			}
			date(message) {
				return this._addCheck({
					kind: "date",
					message
				});
			}
			time(options) {
				if (typeof options === "string") return this._addCheck({
					kind: "time",
					precision: null,
					message: options
				});
				return this._addCheck({
					kind: "time",
					precision: typeof options?.precision === "undefined" ? null : options?.precision,
					...errorUtil.errToObj(options?.message)
				});
			}
			duration(message) {
				return this._addCheck({
					kind: "duration",
					...errorUtil.errToObj(message)
				});
			}
			regex(regex, message) {
				return this._addCheck({
					kind: "regex",
					regex,
					...errorUtil.errToObj(message)
				});
			}
			includes(value, options) {
				return this._addCheck({
					kind: "includes",
					value,
					position: options?.position,
					...errorUtil.errToObj(options?.message)
				});
			}
			startsWith(value, message) {
				return this._addCheck({
					kind: "startsWith",
					value,
					...errorUtil.errToObj(message)
				});
			}
			endsWith(value, message) {
				return this._addCheck({
					kind: "endsWith",
					value,
					...errorUtil.errToObj(message)
				});
			}
			min(minLength, message) {
				return this._addCheck({
					kind: "min",
					value: minLength,
					...errorUtil.errToObj(message)
				});
			}
			max(maxLength, message) {
				return this._addCheck({
					kind: "max",
					value: maxLength,
					...errorUtil.errToObj(message)
				});
			}
			length(len, message) {
				return this._addCheck({
					kind: "length",
					value: len,
					...errorUtil.errToObj(message)
				});
			}
			/**
			* Equivalent to `.min(1)`
			*/
			nonempty(message) {
				return this.min(1, errorUtil.errToObj(message));
			}
			trim() {
				return new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "trim" }]
				});
			}
			toLowerCase() {
				return new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "toLowerCase" }]
				});
			}
			toUpperCase() {
				return new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "toUpperCase" }]
				});
			}
			get isDatetime() {
				return !!this._def.checks.find((ch) => ch.kind === "datetime");
			}
			get isDate() {
				return !!this._def.checks.find((ch) => ch.kind === "date");
			}
			get isTime() {
				return !!this._def.checks.find((ch) => ch.kind === "time");
			}
			get isDuration() {
				return !!this._def.checks.find((ch) => ch.kind === "duration");
			}
			get isEmail() {
				return !!this._def.checks.find((ch) => ch.kind === "email");
			}
			get isURL() {
				return !!this._def.checks.find((ch) => ch.kind === "url");
			}
			get isEmoji() {
				return !!this._def.checks.find((ch) => ch.kind === "emoji");
			}
			get isUUID() {
				return !!this._def.checks.find((ch) => ch.kind === "uuid");
			}
			get isNANOID() {
				return !!this._def.checks.find((ch) => ch.kind === "nanoid");
			}
			get isCUID() {
				return !!this._def.checks.find((ch) => ch.kind === "cuid");
			}
			get isCUID2() {
				return !!this._def.checks.find((ch) => ch.kind === "cuid2");
			}
			get isULID() {
				return !!this._def.checks.find((ch) => ch.kind === "ulid");
			}
			get isIP() {
				return !!this._def.checks.find((ch) => ch.kind === "ip");
			}
			get isCIDR() {
				return !!this._def.checks.find((ch) => ch.kind === "cidr");
			}
			get isBase64() {
				return !!this._def.checks.find((ch) => ch.kind === "base64");
			}
			get isBase64url() {
				return !!this._def.checks.find((ch) => ch.kind === "base64url");
			}
			get minLength() {
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				}
				return min;
			}
			get maxLength() {
				let max = null;
				for (const ch of this._def.checks) if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return max;
			}
		};
		ZodString.create = (params) => {
			return new ZodString({
				checks: [],
				typeName: ZodFirstPartyTypeKind.ZodString,
				coerce: params?.coerce ?? false,
				...processCreateParams(params)
			});
		};
		function floatSafeRemainder(val, step) {
			const valDecCount = (val.toString().split(".")[1] || "").length;
			const stepDecCount = (step.toString().split(".")[1] || "").length;
			const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
			return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
		}
		var ZodNumber = class ZodNumber extends ZodType {
			constructor() {
				super(...arguments);
				this.min = this.gte;
				this.max = this.lte;
				this.step = this.multipleOf;
			}
			_parse(input) {
				if (this._def.coerce) input.data = Number(input.data);
				if (this._getType(input) !== ZodParsedType.number) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.number,
						received: ctx.parsedType
					});
					return INVALID;
				}
				let ctx = void 0;
				const status = new ParseStatus();
				for (const check of this._def.checks) if (check.kind === "int") {
					if (!util.isInteger(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_type,
							expected: "integer",
							received: "float",
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "min") {
					if (check.inclusive ? input.data < check.value : input.data <= check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "number",
							inclusive: check.inclusive,
							exact: false,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "max") {
					if (check.inclusive ? input.data > check.value : input.data >= check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: check.value,
							type: "number",
							inclusive: check.inclusive,
							exact: false,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "multipleOf") {
					if (floatSafeRemainder(input.data, check.value) !== 0) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.not_multiple_of,
							multipleOf: check.value,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "finite") {
					if (!Number.isFinite(input.data)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.not_finite,
							message: check.message
						});
						status.dirty();
					}
				} else util.assertNever(check);
				return {
					status: status.value,
					value: input.data
				};
			}
			gte(value, message) {
				return this.setLimit("min", value, true, errorUtil.toString(message));
			}
			gt(value, message) {
				return this.setLimit("min", value, false, errorUtil.toString(message));
			}
			lte(value, message) {
				return this.setLimit("max", value, true, errorUtil.toString(message));
			}
			lt(value, message) {
				return this.setLimit("max", value, false, errorUtil.toString(message));
			}
			setLimit(kind, value, inclusive, message) {
				return new ZodNumber({
					...this._def,
					checks: [...this._def.checks, {
						kind,
						value,
						inclusive,
						message: errorUtil.toString(message)
					}]
				});
			}
			_addCheck(check) {
				return new ZodNumber({
					...this._def,
					checks: [...this._def.checks, check]
				});
			}
			int(message) {
				return this._addCheck({
					kind: "int",
					message: errorUtil.toString(message)
				});
			}
			positive(message) {
				return this._addCheck({
					kind: "min",
					value: 0,
					inclusive: false,
					message: errorUtil.toString(message)
				});
			}
			negative(message) {
				return this._addCheck({
					kind: "max",
					value: 0,
					inclusive: false,
					message: errorUtil.toString(message)
				});
			}
			nonpositive(message) {
				return this._addCheck({
					kind: "max",
					value: 0,
					inclusive: true,
					message: errorUtil.toString(message)
				});
			}
			nonnegative(message) {
				return this._addCheck({
					kind: "min",
					value: 0,
					inclusive: true,
					message: errorUtil.toString(message)
				});
			}
			multipleOf(value, message) {
				return this._addCheck({
					kind: "multipleOf",
					value,
					message: errorUtil.toString(message)
				});
			}
			finite(message) {
				return this._addCheck({
					kind: "finite",
					message: errorUtil.toString(message)
				});
			}
			safe(message) {
				return this._addCheck({
					kind: "min",
					inclusive: true,
					value: Number.MIN_SAFE_INTEGER,
					message: errorUtil.toString(message)
				})._addCheck({
					kind: "max",
					inclusive: true,
					value: Number.MAX_SAFE_INTEGER,
					message: errorUtil.toString(message)
				});
			}
			get minValue() {
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				}
				return min;
			}
			get maxValue() {
				let max = null;
				for (const ch of this._def.checks) if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return max;
			}
			get isInt() {
				return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
			}
			get isFinite() {
				let max = null;
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") return true;
				else if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				} else if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return Number.isFinite(min) && Number.isFinite(max);
			}
		};
		ZodNumber.create = (params) => {
			return new ZodNumber({
				checks: [],
				typeName: ZodFirstPartyTypeKind.ZodNumber,
				coerce: params?.coerce || false,
				...processCreateParams(params)
			});
		};
		var ZodBigInt = class ZodBigInt extends ZodType {
			constructor() {
				super(...arguments);
				this.min = this.gte;
				this.max = this.lte;
			}
			_parse(input) {
				if (this._def.coerce) try {
					input.data = BigInt(input.data);
				} catch {
					return this._getInvalidInput(input);
				}
				if (this._getType(input) !== ZodParsedType.bigint) return this._getInvalidInput(input);
				let ctx = void 0;
				const status = new ParseStatus();
				for (const check of this._def.checks) if (check.kind === "min") {
					if (check.inclusive ? input.data < check.value : input.data <= check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							type: "bigint",
							minimum: check.value,
							inclusive: check.inclusive,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "max") {
					if (check.inclusive ? input.data > check.value : input.data >= check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							type: "bigint",
							maximum: check.value,
							inclusive: check.inclusive,
							message: check.message
						});
						status.dirty();
					}
				} else if (check.kind === "multipleOf") {
					if (input.data % check.value !== BigInt(0)) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.not_multiple_of,
							multipleOf: check.value,
							message: check.message
						});
						status.dirty();
					}
				} else util.assertNever(check);
				return {
					status: status.value,
					value: input.data
				};
			}
			_getInvalidInput(input) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.bigint,
					received: ctx.parsedType
				});
				return INVALID;
			}
			gte(value, message) {
				return this.setLimit("min", value, true, errorUtil.toString(message));
			}
			gt(value, message) {
				return this.setLimit("min", value, false, errorUtil.toString(message));
			}
			lte(value, message) {
				return this.setLimit("max", value, true, errorUtil.toString(message));
			}
			lt(value, message) {
				return this.setLimit("max", value, false, errorUtil.toString(message));
			}
			setLimit(kind, value, inclusive, message) {
				return new ZodBigInt({
					...this._def,
					checks: [...this._def.checks, {
						kind,
						value,
						inclusive,
						message: errorUtil.toString(message)
					}]
				});
			}
			_addCheck(check) {
				return new ZodBigInt({
					...this._def,
					checks: [...this._def.checks, check]
				});
			}
			positive(message) {
				return this._addCheck({
					kind: "min",
					value: BigInt(0),
					inclusive: false,
					message: errorUtil.toString(message)
				});
			}
			negative(message) {
				return this._addCheck({
					kind: "max",
					value: BigInt(0),
					inclusive: false,
					message: errorUtil.toString(message)
				});
			}
			nonpositive(message) {
				return this._addCheck({
					kind: "max",
					value: BigInt(0),
					inclusive: true,
					message: errorUtil.toString(message)
				});
			}
			nonnegative(message) {
				return this._addCheck({
					kind: "min",
					value: BigInt(0),
					inclusive: true,
					message: errorUtil.toString(message)
				});
			}
			multipleOf(value, message) {
				return this._addCheck({
					kind: "multipleOf",
					value,
					message: errorUtil.toString(message)
				});
			}
			get minValue() {
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				}
				return min;
			}
			get maxValue() {
				let max = null;
				for (const ch of this._def.checks) if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return max;
			}
		};
		ZodBigInt.create = (params) => {
			return new ZodBigInt({
				checks: [],
				typeName: ZodFirstPartyTypeKind.ZodBigInt,
				coerce: params?.coerce ?? false,
				...processCreateParams(params)
			});
		};
		var ZodBoolean = class extends ZodType {
			_parse(input) {
				if (this._def.coerce) input.data = Boolean(input.data);
				if (this._getType(input) !== ZodParsedType.boolean) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.boolean,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodBoolean.create = (params) => {
			return new ZodBoolean({
				typeName: ZodFirstPartyTypeKind.ZodBoolean,
				coerce: params?.coerce || false,
				...processCreateParams(params)
			});
		};
		var ZodDate = class ZodDate extends ZodType {
			_parse(input) {
				if (this._def.coerce) input.data = new Date(input.data);
				if (this._getType(input) !== ZodParsedType.date) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.date,
						received: ctx.parsedType
					});
					return INVALID;
				}
				if (Number.isNaN(input.data.getTime())) {
					addIssueToContext(this._getOrReturnCtx(input), { code: ZodIssueCode.invalid_date });
					return INVALID;
				}
				const status = new ParseStatus();
				let ctx = void 0;
				for (const check of this._def.checks) if (check.kind === "min") {
					if (input.data.getTime() < check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							message: check.message,
							inclusive: true,
							exact: false,
							minimum: check.value,
							type: "date"
						});
						status.dirty();
					}
				} else if (check.kind === "max") {
					if (input.data.getTime() > check.value) {
						ctx = this._getOrReturnCtx(input, ctx);
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							message: check.message,
							inclusive: true,
							exact: false,
							maximum: check.value,
							type: "date"
						});
						status.dirty();
					}
				} else util.assertNever(check);
				return {
					status: status.value,
					value: new Date(input.data.getTime())
				};
			}
			_addCheck(check) {
				return new ZodDate({
					...this._def,
					checks: [...this._def.checks, check]
				});
			}
			min(minDate, message) {
				return this._addCheck({
					kind: "min",
					value: minDate.getTime(),
					message: errorUtil.toString(message)
				});
			}
			max(maxDate, message) {
				return this._addCheck({
					kind: "max",
					value: maxDate.getTime(),
					message: errorUtil.toString(message)
				});
			}
			get minDate() {
				let min = null;
				for (const ch of this._def.checks) if (ch.kind === "min") {
					if (min === null || ch.value > min) min = ch.value;
				}
				return min != null ? new Date(min) : null;
			}
			get maxDate() {
				let max = null;
				for (const ch of this._def.checks) if (ch.kind === "max") {
					if (max === null || ch.value < max) max = ch.value;
				}
				return max != null ? new Date(max) : null;
			}
		};
		ZodDate.create = (params) => {
			return new ZodDate({
				checks: [],
				coerce: params?.coerce || false,
				typeName: ZodFirstPartyTypeKind.ZodDate,
				...processCreateParams(params)
			});
		};
		var ZodSymbol = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.symbol) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.symbol,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodSymbol.create = (params) => {
			return new ZodSymbol({
				typeName: ZodFirstPartyTypeKind.ZodSymbol,
				...processCreateParams(params)
			});
		};
		var ZodUndefined = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.undefined) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.undefined,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodUndefined.create = (params) => {
			return new ZodUndefined({
				typeName: ZodFirstPartyTypeKind.ZodUndefined,
				...processCreateParams(params)
			});
		};
		var ZodNull = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.null) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.null,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodNull.create = (params) => {
			return new ZodNull({
				typeName: ZodFirstPartyTypeKind.ZodNull,
				...processCreateParams(params)
			});
		};
		var ZodAny = class extends ZodType {
			constructor() {
				super(...arguments);
				this._any = true;
			}
			_parse(input) {
				return OK(input.data);
			}
		};
		ZodAny.create = (params) => {
			return new ZodAny({
				typeName: ZodFirstPartyTypeKind.ZodAny,
				...processCreateParams(params)
			});
		};
		var ZodUnknown = class extends ZodType {
			constructor() {
				super(...arguments);
				this._unknown = true;
			}
			_parse(input) {
				return OK(input.data);
			}
		};
		ZodUnknown.create = (params) => {
			return new ZodUnknown({
				typeName: ZodFirstPartyTypeKind.ZodUnknown,
				...processCreateParams(params)
			});
		};
		var ZodNever = class extends ZodType {
			_parse(input) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.never,
					received: ctx.parsedType
				});
				return INVALID;
			}
		};
		ZodNever.create = (params) => {
			return new ZodNever({
				typeName: ZodFirstPartyTypeKind.ZodNever,
				...processCreateParams(params)
			});
		};
		var ZodVoid = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.undefined) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.void,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK(input.data);
			}
		};
		ZodVoid.create = (params) => {
			return new ZodVoid({
				typeName: ZodFirstPartyTypeKind.ZodVoid,
				...processCreateParams(params)
			});
		};
		var ZodArray = class ZodArray extends ZodType {
			_parse(input) {
				const { ctx, status } = this._processInputParams(input);
				const def = this._def;
				if (ctx.parsedType !== ZodParsedType.array) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.array,
						received: ctx.parsedType
					});
					return INVALID;
				}
				if (def.exactLength !== null) {
					const tooBig = ctx.data.length > def.exactLength.value;
					const tooSmall = ctx.data.length < def.exactLength.value;
					if (tooBig || tooSmall) {
						addIssueToContext(ctx, {
							code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
							minimum: tooSmall ? def.exactLength.value : void 0,
							maximum: tooBig ? def.exactLength.value : void 0,
							type: "array",
							inclusive: true,
							exact: true,
							message: def.exactLength.message
						});
						status.dirty();
					}
				}
				if (def.minLength !== null) {
					if (ctx.data.length < def.minLength.value) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: def.minLength.value,
							type: "array",
							inclusive: true,
							exact: false,
							message: def.minLength.message
						});
						status.dirty();
					}
				}
				if (def.maxLength !== null) {
					if (ctx.data.length > def.maxLength.value) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: def.maxLength.value,
							type: "array",
							inclusive: true,
							exact: false,
							message: def.maxLength.message
						});
						status.dirty();
					}
				}
				if (ctx.common.async) return Promise.all([...ctx.data].map((item, i) => {
					return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
				})).then((result) => {
					return ParseStatus.mergeArray(status, result);
				});
				const result = [...ctx.data].map((item, i) => {
					return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
				});
				return ParseStatus.mergeArray(status, result);
			}
			get element() {
				return this._def.type;
			}
			min(minLength, message) {
				return new ZodArray({
					...this._def,
					minLength: {
						value: minLength,
						message: errorUtil.toString(message)
					}
				});
			}
			max(maxLength, message) {
				return new ZodArray({
					...this._def,
					maxLength: {
						value: maxLength,
						message: errorUtil.toString(message)
					}
				});
			}
			length(len, message) {
				return new ZodArray({
					...this._def,
					exactLength: {
						value: len,
						message: errorUtil.toString(message)
					}
				});
			}
			nonempty(message) {
				return this.min(1, message);
			}
		};
		ZodArray.create = (schema, params) => {
			return new ZodArray({
				type: schema,
				minLength: null,
				maxLength: null,
				exactLength: null,
				typeName: ZodFirstPartyTypeKind.ZodArray,
				...processCreateParams(params)
			});
		};
		function deepPartialify(schema) {
			if (schema instanceof ZodObject) {
				const newShape = {};
				for (const key in schema.shape) {
					const fieldSchema = schema.shape[key];
					newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
				}
				return new ZodObject({
					...schema._def,
					shape: () => newShape
				});
			} else if (schema instanceof ZodArray) return new ZodArray({
				...schema._def,
				type: deepPartialify(schema.element)
			});
			else if (schema instanceof ZodOptional) return ZodOptional.create(deepPartialify(schema.unwrap()));
			else if (schema instanceof ZodNullable) return ZodNullable.create(deepPartialify(schema.unwrap()));
			else if (schema instanceof ZodTuple) return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
			else return schema;
		}
		var ZodObject = class ZodObject extends ZodType {
			constructor() {
				super(...arguments);
				this._cached = null;
				/**
				* @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
				* If you want to pass through unknown properties, use `.passthrough()` instead.
				*/
				this.nonstrict = this.passthrough;
				/**
				* @deprecated Use `.extend` instead
				*  */
				this.augment = this.extend;
			}
			_getCached() {
				if (this._cached !== null) return this._cached;
				const shape = this._def.shape();
				const keys = util.objectKeys(shape);
				this._cached = {
					shape,
					keys
				};
				return this._cached;
			}
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.object) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.object,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const { status, ctx } = this._processInputParams(input);
				const { shape, keys: shapeKeys } = this._getCached();
				const extraKeys = [];
				if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
					for (const key in ctx.data) if (!shapeKeys.includes(key)) extraKeys.push(key);
				}
				const pairs = [];
				for (const key of shapeKeys) {
					const keyValidator = shape[key];
					const value = ctx.data[key];
					pairs.push({
						key: {
							status: "valid",
							value: key
						},
						value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
						alwaysSet: key in ctx.data
					});
				}
				if (this._def.catchall instanceof ZodNever) {
					const unknownKeys = this._def.unknownKeys;
					if (unknownKeys === "passthrough") for (const key of extraKeys) pairs.push({
						key: {
							status: "valid",
							value: key
						},
						value: {
							status: "valid",
							value: ctx.data[key]
						}
					});
					else if (unknownKeys === "strict") {
						if (extraKeys.length > 0) {
							addIssueToContext(ctx, {
								code: ZodIssueCode.unrecognized_keys,
								keys: extraKeys
							});
							status.dirty();
						}
					} else if (unknownKeys === "strip") {} else throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
				} else {
					const catchall = this._def.catchall;
					for (const key of extraKeys) {
						const value = ctx.data[key];
						pairs.push({
							key: {
								status: "valid",
								value: key
							},
							value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
							alwaysSet: key in ctx.data
						});
					}
				}
				if (ctx.common.async) return Promise.resolve().then(async () => {
					const syncPairs = [];
					for (const pair of pairs) {
						const key = await pair.key;
						const value = await pair.value;
						syncPairs.push({
							key,
							value,
							alwaysSet: pair.alwaysSet
						});
					}
					return syncPairs;
				}).then((syncPairs) => {
					return ParseStatus.mergeObjectSync(status, syncPairs);
				});
				else return ParseStatus.mergeObjectSync(status, pairs);
			}
			get shape() {
				return this._def.shape();
			}
			strict(message) {
				errorUtil.errToObj;
				return new ZodObject({
					...this._def,
					unknownKeys: "strict",
					...message !== void 0 ? { errorMap: (issue, ctx) => {
						const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
						if (issue.code === "unrecognized_keys") return { message: errorUtil.errToObj(message).message ?? defaultError };
						return { message: defaultError };
					} } : {}
				});
			}
			strip() {
				return new ZodObject({
					...this._def,
					unknownKeys: "strip"
				});
			}
			passthrough() {
				return new ZodObject({
					...this._def,
					unknownKeys: "passthrough"
				});
			}
			extend(augmentation) {
				return new ZodObject({
					...this._def,
					shape: () => ({
						...this._def.shape(),
						...augmentation
					})
				});
			}
			/**
			* Prior to zod@1.0.12 there was a bug in the
			* inferred type of merged objects. Please
			* upgrade if you are experiencing issues.
			*/
			merge(merging) {
				return new ZodObject({
					unknownKeys: merging._def.unknownKeys,
					catchall: merging._def.catchall,
					shape: () => ({
						...this._def.shape(),
						...merging._def.shape()
					}),
					typeName: ZodFirstPartyTypeKind.ZodObject
				});
			}
			setKey(key, schema) {
				return this.augment({ [key]: schema });
			}
			catchall(index) {
				return new ZodObject({
					...this._def,
					catchall: index
				});
			}
			pick(mask) {
				const shape = {};
				for (const key of util.objectKeys(mask)) if (mask[key] && this.shape[key]) shape[key] = this.shape[key];
				return new ZodObject({
					...this._def,
					shape: () => shape
				});
			}
			omit(mask) {
				const shape = {};
				for (const key of util.objectKeys(this.shape)) if (!mask[key]) shape[key] = this.shape[key];
				return new ZodObject({
					...this._def,
					shape: () => shape
				});
			}
			/**
			* @deprecated
			*/
			deepPartial() {
				return deepPartialify(this);
			}
			partial(mask) {
				const newShape = {};
				for (const key of util.objectKeys(this.shape)) {
					const fieldSchema = this.shape[key];
					if (mask && !mask[key]) newShape[key] = fieldSchema;
					else newShape[key] = fieldSchema.optional();
				}
				return new ZodObject({
					...this._def,
					shape: () => newShape
				});
			}
			required(mask) {
				const newShape = {};
				for (const key of util.objectKeys(this.shape)) if (mask && !mask[key]) newShape[key] = this.shape[key];
				else {
					let newField = this.shape[key];
					while (newField instanceof ZodOptional) newField = newField._def.innerType;
					newShape[key] = newField;
				}
				return new ZodObject({
					...this._def,
					shape: () => newShape
				});
			}
			keyof() {
				return createZodEnum(util.objectKeys(this.shape));
			}
		};
		ZodObject.create = (shape, params) => {
			return new ZodObject({
				shape: () => shape,
				unknownKeys: "strip",
				catchall: ZodNever.create(),
				typeName: ZodFirstPartyTypeKind.ZodObject,
				...processCreateParams(params)
			});
		};
		ZodObject.strictCreate = (shape, params) => {
			return new ZodObject({
				shape: () => shape,
				unknownKeys: "strict",
				catchall: ZodNever.create(),
				typeName: ZodFirstPartyTypeKind.ZodObject,
				...processCreateParams(params)
			});
		};
		ZodObject.lazycreate = (shape, params) => {
			return new ZodObject({
				shape,
				unknownKeys: "strip",
				catchall: ZodNever.create(),
				typeName: ZodFirstPartyTypeKind.ZodObject,
				...processCreateParams(params)
			});
		};
		var ZodUnion = class extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				const options = this._def.options;
				function handleResults(results) {
					for (const result of results) if (result.result.status === "valid") return result.result;
					for (const result of results) if (result.result.status === "dirty") {
						ctx.common.issues.push(...result.ctx.common.issues);
						return result.result;
					}
					const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_union,
						unionErrors
					});
					return INVALID;
				}
				if (ctx.common.async) return Promise.all(options.map(async (option) => {
					const childCtx = {
						...ctx,
						common: {
							...ctx.common,
							issues: []
						},
						parent: null
					};
					return {
						result: await option._parseAsync({
							data: ctx.data,
							path: ctx.path,
							parent: childCtx
						}),
						ctx: childCtx
					};
				})).then(handleResults);
				else {
					let dirty = void 0;
					const issues = [];
					for (const option of options) {
						const childCtx = {
							...ctx,
							common: {
								...ctx.common,
								issues: []
							},
							parent: null
						};
						const result = option._parseSync({
							data: ctx.data,
							path: ctx.path,
							parent: childCtx
						});
						if (result.status === "valid") return result;
						else if (result.status === "dirty" && !dirty) dirty = {
							result,
							ctx: childCtx
						};
						if (childCtx.common.issues.length) issues.push(childCtx.common.issues);
					}
					if (dirty) {
						ctx.common.issues.push(...dirty.ctx.common.issues);
						return dirty.result;
					}
					const unionErrors = issues.map((issues) => new ZodError(issues));
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_union,
						unionErrors
					});
					return INVALID;
				}
			}
			get options() {
				return this._def.options;
			}
		};
		ZodUnion.create = (types, params) => {
			return new ZodUnion({
				options: types,
				typeName: ZodFirstPartyTypeKind.ZodUnion,
				...processCreateParams(params)
			});
		};
		const getDiscriminator = (type) => {
			if (type instanceof ZodLazy) return getDiscriminator(type.schema);
			else if (type instanceof ZodEffects) return getDiscriminator(type.innerType());
			else if (type instanceof ZodLiteral) return [type.value];
			else if (type instanceof ZodEnum) return type.options;
			else if (type instanceof ZodNativeEnum) return util.objectValues(type.enum);
			else if (type instanceof ZodDefault) return getDiscriminator(type._def.innerType);
			else if (type instanceof ZodUndefined) return [void 0];
			else if (type instanceof ZodNull) return [null];
			else if (type instanceof ZodOptional) return [void 0, ...getDiscriminator(type.unwrap())];
			else if (type instanceof ZodNullable) return [null, ...getDiscriminator(type.unwrap())];
			else if (type instanceof ZodBranded) return getDiscriminator(type.unwrap());
			else if (type instanceof ZodReadonly) return getDiscriminator(type.unwrap());
			else if (type instanceof ZodCatch) return getDiscriminator(type._def.innerType);
			else return [];
		};
		var ZodDiscriminatedUnion = class ZodDiscriminatedUnion extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.object) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.object,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const discriminator = this.discriminator;
				const discriminatorValue = ctx.data[discriminator];
				const option = this.optionsMap.get(discriminatorValue);
				if (!option) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_union_discriminator,
						options: Array.from(this.optionsMap.keys()),
						path: [discriminator]
					});
					return INVALID;
				}
				if (ctx.common.async) return option._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				else return option._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
			}
			get discriminator() {
				return this._def.discriminator;
			}
			get options() {
				return this._def.options;
			}
			get optionsMap() {
				return this._def.optionsMap;
			}
			/**
			* The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
			* However, it only allows a union of objects, all of which need to share a discriminator property. This property must
			* have a different value for each object in the union.
			* @param discriminator the name of the discriminator property
			* @param types an array of object schemas
			* @param params
			*/
			static create(discriminator, options, params) {
				const optionsMap = /* @__PURE__ */ new Map();
				for (const type of options) {
					const discriminatorValues = getDiscriminator(type.shape[discriminator]);
					if (!discriminatorValues.length) throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
					for (const value of discriminatorValues) {
						if (optionsMap.has(value)) throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
						optionsMap.set(value, type);
					}
				}
				return new ZodDiscriminatedUnion({
					typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
					discriminator,
					options,
					optionsMap,
					...processCreateParams(params)
				});
			}
		};
		function mergeValues(a, b) {
			const aType = getParsedType(a);
			const bType = getParsedType(b);
			if (a === b) return {
				valid: true,
				data: a
			};
			else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
				const bKeys = util.objectKeys(b);
				const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				for (const key of sharedKeys) {
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return { valid: false };
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
				if (a.length !== b.length) return { valid: false };
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return { valid: false };
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) return {
				valid: true,
				data: a
			};
			else return { valid: false };
		}
		var ZodIntersection = class extends ZodType {
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				const handleParsed = (parsedLeft, parsedRight) => {
					if (isAborted(parsedLeft) || isAborted(parsedRight)) return INVALID;
					const merged = mergeValues(parsedLeft.value, parsedRight.value);
					if (!merged.valid) {
						addIssueToContext(ctx, { code: ZodIssueCode.invalid_intersection_types });
						return INVALID;
					}
					if (isDirty(parsedLeft) || isDirty(parsedRight)) status.dirty();
					return {
						status: status.value,
						value: merged.data
					};
				};
				if (ctx.common.async) return Promise.all([this._def.left._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				}), this._def.right._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				})]).then(([left, right]) => handleParsed(left, right));
				else return handleParsed(this._def.left._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				}), this._def.right._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				}));
			}
		};
		ZodIntersection.create = (left, right, params) => {
			return new ZodIntersection({
				left,
				right,
				typeName: ZodFirstPartyTypeKind.ZodIntersection,
				...processCreateParams(params)
			});
		};
		var ZodTuple = class ZodTuple extends ZodType {
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.array) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.array,
						received: ctx.parsedType
					});
					return INVALID;
				}
				if (ctx.data.length < this._def.items.length) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: this._def.items.length,
						inclusive: true,
						exact: false,
						type: "array"
					});
					return INVALID;
				}
				if (!this._def.rest && ctx.data.length > this._def.items.length) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: this._def.items.length,
						inclusive: true,
						exact: false,
						type: "array"
					});
					status.dirty();
				}
				const items = [...ctx.data].map((item, itemIndex) => {
					const schema = this._def.items[itemIndex] || this._def.rest;
					if (!schema) return null;
					return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
				}).filter((x) => !!x);
				if (ctx.common.async) return Promise.all(items).then((results) => {
					return ParseStatus.mergeArray(status, results);
				});
				else return ParseStatus.mergeArray(status, items);
			}
			get items() {
				return this._def.items;
			}
			rest(rest) {
				return new ZodTuple({
					...this._def,
					rest
				});
			}
		};
		ZodTuple.create = (schemas, params) => {
			if (!Array.isArray(schemas)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
			return new ZodTuple({
				items: schemas,
				typeName: ZodFirstPartyTypeKind.ZodTuple,
				rest: null,
				...processCreateParams(params)
			});
		};
		var ZodRecord = class ZodRecord extends ZodType {
			get keySchema() {
				return this._def.keyType;
			}
			get valueSchema() {
				return this._def.valueType;
			}
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.object) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.object,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const pairs = [];
				const keyType = this._def.keyType;
				const valueType = this._def.valueType;
				for (const key in ctx.data) pairs.push({
					key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
					value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
					alwaysSet: key in ctx.data
				});
				if (ctx.common.async) return ParseStatus.mergeObjectAsync(status, pairs);
				else return ParseStatus.mergeObjectSync(status, pairs);
			}
			get element() {
				return this._def.valueType;
			}
			static create(first, second, third) {
				if (second instanceof ZodType) return new ZodRecord({
					keyType: first,
					valueType: second,
					typeName: ZodFirstPartyTypeKind.ZodRecord,
					...processCreateParams(third)
				});
				return new ZodRecord({
					keyType: ZodString.create(),
					valueType: first,
					typeName: ZodFirstPartyTypeKind.ZodRecord,
					...processCreateParams(second)
				});
			}
		};
		var ZodMap = class extends ZodType {
			get keySchema() {
				return this._def.keyType;
			}
			get valueSchema() {
				return this._def.valueType;
			}
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.map) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.map,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const keyType = this._def.keyType;
				const valueType = this._def.valueType;
				const pairs = [...ctx.data.entries()].map(([key, value], index) => {
					return {
						key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
						value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
					};
				});
				if (ctx.common.async) {
					const finalMap = /* @__PURE__ */ new Map();
					return Promise.resolve().then(async () => {
						for (const pair of pairs) {
							const key = await pair.key;
							const value = await pair.value;
							if (key.status === "aborted" || value.status === "aborted") return INVALID;
							if (key.status === "dirty" || value.status === "dirty") status.dirty();
							finalMap.set(key.value, value.value);
						}
						return {
							status: status.value,
							value: finalMap
						};
					});
				} else {
					const finalMap = /* @__PURE__ */ new Map();
					for (const pair of pairs) {
						const key = pair.key;
						const value = pair.value;
						if (key.status === "aborted" || value.status === "aborted") return INVALID;
						if (key.status === "dirty" || value.status === "dirty") status.dirty();
						finalMap.set(key.value, value.value);
					}
					return {
						status: status.value,
						value: finalMap
					};
				}
			}
		};
		ZodMap.create = (keyType, valueType, params) => {
			return new ZodMap({
				valueType,
				keyType,
				typeName: ZodFirstPartyTypeKind.ZodMap,
				...processCreateParams(params)
			});
		};
		var ZodSet = class ZodSet extends ZodType {
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.set) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.set,
						received: ctx.parsedType
					});
					return INVALID;
				}
				const def = this._def;
				if (def.minSize !== null) {
					if (ctx.data.size < def.minSize.value) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: def.minSize.value,
							type: "set",
							inclusive: true,
							exact: false,
							message: def.minSize.message
						});
						status.dirty();
					}
				}
				if (def.maxSize !== null) {
					if (ctx.data.size > def.maxSize.value) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: def.maxSize.value,
							type: "set",
							inclusive: true,
							exact: false,
							message: def.maxSize.message
						});
						status.dirty();
					}
				}
				const valueType = this._def.valueType;
				function finalizeSet(elements) {
					const parsedSet = /* @__PURE__ */ new Set();
					for (const element of elements) {
						if (element.status === "aborted") return INVALID;
						if (element.status === "dirty") status.dirty();
						parsedSet.add(element.value);
					}
					return {
						status: status.value,
						value: parsedSet
					};
				}
				const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
				if (ctx.common.async) return Promise.all(elements).then((elements) => finalizeSet(elements));
				else return finalizeSet(elements);
			}
			min(minSize, message) {
				return new ZodSet({
					...this._def,
					minSize: {
						value: minSize,
						message: errorUtil.toString(message)
					}
				});
			}
			max(maxSize, message) {
				return new ZodSet({
					...this._def,
					maxSize: {
						value: maxSize,
						message: errorUtil.toString(message)
					}
				});
			}
			size(size, message) {
				return this.min(size, message).max(size, message);
			}
			nonempty(message) {
				return this.min(1, message);
			}
		};
		ZodSet.create = (valueType, params) => {
			return new ZodSet({
				valueType,
				minSize: null,
				maxSize: null,
				typeName: ZodFirstPartyTypeKind.ZodSet,
				...processCreateParams(params)
			});
		};
		var ZodFunction = class ZodFunction extends ZodType {
			constructor() {
				super(...arguments);
				this.validate = this.implement;
			}
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.function) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.function,
						received: ctx.parsedType
					});
					return INVALID;
				}
				function makeArgsIssue(args, error) {
					return makeIssue({
						data: args,
						path: ctx.path,
						errorMaps: [
							ctx.common.contextualErrorMap,
							ctx.schemaErrorMap,
							getErrorMap(),
							errorMap
						].filter((x) => !!x),
						issueData: {
							code: ZodIssueCode.invalid_arguments,
							argumentsError: error
						}
					});
				}
				function makeReturnsIssue(returns, error) {
					return makeIssue({
						data: returns,
						path: ctx.path,
						errorMaps: [
							ctx.common.contextualErrorMap,
							ctx.schemaErrorMap,
							getErrorMap(),
							errorMap
						].filter((x) => !!x),
						issueData: {
							code: ZodIssueCode.invalid_return_type,
							returnTypeError: error
						}
					});
				}
				const params = { errorMap: ctx.common.contextualErrorMap };
				const fn = ctx.data;
				if (this._def.returns instanceof ZodPromise) {
					const me = this;
					return OK(async function(...args) {
						const error = new ZodError([]);
						const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
							error.addIssue(makeArgsIssue(args, e));
							throw error;
						});
						const result = await Reflect.apply(fn, this, parsedArgs);
						return await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
							error.addIssue(makeReturnsIssue(result, e));
							throw error;
						});
					});
				} else {
					const me = this;
					return OK(function(...args) {
						const parsedArgs = me._def.args.safeParse(args, params);
						if (!parsedArgs.success) throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
						const result = Reflect.apply(fn, this, parsedArgs.data);
						const parsedReturns = me._def.returns.safeParse(result, params);
						if (!parsedReturns.success) throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
						return parsedReturns.data;
					});
				}
			}
			parameters() {
				return this._def.args;
			}
			returnType() {
				return this._def.returns;
			}
			args(...items) {
				return new ZodFunction({
					...this._def,
					args: ZodTuple.create(items).rest(ZodUnknown.create())
				});
			}
			returns(returnType) {
				return new ZodFunction({
					...this._def,
					returns: returnType
				});
			}
			implement(func) {
				return this.parse(func);
			}
			strictImplement(func) {
				return this.parse(func);
			}
			static create(args, returns, params) {
				return new ZodFunction({
					args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
					returns: returns || ZodUnknown.create(),
					typeName: ZodFirstPartyTypeKind.ZodFunction,
					...processCreateParams(params)
				});
			}
		};
		var ZodLazy = class extends ZodType {
			get schema() {
				return this._def.getter();
			}
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				return this._def.getter()._parse({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
			}
		};
		ZodLazy.create = (getter, params) => {
			return new ZodLazy({
				getter,
				typeName: ZodFirstPartyTypeKind.ZodLazy,
				...processCreateParams(params)
			});
		};
		var ZodLiteral = class extends ZodType {
			_parse(input) {
				if (input.data !== this._def.value) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						received: ctx.data,
						code: ZodIssueCode.invalid_literal,
						expected: this._def.value
					});
					return INVALID;
				}
				return {
					status: "valid",
					value: input.data
				};
			}
			get value() {
				return this._def.value;
			}
		};
		ZodLiteral.create = (value, params) => {
			return new ZodLiteral({
				value,
				typeName: ZodFirstPartyTypeKind.ZodLiteral,
				...processCreateParams(params)
			});
		};
		function createZodEnum(values, params) {
			return new ZodEnum({
				values,
				typeName: ZodFirstPartyTypeKind.ZodEnum,
				...processCreateParams(params)
			});
		}
		var ZodEnum = class ZodEnum extends ZodType {
			_parse(input) {
				if (typeof input.data !== "string") {
					const ctx = this._getOrReturnCtx(input);
					const expectedValues = this._def.values;
					addIssueToContext(ctx, {
						expected: util.joinValues(expectedValues),
						received: ctx.parsedType,
						code: ZodIssueCode.invalid_type
					});
					return INVALID;
				}
				if (!this._cache) this._cache = new Set(this._def.values);
				if (!this._cache.has(input.data)) {
					const ctx = this._getOrReturnCtx(input);
					const expectedValues = this._def.values;
					addIssueToContext(ctx, {
						received: ctx.data,
						code: ZodIssueCode.invalid_enum_value,
						options: expectedValues
					});
					return INVALID;
				}
				return OK(input.data);
			}
			get options() {
				return this._def.values;
			}
			get enum() {
				const enumValues = {};
				for (const val of this._def.values) enumValues[val] = val;
				return enumValues;
			}
			get Values() {
				const enumValues = {};
				for (const val of this._def.values) enumValues[val] = val;
				return enumValues;
			}
			get Enum() {
				const enumValues = {};
				for (const val of this._def.values) enumValues[val] = val;
				return enumValues;
			}
			extract(values, newDef = this._def) {
				return ZodEnum.create(values, {
					...this._def,
					...newDef
				});
			}
			exclude(values, newDef = this._def) {
				return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
					...this._def,
					...newDef
				});
			}
		};
		ZodEnum.create = createZodEnum;
		var ZodNativeEnum = class extends ZodType {
			_parse(input) {
				const nativeEnumValues = util.getValidEnumValues(this._def.values);
				const ctx = this._getOrReturnCtx(input);
				if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
					const expectedValues = util.objectValues(nativeEnumValues);
					addIssueToContext(ctx, {
						expected: util.joinValues(expectedValues),
						received: ctx.parsedType,
						code: ZodIssueCode.invalid_type
					});
					return INVALID;
				}
				if (!this._cache) this._cache = new Set(util.getValidEnumValues(this._def.values));
				if (!this._cache.has(input.data)) {
					const expectedValues = util.objectValues(nativeEnumValues);
					addIssueToContext(ctx, {
						received: ctx.data,
						code: ZodIssueCode.invalid_enum_value,
						options: expectedValues
					});
					return INVALID;
				}
				return OK(input.data);
			}
			get enum() {
				return this._def.values;
			}
		};
		ZodNativeEnum.create = (values, params) => {
			return new ZodNativeEnum({
				values,
				typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
				...processCreateParams(params)
			});
		};
		var ZodPromise = class extends ZodType {
			unwrap() {
				return this._def.type;
			}
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.promise,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return OK((ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data)).then((data) => {
					return this._def.type.parseAsync(data, {
						path: ctx.path,
						errorMap: ctx.common.contextualErrorMap
					});
				}));
			}
		};
		ZodPromise.create = (schema, params) => {
			return new ZodPromise({
				type: schema,
				typeName: ZodFirstPartyTypeKind.ZodPromise,
				...processCreateParams(params)
			});
		};
		var ZodEffects = class extends ZodType {
			innerType() {
				return this._def.schema;
			}
			sourceType() {
				return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
			}
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				const effect = this._def.effect || null;
				const checkCtx = {
					addIssue: (arg) => {
						addIssueToContext(ctx, arg);
						if (arg.fatal) status.abort();
						else status.dirty();
					},
					get path() {
						return ctx.path;
					}
				};
				checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
				if (effect.type === "preprocess") {
					const processed = effect.transform(ctx.data, checkCtx);
					if (ctx.common.async) return Promise.resolve(processed).then(async (processed) => {
						if (status.value === "aborted") return INVALID;
						const result = await this._def.schema._parseAsync({
							data: processed,
							path: ctx.path,
							parent: ctx
						});
						if (result.status === "aborted") return INVALID;
						if (result.status === "dirty") return DIRTY(result.value);
						if (status.value === "dirty") return DIRTY(result.value);
						return result;
					});
					else {
						if (status.value === "aborted") return INVALID;
						const result = this._def.schema._parseSync({
							data: processed,
							path: ctx.path,
							parent: ctx
						});
						if (result.status === "aborted") return INVALID;
						if (result.status === "dirty") return DIRTY(result.value);
						if (status.value === "dirty") return DIRTY(result.value);
						return result;
					}
				}
				if (effect.type === "refinement") {
					const executeRefinement = (acc) => {
						const result = effect.refinement(acc, checkCtx);
						if (ctx.common.async) return Promise.resolve(result);
						if (result instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
						return acc;
					};
					if (ctx.common.async === false) {
						const inner = this._def.schema._parseSync({
							data: ctx.data,
							path: ctx.path,
							parent: ctx
						});
						if (inner.status === "aborted") return INVALID;
						if (inner.status === "dirty") status.dirty();
						executeRefinement(inner.value);
						return {
							status: status.value,
							value: inner.value
						};
					} else return this._def.schema._parseAsync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx
					}).then((inner) => {
						if (inner.status === "aborted") return INVALID;
						if (inner.status === "dirty") status.dirty();
						return executeRefinement(inner.value).then(() => {
							return {
								status: status.value,
								value: inner.value
							};
						});
					});
				}
				if (effect.type === "transform") if (ctx.common.async === false) {
					const base = this._def.schema._parseSync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx
					});
					if (!isValid(base)) return INVALID;
					const result = effect.transform(base.value, checkCtx);
					if (result instanceof Promise) throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
					return {
						status: status.value,
						value: result
					};
				} else return this._def.schema._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				}).then((base) => {
					if (!isValid(base)) return INVALID;
					return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
						status: status.value,
						value: result
					}));
				});
				util.assertNever(effect);
			}
		};
		ZodEffects.create = (schema, effect, params) => {
			return new ZodEffects({
				schema,
				typeName: ZodFirstPartyTypeKind.ZodEffects,
				effect,
				...processCreateParams(params)
			});
		};
		ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
			return new ZodEffects({
				schema,
				effect: {
					type: "preprocess",
					transform: preprocess
				},
				typeName: ZodFirstPartyTypeKind.ZodEffects,
				...processCreateParams(params)
			});
		};
		var ZodOptional = class extends ZodType {
			_parse(input) {
				if (this._getType(input) === ZodParsedType.undefined) return OK(void 0);
				return this._def.innerType._parse(input);
			}
			unwrap() {
				return this._def.innerType;
			}
		};
		ZodOptional.create = (type, params) => {
			return new ZodOptional({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodOptional,
				...processCreateParams(params)
			});
		};
		var ZodNullable = class extends ZodType {
			_parse(input) {
				if (this._getType(input) === ZodParsedType.null) return OK(null);
				return this._def.innerType._parse(input);
			}
			unwrap() {
				return this._def.innerType;
			}
		};
		ZodNullable.create = (type, params) => {
			return new ZodNullable({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodNullable,
				...processCreateParams(params)
			});
		};
		var ZodDefault = class extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				let data = ctx.data;
				if (ctx.parsedType === ZodParsedType.undefined) data = this._def.defaultValue();
				return this._def.innerType._parse({
					data,
					path: ctx.path,
					parent: ctx
				});
			}
			removeDefault() {
				return this._def.innerType;
			}
		};
		ZodDefault.create = (type, params) => {
			return new ZodDefault({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodDefault,
				defaultValue: typeof params.default === "function" ? params.default : () => params.default,
				...processCreateParams(params)
			});
		};
		var ZodCatch = class extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				const newCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: []
					}
				};
				const result = this._def.innerType._parse({
					data: newCtx.data,
					path: newCtx.path,
					parent: { ...newCtx }
				});
				if (isAsync(result)) return result.then((result) => {
					return {
						status: "valid",
						value: result.status === "valid" ? result.value : this._def.catchValue({
							get error() {
								return new ZodError(newCtx.common.issues);
							},
							input: newCtx.data
						})
					};
				});
				else return {
					status: "valid",
					value: result.status === "valid" ? result.value : this._def.catchValue({
						get error() {
							return new ZodError(newCtx.common.issues);
						},
						input: newCtx.data
					})
				};
			}
			removeCatch() {
				return this._def.innerType;
			}
		};
		ZodCatch.create = (type, params) => {
			return new ZodCatch({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodCatch,
				catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
				...processCreateParams(params)
			});
		};
		var ZodNaN = class extends ZodType {
			_parse(input) {
				if (this._getType(input) !== ZodParsedType.nan) {
					const ctx = this._getOrReturnCtx(input);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.nan,
						received: ctx.parsedType
					});
					return INVALID;
				}
				return {
					status: "valid",
					value: input.data
				};
			}
		};
		ZodNaN.create = (params) => {
			return new ZodNaN({
				typeName: ZodFirstPartyTypeKind.ZodNaN,
				...processCreateParams(params)
			});
		};
		var ZodBranded = class extends ZodType {
			_parse(input) {
				const { ctx } = this._processInputParams(input);
				const data = ctx.data;
				return this._def.type._parse({
					data,
					path: ctx.path,
					parent: ctx
				});
			}
			unwrap() {
				return this._def.type;
			}
		};
		var ZodPipeline = class ZodPipeline extends ZodType {
			_parse(input) {
				const { status, ctx } = this._processInputParams(input);
				if (ctx.common.async) {
					const handleAsync = async () => {
						const inResult = await this._def.in._parseAsync({
							data: ctx.data,
							path: ctx.path,
							parent: ctx
						});
						if (inResult.status === "aborted") return INVALID;
						if (inResult.status === "dirty") {
							status.dirty();
							return DIRTY(inResult.value);
						} else return this._def.out._parseAsync({
							data: inResult.value,
							path: ctx.path,
							parent: ctx
						});
					};
					return handleAsync();
				} else {
					const inResult = this._def.in._parseSync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx
					});
					if (inResult.status === "aborted") return INVALID;
					if (inResult.status === "dirty") {
						status.dirty();
						return {
							status: "dirty",
							value: inResult.value
						};
					} else return this._def.out._parseSync({
						data: inResult.value,
						path: ctx.path,
						parent: ctx
					});
				}
			}
			static create(a, b) {
				return new ZodPipeline({
					in: a,
					out: b,
					typeName: ZodFirstPartyTypeKind.ZodPipeline
				});
			}
		};
		var ZodReadonly = class extends ZodType {
			_parse(input) {
				const result = this._def.innerType._parse(input);
				const freeze = (data) => {
					if (isValid(data)) data.value = Object.freeze(data.value);
					return data;
				};
				return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
			}
			unwrap() {
				return this._def.innerType;
			}
		};
		ZodReadonly.create = (type, params) => {
			return new ZodReadonly({
				innerType: type,
				typeName: ZodFirstPartyTypeKind.ZodReadonly,
				...processCreateParams(params)
			});
		};
		ZodObject.lazycreate;
		var ZodFirstPartyTypeKind;
		(function(ZodFirstPartyTypeKind) {
			ZodFirstPartyTypeKind["ZodString"] = "ZodString";
			ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
			ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
			ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
			ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
			ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
			ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
			ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
			ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
			ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
			ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
			ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
			ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
			ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
			ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
			ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
			ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
			ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
			ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
			ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
			ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
			ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
			ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
			ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
			ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
			ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
			ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
			ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
			ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
			ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
			ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
			ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
			ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
			ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
			ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
			ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
		})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
		const stringType = ZodString.create;
		const numberType = ZodNumber.create;
		ZodNaN.create;
		ZodBigInt.create;
		const booleanType = ZodBoolean.create;
		ZodDate.create;
		ZodSymbol.create;
		ZodUndefined.create;
		ZodNull.create;
		ZodAny.create;
		ZodUnknown.create;
		ZodNever.create;
		ZodVoid.create;
		const arrayType = ZodArray.create;
		const objectType = ZodObject.create;
		ZodObject.strictCreate;
		const unionType = ZodUnion.create;
		ZodDiscriminatedUnion.create;
		ZodIntersection.create;
		ZodTuple.create;
		const recordType = ZodRecord.create;
		ZodMap.create;
		ZodSet.create;
		ZodFunction.create;
		ZodLazy.create;
		const literalType = ZodLiteral.create;
		const enumType = ZodEnum.create;
		ZodNativeEnum.create;
		ZodPromise.create;
		ZodEffects.create;
		ZodOptional.create;
		ZodNullable.create;
		ZodEffects.createWithPreprocess;
		ZodPipeline.create;
		//#endregion
		//#region src/api/model-vendors.generated.ts
		const modelVendors = [
			{
				"id": "amazon-bedrock",
				"name": "Amazon Bedrock"
			},
			{
				"id": "ant-ling",
				"name": "Ant Ling"
			},
			{
				"id": "anthropic",
				"name": "Anthropic"
			},
			{
				"id": "azure",
				"name": "Azure"
			},
			{
				"id": "baseten",
				"name": "Baseten"
			},
			{
				"id": "cerebras",
				"name": "Cerebras"
			},
			{
				"id": "cloudflare-ai-gateway",
				"name": "Cloudflare AI Gateway"
			},
			{
				"id": "cloudflare-workers-ai",
				"name": "Cloudflare Workers AI"
			},
			{
				"id": "deepseek",
				"name": "DeepSeek"
			},
			{
				"id": "fireworks",
				"name": "Fireworks"
			},
			{
				"id": "github-copilot",
				"name": "GitHub Copilot"
			},
			{
				"id": "google",
				"name": "Google"
			},
			{
				"id": "google-vertex",
				"name": "Google Vertex AI"
			},
			{
				"id": "groq",
				"name": "Groq"
			},
			{
				"id": "huggingface",
				"name": "Hugging Face"
			},
			{
				"id": "kimi-coding",
				"name": "Kimi For Coding"
			},
			{
				"id": "meta",
				"name": "Meta"
			},
			{
				"id": "minimax",
				"name": "MiniMax"
			},
			{
				"id": "minimax-cn",
				"name": "MiniMax CN"
			},
			{
				"id": "mistral",
				"name": "Mistral"
			},
			{
				"id": "moonshotai",
				"name": "Moonshot AI"
			},
			{
				"id": "moonshotai-cn",
				"name": "Moonshot AI CN"
			},
			{
				"id": "nvidia",
				"name": "NVIDIA"
			},
			{
				"id": "openai",
				"name": "OpenAI"
			},
			{
				"id": "openai-codex",
				"name": "OpenAI Codex (legacy)"
			},
			{
				"id": "opencode",
				"name": "OpenCode Zen"
			},
			{
				"id": "opencode-go",
				"name": "OpenCode Go"
			},
			{
				"id": "openrouter",
				"name": "OpenRouter"
			},
			{
				"id": "qwen-token-plan",
				"name": "Qwen Token Plan"
			},
			{
				"id": "qwen-token-plan-cn",
				"name": "Qwen Token Plan CN"
			},
			{
				"id": "qwen-token-plan-individual",
				"name": "Qwen Token Plan Individual"
			},
			{
				"id": "radius",
				"name": "Radius"
			},
			{
				"id": "together",
				"name": "Together"
			},
			{
				"id": "typesafe",
				"name": "TypeSafe"
			},
			{
				"id": "vercel-ai-gateway",
				"name": "Vercel AI Gateway"
			},
			{
				"id": "xai",
				"name": "xAI"
			},
			{
				"id": "xiaomi",
				"name": "Xiaomi"
			},
			{
				"id": "xiaomi-token-plan-ams",
				"name": "Xiaomi Token Plan AMS"
			},
			{
				"id": "xiaomi-token-plan-cn",
				"name": "Xiaomi Token Plan CN"
			},
			{
				"id": "xiaomi-token-plan-sgp",
				"name": "Xiaomi Token Plan SGP"
			},
			{
				"id": "zai",
				"name": "Z.AI"
			},
			{
				"id": "zai-coding-cn",
				"name": "Z.AI Coding CN"
			}
		];
		//#endregion
		//#region src/api/model-vendors.ts
		const aliases = {
			"zhipu ai": "zai",
			"智谱": "zai",
			"qwen": "qwen-token-plan",
			"阿里云": "qwen-token-plan",
			"mimo": "xiaomi",
			"xiaomi mimo": "xiaomi",
			"小米": "xiaomi"
		};
		function modelVendorId(value) {
			const key = value.trim().toLowerCase();
			return modelVendors.find((vendor) => vendor.id === key || vendor.name.toLowerCase() === key)?.id ?? aliases[key] ?? key;
		}
		/** 模型厂商的展示名称，独立于请求适配器和协议。 */
		function modelVendorLabel(id, name, provider) {
			const identity = `${id} ${name}`.toLowerCase();
			if (/(?:^|[^a-z])mimo(?:[-\s\d.]|$)/u.test(identity)) return "Xiaomi";
			if (/(?:^|[^a-z])doubao(?:[-\s\d.]|$)/u.test(identity)) return "Doubao";
			if (/(?:^|[^a-z])qwen(?:[-\s\d.]|$)/u.test(identity)) return "Qwen";
			if (/(?:^|[^a-z])(?:kimi|moonshotai|moonshot)(?:[-\s\d.]|$)/u.test(identity)) return "Moonshot AI";
			if (/(?:^|[^a-z])minimax(?:[-\s\d.]|$)/u.test(identity)) return "MiniMax";
			if (/(?:^|[^a-z])mistral(?:[-\s\d.]|$)/u.test(identity)) return "Mistral";
			if (/(?:^|[^a-z])grok(?:[-\s\d.]|$)/u.test(identity)) return "xAI";
			if (/(?:^|[^a-z])glm(?:[-\s\d.]|$)/u.test(identity)) return "Zhipu AI";
			if (/(?:^|[^a-z])deepseek(?:[-\s\d.]|$)/u.test(identity)) return "DeepSeek";
			if (/(?:^|[^a-z])gemini(?:[-\s\d.]|$)/u.test(identity)) return "Google";
			if (/(?:^|[^a-z])(?:gpt|chatgpt|o[1-9])(?:[-\s\d.]|$)/u.test(identity)) return "OpenAI";
			if (/(?:^|[^a-z])claude(?:[-\s\d.]|$)/u.test(identity)) return "Anthropic";
			return {
				anthropic: "Anthropic",
				google: "Google",
				openai: "OpenAI",
				xai: "xAI",
				deepseek: "DeepSeek"
			}[provider] ?? provider;
		}
		//#endregion
		//#region src/api/omni-reasoning.generated.ts
		const omniReasoningProfiles = [
			{
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"low": { "reasoning_effort": "low" },
				"medium": { "reasoning_effort": "medium" },
				"high": { "reasoning_effort": "high" }
			},
			{
				"off": { "reasoning_effort": "none" },
				"minimal": { "reasoning_effort": "minimal" },
				"low": { "reasoning_effort": "low" },
				"medium": { "reasoning_effort": "medium" },
				"high": { "reasoning_effort": "high" },
				"xhigh": { "reasoning_effort": "xhigh" },
				"max": { "reasoning_effort": "max" }
			},
			{
				"off": { "reasoning_effort": "none" },
				"low": { "reasoning_effort": "low" },
				"high": { "reasoning_effort": "high" },
				"max": { "reasoning_effort": "max" }
			},
			{
				"off": { "chat_template_args": { "enable_thinking": false } },
				"high": { "chat_template_args": { "enable_thinking": true } }
			},
			{
				"off": {
					"reasoning_effort": "none",
					"chat_template_args": { "enable_thinking": false }
				},
				"high": {
					"reasoning_effort": "high",
					"chat_template_args": { "enable_thinking": true }
				},
				"max": {
					"reasoning_effort": "max",
					"chat_template_args": { "enable_thinking": true }
				}
			},
			{
				"low": { "reasoning_effort": "low" },
				"high": { "reasoning_effort": "high" },
				"max": { "reasoning_effort": "max" }
			},
			{
				"off": { "reasoning_effort": "none" },
				"low": { "reasoning_effort": "low" },
				"medium": { "reasoning_effort": "medium" },
				"high": { "reasoning_effort": "high" }
			},
			{
				"off": { "thinking": { "type": "disabled" } },
				"high": { "thinking": { "type": "enabled" } },
				"max": { "thinking": { "type": "enabled" } }
			},
			{
				"off": { "thinking": { "type": "disabled" } },
				"high": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "high"
				},
				"max": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "max"
				}
			},
			{
				"off": { "reasoning_effort": "none" },
				"high": { "reasoning_effort": "high" }
			},
			{
				"minimal": { "reasoning_effort": "minimal" },
				"low": { "reasoning_effort": "low" },
				"medium": { "reasoning_effort": "medium" },
				"high": { "reasoning_effort": "high" }
			},
			{
				"low": { "reasoning_effort": "low" },
				"medium": { "reasoning_effort": "medium" },
				"xhigh": { "reasoning_effort": "xhigh" }
			},
			{
				"off": { "reasoning_effort": "none" },
				"high": { "reasoning_effort": "high" },
				"max": { "reasoning_effort": "max" }
			},
			{
				"off": { "thinking": { "type": "disabled" } },
				"low": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "low"
				},
				"high": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "high"
				},
				"max": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "max"
				}
			},
			{
				"off": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 0 },
					"maxOutputTokens": 8192
				} },
				"minimal": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": -1 },
					"maxOutputTokens": 8192
				} },
				"low": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": -1 },
					"maxOutputTokens": 8192
				} },
				"medium": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": -1 },
					"maxOutputTokens": 8192
				} },
				"high": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": -1 },
					"maxOutputTokens": 8192
				} }
			},
			{
				"off": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 0 },
					"maxOutputTokens": 8192
				} },
				"minimal": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 128 },
					"maxOutputTokens": 8320
				} },
				"low": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 2048 },
					"maxOutputTokens": 10240
				} },
				"medium": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 8192 },
					"maxOutputTokens": 16384
				} },
				"high": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 24576 },
					"maxOutputTokens": 32768
				} }
			},
			{
				"off": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 0 },
					"maxOutputTokens": 8192
				} },
				"minimal": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 512 },
					"maxOutputTokens": 8704
				} },
				"low": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 2048 },
					"maxOutputTokens": 10240
				} },
				"medium": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 8192 },
					"maxOutputTokens": 16384
				} },
				"high": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 24576 },
					"maxOutputTokens": 32768
				} }
			},
			{
				"off": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 0 },
					"maxOutputTokens": 8192
				} },
				"minimal": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 128 },
					"maxOutputTokens": 8320
				} },
				"low": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 2048 },
					"maxOutputTokens": 10240
				} },
				"medium": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 8192 },
					"maxOutputTokens": 16384
				} },
				"high": { "generationConfig": {
					"thinkingConfig": { "thinkingBudget": 32768 },
					"maxOutputTokens": 40960
				} }
			},
			{
				"minimal": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "MINIMAL" },
					"maxOutputTokens": 8192
				} },
				"low": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "LOW" },
					"maxOutputTokens": 8192
				} },
				"medium": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "MEDIUM" },
					"maxOutputTokens": 8192
				} },
				"high": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "HIGH" },
					"maxOutputTokens": 8192
				} }
			},
			{
				"minimal": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "MINIMAL" },
					"maxOutputTokens": 4096
				} },
				"high": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "HIGH" },
					"maxOutputTokens": 4096
				} }
			},
			{
				"low": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "LOW" },
					"maxOutputTokens": 8192
				} },
				"medium": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "MEDIUM" },
					"maxOutputTokens": 8192
				} },
				"high": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "HIGH" },
					"maxOutputTokens": 8192
				} }
			},
			{
				"minimal": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "MINIMAL" },
					"maxOutputTokens": 8192
				} },
				"high": { "generationConfig": {
					"thinkingConfig": { "thinkingLevel": "HIGH" },
					"maxOutputTokens": 8192
				} }
			},
			{
				"off": { "reasoning_effort": "none" },
				"high": { "reasoning_effort": "default" }
			},
			{
				"high": { "reasoning_effort": "high" },
				"max": { "reasoning_effort": "max" }
			},
			{ "high": { "reasoning_effort": "high" } },
			{
				"off": { "reasoning_effort": "none" },
				"low": { "reasoning_effort": "low" },
				"high": { "reasoning_effort": "high" },
				"xhigh": { "reasoning_effort": "xhigh" },
				"max": { "reasoning_effort": "max" }
			},
			{
				"off": { "reasoning_effort": "none" },
				"low": { "reasoning_effort": "low" },
				"high": { "reasoning_effort": "high" }
			},
			{
				"off": { "reasoning_effort": "none" },
				"low": { "reasoning_effort": "low" },
				"medium": { "reasoning_effort": "medium" },
				"high": { "reasoning_effort": "high" },
				"xhigh": { "reasoning_effort": "xhigh" }
			},
			{
				"off": { "thinking": { "type": "disabled" } },
				"minimal": { "thinking": { "type": "enabled" } },
				"low": { "thinking": { "type": "enabled" } },
				"medium": { "thinking": { "type": "enabled" } },
				"high": { "thinking": { "type": "enabled" } }
			},
			{
				"minimal": { "thinking": { "type": "enabled" } },
				"low": { "thinking": { "type": "enabled" } },
				"medium": { "thinking": { "type": "enabled" } },
				"high": { "thinking": { "type": "enabled" } }
			},
			{ "max": { "reasoning_effort": "max" } },
			{
				"low": { "reasoning_effort": "low" },
				"medium": { "reasoning_effort": "medium" },
				"high": { "reasoning_effort": "high" },
				"xhigh": { "reasoning_effort": "xhigh" },
				"max": { "reasoning_effort": "max" }
			},
			{
				"low": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "low"
				},
				"high": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "high"
				},
				"max": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "max"
				}
			},
			{
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"low": { "reasoning": { "effort": "low" } },
				"high": { "reasoning": { "effort": "high" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"low": { "reasoning": { "effort": "low" } },
				"high": { "reasoning": { "effort": "high" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"minimal": { "reasoning": { "effort": "minimal" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"minimal": { "reasoning": { "effort": "minimal" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"minimal": { "reasoning": { "effort": "minimal" } },
				"high": { "reasoning": { "effort": "high" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"low": { "reasoning": { "effort": "low" } },
				"high": { "reasoning": { "effort": "high" } }
			},
			{
				"minimal": { "reasoning": { "effort": "minimal" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"minimal": { "reasoning": { "effort": "minimal" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"high": { "reasoning": { "effort": "high" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } }
			},
			{ "high": { "reasoning": { "effort": "high" } } },
			{
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } }
			},
			{
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"minimal": { "reasoning": { "effort": "minimal" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"off": { "reasoning": { "effort": "none" } },
				"minimal": { "reasoning": { "effort": "minimal" } },
				"low": { "reasoning": { "effort": "low" } },
				"medium": { "reasoning": { "effort": "medium" } },
				"high": { "reasoning": { "effort": "high" } },
				"xhigh": { "reasoning": { "effort": "xhigh" } },
				"max": { "reasoning": { "effort": "max" } }
			},
			{
				"off": { "enable_thinking": false },
				"minimal": { "enable_thinking": true },
				"low": { "enable_thinking": true },
				"medium": { "enable_thinking": true },
				"high": { "enable_thinking": true }
			},
			{
				"high": {
					"reasoning_effort": "high",
					"enable_thinking": true
				},
				"max": {
					"reasoning_effort": "max",
					"enable_thinking": true
				}
			},
			{
				"low": {
					"reasoning_effort": "low",
					"enable_thinking": true
				},
				"high": {
					"reasoning_effort": "high",
					"enable_thinking": true
				},
				"max": {
					"reasoning_effort": "max",
					"enable_thinking": true
				}
			},
			{
				"off": { "enable_thinking": false },
				"high": {
					"reasoning_effort": "high",
					"enable_thinking": true
				},
				"max": {
					"reasoning_effort": "max",
					"enable_thinking": true
				}
			},
			{
				"low": {
					"reasoning_effort": "low",
					"enable_thinking": true
				},
				"medium": {
					"reasoning_effort": "medium",
					"enable_thinking": true
				},
				"xhigh": {
					"reasoning_effort": "xhigh",
					"enable_thinking": true
				}
			},
			{
				"off": { "reasoning": { "enabled": false } },
				"high": { "reasoning": { "enabled": true } }
			},
			{
				"off": { "reasoning": { "enabled": false } },
				"high": {
					"reasoning_effort": "high",
					"reasoning": { "enabled": true }
				}
			},
			{ "high": { "reasoning": { "enabled": true } } },
			{
				"off": { "thinking": { "type": "disabled" } },
				"minimal": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "minimal"
				},
				"low": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "low"
				},
				"medium": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "medium"
				},
				"high": {
					"thinking": { "type": "enabled" },
					"reasoning_effort": "high"
				}
			},
			{
				"off": { "thinking": { "type": "disabled" } },
				"minimal": { "thinking": {
					"type": "enabled",
					"clear_thinking": false
				} },
				"low": { "thinking": {
					"type": "enabled",
					"clear_thinking": false
				} },
				"medium": { "thinking": {
					"type": "enabled",
					"clear_thinking": false
				} },
				"high": { "thinking": {
					"type": "enabled",
					"clear_thinking": false
				} }
			},
			{
				"off": { "thinking": { "type": "disabled" } },
				"high": {
					"thinking": {
						"type": "enabled",
						"clear_thinking": false
					},
					"reasoning_effort": "high"
				},
				"max": {
					"thinking": {
						"type": "enabled",
						"clear_thinking": false
					},
					"reasoning_effort": "max"
				}
			},
			{
				"low": {
					"thinking": {
						"type": "enabled",
						"clear_thinking": false
					},
					"reasoning_effort": "low"
				},
				"high": {
					"thinking": {
						"type": "enabled",
						"clear_thinking": false
					},
					"reasoning_effort": "high"
				},
				"max": {
					"thinking": {
						"type": "enabled",
						"clear_thinking": false
					},
					"reasoning_effort": "max"
				}
			}
		];
		const omniReasoningModels = [
			[
				"ant-ling",
				"Ring-2.6-1T",
				"openai-completions",
				0
			],
			[
				"azure",
				"deepseek-v4-pro",
				"openai-completions",
				1
			],
			[
				"baseten",
				"deepseek-ai/DeepSeek-V4-Flash-0731",
				"openai-completions",
				2
			],
			[
				"baseten",
				"deepseek-ai/DeepSeek-V4-Pro",
				"openai-completions",
				2
			],
			[
				"baseten",
				"deepseek-ai/DeepSeek-V4-Pro-0813",
				"openai-completions",
				3
			],
			[
				"baseten",
				"deepseek-ai/DeepSeek-V4.1-Flash",
				"openai-completions",
				3
			],
			[
				"baseten",
				"deepseek-ai/DeepSeek-V4.1-Flash-Fast",
				"openai-completions",
				3
			],
			[
				"baseten",
				"moonshotai/Kimi-K2.5",
				"openai-completions",
				4
			],
			[
				"baseten",
				"moonshotai/Kimi-K2.6",
				"openai-completions",
				4
			],
			[
				"baseten",
				"moonshotai/Kimi-K2.7-Code",
				"openai-completions",
				4
			],
			[
				"baseten",
				"moonshotai/Kimi-K3",
				"openai-completions",
				3
			],
			[
				"baseten",
				"nvidia/Nemotron-120B-A12B",
				"openai-completions",
				4
			],
			[
				"baseten",
				"nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B",
				"openai-completions",
				4
			],
			[
				"baseten",
				"openai/gpt-oss-120b",
				"openai-completions",
				2
			],
			[
				"baseten",
				"thinkingmachines/inkling",
				"openai-completions",
				2
			],
			[
				"baseten",
				"thinkingmachines/inkling-small",
				"openai-completions",
				2
			],
			[
				"baseten",
				"zai-org/GLM-4.7",
				"openai-completions",
				4
			],
			[
				"baseten",
				"zai-org/GLM-5",
				"openai-completions",
				4
			],
			[
				"baseten",
				"zai-org/GLM-5.1",
				"openai-completions",
				4
			],
			[
				"baseten",
				"zai-org/GLM-5.2",
				"openai-completions",
				5
			],
			[
				"baseten",
				"zai-org/GLM-5.2-Fast",
				"openai-completions",
				5
			],
			[
				"baseten",
				"zai-org/GLM-5.3",
				"openai-completions",
				6
			],
			[
				"baseten",
				"zai-org/GLM-5.3-Fast",
				"openai-completions",
				3
			],
			[
				"baseten",
				"zai-org/GLM-5.3-Flash",
				"openai-completions",
				6
			],
			[
				"cerebras",
				"gpt-oss-120b",
				"openai-completions",
				1
			],
			[
				"cerebras",
				"qwen-3.8-27b",
				"openai-completions",
				7
			],
			[
				"cloudflare-ai-gateway",
				"workers-ai/@cf/deepseek-ai/deepseek-v4-flash-0731",
				"openai-completions",
				8
			],
			[
				"cloudflare-ai-gateway",
				"workers-ai/@cf/deepseek-ai/deepseek-v4-pro-0813",
				"openai-completions",
				8
			],
			[
				"cloudflare-workers-ai",
				"@cf/deepseek-ai/deepseek-v4-flash-0731",
				"openai-completions",
				9
			],
			[
				"cloudflare-workers-ai",
				"@cf/deepseek-ai/deepseek-v4-pro-0813",
				"openai-completions",
				9
			],
			[
				"cloudflare-workers-ai",
				"@cf/google/gemma-4-26b-a4b-it",
				"openai-completions",
				10
			],
			[
				"cloudflare-workers-ai",
				"@cf/moonshotai/kimi-k2.6",
				"openai-completions",
				10
			],
			[
				"cloudflare-workers-ai",
				"@cf/moonshotai/kimi-k2.7-code",
				"openai-completions",
				11
			],
			[
				"cloudflare-workers-ai",
				"@cf/nvidia/nemotron-3-120b-a12b",
				"openai-completions",
				1
			],
			[
				"cloudflare-workers-ai",
				"@cf/openai/gpt-oss-120b",
				"openai-completions",
				1
			],
			[
				"cloudflare-workers-ai",
				"@cf/openai/gpt-oss-20b",
				"openai-completions",
				1
			],
			[
				"cloudflare-workers-ai",
				"@cf/qwen/qwen3-30b-a3b-fp8",
				"openai-completions",
				11
			],
			[
				"cloudflare-workers-ai",
				"@cf/qwen/qwen3.8-27b",
				"openai-completions",
				12
			],
			[
				"cloudflare-workers-ai",
				"@cf/zai-org/glm-4.7-flash",
				"openai-completions",
				11
			],
			[
				"cloudflare-workers-ai",
				"@cf/zai-org/glm-5.2",
				"openai-completions",
				13
			],
			[
				"cloudflare-workers-ai",
				"@cf/zai-org/glm-5.3",
				"openai-completions",
				6
			],
			[
				"cloudflare-workers-ai",
				"@cf/zai-org/glm-5.3-flash",
				"openai-completions",
				6
			],
			[
				"deepseek",
				"deepseek-flash",
				"openai-completions",
				14
			],
			[
				"deepseek",
				"deepseek-v4-pro",
				"openai-completions",
				9
			],
			[
				"fireworks",
				"accounts/fireworks/models/glm-5p3",
				"openai-completions",
				6
			],
			[
				"fireworks",
				"accounts/fireworks/models/glm-5p3-flash",
				"openai-completions",
				6
			],
			[
				"fireworks",
				"accounts/fireworks/models/kimi-k3",
				"openai-completions",
				6
			],
			[
				"fireworks",
				"accounts/fireworks/routers/glm-5p3-fast",
				"openai-completions",
				6
			],
			[
				"fireworks",
				"accounts/fireworks/routers/glm-fast-latest",
				"openai-completions",
				6
			],
			[
				"fireworks",
				"accounts/fireworks/routers/glm-flash-latest",
				"openai-completions",
				6
			],
			[
				"fireworks",
				"accounts/fireworks/routers/glm-latest",
				"openai-completions",
				6
			],
			[
				"fireworks",
				"accounts/fireworks/routers/kimi-k3-fast",
				"openai-completions",
				6
			],
			[
				"google",
				"deep-research-max-preview-04-2026",
				"google-generative-ai",
				15
			],
			[
				"google",
				"deep-research-preview-04-2026",
				"google-generative-ai",
				15
			],
			[
				"google",
				"gemini-2.5-computer-use-preview-10-2025",
				"google-generative-ai",
				15
			],
			[
				"google",
				"gemini-2.5-flash",
				"google-generative-ai",
				16
			],
			[
				"google",
				"gemini-2.5-flash-lite",
				"google-generative-ai",
				17
			],
			[
				"google",
				"gemini-2.5-pro",
				"google-generative-ai",
				18
			],
			[
				"google",
				"gemini-3-flash-preview",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemini-3.1-flash-lite",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemini-3.1-flash-lite-image",
				"google-generative-ai",
				20
			],
			[
				"google",
				"gemini-3.1-flash-lite-preview",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemini-3.1-flash-live-preview",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemini-3.1-pro-preview",
				"google-generative-ai",
				21
			],
			[
				"google",
				"gemini-3.1-pro-preview-customtools",
				"google-generative-ai",
				21
			],
			[
				"google",
				"gemini-3.5-flash",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemini-3.5-flash-lite",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemini-3.6-flash",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemini-3.7-flash",
				"google-generative-ai",
				21
			],
			[
				"google",
				"gemini-3.8-flash",
				"google-generative-ai",
				21
			],
			[
				"google",
				"gemini-flash-latest",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemini-flash-lite-latest",
				"google-generative-ai",
				19
			],
			[
				"google",
				"gemma-4-26b-a4b-it",
				"google-generative-ai",
				22
			],
			[
				"google",
				"gemma-4-31b-it",
				"google-generative-ai",
				22
			],
			[
				"groq",
				"openai/gpt-oss-120b",
				"openai-completions",
				1
			],
			[
				"groq",
				"openai/gpt-oss-20b",
				"openai-completions",
				1
			],
			[
				"groq",
				"openai/gpt-oss-safeguard-20b",
				"openai-completions",
				1
			],
			[
				"groq",
				"qwen/qwen3.6-27b",
				"openai-completions",
				23
			],
			[
				"groq",
				"qwen/qwen3.8-27b",
				"openai-completions",
				7
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-R1",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-R1-0528",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-V3.1",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-V3.2",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-V4-Flash",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-V4-Flash-0731",
				"openai-completions",
				24
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-V4-Flash-Vision-Exp",
				"openai-completions",
				6
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-V4-Pro",
				"openai-completions",
				25
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-V4-Pro-0813",
				"openai-completions",
				6
			],
			[
				"huggingface",
				"deepseek-ai/DeepSeek-V4.1-Flash",
				"openai-completions",
				26
			],
			[
				"huggingface",
				"google/gemma-4-26B-A4B-it",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"google/gemma-4-31B-it",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"MiniMaxAI/MiniMax-M2",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"MiniMaxAI/MiniMax-M2.1",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"MiniMaxAI/MiniMax-M2.5",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"MiniMaxAI/MiniMax-M2.7",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"MiniMaxAI/MiniMax-M3",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"moonshotai/Kimi-K2-Thinking",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"moonshotai/Kimi-K2.5",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"moonshotai/Kimi-K2.6",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"moonshotai/Kimi-K2.7-Code",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"moonshotai/Kimi-K3",
				"openai-completions",
				6
			],
			[
				"huggingface",
				"openai/gpt-oss-120b",
				"openai-completions",
				1
			],
			[
				"huggingface",
				"openai/gpt-oss-20b",
				"openai-completions",
				1
			],
			[
				"huggingface",
				"Qwen/Qwen3-235B-A22B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3-235B-A22B-Thinking-2507",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3-30B-A3B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3-32B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3-VL-235B-A22B-Thinking",
				"openai-completions",
				1
			],
			[
				"huggingface",
				"Qwen/Qwen3.5-122B-A10B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3.5-27B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3.5-35B-A3B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3.5-397B-A17B",
				"openai-completions",
				7
			],
			[
				"huggingface",
				"Qwen/Qwen3.5-9B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3.6-27B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3.6-35B-A3B",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"Qwen/Qwen3.8-2.4T-A95B",
				"openai-completions",
				12
			],
			[
				"huggingface",
				"Qwen/Qwen3.8-27B",
				"openai-completions",
				12
			],
			[
				"huggingface",
				"stepfun-ai/Step-3.5-Flash",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"stepfun-ai/Step-3.7-Flash",
				"openai-completions",
				1
			],
			[
				"huggingface",
				"tencent/Hy3",
				"openai-completions",
				27
			],
			[
				"huggingface",
				"tencent/Hy4-preview",
				"openai-completions",
				10
			],
			[
				"huggingface",
				"thinkingmachines/Inkling",
				"openai-completions",
				1
			],
			[
				"huggingface",
				"thinkingmachines/Inkling-Small",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"XiaomiMiMo/MiMo-V2-Flash",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"XiaomiMiMo/MiMo-V2.5",
				"openai-completions",
				28
			],
			[
				"huggingface",
				"XiaomiMiMo/MiMo-V2.5-Pro",
				"openai-completions",
				28
			],
			[
				"huggingface",
				"zai-org/GLM-4.5",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-4.5-Air",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-4.5V",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-4.6",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-4.6V-Flash",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-4.7",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-4.7-Flash",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-5",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-5.1",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-5.2",
				"openai-completions",
				11
			],
			[
				"huggingface",
				"zai-org/GLM-5.3",
				"openai-completions",
				6
			],
			[
				"huggingface",
				"zai-org/GLM-5.3-Flash",
				"openai-completions",
				6
			],
			[
				"moonshotai",
				"kimi-k2.6",
				"openai-completions",
				29
			],
			[
				"moonshotai",
				"kimi-k2.7-code",
				"openai-completions",
				30
			],
			[
				"moonshotai",
				"kimi-k2.7-code-highspeed",
				"openai-completions",
				30
			],
			[
				"moonshotai",
				"kimi-k3",
				"openai-completions",
				6
			],
			[
				"moonshotai-cn",
				"kimi-k2.6",
				"openai-completions",
				29
			],
			[
				"moonshotai-cn",
				"kimi-k2.7-code",
				"openai-completions",
				30
			],
			[
				"moonshotai-cn",
				"kimi-k2.7-code-highspeed",
				"openai-completions",
				30
			],
			[
				"moonshotai-cn",
				"kimi-k3",
				"openai-completions",
				6
			],
			[
				"nvidia",
				"deepseek-ai/deepseek-v4.1-flash",
				"openai-completions",
				8
			],
			[
				"opencode",
				"gemini-3-flash",
				"google-generative-ai",
				19
			],
			[
				"opencode",
				"gemini-3.1-pro",
				"google-generative-ai",
				21
			],
			[
				"opencode",
				"gemini-3.5-flash",
				"google-generative-ai",
				19
			],
			[
				"opencode",
				"gemini-3.5-flash-lite",
				"google-generative-ai",
				19
			],
			[
				"opencode",
				"gemini-3.6-flash",
				"google-generative-ai",
				19
			],
			[
				"opencode",
				"gemini-3.7-flash",
				"google-generative-ai",
				21
			],
			[
				"opencode",
				"gemini-3.8-flash",
				"google-generative-ai",
				21
			],
			[
				"opencode",
				"big-pickle",
				"openai-completions",
				11
			],
			[
				"opencode",
				"deepseek-v4-flash",
				"openai-completions",
				6
			],
			[
				"opencode",
				"deepseek-v4-flash-vision-exp",
				"openai-completions",
				6
			],
			[
				"opencode",
				"deepseek-v4-pro",
				"openai-completions",
				24
			],
			[
				"opencode",
				"deepseek-v4.1-flash",
				"openai-completions",
				6
			],
			[
				"opencode",
				"exo-free",
				"openai-completions",
				25
			],
			[
				"opencode",
				"fledge-alpha-free",
				"openai-completions",
				6
			],
			[
				"opencode",
				"glm-5",
				"openai-completions",
				11
			],
			[
				"opencode",
				"glm-5.1",
				"openai-completions",
				11
			],
			[
				"opencode",
				"glm-5.2",
				"openai-completions",
				24
			],
			[
				"opencode",
				"glm-5.3",
				"openai-completions",
				6
			],
			[
				"opencode",
				"glm-5.3-flash",
				"openai-completions",
				6
			],
			[
				"opencode",
				"kimi-k2.5",
				"openai-completions",
				11
			],
			[
				"opencode",
				"kimi-k2.6",
				"openai-completions",
				29
			],
			[
				"opencode",
				"kimi-k2.7-code",
				"openai-completions",
				11
			],
			[
				"opencode",
				"kimi-k3",
				"openai-completions",
				31
			],
			[
				"opencode",
				"ling-3.0-flash-fin-free",
				"openai-completions",
				11
			],
			[
				"opencode",
				"ling-3.1-flash-free",
				"openai-completions",
				11
			],
			[
				"opencode",
				"longcat-2.5-preview-free",
				"openai-completions",
				11
			],
			[
				"opencode",
				"mimo-v2.6-flash-free",
				"openai-completions",
				11
			],
			[
				"opencode",
				"minimax-m2.5",
				"openai-completions",
				11
			],
			[
				"opencode",
				"minimax-m2.7",
				"openai-completions",
				11
			],
			[
				"opencode",
				"minimax-m3",
				"openai-completions",
				11
			],
			[
				"opencode",
				"mistral-large-4",
				"openai-completions",
				10
			],
			[
				"opencode",
				"nemotron-3-ultra-free",
				"openai-completions",
				11
			],
			[
				"opencode",
				"nemotron-3.5-lightning-free",
				"openai-completions",
				11
			],
			[
				"opencode",
				"qwen3.8-max",
				"openai-completions",
				11
			],
			[
				"opencode",
				"space-bunny-free",
				"openai-completions",
				32
			],
			[
				"opencode-go",
				"deepseek-v4-flash",
				"openai-completions",
				14
			],
			[
				"opencode-go",
				"deepseek-v4-flash-vision-exp",
				"openai-completions",
				14
			],
			[
				"opencode-go",
				"deepseek-v4-pro",
				"openai-completions",
				9
			],
			[
				"opencode-go",
				"deepseek-v4.1-flash",
				"openai-completions",
				33
			],
			[
				"opencode-go",
				"glm-5.2",
				"openai-completions",
				24
			],
			[
				"opencode-go",
				"glm-5.3",
				"openai-completions",
				6
			],
			[
				"opencode-go",
				"glm-5.3-flash",
				"openai-completions",
				6
			],
			[
				"opencode-go",
				"hy3",
				"openai-completions",
				27
			],
			[
				"opencode-go",
				"hy4-preview",
				"openai-completions",
				10
			],
			[
				"opencode-go",
				"kimi-k2.7-code",
				"openai-completions",
				11
			],
			[
				"opencode-go",
				"kimi-k3",
				"openai-completions",
				31
			],
			[
				"opencode-go",
				"longcat-2.0",
				"openai-completions",
				11
			],
			[
				"opencode-go",
				"longcat-2.5-preview-free",
				"openai-completions",
				11
			],
			[
				"opencode-go",
				"mimo-v2.5",
				"openai-completions",
				11
			],
			[
				"opencode-go",
				"mimo-v2.5-pro",
				"openai-completions",
				11
			],
			[
				"opencode-go",
				"mimo-v2.6-flash",
				"openai-completions",
				11
			],
			[
				"opencode-go",
				"mimo-v2.6-pro",
				"openai-completions",
				11
			],
			[
				"opencode-go",
				"minimax-m2.7",
				"openai-completions",
				11
			],
			[
				"opencode-go",
				"space-bunny",
				"openai-completions",
				32
			],
			[
				"openrouter",
				"~anthropic/claude-fable-latest",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"~anthropic/claude-haiku-latest",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"~anthropic/claude-opus-latest",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"~anthropic/claude-sonnet-latest",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"~deepseek/deepseek-flash-latest",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"~deepseek/deepseek-pro-latest",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"~deepseek/deepseek-v4-flash-latest",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"~google/gemini-flash-latest",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"~google/gemini-pro-latest",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"~moonshotai/kimi-latest",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"~openai/gpt-astra-latest",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"~openai/gpt-luna-latest",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"~openai/gpt-mini-latest",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"~openai/gpt-sol-latest",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"~openai/gpt-terra-latest",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"~x-ai/grok-latest",
				"openai-completions",
				39
			],
			[
				"openrouter",
				"~z-ai/glm-flash-latest",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"~z-ai/glm-latest",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"aion-labs/aion-2.0",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"aion-labs/aion-3.0",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"aion-labs/aion-3.0-mini",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"aion-labs/aion-3.5",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"aion-labs/aion-3.5-mini",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"amazon/nova-2-lite-v1",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"anthropic/claude-fable-5:batch",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"anthropic/claude-fable-5.1:batch",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"anthropic/claude-haiku-4.5:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"anthropic/claude-haiku-5.5:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"anthropic/claude-opus-4.1:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"anthropic/claude-opus-4.5:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"anthropic/claude-opus-4.6:batch",
				"openai-completions",
				43
			],
			[
				"openrouter",
				"anthropic/claude-opus-4.7:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"anthropic/claude-opus-4.8:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"anthropic/claude-opus-5:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"anthropic/claude-opus-5.5:batch",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"anthropic/claude-sonnet-4.5:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"anthropic/claude-sonnet-4.6:batch",
				"openai-completions",
				43
			],
			[
				"openrouter",
				"anthropic/claude-sonnet-5:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"anthropic/claude-sonnet-5.5:batch",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"apodex/apodex-1.1-mini:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"arcee-ai/trinity-large-thinking",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"auto",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"bytedance-seed/seed-1.6",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"bytedance-seed/seed-1.6-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"bytedance-seed/seed-2-1-turbo",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"bytedance-seed/seed-2.0-code",
				"openai-completions",
				44
			],
			[
				"openrouter",
				"bytedance-seed/seed-2.0-lite",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"bytedance-seed/seed-2.0-mini",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"cohere/command-a-plus",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"cohere/north-mini-code:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"deepseek/deepseek-chat-v3.1",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"deepseek/deepseek-r1",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"deepseek/deepseek-r1-0528",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"deepseek/deepseek-v3.1-terminus",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"deepseek/deepseek-v3.2",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"deepseek/deepseek-v3.2-exp",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"deepseek/deepseek-v4-flash",
				"openai-completions",
				45
			],
			[
				"openrouter",
				"deepseek/deepseek-v4-flash-0731",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"deepseek/deepseek-v4-flash-vision-exp",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"deepseek/deepseek-v4-pro",
				"openai-completions",
				45
			],
			[
				"openrouter",
				"deepseek/deepseek-v4-pro-0813",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"deepseek/deepseek-v4.1-flash",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"deepseek/deepseek-v4.1-flash:batch",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"dots-studio/dots-3-note-preview:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"fireworks/ember-1",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"google/gemini-2.5-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-2.5-flash-lite",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-2.5-flash-lite:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-2.5-flash:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-2.5-pro",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-2.5-pro-preview",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-2.5-pro:batch",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-3-flash-preview",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-3-flash-preview:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-3-pro-image",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-3.1-flash-lite",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-3.1-flash-lite-preview",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-3.1-flash-lite:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemini-3.1-pro-preview",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"google/gemini-3.1-pro-preview-customtools",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"google/gemini-3.1-pro-preview:batch",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"google/gemini-3.5-flash",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-3.5-flash-lite",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-3.5-flash-lite:batch",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-3.5-flash:batch",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-3.6-flash",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-3.6-flash:batch",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"google/gemini-3.7-flash",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"google/gemini-3.7-flash:batch",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"google/gemini-3.8-flash",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"google/gemini-3.8-flash:batch",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"google/gemini-nano-banana-2.1",
				"openai-completions",
				46
			],
			[
				"openrouter",
				"google/gemma-4-26b-a4b-it",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemma-4-26b-a4b-it:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemma-4-31b-it",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"google/gemma-4-31b-it:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"ibm-granite/granite-4.2-8b",
				"openai-completions",
				47
			],
			[
				"openrouter",
				"inception/mercury-2",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"inception/mercury-2.5",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"inclusionai/ling-3.0-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"inclusionai/ling-3.0-flash-fin",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"inclusionai/ling-3.0-flash-sante:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"inclusionai/ling-3.0-flash-vl",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"inclusionai/ling-3.1-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"liquid/lfm-2.5-2.6b:free",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"meituan/longcat-2.0",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"meta/muse-glimmer-30b",
				"openai-completions",
				39
			],
			[
				"openrouter",
				"meta/muse-spark-1.1",
				"openai-completions",
				48
			],
			[
				"openrouter",
				"meta/muse-spark-1.2",
				"openai-completions",
				48
			],
			[
				"openrouter",
				"meta/muse-spark-1.2-contributor",
				"openai-completions",
				48
			],
			[
				"openrouter",
				"meta/muse-spark-1.3",
				"openai-completions",
				49
			],
			[
				"openrouter",
				"meta/muse-spark-1.3-contributor",
				"openai-completions",
				49
			],
			[
				"openrouter",
				"minimax/minimax-m1",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"minimax/minimax-m2",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"minimax/minimax-m2.1",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"minimax/minimax-m2.5",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"minimax/minimax-m2.7",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"minimax/minimax-m3",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"mistralai/mistral-large-4-0",
				"openai-completions",
				50
			],
			[
				"openrouter",
				"mistralai/mistral-medium-3-5",
				"openai-completions",
				50
			],
			[
				"openrouter",
				"mistralai/mistral-medium-3-5:batch",
				"openai-completions",
				50
			],
			[
				"openrouter",
				"mistralai/mistral-small-2603",
				"openai-completions",
				50
			],
			[
				"openrouter",
				"mistralai/mistral-small-2603:batch",
				"openai-completions",
				50
			],
			[
				"openrouter",
				"moonshotai/kimi-k2-thinking",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"moonshotai/kimi-k2.5",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"moonshotai/kimi-k2.6",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"moonshotai/kimi-k2.7-code",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"moonshotai/kimi-k3",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"moonshotai/kimi-k3:batch",
				"openai-completions",
				36
			],
			[
				"openrouter",
				"nex-agi/nex-n2.5-pro",
				"openai-completions",
				51
			],
			[
				"openrouter",
				"nvidia/nemotron-3-nano-30b-a3b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"nvidia/nemotron-3-super-120b-a12b",
				"openai-completions",
				52
			],
			[
				"openrouter",
				"nvidia/nemotron-3-super-120b-a12b:free",
				"openai-completions",
				52
			],
			[
				"openrouter",
				"nvidia/nemotron-3-ultra-550b-a55b",
				"openai-completions",
				51
			],
			[
				"openrouter",
				"nvidia/nemotron-3-ultra-550b-a55b:free",
				"openai-completions",
				51
			],
			[
				"openrouter",
				"nvidia/nemotron-3.5-lightning",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"nvidia/nemotron-3.5-lightning:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openai/gpt-5",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"openai/gpt-5-mini",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"openai/gpt-5-mini:batch",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"openai/gpt-5-nano",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"openai/gpt-5-nano:batch",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"openai/gpt-5-pro",
				"openai-completions",
				53
			],
			[
				"openrouter",
				"openai/gpt-5-pro:batch",
				"openai-completions",
				53
			],
			[
				"openrouter",
				"openai/gpt-5:batch",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"openai/gpt-5.1",
				"openai-completions",
				44
			],
			[
				"openrouter",
				"openai/gpt-5.1-codex",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"openai/gpt-5.1-codex-max",
				"openai-completions",
				39
			],
			[
				"openrouter",
				"openai/gpt-5.1-codex-mini",
				"openai-completions",
				44
			],
			[
				"openrouter",
				"openai/gpt-5.1:batch",
				"openai-completions",
				44
			],
			[
				"openrouter",
				"openai/gpt-5.2",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.2-codex",
				"openai-completions",
				39
			],
			[
				"openrouter",
				"openai/gpt-5.2-pro",
				"openai-completions",
				54
			],
			[
				"openrouter",
				"openai/gpt-5.2-pro:batch",
				"openai-completions",
				54
			],
			[
				"openrouter",
				"openai/gpt-5.2:batch",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.3-codex",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.4",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.4-mini",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.4-mini:batch",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.4-nano",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.4-nano:batch",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.4-pro",
				"openai-completions",
				54
			],
			[
				"openrouter",
				"openai/gpt-5.4-pro:batch",
				"openai-completions",
				54
			],
			[
				"openrouter",
				"openai/gpt-5.4:batch",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.5",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.5-pro",
				"openai-completions",
				54
			],
			[
				"openrouter",
				"openai/gpt-5.5-pro:batch",
				"openai-completions",
				54
			],
			[
				"openrouter",
				"openai/gpt-5.5:batch",
				"openai-completions",
				38
			],
			[
				"openrouter",
				"openai/gpt-5.6-luna",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-luna-pro",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-luna-pro:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-luna:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-sol",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-sol-pro",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-sol-pro:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-sol:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-terra",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-terra-pro",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-terra-pro:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-5.6-terra:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6-astra",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"openai/gpt-6-astra-pro",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"openai/gpt-6-astra-pro:batch",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"openai/gpt-6-astra:batch",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"openai/gpt-6-luna",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6-luna-pro",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6-luna-pro:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6-luna:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6-sol",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6-sol-pro",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6-sol-pro:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6-sol:batch",
				"openai-completions",
				35
			],
			[
				"openrouter",
				"openai/gpt-6.1-sol",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"openai/gpt-6.1-sol-pro",
				"openai-completions",
				34
			],
			[
				"openrouter",
				"openai/gpt-oss-120b",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"openai/gpt-oss-120b:batch",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"openai/gpt-oss-20b",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"openai/gpt-oss-20b:batch",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"openai/gpt-oss-safeguard-20b",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"openai/o1",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openai/o3",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openai/o3-mini",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openai/o3-mini-high",
				"openai-completions",
				53
			],
			[
				"openrouter",
				"openai/o3-mini:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openai/o3-pro",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openai/o3:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openai/o4-mini",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openai/o4-mini-high",
				"openai-completions",
				53
			],
			[
				"openrouter",
				"openai/o4-mini:batch",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openrouter/auto",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openrouter/auto-beta",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openrouter/free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"openrouter/fusion",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"perceptron/perceptron-mk1.5",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"poolside/laguna-s-2.1",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"poolside/laguna-s-2.1:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"poolside/laguna-xs-2.1",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"poolside/laguna-xs-2.1:free",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"prism-ml/ternary-bonsai-2-27b",
				"openai-completions",
				55
			],
			[
				"openrouter",
				"qwen/qwen3-14b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3-235b-a22b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3-235b-a22b-thinking-2507",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"qwen/qwen3-30b-a3b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3-30b-a3b-thinking-2507",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"qwen/qwen3-32b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3-8b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3-max-thinking",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3-next-80b-a3b-thinking",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"qwen/qwen3-vl-235b-a22b-thinking",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"qwen/qwen3-vl-30b-a3b-thinking",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"qwen/qwen3-vl-8b-thinking",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"qwen/qwen3.5-122b-a10b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.5-27b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.5-35b-a3b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.5-397b-a17b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.5-9b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.5-flash-02-23",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.5-plus-02-15",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.5-plus-20260420",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.6-27b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.6-35b-a3b",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.6-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.6-max-preview",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.6-plus",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.7-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.7-max",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.7-plus",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.8-2.4t-a95b",
				"openai-completions",
				56
			],
			[
				"openrouter",
				"qwen/qwen3.8-27b",
				"openai-completions",
				57
			],
			[
				"openrouter",
				"qwen/qwen3.8-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"qwen/qwen3.8-max-0902",
				"openai-completions",
				48
			],
			[
				"openrouter",
				"qwen/qwen3.8-max-prime",
				"openai-completions",
				48
			],
			[
				"openrouter",
				"qwen/qwen3.8-omni-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"sakana/fugu-max",
				"openai-completions",
				58
			],
			[
				"openrouter",
				"sakana/fugu-ultra",
				"openai-completions",
				58
			],
			[
				"openrouter",
				"sakana/fugu-ultra-v2",
				"openai-completions",
				58
			],
			[
				"openrouter",
				"sakana/sakana-namazu",
				"openai-completions",
				50
			],
			[
				"openrouter",
				"stepfun/step-3.5-flash",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"stepfun/step-3.7-flash",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"tencent/hy3",
				"openai-completions",
				47
			],
			[
				"openrouter",
				"tencent/hy3-preview",
				"openai-completions",
				47
			],
			[
				"openrouter",
				"tencent/hy4-preview",
				"openai-completions",
				47
			],
			[
				"openrouter",
				"thinkingmachines/inkling",
				"openai-completions",
				59
			],
			[
				"openrouter",
				"thinkingmachines/inkling-small",
				"openai-completions",
				59
			],
			[
				"openrouter",
				"thinkingmachines/inkling-small:free",
				"openai-completions",
				59
			],
			[
				"openrouter",
				"thinkingmachines/inkling:free",
				"openai-completions",
				59
			],
			[
				"openrouter",
				"typesafe/jev-router",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"upstage/solar-mini4",
				"openai-completions",
				60
			],
			[
				"openrouter",
				"upstage/solar-pro-3",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"upstage/solar-pro4",
				"openai-completions",
				60
			],
			[
				"openrouter",
				"x-ai/grok-4.20",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"x-ai/grok-4.3",
				"openai-completions",
				44
			],
			[
				"openrouter",
				"x-ai/grok-4.3:batch",
				"openai-completions",
				44
			],
			[
				"openrouter",
				"x-ai/grok-4.5",
				"openai-completions",
				37
			],
			[
				"openrouter",
				"x-ai/grok-4.6",
				"openai-completions",
				39
			],
			[
				"openrouter",
				"x-ai/grok-4.7",
				"openai-completions",
				39
			],
			[
				"openrouter",
				"x-ai/grok-build-0.1",
				"openai-completions",
				41
			],
			[
				"openrouter",
				"xiaomi/mimo-v2.5",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"xiaomi/mimo-v2.5-pro",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"xiaomi/mimo-v2.6-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"xiaomi/mimo-v2.6-pro",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"xiaomi/mimo-v2.6-pro-ultraspeed",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-4.5",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-4.5-air",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-4.5v",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-4.6",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-4.6v",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-4.7",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-4.7-flash",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-5",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-5-turbo",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-5.1",
				"openai-completions",
				42
			],
			[
				"openrouter",
				"z-ai/glm-5.2",
				"openai-completions",
				45
			],
			[
				"openrouter",
				"z-ai/glm-5.3",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"z-ai/glm-5.3-flash",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"z-ai/glm-5.3-flash:batch",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"z-ai/glm-5.3-flashx",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"z-ai/glm-5.3-prime",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"z-ai/glm-5.3:batch",
				"openai-completions",
				40
			],
			[
				"openrouter",
				"z-ai/glm-5v-turbo",
				"openai-completions",
				42
			],
			[
				"qwen-token-plan",
				"deepseek-v3.2",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"deepseek-v4-flash",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan",
				"deepseek-v4-flash-0731",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan",
				"deepseek-v4-pro",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan",
				"deepseek-v4-pro-0813",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan",
				"deepseek-v4.1-flash",
				"openai-completions",
				63
			],
			[
				"qwen-token-plan",
				"glm-5",
				"openai-completions",
				64
			],
			[
				"qwen-token-plan",
				"glm-5.1",
				"openai-completions",
				64
			],
			[
				"qwen-token-plan",
				"glm-5.2",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan",
				"glm-5.3",
				"openai-completions",
				63
			],
			[
				"qwen-token-plan",
				"kimi-k2.5",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"kimi-k2.6",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"kimi-k2.7-code",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"MiniMax-M2.5",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"qwen3.6-flash",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"qwen3.6-plus",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"qwen3.7-max",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"qwen3.7-plus",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan",
				"qwen3.8-flash",
				"openai-completions",
				65
			],
			[
				"qwen-token-plan",
				"qwen3.8-max",
				"openai-completions",
				65
			],
			[
				"qwen-token-plan-cn",
				"deepseek-v3.2",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"deepseek-v4-flash",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-cn",
				"deepseek-v4-flash-0731",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-cn",
				"deepseek-v4-pro",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-cn",
				"deepseek-v4-pro-0813",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-cn",
				"deepseek-v4.1-flash",
				"openai-completions",
				63
			],
			[
				"qwen-token-plan-cn",
				"glm-5",
				"openai-completions",
				64
			],
			[
				"qwen-token-plan-cn",
				"glm-5.1",
				"openai-completions",
				64
			],
			[
				"qwen-token-plan-cn",
				"glm-5.2",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-cn",
				"glm-5.3",
				"openai-completions",
				63
			],
			[
				"qwen-token-plan-cn",
				"kimi-k2.5",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"kimi-k2.6",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"kimi-k2.7-code",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"MiniMax-M2.5",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"qwen3.6-flash",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"qwen3.6-plus",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"qwen3.7-max",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"qwen3.7-plus",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-cn",
				"qwen3.8-flash",
				"openai-completions",
				65
			],
			[
				"qwen-token-plan-cn",
				"qwen3.8-max",
				"openai-completions",
				65
			],
			[
				"qwen-token-plan-individual",
				"deepseek-v4-flash-0731",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-individual",
				"deepseek-v4-pro",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-individual",
				"deepseek-v4-pro-0813",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-individual",
				"glm-5.2",
				"openai-completions",
				62
			],
			[
				"qwen-token-plan-individual",
				"qwen3.6-flash",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-individual",
				"qwen3.7-max",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-individual",
				"qwen3.7-plus",
				"openai-completions",
				61
			],
			[
				"qwen-token-plan-individual",
				"qwen3.8-flash",
				"openai-completions",
				65
			],
			[
				"qwen-token-plan-individual",
				"qwen3.8-max",
				"openai-completions",
				65
			],
			[
				"together",
				"deepseek-ai/DeepSeek-V4-Flash-0731",
				"openai-completions",
				66
			],
			[
				"together",
				"deepseek-ai/DeepSeek-V4-Pro-0813",
				"openai-completions",
				67
			],
			[
				"together",
				"deepseek-ai/DeepSeek-V4.1-Flash",
				"openai-completions",
				66
			],
			[
				"together",
				"MiniMaxAI/MiniMax-M2.7",
				"openai-completions",
				68
			],
			[
				"together",
				"MiniMaxAI/MiniMax-M3",
				"openai-completions",
				66
			],
			[
				"together",
				"moonshotai/Kimi-K3",
				"openai-completions",
				66
			],
			[
				"together",
				"nvidia/nemotron-3-ultra-550b-a55b",
				"openai-completions",
				66
			],
			[
				"together",
				"openai/gpt-oss-120b",
				"openai-completions",
				1
			],
			[
				"together",
				"Qwen/Qwen3.5-9B",
				"openai-completions",
				66
			],
			[
				"together",
				"Qwen/Qwen3.6-Plus",
				"openai-completions",
				66
			],
			[
				"together",
				"thinkingmachines/Inkling",
				"openai-completions",
				66
			],
			[
				"together",
				"zai-org/GLM-5.2",
				"openai-completions",
				66
			],
			[
				"together",
				"zai-org/GLM-5.3",
				"openai-completions",
				66
			],
			[
				"together",
				"zai-org/GLM-5.3-Flash",
				"openai-completions",
				66
			],
			[
				"xiaomi",
				"mimo-v2.5",
				"openai-completions",
				69
			],
			[
				"xiaomi",
				"mimo-v2.5-pro",
				"openai-completions",
				69
			],
			[
				"xiaomi",
				"mimo-v2.5-pro-ultraspeed",
				"openai-completions",
				69
			],
			[
				"xiaomi",
				"mimo-v2.6-flash",
				"openai-completions",
				69
			],
			[
				"xiaomi",
				"mimo-v2.6-pro",
				"openai-completions",
				69
			],
			[
				"xiaomi",
				"mimo-v2.6-pro-ultraspeed",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-ams",
				"mimo-v2.5",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-ams",
				"mimo-v2.5-pro",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-ams",
				"mimo-v2.6-flash",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-ams",
				"mimo-v2.6-pro",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-cn",
				"mimo-v2.5",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-cn",
				"mimo-v2.5-pro",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-cn",
				"mimo-v2.6-flash",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-cn",
				"mimo-v2.6-pro",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-sgp",
				"mimo-v2.5",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-sgp",
				"mimo-v2.5-pro",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-sgp",
				"mimo-v2.6-flash",
				"openai-completions",
				69
			],
			[
				"xiaomi-token-plan-sgp",
				"mimo-v2.6-pro",
				"openai-completions",
				69
			],
			[
				"zai",
				"glm-4.7",
				"openai-completions",
				70
			],
			[
				"zai",
				"glm-5-turbo",
				"openai-completions",
				70
			],
			[
				"zai",
				"glm-5.2",
				"openai-completions",
				71
			],
			[
				"zai",
				"glm-5.2-highspeed",
				"openai-completions",
				71
			],
			[
				"zai",
				"glm-5.3",
				"openai-completions",
				72
			],
			[
				"zai",
				"glm-5.3-flash",
				"openai-completions",
				72
			],
			[
				"zai",
				"glm-5.3-highspeed",
				"openai-completions",
				72
			],
			[
				"zai-coding-cn",
				"glm-4.6v",
				"openai-completions",
				70
			],
			[
				"zai-coding-cn",
				"glm-5.3",
				"openai-completions",
				72
			],
			[
				"zai-coding-cn",
				"glm-5.3-flash",
				"openai-completions",
				72
			],
			[
				"zai-coding-cn",
				"glm-5.3-highspeed",
				"openai-completions",
				72
			]
		];
		//#endregion
		//#region src/api/omni-reasoning.ts
		const omniReasoningEffortSchema = enumType([
			"off",
			"minimal",
			"low",
			"medium",
			"high",
			"xhigh",
			"max"
		]);
		const omniReasoningPreferenceSchema = unionType([literalType("default"), omniReasoningEffortSchema]);
		function profile(model) {
			for (const id of [...new Set([model.id, model.upstreamModelId].filter((value) => !!value))]) for (const vendor of [model.vendorLabel, modelVendorLabel(id, model.name, model.provider)]) {
				if (!vendor) continue;
				const entry = omniReasoningModels.find((entry) => entry[0] === modelVendorId(vendor) && entry[1] === id && entry[2] === model.protocol);
				if (entry) return omniReasoningProfiles[entry[3]];
			}
		}
		function omniReasoningEfforts(model) {
			const available = profile(model);
			return omniReasoningEffortSchema.options.filter((level) => available?.[level] !== void 0);
		}
		/** 传输安全上限独立于用户偏好；大文件只能经支持的分块接口发送。 */
		const OMNI_MAX_MEDIA_BYTES = 2e9;
		const OMNI_MAX_INLINE_MEDIA_BYTES = 75e6;
		const OMNI_MEDIA_SIZE_MESSAGE = "原始音视频素材合计超过传输上限 2,000 MB，请压缩或分段后重试。";
		const OMNI_REQUEST_SIZE_MESSAGE = "音视频请求内容过大，请减少附件数量或缩短指令后重试。";
		/** 分块大小只是传输窗口，不是文件大小限制。 */
		const OMNI_CHUNK_BYTES = 4 * 1024 * 1024;
		const OMNI_MAX_RESULT_CHARS = 32e3;
		enumType(["audio", "video"]);
		const omniMimeTypes = [
			"audio/wav",
			"audio/mpeg",
			"audio/mp3",
			"audio/mp4",
			"audio/m4a",
			"audio/aac",
			"audio/flac",
			"audio/ogg",
			"audio/webm",
			"audio/aiff",
			"audio/opus",
			"video/mp4",
			"video/webm",
			"video/quicktime",
			"video/mpeg",
			"video/x-msvideo",
			"video/x-flv",
			"video/3gpp",
			"video/x-ms-wmv",
			"video/x-matroska"
		];
		const mediaLimitsSchema = recordType(stringType().min(1).max(300), numberType().int().min(1).max(OMNI_MAX_MEDIA_BYTES / 1e6));
		const omniPreferencesSchema = objectType({
			audioModelId: stringType().max(300).default(""),
			videoModelId: stringType().max(300).default(""),
			audioReasoningEffort: omniReasoningPreferenceSchema.optional(),
			videoReasoningEffort: omniReasoningPreferenceSchema.optional(),
			modelMaxMediaMB: mediaLimitsSchema.optional(),
			audioModelMaxMediaMB: mediaLimitsSchema.optional(),
			videoModelMaxMediaMB: mediaLimitsSchema.optional()
		}).strict();
		/** 旧版共用上限作为各类型未单独设置时的默认值。 */
		function omniMediaLimitMB(preferences, modelId, kind) {
			const limits = kind === "audio" ? preferences.audioModelMaxMediaMB : kind === "video" ? preferences.videoModelMaxMediaMB : void 0;
			if (limits && Object.hasOwn(limits, modelId)) return limits[modelId];
			const legacy = preferences.modelMaxMediaMB;
			return legacy && Object.hasOwn(legacy, modelId) ? legacy[modelId] : 25;
		}
		function hasModelId(model, pattern) {
			return [model.id, model.upstreamModelId].some((id) => id !== void 0 && pattern.test(id));
		}
		/** 厂商与模型身份只用于选择请求格式，不能补造目录没有声明的输入能力。 */
		function isQwenOmni(model) {
			return hasModelId(model, /^(?:qwen[/-])?qwen/iu) || /^(?:qwen-token-plan|alibaba)(?:-|$)/u.test(modelVendorId(model.vendorLabel ?? ""));
		}
		/** MiMo 可经兼容渠道发布，未设置厂商标签时仍按公开模型 ID 识别。 */
		function isMimoOmni(model) {
			return hasModelId(model, /^(?:xiaomi[/-])?mimo-/iu) || /^xiaomi(?:-token-plan(?:-|$)|$)/u.test(modelVendorId(model.vendorLabel ?? ""));
		}
		function isKimiVideo(model) {
			return hasModelId(model, /^(?:moonshotai[/-])?(?:kimi|moonshot)-/iu) || /^(?:moonshotai(?:-|$)|moonshot(?: ai)?$|kimi(?:-coding|$))/u.test(modelVendorId(model.vendorLabel ?? ""));
		}
		function isGlmVideo(model) {
			return hasModelId(model, /^(?:(?:z-ai|zai|zhipuai)[/-])?glm-/iu) || /^(?:zai|zhipuai)(?:-|$)/u.test(modelVendorId(model.vendorLabel ?? "")) || model.vendorLabel?.toLowerCase() === "z.ai";
		}
		/** 只有模型声明和已实现的接口同时满足，才向设置页提供该能力。 */
		function omniSupports(model, kind) {
			return model.inputModalities.includes(kind) && (model.protocol === "google-generative-ai" || model.protocol === "openai-completions" && (kind === "audio" || isQwenOmni(model) || isMimoOmni(model) || isKimiVideo(model) || isGlmVideo(model)));
		}
		function omniByteLength(base64) {
			return base64.length / 4 * 3 - (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);
		}
		const omniFileMetadataSchema = objectType({
			name: stringType().min(1).max(255),
			mimeType: enumType(omniMimeTypes),
			size: numberType().int().positive().max(OMNI_MAX_MEDIA_BYTES, OMNI_MEDIA_SIZE_MESSAGE)
		}).strict();
		/** 避免大块 base64 的嵌套正则回溯，同时拒绝宽松解码产生的歧义。 */
		function base64Schema(maxBytes) {
			return stringType().min(4).max(Math.ceil(maxBytes / 3) * 4).refine((value) => value.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/u.test(value) && omniByteLength(value) <= maxBytes, "无效的文件编码");
		}
		const omniFileSchema = omniFileMetadataSchema.omit({ size: true }).extend({ data: base64Schema(OMNI_MAX_INLINE_MEDIA_BYTES) }).strict();
		const omniCallBase = objectType({
			modelId: stringType().min(1).max(300),
			protocol: enumType(["google-generative-ai", "openai-completions"]),
			instruction: stringType().trim().min(1).max(12e3),
			reasoningEffort: omniReasoningEffortSchema.optional()
		});
		unionType([omniCallBase.extend({ files: arrayType(omniFileSchema).min(1) }).strict().superRefine((request, ctx) => {
			const files = request.files.map((file) => ({
				name: file.name,
				mimeType: file.mimeType,
				size: omniByteLength(file.data)
			}));
			if (omniInlineSizes({
				id: request.modelId,
				protocol: request.protocol
			}, request.instruction, files).gateway > 1e8) ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ["files"],
				message: OMNI_REQUEST_SIZE_MESSAGE
			});
		}), omniCallBase.extend({
			protocol: literalType("google-generative-ai"),
			uploadId: stringType().uuid()
		}).strict()]);
		omniCallBase.pick({ modelId: true }).extend({ files: arrayType(omniFileMetadataSchema).min(1) }).strict().superRefine((value, ctx) => {
			if (value.files.reduce((sum, file) => sum + file.size, 0) > 2e9) ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ["files"],
				message: OMNI_MEDIA_SIZE_MESSAGE
			});
			if (value.files.filter((file) => file.mimeType.startsWith("video/")).length > 10) ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ["files"],
				message: "Gemini 每次最多接收 10 个视频。"
			});
		});
		objectType({
			uploadId: stringType().uuid(),
			chunkBytes: literalType(OMNI_CHUNK_BYTES)
		}).strict();
		objectType({
			offset: numberType().int().nonnegative(),
			data: base64Schema(OMNI_CHUNK_BYTES)
		}).strict();
		objectType({ ready: booleanType() }).strict();
		objectType({ file: objectType({
			name: stringType().regex(/^files\/[A-Za-z0-9_-]+$/u),
			uri: stringType().url(),
			state: enumType([
				"PROCESSING",
				"ACTIVE",
				"FAILED"
			])
		}) });
		objectType({
			modelId: stringType().min(1),
			text: stringType().min(1).max(OMNI_MAX_RESULT_CHARS),
			truncated: booleanType()
		}).strict();
		/** 设置页仅接收安全模型摘要和当前来源的偏好。 */
		const omniSettingsResponseSchema = objectType({
			preferences: omniPreferencesSchema,
			models: arrayType(objectType({
				id: stringType(),
				name: stringType(),
				audio: booleanType(),
				video: booleanType(),
				protocol: stringType(),
				reasoningEfforts: arrayType(omniReasoningEffortSchema).default([])
			})),
			message: stringType()
		});
		function omniAudioFormat(mimeType) {
			return {
				"audio/wav": "wav",
				"audio/mpeg": "mp3",
				"audio/mp3": "mp3",
				"audio/mp4": "m4a"
			}[mimeType] ?? mimeType.slice(6);
		}
		/** Kimi 的视频 MIME 名称与文件系统常用名称不同。 */
		function videoMimeType(model, mimeType) {
			return isKimiVideo(model) ? {
				"video/quicktime": "video/mov",
				"video/x-msvideo": "video/avi",
				"video/x-ms-wmv": "video/wmv"
			}[mimeType] ?? mimeType : mimeType;
		}
		/** Host 的大小预检与 Server 的实际请求使用同一格式，避免漏算编码和封装。 */
		function omniPromptBody(model, instruction, files) {
			if (model.protocol === "google-generative-ai") return {
				contents: [{
					role: "user",
					parts: [{ text: instruction }, ...files.flatMap((file) => [{ text: `文件：${file.name}` }, "uri" in file ? { fileData: {
						mimeType: file.mimeType,
						fileUri: file.uri
					} } : { inlineData: {
						mimeType: file.mimeType,
						data: file.data
					} }])]
				}],
				generationConfig: {
					maxOutputTokens: 8192,
					responseModalities: ["TEXT"]
				}
			};
			const qwen = isQwenOmni(model);
			const mimo = isMimoOmni(model);
			const content = [{
				type: "text",
				text: instruction
			}];
			for (const file of files) {
				if (!("data" in file)) throw new Error("此接口不支持 Gemini 文件引用。");
				content.push({
					type: "text",
					text: `文件：${file.name}`
				});
				content.push(file.mimeType.startsWith("video/") ? {
					type: "video_url",
					video_url: { url: `data:${qwen ? "" : videoMimeType(model, file.mimeType)};base64,${file.data}` }
				} : {
					type: "input_audio",
					input_audio: mimo ? { data: `data:${file.mimeType};base64,${file.data}` } : {
						data: qwen ? `data:;base64,${file.data}` : file.data,
						format: omniAudioFormat(file.mimeType)
					}
				});
			}
			if (isGlmVideo(model) && hasModelId(model, /(?:^|\/)glm-4v-plus-0111$/iu)) {
				const index = content.findIndex((part) => part.type === "video_url");
				if (index > 0) content.unshift(...content.splice(index, 1));
			}
			if (isKimiVideo(model) || isGlmVideo(model)) return {
				model: model.upstreamModelId ?? model.id,
				messages: [{
					role: "user",
					content
				}],
				stream: true
			};
			return {
				model: model.upstreamModelId ?? model.id,
				messages: [{
					role: "user",
					content
				}],
				modalities: ["text"],
				stream: true,
				stream_options: { include_usage: true },
				...qwen ? {} : { store: false }
			};
		}
		/** 不读取文件即可计算完整 JSON 的 UTF-8 字节数；base64 内容只含 ASCII 且不需要转义。 */
		function omniInlineSizes(model, instruction, files) {
			const emptyFiles = files.map((file) => ({
				name: file.name,
				mimeType: file.mimeType,
				data: ""
			}));
			const encodedBytes = files.reduce((sum, file) => sum + Math.ceil(file.size / 3) * 4, 0);
			const jsonSize = (body) => new TextEncoder().encode(JSON.stringify(body)).length;
			return {
				gateway: jsonSize({
					modelId: model.id,
					protocol: model.protocol,
					instruction,
					files: emptyFiles
				}) + encodedBytes,
				provider: jsonSize(omniPromptBody(model, instruction, emptyFiles)) + encodedBytes
			};
		}
		//#endregion
		//#region src/api/omni-ffmpeg.ts
		const omniFfmpegBinarySchema = objectType({
			path: stringType().min(1),
			version: stringType().min(1),
			source: enumType(["system", "managed"])
		}).strict();
		objectType({
			ffmpeg: omniFfmpegBinarySchema,
			ffprobe: omniFfmpegBinarySchema
		}).strict();
		const omniFfmpegStatusSchema = objectType({
			state: enumType([
				"missing",
				"installing",
				"ready",
				"error",
				"unsupported"
			]),
			platform: stringType(),
			canInstall: booleanType(),
			ffmpeg: omniFfmpegBinarySchema.optional(),
			ffprobe: omniFfmpegBinarySchema.optional(),
			downloadedBytes: numberType().int().nonnegative(),
			totalBytes: numberType().int().nonnegative(),
			message: stringType()
		}).strict();
		const omniFfmpegInstallRequestSchema = objectType({ action: literalType("install") }).strict();
		//#endregion
		//#region src/api/media-sense.ts
		const mediaSenseSourceSchema = enumType(["local", "host"]);
		const mediaSenseAdapterSchema = enumType([
			"google-generative-ai",
			"openai-completions",
			"qwen-omni",
			"mimo-omni",
			"kimi-video",
			"glm-video"
		]);
		const mediaSenseLocalModelSchema = objectType({
			id: stringType().uuid(),
			name: stringType().trim().min(1).max(100),
			modelId: stringType().trim().min(1).max(300),
			baseUrl: stringType().trim().url().max(2048).refine((value) => {
				const url = new URL(value);
				return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password && !url.search && !url.hash;
			}, "请填写不含密钥、查询参数或片段的 HTTP(S) 接口地址。"),
			adapter: mediaSenseAdapterSchema,
			audio: booleanType(),
			video: booleanType()
		}).strict();
		const mediaSenseModelWriteSchema = mediaSenseLocalModelSchema.extend({ apiKey: stringType().trim().max(8192).optional() }).superRefine((value, ctx) => {
			if (!value.audio && !value.video) ctx.addIssue({
				code: ZodIssueCode.custom,
				message: "请至少选择一种输入能力。"
			});
			if (value.adapter === "openai-completions" && value.video) ctx.addIssue({
				code: ZodIssueCode.custom,
				message: "标准 Chat Completions 不支持视频，请选择对应的音视频适配器。"
			});
			if (["kimi-video", "glm-video"].includes(value.adapter) && value.audio) ctx.addIssue({
				code: ZodIssueCode.custom,
				message: "Kimi、GLM 视频适配器不支持音频输入。"
			});
		});
		const mediaSenseSettingsWriteSchema = objectType({
			source: mediaSenseSourceSchema,
			preferences: omniPreferencesSchema,
			preferencesBySource: objectType({
				local: omniPreferencesSchema,
				host: omniPreferencesSchema
			}).optional(),
			localModels: arrayType(mediaSenseModelWriteSchema).max(50)
		}).strict().refine((value) => new Set(value.localModels.map((model) => model.id)).size === value.localModels.length, "模型标识不能重复。");
		const mediaSenseSettingsResponseSchema = omniSettingsResponseSchema.extend({
			source: mediaSenseSourceSchema,
			hostSource: objectType({
				label: objectType({
					zh: stringType(),
					en: stringType()
				}),
				available: booleanType()
			}).optional(),
			localModels: arrayType(mediaSenseLocalModelSchema.extend({ hasApiKey: booleanType() })),
			hostModels: omniSettingsResponseSchema.shape.models,
			hostMessage: stringType(),
			preferencesBySource: objectType({
				local: omniPreferencesSchema,
				host: omniPreferencesSchema
			})
		});
		/** 模型身份与输入能力来自独立配置，适配器决定可发送的协议格式。 */
		function mediaSenseModel(model) {
			const inputModalities = ["text"];
			if (model.audio) inputModalities.push("audio");
			if (model.video) inputModalities.push("video");
			return {
				id: model.id,
				name: model.name,
				upstreamModelId: model.modelId,
				provider: model.adapter === "google-generative-ai" ? "google" : "openai",
				protocol: model.adapter === "google-generative-ai" ? "google-generative-ai" : "openai-completions",
				vendorLabel: {
					"qwen-omni": "qwen-token-plan",
					"mimo-omni": "xiaomi",
					"kimi-video": "moonshotai",
					"glm-video": "zai"
				}[model.adapter] ?? "",
				inputModalities
			};
		}
		function mediaSenseModelSummary(local) {
			const model = mediaSenseModel(local);
			return {
				id: model.id,
				name: model.name,
				protocol: model.protocol,
				audio: omniSupports(model, "audio"),
				video: omniSupports(model, "video"),
				reasoningEfforts: omniReasoningEfforts(model)
			};
		}
		//#endregion
		//#region src/client/ModelPicker.tsx
		function MediaIcon({ kind }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				children: kind === "audio" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M3 9v6M7.5 5v14M12 3v18M16.5 7v10M21 9v6" }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "3",
					y: "4",
					width: "18",
					height: "16",
					rx: "3"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m10 8 6 4-6 4V8Z" })] })
			});
		}
		const nameOf = (model) => model.name.trim() || model.id;
		/** 复用客户端菜单的焦点、键盘和弹层定位，模型名称与重复的 ID 不再拼接。 */
		function ModelPicker({ kind, models, value, disabled, loading, onChange, children }) {
			useLocale();
			const [open, setOpen] = (0, react.useState)(false);
			const id = (0, react.useId)(), label = kind === "audio" ? tr("音频模型") : tr("视频模型");
			const model = models.find((model) => model.id === value), missing = !!value && !model;
			const display = model ? nameOf(model) : missing ? value : loading ? tr("正在读取模型…") : models.length ? tr("自动选择（列表第一项）") : tr("暂无可用模型");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "media-sense__model-row",
				"data-omni-kind": kind,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "media-sense__card-header",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "media-sense__media-icon",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MediaIcon, { kind })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						id: `${id}-label`,
						children: label
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: kind === "audio" ? tr("语音转写与音频内容理解") : tr("画面分析与视频片段理解") })] })]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "media-sense__model-controls",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
							open: open && !disabled,
							portal: true,
							autoFocus: true,
							className: "media-sense__picker",
							listClassName: "media-sense__menu",
							selectedId: value,
							onClose: () => setOpen(false),
							onSelect: (id) => {
								onChange(id);
								setOpen(false);
							},
							items: models.map((model) => ({
								id: model.id,
								label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "media-sense__option",
									title: model.id,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: nameOf(model) }), models.some((other) => other.id !== model.id && nameOf(other) === nameOf(model)) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: model.id })]
								})
							})),
							footer: [{
								id: "",
								label: tr("自动选择（列表第一项）")
							}],
							anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "media-sense__select",
								"aria-labelledby": `${id}-label ${id}-value`,
								"aria-label": label,
								"aria-haspopup": "menu",
								"aria-expanded": open && !disabled,
								"aria-describedby": missing ? `${id}-missing` : void 0,
								disabled: disabled || !models.length && !value,
								onClick: () => setOpen((value) => !value),
								title: display,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									id: `${id}-value`,
									"data-placeholder": !value,
									children: display
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 14 })]
							})
						}),
						missing && !loading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							id: `${id}-missing`,
							className: "media-sense__warning",
							children: tr("已选模型不可用，请重新选择。")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "media-sense__parameters",
							children
						})
					]
				})]
			});
		}
		//#endregion
		//#region src/client/ReasoningPicker.tsx
		const labels = {
			default: "Default",
			off: "Off",
			minimal: "Minimal",
			low: "Low",
			medium: "Medium",
			high: "High",
			xhigh: "XHigh",
			max: "Max"
		};
		function ReasoningPicker({ kind, value = "default", efforts, disabled, onChange }) {
			useLocale();
			const [open, setOpen] = (0, react.useState)(false);
			const unavailable = value !== "default" && !efforts.includes(value);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "media-sense__reasoning",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Reasoning effort" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
						open: open && !disabled,
						portal: true,
						autoFocus: true,
						className: "media-sense__picker",
						listClassName: "media-sense__menu",
						selectedId: value,
						onClose: () => setOpen(false),
						onSelect: (id) => {
							onChange(id);
							setOpen(false);
						},
						items: ["default", ...efforts].map((id) => ({
							id,
							label: labels[id]
						})),
						anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "media-sense__select",
							"aria-label": kind === "audio" ? "Audio reasoning effort" : "Video reasoning effort",
							"aria-haspopup": "menu",
							"aria-expanded": open && !disabled,
							disabled: disabled || !efforts.length && !unavailable,
							onClick: () => setOpen((value) => !value),
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: labels[value] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 14 })]
						})
					}),
					unavailable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "media-sense__warning",
						children: tr("所选模型不支持此思考强度，请在 Media Sense 设置中重新选择。")
					})
				]
			});
		}
		//#endregion
		//#region src/client/FfmpegSettings.tsx
		async function request$1(install, signal) {
			const response = await fetch("/media-sense/ffmpeg", {
				signal,
				...install ? {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(omniFfmpegInstallRequestSchema.parse({ action: "install" }))
				} : {}
			});
			const body = await response.json();
			if (!response.ok) throw new Error(body && typeof body === "object" && "message" in body ? String(body.message) : "FFmpeg 请求失败，请重试。");
			return omniFfmpegStatusSchema.parse(body);
		}
		function FfmpegSettings() {
			useLocale();
			const [state, setState] = (0, react.useState)();
			const [error, setError] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(true);
			const [expanded, setExpanded] = (0, react.useState)(false);
			const [action, setAction] = (0, react.useState)({
				attempt: 0,
				install: false
			});
			(0, react.useEffect)(() => {
				const abort = new AbortController();
				let timer;
				const update = async (install) => {
					try {
						const next = await request$1(install, abort.signal);
						if (abort.signal.aborted) return;
						setState(next);
						setError("");
						setBusy(false);
						timer = setTimeout(() => {
							update(false);
						}, next.state === "installing" ? 1e3 : 5e3);
					} catch (cause) {
						if (!abort.signal.aborted) {
							setError(cause instanceof Error ? cause.message : String(cause));
							setBusy(false);
						}
					}
				};
				setBusy(true);
				setError("");
				update(action.install);
				return () => {
					abort.abort();
					clearTimeout(timer);
				};
			}, [action]);
			const installing = state?.state === "installing" && !error;
			const disabled = busy || installing;
			const progress = state?.totalBytes ? Math.min(100, Math.floor(state.downloadedBytes / state.totalBytes * 100)) : 0;
			const ready = state?.state === "ready" && !error;
			const status = error || state?.state === "error" ? tr("检测失败") : busy ? tr("检测中…") : installing ? tr("正在安装…") : ready ? tr("已就绪") : tr("未检测到");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: "media-sense__group media-sense__tools-section",
				"data-media-sense-ffmpeg": true,
				"aria-busy": disabled,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: tr("媒体处理") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "media-sense__tool-panel",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "media-sense__tool-row",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "media-sense__media-icon",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
										width: "20",
										height: "20",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "1.5",
										strokeLinecap: "round",
										"aria-hidden": "true",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4 7h16M4 17h16" }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
												x: "7",
												y: "4",
												width: "4",
												height: "6",
												rx: "1"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
												x: "14",
												y: "14",
												width: "4",
												height: "6",
												rx: "1"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "media-sense__tool-copy",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "FFmpeg" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "media-sense__badge",
										"data-ready": ready,
										role: "status",
										children: status
									})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: tr("音视频处理与媒体信息分析") })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "media-sense__ffmpeg-actions",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											size: "sm",
											disabled,
											onClick: () => setAction((value) => ({
												attempt: value.attempt + 1,
												install: false
											})),
											children: tr("重新检测")
										}),
										state?.canInstall && state.state !== "ready" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											size: "sm",
											variant: "outline",
											disabled,
											onClick: () => setAction((value) => ({
												attempt: value.attempt + 1,
												install: true
											})),
											children: installing ? tr("正在安装…") : state.state === "error" ? tr("重试安装") : tr("一键安装")
										}),
										(state?.ffmpeg || state?.ffprobe) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "media-sense__details-toggle",
											"aria-label": tr("版本与路径"),
											"aria-expanded": expanded,
											"aria-controls": "media-sense-ffmpeg-details",
											onClick: () => setExpanded((value) => !value),
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 16 })
										})
									]
								})
							]
						}),
						!ready && !installing && !busy && !error && !state?.message && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: "media-sense__hint media-sense__tool-note",
							children: tr("可在这里安装，也可在任务需要时自动安装。")
						}),
						expanded && (state?.ffmpeg || state?.ffprobe) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "media-sense__ffmpeg-details",
							id: "media-sense-ffmpeg-details",
							children: ["ffmpeg", "ffprobe"].map((tool) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: tool === "ffmpeg" ? "FFmpeg" : "FFprobe" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: state[tool] ? `${state[tool].version} · ${state[tool].source === "system" ? tr("本机已有") : tr("Media Sense 已安装")}` : tr("未检测到") })] }), state[tool] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: state[tool].path })] }, tool))
						}),
						installing && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "media-sense__ffmpeg-progress",
							role: "status",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: state?.totalBytes ? tr("正在下载安装… {percent}%", { percent: progress }) : tr("正在检查本机工具…") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("progress", {
								max: 100,
								value: progress,
								"aria-label": tr("FFmpeg 安装进度")
							})]
						}),
						(error || state?.message) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: "media-sense__warning",
							role: "alert",
							children: message(error || state?.message || "")
						})
					]
				})]
			});
		}
		//#endregion
		//#region src/client/LocalModels.tsx
		function LocalModels({ models, disabled, onChange }) {
			const [expanded, setExpanded] = (0, react.useState)([]);
			const update = (id, patch) => onChange(models.map((model) => model.id === id ? {
				...model,
				...patch
			} : model));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: "media-sense__group",
				"aria-label": tr("自配模型"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "media-sense__group-heading",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: tr("自配模型") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							variant: "outline",
							disabled: disabled || models.length >= 50,
							onClick: () => {
								const id = crypto.randomUUID();
								setExpanded((previous) => [...previous, id]);
								onChange([...models, {
									id,
									name: "",
									modelId: "",
									baseUrl: "",
									adapter: "google-generative-ai",
									audio: true,
									video: true
								}]);
							},
							children: tr("添加模型")
						})]
					}),
					!models.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "media-sense__empty",
						children: tr("添加支持音频或视频理解的模型。")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "media-sense__model-list",
						children: models.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
							className: "media-sense__editor",
							open: expanded.includes(model.id),
							onToggle: (event) => {
								const open = event.currentTarget.open;
								setExpanded((previous) => open ? previous.includes(model.id) ? previous : [...previous, model.id] : previous.filter((id) => id !== model.id));
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: model.name || model.modelId || tr("新模型") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: model.modelId || tr("填写接口与模型信息") })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
								disabled,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "media-sense__fields",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [tr("显示名称"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												value: model.name,
												maxLength: 100,
												onChange: (event) => update(model.id, { name: event.target.value })
											})] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [tr("模型 ID"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												value: model.modelId,
												maxLength: 300,
												placeholder: "gemini-2.5-flash",
												onChange: (event) => update(model.id, { modelId: event.target.value })
											})] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [tr("接口格式"), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
												value: model.adapter,
												onChange: (event) => {
													const adapter = event.target.value;
													update(model.id, {
														adapter,
														...adapter === "openai-completions" ? {
															video: false,
															audio: true
														} : ["kimi-video", "glm-video"].includes(adapter) ? {
															video: true,
															audio: false
														} : {}
													});
												},
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: "google-generative-ai",
														children: "Google Gemini"
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: "openai-completions",
														children: "OpenAI Chat Completions"
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: "qwen-omni",
														children: "Qwen Omni"
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: "mimo-omni",
														children: "MiMo Omni"
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: "kimi-video",
														children: "Kimi Video"
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
														value: "glm-video",
														children: "GLM Video"
													})
												]
											})] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [tr("接口地址"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "url",
												value: model.baseUrl,
												placeholder: model.adapter === "google-generative-ai" ? "https://generativelanguage.googleapis.com" : "https://api.example.com/v1",
												onChange: (event) => update(model.id, { baseUrl: event.target.value })
											})] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
												className: "media-sense__wide",
												children: ["API Key", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
													type: "password",
													autoComplete: "new-password",
													value: model.apiKey ?? "",
													placeholder: model.hasApiKey && model.apiKey === void 0 ? tr("已保存，留空保持不变") : tr("无需认证的本地服务可留空"),
													onChange: (event) => update(model.id, { apiKey: event.target.value || void 0 })
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "media-sense__capabilities",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: tr("输入能力") }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: model.audio,
												disabled: disabled || ["kimi-video", "glm-video"].includes(model.adapter),
												onChange: (event) => update(model.id, { audio: event.target.checked })
											}), tr("音频")] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: model.video,
												disabled: disabled || model.adapter === "openai-completions",
												onChange: (event) => update(model.id, { video: event.target.checked })
											}), tr("视频")] })
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "media-sense__hint",
										children: tr("请按模型实际支持的能力选择；接口格式决定可发送的音视频格式。")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "media-sense__editor-actions",
										children: [model.hasApiKey && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											size: "sm",
											disabled: disabled || model.apiKey === "",
											onClick: () => update(model.id, { apiKey: "" }),
											children: model.apiKey === "" ? tr("保存后清除密钥") : tr("清除密钥")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											size: "sm",
											disabled,
											onClick: () => onChange(models.filter((item) => item.id !== model.id)),
											children: tr("移除模型")
										})]
									})
								]
							})]
						}, model.id))
					})
				]
			});
		}
		//#endregion
		//#region src/client/OmniSettings.tsx
		const empty = () => ({
			local: {
				audioModelId: "",
				videoModelId: ""
			},
			host: {
				audioModelId: "",
				videoModelId: ""
			}
		});
		async function request(input, signal) {
			const response = await fetch("/media-sense/settings", {
				...input ? {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(input)
				} : {},
				...signal ? { signal } : {}
			});
			const body = await response.json();
			if (!response.ok) throw new Error(body && typeof body === "object" && "message" in body ? String(body.message) : tr("Media Sense 设置暂时不可用"));
			return mediaSenseSettingsResponseSchema.parse(body);
		}
		function OmniSettings() {
			useLocale();
			const [state, setState] = (0, react.useState)();
			const [source, setSource] = (0, react.useState)("local");
			const [preferences, setPreferences] = (0, react.useState)(empty);
			const [localModels, setLocalModels] = (0, react.useState)([]);
			const [busy, setBusy] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const [saved, setSaved] = (0, react.useState)(false);
			const [attempt, setAttempt] = (0, react.useState)(0);
			const [loading, setLoading] = (0, react.useState)(true);
			const accept = (value) => {
				setState(value);
				setSource(value.source);
				setPreferences(value.preferencesBySource);
				setLocalModels(value.localModels);
			};
			(0, react.useEffect)(() => {
				const abort = new AbortController();
				setLoading(true);
				setError("");
				setSaved(false);
				request(void 0, abort.signal).then((value) => {
					if (!abort.signal.aborted) accept(value);
				}).catch((cause) => {
					if (!abort.signal.aborted) setError(String(cause.message ?? cause));
				}).finally(() => {
					if (!abort.signal.aborted) setLoading(false);
				});
				return () => abort.abort();
			}, [attempt]);
			(0, react.useEffect)(() => {
				if (!saved) return;
				const timer = setTimeout(() => setSaved(false), 3e3);
				return () => clearTimeout(timer);
			}, [saved]);
			const save = async () => {
				setBusy(true);
				setError("");
				setSaved(false);
				try {
					const input = mediaSenseSettingsWriteSchema.parse({
						source,
						preferences: preferences[source],
						preferencesBySource: preferences,
						localModels: localModels.map(({ hasApiKey: _hasApiKey, ...model }) => model)
					});
					accept(await request(input));
					setSaved(true);
				} catch (cause) {
					setError(cause && typeof cause === "object" && "issues" in cause ? tr("请检查模型名称、模型 ID、接口地址和输入能力。") : cause instanceof Error ? cause.message : String(cause));
				} finally {
					setBusy(false);
				}
			};
			const disabled = loading || busy || !state;
			const changed = !!state && (source !== state.source || JSON.stringify(preferences) !== JSON.stringify(state.preferencesBySource) || JSON.stringify(localModels) !== JSON.stringify(state.localModels));
			const limitsValid = Object.values(preferences).every((value) => [
				value.modelMaxMediaMB,
				value.audioModelMaxMediaMB,
				value.videoModelMaxMediaMB
			].every((limits) => Object.values(limits ?? {}).every((limit) => Number.isInteger(limit) && limit >= 1 && limit <= 2e9 / 1e6)));
			const models = source === "local" ? localModels.map(mediaSenseModelSummary) : state?.hostModels ?? [];
			const sources = state?.hostSource || source === "host" ? ["local", "host"] : ["local"];
			const hostLabel = state?.hostSource?.label[localeTag() === "zh-CN" ? "zh" : "en"] ?? tr("外部模型");
			const change = () => {
				setSaved(false);
				setError("");
			};
			const updateModels = (next) => {
				setLocalModels(next);
				change();
				setPreferences((previous) => {
					const local = { ...previous.local };
					for (const field of [
						"modelMaxMediaMB",
						"audioModelMaxMediaMB",
						"videoModelMaxMediaMB"
					]) if (local[field]) local[field] = Object.fromEntries(Object.entries(local[field]).filter(([id]) => next.some((model) => model.id === id)));
					for (const kind of ["audio", "video"]) {
						const field = kind === "audio" ? "audioModelId" : "videoModelId";
						const effort = kind === "audio" ? "audioReasoningEffort" : "videoReasoningEffort";
						const before = localModels.find((model) => model.id === local[field]);
						const after = next.find((model) => model.id === local[field]);
						if (before && (!after || !after[kind])) {
							local[field] = "";
							local[effort] = "default";
						} else if (before && after && (before.modelId !== after.modelId || before.adapter !== after.adapter)) local[effort] = "default";
					}
					return {
						...previous,
						local
					};
				});
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: "media-sense",
				"data-media-sense-settings": true,
				"aria-busy": loading || busy,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: "media-sense__header",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "Media Sense" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: tr("音视频理解与媒体工具") })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FfmpegSettings, {}),
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "media-sense__notice media-sense__error",
						role: "alert",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: message(error) }), !state && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							variant: "outline",
							disabled: loading,
							onClick: () => setAttempt((value) => value + 1),
							children: tr("重试")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: "media-sense__group",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "media-sense__source-row",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: tr("模型来源") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "media-sense__sources",
									role: "radiogroup",
									"aria-label": tr("模型来源"),
									children: sources.map((value) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										role: "radio",
										"aria-checked": source === value,
										disabled: disabled || value === "host" && !state?.hostSource?.available,
										onClick: () => {
											setSource(value);
											change();
										},
										children: value === "local" ? tr("自配模型") : hostLabel
									}, value))
								})]
							}),
							source === "host" && state?.hostMessage && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "media-sense__notice",
								role: "status",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: message(state.hostMessage) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "outline",
									disabled: loading || changed,
									onClick: () => setAttempt((value) => value + 1),
									children: tr("重新加载")
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "media-sense__models",
								children: ["audio", "video"].map((kind) => {
									const field = kind === "audio" ? "audioModelId" : "videoModelId";
									const effortField = kind === "audio" ? "audioReasoningEffort" : "videoReasoningEffort";
									const limitField = kind === "audio" ? "audioModelMaxMediaMB" : "videoModelMaxMediaMB";
									const candidates = models.filter((model) => model[kind]);
									const selected = preferences[source][field] ? candidates.find((model) => model.id === preferences[source][field]) : candidates[0];
									const limit = omniMediaLimitMB(preferences[source], selected?.id ?? "", kind);
									const limitValid = Number.isInteger(limit) && limit >= 1 && limit <= 2e9 / 1e6;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ModelPicker, {
										kind,
										value: preferences[source][field],
										models: candidates,
										disabled,
										loading,
										onChange: (value) => {
											setPreferences((previous) => ({
												...previous,
												[source]: {
													...previous[source],
													[field]: value,
													[effortField]: "default"
												}
											}));
											change();
										},
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ReasoningPicker, {
												kind,
												value: preferences[source][effortField] ?? "default",
												efforts: selected?.reasoningEfforts ?? [],
												disabled: disabled || !selected,
												onChange: (value) => {
													setPreferences((previous) => ({
														...previous,
														[source]: {
															...previous[source],
															[effortField]: value
														}
													}));
													change();
												}
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
												className: "media-sense__upload-limit",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: tr("上传上限") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													className: "media-sense__number",
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
														type: "number",
														inputMode: "numeric",
														min: 1,
														max: OMNI_MAX_MEDIA_BYTES / 1e6,
														step: 1,
														"aria-label": kind === "audio" ? tr("音频模型上传上限") : tr("视频模型上传上限"),
														"aria-invalid": !limitValid,
														disabled: disabled || !selected,
														value: Number.isFinite(limit) ? limit : "",
														onChange: (event) => {
															if (!selected) return;
															const value = event.target.valueAsNumber;
															setPreferences((previous) => ({
																...previous,
																[source]: {
																	...previous[source],
																	[limitField]: {
																		...previous[source][limitField],
																		[selected.id]: value
																	}
																}
															}));
															change();
														}
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "MB" })]
												})]
											}),
											!limitValid && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
												className: "media-sense__warning",
												children: tr("请输入 1–2000 的整数。")
											})
										]
									}, kind);
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
								className: "media-sense__hint",
								children: [
									tr("默认 {size} MB，音频和视频分别设置；包含视频时，按视频上限计算全部附件。", { size: 25 }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("br", {}),
									tr("同时受模型的格式、时长与接口额度限制。")
								]
							})
						]
					}),
					source === "local" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LocalModels, {
						models: localModels,
						disabled,
						onChange: updateModels
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", {
						className: "media-sense__footer",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "media-sense__status",
								role: "status",
								"data-pending": changed,
								children: saved ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutlineRegular, { size: 14 }), tr("已保存")] }) : changed ? tr("有未保存的更改") : null
							}),
							changed && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								disabled: busy || loading,
								onClick: () => {
									if (state) accept(state);
									change();
								},
								children: tr("撤销更改")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "primary",
								onClick: () => {
									save();
								},
								disabled: disabled || !changed || !limitsValid,
								children: busy ? tr("正在保存…") : tr("保存更改")
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region src/client/settings-icon.ts
		const NAVIGATION = "[role=\"dialog\"][aria-modal=\"true\"] nav";
		const ATTRIBUTE = "data-media-sense-nav-icon";
		const ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><g fill=\"none\" stroke=\"black\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"1.5\" y=\"3\" width=\"13\" height=\"10\" rx=\"2\"/><path d=\"M5 7v2M8 5.5v5M11 6.5v3\"/></g></svg>";
		/** 设置导航暂不接收自定义图标；只标记本插件的导航项并沿用原生文字与交互。 */
		function installSettingsIcon() {
			const style = document.createElement("style");
			style.dataset.mediaSenseNavIcon = "";
			const mask = `url("data:image/svg+xml,${encodeURIComponent(ICON)}") center/16px 16px no-repeat`;
			style.textContent = `
    button[${ATTRIBUTE}]>svg{display:none}
    button[${ATTRIBUTE}]::before{content:"";display:block;flex:0 0 16px;width:16px;height:16px;background:currentColor;mask:${mask};-webkit-mask:${mask}}
  `;
			document.head.append(style);
			const navigations = /* @__PURE__ */ new Map();
			const mark = (navigation) => {
				for (const button of navigation.querySelectorAll("button")) if (button.querySelector(":scope > span")?.textContent?.trim() === "Media Sense") button.setAttribute(ATTRIBUTE, "");
				else button.removeAttribute(ATTRIBUTE);
			};
			const discover = (root) => {
				const targets = [...root.querySelectorAll(NAVIGATION)];
				if (root instanceof Element && root.matches(NAVIGATION)) targets.push(root);
				for (const target of targets) {
					if (navigations.has(target)) continue;
					mark(target);
					const observer = new MutationObserver(() => mark(target));
					observer.observe(target, {
						childList: true,
						subtree: true,
						characterData: true
					});
					navigations.set(target, observer);
				}
			};
			const observer = new MutationObserver((records) => {
				for (const record of records) {
					if ((record.target instanceof Element ? record.target : record.target.parentElement)?.closest(`${NAVIGATION},[data-chat-flow]`)) continue;
					for (const node of record.addedNodes) if (node instanceof Element) discover(node);
				}
				for (const [target, navigation] of navigations) if (!target.isConnected) {
					navigation.disconnect();
					navigations.delete(target);
				}
			});
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
			discover(document);
			return () => {
				observer.disconnect();
				style.remove();
				for (const navigation of navigations.values()) navigation.disconnect();
				for (const button of document.querySelectorAll(`[${ATTRIBUTE}]`)) button.removeAttribute(ATTRIBUTE);
			};
		}
		//#endregion
		//#region src/client/styles.ts
		const OMNI_STYLES = `
.media-sense{display:flex;flex-direction:column;gap:20px;width:100%;min-width:0;color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;container-type:inline-size}
.media-sense *{box-sizing:border-box}
.media-sense__header h2{margin:0 0 4px;font-size:18px;font-weight:600;line-height:26px}
.media-sense__header p{margin:0;color:var(--dsw-alias-label-secondary)}
.media-sense__group{display:flex;flex-direction:column;gap:12px;min-width:0}
.media-sense__group-heading,.media-sense__source-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.media-sense__group h3{margin:0;font-size:13px;font-weight:600;line-height:22px}
.media-sense__sources{display:flex;padding:3px;gap:2px;border-radius:8px;background:var(--dsw-alias-interactive-bg-hover);min-width:0}
.media-sense__sources button{padding:4px 10px;border:0;border-radius:5px;font:inherit;font-size:12px;cursor:pointer;color:var(--dsw-alias-label-secondary);background:transparent;overflow-wrap:anywhere}
.media-sense__sources button[aria-checked=true]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);box-shadow:0 1px 3px #00000012}
.media-sense__sources button:disabled{opacity:.5;cursor:default}
.media-sense__models{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.media-sense__model-row{display:flex;flex-direction:column;gap:14px;padding:16px;min-width:0;border:1px solid var(--dsw-alias-border-l2);border-radius:10px}
.media-sense__model-controls{display:flex;flex-direction:column;gap:12px;min-width:0}
.media-sense__card-header{display:flex;align-items:center;gap:10px;min-width:0}
.media-sense__media-icon{display:flex;align-items:center;justify-content:center;flex:none;width:32px;height:32px;border-radius:8px;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
.media-sense__card-header h3{font-weight:500}
.media-sense__card-header p{margin:1px 0 0;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:17px}
.media-sense__parameters{display:flex;flex-direction:column;gap:8px}
.media-sense__reasoning,.media-sense__upload-limit{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px 8px;font-size:12px;color:var(--dsw-alias-label-secondary);min-height:30px}
.media-sense__reasoning>.media-sense__picker{width:auto;max-width:66%;min-width:90px}
.media-sense__reasoning>.media-sense__warning{flex-basis:100%}
.media-sense__reasoning .media-sense__select{min-height:30px;padding:4px 8px;border-color:transparent;background:transparent;font-size:12px}
.media-sense__number{display:flex;align-items:center;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:var(--dsw-alias-bg-layer-2);height:30px;padding-right:8px;gap:4px}
.media-sense__number input{border:0;background:transparent;color:var(--dsw-alias-label-primary);width:64px;min-width:0;height:100%;padding:4px 0 4px 8px;font:inherit;font-variant-numeric:tabular-nums}
.media-sense__number input[aria-invalid=true]{color:var(--dsw-alias-state-error-primary)}
.media-sense__number>span{font-size:11px;color:var(--dsw-alias-label-tertiary)}
.media-sense__number:has(input:disabled){opacity:.5}
.media-sense__picker{width:100%;min-width:0}
.media-sense__select{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-width:0;min-height:34px;padding:6px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer}
.media-sense__select>span{overflow:hidden;min-width:0;white-space:nowrap;text-overflow:ellipsis}
.media-sense__select>svg{flex:none;color:var(--dsw-alias-label-tertiary)}
.media-sense__select [data-placeholder=true]{color:var(--dsw-alias-label-tertiary)}
.media-sense__select:hover:not(:disabled),.media-sense__select[aria-expanded=true]{background:var(--dsw-alias-interactive-bg-hover)}
.media-sense button:focus-visible,.media-sense input:focus-visible,.media-sense select:focus-visible,.media-sense summary:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}
.media-sense__select:disabled{cursor:default;opacity:.55}
.media-sense__menu{width:min(320px,calc(100vw - 48px));max-width:min(320px,calc(100vw - 48px));--dsw-menu-surface-fill:var(--dsw-alias-bg-layer-2);--dsw-menu-backdrop-filter:none}
.media-sense__option{display:flex;flex-direction:column;gap:2px;min-width:0;font-size:13px;line-height:20px}
.media-sense__option>span,.media-sense__option>small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.media-sense__option>small{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}
.media-sense__hint{margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:19px}
.media-sense__notice{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}
.media-sense__warning{margin:0;color:var(--dsw-alias-state-warn-label);font-size:12px;line-height:18px;overflow-wrap:anywhere}
.media-sense__error{color:var(--dsw-alias-state-error-primary)}
.media-sense__footer{display:flex;align-items:center;justify-content:flex-end;gap:8px;min-height:32px;margin-top:-6px}
.media-sense__status{display:inline-flex;align-items:center;gap:5px;margin-right:auto;color:var(--dsw-alias-state-success-primary);font-size:12px;line-height:18px;min-height:20px}
.media-sense__status[data-pending=true]{color:var(--dsw-alias-label-tertiary)}
.media-sense__empty{margin:0;padding:20px 16px;text-align:center;border:1px dashed var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-tertiary);font-size:12px}
.media-sense__model-list{display:flex;flex-direction:column;gap:8px}
.media-sense__editor{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;overflow:hidden}
.media-sense__editor summary{display:flex;align-items:center;gap:10px;padding:12px 14px;cursor:pointer;list-style:none}
.media-sense__editor summary::-webkit-details-marker{display:none}
.media-sense__editor summary::after{content:'›';font-size:20px;color:var(--dsw-alias-label-tertiary);margin-left:auto;transition:transform .15s}
.media-sense__editor[open] summary::after{transform:rotate(90deg)}
.media-sense__editor summary>span{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:55%}
.media-sense__editor summary>small{color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.media-sense__editor fieldset{min-width:0;margin:0;padding:4px 14px 14px;border:0;display:flex;flex-direction:column;gap:12px}
.media-sense__fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.media-sense__fields label{display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.media-sense__fields input,.media-sense__fields select{min-width:0;width:100%;height:34px;padding:6px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}
.media-sense__fields input::placeholder{color:var(--dsw-alias-label-tertiary)}
.media-sense__wide{grid-column:1/-1}
.media-sense__capabilities{display:flex;align-items:center;gap:18px;font-size:12px}
.media-sense__capabilities label{display:inline-flex;align-items:center;gap:5px}
.media-sense__capabilities input{accent-color:var(--dsw-alias-state-business-primary)}
.media-sense__editor-actions{display:flex;justify-content:flex-end;gap:8px}
.media-sense__tools-section{padding-bottom:4px}
.media-sense__tool-panel{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:12px}
.media-sense__tool-row{display:flex;align-items:center;gap:10px;min-width:0}
.media-sense__tool-copy{min-width:0;flex:1}
.media-sense__tool-copy>div{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.media-sense__tool-copy strong{font-size:13px;font-weight:500}
.media-sense__tool-copy p{margin:2px 0 0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}
.media-sense__badge{display:inline-flex;align-items:center;gap:4px;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:18px}
.media-sense__badge::before{content:'';width:5px;height:5px;border-radius:50%;background:currentColor}
.media-sense__badge[data-ready=true]{color:var(--dsw-alias-state-success-primary)}
.media-sense__ffmpeg-actions{display:flex;align-items:center;gap:4px;flex:none}
.media-sense__details-toggle{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:0;border-radius:5px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.media-sense__details-toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}
.media-sense__details-toggle[aria-expanded=true] svg{transform:rotate(180deg)}
.media-sense__ffmpeg-details{display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--dsw-alias-border-l2);padding-top:12px;font-size:12px}
.media-sense__ffmpeg-details>div{display:flex;flex-direction:column;gap:3px;min-width:0}
.media-sense__ffmpeg-details>div>div{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.media-sense__ffmpeg-details strong{font-weight:500}
.media-sense__ffmpeg-details span{color:var(--dsw-alias-label-secondary);font-size:11px}
.media-sense__ffmpeg-details code{overflow-wrap:anywhere;white-space:normal;color:var(--dsw-alias-label-tertiary);font-size:11px}
.media-sense__ffmpeg-progress{display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.media-sense__ffmpeg-progress progress{width:100%;height:4px;accent-color:var(--dsw-alias-state-business-primary)}
@container(max-width:460px){.media-sense__models{grid-template-columns:1fr}.media-sense__source-row{align-items:flex-start;flex-direction:column;gap:8px}.media-sense__fields{grid-template-columns:1fr}.media-sense__tool-row{flex-wrap:wrap}.media-sense__ffmpeg-actions{margin-left:auto}.media-sense__footer{flex-wrap:wrap}.media-sense__status{flex:1}}
`;
		//#endregion
		//#region src/client/index.tsx
		const inject = ["locale", "slots"];
		function apply(ctx) {
			installLocale(ctx);
			ctx.effect(() => {
				const style = document.createElement("style");
				style.dataset.plugin = "@nex-assistant/media-sense";
				style.textContent = OMNI_STYLES;
				document.head.append(style);
				return () => style.remove();
			}, "media-sense: settings styles");
			ctx.effect(installSettingsIcon, "media-sense: settings icon");
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "media-sense",
				order: 19,
				label: "Media Sense"
			}, OmniSettings));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
