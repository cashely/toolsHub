---
layout: agent-item
title: Playwright
type: agent
kind: skill
id: skill-playwright
name: Playwright
slug: playwright
description: 微软官方 Playwright 浏览器自动化 Skill，让 Agent 能够驱动 Chromium、Firefox、WebKit 完成网页操作、表单填写、截图与端到端测试。
logo: null
website: https://github.com/microsoft/playwright/tree/main/skills
github: https://github.com/microsoft/playwright
platforms:
  - claude
domain: browser
tags:
  - 浏览器自动化
  - e2e测试
  - 截图
developer: Microsoft
official: true
featured: true
status: published
install: git clone https://github.com/microsoft/playwright.git 后将 skills/playwright 复制到项目 .claude/skills/ 目录
createdAt: 2026-10-12
updatedAt: 2026-10-12
---

## 简介

Playwright Skill 将 Playwright 的浏览器自动化能力封装为 Agent 可调用的技能包。安装后，Agent 可以自行编写并运行 Playwright 脚本，无需人工记忆 API 细节。

## 能做什么

- **页面操作**：打开 URL、点击、输入、选择下拉项、上传文件
- **数据提取**：抓取页面文本、属性、网络请求与响应
- **视觉验证**：整页截图、元素截图，对比页面变化
- **端到端测试**：生成并运行测试脚本，定位失败原因

## 使用方式

将 Skill 放入项目后，直接用自然语言下达任务即可，例如：

> 打开 localhost:3000，用 demo 账号登录，截图仪表盘页面，并检查是否成功加载了 6 张图表。

Agent 会自动选择合适的 Playwright API 完成任务并汇报结果。
