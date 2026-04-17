import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../../Contexts';
import { Screen } from '../../types';
import { ChevronLeft, Home, ArrowUpRight, Grid, PieChart, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MobileShellProps {
  children: ReactNode;
  currentScreen: Screen;
}

export const MobileShell = ({ children, currentScreen }: MobileShellProps) => {
  const { goBack, navigate } = useUser();

  const hideBottomBar = [
    'login', 'forgot_password', 'register_phone', 'register_data', 'kyc_doc', 'kyc_selfie', 
    'kyc_review', 'pin_create', 'welcome', 'operation_success', 'card_request_confirm'
  ].includes(currentScreen);

  const navigationTabs = [
    { id: 'dashboard', label: 'Inicio', icon: Home },
    { id: 'transfer', label: 'Mover', icon: ArrowUpRight },
    { id: 'products', label: 'Productos', icon: Grid },
    { id: 'finance', label: 'Finanzas', icon: PieChart },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="flex justify-center items-center h-full w-full bg-[#050505]">
      {/* Device Frame (Desktop QA) / Full Screen (Mobile) */}
      <div className="relative w-full h-full max-w-[430px] bg-brand-bg flex flex-col md:h-dvh md:rounded-[48px] md:my-4 md:border-[8px] md:border-[#222] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Notch simulation - only visible on desktop wrapper */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#222] rounded-b-2xl z-[100] hidden md:block" />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth w-full h-full safe-pt">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentScreen}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="min-h-full flex flex-col"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        {!hideBottomBar && (
          <nav className="bg-brand-sidebar/80 backdrop-blur-[20px] border-t border-brand-border h-[84px] pb-6 px-3">
            <div className="flex justify-around items-center h-full">
              {navigationTabs.map((tab) => {
                let isActive = currentScreen === tab.id;
                
                if (tab.id === 'dashboard') {
                  isActive = isActive || ['movements', 'notifications'].includes(currentScreen);
                } else if (tab.id === 'products') {
                  isActive = isActive || ['cards_hub', 'pockets_hub', 'pocket_create', 'pocket_edit', 'card_data_view', 'card_pin_change', 'card_request_address', 'card_request_confirm', 'loans_hub', 'loan_request', 'loan_sign', 'insurance_hub'].includes(currentScreen);
                } else if (tab.id === 'profile') {
                  isActive = isActive || ['profile'].includes(currentScreen);
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => navigate(tab.id as Screen)}
                    className="flex flex-col items-center justify-center w-full h-full relative"
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "p-1.5 rounded-xl transition-colors",
                        isActive ? "text-brand-orange" : "text-brand-gray"
                      )}
                    >
                      <tab.icon size={24} />
                    </motion.div>
                    <span className={cn(
                      "text-[10px] font-medium transition-colors",
                      isActive ? "text-brand-orange" : "text-brand-gray"
                    )}>
                      {tab.label}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute -top-px left-1/4 right-1/4 h-0.5 bg-brand-orange rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export const ScreenHeader = ({ 
  title, 
  showBack = true, 
  action 
}: { 
  title: string; 
  showBack?: boolean; 
  action?: ReactNode;
}) => {
  const { goBack } = useUser();
  return (
    <header className="h-14 flex items-center justify-between px-4 safe-pt sticky top-0 bg-brand-bg/80 backdrop-blur-md z-50 border-b border-brand-border/50">
      <div className="w-10">
        {showBack && (
          <button onClick={goBack} className="p-2 -ml-2 text-brand-gray active:scale-90 transition-transform">
            <ChevronLeft size={24} />
          </button>
        )}
      </div>
      <h1 className="text-sm font-semibold tracking-tight text-white uppercase opacity-80">{title}</h1>
      <div className="w-10 flex justify-end">
        {action}
      </div>
    </header>
  );
};
