import { create } from 'zustand';

// edge-ai-docs 仓库可见性探测 —— 「技术文档」板块的自动显隐依据。
//
// 背景：文档放在独立仓库 edge-ai-docs（GitHub Free 套餐）。Free 套餐下仓库一旦设为
// 私有，其 GitHub Pages 会被停用，https://ranpin.github.io/edge-ai-docs/ 及其
// docs.json 清单返回 404。因此「docs.json 能否取到」即等价于「仓库是否公开」。
//
// 主站据此自动显隐「技术文档」板块：仓库公开 → 显示；仓库私有 → 导航与路由都隐藏。
// 这与 sections.ts 里基于「演示模式」的手动 visibility 是两套独立机制：
//   - 本探测：自动、由仓库可见性决定；
//   - 演示模式：手动、由站点主人配置。
// 二者取交集——任一判定隐藏则该板块不显示。
//
// 默认 available=false（探测完成前先隐藏），契合「仓库平常保持私有」的常态，
// 避免私有态下先闪现再隐藏；公开态下探测很快完成，板块随即出现。
interface DocsAvailabilityState {
  available: boolean;
  checked: boolean;
  check: () => Promise<void>;
}

export const useDocsAvailability = create<DocsAvailabilityState>()(
  (set, get) => ({
    available: false,
    checked: false,
    check: async () => {
      if (get().checked) return;
      try {
        const r = await fetch('/edge-ai-docs/docs.json', { cache: 'no-cache' });
        set({ available: r.ok, checked: true });
      } catch {
        // 网络异常/站点不可达：按不可见处理（私有态的安全默认）
        set({ available: false, checked: true });
      }
    },
  }),
);
