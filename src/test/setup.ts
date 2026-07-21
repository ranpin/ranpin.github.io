import '@testing-library/jest-dom';

// jsdom 未实现 canvas 2d 上下文；星际之门的穿梭动画会调用 getContext。
// 桩为返回 null（组件已对此做降级处理），避免测试输出中出现 not-implemented 噪声。
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() =>
    null) as typeof HTMLCanvasElement.prototype.getContext;
}
