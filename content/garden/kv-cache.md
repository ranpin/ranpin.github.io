---
title: KV Cache 这本账
stage: budding
tags: [KV cache, 显存, 长上下文]
links: [vram-budget, quantization, edge-ai]
updated: 2026-07-13
---

在 [[vram-budget]] 那本账里,长上下文下真正吃显存的往往不是权重,而是 **KV cache**。它随序列长度线性增长,每一层、每个 head 都要留一份 key/value。

几个能省的方向:

- **量化 KV cache**(INT8 甚至 INT4):和权重 [[quantization]] 是两回事,精度敏感度也不同,key 通常比 value 更娇气;
- **窗口 / 稀疏**:只保留近窗 + 少量全局 token,牺牲一点远距依赖换峰值显存;
- **GQA / MQA**:从模型结构上就少存几份 KV。

对 [[edge-ai]] 来说,KV cache 是"上下文能开多长"的直接闸门 —— 它常常比参数量更早决定你能不能跑。
