import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={`glass-panel rounded-3xl p-6 sm:p-8 transition-shadow duration-300 shadow-warm-sm hover:shadow-warm-md hover:border-warm-border-hover/60 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
