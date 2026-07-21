/// <reference types="vite/client" />
// 内容加载器 —— 主站(聚合入口)的数据源在仓库根部的 `content/` 目录：
//   个人信息 profile.yaml、最新动态 news.yaml、探索笔记 notes/*.md。
// 项目/论文/实习/荣誉与简历已迁移到独立仓库 ranpin/resume（简历中心）。
import { load as parseYaml } from 'js-yaml';
import type { PersonalInfo, NewsItem, Note } from '../types';

// 注意：import.meta.glob 的第二个参数必须是内联对象字面量（Vite 静态分析要求）。

type RawGlob = Record<string, string>;

// 取单个 YAML 文件的内容
const loadOne = <T>(glob: RawGlob): T => parseYaml(Object.values(glob)[0]) as T;

// 文件名（去扩展名），用作稳定唯一 id
const slugOf = (path: string): string =>
  path
    .split('/')
    .pop()!
    .replace(/\.(ya?ml|md)$/, '');

// 解析 Markdown：切出 frontmatter（YAML）与正文
const parseMarkdown = (
  raw: string,
): { data: Record<string, unknown>; body: string } => {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, body: raw.trim() };
  return {
    data: (parseYaml(m[1]) as Record<string, unknown>) || {},
    body: m[2].trim(),
  };
};

// --- 导出 ---

export const personalInfo = loadOne<PersonalInfo>(
  import.meta.glob('/content/profile.yaml', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as RawGlob,
);

export const recentNews = loadOne<NewsItem[]>(
  import.meta.glob('/content/news.yaml', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as RawGlob,
);

// 「星际之门」探索笔记：跳过 _ 开头的模板；生产环境隐藏 draft；按日期倒序
const toNotes = (glob: RawGlob): Note[] =>
  Object.entries(glob)
    .filter(([path]) => !slugOf(path).startsWith('_'))
    .map(([path, raw]) => {
      const { data, body } = parseMarkdown(raw);
      return { ...(data as object), id: slugOf(path), content: body } as Note;
    })
    .filter((n) => import.meta.env.DEV || !n.draft)
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

export const notes = toNotes(
  import.meta.glob('/content/notes/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as RawGlob,
);
