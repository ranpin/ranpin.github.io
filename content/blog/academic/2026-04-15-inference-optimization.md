---
title: 端侧大模型推理优化实践
date: 2026.04.15
category: 性能优化
readTime: 15分钟
tags: [vLLM, QNN, 性能优化, 端侧部署]
summary: 分享在Lantu项目中积累的端侧大模型推理优化经验,包括模型量化、图像预处理、TPS优化等关键技术点。
---

在端侧大模型部署中,性能优化是核心挑战。本文从实际项目出发,分享如何把端到端耗时从初始版本优化到 **4 秒以内**。

## 推理链路

整体链路分为四段,任何一段都可能成为瓶颈:

![端侧推理链路示意图](/images/inference-pipeline.svg)

## 关键优化手段

- **模型量化**:INT8 / FP16 混合精度,在精度损失可控的前提下显著降低显存与算力开销
- **图像预处理并行化**:统一尺寸标准,减少不必要的拷贝
- **显存管理**:排查并修复图像缓存未释放的问题,把 TPS 从异常的 6 恢复到稳定的 40
- **模型预加载**:后台提前加载下一个场景的模型,场景切换延迟降低约 50%

## 一个排查内存泄漏的例子

TPS 持续下降往往是资源没有及时释放。用 RAII 管理帧缓冲能避免这类问题:

```cpp
// 用 RAII 确保每帧的 GPU 缓冲在作用域结束时释放
class FrameBuffer {
 public:
  explicit FrameBuffer(size_t bytes) { cudaMalloc(&ptr_, bytes); }
  ~FrameBuffer() { cudaFree(ptr_); }          // 关键:析构即释放
  FrameBuffer(const FrameBuffer&) = delete;   // 禁止拷贝，避免二次 free
  void* data() const { return ptr_; }
 private:
  void* ptr_ = nullptr;
};
```

## 量化推理配置

用 vLLM 加载量化模型时的关键参数:

```python
from vllm import LLM

llm = LLM(
    model="qwen-edge-int8",
    quantization="awq",      # 端侧用 AWQ/GPTQ 量化
    dtype="float16",
    gpu_memory_utilization=0.85,
    max_model_len=2048,
)
```

## 效果

| 场景 | 优化前 | 优化后 |
| --- | --- | --- |
| 舱内端到端 | 明显偏长 | ~4s |
| 衣着识别 | 行业平均 ~5s | ~2s |
| 遗留物检测正确率 | 5/12 | 12/18 |

> 经验:端侧优化没有银弹,要靠**系统性地定位瓶颈**——先测量,再优化,每一步都用数据验证。
