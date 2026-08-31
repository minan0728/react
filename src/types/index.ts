export interface SocialLink {
  label: string;
  url: string;
  iconName: 'github' | 'mail' | 'twitter' | 'bilibili' | 'wechat';
  description?: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  roleDescription: string;
  status: string;
  avatarUrl: string;
  location: string;
  bio: string[];
  stats: StatItem[];
  skills: SkillCategory[];
  socials: SocialLink[];
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  tags: string[];
  highlight?: string;
}

export interface EssayItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  coverGradient: string;
  content: string;
}
