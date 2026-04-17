import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Logo = ({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg' | 'xl', className?: string }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={cn(
      "font-black tracking-[-0.05em] text-white leading-none",
      sizes[size],
      className
    )}>
      Minders<span className="text-brand-orange">Pay</span>
    </div>
  );
};
