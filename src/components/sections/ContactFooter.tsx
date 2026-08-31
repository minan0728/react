import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Tv,
  MessageCircle,
  Copy,
  Check,
  ArrowUp,
  Sparkles,
  Heart,
  LucideIcon
} from 'lucide-react';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { profileData } from '../../data/profile';

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  mail: Mail,
  bilibili: Tv,
  wechat: MessageCircle
};

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'minan@example.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="min-h-screen relative flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-gradient-to-t from-[#F5ECE0] via-[#FAF4EB] to-warm-bg border-t border-warm-border/80">
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-warm-peach/15 blur-[150px]" />
      </div>

      <Container className="relative z-10 my-auto w-full">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="peach" className="mb-4">
            ✦ Let's Connect
          </Badge>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-warm-text tracking-tight leading-tight mb-6">
            保持联系， <br />
            一起创造有温度的作品。
          </h2>

          <p className="text-sm sm:text-lg text-warm-text-muted max-w-xl mx-auto leading-relaxed mb-8">
            无论是交流计算机学习、前端探讨、还是单纯想交个朋友打声招呼，我的邮箱随时向你敞开。
          </p>

          {/* Email Quick Copy Box */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-3 p-2 pl-5 pr-2.5 rounded-full glass-panel border border-warm-peach/30 shadow-warm-md"
          >
            <Mail className="w-4 h-4 text-warm-peach" />
            <span className="text-xs sm:text-sm font-mono font-medium text-warm-text select-all">
              {email}
            </span>
            <Button
              size="sm"
              variant="primary"
              onClick={handleCopyEmail}
              icon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              className="py-1.5 px-3.5 text-xs"
            >
              {copied ? '已复制邮箱!' : '复制邮箱'}
            </Button>
          </motion.div>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-16">
          {profileData.socials.map((social) => {
            const Icon = iconMap[social.iconName] || Github;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="block group"
              >
                <Card className="p-5 flex items-center gap-4 hover:border-warm-peach/50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-warm-peach/15 text-warm-peach flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-warm-text group-hover:text-warm-peach transition-colors">
                      {social.label}
                    </h4>
                    <p className="text-xs text-warm-text-muted">{social.description}</p>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </Container>

      {/* Footer Bottom Bar */}
      <Container className="relative z-10 w-full pt-8 border-t border-warm-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-text-muted">
        <div className="flex items-center gap-2">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>by {profileData.name} · {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">Built with React & Vite & Tailwind</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel hover:text-warm-peach hover:border-warm-peach/40 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
};
