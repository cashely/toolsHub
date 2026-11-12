---
layout: agent-item
title: Atlassian Remote MCP
type: agent
kind: mcp
id: mcp-atlassian
name: Atlassian Remote MCP
slug: atlassian
description: Atlassian 官方远程 MCP Server，让 Agent 读取与操作 Jira 任务、Confluence 文档和 Bitbucket，OAuth 授权开箱即用无需部署。
logo: null
website: https://www.atlassian.com/blog/announcements/atlassian-mcp-server
github: null
platforms:
  - claude
  - cursor
  - generic
domain: communication
tags:
  - Jira
  - Confluence
  - 远程MCP
  - 官方
developer: Atlassian
official: true
featured: false
status: published
transport: streamable-http
command: null
url: https://mcp.atlassian.com/v1/sse
createdAt: 2026-10-16
updatedAt: 2026-10-28
---

## 简介

Atlassian 提供官方托管的远程 MCP Server，无需本地安装任何进程。通过 OAuth 登录授权你的 Atlassian 账号后，Agent 即可在授权站点范围内读写 Jira 与 Confluence 数据。

## 提供的能力

- **Jira**：查询与创建 Issue、更新状态、评论、按 JQL 检索
- **Confluence**：搜索页面、读取正文、创建与更新文档
- **Bitbucket**：查看仓库、PR 与代码变更
- **跨工具工作流**：如「整理本周完成的 Issue，生成周报写入 Confluence」

## 接入配置

远程类型不需要 command，在客户端中填入 URL 并按提示完成 OAuth 即可：

```json
{
  "mcpServers": {
    "atlassian": {
      "url": "https://mcp.atlassian.com/v1/sse"
    }
  }
}
```

适合团队场景：把站会、周报、需求跟踪等重复流程交给 Agent 代办。
