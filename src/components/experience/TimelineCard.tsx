import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { TimelineItem } from '../../types';

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-6 sm:pl-8 border-l-2 border-warm-peach/30 last:border-transparent pb-8 last:pb-0"
    >
      {/* Node Dot */}
      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-warm-peach shadow-warm-sm" />

      <Card className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-peach/10 text-warm-peach text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            {item.period}
          </span>
          <span className="text-xs font-medium text-warm-text-muted">{item.organization}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-warm-text mb-2 font-display">{item.role}</h3>
        <p className="text-sm text-warm-text-muted leading-relaxed mb-4">{item.description}</p>

        {item.highlight && (
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-warm-card-subtle/80 border border-warm-border/60 text-xs sm:text-sm text-warm-text font-medium mb-4">
            <Sparkles className="w-4 h-4 text-warm-peach flex-shrink-0 mt-0.5" />
            <span>{item.highlight}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-warm-bg text-warm-text text-xs font-medium border border-warm-border/40"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
