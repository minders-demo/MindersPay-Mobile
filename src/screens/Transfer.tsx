import React, { useState } from 'react';
import { useUser, useMovements, useNotifications } from '../Contexts';
import { Button, Input, Card } from '../components/UI';
import { ScreenHeader } from '../components/Layout/MobileShell';
import { motion } from 'motion/react';
import { Search, Plus, ArrowRight, CheckCircle2, Share2, Download, Home, UserPlus } from 'lucide-react';
import { trackEvent } from '../utils/amplitude';
import { Logo } from '../components/Branding';

export const TransferScreen = () => {
  const { navigate } = useUser();
  const [search, setSearch] = useState('');

  const recentContacts = [
    { name: 'Papá', info: '+57 311 000 1122', emoji: '👨‍🦳' },
    { name: 'Mamá', info: '+57 322 000 3344', emoji: '👩‍🦳' },
    { name: 'Hermano menor', info: '+57 300 111 2233', emoji: '👦' },
    { name: 'Novia', info: '+57 315 222 4455', emoji: '💖' },
    { name: 'Abuelita', info: '+57 310 999 8877', emoji: '👵' },
    { name: 'Alquiler', info: 'Convenio #4829', emoji: '🏠' }
  ];

  const handleNext = () => {
    if (!search) return;
    navigate('transfer_amount', { name: search, info: 'Nuevo contacto' });
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="¿A quién envías?" />
      
      <div className="px-6 pt-4 flex-1 overflow-y-auto pb-10">
        <div className="mb-8">
          <Input 
            label="CELULAR, ID O ALIAS"
            placeholder="Ej: 300 000 0000" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
              onClick={handleNext}
              className="mt-3 flex items-center gap-2 text-brand-orange font-bold text-sm"
            >
              <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <Plus size={16} />
              </div>
              Enviar a "{search}"
            </button>
          )}
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-brand-gray text-[11px] uppercase tracking-widest mb-4">Contactos recientes</h3>
          <div className="grid grid-cols-3 gap-4">
            {recentContacts.map((contact) => (
              <div 
                key={contact.name}
                onClick={() => navigate('transfer_amount', contact)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-[24px] bg-brand-card border border-brand-border flex items-center justify-center text-2xl group-active:scale-90 transition-transform">
                  {contact.emoji}
                </div>
                <span className="text-[11px] font-bold text-white text-center line-clamp-1">{contact.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-brand-gray text-[11px] uppercase tracking-widest mb-4">Más opciones</h3>
          <button 
            onClick={() => navigate('transfer_add_contact')}
            className="w-full flex items-center justify-between p-5 bg-brand-card rounded-3xl border border-brand-border active:scale-[0.98] transition-all"
          >
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                  <UserPlus size={20} />
               </div>
               <span className="font-bold text-sm">Agregar nuevo contacto</span>
             </div>
             <ArrowRight size={18} className="text-brand-gray" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const TransferAddContactScreen = () => {
  const { navigate } = useUser();
  const [form, setForm] = useState({ name: '', id: '' });

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Nuevo contacto" />
      <div className="px-6 pt-8 space-y-6 flex-1">
        <Input 
          label="NOMBRE DEL CONTACTO" 
          placeholder="Ej: Juan Perez" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input 
          label="NÚMERO O ID" 
          placeholder="Ej: 300 123 4567" 
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
      </div>
      <div className="p-6 safe-pb pb-10">
        <Button 
          disabled={!form.name || !form.id}
          onClick={() => navigate('transfer_amount', { name: form.name, info: form.id })}
        >
          Guardar y continuar
        </Button>
      </div>
    </div>
  );
};

export const TransferAmountScreen = () => {
  const { navigate, screenData, user } = useUser();
  const [amount, setAmount] = useState('');
  
  const recipient = screenData || { name: 'Contacto', emoji: '👤' };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Monto a enviar" />
      
      <div className="px-6 flex-1 flex flex-col items-center justify-center -mt-12">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-[28px] bg-brand-card border border-brand-border flex items-center justify-center text-4xl mx-auto mb-4">
            {recipient.emoji || '👤'}
          </div>
          <p className="font-bold text-xl text-white">{recipient.name}</p>
          <p className="text-brand-gray text-sm">{recipient.info || 'Minders Pay'}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-bold text-brand-orange leading-none">$</span>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            autoFocus
            className="bg-transparent text-7xl font-black tracking-tighter text-center focus:outline-none w-64 placeholder:text-brand-border"
          />
        </div>
        <div className="px-4 py-2 bg-brand-card/50 rounded-full border border-brand-border">
          <p className="text-brand-gray text-xs font-bold uppercase tracking-widest">
            Disponible: <span className="text-white">${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </p>
        </div>
      </div>

      <div className="p-6 safe-pb">
        <Button 
          onClick={() => navigate('transfer_confirm', { ...recipient, amount: parseFloat(amount) })} 
          disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.balance}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export const TransferConfirmScreen = () => {
  const { navigate, screenData, user, setUser } = useUser();
  const { addTransaction } = useMovements();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);

  const data = screenData || { name: 'Contacto', amount: 0 };

  const handleTransfer = () => {
    setLoading(true);
    trackEvent('transfer_confirmed', { amount: data.amount });

    setTimeout(() => {
      const txAmount = data.amount;
      addTransaction({
        id: `TRX-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        type: 'outgoing',
        amount: txAmount,
        concept: `Transferencia a ${data.name}`,
        date: new Date().toISOString(),
        category: 'Transferencia',
        status: 'completed'
      });
      setUser({ ...user, balance: user.balance - txAmount });
      addNotification({
        title: 'Transferencia enviada',
        message: `La transferencia fue enviada a ${data.name} por un valor de $${txAmount.toFixed(2)}`,
        type: 'success'
      });
      navigate('operation_success', { ...data, type: 'Transferencia', reference: `TRX-${Math.floor(Math.random() * 1000000)}` });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Confirma tu envío" />
      
      <div className="px-6 pt-10 flex-1">
        <div className="bg-brand-card rounded-[32px] border border-brand-border p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Logo size="xl" />
          </div>
          
          <div className="text-center mb-10">
            <p className="text-brand-gray text-xs font-bold uppercase tracking-widest mb-2">Vas a enviar</p>
            <h2 className="text-5xl font-black text-white">${data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-brand-border pb-4">
              <span className="text-brand-gray text-sm font-medium">Destino</span>
              <div className="text-right">
                <p className="font-bold text-white text-base">{data.name}</p>
                <p className="text-xs text-brand-gray">{data.info || 'Minders Pay'}</p>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-brand-border pb-4">
              <span className="text-brand-gray text-sm font-medium">Dinero a debitar</span>
              <span className="font-bold text-white text-base">${data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-gray text-sm font-medium">Costo de envío</span>
              <span className="font-bold text-green-500 text-base">¡Gratis!</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 p-4 bg-brand-orange/5 rounded-2xl border border-brand-orange/20">
           <div className="text-brand-orange">🛡️</div>
           <p className="text-xs text-brand-gray leading-tight">Tu dinero está protegido. Verifica los datos antes de confirmar el envío.</p>
        </div>
      </div>

      <div className="p-6 safe-pb mt-auto">
        <Button onClick={handleTransfer} loading={loading}>
          Confirmar y enviar
        </Button>
      </div>
    </div>
  );
};

export const OperationSuccessScreen = () => {
  const { navigate, screenData } = useUser();
  const data = screenData || { amount: 0, recipient: 'Alguien', type: 'Transferencia' };
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="flex-1 flex flex-col pt-10">
      <div className="flex-1 flex flex-col items-center px-6">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8 border border-green-500/20"
        >
          <CheckCircle2 size={56} />
        </motion.div>
        
        <h2 className="text-3xl font-black mb-2 text-white">¡Operación Exitosa!</h2>
        <p className="text-brand-gray mb-10 font-medium">Tu transacción se ha procesado correctamente.</p>

        <div className="w-full bg-brand-card rounded-[32px] border border-brand-border p-8 relative overflow-hidden">
          {/* Zig zag separator mock */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-brand-bg opacity-10 flex gap-1">
             {[...Array(20)].map((_, i) => <div key={i} className="flex-1 h-full bg-brand-bg rotate-45 transform -translate-y-1/2" />)}
          </div>

          <div className="flex justify-between items-start mb-10">
             <div>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1">Monto Total</p>
                <h3 className="text-3xl font-black text-white">${data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1">Fecha y Hora</p>
                <p className="text-sm font-bold text-white">Hoy, {timeStr}</p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-y-8">
             <div>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1">Tipo de operación</p>
                <p className="text-sm font-bold text-white">{data.type || 'Transferencia'}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1">Destino</p>
                <p className="text-sm font-bold text-white">{data.name || data.recipient || 'Minders Pay'}</p>
             </div>
             <div>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1">Referencia</p>
                <p className="text-[11px] font-mono font-bold text-white">#{data.reference}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1">Estado</p>
                <div className="flex items-center justify-end gap-1 text-green-500">
                   <span className="text-sm font-bold">Aprobada</span>
                   <CheckCircle2 size={12} />
                </div>
             </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-10">
          <button className="h-14 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center gap-2 text-sm font-bold active:bg-brand-orange/10 transition-colors">
             <Share2 size={18} /> Compartir
          </button>
          <button className="h-14 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center gap-2 text-sm font-bold active:bg-brand-orange/10 transition-colors">
             <Download size={18} /> Descargar
          </button>
        </div>
      </div>

      <div className="p-6 safe-pb pb-10">
        <Button onClick={() => navigate('dashboard')} className="uppercase tracking-widest text-sm">
          <Home size={18} className="mr-2" /> Volver al Inicio
        </Button>
      </div>
    </div>
  );
};
