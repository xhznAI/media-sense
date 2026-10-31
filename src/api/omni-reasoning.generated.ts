// 由 scripts/generate-reasoning.mjs 离线截获固定 AI 包参数生成，请勿手动编辑。
export const omniReasoningSdkVersion = "1.1.0";
export const omniReasoningProfiles: ReadonlyArray<Record<string, Record<string, unknown>>> = [
  {
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "low": {
      "reasoning_effort": "low"
    },
    "medium": {
      "reasoning_effort": "medium"
    },
    "high": {
      "reasoning_effort": "high"
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "minimal": {
      "reasoning_effort": "minimal"
    },
    "low": {
      "reasoning_effort": "low"
    },
    "medium": {
      "reasoning_effort": "medium"
    },
    "high": {
      "reasoning_effort": "high"
    },
    "xhigh": {
      "reasoning_effort": "xhigh"
    },
    "max": {
      "reasoning_effort": "max"
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "low": {
      "reasoning_effort": "low"
    },
    "high": {
      "reasoning_effort": "high"
    },
    "max": {
      "reasoning_effort": "max"
    }
  },
  {
    "off": {
      "chat_template_args": {
        "enable_thinking": false
      }
    },
    "high": {
      "chat_template_args": {
        "enable_thinking": true
      }
    }
  },
  {
    "off": {
      "reasoning_effort": "none",
      "chat_template_args": {
        "enable_thinking": false
      }
    },
    "high": {
      "reasoning_effort": "high",
      "chat_template_args": {
        "enable_thinking": true
      }
    },
    "max": {
      "reasoning_effort": "max",
      "chat_template_args": {
        "enable_thinking": true
      }
    }
  },
  {
    "low": {
      "reasoning_effort": "low"
    },
    "high": {
      "reasoning_effort": "high"
    },
    "max": {
      "reasoning_effort": "max"
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "low": {
      "reasoning_effort": "low"
    },
    "medium": {
      "reasoning_effort": "medium"
    },
    "high": {
      "reasoning_effort": "high"
    }
  },
  {
    "off": {
      "thinking": {
        "type": "disabled"
      }
    },
    "high": {
      "thinking": {
        "type": "enabled"
      }
    },
    "max": {
      "thinking": {
        "type": "enabled"
      }
    }
  },
  {
    "off": {
      "thinking": {
        "type": "disabled"
      }
    },
    "high": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "high"
    },
    "max": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "max"
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "high": {
      "reasoning_effort": "high"
    }
  },
  {
    "minimal": {
      "reasoning_effort": "minimal"
    },
    "low": {
      "reasoning_effort": "low"
    },
    "medium": {
      "reasoning_effort": "medium"
    },
    "high": {
      "reasoning_effort": "high"
    }
  },
  {
    "low": {
      "reasoning_effort": "low"
    },
    "medium": {
      "reasoning_effort": "medium"
    },
    "xhigh": {
      "reasoning_effort": "xhigh"
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "high": {
      "reasoning_effort": "high"
    },
    "max": {
      "reasoning_effort": "max"
    }
  },
  {
    "off": {
      "thinking": {
        "type": "disabled"
      }
    },
    "low": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "low"
    },
    "high": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "high"
    },
    "max": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "max"
    }
  },
  {
    "off": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 0
        },
        "maxOutputTokens": 8192
      }
    },
    "minimal": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": -1
        },
        "maxOutputTokens": 8192
      }
    },
    "low": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": -1
        },
        "maxOutputTokens": 8192
      }
    },
    "medium": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": -1
        },
        "maxOutputTokens": 8192
      }
    },
    "high": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": -1
        },
        "maxOutputTokens": 8192
      }
    }
  },
  {
    "off": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 0
        },
        "maxOutputTokens": 8192
      }
    },
    "minimal": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 128
        },
        "maxOutputTokens": 8320
      }
    },
    "low": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 2048
        },
        "maxOutputTokens": 10240
      }
    },
    "medium": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 8192
        },
        "maxOutputTokens": 16384
      }
    },
    "high": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 24576
        },
        "maxOutputTokens": 32768
      }
    }
  },
  {
    "off": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 0
        },
        "maxOutputTokens": 8192
      }
    },
    "minimal": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 512
        },
        "maxOutputTokens": 8704
      }
    },
    "low": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 2048
        },
        "maxOutputTokens": 10240
      }
    },
    "medium": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 8192
        },
        "maxOutputTokens": 16384
      }
    },
    "high": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 24576
        },
        "maxOutputTokens": 32768
      }
    }
  },
  {
    "off": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 0
        },
        "maxOutputTokens": 8192
      }
    },
    "minimal": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 128
        },
        "maxOutputTokens": 8320
      }
    },
    "low": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 2048
        },
        "maxOutputTokens": 10240
      }
    },
    "medium": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 8192
        },
        "maxOutputTokens": 16384
      }
    },
    "high": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingBudget": 32768
        },
        "maxOutputTokens": 40960
      }
    }
  },
  {
    "minimal": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "MINIMAL"
        },
        "maxOutputTokens": 8192
      }
    },
    "low": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "LOW"
        },
        "maxOutputTokens": 8192
      }
    },
    "medium": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "MEDIUM"
        },
        "maxOutputTokens": 8192
      }
    },
    "high": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "HIGH"
        },
        "maxOutputTokens": 8192
      }
    }
  },
  {
    "minimal": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "MINIMAL"
        },
        "maxOutputTokens": 4096
      }
    },
    "high": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "HIGH"
        },
        "maxOutputTokens": 4096
      }
    }
  },
  {
    "low": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "LOW"
        },
        "maxOutputTokens": 8192
      }
    },
    "medium": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "MEDIUM"
        },
        "maxOutputTokens": 8192
      }
    },
    "high": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "HIGH"
        },
        "maxOutputTokens": 8192
      }
    }
  },
  {
    "minimal": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "MINIMAL"
        },
        "maxOutputTokens": 8192
      }
    },
    "high": {
      "generationConfig": {
        "thinkingConfig": {
          "thinkingLevel": "HIGH"
        },
        "maxOutputTokens": 8192
      }
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "high": {
      "reasoning_effort": "default"
    }
  },
  {
    "high": {
      "reasoning_effort": "high"
    },
    "max": {
      "reasoning_effort": "max"
    }
  },
  {
    "high": {
      "reasoning_effort": "high"
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "low": {
      "reasoning_effort": "low"
    },
    "high": {
      "reasoning_effort": "high"
    },
    "xhigh": {
      "reasoning_effort": "xhigh"
    },
    "max": {
      "reasoning_effort": "max"
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "low": {
      "reasoning_effort": "low"
    },
    "high": {
      "reasoning_effort": "high"
    }
  },
  {
    "off": {
      "reasoning_effort": "none"
    },
    "low": {
      "reasoning_effort": "low"
    },
    "medium": {
      "reasoning_effort": "medium"
    },
    "high": {
      "reasoning_effort": "high"
    },
    "xhigh": {
      "reasoning_effort": "xhigh"
    }
  },
  {
    "off": {
      "thinking": {
        "type": "disabled"
      }
    },
    "minimal": {
      "thinking": {
        "type": "enabled"
      }
    },
    "low": {
      "thinking": {
        "type": "enabled"
      }
    },
    "medium": {
      "thinking": {
        "type": "enabled"
      }
    },
    "high": {
      "thinking": {
        "type": "enabled"
      }
    }
  },
  {
    "minimal": {
      "thinking": {
        "type": "enabled"
      }
    },
    "low": {
      "thinking": {
        "type": "enabled"
      }
    },
    "medium": {
      "thinking": {
        "type": "enabled"
      }
    },
    "high": {
      "thinking": {
        "type": "enabled"
      }
    }
  },
  {
    "max": {
      "reasoning_effort": "max"
    }
  },
  {
    "low": {
      "reasoning_effort": "low"
    },
    "medium": {
      "reasoning_effort": "medium"
    },
    "high": {
      "reasoning_effort": "high"
    },
    "xhigh": {
      "reasoning_effort": "xhigh"
    },
    "max": {
      "reasoning_effort": "max"
    }
  },
  {
    "low": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "low"
    },
    "high": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "high"
    },
    "max": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "max"
    }
  },
  {
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "minimal": {
      "reasoning": {
        "effort": "minimal"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "minimal": {
      "reasoning": {
        "effort": "minimal"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "minimal": {
      "reasoning": {
        "effort": "minimal"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "minimal": {
      "reasoning": {
        "effort": "minimal"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "minimal": {
      "reasoning": {
        "effort": "minimal"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    }
  },
  {
    "high": {
      "reasoning": {
        "effort": "high"
      }
    }
  },
  {
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    }
  },
  {
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "minimal": {
      "reasoning": {
        "effort": "minimal"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "effort": "none"
      }
    },
    "minimal": {
      "reasoning": {
        "effort": "minimal"
      }
    },
    "low": {
      "reasoning": {
        "effort": "low"
      }
    },
    "medium": {
      "reasoning": {
        "effort": "medium"
      }
    },
    "high": {
      "reasoning": {
        "effort": "high"
      }
    },
    "xhigh": {
      "reasoning": {
        "effort": "xhigh"
      }
    },
    "max": {
      "reasoning": {
        "effort": "max"
      }
    }
  },
  {
    "off": {
      "enable_thinking": false
    },
    "minimal": {
      "enable_thinking": true
    },
    "low": {
      "enable_thinking": true
    },
    "medium": {
      "enable_thinking": true
    },
    "high": {
      "enable_thinking": true
    }
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
    "off": {
      "enable_thinking": false
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
    "off": {
      "reasoning": {
        "enabled": false
      }
    },
    "high": {
      "reasoning": {
        "enabled": true
      }
    }
  },
  {
    "off": {
      "reasoning": {
        "enabled": false
      }
    },
    "high": {
      "reasoning_effort": "high",
      "reasoning": {
        "enabled": true
      }
    }
  },
  {
    "high": {
      "reasoning": {
        "enabled": true
      }
    }
  },
  {
    "off": {
      "thinking": {
        "type": "disabled"
      }
    },
    "minimal": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "minimal"
    },
    "low": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "low"
    },
    "medium": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "medium"
    },
    "high": {
      "thinking": {
        "type": "enabled"
      },
      "reasoning_effort": "high"
    }
  },
  {
    "off": {
      "thinking": {
        "type": "disabled"
      }
    },
    "minimal": {
      "thinking": {
        "type": "enabled",
        "clear_thinking": false
      }
    },
    "low": {
      "thinking": {
        "type": "enabled",
        "clear_thinking": false
      }
    },
    "medium": {
      "thinking": {
        "type": "enabled",
        "clear_thinking": false
      }
    },
    "high": {
      "thinking": {
        "type": "enabled",
        "clear_thinking": false
      }
    }
  },
  {
    "off": {
      "thinking": {
        "type": "disabled"
      }
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
export const omniReasoningModels: ReadonlyArray<readonly [string, string, string, number]> = [
  ["ant-ling","Ring-2.6-1T","openai-completions",0],
  ["azure","deepseek-v4-pro","openai-completions",1],
  ["baseten","deepseek-ai/DeepSeek-V4-Flash-0731","openai-completions",2],
  ["baseten","deepseek-ai/DeepSeek-V4-Pro","openai-completions",2],
  ["baseten","deepseek-ai/DeepSeek-V4-Pro-0813","openai-completions",3],
  ["baseten","deepseek-ai/DeepSeek-V4.1-Flash","openai-completions",3],
  ["baseten","deepseek-ai/DeepSeek-V4.1-Flash-Fast","openai-completions",3],
  ["baseten","moonshotai/Kimi-K2.5","openai-completions",4],
  ["baseten","moonshotai/Kimi-K2.6","openai-completions",4],
  ["baseten","moonshotai/Kimi-K2.7-Code","openai-completions",4],
  ["baseten","moonshotai/Kimi-K3","openai-completions",3],
  ["baseten","nvidia/Nemotron-120B-A12B","openai-completions",4],
  ["baseten","nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B","openai-completions",4],
  ["baseten","openai/gpt-oss-120b","openai-completions",2],
  ["baseten","thinkingmachines/inkling","openai-completions",2],
  ["baseten","thinkingmachines/inkling-small","openai-completions",2],
  ["baseten","zai-org/GLM-4.7","openai-completions",4],
  ["baseten","zai-org/GLM-5","openai-completions",4],
  ["baseten","zai-org/GLM-5.1","openai-completions",4],
  ["baseten","zai-org/GLM-5.2","openai-completions",5],
  ["baseten","zai-org/GLM-5.2-Fast","openai-completions",5],
  ["baseten","zai-org/GLM-5.3","openai-completions",6],
  ["baseten","zai-org/GLM-5.3-Fast","openai-completions",3],
  ["baseten","zai-org/GLM-5.3-Flash","openai-completions",6],
  ["cerebras","gpt-oss-120b","openai-completions",1],
  ["cerebras","qwen-3.8-27b","openai-completions",7],
  ["cloudflare-ai-gateway","workers-ai/@cf/deepseek-ai/deepseek-v4-flash-0731","openai-completions",8],
  ["cloudflare-ai-gateway","workers-ai/@cf/deepseek-ai/deepseek-v4-pro-0813","openai-completions",8],
  ["cloudflare-workers-ai","@cf/deepseek-ai/deepseek-v4-flash-0731","openai-completions",9],
  ["cloudflare-workers-ai","@cf/deepseek-ai/deepseek-v4-pro-0813","openai-completions",9],
  ["cloudflare-workers-ai","@cf/google/gemma-4-26b-a4b-it","openai-completions",10],
  ["cloudflare-workers-ai","@cf/moonshotai/kimi-k2.6","openai-completions",10],
  ["cloudflare-workers-ai","@cf/moonshotai/kimi-k2.7-code","openai-completions",11],
  ["cloudflare-workers-ai","@cf/nvidia/nemotron-3-120b-a12b","openai-completions",1],
  ["cloudflare-workers-ai","@cf/openai/gpt-oss-120b","openai-completions",1],
  ["cloudflare-workers-ai","@cf/openai/gpt-oss-20b","openai-completions",1],
  ["cloudflare-workers-ai","@cf/qwen/qwen3-30b-a3b-fp8","openai-completions",11],
  ["cloudflare-workers-ai","@cf/qwen/qwen3.8-27b","openai-completions",12],
  ["cloudflare-workers-ai","@cf/zai-org/glm-4.7-flash","openai-completions",11],
  ["cloudflare-workers-ai","@cf/zai-org/glm-5.2","openai-completions",13],
  ["cloudflare-workers-ai","@cf/zai-org/glm-5.3","openai-completions",6],
  ["cloudflare-workers-ai","@cf/zai-org/glm-5.3-flash","openai-completions",6],
  ["deepseek","deepseek-flash","openai-completions",14],
  ["deepseek","deepseek-v4-pro","openai-completions",9],
  ["fireworks","accounts/fireworks/models/glm-5p3","openai-completions",6],
  ["fireworks","accounts/fireworks/models/glm-5p3-flash","openai-completions",6],
  ["fireworks","accounts/fireworks/models/kimi-k3","openai-completions",6],
  ["fireworks","accounts/fireworks/routers/glm-5p3-fast","openai-completions",6],
  ["fireworks","accounts/fireworks/routers/glm-fast-latest","openai-completions",6],
  ["fireworks","accounts/fireworks/routers/glm-flash-latest","openai-completions",6],
  ["fireworks","accounts/fireworks/routers/glm-latest","openai-completions",6],
  ["fireworks","accounts/fireworks/routers/kimi-k3-fast","openai-completions",6],
  ["google","deep-research-max-preview-04-2026","google-generative-ai",15],
  ["google","deep-research-preview-04-2026","google-generative-ai",15],
  ["google","gemini-2.5-computer-use-preview-10-2025","google-generative-ai",15],
  ["google","gemini-2.5-flash","google-generative-ai",16],
  ["google","gemini-2.5-flash-lite","google-generative-ai",17],
  ["google","gemini-2.5-pro","google-generative-ai",18],
  ["google","gemini-3-flash-preview","google-generative-ai",19],
  ["google","gemini-3.1-flash-lite","google-generative-ai",19],
  ["google","gemini-3.1-flash-lite-image","google-generative-ai",20],
  ["google","gemini-3.1-flash-lite-preview","google-generative-ai",19],
  ["google","gemini-3.1-flash-live-preview","google-generative-ai",19],
  ["google","gemini-3.1-pro-preview","google-generative-ai",21],
  ["google","gemini-3.1-pro-preview-customtools","google-generative-ai",21],
  ["google","gemini-3.5-flash","google-generative-ai",19],
  ["google","gemini-3.5-flash-lite","google-generative-ai",19],
  ["google","gemini-3.6-flash","google-generative-ai",19],
  ["google","gemini-3.7-flash","google-generative-ai",21],
  ["google","gemini-3.8-flash","google-generative-ai",21],
  ["google","gemini-flash-latest","google-generative-ai",19],
  ["google","gemini-flash-lite-latest","google-generative-ai",19],
  ["google","gemma-4-26b-a4b-it","google-generative-ai",22],
  ["google","gemma-4-31b-it","google-generative-ai",22],
  ["groq","openai/gpt-oss-120b","openai-completions",1],
  ["groq","openai/gpt-oss-20b","openai-completions",1],
  ["groq","openai/gpt-oss-safeguard-20b","openai-completions",1],
  ["groq","qwen/qwen3.6-27b","openai-completions",23],
  ["groq","qwen/qwen3.8-27b","openai-completions",7],
  ["huggingface","deepseek-ai/DeepSeek-R1","openai-completions",11],
  ["huggingface","deepseek-ai/DeepSeek-R1-0528","openai-completions",11],
  ["huggingface","deepseek-ai/DeepSeek-V3.1","openai-completions",11],
  ["huggingface","deepseek-ai/DeepSeek-V3.2","openai-completions",11],
  ["huggingface","deepseek-ai/DeepSeek-V4-Flash","openai-completions",11],
  ["huggingface","deepseek-ai/DeepSeek-V4-Flash-0731","openai-completions",24],
  ["huggingface","deepseek-ai/DeepSeek-V4-Flash-Vision-Exp","openai-completions",6],
  ["huggingface","deepseek-ai/DeepSeek-V4-Pro","openai-completions",25],
  ["huggingface","deepseek-ai/DeepSeek-V4-Pro-0813","openai-completions",6],
  ["huggingface","deepseek-ai/DeepSeek-V4.1-Flash","openai-completions",26],
  ["huggingface","google/gemma-4-26B-A4B-it","openai-completions",11],
  ["huggingface","google/gemma-4-31B-it","openai-completions",11],
  ["huggingface","MiniMaxAI/MiniMax-M2","openai-completions",11],
  ["huggingface","MiniMaxAI/MiniMax-M2.1","openai-completions",11],
  ["huggingface","MiniMaxAI/MiniMax-M2.5","openai-completions",11],
  ["huggingface","MiniMaxAI/MiniMax-M2.7","openai-completions",11],
  ["huggingface","MiniMaxAI/MiniMax-M3","openai-completions",11],
  ["huggingface","moonshotai/Kimi-K2-Thinking","openai-completions",11],
  ["huggingface","moonshotai/Kimi-K2.5","openai-completions",11],
  ["huggingface","moonshotai/Kimi-K2.6","openai-completions",11],
  ["huggingface","moonshotai/Kimi-K2.7-Code","openai-completions",11],
  ["huggingface","moonshotai/Kimi-K3","openai-completions",6],
  ["huggingface","openai/gpt-oss-120b","openai-completions",1],
  ["huggingface","openai/gpt-oss-20b","openai-completions",1],
  ["huggingface","Qwen/Qwen3-235B-A22B","openai-completions",11],
  ["huggingface","Qwen/Qwen3-235B-A22B-Thinking-2507","openai-completions",11],
  ["huggingface","Qwen/Qwen3-30B-A3B","openai-completions",11],
  ["huggingface","Qwen/Qwen3-32B","openai-completions",11],
  ["huggingface","Qwen/Qwen3-VL-235B-A22B-Thinking","openai-completions",1],
  ["huggingface","Qwen/Qwen3.5-122B-A10B","openai-completions",11],
  ["huggingface","Qwen/Qwen3.5-27B","openai-completions",11],
  ["huggingface","Qwen/Qwen3.5-35B-A3B","openai-completions",11],
  ["huggingface","Qwen/Qwen3.5-397B-A17B","openai-completions",7],
  ["huggingface","Qwen/Qwen3.5-9B","openai-completions",11],
  ["huggingface","Qwen/Qwen3.6-27B","openai-completions",11],
  ["huggingface","Qwen/Qwen3.6-35B-A3B","openai-completions",11],
  ["huggingface","Qwen/Qwen3.8-2.4T-A95B","openai-completions",12],
  ["huggingface","Qwen/Qwen3.8-27B","openai-completions",12],
  ["huggingface","stepfun-ai/Step-3.5-Flash","openai-completions",11],
  ["huggingface","stepfun-ai/Step-3.7-Flash","openai-completions",1],
  ["huggingface","tencent/Hy3","openai-completions",27],
  ["huggingface","tencent/Hy4-preview","openai-completions",10],
  ["huggingface","thinkingmachines/Inkling","openai-completions",1],
  ["huggingface","thinkingmachines/Inkling-Small","openai-completions",11],
  ["huggingface","XiaomiMiMo/MiMo-V2-Flash","openai-completions",11],
  ["huggingface","XiaomiMiMo/MiMo-V2.5","openai-completions",28],
  ["huggingface","XiaomiMiMo/MiMo-V2.5-Pro","openai-completions",28],
  ["huggingface","zai-org/GLM-4.5","openai-completions",11],
  ["huggingface","zai-org/GLM-4.5-Air","openai-completions",11],
  ["huggingface","zai-org/GLM-4.5V","openai-completions",11],
  ["huggingface","zai-org/GLM-4.6","openai-completions",11],
  ["huggingface","zai-org/GLM-4.6V-Flash","openai-completions",11],
  ["huggingface","zai-org/GLM-4.7","openai-completions",11],
  ["huggingface","zai-org/GLM-4.7-Flash","openai-completions",11],
  ["huggingface","zai-org/GLM-5","openai-completions",11],
  ["huggingface","zai-org/GLM-5.1","openai-completions",11],
  ["huggingface","zai-org/GLM-5.2","openai-completions",11],
  ["huggingface","zai-org/GLM-5.3","openai-completions",6],
  ["huggingface","zai-org/GLM-5.3-Flash","openai-completions",6],
  ["moonshotai","kimi-k2.6","openai-completions",29],
  ["moonshotai","kimi-k2.7-code","openai-completions",30],
  ["moonshotai","kimi-k2.7-code-highspeed","openai-completions",30],
  ["moonshotai","kimi-k3","openai-completions",6],
  ["moonshotai-cn","kimi-k2.6","openai-completions",29],
  ["moonshotai-cn","kimi-k2.7-code","openai-completions",30],
  ["moonshotai-cn","kimi-k2.7-code-highspeed","openai-completions",30],
  ["moonshotai-cn","kimi-k3","openai-completions",6],
  ["nvidia","deepseek-ai/deepseek-v4.1-flash","openai-completions",8],
  ["opencode","gemini-3-flash","google-generative-ai",19],
  ["opencode","gemini-3.1-pro","google-generative-ai",21],
  ["opencode","gemini-3.5-flash","google-generative-ai",19],
  ["opencode","gemini-3.5-flash-lite","google-generative-ai",19],
  ["opencode","gemini-3.6-flash","google-generative-ai",19],
  ["opencode","gemini-3.7-flash","google-generative-ai",21],
  ["opencode","gemini-3.8-flash","google-generative-ai",21],
  ["opencode","big-pickle","openai-completions",11],
  ["opencode","deepseek-v4-flash","openai-completions",6],
  ["opencode","deepseek-v4-flash-vision-exp","openai-completions",6],
  ["opencode","deepseek-v4-pro","openai-completions",24],
  ["opencode","deepseek-v4.1-flash","openai-completions",6],
  ["opencode","exo-free","openai-completions",25],
  ["opencode","fledge-alpha-free","openai-completions",6],
  ["opencode","glm-5","openai-completions",11],
  ["opencode","glm-5.1","openai-completions",11],
  ["opencode","glm-5.2","openai-completions",24],
  ["opencode","glm-5.3","openai-completions",6],
  ["opencode","glm-5.3-flash","openai-completions",6],
  ["opencode","kimi-k2.5","openai-completions",11],
  ["opencode","kimi-k2.6","openai-completions",29],
  ["opencode","kimi-k2.7-code","openai-completions",11],
  ["opencode","kimi-k3","openai-completions",31],
  ["opencode","ling-3.0-flash-fin-free","openai-completions",11],
  ["opencode","ling-3.1-flash-free","openai-completions",11],
  ["opencode","longcat-2.5-preview-free","openai-completions",11],
  ["opencode","mimo-v2.6-flash-free","openai-completions",11],
  ["opencode","minimax-m2.5","openai-completions",11],
  ["opencode","minimax-m2.7","openai-completions",11],
  ["opencode","minimax-m3","openai-completions",11],
  ["opencode","mistral-large-4","openai-completions",10],
  ["opencode","nemotron-3-ultra-free","openai-completions",11],
  ["opencode","nemotron-3.5-lightning-free","openai-completions",11],
  ["opencode","qwen3.8-max","openai-completions",11],
  ["opencode","space-bunny-free","openai-completions",32],
  ["opencode-go","deepseek-v4-flash","openai-completions",14],
  ["opencode-go","deepseek-v4-flash-vision-exp","openai-completions",14],
  ["opencode-go","deepseek-v4-pro","openai-completions",9],
  ["opencode-go","deepseek-v4.1-flash","openai-completions",33],
  ["opencode-go","glm-5.2","openai-completions",24],
  ["opencode-go","glm-5.3","openai-completions",6],
  ["opencode-go","glm-5.3-flash","openai-completions",6],
  ["opencode-go","hy3","openai-completions",27],
  ["opencode-go","hy4-preview","openai-completions",10],
  ["opencode-go","kimi-k2.7-code","openai-completions",11],
  ["opencode-go","kimi-k3","openai-completions",31],
  ["opencode-go","longcat-2.0","openai-completions",11],
  ["opencode-go","longcat-2.5-preview-free","openai-completions",11],
  ["opencode-go","mimo-v2.5","openai-completions",11],
  ["opencode-go","mimo-v2.5-pro","openai-completions",11],
  ["opencode-go","mimo-v2.6-flash","openai-completions",11],
  ["opencode-go","mimo-v2.6-pro","openai-completions",11],
  ["opencode-go","minimax-m2.7","openai-completions",11],
  ["opencode-go","space-bunny","openai-completions",32],
  ["openrouter","~anthropic/claude-fable-latest","openai-completions",34],
  ["openrouter","~anthropic/claude-haiku-latest","openai-completions",35],
  ["openrouter","~anthropic/claude-opus-latest","openai-completions",34],
  ["openrouter","~anthropic/claude-sonnet-latest","openai-completions",34],
  ["openrouter","~deepseek/deepseek-flash-latest","openai-completions",36],
  ["openrouter","~deepseek/deepseek-pro-latest","openai-completions",36],
  ["openrouter","~deepseek/deepseek-v4-flash-latest","openai-completions",36],
  ["openrouter","~google/gemini-flash-latest","openai-completions",37],
  ["openrouter","~google/gemini-pro-latest","openai-completions",37],
  ["openrouter","~moonshotai/kimi-latest","openai-completions",36],
  ["openrouter","~openai/gpt-astra-latest","openai-completions",34],
  ["openrouter","~openai/gpt-luna-latest","openai-completions",35],
  ["openrouter","~openai/gpt-mini-latest","openai-completions",38],
  ["openrouter","~openai/gpt-sol-latest","openai-completions",34],
  ["openrouter","~openai/gpt-terra-latest","openai-completions",35],
  ["openrouter","~x-ai/grok-latest","openai-completions",39],
  ["openrouter","~z-ai/glm-flash-latest","openai-completions",40],
  ["openrouter","~z-ai/glm-latest","openai-completions",40],
  ["openrouter","aion-labs/aion-2.0","openai-completions",41],
  ["openrouter","aion-labs/aion-3.0","openai-completions",41],
  ["openrouter","aion-labs/aion-3.0-mini","openai-completions",41],
  ["openrouter","aion-labs/aion-3.5","openai-completions",40],
  ["openrouter","aion-labs/aion-3.5-mini","openai-completions",40],
  ["openrouter","amazon/nova-2-lite-v1","openai-completions",42],
  ["openrouter","anthropic/claude-fable-5:batch","openai-completions",34],
  ["openrouter","anthropic/claude-fable-5.1:batch","openai-completions",34],
  ["openrouter","anthropic/claude-haiku-4.5:batch","openai-completions",42],
  ["openrouter","anthropic/claude-haiku-5.5:batch","openai-completions",35],
  ["openrouter","anthropic/claude-opus-4.1:batch","openai-completions",42],
  ["openrouter","anthropic/claude-opus-4.5:batch","openai-completions",42],
  ["openrouter","anthropic/claude-opus-4.6:batch","openai-completions",43],
  ["openrouter","anthropic/claude-opus-4.7:batch","openai-completions",35],
  ["openrouter","anthropic/claude-opus-4.8:batch","openai-completions",35],
  ["openrouter","anthropic/claude-opus-5:batch","openai-completions",35],
  ["openrouter","anthropic/claude-opus-5.5:batch","openai-completions",34],
  ["openrouter","anthropic/claude-sonnet-4.5:batch","openai-completions",42],
  ["openrouter","anthropic/claude-sonnet-4.6:batch","openai-completions",43],
  ["openrouter","anthropic/claude-sonnet-5:batch","openai-completions",35],
  ["openrouter","anthropic/claude-sonnet-5.5:batch","openai-completions",34],
  ["openrouter","apodex/apodex-1.1-mini:free","openai-completions",42],
  ["openrouter","arcee-ai/trinity-large-thinking","openai-completions",41],
  ["openrouter","auto","openai-completions",42],
  ["openrouter","bytedance-seed/seed-1.6","openai-completions",42],
  ["openrouter","bytedance-seed/seed-1.6-flash","openai-completions",42],
  ["openrouter","bytedance-seed/seed-2-1-turbo","openai-completions",42],
  ["openrouter","bytedance-seed/seed-2.0-code","openai-completions",44],
  ["openrouter","bytedance-seed/seed-2.0-lite","openai-completions",42],
  ["openrouter","bytedance-seed/seed-2.0-mini","openai-completions",42],
  ["openrouter","cohere/command-a-plus","openai-completions",42],
  ["openrouter","cohere/north-mini-code:free","openai-completions",42],
  ["openrouter","deepseek/deepseek-chat-v3.1","openai-completions",42],
  ["openrouter","deepseek/deepseek-r1","openai-completions",41],
  ["openrouter","deepseek/deepseek-r1-0528","openai-completions",41],
  ["openrouter","deepseek/deepseek-v3.1-terminus","openai-completions",42],
  ["openrouter","deepseek/deepseek-v3.2","openai-completions",42],
  ["openrouter","deepseek/deepseek-v3.2-exp","openai-completions",42],
  ["openrouter","deepseek/deepseek-v4-flash","openai-completions",45],
  ["openrouter","deepseek/deepseek-v4-flash-0731","openai-completions",36],
  ["openrouter","deepseek/deepseek-v4-flash-vision-exp","openai-completions",36],
  ["openrouter","deepseek/deepseek-v4-pro","openai-completions",45],
  ["openrouter","deepseek/deepseek-v4-pro-0813","openai-completions",36],
  ["openrouter","deepseek/deepseek-v4.1-flash","openai-completions",36],
  ["openrouter","deepseek/deepseek-v4.1-flash:batch","openai-completions",36],
  ["openrouter","dots-studio/dots-3-note-preview:free","openai-completions",42],
  ["openrouter","fireworks/ember-1","openai-completions",36],
  ["openrouter","google/gemini-2.5-flash","openai-completions",42],
  ["openrouter","google/gemini-2.5-flash-lite","openai-completions",42],
  ["openrouter","google/gemini-2.5-flash-lite:batch","openai-completions",42],
  ["openrouter","google/gemini-2.5-flash:batch","openai-completions",42],
  ["openrouter","google/gemini-2.5-pro","openai-completions",41],
  ["openrouter","google/gemini-2.5-pro-preview","openai-completions",41],
  ["openrouter","google/gemini-2.5-pro:batch","openai-completions",41],
  ["openrouter","google/gemini-3-flash-preview","openai-completions",42],
  ["openrouter","google/gemini-3-flash-preview:batch","openai-completions",42],
  ["openrouter","google/gemini-3-pro-image","openai-completions",41],
  ["openrouter","google/gemini-3.1-flash-lite","openai-completions",42],
  ["openrouter","google/gemini-3.1-flash-lite-preview","openai-completions",42],
  ["openrouter","google/gemini-3.1-flash-lite:batch","openai-completions",42],
  ["openrouter","google/gemini-3.1-pro-preview","openai-completions",37],
  ["openrouter","google/gemini-3.1-pro-preview-customtools","openai-completions",37],
  ["openrouter","google/gemini-3.1-pro-preview:batch","openai-completions",37],
  ["openrouter","google/gemini-3.5-flash","openai-completions",41],
  ["openrouter","google/gemini-3.5-flash-lite","openai-completions",41],
  ["openrouter","google/gemini-3.5-flash-lite:batch","openai-completions",41],
  ["openrouter","google/gemini-3.5-flash:batch","openai-completions",41],
  ["openrouter","google/gemini-3.6-flash","openai-completions",41],
  ["openrouter","google/gemini-3.6-flash:batch","openai-completions",41],
  ["openrouter","google/gemini-3.7-flash","openai-completions",37],
  ["openrouter","google/gemini-3.7-flash:batch","openai-completions",37],
  ["openrouter","google/gemini-3.8-flash","openai-completions",37],
  ["openrouter","google/gemini-3.8-flash:batch","openai-completions",37],
  ["openrouter","google/gemini-nano-banana-2.1","openai-completions",46],
  ["openrouter","google/gemma-4-26b-a4b-it","openai-completions",42],
  ["openrouter","google/gemma-4-26b-a4b-it:free","openai-completions",42],
  ["openrouter","google/gemma-4-31b-it","openai-completions",42],
  ["openrouter","google/gemma-4-31b-it:free","openai-completions",42],
  ["openrouter","ibm-granite/granite-4.2-8b","openai-completions",47],
  ["openrouter","inception/mercury-2","openai-completions",37],
  ["openrouter","inception/mercury-2.5","openai-completions",37],
  ["openrouter","inclusionai/ling-3.0-flash","openai-completions",42],
  ["openrouter","inclusionai/ling-3.0-flash-fin","openai-completions",42],
  ["openrouter","inclusionai/ling-3.0-flash-sante:free","openai-completions",42],
  ["openrouter","inclusionai/ling-3.0-flash-vl","openai-completions",42],
  ["openrouter","inclusionai/ling-3.1-flash","openai-completions",42],
  ["openrouter","liquid/lfm-2.5-2.6b:free","openai-completions",41],
  ["openrouter","meituan/longcat-2.0","openai-completions",42],
  ["openrouter","meta/muse-glimmer-30b","openai-completions",39],
  ["openrouter","meta/muse-spark-1.1","openai-completions",48],
  ["openrouter","meta/muse-spark-1.2","openai-completions",48],
  ["openrouter","meta/muse-spark-1.2-contributor","openai-completions",48],
  ["openrouter","meta/muse-spark-1.3","openai-completions",49],
  ["openrouter","meta/muse-spark-1.3-contributor","openai-completions",49],
  ["openrouter","minimax/minimax-m1","openai-completions",42],
  ["openrouter","minimax/minimax-m2","openai-completions",41],
  ["openrouter","minimax/minimax-m2.1","openai-completions",41],
  ["openrouter","minimax/minimax-m2.5","openai-completions",41],
  ["openrouter","minimax/minimax-m2.7","openai-completions",41],
  ["openrouter","minimax/minimax-m3","openai-completions",42],
  ["openrouter","mistralai/mistral-large-4-0","openai-completions",50],
  ["openrouter","mistralai/mistral-medium-3-5","openai-completions",50],
  ["openrouter","mistralai/mistral-medium-3-5:batch","openai-completions",50],
  ["openrouter","mistralai/mistral-small-2603","openai-completions",50],
  ["openrouter","mistralai/mistral-small-2603:batch","openai-completions",50],
  ["openrouter","moonshotai/kimi-k2-thinking","openai-completions",41],
  ["openrouter","moonshotai/kimi-k2.5","openai-completions",42],
  ["openrouter","moonshotai/kimi-k2.6","openai-completions",42],
  ["openrouter","moonshotai/kimi-k2.7-code","openai-completions",41],
  ["openrouter","moonshotai/kimi-k3","openai-completions",36],
  ["openrouter","moonshotai/kimi-k3:batch","openai-completions",36],
  ["openrouter","nex-agi/nex-n2.5-pro","openai-completions",51],
  ["openrouter","nvidia/nemotron-3-nano-30b-a3b","openai-completions",42],
  ["openrouter","nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free","openai-completions",42],
  ["openrouter","nvidia/nemotron-3-super-120b-a12b","openai-completions",52],
  ["openrouter","nvidia/nemotron-3-super-120b-a12b:free","openai-completions",52],
  ["openrouter","nvidia/nemotron-3-ultra-550b-a55b","openai-completions",51],
  ["openrouter","nvidia/nemotron-3-ultra-550b-a55b:free","openai-completions",51],
  ["openrouter","nvidia/nemotron-3.5-lightning","openai-completions",42],
  ["openrouter","nvidia/nemotron-3.5-lightning:free","openai-completions",42],
  ["openrouter","openai/gpt-5","openai-completions",41],
  ["openrouter","openai/gpt-5-mini","openai-completions",41],
  ["openrouter","openai/gpt-5-mini:batch","openai-completions",41],
  ["openrouter","openai/gpt-5-nano","openai-completions",41],
  ["openrouter","openai/gpt-5-nano:batch","openai-completions",41],
  ["openrouter","openai/gpt-5-pro","openai-completions",53],
  ["openrouter","openai/gpt-5-pro:batch","openai-completions",53],
  ["openrouter","openai/gpt-5:batch","openai-completions",41],
  ["openrouter","openai/gpt-5.1","openai-completions",44],
  ["openrouter","openai/gpt-5.1-codex","openai-completions",37],
  ["openrouter","openai/gpt-5.1-codex-max","openai-completions",39],
  ["openrouter","openai/gpt-5.1-codex-mini","openai-completions",44],
  ["openrouter","openai/gpt-5.1:batch","openai-completions",44],
  ["openrouter","openai/gpt-5.2","openai-completions",38],
  ["openrouter","openai/gpt-5.2-codex","openai-completions",39],
  ["openrouter","openai/gpt-5.2-pro","openai-completions",54],
  ["openrouter","openai/gpt-5.2-pro:batch","openai-completions",54],
  ["openrouter","openai/gpt-5.2:batch","openai-completions",38],
  ["openrouter","openai/gpt-5.3-codex","openai-completions",38],
  ["openrouter","openai/gpt-5.4","openai-completions",38],
  ["openrouter","openai/gpt-5.4-mini","openai-completions",38],
  ["openrouter","openai/gpt-5.4-mini:batch","openai-completions",38],
  ["openrouter","openai/gpt-5.4-nano","openai-completions",38],
  ["openrouter","openai/gpt-5.4-nano:batch","openai-completions",38],
  ["openrouter","openai/gpt-5.4-pro","openai-completions",54],
  ["openrouter","openai/gpt-5.4-pro:batch","openai-completions",54],
  ["openrouter","openai/gpt-5.4:batch","openai-completions",38],
  ["openrouter","openai/gpt-5.5","openai-completions",38],
  ["openrouter","openai/gpt-5.5-pro","openai-completions",54],
  ["openrouter","openai/gpt-5.5-pro:batch","openai-completions",54],
  ["openrouter","openai/gpt-5.5:batch","openai-completions",38],
  ["openrouter","openai/gpt-5.6-luna","openai-completions",35],
  ["openrouter","openai/gpt-5.6-luna-pro","openai-completions",35],
  ["openrouter","openai/gpt-5.6-luna-pro:batch","openai-completions",35],
  ["openrouter","openai/gpt-5.6-luna:batch","openai-completions",35],
  ["openrouter","openai/gpt-5.6-sol","openai-completions",35],
  ["openrouter","openai/gpt-5.6-sol-pro","openai-completions",35],
  ["openrouter","openai/gpt-5.6-sol-pro:batch","openai-completions",35],
  ["openrouter","openai/gpt-5.6-sol:batch","openai-completions",35],
  ["openrouter","openai/gpt-5.6-terra","openai-completions",35],
  ["openrouter","openai/gpt-5.6-terra-pro","openai-completions",35],
  ["openrouter","openai/gpt-5.6-terra-pro:batch","openai-completions",35],
  ["openrouter","openai/gpt-5.6-terra:batch","openai-completions",35],
  ["openrouter","openai/gpt-6-astra","openai-completions",34],
  ["openrouter","openai/gpt-6-astra-pro","openai-completions",34],
  ["openrouter","openai/gpt-6-astra-pro:batch","openai-completions",34],
  ["openrouter","openai/gpt-6-astra:batch","openai-completions",34],
  ["openrouter","openai/gpt-6-luna","openai-completions",35],
  ["openrouter","openai/gpt-6-luna-pro","openai-completions",35],
  ["openrouter","openai/gpt-6-luna-pro:batch","openai-completions",35],
  ["openrouter","openai/gpt-6-luna:batch","openai-completions",35],
  ["openrouter","openai/gpt-6-sol","openai-completions",35],
  ["openrouter","openai/gpt-6-sol-pro","openai-completions",35],
  ["openrouter","openai/gpt-6-sol-pro:batch","openai-completions",35],
  ["openrouter","openai/gpt-6-sol:batch","openai-completions",35],
  ["openrouter","openai/gpt-6.1-sol","openai-completions",34],
  ["openrouter","openai/gpt-6.1-sol-pro","openai-completions",34],
  ["openrouter","openai/gpt-oss-120b","openai-completions",37],
  ["openrouter","openai/gpt-oss-120b:batch","openai-completions",37],
  ["openrouter","openai/gpt-oss-20b","openai-completions",37],
  ["openrouter","openai/gpt-oss-20b:batch","openai-completions",37],
  ["openrouter","openai/gpt-oss-safeguard-20b","openai-completions",41],
  ["openrouter","openai/o1","openai-completions",42],
  ["openrouter","openai/o3","openai-completions",42],
  ["openrouter","openai/o3-mini","openai-completions",42],
  ["openrouter","openai/o3-mini-high","openai-completions",53],
  ["openrouter","openai/o3-mini:batch","openai-completions",42],
  ["openrouter","openai/o3-pro","openai-completions",42],
  ["openrouter","openai/o3:batch","openai-completions",42],
  ["openrouter","openai/o4-mini","openai-completions",42],
  ["openrouter","openai/o4-mini-high","openai-completions",53],
  ["openrouter","openai/o4-mini:batch","openai-completions",42],
  ["openrouter","openrouter/auto","openai-completions",42],
  ["openrouter","openrouter/auto-beta","openai-completions",42],
  ["openrouter","openrouter/free","openai-completions",42],
  ["openrouter","openrouter/fusion","openai-completions",42],
  ["openrouter","perceptron/perceptron-mk1.5","openai-completions",42],
  ["openrouter","poolside/laguna-s-2.1","openai-completions",42],
  ["openrouter","poolside/laguna-s-2.1:free","openai-completions",42],
  ["openrouter","poolside/laguna-xs-2.1","openai-completions",42],
  ["openrouter","poolside/laguna-xs-2.1:free","openai-completions",42],
  ["openrouter","prism-ml/ternary-bonsai-2-27b","openai-completions",55],
  ["openrouter","qwen/qwen3-14b","openai-completions",42],
  ["openrouter","qwen/qwen3-235b-a22b","openai-completions",42],
  ["openrouter","qwen/qwen3-235b-a22b-thinking-2507","openai-completions",41],
  ["openrouter","qwen/qwen3-30b-a3b","openai-completions",42],
  ["openrouter","qwen/qwen3-30b-a3b-thinking-2507","openai-completions",41],
  ["openrouter","qwen/qwen3-32b","openai-completions",42],
  ["openrouter","qwen/qwen3-8b","openai-completions",42],
  ["openrouter","qwen/qwen3-max-thinking","openai-completions",42],
  ["openrouter","qwen/qwen3-next-80b-a3b-thinking","openai-completions",41],
  ["openrouter","qwen/qwen3-vl-235b-a22b-thinking","openai-completions",41],
  ["openrouter","qwen/qwen3-vl-30b-a3b-thinking","openai-completions",41],
  ["openrouter","qwen/qwen3-vl-8b-thinking","openai-completions",41],
  ["openrouter","qwen/qwen3.5-122b-a10b","openai-completions",42],
  ["openrouter","qwen/qwen3.5-27b","openai-completions",42],
  ["openrouter","qwen/qwen3.5-35b-a3b","openai-completions",42],
  ["openrouter","qwen/qwen3.5-397b-a17b","openai-completions",42],
  ["openrouter","qwen/qwen3.5-9b","openai-completions",42],
  ["openrouter","qwen/qwen3.5-flash-02-23","openai-completions",42],
  ["openrouter","qwen/qwen3.5-plus-02-15","openai-completions",42],
  ["openrouter","qwen/qwen3.5-plus-20260420","openai-completions",42],
  ["openrouter","qwen/qwen3.6-27b","openai-completions",42],
  ["openrouter","qwen/qwen3.6-35b-a3b","openai-completions",42],
  ["openrouter","qwen/qwen3.6-flash","openai-completions",42],
  ["openrouter","qwen/qwen3.6-max-preview","openai-completions",42],
  ["openrouter","qwen/qwen3.6-plus","openai-completions",42],
  ["openrouter","qwen/qwen3.7-flash","openai-completions",42],
  ["openrouter","qwen/qwen3.7-max","openai-completions",42],
  ["openrouter","qwen/qwen3.7-plus","openai-completions",42],
  ["openrouter","qwen/qwen3.8-2.4t-a95b","openai-completions",56],
  ["openrouter","qwen/qwen3.8-27b","openai-completions",57],
  ["openrouter","qwen/qwen3.8-flash","openai-completions",42],
  ["openrouter","qwen/qwen3.8-max-0902","openai-completions",48],
  ["openrouter","qwen/qwen3.8-max-prime","openai-completions",48],
  ["openrouter","qwen/qwen3.8-omni-flash","openai-completions",42],
  ["openrouter","sakana/fugu-max","openai-completions",58],
  ["openrouter","sakana/fugu-ultra","openai-completions",58],
  ["openrouter","sakana/fugu-ultra-v2","openai-completions",58],
  ["openrouter","sakana/sakana-namazu","openai-completions",50],
  ["openrouter","stepfun/step-3.5-flash","openai-completions",41],
  ["openrouter","stepfun/step-3.7-flash","openai-completions",37],
  ["openrouter","tencent/hy3","openai-completions",47],
  ["openrouter","tencent/hy3-preview","openai-completions",47],
  ["openrouter","tencent/hy4-preview","openai-completions",47],
  ["openrouter","thinkingmachines/inkling","openai-completions",59],
  ["openrouter","thinkingmachines/inkling-small","openai-completions",59],
  ["openrouter","thinkingmachines/inkling-small:free","openai-completions",59],
  ["openrouter","thinkingmachines/inkling:free","openai-completions",59],
  ["openrouter","typesafe/jev-router","openai-completions",42],
  ["openrouter","upstage/solar-mini4","openai-completions",60],
  ["openrouter","upstage/solar-pro-3","openai-completions",42],
  ["openrouter","upstage/solar-pro4","openai-completions",60],
  ["openrouter","x-ai/grok-4.20","openai-completions",42],
  ["openrouter","x-ai/grok-4.3","openai-completions",44],
  ["openrouter","x-ai/grok-4.3:batch","openai-completions",44],
  ["openrouter","x-ai/grok-4.5","openai-completions",37],
  ["openrouter","x-ai/grok-4.6","openai-completions",39],
  ["openrouter","x-ai/grok-4.7","openai-completions",39],
  ["openrouter","x-ai/grok-build-0.1","openai-completions",41],
  ["openrouter","xiaomi/mimo-v2.5","openai-completions",42],
  ["openrouter","xiaomi/mimo-v2.5-pro","openai-completions",42],
  ["openrouter","xiaomi/mimo-v2.6-flash","openai-completions",42],
  ["openrouter","xiaomi/mimo-v2.6-pro","openai-completions",42],
  ["openrouter","xiaomi/mimo-v2.6-pro-ultraspeed","openai-completions",42],
  ["openrouter","z-ai/glm-4.5","openai-completions",42],
  ["openrouter","z-ai/glm-4.5-air","openai-completions",42],
  ["openrouter","z-ai/glm-4.5v","openai-completions",42],
  ["openrouter","z-ai/glm-4.6","openai-completions",42],
  ["openrouter","z-ai/glm-4.6v","openai-completions",42],
  ["openrouter","z-ai/glm-4.7","openai-completions",42],
  ["openrouter","z-ai/glm-4.7-flash","openai-completions",42],
  ["openrouter","z-ai/glm-5","openai-completions",42],
  ["openrouter","z-ai/glm-5-turbo","openai-completions",42],
  ["openrouter","z-ai/glm-5.1","openai-completions",42],
  ["openrouter","z-ai/glm-5.2","openai-completions",45],
  ["openrouter","z-ai/glm-5.3","openai-completions",40],
  ["openrouter","z-ai/glm-5.3-flash","openai-completions",40],
  ["openrouter","z-ai/glm-5.3-flash:batch","openai-completions",40],
  ["openrouter","z-ai/glm-5.3-flashx","openai-completions",40],
  ["openrouter","z-ai/glm-5.3-prime","openai-completions",40],
  ["openrouter","z-ai/glm-5.3:batch","openai-completions",40],
  ["openrouter","z-ai/glm-5v-turbo","openai-completions",42],
  ["qwen-token-plan","deepseek-v3.2","openai-completions",61],
  ["qwen-token-plan","deepseek-v4-flash","openai-completions",62],
  ["qwen-token-plan","deepseek-v4-flash-0731","openai-completions",62],
  ["qwen-token-plan","deepseek-v4-pro","openai-completions",62],
  ["qwen-token-plan","deepseek-v4-pro-0813","openai-completions",62],
  ["qwen-token-plan","deepseek-v4.1-flash","openai-completions",63],
  ["qwen-token-plan","glm-5","openai-completions",64],
  ["qwen-token-plan","glm-5.1","openai-completions",64],
  ["qwen-token-plan","glm-5.2","openai-completions",62],
  ["qwen-token-plan","glm-5.3","openai-completions",63],
  ["qwen-token-plan","kimi-k2.5","openai-completions",61],
  ["qwen-token-plan","kimi-k2.6","openai-completions",61],
  ["qwen-token-plan","kimi-k2.7-code","openai-completions",61],
  ["qwen-token-plan","MiniMax-M2.5","openai-completions",61],
  ["qwen-token-plan","qwen3.6-flash","openai-completions",61],
  ["qwen-token-plan","qwen3.6-plus","openai-completions",61],
  ["qwen-token-plan","qwen3.7-max","openai-completions",61],
  ["qwen-token-plan","qwen3.7-plus","openai-completions",61],
  ["qwen-token-plan","qwen3.8-flash","openai-completions",65],
  ["qwen-token-plan","qwen3.8-max","openai-completions",65],
  ["qwen-token-plan-cn","deepseek-v3.2","openai-completions",61],
  ["qwen-token-plan-cn","deepseek-v4-flash","openai-completions",62],
  ["qwen-token-plan-cn","deepseek-v4-flash-0731","openai-completions",62],
  ["qwen-token-plan-cn","deepseek-v4-pro","openai-completions",62],
  ["qwen-token-plan-cn","deepseek-v4-pro-0813","openai-completions",62],
  ["qwen-token-plan-cn","deepseek-v4.1-flash","openai-completions",63],
  ["qwen-token-plan-cn","glm-5","openai-completions",64],
  ["qwen-token-plan-cn","glm-5.1","openai-completions",64],
  ["qwen-token-plan-cn","glm-5.2","openai-completions",62],
  ["qwen-token-plan-cn","glm-5.3","openai-completions",63],
  ["qwen-token-plan-cn","kimi-k2.5","openai-completions",61],
  ["qwen-token-plan-cn","kimi-k2.6","openai-completions",61],
  ["qwen-token-plan-cn","kimi-k2.7-code","openai-completions",61],
  ["qwen-token-plan-cn","MiniMax-M2.5","openai-completions",61],
  ["qwen-token-plan-cn","qwen3.6-flash","openai-completions",61],
  ["qwen-token-plan-cn","qwen3.6-plus","openai-completions",61],
  ["qwen-token-plan-cn","qwen3.7-max","openai-completions",61],
  ["qwen-token-plan-cn","qwen3.7-plus","openai-completions",61],
  ["qwen-token-plan-cn","qwen3.8-flash","openai-completions",65],
  ["qwen-token-plan-cn","qwen3.8-max","openai-completions",65],
  ["qwen-token-plan-individual","deepseek-v4-flash-0731","openai-completions",62],
  ["qwen-token-plan-individual","deepseek-v4-pro","openai-completions",62],
  ["qwen-token-plan-individual","deepseek-v4-pro-0813","openai-completions",62],
  ["qwen-token-plan-individual","glm-5.2","openai-completions",62],
  ["qwen-token-plan-individual","qwen3.6-flash","openai-completions",61],
  ["qwen-token-plan-individual","qwen3.7-max","openai-completions",61],
  ["qwen-token-plan-individual","qwen3.7-plus","openai-completions",61],
  ["qwen-token-plan-individual","qwen3.8-flash","openai-completions",65],
  ["qwen-token-plan-individual","qwen3.8-max","openai-completions",65],
  ["together","deepseek-ai/DeepSeek-V4-Flash-0731","openai-completions",66],
  ["together","deepseek-ai/DeepSeek-V4-Pro-0813","openai-completions",67],
  ["together","deepseek-ai/DeepSeek-V4.1-Flash","openai-completions",66],
  ["together","MiniMaxAI/MiniMax-M2.7","openai-completions",68],
  ["together","MiniMaxAI/MiniMax-M3","openai-completions",66],
  ["together","moonshotai/Kimi-K3","openai-completions",66],
  ["together","nvidia/nemotron-3-ultra-550b-a55b","openai-completions",66],
  ["together","openai/gpt-oss-120b","openai-completions",1],
  ["together","Qwen/Qwen3.5-9B","openai-completions",66],
  ["together","Qwen/Qwen3.6-Plus","openai-completions",66],
  ["together","thinkingmachines/Inkling","openai-completions",66],
  ["together","zai-org/GLM-5.2","openai-completions",66],
  ["together","zai-org/GLM-5.3","openai-completions",66],
  ["together","zai-org/GLM-5.3-Flash","openai-completions",66],
  ["xiaomi","mimo-v2.5","openai-completions",69],
  ["xiaomi","mimo-v2.5-pro","openai-completions",69],
  ["xiaomi","mimo-v2.5-pro-ultraspeed","openai-completions",69],
  ["xiaomi","mimo-v2.6-flash","openai-completions",69],
  ["xiaomi","mimo-v2.6-pro","openai-completions",69],
  ["xiaomi","mimo-v2.6-pro-ultraspeed","openai-completions",69],
  ["xiaomi-token-plan-ams","mimo-v2.5","openai-completions",69],
  ["xiaomi-token-plan-ams","mimo-v2.5-pro","openai-completions",69],
  ["xiaomi-token-plan-ams","mimo-v2.6-flash","openai-completions",69],
  ["xiaomi-token-plan-ams","mimo-v2.6-pro","openai-completions",69],
  ["xiaomi-token-plan-cn","mimo-v2.5","openai-completions",69],
  ["xiaomi-token-plan-cn","mimo-v2.5-pro","openai-completions",69],
  ["xiaomi-token-plan-cn","mimo-v2.6-flash","openai-completions",69],
  ["xiaomi-token-plan-cn","mimo-v2.6-pro","openai-completions",69],
  ["xiaomi-token-plan-sgp","mimo-v2.5","openai-completions",69],
  ["xiaomi-token-plan-sgp","mimo-v2.5-pro","openai-completions",69],
  ["xiaomi-token-plan-sgp","mimo-v2.6-flash","openai-completions",69],
  ["xiaomi-token-plan-sgp","mimo-v2.6-pro","openai-completions",69],
  ["zai","glm-4.7","openai-completions",70],
  ["zai","glm-5-turbo","openai-completions",70],
  ["zai","glm-5.2","openai-completions",71],
  ["zai","glm-5.2-highspeed","openai-completions",71],
  ["zai","glm-5.3","openai-completions",72],
  ["zai","glm-5.3-flash","openai-completions",72],
  ["zai","glm-5.3-highspeed","openai-completions",72],
  ["zai-coding-cn","glm-4.6v","openai-completions",70],
  ["zai-coding-cn","glm-5.3","openai-completions",72],
  ["zai-coding-cn","glm-5.3-flash","openai-completions",72],
  ["zai-coding-cn","glm-5.3-highspeed","openai-completions",72]
];
