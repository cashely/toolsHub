---
layout: tool
title: HyperFrames - 用 HTML 写视频的开源渲染框架，专为 AI Agent 打造
type: tool
id: hyperframes
name: HyperFrames
slug: hyperframes
description: HeyGen 开源的 HTML 转视频框架，用 HTML、CSS 与可寻址动画确定性渲染 MP4，提供 CLI、桌面 Studio 和 9 个 Agent 技能，让 AI 编程 Agent 直接做视频。
website: https://hyperframes.heygen.com/
github: https://github.com/heygen-com/hyperframes
categories:
  - ai/ai-video
  - design/video
tags:
  - agent
  - open-source
  - design
pricing:
  model: freemium
  priceUrl: null
platforms:
  - cli
  - web
  - macos
  - windows
  - linux
openSource: true
status: published
featured: false
developer: HeyGen
language:
  - en
createdAt: 2026-11-13
updatedAt: 2026-11-13
---

# HyperFrames

> Write HTML. Render video. Built for agents.

## 工具介绍

HyperFrames 是 HeyGen 推出的免费开源框架（Apache-2.0），把 HTML、CSS、媒体素材与可寻址动画（seekable animations）确定性地渲染成 MP4 视频。可以用本地 CLI 跑、在桌面 Studio 里做，也可以作为托管创作工作流的渲染内核。

它最大的特点是「专为 Agent 打造」：配套 9 个技能与插件，Claude Code、Codex、Cursor、Gemini CLI 等编程 Agent 装上后，用自然语言就能完成规划、写 HTML、编排动画、预览到渲染的整条视频生产链路。

HyperFrames Studio 桌面应用同样免费，Pro 方案额外接入 HeyGen 顶级的视频、图像、语音与音乐模型。

## 核心功能

### HTML 即视频

用熟悉的 HTML/CSS 描述画面，配合 GSAP 等可寻址动画，由 Puppeteer 与 FFmpeg 逐帧确定性渲染，结果可复现、可回退、可逐帧检查。

### CLI 全流程作业

`hyperframes` CLI 覆盖脚手架、校验、抽帧查看、时间线编辑、预览、本地或云端渲染、分享与项目历史，并能从构建或渲染失败中恢复。

### Agent 技能与插件

一条 `npx hyperframes skills update` 安装核心技能集；也可通过 `claude plugin marketplace add heygen-com/hyperframes` 装版本化插件。技能教 Agent 走完整的 HyperFrames 生产循环，并支持 `/figma`、`/slideshow`、`/reverse-any-video` 等按需能力。

### 组件注册表与素材能力

约 450 个现成区块与组件（转场、遮罩、标题、动态排版、字幕、图表、地图、3D、镜头运动）以可编辑源码形式安装；媒体技能可获取或生成音乐、音效、图片、配音、数字人与视频素材。

## 适用场景

- 让 AI 编程 Agent 用一句话产出产品介绍、解说短片等视频
- 开发者用代码版本化、批量生成动态图形与营销视频
- 把任意参考视频逆向重建为可编辑的 HyperFrames 工程（Pro）
- 在 Figma 设计与成片之间打通自动化渲染管线

## 相关资源

- [官方网站](https://hyperframes.heygen.com/)
- [GitHub 仓库](https://github.com/heygen-com/hyperframes)
