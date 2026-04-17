import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Transaction, Screen, AppNotification } from './types';

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  navigationStack: Screen[];
  setNavigationStack: (stack: Screen[]) => void;
  navigate: (screen: Screen, data?: any) => void;
  goBack: () => void;
  currentScreen: Screen;
  screenData: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: 'María Rodríguez',
    phone: '+57 300 456 7890',
    balance: 2847.50,
    currency: 'USD',
    isCardLocked: false,
    email: 'maria.rodriguez@email.com',
    pockets: [
      { id: '1', name: 'Viaje a Japón', amount: 800, goal: 2000, emoji: '✈️', deadline: '2025-12-01' },
      { id: '2', name: 'Fondo de Emergencia', amount: 500, goal: 1000, emoji: '🚨', deadline: '2026-06-01' },
      { id: '3', name: 'Cena Navidad', amount: 150, goal: 200, emoji: '🎄', deadline: '2025-12-24' }
    ],
    activeLoans: [
      {
        id: 'LOAN-123',
        name: 'Crédito Estudiantil',
        totalAmount: 2000,
        remainingAmount: 1200,
        nextInstallmentDate: '05 Mayo',
        nextInstallmentAmount: 120.40
      }
    ]
  });

  const [navigationStack, setNavigationStack] = useState<Screen[]>(['login']);
  const [screenDataStack, setScreenDataStack] = useState<any[]>([null]);

  const currentScreen = navigationStack[navigationStack.length - 1];
  const screenData = screenDataStack[screenDataStack.length - 1];

  const navigate = (screen: Screen, data?: any) => {
    setNavigationStack(prev => [...prev, screen]);
    setScreenDataStack(prev => [...prev, data || null]);
  };

  const goBack = () => {
    if (navigationStack.length > 1) {
      setNavigationStack(prev => prev.slice(0, -1));
      setScreenDataStack(prev => prev.slice(0, -1));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      navigationStack, 
      setNavigationStack, 
      navigate, 
      goBack, 
      currentScreen,
      screenData 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

// Movements Context
interface MovementsContextType {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

const MovementsContext = createContext<MovementsContextType | undefined>(undefined);

export const MovementsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'incoming',
      amount: 1250.00,
      concept: 'Depósito Nómina',
      date: new Date().toISOString(),
      category: 'Salario',
      status: 'completed'
    },
    {
      id: '2',
      type: 'outgoing',
      amount: 45.20,
      concept: 'Starbucks Coffee',
      date: new Date(Date.now() - 86400000).toISOString(),
      category: 'Comida',
      status: 'completed'
    },
    {
      id: 'history-1',
      type: 'outgoing',
      amount: 15.00,
      concept: 'Netflix',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      category: 'Entretenimiento',
      status: 'completed'
    },
    {
      id: 'history-2',
      type: 'outgoing',
      amount: 85.00,
      concept: 'Electricidad - Enel',
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      category: 'Servicios',
      status: 'completed'
    },
    {
      id: 'history-3',
      type: 'incoming',
      amount: 450.00,
      concept: 'Transferencia Recibida',
      date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      category: 'Transferencia',
      status: 'completed'
    },
    {
      id: 'history-4',
      type: 'outgoing',
      amount: 120.50,
      concept: 'Supermercado Éxito',
      date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      category: 'Mercado',
      status: 'completed'
    }
  ]);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  return (
    <MovementsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </MovementsContext.Provider>
  );
};

export const useMovements = () => {
  const context = useContext(MovementsContext);
  if (!context) throw new Error('useMovements must be used within MovementsProvider');
  return context;
};

// Notifications Context
interface NotificationsContextType {
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'date' | 'read'>) => void;
  markAsRead: (id: string) => void;
  unreadCount: number;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: '1',
      title: '¡Transferencia recibida!',
      message: 'Sergio te envió $200.00, increíble.',
      date: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'Nueva funcionalidad',
      message: 'Ahora puedes crear bolsillos para ahorrar más fácil.',
      date: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      type: 'info'
    }
  ]);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'date' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications must be used within NotificationsProvider');
  return context;
};
