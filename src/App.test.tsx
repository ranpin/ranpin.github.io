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

  it('switches to the resume section and shows category tabs', () => {
    render(<App />);
    fireEvent.click(screen.getByText('个人简历'));
    expect(screen.getByText('项目经历')).toBeInTheDocument();
    expect(screen.getByText('荣誉奖项')).toBeInTheDocument();
  });

  it('switches to the learning section', () => {
    render(<App />);
    fireEvent.click(screen.getByText('学习记录'));
    expect(screen.getByText('学术研究')).toBeInTheDocument();
    expect(screen.getByText('工程技术')).toBeInTheDocument();
  });
});
