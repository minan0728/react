import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, X, Sparkles, AlertCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const SecretKeyDialog: React.FC = () => {
  const { isAuthDialogOpen, closeAuthDialog, verifyPassword } = useContent();
  const [password, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  if (!isAuthDialogOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyPassword(password);
    if (!success) {
      setError(true);
    } else {
      setError(false);
      setPasswordInput('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthDialog}
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-warm-card rounded-3xl p-6 sm:p-8 shadow-warm-lg border border-warm-border/80 z-10"
        >
          <button
            onClick={closeAuthDialog}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-warm-card-subtle text-warm-text flex items-center justify-center hover:scale-110 transition-transform"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-warm-peach/20 text-warm-peach flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-warm-text">
                专属内容工作台
              </h3>
              <p className="text-xs text-warm-text-muted">
                请输入管理员密钥以开启可视化编辑
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-semibold text-warm-text mb-1.5">
                管理员密码
              </label>
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  placeholder="默认初始密码：minan888"
                  value={password}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`w-full px-4 py-2.5 rounded-2xl bg-warm-card-subtle border text-sm text-warm-text placeholder:text-warm-text-muted/50 focus:outline-none focus:ring-2 focus:ring-warm-peach/50 transition-all ${
                    error ? 'border-rose-400 ring-2 ring-rose-300' : 'border-warm-border'
                  }`}
                />
                <KeyRound className="w-4 h-4 text-warm-text-muted/60 absolute right-3.5 top-3" />
              </div>
              {error && (
                <p className="flex items-center gap-1 text-xs text-rose-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>密码不正确，请重新输入</span>
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-warm-text-muted flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-warm-coral" />
                快捷键: Ctrl + Shift + E
              </span>

              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-warm-peach text-white text-xs font-semibold shadow-warm-sm hover:bg-[#E85B84] transition-colors"
              >
                验证并进入
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
