import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'peach' | 'coral' | 'matcha' | 'neutral';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'peach',
  className = '',
  dot = false
}) => {
  const variantStyles = {
    peach: 'bg-warm-peach/15 text-[#C86A28] border-warm-peach/30',
    coral: 'bg-warm-coral/15 text-[#C04C33] border-warm-coral/30',
    matcha: 'bg-warm-matcha/15 text-[#4E7643] border-warm-matcha/30',
    neutral: 'bg-stone-100 text-warm-text-muted border-stone-200'
  };

  const dotColors = {
    peach: 'bg-warm-peach',
    coral: 'bg-warm-coral',
    matcha: 'bg-warm-matcha',
    neutral: 'bg-stone-400'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs md:text-sm font-medium rounded-full border shadow-warm-sm transition-all duration-300 ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
