import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Download,
  RotateCcw,
  Sparkles,
  Save,
  BookOpen,
  User,
  Clock,
  Code2,
  Check,
  Eye,
  FileCode,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useContent } from '../../context/ContentContext';
import { EssayItem, TimelineItem } from '../../types';

export const AdminWorkspaceModal: React.FC = () => {
  const {
    isAdminOpen,
    closeAdmin,
    profile,
    timeline,
    essays,
    updateProfile,
    updateTimeline,
    updateEssays,
    resetToDefaults,
    exportCodeFiles,
  } = useContent();

  const [activeTab, setActiveTab] = useState<'essays' | 'timeline' | 'profile' | 'export'>('essays');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Essays edit state
  const [editingEssay, setEditingEssay] = useState<EssayItem | null>(null);
  const [essayPreviewMode, setEssayPreviewMode] = useState(false);

  // Timeline edit state
  const [editingTimeline, setEditingTimeline] = useState<TimelineItem | null>(null);

  if (!isAdminOpen) return null;

  // Handler for Essays
  const handleSaveEssay = () => {
    if (!editingEssay) return;
    const exists = essays.some((e) => e.id === editingEssay.id);
    let updated: EssayItem[];
    if (exists) {
      updated = essays.map((e) => (e.id === editingEssay.id ? editingEssay : e));
    } else {
      updated = [editingEssay, ...essays];
    }
    updateEssays(updated);
    setEditingEssay(null);
  };

  const handleDeleteEssay = (id: string) => {
    if (confirm('确认删除这篇随笔吗？')) {
      updateEssays(essays.filter((e) => e.id !== id));
    }
  };

  // Handler for Timeline
  const handleSaveTimeline = () => {
    if (!editingTimeline) return;
    const exists = timeline.some((t) => t.id === editingTimeline.id);
    let updated: TimelineItem[];
    if (exists) {
      updated = timeline.map((t) => (t.id === editingTimeline.id ? editingTimeline : t));
    } else {
      updated = [editingTimeline, ...timeline];
    }
    updateTimeline(updated);
    setEditingTimeline(null);
  };

  const handleDeleteTimeline = (id: string) => {
    if (confirm('确认删除这条经历吗？')) {
      updateTimeline(timeline.filter((t) => t.id !== id));
    }
  };

  const copyCode = (type: 'essays' | 'timeline' | 'profile' | 'json') => {
    const exported = exportCodeFiles();
    let text = '';
    if (type === 'essays') text = exported.essaysCode;
    if (type === 'timeline') text = exported.timelineCode;
    if (type === 'profile') text = exported.profileCode;
    if (type === 'json') text = exported.fullJson;

    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAdmin}
          className="absolute inset-0 bg-stone-900/50 backdrop-blur-md"
        />

        {/* Main Workspace Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-5xl h-[90vh] bg-warm-card rounded-3xl sm:rounded-4xl shadow-2xl border border-warm-border overflow-hidden flex flex-col z-10"
        >
          {/* Top Header */}
          <div className="px-6 py-4 border-b border-warm-border/60 bg-[#FFF8FA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-warm-peach text-white flex items-center justify-center shadow-warm-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-display text-warm-text">
                  可视化工作台 ✦ 随心记事本
                </h2>
                <p className="text-xs text-warm-text-muted">
                  在此修改后主页即时更新，数据自动保存在本地
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={closeAdmin}
                className="w-8 h-8 rounded-full bg-warm-card-subtle text-warm-text flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-colors"
                title="关闭工作台"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-warm-border/40 bg-white/70">
            <button
              onClick={() => setActiveTab('essays')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeTab === 'essays'
                  ? 'bg-warm-peach text-white shadow-warm-sm'
                  : 'text-warm-text-muted hover:text-warm-text'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>随笔文章 ({essays.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeTab === 'timeline'
                  ? 'bg-warm-peach text-white shadow-warm-sm'
                  : 'text-warm-text-muted hover:text-warm-text'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>经历时间轴 ({timeline.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-warm-peach text-white shadow-warm-sm'
                  : 'text-warm-text-muted hover:text-warm-text'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>个人资料 & 技能</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeTab === 'export'
                  ? 'bg-warm-coral text-white shadow-warm-sm'
                  : 'text-warm-text-muted hover:text-warm-text'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出代码 & 备份</span>
            </button>
          </div>

          {/* Main Content Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#FFFDF9]/60">
            {/* 1. Essays Tab */}
            {activeTab === 'essays' && (
              <div>
                {!editingEssay ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-warm-text">随笔列表</h3>
                      <button
                        onClick={() =>
                          setEditingEssay({
                            id: `essay-${Date.now()}`,
                            slug: `new-post-${Date.now().toString().slice(-4)}`,
                            title: '新随笔标题',
                            date: new Date().toISOString().split('T')[0],
                            readTime: '3 min read',
                            summary: '这里输入随笔的导读摘要...',
                            tags: ['日常思考'],
                            coverGradient: 'from-pink-100/80 via-rose-50/60 to-sky-100/50',
                            content: '# 新随笔标题\n\n在这里写下你的文字...',
                          })
                        }
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-warm-peach text-white text-xs font-semibold hover:bg-[#E85B84] transition-colors shadow-warm-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>写新随笔</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {essays.map((essay) => (
                        <div
                          key={essay.id}
                          className="p-4 rounded-2xl bg-white border border-warm-border/70 shadow-warm-sm flex items-center justify-between gap-4 hover:border-warm-peach/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-warm-text-muted font-medium">
                                {essay.date} · {essay.readTime}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-warm-card-subtle text-warm-text-muted">
                                {essay.tags.join(', ')}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-warm-text truncate">
                              {essay.title}
                            </h4>
                            <p className="text-xs text-warm-text-muted truncate mt-0.5">
                              {essay.summary}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingEssay(essay)}
                              className="w-8 h-8 rounded-xl bg-warm-card-subtle hover:bg-warm-peach hover:text-white text-warm-text flex items-center justify-center transition-colors"
                              title="编辑随笔"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEssay(essay.id)}
                              className="w-8 h-8 rounded-xl bg-warm-card-subtle hover:bg-rose-500 hover:text-white text-rose-500 flex items-center justify-center transition-colors"
                              title="删除随笔"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Essay Markdown Editor */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-warm-border/60">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingEssay(null)}
                          className="text-xs font-semibold text-warm-text-muted hover:text-warm-text"
                        >
                          ← 返回列表
                        </button>
                        <span className="text-xs text-warm-text-muted">/</span>
                        <span className="text-xs font-bold text-warm-text">编辑随笔</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEssayPreviewMode(!essayPreviewMode)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                            essayPreviewMode
                              ? 'bg-warm-peach text-white border-warm-peach'
                              : 'bg-white text-warm-text border-warm-border'
                          }`}
                        >
                          <Eye className="w-3 h-3" />
                          <span>{essayPreviewMode ? '编辑代码' : '实时预览'}</span>
                        </button>

                        <button
                          onClick={handleSaveEssay}
                          className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-warm-peach text-white text-xs font-semibold hover:bg-[#E85B84] shadow-warm-sm"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>保存更新</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-warm-text mb-1">
                          随笔标题
                        </label>
                        <input
                          type="text"
                          value={editingEssay.title}
                          onChange={(e) =>
                            setEditingEssay({ ...editingEssay, title: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border focus:ring-2 focus:ring-warm-peach/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-warm-text mb-1">
                          标签 (逗号分隔)
                        </label>
                        <input
                          type="text"
                          value={editingEssay.tags.join(', ')}
                          onChange={(e) =>
                            setEditingEssay({
                              ...editingEssay,
                              tags: e.target.value.split(',').map((t) => t.trim()),
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border focus:ring-2 focus:ring-warm-peach/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-warm-text mb-1">
                          发布日期
                        </label>
                        <input
                          type="date"
                          value={editingEssay.date}
                          onChange={(e) =>
                            setEditingEssay({ ...editingEssay, date: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border focus:ring-2 focus:ring-warm-peach/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-warm-text mb-1">
                          阅读预估时长
                        </label>
                        <input
                          type="text"
                          value={editingEssay.readTime}
                          onChange={(e) =>
                            setEditingEssay({ ...editingEssay, readTime: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border focus:ring-2 focus:ring-warm-peach/40 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-warm-text mb-1">
                        导读摘要
                      </label>
                      <textarea
                        rows={2}
                        value={editingEssay.summary}
                        onChange={(e) =>
                          setEditingEssay({ ...editingEssay, summary: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border focus:ring-2 focus:ring-warm-peach/40 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-warm-text mb-1">
                        正文内容 (支持 Markdown)
                      </label>
                      {!essayPreviewMode ? (
                        <textarea
                          rows={14}
                          value={editingEssay.content}
                          onChange={(e) =>
                            setEditingEssay({ ...editingEssay, content: e.target.value })
                          }
                          className="w-full p-4 font-mono text-xs leading-relaxed rounded-2xl bg-white border border-warm-border focus:ring-2 focus:ring-warm-peach/40 outline-none"
                        />
                      ) : (
                        <div className="w-full min-h-[300px] p-6 rounded-2xl bg-white border border-warm-border prose prose-warm max-w-none text-xs">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {editingEssay.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Timeline Tab */}
            {activeTab === 'timeline' && (
              <div>
                {!editingTimeline ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-warm-text">经历时间轴列表</h3>
                      <button
                        onClick={() =>
                          setEditingTimeline({
                            id: `exp-${Date.now()}`,
                            period: '2026.09 - 至今',
                            role: '新经历职位/角色',
                            organization: '组织 / 项目 / 学校',
                            description: '详细描述你的实践经历与收获...',
                            tags: ['React', 'TypeScript'],
                            highlight: '核心亮点',
                          })
                        }
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-warm-peach text-white text-xs font-semibold hover:bg-[#E85B84] transition-colors shadow-warm-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>添加经历</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {timeline.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-white border border-warm-border/70 shadow-warm-sm flex items-center justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-warm-peach font-bold">
                                {item.period}
                              </span>
                              <span className="text-xs text-warm-text-muted">
                                @ {item.organization}
                              </span>
                              {item.highlight && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-warm-coral/15 text-[#C48000] font-semibold">
                                  {item.highlight}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-warm-text truncate">
                              {item.role}
                            </h4>
                            <p className="text-xs text-warm-text-muted line-clamp-2 mt-1">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingTimeline(item)}
                              className="w-8 h-8 rounded-xl bg-warm-card-subtle hover:bg-warm-peach hover:text-white text-warm-text flex items-center justify-center transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTimeline(item.id)}
                              className="w-8 h-8 rounded-xl bg-warm-card-subtle hover:bg-rose-500 hover:text-white text-rose-500 flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Timeline Edit Form */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-warm-border/60">
                      <button
                        onClick={() => setEditingTimeline(null)}
                        className="text-xs font-semibold text-warm-text-muted hover:text-warm-text"
                      >
                        ← 返回经历列表
                      </button>

                      <button
                        onClick={handleSaveTimeline}
                        className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-warm-peach text-white text-xs font-semibold hover:bg-[#E85B84] shadow-warm-sm"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>保存经历</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-warm-text mb-1">
                          时间跨度
                        </label>
                        <input
                          type="text"
                          value={editingTimeline.period}
                          onChange={(e) =>
                            setEditingTimeline({ ...editingTimeline, period: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-warm-text mb-1">
                          角色 / 职位
                        </label>
                        <input
                          type="text"
                          value={editingTimeline.role}
                          onChange={(e) =>
                            setEditingTimeline({ ...editingTimeline, role: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-warm-text mb-1">
                          所属机构 / 学校 / 团队
                        </label>
                        <input
                          type="text"
                          value={editingTimeline.organization}
                          onChange={(e) =>
                            setEditingTimeline({
                              ...editingTimeline,
                              organization: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-warm-text mb-1">
                          高亮亮点 (可选)
                        </label>
                        <input
                          type="text"
                          value={editingTimeline.highlight || ''}
                          onChange={(e) =>
                            setEditingTimeline({ ...editingTimeline, highlight: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-warm-text mb-1">
                        技能标签 (逗号分隔)
                      </label>
                      <input
                        type="text"
                        value={editingTimeline.tags.join(', ')}
                        onChange={(e) =>
                          setEditingTimeline({
                            ...editingTimeline,
                            tags: e.target.value.split(',').map((t) => t.trim()),
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-warm-text mb-1">
                        经历详细描述
                      </label>
                      <textarea
                        rows={5}
                        value={editingTimeline.description}
                        onChange={(e) =>
                          setEditingTimeline({
                            ...editingTimeline,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-warm-border/60">
                  <h3 className="text-sm font-bold text-warm-text">个人资料与设置</h3>
                  <button
                    onClick={() => updateProfile(profile)}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-warm-peach text-white text-xs font-semibold hover:bg-[#E85B84] shadow-warm-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>保存资料</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-warm-text mb-1">
                      姓名 / 昵称
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-warm-text mb-1">
                      专业头衔
                    </label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => updateProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-warm-text mb-1">
                      在读状态指示文案
                    </label>
                    <input
                      type="text"
                      value={profile.status}
                      onChange={(e) => updateProfile({ ...profile, status: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-warm-text mb-1">
                      地理位置 / 标签
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => updateProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-text mb-1">
                    身份一句话介绍
                  </label>
                  <input
                    type="text"
                    value={profile.roleDescription}
                    onChange={(e) => updateProfile({ ...profile, roleDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-text mb-1">
                    个人简介段落 (换行即分段)
                  </label>
                  <textarea
                    rows={4}
                    value={profile.bio.join('\n\n')}
                    onChange={(e) =>
                      updateProfile({
                        ...profile,
                        bio: e.target.value.split('\n\n').filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-warm-border outline-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* 4. Export Tab */}
            {activeTab === 'export' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-warm-border/60">
                  <div>
                    <h3 className="text-sm font-bold text-warm-text">数据导出与持久化同步</h3>
                    <p className="text-xs text-warm-text-muted">
                      一键复制代码替换对应文件，提交至 GitHub 即可永久全网生效
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('确认恢复为最初的默认数据吗？')) {
                        resetToDefaults();
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-warm-card-subtle text-rose-600 text-xs font-semibold hover:bg-rose-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>恢复默认初始数据</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-warm-border/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-warm-text">随笔文件代码</span>
                      <span className="text-[10px] font-mono text-warm-text-muted">essays.ts</span>
                    </div>
                    <button
                      onClick={() => copyCode('essays')}
                      className="w-full py-2 rounded-xl bg-warm-peach text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E85B84]"
                    >
                      {copiedType === 'essays' ? <Check className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'essays' ? '已复制 essays.ts' : '复制 essays.ts 代码'}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-warm-border/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-warm-text">经历文件代码</span>
                      <span className="text-[10px] font-mono text-warm-text-muted">timeline.ts</span>
                    </div>
                    <button
                      onClick={() => copyCode('timeline')}
                      className="w-full py-2 rounded-xl bg-warm-peach text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E85B84]"
                    >
                      {copiedType === 'timeline' ? <Check className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'timeline' ? '已复制 timeline.ts' : '复制 timeline.ts 代码'}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-warm-border/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-warm-text">资料文件代码</span>
                      <span className="text-[10px] font-mono text-warm-text-muted">profile.ts</span>
                    </div>
                    <button
                      onClick={() => copyCode('profile')}
                      className="w-full py-2 rounded-xl bg-warm-peach text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E85B84]"
                    >
                      {copiedType === 'profile' ? <Check className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'profile' ? '已复制 profile.ts' : '复制 profile.ts 代码'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
