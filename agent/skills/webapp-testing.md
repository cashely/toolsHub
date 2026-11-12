---
layout: agent-item
title: WebApp Testing
type: agent
kind: skill
id: skill-webapp-testing
name: WebApp Testing
slug: webapp-testing
description: Anthropic 官方示例 Skill，为 Web 应用提供结构化测试清单，指导 Agent 从功能、边界、异常与无障碍等维度系统验证产品。
logo: null
website: https://github.com/anthropics/skills/tree/main/skills/examples/webapp-testing
github: https://github.com/anthropics/skills
platforms:
  - claude
domain: browser
tags:
  - 测试
  - QA
  - Web应用
developer: Anthropic
official: true
featured: false
status: published
install: git clone https://github.com/anthropics/skills.git 后将 skills/examples/webapp-testing 复制到 .claude/skills/ 目录
createdAt: 2026-10-20
updatedAt: 2026-10-20
---

## 简介

WebApp Testing Skill 内置一份完整的 Web 应用测试方法论。Agent 接到测试任务后，会按清单逐项覆盖，而不是随机点几个页面就结束。

## 测试维度

- **核心流程**：注册登录、关键业务路径、支付等
- **边界与异常**：空输入、超长文本、网络中断、并发操作
- **权限安全**：未登录访问、越权操作、敏感信息暴露
- **响应式与无障碍**：移动端布局、键盘导航、屏幕阅读器

## 使用方式

给出应用地址和需要重点覆盖的模块，Agent 会输出测试计划、逐项执行，并汇总缺陷列表与复现步骤。
