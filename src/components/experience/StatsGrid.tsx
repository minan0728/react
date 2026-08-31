import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, GitCommit, GraduationCap, BookOpen, LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { StatItem } from '../../types';

interface StatsGridProps {
  stats: StatItem[];
}

const iconMap: Record<string, LucideIcon> = {
  FolderGit2,
  GitCommit,
  GraduationCap,
  BookOpen
};

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((item, idx) => {
        const Icon = iconMap[item.icon] || FolderGit2;
        return (
          <Card
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-warm-peach/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-warm-peach/15 text-warm-peach flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-warm-text tracking-tight">
                {item.value}
              </span>
            </div>

            <div>
              <h4 className="font-semibold text-sm sm:text-base text-warm-text mb-1">{item.label}</h4>
              <p className="text-xs text-warm-text-muted">{item.sublabel}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
