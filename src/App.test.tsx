import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { personalInfo } from './data/content';

describe('App', () => {
  it('renders the home section with personal info', () => {
    render(<App />);
    // 姓名在导航/资料区出现
    expect(screen.getAllByText(personalInfo.name).length).toBeGreaterThan(0);
    expect(screen.getByText('最新动态')).toBeInTheDocument();
  });

  it('switches to the resume section and embeds the resume center', () => {
    render(<App />);
    fireEvent.click(screen.getByText('简历中心'));
    // 简历中心已独立，主站以 iframe 内嵌 /resume/ 直接呈现
    const frame = screen.getByTitle('简历中心');
    expect(frame).toBeInTheDocument();
    expect(frame.getAttribute('src')).toBe('/resume/');
  });

  it('switches to 星际之门 and shows the cyberpunk stage', async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText('星际之门')[0]);
    // StargateSection 为懒加载，需等待其加载完成；内景标题与说明始终在 DOM 中
    expect(await screen.findByText('STARGATE')).toBeInTheDocument();
    expect(await screen.findByText(/简历之外的实验空间/)).toBeInTheDocument();
  });

  it('switches to 技术文档 and renders the docs catalog', async () => {
    // mock docs.json 清单，避免依赖网络；DocsSection 读取后渲染领域标签
    const manifest = {
      categories: [{ name: '智能座舱', id: 'cockpit', general: [], projects: [] }],
    };
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(manifest) }),
      ),
    );
    render(<App />);
    fireEvent.click(screen.getAllByText('技术文档')[0]);
    // DocsSection 懒加载；清单加载成功后渲染对应领域标签
    expect(await screen.findByText('智能座舱')).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});
