---
layout: agent-item
title: GitHub
type: agent
kind: mcp
id: mcp-github
name: GitHub
slug: github
description: GitHub 官方 MCP Server，让 Agent 直接管理 Issue、PR、仓库与 Actions，可搜索代码、审查改动并创建发布，支持远程托管免部署。
logo: null
website: https://github.com/github/github-mcp-server
github: https://github.com/github/github-mcp-server
platforms:
  - claude
  - cursor
  - windsurf
  - generic
domain: dev
tags:
  - GitHub
  - 代码托管
  - 官方
developer: GitHub
official: true
featured: true
status: published
transport: stdio
command: docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server
url: null
createdAt: 2026-10-11
updatedAt: 2026-10-25
---

## 简介

GitHub MCP Server 由 GitHub 官方维护，把 GitHub API 封装为 MCP 工具。Agent 接入后可以直接参与日常研发流程，而不只是生成代码片段。

## 提供的能力

- **Issue 与 PR**：创建、评论、分配、合并，按条件检索
- **代码操作**：搜索仓库代码、查看文件、提交与开 PR
- **Actions**：触发工作流、查看运行日志与产物
- **仓库管理**：创建分支、管理 Release、查询安全告警

## 接入配置

需要一个勾选了 repo、workflow、read:org 权限的 Personal Access Token：

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx"
      }
    }
  }
}
```

也可以使用 GitHub 官方提供的远程 MCP 端点，通过 OAuth 授权，无需本地运行 Docker。
