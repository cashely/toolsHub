---
layout: tool
title: RTK - 给 AI 编程 Agent 省 token 的命令压缩 CLI
type: tool
id: rtk
name: RTK
slug: rtk
description: 面向 AI 编程 Agent 的 token 节省 CLI：自动压缩 git、测试、构建等 100 多种命令的输出，可减少 60–90% 的 Agent 读取量，单个 Rust 二进制、零依赖。
website: https://www.rtk-ai.app/
github: https://github.com/rtk-ai/rtk
categories:
  - ai/ai-coding
tags:
  - ai-coding
  - open-source
  - free
pricing:
  model: freemium
  priceUrl: https://pro.rtk-ai.app/pricing
platforms:
  - cli
  - macos
  - windows
  - linux
openSource: true
status: published
featured: false
developer: RTK AI
language:
  - en
createdAt: 2026-11-13
updatedAt: 2026-11-13
---

# RTK

> The cost reduction engine for AI coding agents. 装上即忘，命令输出先压缩再给 Agent 读。

## 工具介绍

RTK（Rust Token Killer）是一个命令行工具，通过 hook 挂接到 Claude Code、GitHub Copilot、Cursor、Gemini CLI、Codex、Windsurf 等 18 种 AI 编程工具。Agent 执行 `git status`、跑测试或构建时，RTK 先把冗长输出压缩成关键摘要再送入上下文，官方称常见开发命令可减少 60–90% 的输出量，每条命令处理耗时低于 25 毫秒，且不破坏 prompt cache。

项目在 GitHub 上获得 8.6 万+ Star，单个 Rust 二进制、零依赖，CLI 核心免费开源（Apache-2.0，管道引擎与代理为 BUSL-1.1 源码可见）；面向团队另有付费的 RTK Pro 控制层。

## 核心功能

### 100+ 命令自动压缩

测试输出只保留失败用例与断言，git status/diff/log 折叠为紧凑摘要，ls、grep、rg、docker、kubectl 等输出按规则裁剪，覆盖 Git、Cargo、npm、pytest、go test、ESLint、Kubernetes、AWS、Terraform 等常见工具链。过滤器失败时自动回退原始输出，绝不阻塞命令，退出码原样透传。

### `rtk gain` 节省度量

逐条统计被压缩的命令，用 `rtk gain` 查看当日与累计节省的 token、节省比例和 ASCII 趋势图，支持 JSON 导出；`rtk discover` 可发现项目里遗漏的节省机会。被裁掉的内容可用 `rtk recall` 取回，`rtk bypass` 则不过滤执行任意命令。

### Pipelines 管道

一个 agent 无关的 `pipeline.toml` 文件即可扩展能力：把 Read/Grep 等内置工具的输出也纳入压缩、将大文件读取交给更便宜的模型处理、让 Agent 输出更简练等。内置管道一行开启，也可用 `rtk pipeline add github:user/repo` 安装社区分享的管道。

### RTK Proxy 与 RTK Pro

可选的 `rtk-proxy` 守护进程对 Agent 的 API 流量做同样的压缩与便宜模型路由。RTK Pro 则是企业级控制层：统一网关、按团队/模型统计花费与预算、密钥和个人数据脱敏、风险命令策略、团队技能/MCP 目录与审计日志。

## 适用场景

- 日常使用 Claude Code、Cursor、Copilot 等工具，想降低命令输出造成的 token 消耗
- 大型仓库中测试、构建日志刷屏，希望 Agent 只读到失败要点
- 个人或团队量化 AI 编程花费、寻找节省空间
- 企业统一管控多个 AI Agent 的成本、密钥安全与审计合规

## 相关资源

- [官方网站](https://www.rtk-ai.app/)
- [GitHub 仓库](https://github.com/rtk-ai/rtk)
- [RTK Pro 定价](https://pro.rtk-ai.app/pricing)
- [安装指南](https://www.rtk-ai.app/docs/getting-started/installation/)
- [Pipelines 介绍](https://www.rtk-ai.app/pipelines/)
