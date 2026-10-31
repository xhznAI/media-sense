import { z } from "zod";
import z$1 from "@deepseek-ai/schemastery";
import path, { basename, dirname, extname } from "node:path";
import { setTimeout } from "node:timers/promises";
import { execFile } from "node:child_process";
import { constants, createReadStream, createWriteStream } from "node:fs";
import { access, chmod, mkdir, mkdtemp, readFile, readdir, realpath, rename, rm, stat, unlink, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import hostProcess from "node:process";
import { promisify } from "node:util";
import { createHash, randomUUID } from "node:crypto";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createGunzip } from "node:zlib";
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
const omniReasoningEffortSchema = z.enum([
	"off",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"max"
]);
const omniReasoningPreferenceSchema = z.union([z.literal("default"), omniReasoningEffortSchema]);
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
/** 默认不添加参数；明确选择的无效档位必须提示，不能静默使用另一个强度。 */
function omniReasoningParams(model, effort) {
	if (!effort || effort === "default") return {};
	const params = profile(model)?.[effort];
	if (!params) throw new Error("所选模型不支持此思考强度，请在 Media Sense 设置中重新选择。");
	return structuredClone(params);
}
/** 传输安全上限独立于用户偏好；大文件只能经支持的分块接口发送。 */
const OMNI_MAX_MEDIA_BYTES = 2e9;
const OMNI_MAX_INLINE_MEDIA_BYTES = 75e6;
const OMNI_MEDIA_SIZE_MESSAGE = "原始音视频素材合计超过传输上限 2,000 MB，请压缩或分段后重试。";
const OMNI_REQUEST_SIZE_MESSAGE = "音视频请求内容过大，请减少附件数量或缩短指令后重试。";
/** 分块大小只是传输窗口，不是文件大小限制。 */
const OMNI_CHUNK_BYTES = 4 * 1024 * 1024;
/** Gemini 通用输入文档以完整请求体计 100 MB，包含 base64 和 JSON 文本。 */
const MODEL_MAX_REQUEST_BYTES = 1e8;
/** 音频专页仍规定 20 MB；含独立音频文件的 Gemini 请求遵循该更具体的额度。 */
const OMNI_GOOGLE_AUDIO_REQUEST_BYTES = 2e7;
const OMNI_MAX_RESULT_CHARS = 32e3;
z.enum(["audio", "video"]);
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
const omniPreferencesSchema = z.object({
	audioModelId: z.string().max(300).default(""),
	videoModelId: z.string().max(300).default(""),
	audioReasoningEffort: omniReasoningPreferenceSchema.optional(),
	videoReasoningEffort: omniReasoningPreferenceSchema.optional(),
	modelMaxMediaMB: z.record(z.string().min(1).max(300), z.number().int().min(1).max(OMNI_MAX_MEDIA_BYTES / 1e6)).optional()
}).strict();
function omniMediaLimitMB(preferences, modelId) {
	const limits = preferences.modelMaxMediaMB;
	return limits && Object.hasOwn(limits, modelId) ? limits[modelId] : 25;
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
const omniFileMetadataSchema = z.object({
	name: z.string().min(1).max(255),
	mimeType: z.enum(omniMimeTypes),
	size: z.number().int().positive().max(OMNI_MAX_MEDIA_BYTES, OMNI_MEDIA_SIZE_MESSAGE)
}).strict();
/** 避免大块 base64 的嵌套正则回溯，同时拒绝宽松解码产生的歧义。 */
function base64Schema(maxBytes) {
	return z.string().min(4).max(Math.ceil(maxBytes / 3) * 4).refine((value) => value.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/u.test(value) && omniByteLength(value) <= maxBytes, "无效的文件编码");
}
const omniFileSchema = omniFileMetadataSchema.omit({ size: true }).extend({ data: base64Schema(OMNI_MAX_INLINE_MEDIA_BYTES) }).strict();
const omniCallBase = z.object({
	modelId: z.string().min(1).max(300),
	protocol: z.enum(["google-generative-ai", "openai-completions"]),
	instruction: z.string().trim().min(1).max(12e3),
	reasoningEffort: omniReasoningEffortSchema.optional()
});
const omniInlineRequestSchema = omniCallBase.extend({ files: z.array(omniFileSchema).min(1) }).strict().superRefine((request, ctx) => {
	const files = request.files.map((file) => ({
		name: file.name,
		mimeType: file.mimeType,
		size: omniByteLength(file.data)
	}));
	if (omniInlineSizes({
		id: request.modelId,
		protocol: request.protocol
	}, request.instruction, files).gateway > 1e8) ctx.addIssue({
		code: z.ZodIssueCode.custom,
		path: ["files"],
		message: OMNI_REQUEST_SIZE_MESSAGE
	});
});
z.union([omniInlineRequestSchema, omniCallBase.extend({
	protocol: z.literal("google-generative-ai"),
	uploadId: z.string().uuid()
}).strict()]);
const omniUploadRequestSchema = omniCallBase.pick({ modelId: true }).extend({ files: z.array(omniFileMetadataSchema).min(1) }).strict().superRefine((value, ctx) => {
	if (value.files.reduce((sum, file) => sum + file.size, 0) > 2e9) ctx.addIssue({
		code: z.ZodIssueCode.custom,
		path: ["files"],
		message: OMNI_MEDIA_SIZE_MESSAGE
	});
	if (value.files.filter((file) => file.mimeType.startsWith("video/")).length > 10) ctx.addIssue({
		code: z.ZodIssueCode.custom,
		path: ["files"],
		message: "Gemini 每次最多接收 10 个视频。"
	});
});
z.object({
	uploadId: z.string().uuid(),
	chunkBytes: z.literal(OMNI_CHUNK_BYTES)
}).strict();
z.object({
	offset: z.number().int().nonnegative(),
	data: base64Schema(OMNI_CHUNK_BYTES)
}).strict();
z.object({ ready: z.boolean() }).strict();
/** 上游文件元数据仅供 Server 校验，不将供应商引用返回客户端。 */
const omniGoogleFileSchema = z.object({
	name: z.string().regex(/^files\/[A-Za-z0-9_-]+$/u),
	uri: z.string().url(),
	state: z.enum([
		"PROCESSING",
		"ACTIVE",
		"FAILED"
	])
});
const omniGoogleUploadSchema = z.object({ file: omniGoogleFileSchema });
const omniCallResponseSchema = z.object({
	modelId: z.string().min(1),
	text: z.string().min(1).max(OMNI_MAX_RESULT_CHARS),
	truncated: z.boolean()
}).strict();
/** 设置页仅接收安全模型摘要和当前来源的偏好。 */
const omniSettingsResponseSchema = z.object({
	preferences: omniPreferencesSchema,
	models: z.array(z.object({
		id: z.string(),
		name: z.string(),
		audio: z.boolean(),
		video: z.boolean(),
		protocol: z.string(),
		reasoningEfforts: z.array(omniReasoningEffortSchema).default([])
	})),
	message: z.string()
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
function omniInlineRequestLimit(protocol, files) {
	return protocol === "google-generative-ai" && files.some((file) => file.mimeType.startsWith("audio/")) ? OMNI_GOOGLE_AUDIO_REQUEST_BYTES : MODEL_MAX_REQUEST_BYTES;
}
function omniFitsInline(model, instruction, files) {
	const sizes = omniInlineSizes(model, instruction, files);
	return sizes.gateway <= 1e8 && sizes.provider <= omniInlineRequestLimit(model.protocol, files);
}
/** 已实现的本地文件发送方式不能绕过供应商的编码大小限制。 */
function omniInlineFileError(model, files) {
	if (model.protocol === "openai-completions" && !isQwenOmni(model)) {
		const formats = isMimoOmni(model) ? [
			"wav",
			"mp3",
			"flac",
			"m4a",
			"ogg"
		] : ["wav", "mp3"];
		if (files.some((file) => file.mimeType.startsWith("audio/") && !formats.includes(omniAudioFormat(file.mimeType)))) return isMimoOmni(model) ? "MiMo 音频接口支持 WAV、MP3、FLAC、M4A、OGG，请使用 FFmpeg 转换后重试。" : "此音频接口仅支持 WAV、MP3，请使用 FFmpeg 转换后重试。";
	}
	if (model.protocol === "openai-completions" && isGlmVideo(model)) {
		if (files.some((file) => file.mimeType.startsWith("video/") && ![
			"video/mp4",
			"video/quicktime",
			"video/x-matroska"
		].includes(file.mimeType))) return "GLM 视频接口支持 MP4、MOV、MKV，请使用 FFmpeg 转换后重试。";
		if (hasModelId(model, /(?:^|\/)glm-4v-plus(?:-|$)/iu) && files.some((file) => file.size > 2e7)) return "GLM-4V-Plus 单个视频不能超过 20 MB，请压缩或分段后重试。";
	}
	if (model.protocol === "openai-completions" && isKimiVideo(model) && files.some((file) => file.mimeType === "video/x-matroska")) return "Kimi 视频接口不支持 MKV，请使用 FFmpeg 转换为 MP4 后重试。";
	if (model.protocol === "openai-completions" && isMimoOmni(model) && files.some((file) => Math.ceil(file.size / 3) * 4 + `data:${file.mimeType};base64,`.length > 5e7)) return "MiMo 每个附件编码后不能超过 50 MB（原文件约 37.5 MB），请压缩或分段后重试。";
}
//#endregion
//#region src/api/omni-response.ts
/** 只提取公开回答，思考内容及供应商调用信息不进入工具结果。 */
function record(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function first(value) {
	return record(Array.isArray(value) ? value[0] : void 0);
}
function textOf(value) {
	const payload = record(value);
	if (Array.isArray(payload.candidates)) {
		const parts = record(first(payload.candidates).content).parts;
		return Array.isArray(parts) ? parts.map(record).filter((part) => part.thought !== true && typeof part.text === "string").map((part) => part.text).join("") : "";
	}
	const choice = first(payload.choices);
	const content = record(choice.delta).content ?? record(choice.message).content;
	return typeof content === "string" ? content : Array.isArray(content) ? content.map(record).filter((part) => part.type === "text" && typeof part.text === "string").map((part) => part.text).join("") : "";
}
function outputLimited(value) {
	const payload = record(value);
	return first(payload.candidates).finishReason === "MAX_TOKENS" || first(payload.choices).finish_reason === "length";
}
/** 仅允许协议枚举进入诊断，不回传上游错误正文或思考文本。 */
const finishReasons = /* @__PURE__ */ new Set([
	"STOP",
	"MAX_TOKENS",
	"SAFETY",
	"RECITATION",
	"OTHER",
	"BLOCKLIST",
	"PROHIBITED_CONTENT",
	"SPII",
	"MALFORMED_FUNCTION_CALL",
	"IMAGE_SAFETY",
	"UNEXPECTED_TOOL_CALL",
	"NO_IMAGE",
	"stop",
	"length",
	"content_filter",
	"tool_calls",
	"function_call"
]);
async function readOmniProviderResponse(response, modelId, signal) {
	if (!response.ok) {
		await response.body?.cancel();
		throw new Error(`音视频模型请求失败（HTTP ${response.status}）`);
	}
	let text = "";
	let truncated = false;
	let finishReason = "";
	let thoughts = false;
	let recognized = false;
	let nonTextOutput = false;
	const append = (value) => {
		const room = OMNI_MAX_RESULT_CHARS - text.length;
		if (value.length > room) truncated = true;
		text += value.slice(0, room);
	};
	const consume = (value) => {
		const payload = record(value);
		if (payload.error) throw new Error(`音视频模型 ${modelId} 返回了错误，请检查接口状态。`);
		recognized ||= Array.isArray(payload.candidates) || Array.isArray(payload.choices) || !!payload.promptFeedback;
		const candidate = first(payload.candidates);
		const choice = first(payload.choices);
		const reason = candidate.finishReason ?? choice.finish_reason ?? record(payload.promptFeedback).blockReason;
		if (typeof reason === "string" && finishReasons.has(reason)) finishReason = reason;
		const parts = record(candidate.content).parts;
		if (Array.isArray(parts)) for (const part of parts.map(record)) {
			thoughts ||= part.thought === true && typeof part.text === "string" && part.text.length > 0;
			nonTextOutput ||= !!part.inlineData || !!part.fileData || !!part.functionCall;
		}
		const message = record(choice.delta ?? choice.message);
		thoughts ||= typeof message.reasoning_content === "string" && message.reasoning_content.length > 0;
		truncated ||= outputLimited(value);
		append(textOf(value));
	};
	const parse = (data) => {
		try {
			return JSON.parse(data);
		} catch {
			throw new Error(`音视频模型 ${modelId} 返回了无效 JSON，请检查接口协议。`);
		}
	};
	if (response.headers.get("content-type")?.includes("text/event-stream")) {
		const reader = response.body?.getReader();
		if (!reader) throw new Error("音视频模型没有返回内容");
		const decoder = new TextDecoder();
		let pending = "";
		const event = (chunk) => {
			const data = chunk.split(/\r?\n/u).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n");
			if (!data || data === "[DONE]") return;
			consume(parse(data));
		};
		try {
			for (;;) {
				signal?.throwIfAborted();
				const next = await reader.read();
				pending += decoder.decode(next.value, { stream: !next.done });
				if (pending.length > 2 * 1024 * 1024) throw new Error("音视频模型响应片段过大");
				let match;
				while (match = /\r?\n\r?\n/u.exec(pending)) {
					event(pending.slice(0, match.index));
					pending = pending.slice(match.index + match[0].length);
				}
				if (next.done) {
					if (pending.trim()) event(pending);
					break;
				}
			}
		} finally {
			await reader.cancel().catch(() => void 0);
			reader.releaseLock();
		}
	} else consume(parse(await response.text()));
	signal?.throwIfAborted();
	if (!text.trim()) throw new Error(`音视频模型 ${modelId} 没有返回文字结果：${truncated ? "输出额度已用尽，未生成正文，请降低思考强度或分段处理。" : !recognized ? "响应格式不受支持，请检查接口协议。" : nonTextOutput ? "返回了非文字内容，请检查模型是否支持文字输出。" : thoughts ? "仅返回思考内容，未生成正文。" : "上游没有提供正文。"}${finishReason ? `（结束原因：${finishReason}）` : ""}`);
	return {
		modelId,
		text,
		truncated
	};
}
//#endregion
//#region src/api/omni-ffmpeg.ts
const omniFfmpegBinarySchema = z.object({
	path: z.string().min(1),
	version: z.string().min(1),
	source: z.enum(["system", "managed"])
}).strict();
const omniFfmpegReadySchema = z.object({
	ffmpeg: omniFfmpegBinarySchema,
	ffprobe: omniFfmpegBinarySchema
}).strict();
const omniFfmpegStatusSchema = z.object({
	state: z.enum([
		"missing",
		"installing",
		"ready",
		"error",
		"unsupported"
	]),
	platform: z.string(),
	canInstall: z.boolean(),
	ffmpeg: omniFfmpegBinarySchema.optional(),
	ffprobe: omniFfmpegBinarySchema.optional(),
	downloadedBytes: z.number().int().nonnegative(),
	totalBytes: z.number().int().nonnegative(),
	message: z.string()
}).strict();
const omniFfmpegInstallRequestSchema = z.object({ action: z.literal("install") }).strict();
//#endregion
//#region src/api/media-sense.ts
const mediaSenseSourceSchema = z.enum(["local", "host"]);
const mediaSenseAdapterSchema = z.enum([
	"google-generative-ai",
	"openai-completions",
	"qwen-omni",
	"mimo-omni",
	"kimi-video",
	"glm-video"
]);
const mediaSenseLocalModelSchema = z.object({
	id: z.string().uuid(),
	name: z.string().trim().min(1).max(100),
	modelId: z.string().trim().min(1).max(300),
	baseUrl: z.string().trim().url().max(2048).refine((value) => {
		const url = new URL(value);
		return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password && !url.search && !url.hash;
	}, "请填写不含密钥、查询参数或片段的 HTTP(S) 接口地址。"),
	adapter: mediaSenseAdapterSchema,
	audio: z.boolean(),
	video: z.boolean()
}).strict();
const mediaSenseModelWriteSchema = mediaSenseLocalModelSchema.extend({ apiKey: z.string().trim().max(8192).optional() }).superRefine((value, ctx) => {
	if (!value.audio && !value.video) ctx.addIssue({
		code: z.ZodIssueCode.custom,
		message: "请至少选择一种输入能力。"
	});
	if (value.adapter === "openai-completions" && value.video) ctx.addIssue({
		code: z.ZodIssueCode.custom,
		message: "标准 Chat Completions 不支持视频，请选择对应的音视频适配器。"
	});
	if (["kimi-video", "glm-video"].includes(value.adapter) && value.audio) ctx.addIssue({
		code: z.ZodIssueCode.custom,
		message: "Kimi、GLM 视频适配器不支持音频输入。"
	});
});
const mediaSenseSettingsWriteSchema = z.object({
	source: mediaSenseSourceSchema,
	preferences: omniPreferencesSchema,
	preferencesBySource: z.object({
		local: omniPreferencesSchema,
		host: omniPreferencesSchema
	}).optional(),
	localModels: z.array(mediaSenseModelWriteSchema).max(50)
}).strict().refine((value) => new Set(value.localModels.map((model) => model.id)).size === value.localModels.length, "模型标识不能重复。");
omniSettingsResponseSchema.extend({
	source: mediaSenseSourceSchema,
	hostSource: z.object({
		label: z.object({
			zh: z.string(),
			en: z.string()
		}),
		available: z.boolean()
	}).optional(),
	localModels: z.array(mediaSenseLocalModelSchema.extend({ hasApiKey: z.boolean() })),
	hostModels: omniSettingsResponseSchema.shape.models,
	hostMessage: z.string(),
	preferencesBySource: z.object({
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
//#endregion
//#region src/config.ts
const SETTINGS_ID = "media-sense";
const reasoning = z$1.union([
	"default",
	"off",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"max"
]);
const Config = z$1.object({
	storagePath: z$1.string(),
	settingsId: z$1.string().default(SETTINGS_ID),
	preferences: z$1.dict(z$1.object({
		audioModelId: z$1.string().default(""),
		videoModelId: z$1.string().default(""),
		audioReasoningEffort: reasoning,
		videoReasoningEffort: reasoning,
		modelMaxMediaMB: z$1.dict(z$1.number())
	})).default({}).volatile(),
	source: z$1.union([
		"",
		"local",
		"host"
	]).default("").volatile(),
	lastSourceScope: z$1.string().default("").volatile(),
	localModels: z$1.array(z$1.object({
		id: z$1.string(),
		name: z$1.string(),
		modelId: z$1.string(),
		baseUrl: z$1.string(),
		adapter: z$1.union([
			"google-generative-ai",
			"openai-completions",
			"qwen-omni",
			"mimo-omni",
			"kimi-video",
			"glm-video"
		]),
		audio: z$1.boolean(),
		video: z$1.boolean(),
		apiKey: z$1.string().role("secret").default("")
	})).default([]).volatile()
});
function sourceOf(config) {
	return config.source?.get() || (config.externalSource?.available || config.lastSourceScope?.get() ? "host" : "local");
}
function preferenceScope(config, source) {
	return source === "local" ? "local" : config.externalSource?.scope || config.lastSourceScope?.get() || "unavailable";
}
function preferencesOf(config, source = sourceOf(config)) {
	return omniPreferencesSchema.parse(config.preferences.get()[preferenceScope(config, source)] ?? {});
}
//#endregion
//#region src/catalog.ts
function localCatalog(config) {
	return (config.localModels?.get() ?? []).map((local) => {
		const checked = mediaSenseModelWriteSchema.parse(local);
		return {
			...mediaSenseModel(checked),
			local: {
				...checked,
				apiKey: checked.apiKey ?? ""
			}
		};
	});
}
async function readCatalog(config, signal, source = sourceOf(config)) {
	signal?.throwIfAborted();
	return source === "local" ? localCatalog(config) : readHostCatalog(config, signal);
}
/** 动态来源自行读取目录并验证访问权限；插件只使用公开的来源接口。 */
async function readHostCatalog(config, signal) {
	if (!config.externalSource?.available) throw new Error("此模型来源暂不可用，请重新连接或选择自配模型。");
	return config.externalSource.listModels(signal);
}
/** 未配置时按目录顺序选择第一项，已保存的选择即使失效也保留。 */
function resolveOmniPreferences(models, preferences) {
	return {
		...preferences,
		audioModelId: preferences.audioModelId || models.find((model) => omniSupports(model, "audio"))?.id || "",
		videoModelId: preferences.videoModelId || models.find((model) => omniSupports(model, "video"))?.id || ""
	};
}
/** 设置页与工具使用相同默认值，混合输入不能静默切换到其他模型。 */
function selectOmniModel(models, preferences, kinds) {
	const kind = kinds.includes("video") ? "video" : "audio";
	const resolved = resolveOmniPreferences(models, preferences);
	const id = kind === "video" ? resolved.videoModelId : resolved.audioModelId;
	if (!id) throw new Error(`暂无可用的${kind === "video" ? "视频" : "音频"}模型，请在「设置 → Media Sense」检查模型列表。`);
	const model = models.find((candidate) => candidate.id === id);
	if (!model || !kinds.every((input) => omniSupports(model, input))) throw new Error("已选择的 Media Sense 模型不可用或不能处理这些附件，请在「设置 → Media Sense」调整选择。");
	return model;
}
//#endregion
//#region src/attachments.ts
const MIME = {
	".wav": "audio/wav",
	".mp3": "audio/mpeg",
	".m4a": "audio/mp4",
	".aac": "audio/aac",
	".flac": "audio/flac",
	".ogg": "audio/ogg",
	".opus": "audio/opus",
	".weba": "audio/webm",
	".aif": "audio/aiff",
	".aiff": "audio/aiff",
	".mp4": "video/mp4",
	".m4v": "video/mp4",
	".webm": "video/webm",
	".mov": "video/quicktime",
	".mpeg": "video/mpeg",
	".mpg": "video/mpeg",
	".avi": "video/x-msvideo",
	".flv": "video/x-flv",
	".3gp": "video/3gpp",
	".wmv": "video/x-ms-wmv",
	".mkv": "video/x-matroska"
};
function mediaType(path) {
	const mime = MIME[extname(path).toLowerCase()];
	if (!mime || /^(?:https?|data):/iu.test(path)) throw new Error("Media Sense 只接受本地音频或视频文件。");
	return mime;
}
function mediaKind(mime) {
	return mime.startsWith("video/") ? "video" : "audio";
}
function mediaMetadata(file) {
	return {
		name: file.name,
		mimeType: file.mimeType,
		size: file.size
	};
}
/** 只检查元信息，大文件内容由文件服务分块读取，沿用原有访问边界。 */
async function inspectMedia(ctx, paths, exec, limitMB = 25) {
	const result = [];
	let totalBytes = 0;
	for (const path of paths) {
		exec.signal.throwIfAborted();
		const mimeType = mediaType(path);
		const cwd = exec.agent ? ctx.workingDirectory.get(exec.agent.session) : void 0;
		const target = await ctx.fs.resolve(path, {
			...cwd ? { cwd } : {},
			signal: exec.signal
		});
		const info = await ctx.fs.stat(target, exec.signal);
		if (info?.type !== "file") throw new Error(`不是可读取的音视频文件：${path}`);
		if (!info.size || !Number.isSafeInteger(info.size)) throw new Error(`音视频文件为空或无法读取大小：${path}`);
		totalBytes += info.size;
		if (totalBytes > limitMB * 1e6) throw new Error(`本次素材合计 ${(totalBytes / 1e6).toFixed(2)} MB，超过此模型设置的 ${limitMB} MB 上限。可在「设置 → Media Sense」调整上传上限，或压缩、分段后重试。`);
		result.push({
			name: basename(path),
			mimeType,
			size: info.size,
			target,
			version: info.version
		});
	}
	const parsed = omniUploadRequestSchema.safeParse({
		modelId: "metadata-check",
		files: result.map(mediaMetadata)
	});
	if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "音视频文件元信息无效。");
	return result;
}
async function readMedia(ctx, files, signal) {
	if (files.reduce((sum, file) => sum + file.size, 0) > 75e6) throw new Error(OMNI_REQUEST_SIZE_MESSAGE);
	const result = [];
	for (const file of files) {
		signal.throwIfAborted();
		const bytes = await ctx.fs.readBytes(file.target, signal, file.size);
		const after = await ctx.fs.stat(file.target, signal);
		if (bytes.byteLength !== file.size || after?.version !== file.version) throw new Error(`文件在读取期间发生变化：${file.name}`);
		result.push({
			name: file.name,
			mimeType: file.mimeType,
			data: Buffer.from(bytes).toString("base64")
		});
	}
	return result;
}
//#endregion
//#region src/local-client.ts
/** 自配模型的凭据只在 Host 发给用户指定的地址。 */
async function providerFetch(url, init) {
	const response = await fetch(url, {
		...init,
		redirect: "error"
	});
	if (!response.ok) {
		await response.body?.cancel();
		throw new Error(`音视频模型请求失败（HTTP ${response.status}）`);
	}
	return response;
}
function googleRoot(local) {
	return local.baseUrl.replace(/\/+$/u, "").replace(/\/v1beta$/u, "");
}
/** 在读取字节或开始上传之前检查协议限制，避免无效请求消耗网络和额度。 */
function validateFiles(local, files) {
	if (local.adapter === "google-generative-ai") {
		const version = /gemini-(\d+(?:\.\d+)?)/iu.exec(local.modelId);
		const limit = version && Number(version[1]) < 2.5 ? 1 : 10;
		if (files.filter((file) => file.mimeType.startsWith("video/")).length > limit) throw new Error(`此 Gemini 模型每次最多接收 ${limit} 个视频。`);
	}
}
async function callLocalModel(ctx, model, instruction, files, signal, effort) {
	const local = model.local;
	const identity = {
		...model,
		id: local.modelId
	};
	const reasoning = omniReasoningParams(model, effort);
	validateFiles(local, files);
	const sizeError = omniInlineFileError(identity, files);
	if (sizeError) throw new Error(sizeError);
	const generate = async (media) => {
		signal.throwIfAborted();
		const google = local.adapter === "google-generative-ai";
		const base = local.baseUrl.replace(/\/+$/u, "");
		const endpoint = google ? `${googleRoot(local)}/v1beta/models/${encodeURIComponent(local.modelId)}:generateContent` : `${new URL(base).pathname === "/" ? `${base}/v1` : base}/chat/completions`;
		const headers = { "content-type": "application/json" };
		if (local.apiKey) headers[google ? "x-goog-api-key" : "authorization"] = google ? local.apiKey : `Bearer ${local.apiKey}`;
		const prompt = omniPromptBody(identity, instruction, media);
		const body = {
			...prompt,
			...reasoning,
			...google ? { generationConfig: {
				...prompt.generationConfig,
				...reasoning.generationConfig
			} } : {}
		};
		return readOmniProviderResponse(await providerFetch(endpoint, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
			signal
		}), local.modelId, signal);
	};
	if (omniFitsInline(identity, instruction, files)) return generate(await readMedia(ctx, files, signal));
	if (local.adapter !== "google-generative-ai") throw new Error("此接口仅支持直接发送，编码后的完整请求不能超过 100 MB；请压缩或分段后重试。");
	return withGoogleFiles(ctx, local, files, signal, generate);
}
/** 大音频复用 Gemini Files API；处理完成、失败或取消后都尝试删除本次远端文件。 */
async function withGoogleFiles(ctx, local, files, signal, run) {
	const root = googleRoot(local);
	const headers = local.apiKey ? { "x-goog-api-key": local.apiKey } : {};
	const uploaded = [];
	try {
		for (const file of files) {
			signal.throwIfAborted();
			const start = await providerFetch(`${root}/upload/v1beta/files`, {
				method: "POST",
				signal,
				headers: {
					...headers,
					"content-type": "application/json",
					"x-goog-upload-protocol": "resumable",
					"x-goog-upload-command": "start",
					"x-goog-upload-header-content-length": String(file.size),
					"x-goog-upload-header-content-type": file.mimeType
				},
				body: JSON.stringify({ file: { display_name: file.name } })
			});
			const location = start.headers.get("x-goog-upload-url");
			await start.body?.cancel();
			if (!location) throw new Error("所选接口未提供 Gemini Files API 上传地址。");
			const upload = new URL(location, root);
			if (upload.origin !== new URL(root).origin || upload.username || upload.password) throw new Error("接口返回了不受信任的文件上传地址。");
			for (let offset = 0; offset < file.size; offset += OMNI_CHUNK_BYTES) {
				signal.throwIfAborted();
				const length = Math.min(OMNI_CHUNK_BYTES, file.size - offset);
				const bytes = await ctx.fs.readByteRange(file.target, {
					offset,
					length
				}, signal);
				if (bytes.length !== length) throw new Error(`文件在读取期间发生变化：${file.name}`);
				const final = offset + length === file.size;
				const response = await providerFetch(upload.href, {
					method: "POST",
					signal,
					headers: {
						"content-type": "application/octet-stream",
						"x-goog-upload-offset": String(offset),
						"x-goog-upload-command": final ? "upload, finalize" : "upload"
					},
					body: new Uint8Array(bytes)
				});
				if (final) uploaded.push({
					name: file.name,
					mimeType: file.mimeType,
					remote: omniGoogleUploadSchema.parse(await response.json()).file
				});
				else await response.body?.cancel();
			}
			const after = await ctx.fs.stat(file.target, signal);
			if (after?.size !== file.size || after.version !== file.version) throw new Error(`文件在上传期间发生变化：${file.name}`);
		}
		for (const file of uploaded) {
			while (file.remote.state === "PROCESSING") {
				await setTimeout(2e3, void 0, { signal });
				const response = await providerFetch(`${root}/v1beta/${file.remote.name}`, {
					headers,
					signal
				});
				const remote = omniGoogleFileSchema.parse(await response.json());
				if (remote.name !== file.remote.name) throw new Error("接口返回了无效的文件状态。");
				file.remote = remote;
			}
			if (file.remote.state !== "ACTIVE") throw new Error("Gemini 文件处理失败，请检查音视频格式。");
		}
		return await run(uploaded.map((file) => ({
			name: file.name,
			mimeType: file.mimeType,
			uri: file.remote.uri
		})));
	} finally {
		await Promise.all(uploaded.map(async (file) => {
			try {
				await (await providerFetch(`${root}/v1beta/${file.remote.name}`, {
					method: "DELETE",
					headers,
					signal: AbortSignal.timeout(1e4)
				})).body?.cancel();
			} catch {}
		}));
	}
}
//#endregion
//#region src/call-tool.ts
const argumentsSchema = z.object({
	files: z.array(z.string().min(1).max(4096)).min(1),
	instruction: z.string().trim().min(1).max(12e3)
}).strict();
function omniTool(ctx, config) {
	return {
		name: "media_sense_call",
		description: "调用 Media Sense 模型解决本地音视频的语音转写（含带时间戳转写）、字幕生成、语音或事件的时间点定位、声音辨识、连续动作分析和音画时序理解等问题。仅在任务需要这些能力时调用，使用 Media Sense 设置中的模型并返回文字结果；不执行媒体参数查询、转码、剪辑或图片处理。在保留任务所需信息的前提下，以最小文件体积提交音视频；例如纯语音转写仅提交音轨。附件原始字节合计遵循所选模型的上传上限，默认 25 MB，用户可在设置中修改。返回 JSON { modelId, text, truncated }；truncated 为 true 表示结果不完整，不能作为完整字幕或完整转写，应缩小素材范围或分段后重试。",
		parameters: {
			type: "object",
			additionalProperties: false,
			properties: {
				files: {
					type: "array",
					minItems: 1,
					items: { type: "string" },
					description: "本地音频或视频文件路径，相对路径基于当前会话的工作目录。在保留任务所需信息的前提下，以最小文件体积提交；纯语音转写仅提交音轨。多文件按原始字节累加，使用设置中当前模型的上传上限（默认 25 MB，可修改）。超限请压缩或分段；格式、数量、时长与编码大小还受模型接口限制。"
				},
				instruction: {
					type: "string",
					description: "针对所提供音视频的具体问题、关注范围和输出要求。字幕任务可要求 SRT/VTT 格式和逐句起止时间；需要时间戳或时间点时明确返回的是相对附件还是原素材的时间，附件为片段且需返回原素材时间时提供片段起点。"
				}
			},
			required: ["files", "instruction"]
		},
		output: {
			schema: {
				type: "object",
				additionalProperties: false,
				properties: {
					modelId: { type: "string" },
					text: { type: "string" },
					truncated: { type: "boolean" }
				},
				required: [
					"modelId",
					"text",
					"truncated"
				]
			},
			render: (_args, value) => {
				const result = omniCallResponseSchema.parse(value);
				return [{
					type: "text",
					text: JSON.stringify(result)
				}];
			}
		},
		async execute(value, exec) {
			const args = argumentsSchema.parse(value);
			const kinds = args.files.map((file) => mediaKind(mediaType(file)));
			const signal = AbortSignal.any([exec.signal, AbortSignal.timeout(7200 * 1e3)]);
			const selectedSource = sourceOf(config);
			const callConfig = Object.create(config, {
				externalSource: { value: config.externalSource },
				source: { value: { get: () => selectedSource } }
			});
			const preferences = preferencesOf(callConfig);
			const model = selectOmniModel(await readCatalog(callConfig, signal), preferences, kinds);
			const effort = preferences[kinds.includes("video") ? "videoReasoningEffort" : "audioReasoningEffort"];
			omniReasoningParams(model, effort);
			const reasoningEffort = effort === "default" ? void 0 : effort;
			const local = await inspectMedia(ctx, args.files, {
				...exec,
				signal
			}, omniMediaLimitMB(preferences, model.id));
			if (model.local) return callLocalModel(ctx, {
				...model,
				local: model.local
			}, args.instruction, local, signal, effort);
			const source = callConfig.externalSource;
			if (!source?.available) throw new Error("此模型来源暂不可用，请重新连接或选择自配模型。");
			return source.call(model, args.instruction, local.map((file) => ({
				name: file.name,
				mimeType: file.mimeType,
				size: file.size,
				read: (signal) => ctx.fs.readBytes(file.target, signal, file.size),
				readRange: (offset, length, signal) => ctx.fs.readByteRange(file.target, {
					offset,
					length
				}, signal),
				verify: async (signal) => {
					const after = await ctx.fs.stat(file.target, signal);
					if (after?.size !== file.size || after.version !== file.version) throw new Error(`文件在读取期间发生变化：${file.name}`);
				}
			})), signal, reasoningEffort);
		},
		isConcurrencySafe: () => true
	};
}
//#endregion
//#region src/ffmpeg-assets.ts
const FFMPEG_RELEASE = "b6.1.1";
const FFMPEG_ASSETS = {
	"win32-x64": [
		{
			"tool": "ffmpeg",
			"filename": "ffmpeg-win32-x64.gz",
			"sha256": "8883a3dffbd0a16cf4ef95206ea05283f78908dbfb118f73c83f4951dcc06d77",
			"bytes": 29581307,
			"outputSha256": "04e1307997530f9cf2fe35cba2ca7e8875ca91da02f89d6c7243df819c94ad00",
			"outputBytes": 82797568
		},
		{
			"tool": "ffprobe",
			"filename": "ffprobe-win32-x64.gz",
			"sha256": "f309e6223ad89d2fe54bccd420a7709b66fd27540674e92309578ed491a43c8d",
			"bytes": 29521644,
			"outputSha256": "3a7e2dc003dc2cd1472827e4c7c4f056ae1ae0ae7c5bbc580c99b49827351ba4",
			"outputBytes": 82668032
		},
		{
			"tool": "LICENSE",
			"filename": "win32-x64.LICENSE.gz",
			"sha256": "d751d40ef8ba97bf46964ae203bf88e7c0027b5459946ac758403c1bb032523f",
			"bytes": 12148,
			"outputSha256": "8ceb4b9ee5adedde47b31e975c1d90c73ad27b6b165a1dcd80c7c545eb65b903",
			"outputBytes": 35147
		},
		{
			"tool": "README",
			"filename": "win32-x64.README.gz",
			"sha256": "9910569b1b42c01b91dd03b85abc8472a15b5aa31188e41e9654ae08cc179d07",
			"bytes": 9246,
			"outputSha256": "a636a7183c58006351acbaf35303c0ed85c6e1320fd4e80de453ba6157de6311",
			"outputBytes": 39494
		}
	],
	"darwin-x64": [
		{
			"tool": "ffmpeg",
			"filename": "ffmpeg-darwin-x64.gz",
			"sha256": "929b375c1182d956c51f7ac25e0b2b0411fb01f6f407aa15c9758efeb4242106",
			"bytes": 25296431,
			"outputSha256": "ebdddc936f61e14049a2d4b549a412b8a40deeff6540e58a9f2a2da9e6b18894",
			"outputBytes": 78862176
		},
		{
			"tool": "ffprobe",
			"filename": "ffprobe-darwin-x64.gz",
			"sha256": "d4da574d6e2e197bd259b47d69cf262df9e312af24ad960444f6d806d3d4c186",
			"bytes": 25239438,
			"outputSha256": "fa3add0ce901f7241abe0dfc0155d958fc834aca3f8ce61f87cc712ae669c1e0",
			"outputBytes": 78780408
		},
		{
			"tool": "LICENSE",
			"filename": "darwin-x64.LICENSE.gz",
			"sha256": "07bfe0aa59feabb64665dde54683d4bcfa6901d1b9eb70219ee3d6ce5c5b51a2",
			"bytes": 1788,
			"outputSha256": "2e1d16c72fd74e12063776371da757322f8b77589386532f4fd8634bde7de1af",
			"outputBytes": 4346
		},
		{
			"tool": "README",
			"filename": "darwin-x64.README.gz",
			"sha256": "63f983e795802452bdb02bd77c27f3dded90a63eec20d1f3e47220823aa8d1b2",
			"bytes": 1439,
			"outputSha256": "e88a0325f8e5b75210355e37341824f074d3cd82def2125be54c914b62848a36",
			"outputBytes": 6227
		}
	],
	"darwin-arm64": [
		{
			"tool": "ffmpeg",
			"filename": "ffmpeg-darwin-arm64.gz",
			"sha256": "8923876afa8db5585022d7860ec7e589af192f441c56793971276d450ed3bbfa",
			"bytes": 19246198,
			"outputSha256": "a90e3db6a3fd35f6074b013f948b1aa45b31c6375489d39e572bea3f18336584",
			"outputBytes": 45568216
		},
		{
			"tool": "ffprobe",
			"filename": "ffprobe-darwin-arm64.gz",
			"sha256": "d986a8ec7b030899fe66a8a288ed809a3543338705a3ce178cfb85869c5d80be",
			"bytes": 19207077,
			"outputSha256": "bb2db6f5d8cef919da12fbf592119a987202a8c060a886f3cab091f9cab90b64",
			"outputBytes": 45528808
		},
		{
			"tool": "LICENSE",
			"filename": "darwin-arm64.LICENSE.gz",
			"sha256": "5995e6d7b7fdb371505351fce50b9d6fd4d051f69d3468ed4dd4cbfc14a5b916",
			"bytes": 1802,
			"outputSha256": "cb48bf09a11f5fb576cddb0431c8f5ed0a60157a9ec942adffc13907cbe083f2",
			"outputBytes": 4376
		},
		{
			"tool": "README",
			"filename": "darwin-arm64.README.gz",
			"sha256": "527d4ea64a17e81a72ab57103b3817ee224261b5c07844d5a99af40758315154",
			"bytes": 888,
			"outputSha256": "05ba4b92c96605434b1aaae3eedf5a2c280c9607bf78ffca9a5b536d9af2dc6a",
			"outputBytes": 1810
		}
	],
	"linux-x64": [
		{
			"tool": "ffmpeg",
			"filename": "ffmpeg-linux-x64.gz",
			"sha256": "bfe8a8fc511530457b528c48d77b5737527b504a3797a9bc4866aeca69c2dffa",
			"bytes": 29354986,
			"outputSha256": "e7e7fb30477f717e6f55f9180a70386c62677ef8a4d4d1a5d948f4098aa3eb99",
			"outputBytes": 79826272
		},
		{
			"tool": "ffprobe",
			"filename": "ffprobe-linux-x64.gz",
			"sha256": "25d9b6ccb05e3d9de9e04e31e2506d8dd7f9f0418981965ac6df12e8d3afd067",
			"bytes": 29276839,
			"outputSha256": "4f231a1960d83e403d08f7971e271707bec278a9ae18e21b8b5b03186668450d",
			"outputBytes": 79665792
		},
		{
			"tool": "LICENSE",
			"filename": "linux-x64.LICENSE.gz",
			"sha256": "e6f01cb10f21032b80e78a1b0bd13d6c387d6f18eed9a37f99ea35d7e3f7bb7a",
			"bytes": 12148,
			"outputSha256": "8ceb4b9ee5adedde47b31e975c1d90c73ad27b6b165a1dcd80c7c545eb65b903",
			"outputBytes": 35147
		},
		{
			"tool": "README",
			"filename": "linux-x64.README.gz",
			"sha256": "ef9ccbfae3fccc2be1c0face637afb885edc2dfd13901e07ad8541ecc21bd76c",
			"bytes": 985,
			"outputSha256": "72f4b1b06d419d22ace6e7cc75f06826f90737345aa0b1736158929f4aacc537",
			"outputBytes": 2235
		}
	],
	"linux-arm64": [
		{
			"tool": "ffmpeg",
			"filename": "ffmpeg-linux-arm64.gz",
			"sha256": "754a678672298bc68156adff58aa7385a592c2b30b1d0ae8750c45c915c4bac0",
			"bytes": 25568691,
			"outputSha256": "6bb182d0d75d23028db82e9e4f723ca69b853d055698486e6984ddb2c06fb8ce",
			"outputBytes": 51134160
		},
		{
			"tool": "ffprobe",
			"filename": "ffprobe-linux-arm64.gz",
			"sha256": "2ab6aba60ee84412dff9188720703376cb4e7aaf7e0b5e43aa8249f2acae5bf8",
			"bytes": 25493573,
			"outputSha256": "d17ae9b4c297d48e2521ba14e417bb0537c6ff77c584cdbcd6bb0d8d0307a2e8",
			"outputBytes": 50994160
		},
		{
			"tool": "LICENSE",
			"filename": "linux-arm64.LICENSE.gz",
			"sha256": "04dec67da0540177665f991e3f8f08ed1bc6b949c09ce644c37cd30082591b56",
			"bytes": 12150,
			"outputSha256": "8ceb4b9ee5adedde47b31e975c1d90c73ad27b6b165a1dcd80c7c545eb65b903",
			"outputBytes": 35147
		},
		{
			"tool": "README",
			"filename": "linux-arm64.README.gz",
			"sha256": "239f3669d1534a8260e867afc209b0f53fefcb9347bea8859920c074ae5a32bb",
			"bytes": 974,
			"outputSha256": "d6777d2fd276b23f0ac6666fa619e88ffe4826521881c7ff83836e30cb4acec2",
			"outputBytes": 2217
		}
	]
};
//#endregion
//#region src/ffmpeg-download.ts
const FFMPEG_MIRRORS = ["https://cdn.npmmirror.com/binaries/ffmpeg-static", "https://registry.npmmirror.com/-/binary/ffmpeg-static"];
async function fileMatches(path, asset) {
	try {
		if ((await stat(path)).size !== asset.outputBytes) return false;
		const hash = createHash("sha256");
		for await (const chunk of createReadStream(path)) hash.update(chunk);
		return hash.digest("hex") === asset.outputSha256;
	} catch {
		return false;
	}
}
/** 固定地址、固定文件名与双重摘要；不解压归档路径，也不运行安装脚本。 */
async function downloadFfmpegAsset(asset, target, signal, progress, request = fetch) {
	let failure;
	for (const mirror of FFMPEG_MIRRORS) {
		signal.throwIfAborted();
		progress(0);
		try {
			const attempt = AbortSignal.any([signal, AbortSignal.timeout(5 * 6e4)]);
			const response = await request(`${mirror}/${FFMPEG_RELEASE}/${asset.filename}`, { signal: attempt });
			if (!response.ok || !response.body) {
				await response.body?.cancel();
				throw new Error(`HTTP ${response.status}`);
			}
			let compressed = 0, expanded = 0;
			const inputHash = createHash("sha256"), outputHash = createHash("sha256");
			await pipeline(Readable.fromWeb(response.body), new Transform({ transform(chunk, _encoding, callback) {
				compressed += chunk.length;
				if (compressed > asset.bytes) {
					callback(/* @__PURE__ */ new Error("FFmpeg 下载文件大小不符"));
					return;
				}
				inputHash.update(chunk);
				progress(compressed);
				callback(null, chunk);
			} }), createGunzip(), new Transform({ transform(chunk, _encoding, callback) {
				expanded += chunk.length;
				if (expanded > asset.outputBytes) {
					callback(/* @__PURE__ */ new Error("FFmpeg 解压文件大小不符"));
					return;
				}
				outputHash.update(chunk);
				callback(null, chunk);
			} }), createWriteStream(target, {
				flags: "wx",
				mode: 384
			}), { signal: attempt });
			if (compressed !== asset.bytes || expanded !== asset.outputBytes || inputHash.digest("hex") !== asset.sha256 || outputHash.digest("hex") !== asset.outputSha256) throw new Error("FFmpeg 下载校验失败，请重试。");
			return;
		} catch (error) {
			failure = error;
			await rm(target, { force: true });
			signal.throwIfAborted();
			if (error?.code === "ENOSPC") throw error;
		}
	}
	throw new Error("FFmpeg 下载或校验失败，请检查网络后重试。", { cause: failure });
}
//#endregion
//#region src/ffmpeg.ts
const process = hostProcess;
const execute = promisify(execFile);
const binaries = ["ffmpeg", "ffprobe"];
async function probeFfmpeg(file, tool, signal) {
	signal.throwIfAborted();
	try {
		await access(file, constants.X_OK);
		const { stdout } = await execute(file, ["-version"], {
			timeout: 5e3,
			maxBuffer: 64 * 1024,
			windowsHide: true,
			signal
		});
		return new RegExp(`^${tool} version ([^\\s]+)`, "u").exec(stdout)?.[1];
	} catch {
		signal.throwIfAborted();
		return;
	}
}
/** 系统环境优先；补齐桌面启动时 PATH 常遗漏的标准安装目录。 */
async function ffmpegCandidates(tool, platform, env) {
	const windows = platform === "win32", paths = windows ? path.win32 : path.posix;
	const directories = (Object.entries(env).find(([name]) => windows ? name.toLowerCase() === "path" : name === "PATH")?.[1] ?? "").split(windows ? ";" : ":").map((value) => value.trim().replace(/^"|"$/gu, "")).filter((value) => paths.isAbsolute(value));
	if (windows) {
		for (const root of [env.ProgramFiles, env.LOCALAPPDATA && paths.join(env.LOCALAPPDATA, "Programs")]) if (root) directories.push(paths.join(root, "FFmpeg", "bin"));
		if (env.USERPROFILE) directories.push(paths.join(env.USERPROFILE, "scoop", "apps", "ffmpeg", "current", "bin"));
		if (env.ChocolateyInstall) directories.push(paths.join(env.ChocolateyInstall, "bin"));
		if (env.LOCALAPPDATA) {
			directories.push(paths.join(env.LOCALAPPDATA, "Microsoft", "WinGet", "Links"));
			const packages = paths.join(env.LOCALAPPDATA, "Microsoft", "WinGet", "Packages");
			for (const entry of await readdir(packages, { withFileTypes: true }).catch(() => [])) {
				if (!entry.isDirectory() || !/^(Gyan|BtbN)\.FFmpeg/iu.test(entry.name)) continue;
				const root = paths.join(packages, entry.name);
				directories.push(paths.join(root, "bin"));
				for (const child of await readdir(root, { withFileTypes: true }).catch(() => [])) if (child.isDirectory()) directories.push(paths.join(root, child.name, "bin"));
			}
		}
	} else directories.push("/opt/homebrew/bin", "/usr/local/bin", "/usr/bin", "/bin");
	return [...new Set(directories)].map((directory) => paths.join(directory, `${tool}${windows ? ".exe" : ""}`));
}
var FfmpegManager = class {
	platform;
	env;
	directory;
	assets;
	probe;
	request;
	lifetime = new AbortController();
	operation;
	refreshing;
	value;
	constructor(options = {}) {
		this.platform = options.platform ?? process.platform;
		this.env = options.env ?? process.env;
		const platform = `${this.platform}-${options.arch ?? process.arch}`;
		this.assets = options.assets ?? FFMPEG_ASSETS[platform];
		this.directory = path.resolve(options.directory ?? path.join(this.env.DSH_HOME || path.join(homedir(), ".dsh"), "tools", "omni-ffmpeg"), platform, FFMPEG_RELEASE);
		this.probe = options.probe ?? probeFfmpeg;
		this.request = options.request ?? fetch;
		this.value = {
			state: "missing",
			platform,
			canInstall: !!this.assets,
			downloadedBytes: 0,
			totalBytes: 0,
			message: ""
		};
	}
	snapshot() {
		return { ...this.value };
	}
	dispose() {
		this.lifetime.abort();
	}
	filename(tool) {
		return `${tool}${this.platform === "win32" && binaries.includes(tool) ? ".exe" : ""}`;
	}
	async discover(signal) {
		const found = {};
		for (const tool of binaries) {
			const candidates = await ffmpegCandidates(tool, this.platform, this.env);
			if (tool === "ffprobe" && found.ffmpeg?.source === "system") candidates.unshift(path.join(path.dirname(found.ffmpeg.path), this.filename(tool)));
			for (const candidate of [...new Set(candidates)]) {
				const resolved = await realpath(candidate).catch(() => void 0);
				if (!resolved) continue;
				const version = await this.probe(resolved, tool, signal);
				if (version) {
					found[tool] = {
						path: resolved,
						version,
						source: "system"
					};
					break;
				}
			}
			if (found[tool]) continue;
			const asset = this.assets?.find((asset) => asset.tool === tool), file = path.join(this.directory, this.filename(tool));
			if (asset && await fileMatches(file, asset)) {
				const version = await this.probe(file, tool, signal);
				if (version) found[tool] = {
					path: file,
					version,
					source: "managed"
				};
			}
		}
		return found;
	}
	refresh() {
		if (this.operation) return Promise.resolve(this.snapshot());
		if (!this.refreshing) this.refreshing = this.discover(this.lifetime.signal).then((found) => {
			if (!this.operation) this.value = {
				...this.value,
				ffmpeg: found.ffmpeg,
				ffprobe: found.ffprobe,
				state: found.ffmpeg && found.ffprobe ? "ready" : !this.assets ? "unsupported" : this.value.state === "error" ? "error" : "missing",
				message: found.ffmpeg && found.ffprobe ? "" : !this.assets ? "当前系统暂不支持自动安装，请安装 FFmpeg 和 FFprobe 后重新检测。" : this.value.message
			};
			return this.snapshot();
		}).finally(() => {
			this.refreshing = void 0;
		});
		return this.refreshing;
	}
	/** 设置页与工具共用同一安装任务；单个调用取消只停止等待，插件卸载则终止下载。 */
	ensure(signal) {
		signal?.throwIfAborted();
		this.lifetime.signal.throwIfAborted();
		if (!this.operation) {
			this.value = {
				...this.value,
				state: "installing",
				message: "",
				downloadedBytes: 0,
				totalBytes: 0
			};
			this.operation = this.install().then((result) => {
				this.value = {
					...this.value,
					...result,
					state: "ready",
					message: ""
				};
				return result;
			}, (error) => {
				this.value = {
					...this.value,
					state: this.assets ? "error" : "unsupported",
					message: error instanceof Error ? error.message : "FFmpeg 安装失败，请重试。"
				};
				throw error;
			}).finally(() => {
				this.operation = void 0;
			});
		}
		const operation = this.operation;
		if (!signal) return operation;
		return new Promise((resolve, reject) => {
			const abort = () => reject(signal.reason);
			signal.addEventListener("abort", abort, { once: true });
			operation.then(resolve, reject).finally(() => signal.removeEventListener("abort", abort));
		});
	}
	async install() {
		const signal = AbortSignal.any([this.lifetime.signal, AbortSignal.timeout(15 * 6e4)]);
		const found = await this.discover(signal);
		this.value = {
			...this.value,
			ffmpeg: found.ffmpeg,
			ffprobe: found.ffprobe
		};
		if (found.ffmpeg && found.ffprobe) return found;
		if (!this.assets) throw new Error("当前系统暂不支持自动安装，请安装 FFmpeg 和 FFprobe 后重新检测。");
		const pending = this.assets.filter((asset) => !binaries.includes(asset.tool) || !found[asset.tool]);
		this.value.totalBytes = pending.reduce((sum, asset) => sum + asset.bytes, 0);
		await mkdir(this.directory, { recursive: true });
		const stage = await mkdtemp(path.join(this.directory, ".install-"));
		try {
			let completed = 0;
			const installed = {};
			for (const asset of pending) {
				const file = path.join(stage, this.filename(asset.tool));
				await downloadFfmpegAsset(asset, file, signal, (bytes) => {
					this.value.downloadedBytes = completed + bytes;
				}, this.request);
				completed += asset.bytes;
				if (binaries.includes(asset.tool)) {
					await chmod(file, 493);
					const version = await this.probe(file, asset.tool, signal);
					if (!version) throw new Error("FFmpeg 无法运行，请检查系统兼容性后重试。");
					installed[asset.tool] = {
						path: path.join(this.directory, this.filename(asset.tool)),
						version,
						source: "managed"
					};
				}
			}
			signal.throwIfAborted();
			for (const asset of pending) {
				const target = path.join(this.directory, this.filename(asset.tool));
				if (!await fileMatches(target, asset)) await rename(path.join(stage, this.filename(asset.tool)), target);
			}
			return {
				...found,
				...installed
			};
		} catch (error) {
			if (error?.code === "ENOSPC") throw new Error("磁盘空间不足，请清理空间后重试。");
			throw error;
		} finally {
			await rm(stage, {
				recursive: true,
				force: true
			});
		}
	}
};
//#endregion
//#region src/ffmpeg-integration.ts
const empty = z.object({}).strict();
function prepareFfmpegTool(manager) {
	return {
		name: "media_sense_prepare_ffmpeg",
		description: "准备本地音视频处理所需的 FFmpeg 和 FFprobe。优先复用本机已有程序，缺失时自动从国内镜像下载校验后的固定版本，无需用户先进入设置。返回两个程序的绝对路径、版本和来源；后续媒体命令使用返回的绝对路径。本工具只准备运行环境，不读取或改动媒体，也不调用音视频理解模型。",
		parameters: {
			type: "object",
			properties: {},
			additionalProperties: false
		},
		timeoutMs: 16 * 6e4,
		output: {
			schema: {
				type: "object",
				additionalProperties: true
			},
			render: (_args, value) => [{
				type: "text",
				text: JSON.stringify(omniFfmpegReadySchema.parse(value))
			}]
		},
		isConcurrencySafe: () => true,
		async execute(args, exec) {
			empty.parse(args);
			return manager.ensure(exec.signal);
		}
	};
}
function installFfmpeg(ctx, manager = new FfmpegManager()) {
	ctx.effect(() => () => manager.dispose());
	ctx.tools.register(prepareFfmpegTool(manager));
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: "/media-sense/ffmpeg",
		async handler(request, response) {
			response.setHeader("content-type", "application/json; charset=utf-8");
			response.setHeader("cache-control", "no-store");
			const reply = (status, value) => {
				response.statusCode = status;
				response.end(JSON.stringify(value));
			};
			try {
				if (request.headers["sec-fetch-site"] === "cross-site" || request.headers.origin && request.headers.origin !== `http://${request.headers.host}`) {
					reply(403, { message: "请求来源无效" });
					return;
				}
				if (request.method === "GET") {
					reply(200, omniFfmpegStatusSchema.parse(await manager.refresh()));
					return;
				}
				if (request.method !== "POST") {
					response.setHeader("allow", "GET, POST");
					reply(405, { message: "请求方法不支持" });
					return;
				}
				if (!request.headers["content-type"]?.startsWith("application/json")) {
					reply(415, { message: "请求格式无效" });
					return;
				}
				let size = 0;
				const chunks = [];
				for await (const chunk of request) {
					const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
					size += data.length;
					if (size > 1024) {
						reply(413, { message: "设置请求过大" });
						return;
					}
					chunks.push(data);
				}
				omniFfmpegInstallRequestSchema.parse(JSON.parse(Buffer.concat(chunks).toString("utf8")));
				manager.ensure().catch(() => {});
				reply(202, omniFfmpegStatusSchema.parse(manager.snapshot()));
			} catch {
				reply(400, { message: "FFmpeg 请求失败，请重试。" });
			}
		}
	}));
}
//#endregion
//#region src/settings-store.ts
const schema = z.object({
	version: z.literal(1),
	source: z.enum([
		"",
		"local",
		"host"
	]),
	lastSourceScope: z.string(),
	preferences: z.record(omniPreferencesSchema),
	localModels: z.array(mediaSenseModelWriteSchema).max(50)
}).strict();
/** 可选共享存储让 不同 profile 共用媒体配置，凭据只写本机私有文件。 */
async function openSettings(config) {
	if (!config.storagePath) return config;
	const path = config.storagePath;
	let state = schema.parse({
		version: 1,
		source: config.source?.get() ?? "",
		lastSourceScope: config.lastSourceScope?.get() ?? "",
		preferences: config.preferences.get(),
		localModels: config.localModels?.get() ?? []
	});
	try {
		const stored = schema.parse(JSON.parse(await readFile(path, "utf8")));
		state = {
			...stored,
			preferences: {
				...state.preferences,
				...stored.preferences
			}
		};
	} catch (error) {
		if (error.code !== "ENOENT") throw new Error("媒体配置读取失败，请检查本地配置文件。", { cause: error });
	}
	const runtime = Object.create(config);
	Object.defineProperties(runtime, Object.fromEntries(Object.entries({
		source: { get: () => state.source },
		lastSourceScope: { get: () => state.lastSourceScope },
		preferences: { get: () => state.preferences },
		localModels: { get: () => state.localModels.map((model) => ({
			...model,
			apiKey: model.apiKey ?? ""
		})) },
		async write(patch) {
			const next = schema.parse({
				...state,
				...patch
			});
			await mkdir(dirname(path), {
				recursive: true,
				mode: 448
			});
			const temporary = `${path}.${randomUUID()}.tmp`;
			try {
				await writeFile(temporary, JSON.stringify(next) + "\n", {
					encoding: "utf8",
					mode: 384,
					flag: "wx"
				});
				await rename(temporary, path);
				state = next;
			} finally {
				try {
					await unlink(temporary);
				} catch (error) {
					if (error.code !== "ENOENT") throw error;
				}
			}
		}
	}).map(([key, value]) => [key, { value }])));
	return runtime;
}
//#endregion
//#region src/index.ts
const name = SETTINGS_ID;
const inject = [
	"workingDirectory",
	"tools",
	"fs",
	"settings",
	"webServer"
];
async function settingsState(config) {
	let hostMessage = "";
	const host = config.externalSource?.available ? await readHostCatalog(config).catch((error) => {
		hostMessage = error instanceof Error ? error.message : "模型目录暂时不可用";
		return [];
	}) : [];
	if (!config.externalSource?.available) hostMessage = "此模型来源暂不可用，请重新连接或选择自配模型。";
	const local = localCatalog(config);
	const source = sourceOf(config);
	const summary = (catalog) => catalog.filter((model) => omniSupports(model, "audio") || omniSupports(model, "video")).map((model) => ({
		id: model.id,
		name: model.name,
		protocol: model.protocol,
		audio: omniSupports(model, "audio"),
		video: omniSupports(model, "video"),
		reasoningEfforts: omniReasoningEfforts(model)
	}));
	const preferencesBySource = {
		local: resolveOmniPreferences(local, preferencesOf(config, "local")),
		host: resolveOmniPreferences(host, preferencesOf(config, "host"))
	};
	return {
		...config.externalSource ? { hostSource: {
			label: config.externalSource.label,
			available: config.externalSource.available
		} } : {},
		source,
		preferences: preferencesBySource[source],
		preferencesBySource,
		models: summary(source === "local" ? local : host),
		hostModels: summary(host),
		hostMessage,
		localModels: (config.localModels?.get() ?? []).map(({ apiKey, ...model }) => ({
			...model,
			hasApiKey: !!apiKey
		})),
		message: source === "host" ? hostMessage : ""
	};
}
/** 更新在同一队列内读取旧值，空白密钥不能意外覆盖已保存的凭据。 */
async function saveSettings(ctx, config, input) {
	const hostSource = config.externalSource;
	const hostScope = preferenceScope(config, "host");
	let hostUpdated = false;
	if (input.source === "host" && !config.externalSource?.available) throw new Error("此模型来源暂不可用，请重新连接或选择自配模型。");
	const previousModels = config.localModels?.get() ?? [];
	const localModels = input.localModels.map(({ apiKey, ...model }) => ({
		...model,
		apiKey: apiKey ?? previousModels.find((previous) => previous.id === model.id)?.apiKey ?? ""
	}));
	const nextPreferences = { ...config.preferences.get() };
	const updates = {
		...input.preferencesBySource,
		[input.source]: input.preferences
	};
	for (const source of ["local", "host"]) {
		const preferences = updates[source];
		if (!preferences) continue;
		const previous = preferencesOf(config, source);
		if (source !== input.source && JSON.stringify(preferences) === JSON.stringify(previous)) continue;
		if (source === "host" && !config.externalSource?.available) continue;
		const models = source === "local" ? localCatalog({
			...config,
			localModels: { get: () => localModels }
		}) : await readHostCatalog(Object.create(config, { externalSource: { value: hostSource } }));
		const resolved = resolveOmniPreferences(models, preferences);
		for (const kind of ["audio", "video"]) {
			const field = kind === "audio" ? "audioModelId" : "videoModelId";
			const id = preferences[field];
			if (id && id !== previous[field] && !models.some((model) => model.id === id && omniSupports(model, kind))) throw new Error(`所选${kind === "audio" ? "音频" : "视频"}模型不可用。`);
			const effort = preferences[kind === "audio" ? "audioReasoningEffort" : "videoReasoningEffort"];
			if (effort && effort !== "default") {
				const model = models.find((model) => model.id === resolved[field]);
				if (!model) throw new Error("所选模型不支持此思考强度，请在 Media Sense 设置中重新选择。");
				omniReasoningParams(model, effort);
			}
		}
		if (source === "host") hostUpdated = true;
		nextPreferences[source === "local" ? "local" : hostScope] = preferences;
	}
	if (hostUpdated && (!config.externalSource?.available || preferenceScope(config, "host") !== hostScope)) throw new Error("模型来源已变化，请重新加载设置后再保存。");
	await writeSettings(ctx, config, {
		source: input.source,
		localModels,
		preferences: nextPreferences
	});
}
function writeSettings(ctx, config, patch) {
	return config.write ? config.write(patch) : ctx.settings.update(config.settingsId ?? "media-sense", patch);
}
async function apply(ctx, initial) {
	const settings = await openSettings(initial);
	let externalSource;
	const config = Object.create(settings, { externalSource: { get: () => externalSource } });
	let writes = Promise.resolve();
	ctx.provide("mediaSenseSources", {
		current: () => externalSource,
		register(source) {
			if (externalSource) throw new Error("已存在动态媒体模型来源");
			externalSource = source;
			writes = writes.then(() => source.available ? writeSettings(ctx, config, {
				lastSourceScope: source.scope,
				...!settings.source?.get() ? { source: "host" } : {}
			}) : void 0).catch((error) => ctx.logger.warn("保存媒体模型来源失败：%s", error instanceof Error ? error.message : "未知错误"));
			return () => {
				if (externalSource === source) externalSource = void 0;
			};
		}
	});
	ctx.effect(() => ctx.settings.configure({ auto: false }, ctx.fiber));
	ctx.tools.register(omniTool(ctx, config));
	installFfmpeg(ctx);
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: "/media-sense/settings",
		async handler(request, response) {
			response.setHeader("content-type", "application/json; charset=utf-8");
			response.setHeader("cache-control", "no-store");
			try {
				if (request.method === "PUT") {
					if (request.headers["sec-fetch-site"] === "cross-site" || request.headers.origin && request.headers.origin !== `http://${request.headers.host}`) {
						response.statusCode = 403;
						response.end(JSON.stringify({ message: "请求来源无效" }));
						return;
					}
					if (!request.headers["content-type"]?.startsWith("application/json")) {
						response.statusCode = 415;
						response.end(JSON.stringify({ message: "请求格式无效" }));
						return;
					}
					const chunks = [];
					let size = 0;
					for await (const chunk of request) {
						const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
						size += data.length;
						if (size > 1024 * 1024) throw new Error("设置请求过大");
						chunks.push(data);
					}
					const input = mediaSenseSettingsWriteSchema.parse(JSON.parse(Buffer.concat(chunks).toString("utf8")));
					const write = writes.then(() => saveSettings(ctx, config, input));
					writes = write.then(() => void 0, () => void 0);
					await write;
				} else if (request.method !== "GET") {
					response.statusCode = 405;
					response.setHeader("allow", "GET, PUT");
					response.end();
					return;
				}
				response.end(JSON.stringify(await settingsState(config)));
			} catch (error) {
				response.statusCode = 400;
				response.end(JSON.stringify({ message: error instanceof Error ? error.message : "Media Sense 设置读取失败" }));
			}
		}
	}));
}
//#endregion
export { Config, apply, inject, name, saveSettings, settingsState };
