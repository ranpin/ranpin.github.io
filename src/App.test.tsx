import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { personalInfo } from './data/content';
import { ACCESS_CODE } from './data/access';
import { usePortfolioStore } from './store/usePortfolioStore';

describe('App', () => {
  beforeEach(() => {
    // 板块状态会同步到 URL hash；避免上一个用例的 hash 影响下一个用例。
    // 同时把演示模式复位到默认（仅公开板块），并清理持久化偏好。
    window.localStorage.clear();
    window.history.replaceState(null, '', '/');
    usePortfolioStore.setState({ activeSection: 'home', presentationMode: true });
  });

  it('renders the home section with personal info', () => {
    render(<App />);
    // 姓名在导航/资料区出现
    expect(screen.getAllByText(personalInfo.name).length).toBeGreaterThan(0);
    expect(screen.getByText('最新动态')).toBeInTheDocument();
  });

  it('switches to the resume section and embeds the resume center', () => {
    render(<App />);
    fireEvent.click(screen.getByText('简历中心'));
    // 简历中心已独立，主站以 iframe 内嵌，并把当前模式透传给它
    const frame = screen.getByTitle('简历中心');
    expect(frame).toBeInTheDocument();
    // 默认演示模式 → 透传 mode=present，简历中心据此隐藏私密项目
    expect(frame.getAttribute('src')).toBe('/openResume/?mode=present');
  });

  it('switches to 星际之门 and shows the cyberpunk stage', async () => {
    // 星际之门为 private 板块：需先切到完整模式才可见
    usePortfolioStore.setState({ presentationMode: false });
    render(<App />);
    fireEvent.click(screen.getAllByText('星际之门')[0]);
    // StargateSection 为懒加载，需等待其加载完成；内景标题与说明始终在 DOM 中
    expect(await screen.findByText('STARGATE')).toBeInTheDocument();
    expect(await screen.findByText(/简历之外的实验空间/)).toBeInTheDocument();
  });

  it('switches to 技术文档 and renders the docs catalog', async () => {
    // 技术文档为 private 板块：需先切到完整模式才可见
    usePortfolioStore.setState({ presentationMode: false });
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
    // DocsSection 懒加载；清单加载成功后渲染对应领域标题
    // （领域名同时出现在标签按钮与标题中，用 role 精确断言标题）
    expect(
      await screen.findByRole('heading', { name: '智能座舱' }),
    ).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it('supports deep links via URL hash', async () => {
    usePortfolioStore.setState({ presentationMode: false });
    window.history.replaceState(null, '', '/#stargate');
    render(<App />);
    // 未经点击，直达 hash 对应的板块
    expect(await screen.findByText('STARGATE')).toBeInTheDocument();
  });

  it('演示模式下隐藏 private 板块导航，仅保留公开板块', () => {
    render(<App />);
    // 公开板块可见（label 与 shortLabel 各渲染一个 span，故用 All 断言）
    expect(screen.getAllByText('首页').length).toBeGreaterThan(0);
    expect(screen.getAllByText('简历中心').length).toBeGreaterThan(0);
    // private 板块导航被隐藏
    expect(screen.queryAllByText('技术文档').length).toBe(0);
    expect(screen.queryAllByText('星际之门').length).toBe(0);
  });

  it('演示模式下直达 private 板块 hash 显示已隐藏占位', () => {
    window.history.replaceState(null, '', '/#docs');
    render(<App />);
    expect(screen.getByText('该板块在演示模式下已隐藏')).toBeInTheDocument();
  });

  it('界面上不提供任何可见的演示模式开关', () => {
    render(<App />);
    expect(
      screen.queryByRole('button', { name: /演示模式|完整模式/ }),
    ).not.toBeInTheDocument();
  });

  it('隐藏快捷键唤出密码框，访问码错误时保持锁定', () => {
    render(<App />);
    fireEvent.keyDown(window, { key: 'm', ctrlKey: true, shiftKey: true });
    const input = screen.getByLabelText('访问码');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'wrong-code' } });
    fireEvent.click(screen.getByRole('button', { name: '解锁' }));
    expect(screen.getByText('访问码不正确')).toBeInTheDocument();
    // 仍然锁定：private 板块不可见
    expect(screen.queryByText('技术文档')).not.toBeInTheDocument();
  });

  it('输入正确访问码后解锁完整模式并持久化', () => {
    render(<App />);
    fireEvent.keyDown(window, { key: 'm', metaKey: true, shiftKey: true });
    const input = screen.getByLabelText('访问码');
    fireEvent.change(input, { target: { value: ACCESS_CODE } });
    fireEvent.click(screen.getByRole('button', { name: '解锁' }));
    // 解锁后 private 板块出现，弹窗关闭
    expect(screen.getByText('技术文档')).toBeInTheDocument();
    expect(screen.getAllByText('星际之门').length).toBeGreaterThan(0);
    expect(screen.queryByLabelText('访问码')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('portfolio.presentationMode')).toBe(
      'full',
    );
  });
});
