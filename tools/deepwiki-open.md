---
layout: tool
title: DeepWiki Open - AI 自动生成代码仓库 Wiki
type: tool
id: deepwiki-open
name: DeepWiki Open
slug: deepwiki-open
description: 开源的 AI 仓库 Wiki 生成器，输入 GitHub、GitLab 或 Bitbucket 仓库地址即可自动分析代码结构、生成文档与架构图，支持 Docker 自托管与 Mac 桌面版。
website: https://grok-wiki.com
github: https://github.com/AsyncFuncAI/deepwiki-open
categories:
  - ai/ai-coding
  - productivity/docs
tags:
  - ai-coding
  - open-source
  - free
pricing:
  model: free
  priceUrl: null
platforms:
  - web
  - macos
openSource: true
status: published
featured: false
developer: AsyncFuncAI
language:
  - en
  - zh
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

# DeepWiki Open

> 输入一个仓库地址，AI 自动产出可交互的代码 Wiki。

## 工具介绍

DeepWiki Open（项目 2.0 品牌名为 Grok-Wiki）是 AsyncFuncAI 开源的 DeepWiki 实现：为任意 GitHub、GitLab 或 Bitbucket 仓库自动生成美观、可交互的 Wiki。它会分析代码结构、生成完整文档、绘制解释模块关系的可视化图表，并组织成易于导航的站点，还能生成以代码为中心的引导式 Codemap。项目采用 MIT 协议，可通过 Docker、Kubernetes Helm 自行部署；官方另提供本地优先的 Mac 桌面应用，模型调用直接交给用户已登录的 Grok CLI、Codex CLI、Claude Code 等本地 CLI，应用本身不持有 API Key。

## 核心功能

### 代码结构分析

自动解析仓库目录、模块与依赖关系，梳理整体架构。

### 文档与 Wiki 生成

为仓库生成全面的说明文档，并组织成层级清晰、可搜索导航的 Wiki 站点。

### 可视化图表与 Codemap

生成解释组件如何协作的架构图，并提供以代码为中心的引导式浏览路线。

### 自托管与桌面端

提供容器镜像与 Helm Chart，支持 Docker、Kubernetes 部署；桌面端本地保存 Wiki、Ask 问答、文档与任务记录，可一键发布到公共 Gallery。

## 适用场景

- 接手陌生开源项目或大型代码库时，快速理解整体架构
- 为团队内部仓库自动生成并维护开发文档
- 不想把代码发送给在线服务，选择本地部署或本地 CLI 运行

## 相关资源

- [官方网站](https://grok-wiki.com)
- [GitHub 仓库](https://github.com/AsyncFuncAI/deepwiki-open)
- [公共 Wiki Gallery](https://grok-wiki.com/public/wikis)
