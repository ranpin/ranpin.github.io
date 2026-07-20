import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResumeDocument from './ResumeDocument';
import type { ResumeData } from '../../types/resume';

const data: ResumeData = {
  id: 'x',
  label: '测试简历',
  basics: { name: 'Ranpin', title: '工程师', summary: '一段简介' },
  work: [
    { company: 'ACME', position: '开发', highlights: ['做了 X', ''] },
  ],
  skills: [{ category: '语言', items: ['C++', ''] }],
};

describe('ResumeDocument', () => {
  it('renders name, title and section headings', () => {
    render(<ResumeDocument data={data} />);
    expect(screen.getByText('Ranpin')).toBeInTheDocument();
    expect(screen.getByText('工程师')).toBeInTheDocument();
    expect(screen.getByText('个人简介')).toBeInTheDocument();
    expect(screen.getByText('工作经历')).toBeInTheDocument();
    expect(screen.getByText('专业技能')).toBeInTheDocument();
  });

  it('filters out empty bullet lines', () => {
    render(<ResumeDocument data={data} />);
    // work.highlights 里的空字符串被过滤，只剩一条
    expect(screen.getByText('做了 X')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('sets id when provided (print target)', () => {
    const { container } = render(<ResumeDocument data={data} id="resume-print" />);
    expect(container.querySelector('#resume-print')).not.toBeNull();
  });
});
