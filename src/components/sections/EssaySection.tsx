import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { EssayModal } from '../modals/EssayModal';
import { useContent } from '../../context/ContentContext';
import { EssayItem } from '../../types';

export const EssaySection: React.FC = () => {
  const { essays } = useContent();
  const [selectedEssay, setSelectedEssay] = useState<EssayItem | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Extract all unique tags
  const allTags = ['All', ...Array.from(new Set(essays.flatMap((item) => item.tags)))];

  const filteredEssays =
    selectedTag === 'All'
      ? essays
      : essays.filter((item) => item.tags.includes(selectedTag));

  return (
    <section id="essays" className="py-24 sm:py-32 relative bg-gradient-to-b from-warm-bg via-[#FFFDF9] to-warm-bg">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <Badge variant="matcha" className="mb-4">
            ✦ Life, Code & Musings
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-warm-text tracking-tight mb-4">
            随笔与思考切片
          </h2>
          <p className="text-sm sm:text-lg text-warm-text-muted max-w-xl">
            记录大学生活、算法与界面设计踩坑、以及那些不经意间闪光的片刻。
          </p>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-warm-peach text-white shadow-warm-sm border border-warm-peach'
                    : 'glass-panel text-warm-text hover:border-warm-peach/40'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Essay Grid (3 columns on wide desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEssays.map((essay, idx) => (
            <Card
              key={essay.id}
              onClick={() => setSelectedEssay(essay)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-0 overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-warm-peach/60"
            >
              {/* Top Banner Gradient */}
              <div className={`h-36 sm:h-40 bg-gradient-to-br ${essay.coverGradient} p-5 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-white/80 text-warm-peach flex items-center justify-center shadow-warm-sm">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/80 text-warm-text flex items-center justify-center group-hover:bg-warm-peach group-hover:text-white transition-colors shadow-warm-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {essay.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/70 backdrop-blur-sm text-[11px] font-medium text-warm-text border border-warm-border/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-warm-text-muted mb-2.5 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-warm-peach" />
                      {essay.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-warm-coral" />
                      {essay.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-warm-text group-hover:text-warm-peach transition-colors leading-snug mb-2.5">
                    {essay.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-warm-text-muted line-clamp-3 leading-relaxed">
                    {essay.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-warm-border/60 flex items-center justify-between text-xs font-semibold text-warm-peach">
                  <span>阅读全文 ✦</span>
                  <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Global Markdown Modal */}
        <EssayModal essay={selectedEssay} onClose={() => setSelectedEssay(null)} />
      </Container>
    </section>
  );
};
