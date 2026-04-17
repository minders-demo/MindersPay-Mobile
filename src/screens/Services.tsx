import React, { useState } from 'react';
import { useUser, useMovements, useNotifications } from '../Contexts';
import { Button, Input, Card } from '../components/UI';
import { ScreenHeader } from '../components/Layout/MobileShell';
import { motion } from 'motion/react';
import { Search, ArrowRight, CheckCircle2, Zap, Wifi, Droplets, Tv, Phone } from 'lucide-react';

const LATAM_COUNTRIES = [
  { id: 'col', name: 'Colombia', flag: '🇨🇴' },
  { id: 'mex', name: 'México', flag: '🇲🇽' },
  { id: 'arg', name: 'Argentina', flag: '🇦🇷' },
  { id: 'chl', name: 'Chile', flag: '🇨🇱' },
  { id: 'per', name: 'Perú', flag: '🇵🇪' },
  { id: 'ven', name: 'Venezuela', flag: '🇻🇪' },
  { id: 'ecu', name: 'Ecuador', flag: '🇪🇨' }
];

const SERVICE_PROVIDERS: Record<string, any[]> = {
  col: [
    { id: 'enel', name: 'Enel Codensa', icon: Zap, category: 'Energía' },
    { id: 'etb', name: 'ETB', icon: Wifi, category: 'Internet' },
    { id: 'acueducto', name: 'Acueducto Bogotá', icon: Droplets, category: 'Agua' },
    { id: 'claro', name: 'Claro Hogar', icon: Tv, category: 'TV/Internet' }
  ],
  mex: [
    { id: 'cfe', name: 'CFE', icon: Zap, category: 'Energía' },
    { id: 'telmex', name: 'Telmex', icon: Wifi, category: 'Internet' },
    { id: 'izzy', name: 'Izzy', icon: Tv, category: 'TV' },
    { id: 'sacmex', name: 'Sacmex', icon: Droplets, category: 'Agua' }
  ],
  arg: [
    { id: 'edenor', name: 'Edenor', icon: Zap, category: 'Energía' },
    { id: 'aysa', name: 'AySA', icon: Droplets, category: 'Agua' },
    { id: 'fibertel', name: 'Fibertel', icon: Wifi, category: 'Internet' },
    { id: 'metrogas', name: 'Metrogas', icon: Zap, category: 'Gas' }
  ],
  chl: [
    { id: 'enel_cl', name: 'Enel Chile', icon: Zap, category: 'Energía' },
    { id: 'vtr', name: 'VTR', icon: Wifi, category: 'Internet' },
    { id: 'aguas_andinas', name: 'Aguas Andinas', icon: Droplets, category: 'Agua' },
    { id: 'movistar_hogar', name: 'Movistar Hogar', icon: Tv, category: 'TV/Internet' }
  ],
  per: [
    { id: 'enel_pe', name: 'Enel Perú', icon: Zap, category: 'Energía' },
    { id: 'telyco', name: 'Telefónica', icon: Wifi, category: 'Internet' },
    { id: 'sedapal', name: 'Sedapal', icon: Droplets, category: 'Agua' },
    { id: 'directv', name: 'DirecTV', icon: Tv, category: 'Televisión' }
  ],
  ven: [
    { id: 'corpoelec', name: 'Corpoelec', icon: Zap, category: 'Energía' },
    { id: 'cantv', name: 'Cantv', icon: Wifi, category: 'Internet' },
    { id: 'hidrocapital', name: 'Hidrocapital', icon: Droplets, category: 'Agua' },
    { id: 'simple_tv', name: 'Simple TV', icon: Tv, category: 'Televisión' }
  ],
  ecu: [
    { id: 'cnel', name: 'CNEL EP', icon: Zap, category: 'Energía' },
    { id: 'cnt', name: 'CNT', icon: Wifi, category: 'Internet' },
    { id: 'interagua', name: 'Interagua', icon: Droplets, category: 'Agua' },
    { id: 'claro_ecu', name: 'Claro Ecuador', icon: Tv, category: 'TV/Internet' }
  ]
};

