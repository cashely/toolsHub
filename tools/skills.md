---
layout: tool
title: Skills - 开放 Agent 技能目录
type: tool
id: skills
name: Skills
slug: skills
description: Vercel 推出的开放 Agent 技能目录（skills.sh），可搜索各类编程 Agent 技能包，并用 npx skills 一条命令安装到 Claude Code、Cursor、Codex 等 75+ 宿主。
website: https://www.skills.sh
github: https://github.com/vercel-labs/skills
categories:
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
  - cli
openSource: true
status: published
featured: false
developer: Vercel
language:
  - en
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

# Skills

> 开放的 Agent 技能发现与安装目录。

## 工具介绍

Skills（skills.sh）是 Vercel Labs 主导的开放 Agent 技能生态入口。Agent 技能是可复用的指令包，用来教会编程 Agent 如何完成代码审查、调试、使用特定库等任务。网站提供技能搜索、排行榜与专题合集，配套开源 CLI `npx skills` 可把技能一条命令安装到当前项目。

## 核心功能

### 技能目录与搜索

收录海量社区技能，支持按名称、主题、宿主平台筛选，并提供按安装量排序的总榜、Trending（24h）与 Hot 榜单。

### 一键安装 CLI

在项目中运行 `npx skills add <owner/repo>`，交互式选择技能与目标 Agent 即可完成安装，支持 Claude Code、Codex、Cursor、OpenCode 等 75+ 宿主。

### 技能包与专题

提供 Packs（技能包）、Topics（主题）、Official（官方认证）与 Audits（安全审计）等聚合视图，便于按场景成组发现技能。

## 适用场景

- 为编程 Agent 快速加装代码审查、调试、原型设计等专项能力
- 发现社区中高质量、经过审计的 Agent 技能
- 在多个 Agent 宿主间统一管理技能安装

## 相关资源

- [官方网站](https://www.skills.sh)
- [GitHub 仓库](https://github.com/vercel-labs/skills)
- [使用文档](https://www.skills.sh/docs)
