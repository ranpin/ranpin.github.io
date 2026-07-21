---
title: 8GB 显存预算
stage: seedling
tags: [显存, 预算, RTX3070]
links: [edge-ai, quantization]
updated: 2026-07-12
---

一块 8GB 的卡(RTX 3070)就是我很多实验的物理天花板。显存是端侧最硬的约束,比算力更早触顶。

一本粗略的账:

- 权重(量化后) + KV cache + 激活 + 框架开销,四项都要留位置;
- KV cache 随上下文线性增长,长上下文下它常常才是真正的吃显存大户;
- [[quantization]] 主要压前两项,但压不动峰值激活。

把这本账算清楚,才谈得上在 [[edge-ai]] 上做取舍。
