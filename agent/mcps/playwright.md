---
layout: agent-item
title: Playwright MCP
type: agent
kind: mcp
id: mcp-playwright
name: Playwright MCP
slug: playwright-mcp
description: 微软官方 Playwright MCP Server，为 Agent 提供基于无障碍树的浏览器自动化能力，可操作网页、生成测试、截图并录制回放。
logo: null
website: https://github.com/microsoft/playwright-mcp
github: https://github.com/microsoft/playwright-mcp
platforms:
  - claude
  - cursor
  - windsurf
  - generic
domain: browser
tags:
  - 浏览器自动化
  - 测试
  - 官方
developer: Microsoft
official: true
featured: false
status: published
transport: stdio
command: npx -y @playwright/mcp@latest
url: null
createdAt: 2026-10-14
updatedAt: 2026-10-26
---

## 简介

Playwright MCP 与 Playwright Skill 不同：它是一个标准 MCP Server，任何支持 MCP 协议的 Agent 都能接入。操作基于页面无障碍快照，比坐标点击更稳定，也不会干扰页面样式。

## 提供的能力

- **页面导航与交互**：点击、填写、选择、上传、键盘操作
- **结构化快照**：返回页面无障碍树，让 Agent 理解页面结构
- **截图与录制**：整页截图、元素截图、录制操作并生成测试代码
- **多浏览器**：Chromium、Firefox、WebKit 及移动端模拟

## 接入配置

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

接入后让 Agent 操作真实网站验证流程即可，例如让它登录后台修改一条数据并截图确认。
