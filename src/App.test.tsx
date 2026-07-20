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

  it('switches to the resume section (my-resume view) and to the catalog', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('个人简历'));
    // ResumeSection 懒加载：默认「我的简历」视图展示工具条
    expect(await screen.findByText('导出 PDF')).toBeInTheDocument();
    expect(screen.getByText('AI 生成')).toBeInTheDocument();
    // 切到「详细经历」显示分类 tab
    fireEvent.click(screen.getByText('详细经历'));
    expect(screen.getByText('项目经历')).toBeInTheDocument();
    expect(screen.getByText('荣誉奖项')).toBeInTheDocument();
  });

  it('switches to 星际之门 and shows exploration notes', async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText('星际之门')[0]);
    // StargateSection 为懒加载，需等待其加载完成
    expect(await screen.findByText(/简历之外的探索空间/)).toBeInTheDocument();
    expect(
      await screen.findByText(/一次端侧显存泄漏的复盘/),
    ).toBeInTheDocument();
  });

  it('switches to 技术文档 and shows the docs entry', async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText('技术文档')[0]);
    // DocsSection 懒加载；标题与「打开完整知识库」入口不依赖网络请求
    expect(await screen.findByText('打开完整知识库')).toBeInTheDocument();
  });
});
