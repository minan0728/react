# 个人主页设计文档 (Personal Portfolio Web App)

- **创建日期**: 2026-08-31
- **技术选型**: React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide React
- **定位**: 计算机专业大学生个性化个人网站（暖色调、温柔可爱、非模板化、适配 ~1700px PC 大屏）

---

## 1. 目标与视觉基调

1. **核心目标**：构建一个可交互、响应流畅、极具个人特色与温柔感的个人主页，首期实现可运行与预览的完整基础版本。
2. **视觉基调 (Warm & Gentle)**：
   - **底色**：暖米白 / 奶油杏色 (`#FAF7F2` / `#FFFDF9`)，文字采用深棕暖黑 (`#2D2621`)。
   - **强调色**：蜜桃暖橘 (`#F4A261`)、珊瑚暖粉 (`#E76F51`)、柔和抹茶绿 (`#8AB07D`)。
   - **设计元素**：大圆角 (`rounded-2xl` / `rounded-3xl`)、细腻毛玻璃 (`backdrop-blur-md`)、温和阴影、柔和边框，拒绝冷冰冰的科技感，增加大学生的青春与生活温度。
   - **尺寸适配**：最大内容版心 `max-w-[1700px]`，在宽屏显示器上具备大气的留白与呼吸感。

---

## 2. 页面模块架构

页面采用单页平滑导航（带锚点）+ 随笔详情弹窗/查看体验，整体包含四大核心部分：

### 2.1 全屏 Hero 模块 (`HeroSection.tsx`)
- **视口高度**：`100vh` 沉浸式首屏。
- **背景层**：柔和动态粒子/暖光氛围背景（可叠加视频或动态 Canvas/CSS 光斑）+ 暖色微光遮罩。
- **顶部悬浮导航 (`Navbar.tsx`)**：
  - 胶囊型毛玻璃悬浮条，包含：Logo、个人经历、生活随笔、联系我、主题/音效微交互按键。
- **内容呈现**：
  - 醒目欢迎标语（如 "Hey there! I'm [Your Name] ✦ CS Undergrad & Creative Explorer"）。
  - 动态打字机或流光标签（"💻 Coding / 🎨 UI Design / ☕ Coffee & Life"）。
  - CTA 按钮组合（"Explore My Journey" 与 "Say Hello"），带丝滑弹性动效。

### 2.2 个人经历与数据模块 (`ExperienceSection.tsx`)
- **人物肖像区**：
  - 个性头像卡片（支持自定义插画/照片），带呼吸光晕与可爱微徽章（如 "Online" / "Looking for fun ideas"）。
  - 个人简介与技术态度（CS 学生的探索历程与日常）。
- **成就与数据统计徽章 (`StatsGrid.tsx`)**：
  - 4 组活泼统计卡片：如「开源项目/课程作业」、「学习代码提交」、「探索技术栈」、「生活随笔篇数」。
- **经历时间线 (`Timeline.tsx`)**：
  - 大学生涯经历、竞赛与获奖、项目探索，支持展开与标签过滤。

### 2.3 随笔与生活记录模块 (`EssaySection.tsx`)
- **定位**：记录编程思考、大学生活与日常感悟。
- **展示形态**：
  - 瀑布流/精美卡片网格，展示封面图、手绘感分类标签（如 `#校园日常`、`#折腾日记`）、发布日期与摘要。
  - 支持即点即看的 Markdown 文章浮层弹窗 / 详情抽屉，无需繁琐跳转，阅读体验流畅。
- **数据源**：支持本地 `.md` 文件解析与内置样例数据。

### 2.4 全屏收尾联系页 (`ContactFooter.tsx`)
- **全屏收尾 (Full Viewport / Large Section)**：
  - 巨大温暖的告别/合作邀请标语（"Let's build something delightful together."）。
  - 社交名片矩阵（GitHub, Email, Bilibili, WeChat/Twitter 等），支持一键复制 Email 提示。
  - 温馨的底部版权信息与轻巧返回顶部按钮。

---

## 3. 技术设计与工程目录

### 3.1 依赖列表
- **核心框架**：`react`, `react-dom`, `vite`
- **语言支持**：`typescript`
- **样式方案**：`tailwindcss`, `postcss`, `autoprefixer`, `tailwind-merge`, `clsx`
- **动效库**：`framer-motion`
- **图标库**：`lucide-react`
- **内容解析**：`react-markdown`, `remark-gfm`

### 3.2 目录结构
```
src/
├── assets/                  # 静态资源（背景视频/图片/头像）
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # 悬浮导航栏
│   │   └── Container.tsx    # 1700px 版心容器
│   ├── sections/
│   │   ├── HeroSection.tsx  # 全屏首屏
│   │   ├── ExperienceSection.tsx # 经历与数据
│   │   ├── EssaySection.tsx # 随笔模块
│   │   └── ContactFooter.tsx# 底部全屏联系模块
│   ├── ui/                  # 基础卡片、按钮、徽章等通用 UI
│   └── modals/
│       └── EssayModal.tsx   # Markdown 随笔阅读抽屉/弹窗
├── data/
│   ├── profile.ts           # 个人资料、技能、社媒与统计数据
│   ├── timeline.ts          # 经历时间轴数据
│   └── essays.ts            # 随笔内容（含 Markdown 文本）
├── styles/
│   └── index.css            # 暖色调 CSS 变量、全局字体与滚动条样式
├── App.tsx                  # 根页面聚合
└── main.tsx                 # 入口挂载
```

---

## 4. 实施步骤规划

1. **项目初始化**：清理/初始化 Vite + React + TypeScript 环境，安装并配置 Tailwind 与 Framer Motion。
2. **主题基建**：配置 1700px 版心断点、暖色调调色板及全局样式。
3. **分步构建页面模块**：
   - 封装 `Navbar` 导航及交互。
   - 实现 `HeroSection` 动态首屏与视差背景。
   - 构建 `ExperienceSection` 头像卡片、统计网格与时间轴。
   - 实现 `EssaySection` 卡片列表与 Markdown 阅读弹窗。
   - 构建 `ContactFooter` 全屏联系收尾页。
4. **验证与联调**：运行开发服务器预览，确保动效丝滑、宽屏 1700px 适配完美、无报错。
