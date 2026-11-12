---
layout: agent-item
title: Filesystem
type: agent
kind: mcp
id: mcp-filesystem
name: Filesystem
slug: filesystem
description: MCP 官方文件系统 Server，为 Agent 提供受控目录内的文件读写、目录浏览、搜索、移动与文本替换能力，是最常用的本地 MCP 之一。
logo: null
website: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
github: https://github.com/modelcontextprotocol/servers
platforms:
  - claude
  - cursor
  - windsurf
  - generic
domain: data
tags:
  - 文件系统
  - 本地
  - 官方
developer: ModelContextProtocol
official: true
featured: true
status: published
transport: stdio
command: npx -y @modelcontextprotocol/server-filesystem /Users/you/Documents
url: null
createdAt: 2026-10-10
updatedAt: 2026-10-22
---

## 简介

Filesystem MCP Server 通过 stdio 与 Agent 通信，把指定目录暴露为可操作的文件工作区。出于安全考虑，所有操作都被限制在启动参数声明的目录之内。

## 提供的能力

- **浏览与读取**：列目录、读文件、查看文件元信息
- **搜索**：按文件名模式或文件内容检索
- **写入**：创建、编辑、移动文件与目录，支持文本级查找替换
- **代码理解**：批量读取项目源码结构，辅助分析工程

## 接入配置

在支持 MCP 的客户端中添加：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents"]
    }
  }
}
```

把末尾路径替换为你希望 Agent 访问的目录，可以传多个。首次调用写入类操作时，多数客户端会弹出确认。
