# React + Vite 个人网站实现计划 (Personal Portfolio Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于 React + Vite + TypeScript + Tailwind CSS + Framer Motion 构建一个适配 1700px PC 大屏、温暖可爱、非模板化的个人主页基础版，包含全屏 Hero 视频/动态背景、个人经历与数据、随笔模块（含 Markdown 弹窗阅读）及全屏联系收尾页。

**Architecture:** 单页响应式架构，以 `App.tsx` 为根组件组装 4 大核心 Section，使用 `framer-motion` 驱动入场视差与微交互，使用 `react-markdown` 驱动随笔解析与抽屉阅读。数据抽离至 `src/data/` 方便后续直接修改配置。

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React, react-markdown, remark-gfm

## Global Constraints

- 网站风格：温暖米白/奶杏色底色 (`#FAF7F2`)，深暖灰文字 (`#2B2825`)，蜜桃橘 (`#F4A261`) 强调色。
- 最大版心限制为 `max-w-[1700px]`，带有充足留白与呼吸感。
- 代码完全在 `C:\blog\` 下进行，构建出可本地运行 (`npm run dev`) 和预览 (`http://localhost:5173`) 的项目。

---

### Task 1: 初始化 Vite + React + TypeScript 项目基建与依赖

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `tailwind.config.js`, `postcss.config.js`
- Modify: `.gitignore`

**Interfaces:**
- Produces: 启动脚本 `npm run dev`，构建脚本 `npm run build`，Tailwind 颜色与版心配置。

- [ ] **Step 1: 编写 `package.json`**
配置 `react`, `react-dom`, `framer-motion`, `lucide-react`, `react-markdown`, `remark-gfm`, `clsx`, `tailwind-merge`, `tailwindcss`, `vite` 等依赖。

- [ ] **Step 2: 编写 `vite.config.ts`、`tsconfig.json` 与 `index.html`**
配置 `@` 路径别名指向 `src/`，设置网页标题与 Google Fonts 字体引入（Outfit / Plus Jakarta Sans）。

- [ ] **Step 3: 配置 `tailwind.config.js` 与 `postcss.config.js`**
注入 1700px (`3xl: 1700px`) 容器宽度、温暖调色板（`warm-bg`, `warm-card`, `warm-peach`, `warm-coral`, `warm-matcha`, `warm-text`）。

- [ ] **Step 4: 执行 `npm install` 安装所有依赖**
运行 `npm install` 并验证依赖树无报错。

---

### Task 2: 全局样式、类型定义与数据源构建

**Files:**
- Create: `src/types/index.ts`
- Create: `src/styles/index.css`
- Create: `src/data/profile.ts`
- Create: `src/data/timeline.ts`
- Create: `src/data/essays.ts`

**Interfaces:**
- Produces: `ProfileData`, `TimelineItem`, `EssayItem` 数据类型，全局暖色滚动条与毛玻璃工具类。

- [ ] **Step 1: 编写 `src/types/index.ts`**
定义个人资料、社交链接、数据统计项、经历时间轴、随笔条目等 TypeScript 接口。

- [ ] **Step 2: 编写 `src/styles/index.css`**
定义全局平滑滚动、暖色高亮、发光光晕、自定义可爱圆润滚动条和微阴影。

- [ ] **Step 3: 编写数据源文件**
创建 `src/data/profile.ts`（CS大学生人设、技术栈、4组统计指标）、`src/data/timeline.ts`（大学经历与项目探索）、`src/data/essays.ts`（包含生动的 Markdown 样例随笔）。

---

