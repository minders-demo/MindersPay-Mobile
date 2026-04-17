import React, { useState } from 'react';
import { useUser, useMovements } from '../Contexts';
import { ScreenHeader } from '../components/Layout/MobileShell';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Share, Download } from 'lucide-react';
import { Button } from '../components/UI';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MovementsScreen = () => {
  const { navigate } = useUser();
  const { transactions } = useMovements();
  const [query, setQuery] = useState('');

  // Sort by date, newest first and filter by query
  const sortedTransactions = [...transactions]
    .filter(tx => 
      tx.concept.toLowerCase().includes(query.toLowerCase()) || 
      tx.category.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  // Group by date
  const groupedTransactions: Record<string, typeof transactions> = {};
  sortedTransactions.forEach(tx => {
    const date = new Date(tx.date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let dateKey = 'Historial';
    if (date.toDateString() === today.toDateString()) dateKey = 'Hoy';
    else if (date.toDateString() === yesterday.toDateString()) dateKey = 'Ayer';
    else {
      dateKey = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    if (!groupedTransactions[dateKey]) groupedTransactions[dateKey] = [];
    groupedTransactions[dateKey].push(tx);
  });

  return (
    <div className="flex-1 flex flex-col pb-24 h-screen overflow-hidden">
      <ScreenHeader title="Movimientos" />
      
      <div className="px-6 py-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" />
          <input 
            type="text" 
            placeholder="Buscar comercios o conceptos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 bg-brand-card border border-brand-border rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-brand-orange transition-colors text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-20">
        {Object.entries(groupedTransactions).map(([date, txs]) => (
          <div key={date} className="mb-8">
            <h3 className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-4 ml-1">{date}</h3>
            <div className="space-y-3">
              {txs.map((tx) => (
                <div 
                  key={tx.id} 
                  onClick={() => navigate('transaction_detail', tx)}
                  className="flex items-center gap-4 p-4 bg-brand-card rounded-2xl border border-transparent hover:border-brand-border active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-xl",
                    tx.type === 'incoming' 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-white/5 text-white"
                  )}>
                    {tx.type === 'incoming' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[14px] text-white truncate">{tx.concept}</p>
                    <p className="text-[11px] text-brand-gray font-medium">{tx.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-base font-black",
                      tx.type === 'incoming' ? 'text-green-500' : 'text-white'
                    )}>
                      {tx.type === 'incoming' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-brand-gray font-bold">{tx.status === 'completed' ? 'Completada' : 'Pendiente'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {sortedTransactions.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-center opacity-50">
             <div className="w-16 h-16 bg-brand-card rounded-3xl flex items-center justify-center mb-4">
                <Filter size={32} />
             </div>
             <p className="font-bold">No hay movimientos registrados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const TransactionDetailScreen = () => {
  const { screenData, navigate } = useUser();
  const tx = screenData;

  if (!tx) {
    return (
      <div className="flex-1 flex flex-col">
        <ScreenHeader title="Detalle" />
        <div className="flex-1 flex items-center justify-center">
          <p>Transacción no encontrada</p>
        </div>
      </div>
    );
  }

  const txDate = new Date(tx.date);
  const formattedDate = txDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  const formattedTime = txDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <ScreenHeader title="Detalle del movimiento" />
      
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className={cn(
            "w-20 h-20 rounded-[28px] flex items-center justify-center mb-6",
             tx.type === 'incoming' 
                ? "bg-green-500/10 text-green-500" 
                : "bg-white/5 text-white"
          )}>
            {tx.type === 'incoming' ? <ArrowDownLeft size={36} /> : <ArrowUpRight size={36} />}
          </div>
          
          <h2 className="text-4xl font-black text-white mb-2">
            {tx.type === 'incoming' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
          <p className="text-brand-gray font-medium text-lg">{tx.concept}</p>
        </div>

        <div className="bg-brand-card rounded-[32px] p-6 border border-brand-border space-y-6">
          <div className="flex justify-between items-center border-b border-brand-border pb-4">
            <span className="text-brand-gray text-sm font-medium">Estado</span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "w-2 h-2 rounded-full",
                tx.status === 'completed' ? "bg-green-500" : "bg-yellow-500"
              )} />
              <span className="font-bold text-white uppercase tracking-wider text-xs">
                {tx.status === 'completed' ? 'Completado' : 'Pendiente'}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center border-b border-brand-border pb-4">
            <span className="text-brand-gray text-sm font-medium">Fecha</span>
            <span className="font-bold text-white text-sm">{formattedDate}</span>
          </div>

          <div className="flex justify-between items-center border-b border-brand-border pb-4">
            <span className="text-brand-gray text-sm font-medium">Hora</span>
            <span className="font-bold text-white text-sm">{formattedTime}</span>
          </div>

          <div className="flex justify-between items-center border-b border-brand-border pb-4">
            <span className="text-brand-gray text-sm font-medium">Categoría</span>
            <span className="font-bold text-white text-sm">{tx.category}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-brand-gray text-sm font-medium">Referencia</span>
            <span className="font-mono text-xs font-bold text-brand-orange uppercase">{tx.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button className="h-14 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center gap-2 text-sm font-bold active:bg-brand-orange/10 transition-colors">
             <Share size={18} /> Compartir
          </button>
          <button className="h-14 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center gap-2 text-sm font-bold active:bg-brand-orange/10 transition-colors">
             <Download size={18} /> Comprobante
          </button>
        </div>
      </div>
      
      <div className="p-6 safe-pb pb-10">
        <Button onClick={() => navigate('dashboard')} className="uppercase tracking-widest text-sm">
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};
