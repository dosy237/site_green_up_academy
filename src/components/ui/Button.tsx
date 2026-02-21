import React from 'react';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}
export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]';
  const variants = {
    primary:
    'bg-[#1FAB89] text-white hover:bg-[#15896B] shadow-lg hover:shadow-xl hover:shadow-[#1FAB89]/20 focus:ring-[#1FAB89] rounded-full',
    secondary:
    'bg-[#696969] text-white hover:bg-[#555555] shadow-lg hover:shadow-xl hover:shadow-[#696969]/20 focus:ring-[#696969] rounded-full',
    outline:
    'border-2 border-[#E0E0E0] text-[#2D2D2D] hover:border-[#1FAB89] hover:text-[#1FAB89] focus:ring-[#1FAB89] rounded-full bg-transparent',
    ghost:
    'text-[#2D2D2D] hover:bg-[#F0F0F0] rounded-xl'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5'
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}>

      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && icon && <span>{icon}</span>}
      {children}
    </button>);

}