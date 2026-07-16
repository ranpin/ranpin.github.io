---
title: TPS 从 40 掉到 6：一次端侧显存泄漏的复盘
date: 2026.04.12
type: postmortem
tags: [性能, 显存, C++, 复盘]
---

## 现象

Lantu 端侧推理服务跑一段时间后,TPS 从稳定的 40 一路掉到 6,重启才恢复——典型的资源泄漏曲线。

## 定位过程

1. 先用监控确认**显存占用随时间单调上升**,排除了 CPU/调度问题
2. 按帧打点,发现每帧结束后显存没有回落
3. 定位到图像预处理的中间缓冲:一条异常分支里 `cudaFree` 被跳过了

## 根因

在错误处理路径上提前 `return`,导致该帧申请的 GPU 缓冲没有释放。正常路径没问题,所以只有在偶发异常帧多了之后才暴露。

## 修复

改用 RAII 管理缓冲,让释放和作用域绑定,不再依赖手写的释放路径:

```cpp
class FrameBuffer {
 public:
  explicit FrameBuffer(size_t bytes) { cudaMalloc(&ptr_, bytes); }
  ~FrameBuffer() { cudaFree(ptr_); }         // 作用域结束即释放，异常路径也安全
  FrameBuffer(const FrameBuffer&) = delete;
  void* data() const { return ptr_; }
 private:
  void* ptr_ = nullptr;
};
```

## 教训

- **资源释放不要写在"正常路径"上**——异常/提前返回一定会咬你一口,用 RAII / defer 兜底
- 性能退化优先看**是否单调**:单调上升几乎等于泄漏
- 加一个"长跑测试"进 CI,能更早发现这类问题
