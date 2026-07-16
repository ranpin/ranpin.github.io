---
title: TIL：QNN 上量化模型的激活值也要对齐
date: 2026.04.18
type: til
tags: [QNN, 量化, TIL]
---

今天踩到一个点:在 QNN(高通 NPU)上跑量化模型,不只是权重量化就够了,**激活值(activation)的量化范围也要和标定时对齐**,否则 NPU 会 fallback 到 CPU,延迟直接翻几倍。

排查信号:推理"能跑但很慢",`htp` 后端日志里有大量算子回退。对齐 activation scale 后恢复正常。

> 一句话:端侧量化要"权重 + 激活"一起考虑,别只盯着权重。