### Task 3: 布局与通用 UI 组件封装

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Container.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Button.tsx`

**Interfaces:**
- Produces: `<Container>` 1700px 响应式版心容器、`<Navbar>` 悬浮胶囊导航栏及各原子 UI 组件。

- [ ] **Step 1: 封装 `<Container>` 与基础原子组件**
实现统一圆角与暖光边缘的 Card、Badge、Button 组件。

- [ ] **Step 2: 封装 `<Navbar>` 悬浮导航**
带毛玻璃效果的顶部悬浮胶囊，支持平滑滚动锚点定位（Hero、经历、随笔、联系我），包含可爱微交互和状态小圆点。

---

### Task 4: 实现全屏 Hero 首屏模块 (`HeroSection.tsx`)

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

**Interfaces:**
- Produces: 100vh 动态首屏，包含柔和视频/Canvas 粒子光斑背景、个性大标语、动态标签和 CTA 按钮组。

- [ ] **Step 1: 编写 `HeroSection.tsx` 背景层**
构建柔和的动态渐变网格光斑/视频遮罩与粒子微浮动效果，确保在 1700px 下大气沉浸。

- [ ] **Step 2: 编写 `HeroSection.tsx` 核心文案与交互动效**
实现主副标题分层入场、生动标签组（"✦ CS Undergrad" / "☕ Coffee & Creative Code" / "🎨 UI Tinkerer"）、以及 "Explore My Journey" 与 "Say Hello" 动作按钮。

---

### Task 5: 实现个人经历与数据展示模块 (`ExperienceSection.tsx`)

**Files:**
- Create: `src/components/sections/ExperienceSection.tsx`
- Create: `src/components/experience/StatsGrid.tsx`
- Create: `src/components/experience/TimelineCard.tsx`

**Interfaces:**
- Produces: 头像插画展示卡片、4组数据统计微卡片（项目数/Commits/编程年限/随笔）、大学经历与探索时间线。

- [ ] **Step 1: 编写左侧人物头像与简介卡片**
包含个性化肖像占位插画、在校状态标签（"🟢 Exploring Next Big Things"）、关于我的温柔自述与技能标签云。

- [ ] **Step 2: 编写右侧数据徽章 `<StatsGrid>` 与时间线 `<TimelineCard>`**
实现滚动视差浮入动效，展示大学竞赛、项目开发、开源贡献的时间轴。

---

### Task 6: 实现随笔模块与 Markdown 弹窗阅读 (`EssaySection.tsx` & `EssayModal.tsx`)

**Files:**
- Create: `src/components/sections/EssaySection.tsx`
- Create: `src/components/modals/EssayModal.tsx`

**Interfaces:**
- Produces: 随笔卡片网格流、支持分类筛选与标签高亮、点击弹出 Markdown 沉浸式阅读抽屉/弹窗。

- [ ] **Step 1: 编写 `EssaySection.tsx` 随笔卡片列表**
卡片展示手绘感标签（`#校园生活`、`#折腾日记`）、封面色块、阅读用时和摘要。

- [ ] **Step 2: 编写 `EssayModal.tsx` 阅读弹窗**
使用 `react-markdown` + `remark-gfm` 渲染 Markdown 文本，搭配精致排版、柔和遮罩与平滑关闭交互。

---

### Task 7: 实现全屏联系收尾页 (`ContactFooter.tsx`)

**Files:**
- Create: `src/components/sections/ContactFooter.tsx`

**Interfaces:**
- Produces: 仪式感全屏收尾页面、大号合作文案、可交互社交名片矩阵（一键复制 Email）、版权信息。

- [ ] **Step 1: 编写核心邀请文案与社交矩阵**
包含 "Let's build something warm together" 标语、GitHub / Email / Bilibili / WeChat 互动卡片。

- [ ] **Step 2: 增加一键复制 Email 交互反馈与返回顶部按钮**
点击邮箱时弹出温和 Toast 提示 "Email Copied!"，底部提供平滑返回顶部快捷按钮。

---

### Task 8: 根组件组装、本地预览与验证

**Files:**
- Create/Modify: `src/App.tsx`, `src/main.tsx`

**Interfaces:**
- Produces: 完整的单页应用，启动本地开发服务器并测试预览。

- [ ] **Step 1: 组装 `src/App.tsx`**
按顺序挂载 `Navbar`, `HeroSection`, `ExperienceSection`, `EssaySection`, `ContactFooter` 及全局 `EssayModal`。

- [ ] **Step 2: 启动 Vite 开发服务器并测试验证**
运行 `npm run build` 确保无 TypeScript 和打包报错，启动 `npm run dev` 验证各模块在宽屏下的视觉效果与交互。
