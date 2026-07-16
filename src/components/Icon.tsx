import React from 'react';
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Code,
  Cpu,
  ExternalLink,
  File,
  FileText,
  FolderOpen,
  Gamepad2,
  Github,
  GraduationCap,
  HelpCircle,
  Home,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Move,
  Network,
  Palette,
  PenTool,
  Quote,
  Rss,
  Search,
  Send,
  Settings,
  Settings2,
  Share2,
  ShieldCheck,
  Star,
  Tag,
  Trophy,
  User,
  Wand2,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * 轻量图标封装：以 lucide-react 的 SVG 图标替代 Font Awesome。
 * 图标以 1em 尺寸渲染，因此沿用原有的 `text-*` 字号 / 颜色类即可，
 * 视觉表现与 `<i className="fas fa-xxx">` 基本一致。
 *
 * 用法：<Icon name="home" className="text-blue-500 mr-2" />
 */

// 原 Font Awesome 名称（去掉 fa- 前缀）到 lucide 组件的映射
const ICON_MAP: Record<string, LucideIcon> = {
  'arrows-alt': Move,
  bolt: Zap,
  book: BookOpen,
  briefcase: Briefcase,
  'calendar-alt': Calendar,
  'chart-bar': BarChart3,
  'chart-network': Network,
  'chevron-right': ChevronRight,
  code: Code,
  cog: Settings,
  cogs: Settings2,
  comments: MessageSquare,
  envelope: Mail,
  'exclamation-triangle': AlertTriangle,
  'external-link-alt': ExternalLink,
  file: File,
  'file-alt': FileText,
  'file-pdf': FileText,
  'folder-open': FolderOpen,
  gamepad: Gamepad2,
  github: Github,
  'graduation-cap': GraduationCap,
  home: Home,
  image: ImageIcon,
  'layer-group': Layers,
  lightbulb: Lightbulb,
  linkedin: Linkedin,
  magic: Wand2,
  'map-marker-alt': MapPin,
  microchip: Cpu,
  palette: Palette,
  'paper-plane': Send,
  'pen-fancy': PenTool,
  'quote-right': Quote,
  rss: Rss,
  search: Search,
  'share-alt': Share2,
  spinner: Loader2,
  star: Star,
  tag: Tag,
  times: X,
  trophy: Trophy,
  user: User,
  'user-shield': ShieldCheck,
};

interface IconProps {
  /** 图标名（原 fa- 之后的部分，如 "home"、"chevron-right"） */
  name: string;
  className?: string;
  /** 旋转动画（原 fa-spin） */
  spin?: boolean;
  'aria-label'?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  spin = false,
  'aria-label': ariaLabel,
}) => {
  const Cmp = ICON_MAP[name] || HelpCircle;
  return (
    <Cmp
      width="1em"
      height="1em"
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      className={`inline-block shrink-0 ${spin ? 'animate-spin' : ''} ${className}`.trim()}
    />
  );
};

export default Icon;
