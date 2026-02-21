import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}
export function Card({
  children,
  className = '',
  hoverEffect = true
}: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-dark-surface 
        rounded-2xl p-6 
        border border-gray-100 dark:border-gray-800
        shadow-sm transition-all duration-300
        ${hoverEffect ? 'hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20' : ''}
        ${className}
      `}>

      {children}
    </div>);

}