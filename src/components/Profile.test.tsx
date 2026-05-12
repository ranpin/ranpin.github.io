import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

describe('Profile Component', () => {
  const mockPersonalInfo = {
    name: '陈润斌',
    title: '大模型工程框架工程师',
    avatar: '/images/avatar.jpg',
    location: '杭州',
    email: 'example@alibaba-inc.com',
    bio: {
      main: '专注于端智能与大模型工程化落地。',
      detail: '拥有丰富的 AI 基础设施建设经验。'
    },
    socialLinks: {}
  };

  it('should render personal information correctly', () => {
    render(<Profile personalInfo={mockPersonalInfo} />);
    
    expect(screen.getByText('陈润斌')).toBeInTheDocument();
    expect(screen.getByText('大模型工程框架工程师')).toBeInTheDocument();
    expect(screen.getByText('杭州')).toBeInTheDocument();
  });

  it('should display contact information', () => {
    render(<Profile personalInfo={mockPersonalInfo} />);
    
    expect(screen.getByText('example@alibaba-inc.com')).toBeInTheDocument();
  });
});
