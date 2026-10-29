// 主站板块的单一事实来源：导航（Header）与路由守卫（App）都从这里读取，
// 避免板块列表在多处重复维护。
//
// visibility 控制「演示模式」下的可见性：
//   - 'public'（默认）：任何模式下都可见；
//   - 'private'：演示模式下从导航隐藏，直达链接也会回退/占位。
// 面试展示时保持演示模式即可隐藏 private 板块；自己浏览切到完整模式。
// 想调整哪些板块需要隐藏，只需修改下方对应条目的 visibility。

export interface SectionMeta {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  visibility?: 'public' | 'private';
}

export const SECTIONS: SectionMeta[] = [
  { id: 'home', label: '首页', shortLabel: '首页', icon: 'home' },
  // 2026-10-20：「简历中心」导航入口已移除（用户判断作用不大）。简历改由
  // 首页项目总览里 openResume 的「🎬 演示Demo」徽章直达（ranpin.github.io/openResume/，
  // 独立站点，不依赖主站 iframe）。主站不再内嵌简历中心。
  // 2026-10-29：「技术文档」导航入口已移除（用户决定 edge-ai-docs 不再从主站链接，
  // 转为个人记录/复盘用途）。edge-ai-docs 仓库与其 Pages 站点保持公开、可直达
  // （ranpin.github.io/edge-ai-docs/），只是主站不再提供入口。
  {
    id: 'stargate',
    label: '星际之门',
    shortLabel: '星际之门',
    icon: 'star',
    visibility: 'private',
  },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

export const isPrivateSection = (id: string): boolean =>
  SECTIONS.find((s) => s.id === id)?.visibility === 'private';
