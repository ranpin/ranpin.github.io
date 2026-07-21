---
title: Cosmos-Reason2-8B
stage: budding
tags: [VLM, 推理模型, 8B]
links: [edge-ai, quantization, vlm]
updated: 2026-07-15
---

最近端侧实验的主角模型。8B 规模,带视觉与推理能力,是把 [[vlm]] 能力下沉到设备的一个现实候选。

为什么选它落地:

- 规模刚好卡在"量化后能进 8GB 显存"的边界( [[quantization]] + [[vram-budget]] );
- 推理链质量在同尺寸里靠前;
- 但它也把 [[orin-fmha]] 那类算子问题暴露得很彻底。

它是我理解"[[edge-ai]] 到底难在哪"的一块试金石。
