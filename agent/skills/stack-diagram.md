---
layout: agent-item
title: stack-diagram
type: agent
kind: skill
id: skill-stack-diagram
name: stack-diagram
slug: stack-diagram
description: 用一句话描述技术栈即可生成带官方 Logo 架构图的 Agent Skill，自动获取各家官方图标、绕开文字连线，支持明暗双主题，输出 HTML、PNG 或 React 组件，适配 Claude Code、Codex、Cursor。
logo: null
website: https://stacks.caru.moe/
github: https://github.com/caru-ini/stack-diagram
platforms:
  - claude
  - openai
  - cursor
  - generic
domain: dev
tags:
  - 架构图
  - 技术栈
  - 官方 Logo
  - 图表生成
developer: caru-ini
official: false
featured: false
status: published
install: npx skills add caru-ini/stack-diagram；Claude 应用也可从 GitHub Releases 下载 stack-diagram.zip 后作为 Skill 上传
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

## 简介

stack-diagram 是一个 MIT 开源的 Agent Skill，支持 Claude Code、Codex、Cursor 及其他兼容 skills 规范的 Agent。安装后用一句话描述技术栈，Agent 就会画出架构图：自动从 svgl、devicon、gilbarbara/logos 或品牌官方仓库获取 Logo，AWS、Google Cloud、Azure 则使用各厂商官方图标包，绝不重新着色或重绘。

产出默认为单个自包含 HTML 文件（字体与 Logo 内联、离线可开），也可导出 PNG 或零依赖 React 组件，并作为 Claude Artifact 分享。站点 stacks.caru.moe 同时是一个公开画廊，经用户两次确认后可把作品匿名分享出去。

## 能做什么

- **官方 Logo 自动获取**：按 svgl → devicon → gilbarbara/logos → 品牌仓库的顺序取图，三大云使用各自官方架构图标，不改颜色、不重画
- **连线不穿文字**：线条自动绕开标签排布，Agent 渲染后会自行检查再交付
- **明暗双主题**：每张图同时渲染浅色与深色版本，瓦片保持白底以保留 Logo 本色
- **多种产出格式**：自包含 HTML（默认）、PNG、零依赖 React 组件或 Claude Artifact
- **公开画廊分享**：征得两次同意后可发布到 stacks.caru.moe，仅上传明暗 PNG、英文标题与技术栈，绝不发送原始 prompt

## 使用方式

安装后用自然语言描述技术栈即可，例如：

> Diagram our stack: Next.js and a Hono API on Vercel. Postgres on Neon, auth with Clerk, payments with Stripe. GitHub Actions deploys.

也可描述 AWS/GCP/Azure 拓扑或 monorepo 工具链，Agent 会选用对应官方图标绘图。运行需要 Python 3.9+，PNG 导出依赖带 Chromium 的 Playwright。
