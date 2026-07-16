import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GlobalModals from './GlobalModals';
import type { BlogPost } from '../types';

const noop = () => {};

describe('GlobalModals - 文章 Markdown 渲染', () => {
  it('将博客正文的 Markdown 渲染为对应 HTML 结构', () => {
    const blog: BlogPost = {
      id: 'test',
      title: '测试文章',
      date: '2026.05.01',
      category: '测试',
      content: '## 小标题\n\n- 列表项一\n- 列表项二\n\n正文段落。',
    };

    render(
      <GlobalModals
        selectedArticle={null}
        selectedPaper={null}
        selectedBlog={blog}
        selectedInternship={null}
        onCloseArticle={noop}
        onClosePaper={noop}
        onCloseBlog={noop}
        onCloseInternship={noop}
        onRecommendClick={vi.fn()}
      />,
    );

    // Markdown 应生成真正的标题与列表元素，而非纯文本
    expect(
      screen.getByRole('heading', { level: 2, name: '小标题' }),
    ).toBeInTheDocument();
    expect(screen.getByText('列表项一').tagName).toBe('LI');
  });
});
