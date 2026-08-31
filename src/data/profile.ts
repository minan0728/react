import { ProfileData } from '../types';
import avatarImg from '../assets/avatar.jpg';

export const profileData: ProfileData = {
  name: 'Minan',
  title: 'CS Undergrad & Creative Explorer',
  roleDescription: '计算机专业本科生 · 热爱前端工程、创意编码与温润设计',
  status: '🟢 正在探索好玩的技术与生活灵感',
  avatarUrl: avatarImg,
  location: 'China · Campus Life',
  bio: [
    '你好！我是 Minan，一名主修计算机科学的在读本科生。',
    '我喜欢用代码构建温暖、有呼吸感且细腻有趣的数字体验。平时除了钻研算法和现代前端工程，也热衷于探索交互设计、记录生活随笔以及品尝香浓拿铁。',
    '我相信技术不应该只是冷冰冰的逻辑，温柔的排版、舒适的动效和治愈的色彩，能让每一次点击都变成愉悦的相遇。'
  ],
  stats: [
    {
      id: 'projects',
      value: '12+',
      label: '项目与创意实验',
      sublabel: 'Web / Tools / Creative Apps',
      icon: 'FolderGit2'
    },
    {
      id: 'commits',
      value: '800+',
      label: 'Git 代码提交',
      sublabel: 'Continuous Learning & Growth',
      icon: 'GitCommit'
    },
    {
      id: 'years',
      value: '3rd Year',
      label: '计算机在读年级',
      sublabel: 'B.S. in Computer Science',
      icon: 'GraduationCap'
    },
    {
      id: 'essays',
      value: '20+',
      label: '生活与技术随笔',
      sublabel: 'Thoughts & Life Slices',
      icon: 'BookOpen'
    }
  ],
  skills: [
    {
      category: '前端与创意工程',
      skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Astro', 'Next.js']
    },
    {
      category: '基础与后端探索',
      skills: ['C / C++', 'Java', 'Python', 'Node.js', 'Git', 'Linux / Shell']
    },
    {
      category: '设计与趣味工具',
      skills: ['Figma', 'UI/UX Design', 'Obsidian', 'Markdown', 'Prototyping']
    }
  ],
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/minan0728',
      iconName: 'github',
      description: '探索我的开源代码与项目'
    },
    {
      label: 'Email',
      url: 'mailto:minan@example.com',
      iconName: 'mail',
      description: '随时给我写信，期待交流'
    },
    {
      label: 'Bilibili',
      url: 'https://space.bilibili.com',
      iconName: 'bilibili',
      description: '分享大学日常与代码记录'
    },
    {
      label: 'WeChat',
      url: '#wechat',
      iconName: 'wechat',
      description: '微信好友 / 探讨灵感'
    }
  ]
};
