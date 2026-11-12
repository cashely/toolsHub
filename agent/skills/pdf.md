---
layout: agent-item
title: PDF
type: agent
kind: skill
id: skill-pdf
name: PDF
slug: pdf
description: Anthropic 官方 PDF 处理 Skill，让 Agent 具备读取、合并、拆分、填写表单、OCR 识别与生成 PDF 文档的完整能力。
logo: null
website: https://github.com/anthropics/skills/tree/main/skills/pdf
github: https://github.com/anthropics/skills
platforms:
  - claude
domain: productivity
tags:
  - PDF
  - 文档处理
  - OCR
developer: Anthropic
official: true
featured: true
status: published
install: git clone https://github.com/anthropics/skills.git 后将 skills/pdf 复制到 .claude/skills/ 目录
createdAt: 2026-10-15
updatedAt: 2026-10-15
---

## 简介

PDF Skill 基于 pypdf 等成熟库构建，把常见的 PDF 操作整理为 Agent 可以按需调用的工作流。Agent 会先分析任务，再选择对应的处理方式。

## 能做什么

- **读取内容**：提取文本、表格与元数据，扫描件自动走 OCR
- **页面操作**：合并、拆分、旋转、删除、重新排序页面
- **表单处理**：读取与填写 AcroForm 表单字段
- **生成 PDF**：将 Markdown、HTML 或图片转换为 PDF

## 使用方式

直接描述目标文件与想要的结果，例如：

> 把 contracts 目录里的 3 个 PDF 合并成一份，在每页页脚加上页码，并提取第二章的全部文字。

Agent 会自动完成解析与处理，并给出输出文件路径。
