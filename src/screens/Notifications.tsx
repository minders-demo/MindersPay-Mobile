import React from 'react';
import { useNotifications, useUser } from '../Contexts';
import { AppNotification } from '../types';
import { ScreenHeader } from '../components/Layout/MobileShell';
import { motion } from 'motion/react';
import { Bell, CheckCircle, Info, AlertTriangle, ChevronRight, Inbox } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NotificationsScreen = () => {
  const { notifications, markAsRead } = useNotifications();
  const { goBack } = useUser();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={18} />;
      case 'alert': return <AlertTriangle className="text-brand-orange" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} min`;
    if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} horas`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex-1 flex flex-col pb-16">
      <ScreenHeader title="Notificaciones" />
      
      <div className="px-6 pt-6 flex-1 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => markAsRead(notif.id)}
                className={cn(
                  "p-5 rounded-[28px] border transition-all active:scale-[0.98] cursor-pointer relative overflow-hidden",
                  notif.read ? "bg-brand-card/30 border-brand-border/50" : "bg-brand-card border-brand-border shadow-lg"
                )}
              >
                {!notif.read && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-brand-orange/10 rounded-bl-[20px] flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-orange rounded-full" />
                  </div>
                )}
                
                <div className="flex gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    notif.read ? "bg-white/5 opacity-50" : "bg-white/10"
                  )}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className={cn(
                        "font-bold text-sm",
                        notif.read ? "text-brand-gray" : "text-white"
                      )}>
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-brand-gray font-bold uppercase">{formatDate(notif.date)}</span>
                    </div>
                    <p className={cn(
                      "text-xs leading-relaxed",
                      notif.read ? "text-brand-gray/70" : "text-brand-gray"
                    )}>
                      {notif.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 opacity-40">
            <div className="w-20 h-20 rounded-full bg-brand-card flex items-center justify-center mb-4">
              <Inbox size={40} className="text-brand-gray" />
            </div>
            <h3 className="font-bold text-lg">Todo al día</h3>
            <p className="text-sm max-w-[200px]">No tienes notificaciones pendientes por ahora.</p>
          </div>
        )}
      </div>
    </div>
  );
};
