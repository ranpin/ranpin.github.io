---
title: Orin 上的 FMHA 缺口
stage: seedling
tags: [Orin, sm_87, kernel, TensorRT]
links: [edge-ai, quantization]
updated: 2026-07-14
---

一条还在生长的枝条:在 Jetson Orin(sm_87)上,引擎能建起来,推理却卡在 **fused multi-head attention (FMHA) kernel 的缺口**上。

现象:构建期一切正常,运行期在注意力算子处报缺少对应架构的 kernel。

初步判断方向(待验证):

1. sm_87 的 FMHA 实现覆盖不全,某些 head_dim / 精度组合没有落地 kernel;
2. 量化后( [[quantization]] )的数据类型组合触发了未支持路径;
3. 可能需要回退到非 fused 的 attention,或换 plugin。

这条正是 [[edge-ai]] 里"算子实现比网络结构更关键"的活教材。
