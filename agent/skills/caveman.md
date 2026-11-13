---
layout: agent-item
title: Caveman
type: agent
kind: skill
id: skill-caveman
name: Caveman
slug: caveman
description: 爆款 AI 编程 Agent 技能包，让 Agent 像穴居人一样说话：回答只留要点、代码原样不动，并压缩日志与测试输出，官方称整段会话可省约三分之一输入 token。
logo: null
website: https://github.com/JuliusBrussee/caveman
github: https://github.com/JuliusBrussee/caveman
platforms:
  - claude
  - openai
  - cursor
  - generic
domain: dev
tags:
  - token 优化
  - 输出压缩
  - 提示工程
developer: Julius Brussee
official: false
featured: false
status: published
install: npx @caveman-ai/cli@latest（需 Node.js 22.13+，自动检测并接入 Claude Code、Codex、Cursor、Gemini CLI 等 30+ 编程 Agent；手动安装可用仓库 dist/caveman.skill）
createdAt: 2026-11-13
updatedAt: 2026-11-13
---

## 简介

Caveman（why many token when few do trick）是一个让编程 Agent「说更少、读更少」的 Skill。装上后 Agent 的回答遵循穴居人式短句结构：先给结论、一句一意、删掉冠词和客套话，但代码、命令、数字、否定词等关键信息一字不改；同时对 Agent 读到的日志、JSON、CSV 和测试输出做压缩。官方在 54 次 Claude Code 会话实测中输入 token 减少 33.2%，18/18 个答案保持正确，GitHub 已获 11.9 万 Star。

## 能做什么

- **Say less 穴居人口吻**：回答压缩成「[事物] [动作] [原因]。[下一步]」的短句，代码块原样保留；基于 ASD-STE100 受控英语规则，每句不超过 20 个词、主动语态。
- **Read less 输入压缩**：测试结果、构建日志、JSON/CSV 等在进上下文前先裁剪，失败断言等关键信息不丢。
- **Blocks 代码模式**：Agent 写过的脚本会保存复用，一次测试运行的输出可从 397 token 降到 76 token。
- **Auto 模型调度**：按任务自动选择模型与推理力度（需免费账号），官方称比 Opus 5.5 xhigh 便宜 54% 且得分相当。
- **多 Agent 通用**：支持 Claude Code、Codex、Gemini CLI、Cursor、OpenCode 等 30+ 编程工具，各能力可单独开关。

## 使用方式

运行 `npx @caveman-ai/cli@latest`，CLI 会列出检测到的 Agent 与将要改动的配置，回车确认后重启 Agent 即生效，之后照常下达开发任务即可，例如：

```text
跑一遍测试套件，告诉我哪些用例失败以及断言内容。
```

Agent 会以穴居人式短句回答，只汇报失败用例与修复下一步；可用 `caveman status` 查看开启的能力，`caveman off browse` 等命令关闭单项功能。
