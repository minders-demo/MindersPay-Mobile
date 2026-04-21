import React, { useState } from 'react';
import { useUser, useMovements, useNotifications } from '../Contexts';
import { Button, Card, Skeleton } from '../components/UI';
import { ScreenHeader } from '../components/Layout/MobileShell';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  CreditCard, 
  QrCode, 
  Bell,
  Search,
  Eye,
  EyeOff,
  ChevronRight,
  Zap,
  Globe,
  Lock
} from 'lucide-react';
import { Logo } from '../components/Branding';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DashboardScreen = () => {
  const { user, navigate } = useUser();
  const { transactions } = useMovements();
  const { unreadCount } = useNotifications();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="flex-1 pb-16">
      <ScreenHeader 
        title="" 
        showBack={false}
        action={
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('profile')} className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center overflow-hidden border border-brand-orange/30">
              <span className="text-[10px] font-black text-brand-orange">{user.name.split(' ').map(n => n[0]).join('')}</span>
            </button>
            <button onClick={() => navigate('notifications')} className="relative">
              <Bell size={24} className="text-brand-gray" />
              {unreadCount > 0 && (
                <div className="absolute top-0 right-0 w-4 h-4 bg-brand-orange rounded-full border-2 border-brand-bg flex items-center justify-center">
                  <span className="text-[7px] font-black text-white">{unreadCount}</span>
                </div>
              )}
            </button>
          </div>
        }
      />
      {/* Absolute Logo Overlay in Header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-14 flex items-center z-[51] safe-pt pointer-events-none">
        <Logo size="md" />
      </div>

      <div className="px-5 mt-4">
        <div className="flex flex-col mb-6">
          <p className="text-brand-gray text-[14px] font-medium mb-1">Hola de nuevo,</p>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
        </div>

        <div className="bg-gradient-to-br from-brand-card to-[#151820] p-6 rounded-[24px] border border-brand-border mb-8 relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-brand-orange opacity-5 rounded-full" />
          
          <p className="text-brand-gray text-xs uppercase tracking-[1px] font-semibold mb-2">Balance total</p>
          
          <div className="flex items-baseline gap-1 mb-2">
            <h2 className="text-[42px] font-extrabold tracking-tight leading-none text-white">
              {showBalance ? `$${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
            </h2>
            <button onClick={() => setShowBalance(!showBalance)} className="text-brand-gray ml-2">
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          
          <div className="flex items-center gap-1.5 text-[#10B981] text-sm font-semibold">
            <ArrowUpRight size={14} /> +2.4% este mes
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { id: 'transfer', label: 'Enviar', icon: ArrowUpRight, isPrimary: true },
            { id: 'topup_channel', label: 'Recargar', icon: Plus, isPrimary: true },
            { id: 'pay_services', label: 'Pagar', icon: Zap, isPrimary: true },
            { id: 'products', label: 'Más', icon: Globe, isPrimary: false },
          ].map((action) => (
            <div 
              key={action.id}
              onClick={() => navigate(action.id as any)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90",
                action.isPrimary 
                  ? "bg-brand-orange text-white shadow-[0_8px_16px_rgba(255,92,26,0.2)]" 
                  : "bg-brand-card border border-brand-border text-brand-gray"
              )}>
                <action.icon size={26} />
              </div>
              <span className="text-[11px] font-semibold text-brand-gray">{action.label}</span>
            </div>
          ))}
        </div>

        {/* Pockets Summary Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[16px]">Bolsillos activos</h3>
            <button onClick={() => navigate('pockets_hub')} className="text-brand-orange text-[14px] font-semibold">
              Ver todos
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {user.pockets.slice(0, 2).map((pocket) => (
              <div 
                key={pocket.id}
                onClick={() => navigate('pockets_hub')}
                className="bg-brand-card border border-brand-border p-5 rounded-[24px] active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{pocket.emoji}</div>
                  <span className="font-bold text-xs truncate">{pocket.name}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-brand-gray font-bold uppercase">Ahorro</span>
                    <span className="text-xs font-black text-white">${pocket.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-orange rounded-full" 
                      style={{ width: `${Math.min((pocket.amount / pocket.goal) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {user.pockets.length === 0 && (
              <div 
                onClick={() => navigate('pocket_create')}
                className="col-span-2 p-6 bg-brand-card border border-brand-border border-dashed rounded-[24px] flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange group-active:scale-90 transition-transform">
                  <Plus size={20} />
                </div>
                <p className="text-xs font-bold text-brand-gray">Crea tu primer bolsillo</p>
              </div>
            )}
          </div>
        </div>

        {/* My Cards section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[16px]">Mis tarjetas</h3>
            <button onClick={() => navigate('cards_hub')} className="text-brand-orange text-[14px] font-semibold">
              Gestionar
            </button>
          </div>
          
          <div 
            onClick={() => navigate('cards_hub')}
            className="p-6 h-[180px] bg-gradient-to-r from-[#212529] to-[#000000] rounded-[24px] border border-white/5 shadow-2xl relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all"
          >
            {/* Glossy overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <Logo size="sm" className="mb-1" />
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Black Card</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md">
                   <div className="w-6 h-4 border border-white/40 rounded-sm" />
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg font-mono tracking-[4px] text-white/90">•••• •••• •••• 8432</p>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider">Vence</span>
                    <span className="text-xs font-bold text-white">08/29</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <span className="text-[10px] font-bold text-white uppercase italic tracking-tighter">Debit</span>
                    <div className="flex -space-x-2">
                       <div className="w-3 h-3 bg-[#EB001B] rounded-full opacity-80" />
                       <div className="w-3 h-3 bg-[#F79E1B] rounded-full opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {user.isCardLocked && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center flex-col gap-2 z-20"
                >
                  <Lock className="text-brand-orange" size={32} />
                  <p className="font-bold text-[10px] uppercase tracking-widest text-white">Tarjeta Bloqueada</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle background decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-orange opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity" />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[16px]">Últimos movimientos</h3>
            <button onClick={() => navigate('movements')} className="text-brand-orange text-[14px] font-semibold">
              Ver todo
            </button>
          </div>
          
          <div className="space-y-3">
            {transactions.slice(0, 3).map((tx) => (
              <div 
                key={tx.id} 
                onClick={() => navigate('transaction_detail', tx)}
                className="flex items-center gap-3 p-4 bg-brand-card rounded-2xl border border-transparent hover:border-brand-border active:scale-[0.98] transition-all"
              >
                <div className={cn(
                  "w-11 h-11 rounded-[12px] flex items-center justify-center text-lg",
                  tx.type === 'incoming' 
                    ? "bg-[#10B981]/10 text-[#10B981]" 
                    : "bg-brand-bg text-white"
                )}>
                  {tx.type === 'incoming' ? '💰' : tx.category === 'Comida' ? '☕' : '🧾'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-white truncate">{tx.concept}</p>
                  <p className="text-[12px] text-brand-gray font-medium">Hoy, 10:45 AM</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-[15px] font-bold",
                    tx.type === 'incoming' ? 'text-[#10B981]' : 'text-white'
                  )}>
                    {tx.type === 'incoming' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
