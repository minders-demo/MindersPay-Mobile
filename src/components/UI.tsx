import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  loading,
  className,
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-brand-orange text-white shadow-[0_8px_16px_rgba(255,92,26,0.2)]',
    secondary: 'bg-brand-card text-white',
    outline: 'bg-transparent border border-brand-border text-white',
    ghost: 'bg-transparent text-brand-gray'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "h-14 px-6 rounded-[20px] font-bold transition-all flex items-center justify-center gap-2",
        variants[variant],
        fullWidth && "w-full",
        loading && "opacity-70 pointer-events-none",
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
};

export const Input = ({ label, error, ...props }: { label?: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-[11px] font-bold text-brand-gray ml-1 uppercase tracking-widest">{label}</label>}
      <div className="relative">
        <input
          className={cn(
            "w-full h-14 bg-brand-card border border-brand-border rounded-[20px] px-4 text-white focus:outline-none focus:border-brand-orange transition-colors",
            error && "border-red-500"
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("bg-brand-card border border-brand-border rounded-[24px] p-6 shadow-sm", className)}>
    {children}
  </div>
);

export const BottomSheet = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title?: string; 
  children: ReactNode 
}) => {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        />
      )}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-brand-bg rounded-t-[32px] border-t border-brand-border z-[101] safe-pb overflow-hidden"
      >
        <div className="w-12 h-1.5 bg-brand-border rounded-full mx-auto mt-3 mb-6" />
        {title && (
          <div className="px-6 mb-4">
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        )}
        <div className="px-6 pb-8">
          {children}
        </div>
      </motion.div>
    </>
  );
};

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-brand-border/30 animate-pulse rounded-full", className)} />
);
