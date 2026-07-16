/// <reference types="vite/client" />
// 内容加载器 —— 全站内容的唯一数据源在仓库根部的 `content/` 目录：
//   结构化内容用 YAML（profile / news / honors / internships / projects），
//   文章用 Markdown（blog/academic, blog/engineering）。
// 本文件在构建时通过 import.meta.glob 读入这些文件并解析，导出与旧版一致，
// 因此 store 与所有组件无需改动。编辑内容 = 改 content/ 下的文件（见 content/README.md）。
import { load as parseYaml } from 'js-yaml';
import type {
  PersonalInfo,
  NewsItem,
  Project,
  Publication,
  Internship,
  Honor,
  BlogPost,
  Note,
} from '../types';

// 注意：import.meta.glob 的第二个参数必须是内联对象字面量（Vite 静态分析要求）。

type RawGlob = Record<string, string>;

// 取单个 YAML 文件的内容
const loadOne = <T>(glob: RawGlob): T =>
  parseYaml(Object.values(glob)[0]) as T;

// 取一组文件，按路径（文件名）升序返回 [path, 解析结果]
const loadMany = <T>(glob: RawGlob): Array<[string, T]> =>
  Object.entries(glob)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, raw]) => [path, parseYaml(raw) as T]);

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

const toBlogs = (glob: RawGlob): BlogPost[] =>
  Object.entries(glob)
    .map(([path, raw]) => {
      const { data, body } = parseMarkdown(raw);
      return {
        ...(data as object),
        id: slugOf(path),
        content: body,
      } as BlogPost;
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

// --- 导出（与旧版 content.ts 保持一致的形状） ---

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

export const honors: Honor[] = loadOne<Honor[]>(
  import.meta.glob('/content/honors.yaml', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as RawGlob,
).map((h, i) => ({ ...h, id: i + 1 }));

export const internships: Internship[] = loadMany<Internship>(
  import.meta.glob('/content/internships/*.yaml', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as RawGlob,
).map(([path, v]) => ({ ...v, id: slugOf(path) }));

export const projects: Project[] = loadMany<Project>(
  import.meta.glob('/content/projects/*.yaml', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as RawGlob,
).map(([path, v]) => ({ ...v, id: slugOf(path) }));

export const publications: Publication[] = [];

export const academicBlogs = toBlogs(
  import.meta.glob('/content/blog/academic/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as RawGlob,
);

export const engineeringBlogs = toBlogs(
  import.meta.glob('/content/blog/engineering/*.md', {
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

export const stats = {
  projects: projects.length,
  papers: publications.length,
  openSource: 0,
  stars: 0,
};
