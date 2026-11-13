---
layout: tool
title: PageAgent - 一行代码让网站拥有 AI 操作员的开源 GUI Agent 库
type: tool
id: page-agent
name: PageAgent
slug: page-agent
description: 阿里巴巴开源的纯前端 GUI Agent JavaScript 库：一行 script 或 npm 安装即可让任意网页拥有 AI 操作员，用户用文字指示，Agent 基于文本 DOM 自动点击、填写、跳转，支持自带任意 LLM。
website: https://alibaba.github.io/page-agent/
github: https://github.com/alibaba/page-agent
categories:
  - development/frontend
  - ai/ai-agent
tags:
  - agent
  - open-source
  - free
pricing:
  model: free
  priceUrl: null
platforms:
  - web
openSource: true
status: published
featured: false
developer: Alibaba
language:
  - en
  - zh
createdAt: 2026-11-13
updatedAt: 2026-11-13
---

# PageAgent

> The GUI Agent Living in Your Webpage. 一个脚本，让任意网页拥有自己的 AI Agent。

## 工具介绍

PageAgent 是阿里巴巴开源的纯前端 JavaScript/TypeScript 库（npm 包名 `page-agent`，MIT 协议）。网站开发者只需嵌入一行 script 或 `npm install page-agent`，页面中就会出现一个 AI 操作员：用户用自然语言下达指示（如「点击登录按钮」「帮我填好这张表单」），Agent 直接在页面内解析 DOM、执行点击、填写、跳转等操作。

与传统浏览器自动化不同，它不需要浏览器扩展、Python、无头浏览器或后端改造；不依赖截图和多模态模型，而是基于文本化的 DOM 进行操作，普通文本 LLM 即可驱动。模型支持自带密钥（BYOK），兼容主流大模型与本地私有部署模型，官方另提供免费的测试 LLM API 供快速体验。

## 核心功能

### 一行代码接入

通过 CDN 的 `page-agent.demo.js` 脚本即可在任意页面加载 AI 操作员，也可用 `npm install page-agent` 后 `import { PageAgent }` 编程式创建实例，指定模型、baseURL、apiKey 和语言。

### 文本 DOM 操作

将页面 DOM 转为文本描述交给 LLM 推理，无需截图、无需多模态模型和特殊权限；Agent 自动完成元素定位、点击、表单填写等交互，并可通过 `agent.execute('...')` 直接以代码调用。

### 自带任意模型

兼容 Qwen、GPT、Gemini、Claude 等主流模型以及本地部署的私有模型，密钥留在自己手中，适合对数据敏感、要求无痛脱敏的接入场景。

### 扩展与 MCP（可选）

官方 Chrome 扩展可让 Agent 跨标签页执行多页面任务；另有 Beta 版 MCP Server，允许外部 Agent 客户端通过 Model Context Protocol 操控浏览器中的 PageAgent。

## 适用场景

- SaaS 产品想用几行代码内置 AI Copilot，而不重写后端
- ERP、CRM、后台管理系统中把 20 次点击的表单流程变成一句话
- 无障碍访问：用自然语言/语音操作任意 Web 应用
- 借助 Chrome 扩展让自有 Web Agent 跨标签页工作
- 通过 MCP 让外部编程 Agent 接管浏览器页面

## 相关资源

- [官方网站与 Demo](https://alibaba.github.io/page-agent/)
- [GitHub 仓库](https://github.com/alibaba/page-agent)
- [官方文档](https://alibaba.github.io/page-agent/docs/introduction/overview)
- [npm 包](https://www.npmjs.com/package/page-agent)
- [支持的模型](https://alibaba.github.io/page-agent/docs/features/models)
