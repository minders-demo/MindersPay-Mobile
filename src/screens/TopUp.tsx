import React, { useState } from 'react';
import { useUser, useMovements, useNotifications } from '../Contexts';
import { Button, Input, Card } from '../components/UI';
import { ScreenHeader } from '../components/Layout/MobileShell';
import { motion } from 'motion/react';
import { Landmark, Store, Copy, CheckCircle2, QrCode, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/amplitude';

export const TopUpChannelScreen = () => {
  const { navigate } = useUser();

  const channels = [
    { id: 'bank', name: 'Transferencia bancaria', desc: 'PSE, Bancolombia, etc.', icon: Landmark, screen: 'topup_instructions' },
    { id: 'cash', name: 'Efectivo / Sucursales', desc: 'Surtimax, Éxito, Red serví', icon: Store, screen: 'topup_cash' }
  ];

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="¿Cómo quieres recargar?" />
      
      <div className="px-6 pt-6 space-y-4">
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => navigate(channel.screen as any)}
            className="w-full flex items-center gap-4 p-5 bg-brand-card rounded-3xl border border-brand-border active:scale-[0.98] transition-all"
          >
            <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
              <channel.icon size={28} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-white tracking-tight">{channel.name}</p>
              <p className="text-xs text-brand-gray font-medium">{channel.desc}</p>
            </div>
            <ArrowRight size={20} className="text-brand-gray" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const TopUpInstructionsScreen = () => {
  const { navigate, setUser, user } = useUser();
  const { addTransaction } = useMovements();
  const { addNotification } = useNotifications();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSimulate = () => {
    if (!amount) return;
    setLoading(true);
    
    setTimeout(() => {
      const val = parseFloat(amount);
      setUser({ ...user, balance: user.balance + val });
      addTransaction({
        id: `TOP-${Math.floor(Math.random() * 1000000)}`,
        type: 'incoming',
        amount: val,
        concept: 'Recarga PSE / Banco',
        date: new Date().toISOString(),
        category: 'Recarga',
        status: 'completed'
      });
      addNotification({
        title: 'Recarga exitosa',
        message: `Tu recarga por PSE de $${val.toFixed(2)} ha sido procesada correctamente.`,
        type: 'success'
      });
      navigate('operation_success', { amount: val, type: 'Recarga', recipient: 'Mi cuenta', reference: `REC-${Math.floor(Math.random() * 1000000)}` });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Datos de recarga" />
      
      <div className="px-6 pt-4 flex-1 overflow-y-auto">
        <Card className="mb-6">
           <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-4">Tus datos para recibir</p>
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-brand-gray">Banco</span>
                 <span className="font-bold text-white">Minders Pay (Financiera)</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-brand-gray">Tipo de cuenta</span>
                 <span className="font-bold text-white">Ahorros</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-brand-gray">Número</span>
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-white">311 000 1122</span>
                    <Copy size={14} className="text-brand-orange" />
                 </div>
              </div>
           </div>
        </Card>

        <Input 
          label="¿CUÁNTO VAS A RECARGAR?"
          placeholder="Ej: 50.00"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className="text-[11px] text-brand-gray mt-2 px-1 leading-relaxed">
          Usa estos datos para transferir desde cualquier banco vía PSE o transferencia directa.
        </p>
      </div>

      <div className="p-6 safe-pb pb-10">
        <Button onClick={handleSimulate} loading={loading} disabled={!amount}>
           Simular transferencia recibida
        </Button>
      </div>
    </div>
  );
};

export const TopUpCashScreen = () => {
  const { navigate, setUser, user } = useUser();
  const { addTransaction } = useMovements();
  const { addNotification } = useNotifications();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSimulate = () => {
    if (!amount) return;
    setLoading(true);
    
    setTimeout(() => {
      const val = parseFloat(amount);
      setUser({ ...user, balance: user.balance + val });
      addTransaction({
        id: `CASH-${Math.floor(Math.random() * 1000000)}`,
        type: 'incoming',
        amount: val,
        concept: 'Recarga corresponsal',
        date: new Date().toISOString(),
        category: 'Recarga',
        status: 'completed'
      });
      addNotification({
        title: 'Recarga en efectivo',
        message: `La recarga por corresponsal por un valor de $${val.toFixed(2)} fue exitosa.`,
        type: 'success'
      });
      navigate('operation_success', { amount: val, type: 'Recarga Efectivo', recipient: 'Mi cuenta' });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Recarga en efectivo" />
      
      <div className="px-6 pt-4 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center justify-center p-8 bg-brand-card rounded-[32px] border border-brand-border mb-8 text-center text-white">
           <p className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-4">Código de convenio: 65421</p>
           <QrCode size={180} className="mb-6 opacity-80" />
           <h3 className="text-3xl font-black tracking-tighter mb-1">982 174 205</h3>
           <p className="text-sm font-medium text-brand-gray">Vence en 15:00 min</p>
        </div>

        <Input 
          label="MONTO A RECARGAR"
          placeholder="Ej: 20.00"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="p-6 safe-pb pb-10">
        <Button onClick={handleSimulate} loading={loading} disabled={!amount}>
           Simular pago en sucursal
        </Button>
      </div>
    </div>
  );
};
