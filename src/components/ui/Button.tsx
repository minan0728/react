import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs md:text-sm rounded-full gap-1.5',
    md: 'px-6 py-2.5 text-sm md:text-base rounded-full gap-2 font-medium',
    lg: 'px-8 py-3.5 text-base md:text-lg rounded-full gap-2.5 font-semibold'
  };

  const variantStyles = {
    primary:
      'bg-warm-peach text-white shadow-warm-sm hover:bg-[#E8924F] hover:shadow-warm-glow border border-warm-peach/40',
    secondary:
      'bg-warm-card text-warm-text border border-warm-border hover:border-warm-peach/50 hover:bg-warm-card-subtle shadow-warm-sm',
    ghost:
      'bg-transparent text-warm-text hover:bg-warm-peach/10 hover:text-warm-peach',
    glass:
      'glass-panel text-warm-text hover:bg-white/90 hover:border-warm-peach/40 shadow-warm-sm'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center transition-colors duration-200 cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
