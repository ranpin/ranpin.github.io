import { ReactNode } from 'react';

// 核心数据模型
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  bio: {
    summary: string;
    details: string[];
  };
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  businessContext?: string;
  yourRole?: string;
  architectureDetail?: string;
  technicalChallenges?: string[];
  results?: string[];
  achievements?: string[];
  interviewHighlights?: string[];
  discussionTopics?: string[];
  demoImage?: string;
  architectureImage?: string;
  demoVideo?: string;
  resultChart?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  contributions: string[];
  skills: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  pdfUrl?: string;
}

export interface Honor {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'engineering';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Store 状态接口
export interface PortfolioState {
  personalInfo: PersonalInfo;
  recentNews: any[];
  projects: Project[];
  publications: Publication[];
  internships: Internship[];
  honors: Honor[];
  academicBlogs: BlogPost[];
  engineeringBlogs: BlogPost[];
  
  activeSection: string;
  learningCategory: 'academic' | 'engineering';
  resumeCategory: 'projects' | 'publications' | 'internships' | 'honors';
  
  isAdminMode: boolean;
  customContent: Record<string, any>;
  
  resumeTabOrder: string[];
  customTabNames: Record<string, string>;
  
  setPersonalInfo: (info: PersonalInfo) => void;
  setActiveSection: (section: string) => void;
  setLearningCategory: (category: 'academic' | 'engineering') => void;
  setResumeCategory: (category: 'projects' | 'publications' | 'internships' | 'honors') => void;
  setIsAdminMode: (mode: boolean) => void;
  setCustomContent: (content: Record<string, any>) => void;
  setResumeTabOrder: (order: string[]) => void;
  setCustomTabNames: (names: Record<string, string>) => void;
  
  // Actions for data manipulation
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addInternship: (internship: Internship) => void;
  updateInternship: (id: string, internship: Partial<Internship>) => void;
  deleteInternship: (id: string) => void;
  
  addPublication: (pub: Publication) => void;
  updatePublication: (id: string, pub: Partial<Publication>) => void;
  deletePublication: (id: string) => void;
  
  addHonor: (honor: Honor) => void;
  updateHonor: (id: string, honor: Partial<Honor>) => void;
  deleteHonor: (id: string) => void;
  
  addBlog: (blog: BlogPost) => void;
  updateBlog: (id: string, blog: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;
}

// 组件 Props 接口
export interface ProfileProps {
  personalInfo: PersonalInfo;
  isAdminMode: boolean;
  onEdit: () => void;
}

export interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  personalInfo: PersonalInfo;
}

export interface EditableCardProps {
  children: ReactNode;
  isAdminMode?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export interface LearningSectionProps {
  learningCategory: 'academic' | 'engineering';
  setLearningCategory: (category: 'academic' | 'engineering') => void;
  academicBlogs: BlogPost[];
  engineeringBlogs: BlogPost[];
  isAdminMode: boolean;
  onAdd: (type: string) => void;
  onEdit: (type: string, item: any, index: number) => void;
  onDelete: (type: string, id: string) => void;
}

export interface PageTransitionProps {
  children: ReactNode;
  isActive: boolean;
}

export interface ResumeSectionProps {
  resumeCategory: 'projects' | 'publications' | 'internships' | 'honors';
  setResumeCategory: (category: 'projects' | 'publications' | 'internships' | 'honors') => void;
  projects: Project[];
  publications: Publication[];
  internships: Internship[];
  honors: Honor[];
  customContent: Record<string, any>;
  isAdminMode: boolean;
  onAdd: (type: string) => void;
  onEdit: (type: string, item: any, index: number) => void;
  onDelete: (type: string, id: string) => void;
}

export interface LearningSectionFullProps {
  learningCategory: 'academic' | 'engineering';
  setLearningCategory: (category: 'academic' | 'engineering') => void;
  academicBlogs: BlogPost[];
  engineeringBlogs: BlogPost[];
  isAdminMode: boolean;
  onAdd: (type: string) => void;
  onEdit: (type: string, item: any, index: number) => void;
  onDelete: (type: string, id: string) => void;
}

export interface AdminPanelProps {
  onClose: () => void;
}

export interface InlineEditorProps {
  type: string;
  initialData: any;
  index: number;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export interface ProjectEditorProps {
  initialData: Project | null;
  onSave: (data: Project) => void;
  onCancel: () => void;
}

export interface ModuleRendererProps {
  type: string;
  data: any;
  isDetail?: boolean;
}

// 工具组件接口
export interface VersionManagerProps {
  onClose: () => void;
  onRestore: (data: any) => void;
}

export interface DataValidationProps {
  onDataFix: (fixedData: any) => void;
}

export interface AutoBackupProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export interface BatchOperationsProps {
  selectedItems: string[];
  onBatchDelete: (ids: string[]) => void;
  onBatchExport: (ids: string[]) => void;
}

export interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}

export interface GuestBookProps {
  entries: any[];
  onAddEntry: (entry: any) => void;
}

export interface HeroProps {
  personalInfo: PersonalInfo;
}

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface MediaViewerProps {
  url: string;
  type: 'image' | 'video';
  onClose: () => void;
}

export interface ProjectTemplatesProps {
  onSelectTemplate: (template: any) => void;
}

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface SectionTitleEditorProps {
  title: string;
  onSave: (newTitle: string) => void;
}

export interface SmartRecommendationsProps {
  currentItem: any;
  currentType: string;
  onItemClick: (item: any, type: string) => void;
}

export interface TagCloudProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

export interface ArticleListProps {
  items: any[];
  type: string;
  onEdit: (item: any, index: number) => void;
  onDelete: (id: string) => void;
}