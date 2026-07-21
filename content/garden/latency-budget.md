---
title: 延迟预算
stage: seedling
tags: [延迟, TTFT, 吞吐, 体验]
links: [edge-ai, kv-cache, vram-budget]
updated: 2026-07-08
---

显存有一本账( [[vram-budget]] ),延迟也该有一本。端侧的体验好不好,常常不由平均吞吐决定,而由**首 token 延迟 (TTFT)** 和交互节奏决定。

拆开看:

- **Prefill** 吃算力,和上下文长度成正比,决定 TTFT;
- **Decode** 吃显存带宽,每步都要重读一遍 [[kv-cache]],决定后续吐字速度;
- 两段的瓶颈不同,优化手段也不同 —— 混在一起谈"快不快"往往会误判。

把延迟拆成 prefill / decode 两本子账,才知道该省带宽还是省算力。这也是 [[edge-ai]] 里"约束一旦成立,决策就重排"的又一例。
