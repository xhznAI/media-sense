import { z } from "zod";
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
//#endregion
//#region src/api/omni.ts
/** 用户可按模型调整原始素材总量；默认 25 MB，按十进制计量。 */
const OMNI_DEFAULT_MEDIA_MB = 25;
/** 传输安全上限独立于用户偏好；大文件只能经支持的分块接口发送。 */
const OMNI_MAX_MEDIA_BYTES = 2e9;
const OMNI_MAX_INLINE_MEDIA_BYTES = 75e6;
const OMNI_MEDIA_SIZE_MESSAGE = "原始音视频素材合计超过传输上限 2,000 MB，请压缩或分段后重试。";
const OMNI_REQUEST_SIZE_MESSAGE = "音视频请求内容过大，请减少附件数量或缩短指令后重试。";
const OMNI_GEMINI_MAX_VIDEOS = 10;
/** 分块大小只是传输窗口，不是文件大小限制。 */
const OMNI_CHUNK_BYTES = 4 * 1024 * 1024;
/** Gemini 通用输入文档以完整请求体计 100 MB，包含 base64 和 JSON 文本。 */
const MODEL_MAX_REQUEST_BYTES = 1e8;
/** 音频专页仍规定 20 MB；含独立音频文件的 Gemini 请求遵循该更具体的额度。 */
const OMNI_GOOGLE_AUDIO_REQUEST_BYTES = 2e7;
const OMNI_MAX_RESULT_CHARS = 32e3;
const omniKindSchema = z.enum(["audio", "video"]);
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
const omniCallRequestSchema = z.union([omniInlineRequestSchema, omniCallBase.extend({
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
const omniUploadResponseSchema = z.object({
	uploadId: z.string().uuid(),
	chunkBytes: z.literal(OMNI_CHUNK_BYTES)
}).strict();
const omniChunkRequestSchema = z.object({
	offset: z.number().int().nonnegative(),
	data: base64Schema(OMNI_CHUNK_BYTES)
}).strict();
const omniUploadStatusSchema = z.object({ ready: z.boolean() }).strict();
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
const mediaSenseSettingsResponseSchema = omniSettingsResponseSchema.extend({
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
export { MODEL_MAX_REQUEST_BYTES, OMNI_CHUNK_BYTES, OMNI_DEFAULT_MEDIA_MB, OMNI_GEMINI_MAX_VIDEOS, OMNI_GOOGLE_AUDIO_REQUEST_BYTES, OMNI_MAX_INLINE_MEDIA_BYTES, OMNI_MAX_MEDIA_BYTES, OMNI_MAX_RESULT_CHARS, OMNI_MEDIA_SIZE_MESSAGE, OMNI_REQUEST_SIZE_MESSAGE, isGlmVideo, isKimiVideo, isMimoOmni, isQwenOmni, mediaSenseAdapterSchema, mediaSenseLocalModelSchema, mediaSenseModel, mediaSenseModelSummary, mediaSenseModelWriteSchema, mediaSenseSettingsResponseSchema, mediaSenseSettingsWriteSchema, mediaSenseSourceSchema, omniAudioFormat, omniByteLength, omniCallRequestSchema, omniCallResponseSchema, omniChunkRequestSchema, omniFfmpegBinarySchema, omniFfmpegInstallRequestSchema, omniFfmpegReadySchema, omniFfmpegStatusSchema, omniFileMetadataSchema, omniFileSchema, omniFitsInline, omniGoogleFileSchema, omniGoogleUploadSchema, omniInlineFileError, omniInlineRequestLimit, omniInlineSizes, omniKindSchema, omniMediaLimitMB, omniMimeTypes, omniPreferencesSchema, omniPromptBody, omniReasoningEffortSchema, omniReasoningEfforts, omniReasoningParams, omniReasoningPreferenceSchema, omniSettingsResponseSchema, omniSupports, omniUploadRequestSchema, omniUploadResponseSchema, omniUploadStatusSchema, readOmniProviderResponse };
