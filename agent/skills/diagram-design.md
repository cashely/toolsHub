---
layout: agent-item
title: Diagram Design
type: agent
kind: skill
id: skill-diagram-design
name: Diagram Design
slug: diagram-design
description: 让编程 Agent 画出编辑级图表的 Skill，一句话生成 45 种 HTML+SVG 图表，自动匹配品牌配色，单文件离线可用，支持 Claude Code、Codex、Cursor 等宿主。
logo: null
website: https://diagramdesign.dev
github: https://github.com/cathrynlavery/diagram-design
platforms:
  - claude
  - openai
  - cursor
  - windsurf
domain: data
tags:
  - 图表生成
  - SVG
  - 数据可视化
  - 品牌设计
developer: Cathryn Lavery
official: false
featured: false
status: published
install: npx skills add cathrynlavery/diagram-design；Claude Code 也可执行 /plugin marketplace add cathrynlavery/diagram-design 后 /plugin install diagram-design@diagram-design
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

## 简介

Diagram Design 是一个开源（MIT）的 Agent Skill，GitHub 17k+ Star，可运行在 Claude Code、Codex、GitHub Copilot、Cursor、Pi、Gemini CLI、Windsurf 等宿主中。用自然语言描述需求，Agent 即生成自包含的 HTML + 内联 SVG 图表：一个文件、双击即开、可离线使用，无需仪表板与导出步骤。

它内置 45 种真正的图表类型规则（架构图、Sankey 桑基图、热力图、爆炸轴测图、数据库 Schema、四象限图等），而非把同一种方框样式换 45 套皮肤；还能读取指定网站的颜色与字体，约 60 秒完成品牌配色匹配。

## 能做什么

- **45 种编辑级图表**：架构图、Sankey、热力图、爆炸轴测图、数据库 Schema 等，各有独立的布局与密度规则
- **品牌自动匹配**：指向任意网站读取配色与字体，并应用到每一张图表
- **单文件产出**：HTML + 内联 SVG，无需构建、无需托管，离线可打开
- **导入重绘**：将 draw.io、Mermaid、Excalidraw 图源按目标场景重新绘制，而非格式转换
- **无障碍动效**：默认静态输出，需要时可生成动画；屏幕阅读器可朗读图表标题与描述

## 使用方式

安装后直接用自然语言下达任务即可，例如：

> Make me an architecture diagram of my app: frontend, backend, database, Redis cache.

也可以让它先适配品牌（`onboard diagram-design to https://yoursite.com`），或重画已有文件（`redraw this .drawio file for my deck`）。
