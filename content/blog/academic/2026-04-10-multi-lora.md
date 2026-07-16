---
title: 多LoRA动态切换机制实现
date: 2026.04.10
category: 模型优化
readTime: 12分钟
tags: [LoRA, 动态切换, 模型复用, AADK]
summary: 介绍在BYD项目中实现的多LoRA动态切换机制,探讨如何在不重新加载模型的情况下实现场景间的快速切换。
---

多 LoRA 动态切换是提升模型复用效率的关键技术。本文介绍了如何通过修改 aadkcore 和 oai_inference agent 代码,实现基于 agent_id 的 LoRA 动态加载和切换。
