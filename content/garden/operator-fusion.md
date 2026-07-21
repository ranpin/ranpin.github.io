---
title: 算子融合与 kernel
stage: seedling
tags: [kernel, 融合, TensorRT, 算子]
links: [orin-fmha, edge-ai, quantization]
updated: 2026-07-11
---

[[edge-ai]] 里我越来越信的一条:**在受限硬件上,算子实现比网络结构更能决定延迟**。同一张图,融不融合、有没有对应架构的高效 kernel,差出的可能是数倍。

融合在做的事,本质是省显存带宽:

- 把 elementwise + norm + attention 尽量并进一个 kernel,少几趟 HBM 往返;
- attention 的 fused 实现(FMHA)是重灾区,也正是 [[orin-fmha]] 卡住的地方;
- [[quantization]] 之后数据类型组合变多,能不能命中已有 kernel 是个现实问题。

这条枝条还很嫩:我在学着从 profiler 的时间线倒推"到底哪个算子没融、为什么"。
