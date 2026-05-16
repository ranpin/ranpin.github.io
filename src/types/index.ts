import { ReactNode } from 'react';

// 核心数据模型 (与 usePortfolioStore.ts 保持一致)
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  avatar: string;
  bio: { main: string; detail: string };
  researchInterests: string[];
  socialLinks: Record<string, string>;
  contact?: {
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
  recentNews: BlogPost[];
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
  customContent: Record<string, unknown>;

  resumeTabOrder: string[];
  customTabNames: Record<string, string>;

  setPersonalInfo: (info: PersonalInfo) => void;
  setActiveSection: (section: string) => void;
  setLearningCategory: (category: 'academic' | 'engineering') => void;
  setResumeCategory: (
    category: 'projects' | 'publications' | 'internships' | 'honors',
  ) => void;
  setIsAdminMode: (mode: boolean) => void;
  setCustomContent: (content: Record<string, unknown>) => void;
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
  onEdit: (type: string, item: unknown, index: number) => void;
  onDelete: (type: string, id: string) => void;
}

export interface PageTransitionProps {
  children: ReactNode;
  isActive: boolean;
}

export interface ResumeSectionProps {
  resumeCategory: 'projects' | 'publications' | 'internships' | 'honors';
  setResumeCategory: (
    category: 'projects' | 'publications' | 'internships' | 'honors',
  ) => void;
  projects: Project[];
  publications: Publication[];
  internships: Internship[];
  honors: Honor[];
  customContent: Record<string, unknown>;
  isAdminMode: boolean;
  onAdd: (type: string) => void;
  onEdit: (type: string, item: unknown, index: number) => void;
  onDelete: (type: string, id: string) => void;
}

export interface LearningSectionFullProps {
  learningCategory: 'academic' | 'engineering';
  setLearningCategory: (category: 'academic' | 'engineering') => void;
  academicBlogs: BlogPost[];
  engineeringBlogs: BlogPost[];
  isAdminMode: boolean;
  onAdd: (type: string) => void;
  onEdit: (type: string, item: unknown, index: number) => void;
  onDelete: (type: string, id: string) => void;
}

export interface AdminPanelProps {
  onClose: () => void;
}

export interface InlineEditorProps {
  type: string;
  initialData: unknown;
  index: number;
  onSave: (data: unknown) => void;
  onCancel: () => void;
}

export interface ProjectEditorProps {
  initialData: Project | null;
  onSave: (data: Project) => void;
  onCancel: () => void;
}

export interface ModuleRendererProps {
  type: string;
  data: unknown;
  isDetail?: boolean;
}

// 工具组件接口
export interface VersionManagerProps {
  onClose: () => void;
  onRestore: (data: unknown) => void;
}

export interface DataValidationProps {
  onDataFix: (fixedData: unknown) => void;
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
  entries: unknown[];
  onAddEntry: (entry: unknown) => void;
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
  onSelectTemplate: (template: unknown) => void;
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
  currentItem: unknown;
  currentType: string;
  onItemClick: (item: unknown, type: string) => void;
}

export interface TagCloudProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

export interface ArticleListProps {
  items: unknown[];
  type: string;
  onEdit: (item: unknown, index: number) => void;
  onDelete: (id: string) => void;
}
