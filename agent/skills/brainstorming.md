---
layout: agent-item
title: Brainstorming
type: agent
kind: skill
id: skill-brainstorming
name: Brainstorming
slug: brainstorming
description: Anthropic 官方创意发散 Skill，引导 Agent 先探索问题空间再给方案，通过结构化提问与多轮发散产出更有深度的创意与决策。
logo: null
website: https://github.com/anthropics/skills/tree/main/skills/brainstorming
github: https://github.com/anthropics/skills
platforms:
  - claude
domain: productivity
tags:
  - 头脑风暴
  - 创意
  - 决策
developer: Anthropic
official: true
featured: false
status: published
install: git clone https://github.com/anthropics/skills.git 后将 skills/brainstorming 复制到 .claude/skills/ 目录
createdAt: 2026-10-18
updatedAt: 2026-10-18
---

## 简介

默认情况下 Agent 倾向于立刻给出答案。Brainstorming Skill 改变这一行为：Agent 会先理解背景、澄清目标，再带你系统地探索可能性，最后收敛为可执行的方案。

## 能做什么

- **问题重构**：确认真正要解决的问题与约束条件
- **多方案发散**：从不同角度产出成体系的备选方案
- **权衡分析**：列出每个选项的成本、风险与适用场景
- **收敛决策**：结合你的偏好给出推荐与下一步行动

## 使用方式

适合产品方向、技术选型、活动策划等开放性问题，例如：

> 我们想给独立开发者做一个订阅分析工具，帮我系统地 brainstorm 一下定位和功能优先级。
