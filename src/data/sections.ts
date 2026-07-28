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
  { id: 'resume', label: '简历中心', shortLabel: '简历', icon: 'user' },
  {
    id: 'docs',
    label: '技术文档',
    shortLabel: '文档',
    icon: 'file-alt',
    visibility: 'private',
  },
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
