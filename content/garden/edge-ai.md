---
title: 端侧 AI
stage: evergreen
tags: [edge, 推理, 系统]
links: [quantization, cosmos-reason, orin-fmha, vram-budget, learning-in-public]
updated: 2026-07-18
---

把大模型塞进算力和显存都受限的设备里跑,是我最近所有实验的母题。

云端推理讲究吞吐,端侧推理讲究**在给定功耗与显存预算下把延迟压到可用**。这条约束一旦成立,几乎所有决策都会重排:模型选型让位于 [[quantization]],算子实现的重要性甚至超过网络结构本身(见 [[orin-fmha]])。

> 端侧不是"云端的缩小版",而是另一套工程哲学。

这个花园里的大多数节点,都是从这个母题上长出来的枝条。
