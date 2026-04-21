import React, { useState } from 'react';
import { useUser, useMovements } from '../Contexts';
import { ScreenHeader } from '../components/Layout/MobileShell';
import { Card, Button, Input } from '../components/UI';
import { 
  CreditCard, 
  Landmark, 
  PiggyBank, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Briefcase, 
  Plus, 
  Heart, 
  Umbrella, 
  Car, 
  Home, 
  ArrowRight, 
  Globe,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Wallet,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Sparkles,
  TrendingUp,
  Percent,
  Mail,
  Phone,
  User as UserIcon,
  MapPin,
  Camera,
  MoreHorizontal,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ProductsScreen = () => {
  const { navigate } = useUser();
  const sections = [
    {
      title: 'Cuentas y Tarjetas',
      items: [
        { id: 'cards_hub', label: 'Mis Tarjetas', icon: CreditCard, color: 'text-purple-500' },
        { id: 'pockets_hub', label: 'Bolsillos', icon: PiggyBank, color: 'text-pink-500' },
      ]
    },
    {
      title: 'Financiación',
      items: [
        { id: 'loans_hub', label: 'Préstamos', icon: Landmark, color: 'text-blue-500' },
        { id: 'insurance_hub', label: 'Seguros', icon: ShieldCheck, color: 'text-green-500' },
      ]
    },
    {
      title: 'Pagos y servicios',
      items: [
        { id: 'pay_services', label: 'Pago de servicios', icon: Zap, color: 'text-yellow-500' },
        { id: 'recharge_mobile', label: 'Recargas celular', icon: Smartphone, color: 'text-cyan-500' },
      ]
    },
    {
      title: 'Para tu negocio',
      items: [
        { id: 'business_dashboard', label: 'Perfil comercio', icon: Briefcase, color: 'text-orange-500' },
      ]
    }
  ];

  return (
    <div className="flex-1 pb-16">
      <ScreenHeader title="Mis Productos" showBack={false} />
      <div className="px-6 pt-4 space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-4 ml-1">{section.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              {section.items.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => navigate(item.id as any)}
                  className="bg-brand-card border border-brand-border p-5 rounded-[28px] flex flex-col items-center gap-3 active:scale-95 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color}`}>
                    <item.icon size={26} />
                  </div>
                  <span className="text-[13px] font-bold text-center leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CardsHubScreen = () => {
  const { navigate, user, setUser } = useUser();

  const cardActions = [
    { 
      id: 'physical', 
      label: 'Solicitar tarjeta física', 
      icon: CreditCard,
      onClick: () => navigate('card_request_address')
    },
    { 
      id: 'pin', 
      label: 'Configurar PIN', 
      icon: Lock, 
      onClick: () => navigate('card_pin_change') 
    },
    { 
      id: 'lock', 
      label: user.isCardLocked ? 'Desbloquear tarjeta' : 'Bloqueo temporal', 
      icon: user.isCardLocked ? Unlock : Lock,
      onClick: () => {
        setUser({ ...user, isCardLocked: !user.isCardLocked });
      }
    },
    { 
      id: 'details', 
      label: 'Ver datos de tarjeta', 
      icon: Eye, 
      onClick: () => navigate('card_data_view') 
    },
  ];

  return (
    <div className="flex-1 flex flex-col pb-16">
      <ScreenHeader title="Tarjetas" />
      
      <div className="px-6 pt-6 flex-1 overflow-y-auto">
        <motion.div 
          layoutId="card-main"
          className="relative aspect-[1.6/1] rounded-[32px] p-8 text-white overflow-hidden mb-12 shadow-2xl"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E2028] via-[#151820] to-[#0D0F14]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">DÉBITO VISA</p>
                <div className="w-10 h-6 bg-white/10 rounded-md backdrop-blur-md flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-brand-orange/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60 -ml-1.5" />
                  </div>
                </div>
              </div>
              <CreditCard className="opacity-40" />
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <span className="text-xl font-bold tracking-[0.3em]">••••</span>
                <span className="text-xl font-bold tracking-[0.3em]">••••</span>
                <span className="text-xl font-bold tracking-[0.3em]">••••</span>
                <span className="text-xl font-bold tracking-[0.1em]">8432</span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-1">TITULAR</p>
                  <p className="text-sm font-black tracking-wider">{user.name.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-1">EXPIRA</p>
                  <p className="text-sm font-black tracking-wider">08/29</p>
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
                <Lock className="text-brand-orange" size={40} />
                <p className="font-bold text-sm">Tarjeta bloqueada</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="space-y-3">
          {cardActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="w-full flex items-center justify-between p-5 bg-brand-card rounded-3xl border border-brand-border active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-brand-gray group-active:text-brand-orange transition-colors">
                  <action.icon size={20} />
                </div>
                <span className="font-bold text-sm text-white">{action.label}</span>
              </div>
              <ArrowRight size={18} className="text-brand-gray" />
            </button>
          ))}
        </div>

        <div className="mt-10">
          <Button onClick={() => alert('Próximamente estaremos habilitando nuevas franquicias.')}>
            <Plus size={20} className="mr-2" /> Solicitar nueva tarjeta
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CardDataViewScreen = () => {
  const { navigate, user } = useUser();
  const [showCvv, setShowCvv] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Datos de Tarjeta" />
      <div className="p-6 flex-1 flex flex-col pt-10">
        <div className="bg-brand-card border border-brand-border rounded-[32px] p-8 space-y-8 shadow-2xl">
           <div>
              <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-3">Número de tarjeta</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-black tracking-widest text-white">4532 8812 9901 8432</p>
                <div className="p-2 bg-white/5 rounded-lg active:scale-95 transition-transform" onClick={() => alert('Número copiado')}>
                   <Copy size={16} className="text-brand-gray" />
                </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">Vencimiento</p>
                <p className="text-lg font-black text-white">08/29</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">CVV</p>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-black text-white">{showCvv ? '123' : '•••'}</p>
                  <button onClick={() => setShowCvv(!showCvv)} className="text-brand-orange p-1 hover:bg-brand-orange/10 rounded-lg">
                    {showCvv ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
           </div>

           <div className="pt-8 border-t border-brand-border">
              <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">Titular</p>
              <p className="text-lg font-black text-white uppercase">{user.name}</p>
           </div>
        </div>

        <div className="mt-auto pb-10">
           <div className="flex items-center gap-3 p-4 bg-brand-orange/5 rounded-2xl border border-brand-orange/20 mb-8">
              <ShieldCheck size={20} className="text-brand-orange shrink-0" />
              <p className="text-[10px] text-brand-gray leading-normal italic">
                Tus datos están protegidos por encriptación de grado militar AES-256. Nunca reveles tu CVV.
              </p>
           </div>
           <Button onClick={() => navigate('cards_hub')}>
             Volver a tarjetas
           </Button>
        </div>
      </div>
    </div>
  );
};

export const CardPinChangeScreen = () => {
  const { navigate } = useUser();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('cards_hub');
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6"
        >
          <CheckCircle size={48} />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">¡PIN Actualizado!</h2>
        <p className="text-brand-gray">Tu nuevo PIN ha sido configurado correctamente.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-10">
      <div className="flex-1 text-center">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-6 mx-auto">
          <Smartphone size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-3">Cambiar PIN</h2>
        <p className="text-brand-gray mb-12">Elige un nuevo PIN de 4 dígitos para tus pagos físicos.</p>
        
        <div className="flex justify-center gap-4 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={cn(
                "w-12 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all",
                pin.length > i ? "border-brand-orange bg-brand-orange/5 text-white" : "border-brand-border text-brand-gray"
              )}
            >
              {pin[i] ? '•' : ''}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-[280px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((k, i) => (
            <button
              key={i}
              onClick={() => {
                if (k === '⌫') setPin(pin.slice(0, -1));
                else if (typeof k === 'number' && pin.length < 4) setPin(pin + k);
              }}
              className="h-14 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center text-xl font-bold active:bg-brand-orange/20 active:border-brand-orange transition-all"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleSave} loading={loading} disabled={pin.length < 4}>
          Actualizar PIN
        </Button>
      </div>
    </div>
  );
};

export const PocketsHubScreen = () => {
  const { user, navigate } = useUser();
  const totalSavings = user.pockets.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex-1 flex flex-col pb-16">
      <ScreenHeader title="Bolsillos" />
      <div className="px-6 pt-6 flex-1">
        <div className="bg-brand-card border border-brand-border p-8 rounded-[40px] mb-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-10">
              <PiggyBank size={64} className="text-brand-orange" />
           </div>
           <p className="text-brand-gray text-[10px] font-bold uppercase tracking-[2px] mb-1">Ahorro total</p>
           <h2 className="text-4xl font-black text-white">${totalSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
        </div>

        <div className="space-y-4">
           {user.pockets.map(pocket => (
             <div 
               key={pocket.id} 
               onClick={() => navigate('pocket_edit', pocket)}
               className="p-6 bg-brand-card border border-brand-border rounded-[32px] active:scale-[0.98] transition-all"
             >
                <div className="flex justify-between mb-3 items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
                        {pocket.emoji}
                      </div>
                      <div>
                        <span className="font-bold text-base block">{pocket.name}</span>
                        {pocket.deadline && (
                          <span className="text-[10px] text-brand-gray font-semibold uppercase tracking-wider">Meta: {pocket.deadline}</span>
                        )}
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="font-black text-white text-lg">${pocket.amount.toLocaleString()}</span>
                   </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${Math.min((pocket.amount / pocket.goal) * 100, 100)}%` }}
                     className="h-full bg-brand-orange rounded-full" 
                   />
                </div>
                <div className="flex justify-between mt-3 px-1">
                   <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Meta: ${pocket.goal.toLocaleString()}</span>
                   <span className="text-[10px] text-brand-orange font-bold">{(pocket.amount / pocket.goal * 100).toFixed(0)}%</span>
                </div>
             </div>
           ))}
        </div>
      </div>
      <div className="px-6 pb-6">
         <Button onClick={() => navigate('pocket_create')}><Plus size={18} className="mr-2" /> Crear nuevo bolsillo</Button>
      </div>
    </div>
  );
};

export const PocketCreateScreen = () => {
  const { navigate, user, setUser, goBack } = useUser();
  const { addTransaction } = useMovements();
  const [form, setForm] = useState({ name: '', goal: '', amount: '', emoji: '💰', deadline: '' });

  const handleCreate = () => {
    const amount = parseFloat(form.amount) || 0;
    const goal = parseFloat(form.goal) || 100;
    
    if (amount > user.balance) return;

    const newPocket = {
      id: Math.random().toString(36).substr(2, 9),
      name: form.name,
      amount: amount,
      goal: goal,
      emoji: form.emoji,
      deadline: form.deadline
    };

    if (amount > 0) {
      addTransaction({
        id: `TX-${Date.now()}`,
        type: 'outgoing',
        amount: amount,
        concept: `Carga inicial: ${form.name}`,
        date: new Date().toISOString(),
        category: 'Ahorro',
        status: 'completed'
      });
    }

    setUser({
      ...user,
      balance: user.balance - amount,
      pockets: [...user.pockets, newPocket]
    });

    goBack();
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Nuevo bolsillo" />
      <div className="px-6 pt-6 flex-1 space-y-6 overflow-y-auto pb-10">
        <div className="flex justify-center mb-4">
           <div className="w-20 h-20 bg-brand-card rounded-3xl border border-brand-border flex items-center justify-center text-4xl">
              {form.emoji}
           </div>
        </div>
        <Input label="NOMBRE DEL BOLSILLO" placeholder="Ej: Viaje a la playa" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <Input label="META DE AHORRO" type="number" placeholder="Monto total a ahorrar" value={form.goal} onChange={e => setForm({...form, goal: e.target.value})} />
        <Input label="CARGA INICIAL (OPCIONAL)" type="number" placeholder="Dinero disponible para iniciar" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
        <Input label="FECHA LÍMITE" type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} />
        
        <div className="grid grid-cols-4 gap-3">
           {['💰', '🏖️', '🏠', '🚗', '🎮', '💡', '🎓', '🏥'].map(e => (
             <button 
               key={e} 
               onClick={() => setForm({...form, emoji: e})}
               className={`h-14 rounded-2xl border transition-all ${form.emoji === e ? 'bg-brand-orange border-brand-orange text-white' : 'bg-brand-card border-brand-border'}`}
             >
                {e}
             </button>
           ))}
        </div>
      </div>
      <div className="p-6 safe-pb pb-10">
         <Button onClick={handleCreate} disabled={!form.name || !form.goal}>Crear Bolsillo</Button>
      </div>
    </div>
  );
};

export const PocketEditScreen = () => {
  const { screenData, user, setUser, goBack } = useUser();
  const { addTransaction } = useMovements();
  const pocket = screenData;
  const [moveAmount, setMoveAmount] = useState('');

  if (!pocket) return null;

  const handleTransaction = (type: 'add' | 'remove') => {
    const val = parseFloat(moveAmount);
    if (!val || val <= 0) return;

    if (type === 'add' && val > user.balance) return;
    if (type === 'remove' && val > pocket.amount) return;

    const pocketDiff = type === 'add' ? val : -val;
    const balanceDiff = -pocketDiff;

    addTransaction({
      id: `TX-${Date.now()}`,
      type: type === 'add' ? 'outgoing' : 'incoming',
      amount: val,
      concept: `${type === 'add' ? 'Abono' : 'Retiro'} de bolsillo: ${pocket.name}`,
      date: new Date().toISOString(),
      category: 'Ahorro',
      status: 'completed'
    });

    setUser({
      ...user,
      balance: user.balance + balanceDiff,
      pockets: user.pockets.map(p => p.id === pocket.id ? { ...p, amount: p.amount + pocketDiff } : p)
    });

    goBack();
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title={pocket.name} />
      <div className="px-6 pt-10 flex-1 flex flex-col items-center">
         <div className="w-24 h-24 bg-brand-card rounded-[32px] border border-brand-border flex items-center justify-center text-4xl mb-6">
            {pocket.emoji}
         </div>
         <p className="text-brand-gray text-[10px] font-bold uppercase tracking-widest mb-2">Saldo disponible en bolsillo</p>
         <h2 className="text-5xl font-black text-white mb-10">${pocket.amount.toLocaleString()}</h2>

         <div className="w-full space-y-6">
            <Input 
              label="MONTO A MOVER" 
              type="number" 
              placeholder="$ 0.00" 
              value={moveAmount} 
              onChange={e => setMoveAmount(e.target.value)} 
            />
            
            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => handleTransaction('add')}
                 disabled={!moveAmount}
                 className="h-16 rounded-[24px] bg-brand-card border border-brand-border flex items-center justify-center gap-3 font-bold active:scale-95 transition-all disabled:opacity-50"
               >
                  <ArrowUpRight className="text-green-500" /> Abonar
               </button>
               <button 
                 onClick={() => handleTransaction('remove')}
                 disabled={!moveAmount}
                 className="h-16 rounded-[24px] bg-brand-card border border-brand-border flex items-center justify-center gap-3 font-bold active:scale-95 transition-all disabled:opacity-50"
               >
                  <ArrowDownLeft className="text-brand-orange" /> Retirar
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export const LoansHubScreen = () => {
  const { navigate, user } = useUser();
  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Préstamos" />
      <div className="px-6 pt-6">
        <div className="p-8 bg-gradient-to-br from-brand-orange to-[#FF7A45] rounded-[40px] text-white overflow-hidden relative mb-8 shadow-2xl shadow-brand-orange/20">
           <Landmark size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12" />
           <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Cupo pre-aprobado</p>
           <h2 className="text-4xl font-black mb-6">US$ 15,000</h2>
           <Button className="bg-white text-brand-orange border-none h-12 px-6" onClick={() => navigate('loan_request')}>
             Solicitar ahora
           </Button>
        </div>

        {user.activeLoans && user.activeLoans.length > 0 && (
          <>
            <h3 className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-4 ml-1">Tus créditos activos</h3>
            <div className="space-y-4">
              {user.activeLoans.map(loan => (
                <div key={loan.id} className="p-6 bg-brand-card border border-brand-border rounded-[32px] flex items-center justify-between">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                         <Zap size={24} />
                      </div>
                      <div>
                         <p className="font-bold">{loan.name}</p>
                         <p className="text-xs text-brand-gray">Próxima cuota: {loan.nextInstallmentDate}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-black">US$ {loan.nextInstallmentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p 
                        className="text-[10px] text-brand-orange font-bold uppercase cursor-pointer"
                        onClick={() => navigate('loan_payment', { loan })}
                      >
                        Pagar
                      </p>
                   </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const LoanRequestScreen = () => {
  const { navigate } = useUser();
  const [amount, setAmount] = useState(5000);
  const [months, setMonths] = useState(24);
  
  const tea = 28.5;
  const mensalRate = Math.pow(1 + tea/100, 1/12) - 1;
  const lifeInsurance = 5.00;
  
  const monthlyInstallment = amount * (mensalRate * Math.pow(1 + mensalRate, months)) / (Math.pow(1 + mensalRate, months) - 1);
  const estimatedCuota = monthlyInstallment + lifeInsurance;

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Solicitar Crédito" />
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 space-y-8">
        <div>
          <h2 className="text-2xl font-black text-white mb-2 leading-tight">¡Tienes un crédito pre-aprobado!</h2>
          <p className="text-brand-gray text-sm leading-relaxed">Personaliza tu préstamo y recíbelo en minutos, sin papeleos.</p>
        </div>

        <div className="bg-brand-card border border-brand-border p-6 rounded-[32px] space-y-6">
           <div>
              <div className="flex justify-between items-center mb-4">
                 <label className="text-[11px] font-bold text-brand-gray uppercase tracking-widest">¿CUÁNTO NECESITAS?</label>
                 <span className="text-2xl font-black text-brand-orange">US$ {amount.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="15000" 
                step="100" 
                value={amount} 
                onChange={e => setAmount(parseInt(e.target.value))}
                className="w-full accent-brand-orange h-2 bg-white/5 rounded-full appearance-none mb-2"
              />
              <div className="flex justify-between text-[10px] font-bold text-brand-gray px-1">
                 <span>US$ 500.00</span>
                 <span>US$ 15,000.00</span>
              </div>
           </div>

           <div>
              <label className="text-[11px] font-bold text-brand-gray uppercase tracking-widest block mb-4">¿EN CUÁNTO TIEMPO QUIERES PAGARLO?</label>
              <div className="grid grid-cols-3 gap-3">
                 {[12, 24, 36, 48, 60, 72].map(m => (
                   <button 
                     key={m} 
                     onClick={() => setMonths(m)}
                     className={`h-12 rounded-2xl border transition-all text-sm font-bold ${months === m ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'bg-brand-sidebar border-brand-border text-brand-gray'}`}
                   >
                      {m} meses
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="bg-brand-orange/5 border border-brand-orange/20 p-8 rounded-[40px] text-center">
           <p className="text-brand-gray text-[10px] font-bold uppercase tracking-widest mb-2">CUOTA MENSUAL ESTIMADA</p>
           <h3 className="text-4xl font-extrabold text-brand-orange mb-2">US$ {estimatedCuota.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
           <p className="text-[10px] text-brand-gray font-medium">Incluye capital, intereses y seguro de vida.</p>
        </div>

        <div className="space-y-4">
           {[
             { icon: CheckCircle, label: 'Aprobación Inmediata', desc: 'Sin codeudor ni estudios de crédito adicionales.' },
             { icon: Wallet, label: 'Desembolso al Instante', desc: 'El dinero se abona directamente a tu cuenta.' }
           ].map((item, idx) => (
             <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                   <item.icon size={20} />
                </div>
                <div>
                   <p className="font-bold text-sm text-white">{item.label}</p>
                   <p className="text-xs text-brand-gray leading-tight mt-1">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="p-4 bg-brand-bg border-t border-brand-border">
         <Button onClick={() => navigate('loan_sign', { amount, months, cuota: estimatedCuota })}>
            Continuar a la firma <ArrowRight size={18} className="ml-2" />
         </Button>
      </div>
    </div>
  );
};

const SignaturePad = ({ setSigned, signed }: { setSigned: (s: boolean) => void, signed: boolean }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#FF5C1A'; // bg-brand-orange
    }
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { x, y } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { x, y } = getCoordinates(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
    setSigned(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
  };

  return (
    <div className="w-full h-full relative cursor-crosshair">
       <canvas 
         ref={canvasRef}
         className="w-full h-full absolute inset-0 touch-none rounded-3xl"
         onMouseDown={startDrawing}
         onMouseMove={draw}
         onMouseUp={stopDrawing}
         onMouseLeave={stopDrawing}
         onTouchStart={startDrawing}
         onTouchMove={draw}
         onTouchEnd={stopDrawing}
       />
       {!signed && (
         <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-4">
           <Plus size={32} className="text-brand-gray mb-2 opacity-50" />
           <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest opacity-70">
             Dibuja tu firma digital
           </p>
         </div>
       )}
       {signed && (
         <button 
           onClick={clearCanvas}
           onTouchEnd={clearCanvas}
           className="absolute top-3 right-3 text-[10px] bg-brand-bg px-3 py-1.5 rounded-full font-bold text-brand-gray/80 hover:text-white uppercase tracking-widest border border-brand-border z-10 transition-colors"
         >
           Borrar
         </button>
       )}
    </div>
  );
};

export const LoanPaymentScreen = () => {
  const { navigate, screenData, user, setUser, goBack } = useUser();
  const { addTransaction } = useMovements();
  const [payType, setPayType] = useState<'min' | 'total' | 'other'>('min');
  const [customAmount, setCustomAmount] = useState<number | ''>('');
  
  const loan = screenData?.loan;
  if (!loan) return <div className="p-8 text-white">Préstamo no encontrado</div>;

  const minAmount = loan.nextInstallmentAmount;
  const totalAmount = loan.remainingAmount;

  const getAmountToPay = () => {
    switch (payType) {
      case 'min': return minAmount;
      case 'total': return totalAmount;
      case 'other': return customAmount ? Number(customAmount) : 0;
    }
  };

  const amountToPay = getAmountToPay();
  
  const handlePayment = () => {
    if (amountToPay <= 0 || amountToPay > user.balance) return; // Basic validations

    // Add transaction to history
    addTransaction({
      id: `PAY-LOAN-${Date.now()}`,
      type: 'outgoing',
      amount: amountToPay,
      concept: `Pago Crédito (${loan.name})`,
      date: new Date().toISOString(),
      category: 'Préstamo',
      status: 'completed'
    });

    // Update user balance and remove or update the loan
    const newRemainingAmount = Math.max(0, loan.remainingAmount - amountToPay);
    let updatedLoans = user.activeLoans || [];
    
    if (newRemainingAmount === 0) {
      // Loan fully paid
      updatedLoans = updatedLoans.filter(l => l.id !== loan.id);
    } else {
      updatedLoans = updatedLoans.map(l => 
        l.id === loan.id ? { ...l, remainingAmount: newRemainingAmount } : l
      );
    }

    setUser({
      ...user,
      balance: user.balance - amountToPay,
      activeLoans: updatedLoans
    });

    navigate('operation_success', { 
      type: 'Pago Exitoso', 
      amount: amountToPay, 
      recipient: `Crédito: ${loan.name}`,
      reference: `PAY-${Math.floor(Math.random() * 1000000)}`
    });
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <ScreenHeader title="Pago de Crédito" />
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-16 space-y-6">
        <div>
           <h2 className="text-2xl font-black text-white mb-1 leading-tight">{loan.name}</h2>
           <p className="text-sm font-medium text-brand-gray">Elige cuánto deseas pagar</p>
        </div>

        <div className="space-y-4">
           {/* Cuota Mínima */}
           <div 
             className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer ${payType === 'min' ? 'border-brand-orange bg-brand-orange/10' : 'border-brand-border bg-brand-card hover:bg-brand-sidebar'}`}
             onClick={() => setPayType('min')}
           >
              <div className="flex justify-between items-center mb-1">
                 <p className="font-bold text-white">Cuota mínima sugerida</p>
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payType === 'min' ? 'border-brand-orange bg-brand-orange' : 'border-brand-gray'}`}>
                   {payType === 'min' && <div className="w-2 h-2 bg-white rounded-full" />}
                 </div>
              </div>
              <p className="text-2xl font-black text-brand-orange">US$ {minAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
           </div>

           {/* Pago Total */}
           <div 
             className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer ${payType === 'total' ? 'border-brand-orange bg-brand-orange/10' : 'border-brand-border bg-brand-card hover:bg-brand-sidebar'}`}
             onClick={() => setPayType('total')}
           >
              <div className="flex justify-between items-center mb-1">
                 <p className="font-bold text-white">Pago total de la deuda</p>
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payType === 'total' ? 'border-brand-orange bg-brand-orange' : 'border-brand-gray'}`}>
                   {payType === 'total' && <div className="w-2 h-2 bg-white rounded-full" />}
                 </div>
              </div>
              <p className="text-xl font-black text-white">US$ {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
           </div>

           {/* Otro valor */}
           <div 
             className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer ${payType === 'other' ? 'border-brand-orange bg-brand-orange/10' : 'border-brand-border bg-brand-card hover:bg-brand-sidebar'}`}
             onClick={() => setPayType('other')}
           >
              <div className="flex justify-between items-center mb-1">
                 <p className="font-bold text-white">Otro valor</p>
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payType === 'other' ? 'border-brand-orange bg-brand-orange' : 'border-brand-gray'}`}>
                   {payType === 'other' && <div className="w-2 h-2 bg-white rounded-full" />}
                 </div>
              </div>
              
              {payType === 'other' && (
                 <div className="mt-4">
                    <Input 
                      type="number"
                      placeholder="Ingrese el monto"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Number(e.target.value))}
                      autoFocus
                    />
                 </div>
              )}
           </div>
        </div>

        <div className="bg-brand-bg rounded-2xl p-4 border border-brand-border mt-4">
           <div className="flex justify-between text-sm mb-2">
              <span className="text-brand-gray">Saldo actual cuenta</span>
              <span className="text-white font-bold">US$ {user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
           </div>
           <div className="flex justify-between text-sm">
              <span className="text-brand-gray">Monto a pagar</span>
              <span className="text-brand-orange font-bold uppercase">- US$ {amountToPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
           </div>
        </div>
      </div>
      
      <div className="p-4 bg-brand-bg border-t border-brand-border">
         <Button 
           onClick={handlePayment} 
           disabled={amountToPay <= 0 || amountToPay > user.balance}
         >
            Confirmar y Pagar
         </Button>
      </div>
    </div>
  );
};

export const LoanSignScreen = () => {
  const { navigate, screenData, user, setUser } = useUser();
  const { addTransaction } = useMovements();
  const [signed, setSigned] = useState(false);
  const data = screenData;

  const handleConfirm = () => {
    addTransaction({
      id: `LOAN-${Date.now()}`,
      type: 'incoming',
      amount: data.amount,
      concept: `Desembolso Crédito (${data.months} meses)`,
      date: new Date().toISOString(),
      category: 'Préstamo',
      status: 'completed'
    });

    const newLoan = {
      id: `LOAN-${Date.now()}`,
      name: `Crédito Minders ${data.months}m`,
      totalAmount: data.amount,
      remainingAmount: data.amount,
      nextInstallmentDate: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      nextInstallmentAmount: data.cuota
    };

    setUser({
      ...user,
      balance: user.balance + data.amount,
      activeLoans: user.activeLoans ? [newLoan, ...user.activeLoans] : [newLoan]
    });

    navigate('operation_success', { 
      type: 'Desembolso Exitoso', 
      amount: data.amount, 
      recipient: user.name,
      reference: `CRED-${Math.floor(Math.random() * 1000000)}`
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Firmar Contrato" />
      <div className="px-6 pt-6 flex-1 overflow-y-auto space-y-6 pb-12">
         <div className="bg-brand-card p-6 rounded-3xl border border-brand-border space-y-4 h-64 overflow-y-auto text-xs text-brand-gray leading-relaxed">
            <h4 className="font-bold text-white uppercase mb-2">TÉRMINOS Y CONDICIONES DEL CRÉDITO</h4>
            <p>1. El prestatario acepta que el monto de US$ {data?.amount.toLocaleString()} será depositado inmediatamente.</p>
            <p>2. El plazo pactado es de {data?.months} meses con una tasa efectiva anual del 28.5%.</p>
            <p>3. El incumplimiento en el pago generará intereses de mora a la tasa máxima legal permitida.</p>
            <p>4. El prestatario autoriza a Minders Pay para realizar el cobro automático de la cuota mensual de su saldo disponible.</p>
            <p>...</p>
         </div>

         <div className="w-full h-48 bg-brand-sidebar border-2 border-dashed border-brand-border rounded-3xl flex flex-col items-center justify-center relative transition-colors">
            <SignaturePad setSigned={setSigned} signed={signed} />
         </div>

         <div className="flex items-start gap-3 p-4 bg-brand-orange/5 rounded-2xl border border-brand-orange/20">
            <ShieldCheck size={20} className="text-brand-orange shrink-0" />
            <p className="text-[10px] text-brand-gray leading-normal">Esta firma tiene la misma validez legal que una firma física, bajo las leyes de comercio electrónico vigentes.</p>
         </div>
      </div>
      <div className="p-6 safe-pb pb-10">
         <Button onClick={handleConfirm} disabled={!signed}>Finalizar y Recibir Dinero</Button>
      </div>
    </div>
  );
};

export const InsuranceHubScreen = () => {
  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Seguros" />
      <div className="px-6 pt-6 space-y-4">
        {[
          { name: 'Seguro de Vida', icon: Heart, desc: 'Protección para tu familia', color: 'text-red-500' },
          { name: 'Protección de pantalla', icon: Smartphone, desc: 'Para tu teléfono móvil', color: 'text-blue-400' },
          { name: 'Seguro de viajes', icon: Globe, desc: 'Asistencia global 24/7', color: 'text-brand-orange' },
          { name: 'SOAT / Automóvil', icon: Car, desc: 'Tu vehículo asegurado', color: 'text-purple-500' }
        ].map(ins => (
          <div key={ins.name} className="p-5 bg-brand-card border border-brand-border rounded-[32px] flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${ins.color}`}>
                   <ins.icon size={26} />
                </div>
                <div>
                   <p className="font-bold text-sm tracking-tight">{ins.name}</p>
                   <p className="text-xs text-brand-gray font-medium">{ins.desc}</p>
                </div>
             </div>
             <ArrowRight size={18} className="text-brand-gray" />
          </div>
        ))}
        
        <div className="pt-6">
           <h3 className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-4 ml-1">¿Necesitas ayuda?</h3>
           <Card className="bg-brand-sidebar border-brand-border p-6 flex flex-col gap-4">
              <p className="text-sm font-medium leading-relaxed">Nuestros asesores están disponibles para ayudarte a elegir el mejor seguro para ti.</p>
              <Button variant="outline">Hablar con un experto</Button>
           </Card>
        </div>
      </div>
    </div>
  );
};

