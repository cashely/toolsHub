---
layout: tool
title: Pi - 可高度定制的开源终端 AI 编程 Agent
type: tool
id: pi
name: Pi
slug: pi
description: Earendil 出品的开源终端 AI 编程 Agent，极简可定制，支持 15+ 模型供应商、树状可分享会话，以及扩展、技能、主题等包生态。
website: https://pi.dev
github: https://github.com/earendil-works/pi
categories:
  - ai/ai-agent
  - ai/ai-coding
tags:
  - agent
  - ai-coding
  - open-source
pricing:
  model: free
  priceUrl: null
platforms:
  - cli
  - macos
  - linux
  - windows
openSource: true
status: published
featured: false
developer: Earendil Inc.
language:
  - en
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

# Pi

> 极简、可完全定制的终端 AI Agent，让 harness 适配你的工作流，而不是反过来。

## 工具介绍

Pi 是 Earendil Inc. 推出的开源终端 AI Agent（agent harness）。给定目标和工作目录，它可以检视文件、运行命令、编辑内容并完成多步骤任务。Pi 自带强大的默认能力，但刻意保持精简：子 Agent、计划模式等都可通过扩展自行添加，甚至能让 Pi 当场修改自身、`/reload` 后继续使用。

## 核心功能

### 极简且可定制

通过扩展（extensions）、技能（skills）、提示模板与主题自定义行为与 TUI，并可打包成 Pi package 经 npm 或 git 分享。

### 15+ 供应商、数百种模型

支持 Anthropic、OpenAI、Google、Azure、Bedrock、Mistral、Groq、OpenRouter、Ollama 等，API Key 或 OAuth 鉴权；可用 `/model` 或 `Ctrl+L` 在会话中途切换模型，也能接入本地模型与自定义供应商。

### 树状可分享会话

会话以树结构存储在单个文件中，可随时 `/tree` 回退到任意节点并分支继续，支持书签、`/export` 导出 HTML、`/share` 上传 gist 生成可分享链接。

### 上下文工程

极简系统提示词，启动时加载 AGENTS.md / SYSTEM.md，接近上下文上限时自动压缩（compaction），并可通过扩展实现主题化压缩或代码感知摘要；技能按需渐进式加载。

### 多种运行模式

提供交互式、print/JSON、RPC 与 TypeScript SDK 四种模式，便于脚本化调用或嵌入到其他应用中。

## 适用场景

- 日常软件开发、重构与问题排查
- 定制专属的 Agent 工作流与终端界面
- 研究笔记、写作与数据文件处理
- 通过 SDK / RPC 将 Agent 能力嵌入自有产品

## 相关资源

- [官方网站](https://pi.dev)
- [GitHub 仓库](https://github.com/earendil-works/pi)
- [npm 包](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)
- [官方文档](https://pi.dev/docs)