const MOBILE_OPERATORS: Record<string, any[]> = {
  col: [{ id: 'claro', name: 'Claro', prefix: '+57' }, { id: 'movistar', name: 'Movistar', prefix: '+57' }, { id: 'tigo', name: 'Tigo', prefix: '+57' }, { id: 'wom', name: 'WOM', prefix: '+57' }],
  mex: [{ id: 'telcel', name: 'Telcel', prefix: '+52' }, { id: 'att', name: 'AT&T', prefix: '+52' }, { id: 'movistar', name: 'Movistar', prefix: '+52' }],
  arg: [{ id: 'personal', name: 'Personal', prefix: '+54' }, { id: 'movistar', name: 'Movistar', prefix: '+54' }, { id: 'claro', name: 'Claro', prefix: '+54' }],
  chl: [{ id: 'entel', name: 'Entel', prefix: '+56' }, { id: 'movistar_cl', name: 'Movistar', prefix: '+56' }, { id: 'wom_cl', name: 'WOM', prefix: '+56' }],
  per: [{ id: 'claro_pe', name: 'Claro', prefix: '+51' }, { id: 'movistar_pe', name: 'Movistar', prefix: '+51' }, { id: 'entel_pe', name: 'Entel', prefix: '+51' }, { id: 'bitel', name: 'Bitel', prefix: '+51' }],
  ven: [{ id: 'movilnet', name: 'Movilnet', prefix: '+58' }, { id: 'movistar_ve', name: 'Movistar', prefix: '+58' }, { id: 'digitel', name: 'Digitel', prefix: '+58' }],
  ecu: [{ id: 'claro_ec', name: 'Claro', prefix: '+593' }, { id: 'movistar_ec', name: 'Movistar', prefix: '+593' }, { id: 'cnt_ec', name: 'CNT Mobile', prefix: '+593' }]
};

