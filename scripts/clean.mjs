import { rm } from 'node:fs/promises';
// 仅清理本包生成目录，避免旧声明或旧模块进入新发布包。
await rm(new URL('../lib/', import.meta.url), { recursive: true, force: true });
