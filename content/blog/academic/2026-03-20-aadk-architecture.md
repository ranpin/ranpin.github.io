---
title: AADK框架架构设计思路
date: 2026.03.20
category: 系统架构
readTime: 18分钟
tags: [AADK, Agent框架, 设计模式, C++]
summary: 深入解析AADK框架的设计理念,包括消息分发机制、Agent插件化、模型运行器等核心模块的设计思路。
---

AADK 框架采用模块化架构设计,通过消息分发中心实现场景路由,通过 AgentPlugin 接口实现插件化扩展。本文详细介绍了框架的核心设计思路和实现细节。