export const PayServicesCountriesScreen = () => {
  const { navigate } = useUser();
  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Pago de Servicios" />
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-black text-white mb-2">Selecciona tu país</h2>
        <p className="text-brand-gray text-sm mb-6">Encontramos los servicios de tu región.</p>
        
        <div className="space-y-3">
          {LATAM_COUNTRIES.map(country => (
            <button
              key={country.id}
              onClick={() => navigate('pay_service_operators', country)}
              className="w-full flex items-center justify-between p-5 bg-brand-card rounded-3xl border border-brand-border active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{country.flag}</span>
                <span className="font-bold text-white">{country.name}</span>
              </div>
              <ArrowRight size={18} className="text-brand-gray" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PayServiceOperatorsScreen = () => {
  const { navigate, screenData } = useUser();
  const country = screenData || LATAM_COUNTRIES[0];
  const operators = SERVICE_PROVIDERS[country.id] || SERVICE_PROVIDERS['col'];

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title={`Servicios en ${country.name}`} />
      <div className="px-6 pt-6">
        <div className="space-y-4">
          {operators.map(op => (
            <button
              key={op.id}
              onClick={() => navigate('pay_service_query', { ...op, country })}
              className="w-full flex items-center gap-4 p-5 bg-brand-card rounded-3xl border border-brand-border active:scale-[0.98] transition-all"
            >
              <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                <op.icon size={24} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-white">{op.name}</p>
                <p className="text-xs text-brand-gray">{op.category}</p>
              </div>
              <ArrowRight size={18} className="text-brand-gray" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PayServiceQueryScreen = () => {
  const { navigate, screenData } = useUser();
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const service = screenData;

  const handleQuery = () => {
    setLoading(true);
    setTimeout(() => {
      const randomAmount = Math.floor(Math.random() * (120 - 20 + 1)) + 20;
      navigate('pay_services_confirm' as any, { ...service, account, amount: randomAmount });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title={service?.name || 'Consulta'} />
      <div className="px-6 pt-10 flex-1">
        <div className="flex flex-col items-center mb-10">
           <div className="w-20 h-20 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-4">
              {service?.icon && <service.icon size={40} />}
           </div>
           <h2 className="text-xl font-bold text-white text-center">Ingresa los datos de tu factura</h2>
        </div>

        <Input 
          label="NÚMERO DE CUENTA O CONVENIO"
          placeholder="Ej: 123456789"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <p className="text-[11px] text-brand-gray mt-4 leading-relaxed">
          El número de cuenta se encuentra en la parte superior derecha de tu factura física.
        </p>
      </div>

      <div className="p-6 safe-pb pb-10">
        <Button onClick={handleQuery} loading={loading} disabled={!account}>
          Consultar deuda
        </Button>
      </div>
    </div>
  );
};

// Reusing OperationSuccess for the payment
// But wait, the user wants a confirm screen first
export const PayServiceConfirmScreen = () => {
  const { navigate, screenData, user, setUser } = useUser();
  const { addTransaction } = useMovements();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const data = screenData;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      const amount = data.amount;
      setUser({ ...user, balance: user.balance - amount });
      addTransaction({
        id: `SVC-${Math.floor(Math.random() * 1000000)}`,
        type: 'outgoing',
        amount,
        concept: `Pago ${data.name}`,
        date: new Date().toISOString(),
        category: 'Servicios',
        status: 'completed'
      });
      addNotification({
        title: 'Pago de servicio',
        message: `El pago de ${data.name} por $${amount.toFixed(2)} fue exitoso.`,
        type: 'success'
      });
      navigate('operation_success', { 
        amount, 
        type: 'Pago de Servicio', 
        name: data.name, 
        reference: `PAY-${Math.floor(Math.random() * 1000000)}` 
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Confirmar Pago" />
      <div className="px-6 pt-10 flex-1">
        <Card className="p-8 text-center mb-8">
           <p className="text-brand-gray text-xs font-bold uppercase tracking-widest mb-2">Total a pagar</p>
           <h2 className="text-5xl font-black text-white mb-6">${data.amount.toFixed(2)}</h2>
           
           <div className="space-y-4 pt-6 border-t border-brand-border">
              <div className="flex justify-between text-sm">
                 <span className="text-brand-gray">Empresa</span>
                 <span className="font-bold text-white">{data.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-brand-gray">Referencia</span>
                 <span className="font-bold text-white">{data.account}</span>
              </div>
           </div>
        </Card>
      </div>

      <div className="p-6 safe-pb pb-10">
        <Button onClick={handlePay} loading={loading} disabled={user.balance < data.amount}>
           Pagar ahora
        </Button>
        {user.balance < data.amount && (
          <p className="text-center text-red-500 text-xs mt-4 font-bold">Saldo insuficiente</p>
        )}
      </div>
    </div>
  );
};

// MOBILE TOPUP SCREENS
export const MobileTopupCountriesScreen = () => {
  const { navigate } = useUser();
  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title="Recargas Celular" />
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-black text-white mb-2">Elige el país</h2>
        <div className="space-y-3 mt-6">
          {LATAM_COUNTRIES.map(country => (
            <button
              key={country.id}
              onClick={() => navigate('recharge_mobile_operators', country)}
              className="w-full flex items-center justify-between p-5 bg-brand-card rounded-3xl border border-brand-border active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{country.flag}</span>
                <span className="font-bold text-white">{country.name}</span>
              </div>
              <ArrowRight size={18} className="text-brand-gray" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MobileTopupOperatorsScreen = () => {
  const { navigate, screenData } = useUser();
  const country = screenData || LATAM_COUNTRIES[0];
  const operators = MOBILE_OPERATORS[country.id] || MOBILE_OPERATORS['col'];

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title={`Operadores en ${country.name}`} />
      <div className="px-6 pt-6">
        <div className="space-y-4">
          {operators.map(op => (
            <button
              key={op.id}
              onClick={() => navigate('recharge_mobile_amount', { ...op, country })}
              className="w-full flex items-center gap-4 p-5 bg-brand-card rounded-3xl border border-brand-border active:scale-[0.98] transition-all"
            >
              <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                <Phone size={24} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-white">{op.name}</p>
                <p className="text-xs text-brand-gray">Recarga prepago</p>
              </div>
              <ArrowRight size={18} className="text-brand-gray" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MobileTopupAmountScreen = () => {
  const { navigate, screenData, user, setUser } = useUser();
  const { addTransaction } = useMovements();
  const { addNotification } = useNotifications();
  const data = screenData;
  const [phone, setPhone] = useState(data?.prefix || '');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecharge = () => {
    setLoading(true);
    setTimeout(() => {
      const val = parseFloat(amount);
      setUser({ ...user, balance: user.balance - val });
      addTransaction({
        id: `TOP-${Math.floor(Math.random() * 1000000)}`,
        type: 'outgoing',
        amount: val,
        concept: `Recarga ${data.name} a ${phone}`,
        date: new Date().toISOString(),
        category: 'Recarga Celular',
        status: 'completed'
      });
      addNotification({
        title: 'Recarga celular',
        message: `La recarga de ${data.name} para el número ${phone} por $${val.toFixed(2)} fue exitosa.`,
        type: 'success'
      });
      navigate('operation_success', { amount: val, type: 'Recarga Celular', name: data.name, reference: `REC-${Math.floor(Math.random() * 1000000)}` });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScreenHeader title={`Recarga ${data?.name}`} />
      <div className="px-6 pt-8 flex-1 space-y-6">
         <Input label="NÚMERO DE TELÉFONO" placeholder="300 000 0000" value={phone} onChange={e => setPhone(e.target.value)} />
         <Input label="VALOR DE LA RECARGA" placeholder="Ej: 10.00" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="p-6 safe-pb pb-10">
        <Button onClick={handleRecharge} loading={loading} disabled={!phone || !amount || user.balance < parseFloat(amount)}>
          Confirmar recarga
        </Button>
      </div>
    </div>
  );
};
