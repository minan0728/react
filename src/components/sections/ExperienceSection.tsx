import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Code2 } from 'lucide-react';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { StatsGrid } from '../experience/StatsGrid';
import { TimelineCard } from '../experience/TimelineCard';
import { useContent } from '../../context/ContentContext';

export const ExperienceSection: React.FC = () => {
  const { profile, timeline } = useContent();

  return (
    <section id="experience" className="py-24 sm:py-32 relative bg-warm-bg">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <Badge variant="coral" className="mb-4">
            ✦ My Path & Footprints
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-warm-text tracking-tight mb-4">
            成长历程与个人画像
          </h2>
          <p className="text-sm sm:text-lg text-warm-text-muted max-w-xl">
            记录一名计算机大学生的探索足迹：在逻辑的世界里构建温度，在实践中沉淀经验。
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="mb-16 sm:mb-20">
          <StatsGrid stats={profile.stats} />
        </div>

        {/* 2-Column Grid: Profile & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Profile & Bio Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <Card className="p-6 sm:p-8 relative overflow-hidden">
              {/* Decorative warm aura */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-warm-peach/15 rounded-full blur-3xl pointer-events-none" />

              {/* Portrait & Basic Info */}
              <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-warm-peach/40 shadow-warm-md"
                  />
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-warm-matcha text-white flex items-center justify-center text-xs shadow-warm-sm border-2 border-white">
                    ✦
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-warm-text">
                    {profile.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-warm-peach mb-1.5">
                    {profile.title}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-warm-text-muted">
                    <MapPin className="w-3.5 h-3.5 text-warm-coral" />
                    {profile.location}
                  </span>
                </div>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-3 text-sm sm:text-base text-warm-text/90 leading-relaxed mb-6 pt-4 border-t border-warm-border/60">
                {profile.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Skill Categories */}
              <div className="pt-4 border-t border-warm-border/60 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-warm-text uppercase tracking-wider">
                  <Code2 className="w-4 h-4 text-warm-peach" />
                  <span>技术栈与兴趣探索</span>
                </div>

                {profile.skills.map((group) => (
                  <div key={group.category} className="space-y-1.5">
                    <span className="text-xs text-warm-text-muted font-medium block">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs font-medium rounded-xl bg-warm-card-subtle text-warm-text border border-warm-border/40 hover:border-warm-peach/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Timeline Journey (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-warm-peach" />
              <h3 className="text-xl sm:text-2xl font-bold font-display text-warm-text">
                大学时光与经历时间轴
              </h3>
            </div>

            <div className="pt-2">
              {timeline.map((item, index) => (
                <TimelineCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