export const FinanceScreen = () => {
  const { navigate } = useUser();
  const { transactions } = useMovements();
  const [timeframe, setTimeframe] = useState('Este mes');

  // Chart data calculation
  const chartData = [
    { name: 'Lun', egresos: 3500, ingresos: 4200 },
    { name: 'Mar', egresos: 2100, ingresos: 3800 },
    { name: 'Mie', egresos: 9500, ingresos: 2500 },
    { name: 'Jue', egresos: 4200, ingresos: 3100 },
    { name: 'Vie', egresos: 5100, ingresos: 2200 },
    { name: 'Sab', egresos: 4300, ingresos: 2800 },
    { name: 'Dom', egresos: 4800, ingresos: 3500 },
  ];

  // Logic to make "Hoy" coherent with real transactions
  const egresosReal = transactions
    .filter(tx => tx.type === 'outgoing' && new Date(tx.date).toDateString() === new Date().toDateString())
    .reduce((acc, tx) => acc + tx.amount, 0);
  const ingresosReal = transactions
    .filter(tx => tx.type === 'incoming' && new Date(tx.date).toDateString() === new Date().toDateString())
    .reduce((acc, tx) => acc + tx.amount, 0);

  // Map today to Sunday (last day in chart for example)
  chartData[6].egresos = egresosReal > 0 ? egresosReal : 3800;
  chartData[6].ingresos = ingresosReal > 0 ? ingresosReal : 3500;

  const categories = [
    { name: 'Supermercado', amount: 145200, color: '#FF5C1A' },
    { name: 'Servicios', amount: 85000, color: '#3B82F6' },
    { name: 'Entretenimiento', amount: 42500, color: '#A855F7' },
    { name: 'Transporte', amount: 28400, color: '#22C55E' },
    { name: 'Otros', amount: 15000, color: '#6B7280' },
  ];

  const insights = [
    {
      title: 'Ahorro potencial',
      description: 'Tus gastos en restaurantes subieron un 15%. Reducir 2 comidas fuera te ayudará a cumplir tu meta.',
      icon: TrendingUp,
      action: 'Crear bolsillo',
      screen: 'pocket_create'
    },
    {
      title: 'Dinero inactivo',
      description: 'Tienes $120.00 que no están generando rendimientos. Empieza a invertirlos.',
      icon: Sparkles,
      action: 'Ver préstamos',
      screen: 'loans_hub'
    },
    {
      title: 'Crédito disponible',
      description: 'Tienes un cupo pre-aprobado de $5,000.00 con tasa preferencial.',
      icon: Percent,
      action: 'Solicitar crédito',
      screen: 'loan_request'
    }
  ];

  return (
    <div className="flex-1 flex flex-col pb-12 h-screen overflow-hidden">
      <ScreenHeader title="Finanzas e Inversión" showBack={false} />
      
      <div className="flex-1 overflow-y-auto pt-6 px-6 pb-16 no-scrollbar">
        <div className="flex items-center justify-between mb-8">
           <div>
              <h2 className="text-2xl font-black text-white">Resumen IA</h2>
              <p className="text-brand-gray text-xs">Análisis inteligente de consumos</p>
           </div>
           <div className="flex bg-brand-card border border-brand-border rounded-xl p-1 shrink-0">
              {['Este mes', 'Anterior'].map(item => (
                <button 
                  key={item}
                  onClick={() => setTimeframe(item)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                    timeframe === item ? "bg-brand-orange text-white" : "text-brand-gray"
                  )}
                >
                  {item}
                </button>
              ))}
           </div>
        </div>

        {/* Chart Evolution */}
        <Card className="mb-8 p-6 overflow-hidden">
          <h3 className="text-sm font-bold mb-6 tracking-tight">Evolución de Ingresos vs Egresos</h3>
          <div className="h-64 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEgresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5C1A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF5C1A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3139" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E2028', border: '1px solid #2D3139', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="ingresos" 
                  stroke="#22C55E" 
                  fillOpacity={1} 
                  fill="url(#colorIngresos)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="egresos" 
                  stroke="#FF5C1A" 
                  fillOpacity={1} 
                  fill="url(#colorEgresos)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-brand-border">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest text-center">Ingresos</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest text-center">Egresos</span>
             </div>
          </div>
        </Card>

        {/* Categories Bar */}
        <Card className="mb-8 p-6">
           <h3 className="text-sm font-bold mb-6 tracking-tight">Gastos por categoría</h3>
           <div className="space-y-6">
              {categories.map(cat => (
                <div key={cat.name} className="space-y-2">
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{cat.name}</span>
                      <span className="text-xs font-black text-white">${cat.amount.toLocaleString()}</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${(cat.amount / 150000) * 100}%`, backgroundColor: cat.color }}
                      />
                   </div>
                </div>
              ))}
           </div>
        </Card>

        {/* AI Insights Slider */}
        <div className="mb-10">
           <h3 className="font-bold text-[16px] mb-4 flex items-center gap-2 px-1">
             <Sparkles size={18} className="text-brand-orange" />
             Insights IA
           </h3>
           <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
              {insights.map((insight, idx) => (
                <Card key={idx} className="min-w-[280px] p-6 border-l-4 border-l-brand-orange flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                   <div className="space-y-3">
                      <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                         <insight.icon size={20} />
                      </div>
                      <h4 className="font-bold text-white text-[15px]">{insight.title}</h4>
                      <p className="text-xs text-brand-gray leading-relaxed font-medium">{insight.description}</p>
                   </div>
                   <button 
                    onClick={() => navigate(insight.screen as any)}
                    className="mt-6 flex items-center gap-2 text-brand-orange text-xs font-bold active:scale-95 transition-transform"
                   >
                      {insight.action} <ArrowRight size={14} />
                   </button>
                </Card>
              ))}
           </div>
        </div>

        {/* Subscriptions Section (From Mockup) */}
        <div className="mb-20">
           <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-bold text-[16px]">Suscripciones Activas</h3>
              <span className="text-[10px] font-black text-red-500 uppercase">Total: $18.50/mes</span>
           </div>
           <Card className="p-0 overflow-hidden">
              {[
                { name: 'Netflix Premium', price: 8.50, next: '12 Nov', icon: 'N' },
                { name: 'Spotify Duo', price: 3.20, next: '15 Nov', icon: 'S' },
                { name: 'Gimnasio Tech', price: 6.80, next: '01 Nov', icon: 'G' }
              ].map((sub, i) => (
                <div key={i} className={cn(
                  "flex items-center justify-between p-5",
                  i !== 2 && "border-bottom border-brand-border"
                )}>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-sidebar rounded-xl flex items-center justify-center text-white font-black">
                         {sub.icon}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-white">{sub.name}</p>
                         <p className="text-[10px] text-brand-gray font-medium">Próximo cobro: {sub.next}</p>
                      </div>
                   </div>
                   <span className="text-sm font-black text-white">${sub.price.toFixed(2)}</span>
                </div>
              ))}
           </Card>
        </div>
      </div>
    </div>
  );
};

export const CardRequestAddressScreen = () => {
  const { navigate } = useUser();
  const [address, setAddress] = useState('');

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Dirección de envío" />
      <div className="px-6 pt-6 flex-1 space-y-8">
        <div>
          <h2 className="text-2xl font-black text-white mb-2">¿Dónde enviamos tu tarjeta?</h2>
          <p className="text-brand-gray text-sm">Confirma la dirección exacta para asegurar que recibas tu tarjeta física sin problemas.</p>
        </div>

        <Input 
          label="DIRECCIÓN DE ENTREGA" 
          placeholder="Ej: Av. Principal 123, Apto 402" 
          value={address} 
          onChange={e => setAddress(e.target.value)} 
        />

        {/* Simulated Map */}
        <div className="relative w-full h-48 bg-brand-sidebar rounded-[32px] border border-brand-border overflow-hidden group">
          <div className="absolute inset-0 bg-[#1a1c23] flex items-center justify-center opacity-40">
             <MapPin size={48} className="text-brand-orange animate-bounce" />
          </div>
          {/* Mock map pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/5">
             <p className="text-[10px] text-white font-bold opacity-80 uppercase tracking-widest">Ubicación aproximada</p>
             <p className="text-xs text-white/60 truncate">{address || 'Ingresa una dirección...'}</p>
          </div>
        </div>

        <div className="p-4 bg-brand-orange/5 rounded-2xl border border-brand-orange/20">
           <p className="text-[10px] text-brand-gray leading-relaxed font-medium">
             El envío es gratuito y el tiempo estimado de entrega es de <span className="text-brand-orange font-bold">5 a 7 días hábiles</span>.
           </p>
        </div>
      </div>

      <div className="p-6 safe-pb pb-10">
         <Button onClick={() => navigate('card_request_confirm', { address })} disabled={!address}>
           Confirmar dirección
         </Button>
      </div>
    </div>
  );
};

export const CardRequestConfirmScreen = () => {
  const { navigate, screenData } = useUser();
  const address = screenData?.address || 'Tu dirección confirmada';

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-24 h-24 bg-brand-orange rounded-full flex items-center justify-center text-white mb-8 shadow-[0_20px_40px_rgba(255,92,26,0.3)]"
      >
        <CheckCircle size={48} />
      </motion.div>
      
      <h2 className="text-3xl font-black mb-4">¡Solicitud recibida!</h2>
      <p className="text-brand-gray mb-8 leading-relaxed">
        Tu tarjeta física Minders Pay ha sido solicitada. La enviaremos a:
        <br />
        <span className="text-white font-bold block mt-2">{address}</span>
      </p>

      <div className="w-full space-y-3">
        <Button onClick={() => navigate('cards_hub')}>Cerrar</Button>
      </div>
    </div>
  );
};

export const ProfileScreen = () => {
  const { user, setUser } = useUser();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email || '',
    phone: user.phone
  });
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveAttempt = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false);
    setSaving(true);
    setTimeout(() => {
      setUser({
        ...user,
        name: form.name,
        email: form.email,
        phone: form.phone
      });
      setSaving(false);
      setShowSuccess(true);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-brand-bg">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6"
        >
          <CheckCircle size={56} />
        </motion.div>
        <h2 className="text-3xl font-black mb-2">¡Perfil actualizado!</h2>
        <p className="text-brand-gray mb-10 leading-relaxed">
          Tus datos personales han sido guardados correctamente en nuestra base de datos segura.
        </p>
        <Button onClick={() => setShowSuccess(false)}>Volver a Perfil</Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-16 h-screen overflow-hidden relative">
      <ScreenHeader title="Mi Perfil" />
      <div className="flex-1 overflow-y-auto pt-8 px-6 pb-16 no-scrollbar space-y-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer active:scale-95 transition-transform">
            <div className="w-28 h-28 rounded-[40px] bg-gradient-to-br from-brand-orange to-[#FF7A45] flex items-center justify-center overflow-hidden border-4 border-brand-border shadow-2xl">
              <span className="text-4xl font-black text-white italic">{form.name?.[0]}</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-card border border-brand-border rounded-2xl flex items-center justify-center text-brand-orange shadow-xl hover:bg-brand-orange hover:text-white transition-colors">
              <Camera size={18} />
            </div>
          </div>
          <h3 className="mt-4 font-black text-xl text-white tracking-tight">{form.name}</h3>
          <p className="text-xs text-brand-orange font-black tracking-widest uppercase mt-1 opacity-80">Usuario Nivel Gold</p>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-brand-gray uppercase tracking-widest ml-1 opacity-60">DATOS PERSONALES</h4>
            <div className="bg-brand-card border border-brand-border rounded-[32px] p-2 space-y-1">
               <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors rounded-3xl group">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                    <UserIcon size={20} />
                  </div>
                  <div className="flex-1">
                     <p className="text-[10px] font-extrabold text-brand-gray uppercase tracking-tighter mb-0.5">Nombre Completo</p>
                     <input 
                      className="w-full bg-transparent text-white font-bold text-sm outline-none border-none p-0 placeholder:text-brand-gray/30"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="Tu nombre"
                     />
                  </div>
               </div>
               <div className="h-px bg-brand-border mx-4 opacity-50" />
               <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors rounded-3xl group">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                     <p className="text-[10px] font-extrabold text-brand-gray uppercase tracking-tighter mb-0.5">Correo Electrónico</p>
                     <input 
                      className="w-full bg-transparent text-white font-bold text-sm outline-none border-none p-0 placeholder:text-brand-gray/30"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="tu@correo.com"
                     />
                  </div>
               </div>
               <div className="h-px bg-brand-border mx-4 opacity-50" />
               <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors rounded-3xl group">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div className="flex-1">
                     <p className="text-[10px] font-extrabold text-brand-gray uppercase tracking-tighter mb-0.5">Celular</p>
                     <input 
                      className="w-full bg-transparent text-white font-bold text-sm outline-none border-none p-0 placeholder:text-brand-gray/30"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="+57 000 000 0000"
                     />
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-brand-gray uppercase tracking-widest ml-1 opacity-60">SEGURIDAD</h4>
            <div className="bg-brand-card border border-brand-border rounded-[32px] p-1">
               {[
                 { label: 'Cambiar contraseña', icon: Lock },
                 { label: 'Autenticación biométrica', icon: Smartphone, toggle: true },
                 { label: 'Privacidad y datos', icon: ShieldCheck }
               ].map((item, idx) => (
                 <div key={idx} className={cn(
                   "flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-3xl",
                   idx !== 2 && "border-b border-brand-border"
                 )}>
                    <div className="flex items-center gap-4">
                       <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-brand-gray">
                          <item.icon size={18} />
                       </div>
                       <span className="text-sm font-bold text-white/80">{item.label}</span>
                    </div>
                    {item.toggle ? (
                      <div className="w-10 h-5 bg-brand-orange/20 rounded-full relative border border-brand-orange/30">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-brand-orange rounded-full" />
                      </div>
                    ) : (
                      <ArrowRight size={16} className="text-brand-gray" />
                    )}
                 </div>
               ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-brand-gray uppercase tracking-widest ml-1 opacity-60">SESIÓN</h4>
            <div className="bg-brand-card border border-brand-border rounded-[32px] p-1">
                 <button 
                   onClick={() => window.location.reload()}
                   className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-3xl group text-red-500"
                 >
                    <div className="flex items-center gap-4">
                       <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                          <ArrowDownLeft size={18} />
                       </div>
                       <span className="text-sm font-bold opacity-90">Cerrar sesión</span>
                    </div>
                 </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-brand-bg/80 backdrop-blur-xl border-t border-brand-border">
         <Button onClick={handleSaveAttempt} loading={saving}>Guardar Cambios</Button>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-card border border-brand-border rounded-[40px] p-8 w-full max-w-sm shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full -translate-y-12 translate-x-12" />
              
              <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-6">
                <ShieldCheck size={32} />
              </div>
              
              <h3 className="text-2xl font-black text-white mb-3">¿Confirmar cambios?</h3>
              <p className="text-brand-gray text-sm leading-relaxed mb-8">
                Estás a punto de actualizar tu información de contacto. Asegúrate de que los datos sean correctos para evitar problemas con tus servicios.
              </p>
              
              <div className="flex flex-col gap-3">
                <Button onClick={handleConfirmSave}>Sí, confirmar</Button>
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="py-4 text-brand-gray font-bold text-sm hover:text-white transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const BusinessDashboardScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
       <ScreenHeader title="Perfil de Comercio" showBack={true} />
       <div className="flex-1 flex flex-col items-center justify-center text-center pb-16">
          <div className="w-24 h-24 bg-brand-card rounded-full border-2 border-dashed border-brand-border flex items-center justify-center mb-6">
             <Briefcase size={40} className="text-brand-gray opacity-50" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Próximamente</h2>
          <p className="text-brand-gray max-w-xs">
            Estamos creando las mejores herramientas para que gestiones tu negocio desde Minders Pay.
          </p>
       </div>
    </div>
  );
};
