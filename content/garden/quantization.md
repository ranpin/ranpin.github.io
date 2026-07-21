---
title: 量化 INT4 / INT8
stage: budding
tags: [量化, 显存, 精度]
links: [edge-ai, cosmos-reason, vram-budget]
updated: 2026-07-16
---

量化是把 [[edge-ai]] 从"跑不动"变成"跑得动"的第一杠杆。

在 Cosmos-Reason2-8B 上做 INT4 / INT8 的体会:

- **权重 INT4 + 激活 INT8** 往往是显存与精度较好的折中点;
- 真正的坑不在"能不能量化",而在**量化后的算子在目标硬件上有没有高效 kernel** —— 这把我引向了 [[orin-fmha]];
- 精度评估要用下游任务指标,PPL 掉一点点可能对应推理链断裂。

量化省下来的显存,最终都要摊进 [[vram-budget]] 这本账里。
