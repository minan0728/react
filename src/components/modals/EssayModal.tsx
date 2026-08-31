import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Tag, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EssayItem } from '../../types';

interface EssayModalProps {
  essay: EssayItem | null;
  onClose: () => void;
}

export const EssayModal: React.FC<EssayModalProps> = ({ essay, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (essay) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [essay, onClose]);

  return (
    <AnimatePresence>
      {essay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[88vh] bg-warm-card rounded-4xl shadow-warm-lg border border-warm-border overflow-hidden flex flex-col z-10"
          >
            {/* Header / Banner */}
            <div className={`p-6 sm:p-8 bg-gradient-to-r ${essay.coverGradient} border-b border-warm-border/60 relative`}>
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-warm-text flex items-center justify-center shadow-warm-sm border border-warm-border transition-transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-semibold text-warm-text-muted">
                <span className="inline-flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full border border-warm-border/40">
                  <Calendar className="w-3.5 h-3.5 text-warm-peach" />
                  {essay.date}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full border border-warm-border/40">
                  <Clock className="w-3.5 h-3.5 text-warm-coral" />
                  {essay.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-text leading-tight mb-3">
                {essay.title}
              </h2>

              <div className="flex flex-wrap gap-2">
                {essay.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/60 text-xs font-medium text-warm-text border border-warm-border/30"
                  >
                    <Tag className="w-3 h-3 text-warm-peach" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Markdown Content Area */}
            <div className="p-6 sm:p-10 overflow-y-auto flex-1 text-warm-text space-y-4 prose prose-warm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="hidden">{children}</h1>,
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-warm-text mt-6 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-warm-peach" />
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl font-bold font-display text-warm-text mt-5 mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm sm:text-base leading-relaxed text-warm-text/90 my-3">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="p-4 rounded-2xl bg-warm-card-subtle border-l-4 border-warm-peach text-warm-text italic my-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="px-1.5 py-0.5 rounded-md bg-warm-peach/10 text-warm-peach font-mono text-xs font-medium">
                        {children}
                      </code>
                    ) : (
                      <pre className="p-4 rounded-2xl bg-[#282522] text-amber-100 font-mono text-xs overflow-x-auto my-4 shadow-warm-sm">
                        <code>{children}</code>
                      </pre>
                    );
                  }
                }}
              >
                {essay.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
