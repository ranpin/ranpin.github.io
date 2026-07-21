import { describe, it, expect } from 'vitest';
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

  it('switches to 技术文档 and shows the docs entry', async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText('技术文档')[0]);
    // DocsSection 懒加载；标题与「打开完整知识库」入口不依赖网络请求
    expect(await screen.findByText('打开完整知识库')).toBeInTheDocument();
  });
});
