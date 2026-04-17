import React, { useState } from 'react';
import { useUser } from '../Contexts';
import { Button, Input } from '../components/UI';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Smartphone, User, FileText, Camera, Key } from 'lucide-react';
import { trackEvent } from '../utils/amplitude';

import { Logo } from '../components/Branding';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LoginScreen = () => {
  const { navigate } = useUser();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    if (password.length < 4) {
      setError('La contraseña es muy corta');
      return;
    }
    setError('');
    setLoading(true);
    trackEvent('login_started');
    setTimeout(() => {
      navigate('dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-20">
      <div className="flex-1 flex flex-col justify-center text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex justify-center"
        >
          <div className="flex flex-col items-center">
            <Logo size="xl" />
            <p className="text-brand-gray mt-2 font-medium">Tu billetera digital LATAM</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          <Input 
            placeholder="Email o número de cuenta" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            error={error && error.includes('correo') ? error : undefined}
          />
          <Input 
            placeholder="Contraseña" 
            type="password" 
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
            }}
            error={error && error.includes('contraseña') ? error : undefined}
          />
        </div>
        
        <button 
          onClick={() => navigate('forgot_password')}
          className="text-brand-orange text-sm font-semibold mt-4 text-right"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <div className="pb-10 space-y-4">
        <Button onClick={handleLogin} loading={loading}>
          Iniciar sesión
        </Button>
        <Button variant="outline" onClick={() => navigate('register_phone')}>
          Crear cuenta nueva
        </Button>
      </div>
    </div>
  );
};

export const ForgotPasswordScreen = () => {
  const { navigate } = useUser();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRecover = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate('login');
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-12">
      <div className="flex-1">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-6">
          <Key size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-3">Recuperar contraseña</h2>
        <p className="text-brand-gray mb-8">Ingresa tu correo para recibir un enlace de recuperación.</p>
        
        {!success ? (
          <Input 
            label="EMAIL DE RECUPERACIÓN" 
            placeholder="ejemplo@correo.com" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-500 font-medium">
            ¡Correo enviado! Serás redirigido al inicio de sesión.
          </div>
        )}
      </div>

      {!success && (
        <div className="pb-10">
          <Button onClick={handleRecover} disabled={!email}>
            Enviar correo
          </Button>
        </div>
      )}
    </div>
  );
};

export const RegisterPhoneScreen = () => {
  const { navigate } = useUser();
  const [phone, setPhone] = useState('');
  const [prefix, setPrefix] = useState('+57');

  const handleNext = () => {
    trackEvent('phone_submitted', { phone });
    navigate('register_data');
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-12">
      <div className="flex-1">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-6">
          <Smartphone size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-3">Tu número móvil</h2>
        <p className="text-brand-gray mb-8">Lo usaremos para asegurar tu cuenta y que tus amigos te encuentren.</p>
        
        <div className="flex gap-3">
          <div className="w-24 relative">
            <select 
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full h-[56px] bg-brand-card border border-brand-border rounded-xl px-4 text-white appearance-none focus:outline-none focus:border-brand-orange transition-colors"
            >
              <option value="+57">🇨🇴 +57</option>
              <option value="+52">🇲🇽 +52</option>
              <option value="+54">🇦🇷 +54</option>
              <option value="+56">🇨🇱 +56</option>
              <option value="+51">🇵🇪 +51</option>
              <option value="+58">🇻🇪 +58</option>
              <option value="+593">🇪🇨 +593</option>
            </select>
          </div>
          <div className="flex-1">
            <Input 
              placeholder="300 000 0000" 
              type="tel" 
              autoFocus 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="pb-10">
        <Button onClick={handleNext} disabled={!phone}>
          Continuar <ArrowRight size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export const RegisterDataScreen = () => {
  const { navigate, setUser, user } = useUser();
  const [formData, setFormData] = useState({ name: '', email: '', dob: '' });

  const handleNext = () => {
    setUser({ ...user, name: formData.name });
    navigate('kyc_doc');
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-12">
      <div className="flex-1 overflow-y-auto">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-6">
          <User size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-3">Datos personales</h2>
        <p className="text-brand-gray mb-8">Casi terminamos. Necesitamos algunos datos legales.</p>
        
        <div className="space-y-4">
          <Input 
            label="NOMBRE COMPLETO" 
            placeholder="Ej: María Rodríguez" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input 
            label="EMAIL" 
            type="email" 
            placeholder="maria@ejemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input 
            label="FECHA DE NACIMIENTO" 
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>
      </div>

      <div className="pb-10 pt-4">
        <Button onClick={handleNext} disabled={!formData.name || !formData.email}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export const KYCDocScreen = () => {
  const { navigate, user } = useUser();
  
  return (
    <div className="flex-1 flex flex-col px-6 pt-12">
      <div className="flex-1">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-6">
          <FileText size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-3">Validemos tu identidad</h2>
        <p className="text-brand-gray mb-8">Por seguridad y regulaciones financieras, necesitamos una foto de tu documento.</p>
        
        <div className="space-y-4">
          <div className="relative aspect-[1.6/1] bg-gradient-to-br from-[#E2E8F0] to-[#FFFFFF] rounded-3xl overflow-hidden shadow-lg border border-white/20">
            {/* Front of ID */}
            <div className="absolute inset-0 p-4 flex flex-col">
               <div className="flex justify-between items-center mb-2">
                 <div className="w-16 h-4 bg-blue-600/20 rounded-full" />
                 <span className="text-[8px] font-bold text-blue-600 tracking-widest">IDENTIFICACIÓN NACIONAL</span>
               </div>
               <div className="flex gap-4 flex-1">
                 <div className="w-20 h-24 bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center border border-white/50 shadow-inner">
                    <User size={40} className="text-gray-400" />
                 </div>
                 <div className="flex-1 space-y-2 pt-1">
                    <div>
                      <p className="text-[6px] font-bold text-gray-400 uppercase">Apellidos y Nombres</p>
                      <p className="text-xs font-black text-gray-800 uppercase leading-none">{user.name}</p>
                    </div>
                    <div>
                       <p className="text-[6px] font-bold text-gray-400 uppercase">Número de Documento</p>
                       <p className="text-sm font-black text-gray-800">1.023.456.789</p>
                    </div>
                    <div className="flex justify-between pb-1">
                       <div>
                         <p className="text-[6px] font-bold text-gray-400 uppercase">Fecha Nacimiento</p>
                         <p className="text-[8px] font-bold text-gray-800">14/05/1990</p>
                       </div>
                       <div>
                         <p className="text-[6px] font-bold text-gray-400 uppercase">Nacionalidad</p>
                         <p className="text-[8px] font-bold text-gray-800">COL</p>
                       </div>
                    </div>
                 </div>
               </div>
               <div className="w-full mt-2 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 rounded-full opacity-50" />
            </div>
            {/* Checkmark overlay */}
            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
              <CheckCircle2 size={16} />
            </div>
          </div>

          <div className="relative aspect-[1.6/1] bg-gradient-to-br from-[#E2E8F0] to-[#FFFFFF] rounded-3xl overflow-hidden shadow-lg border border-white/20 flex flex-col justify-center px-4">
             {/* Back of ID */}
             <div className="w-full h-8 bg-gray-800 mb-4 opacity-10 rounded-md" />
             <div className="flex justify-between items-center">
                <div className="w-20 h-20 bg-gray-300 rounded-md opacity-20 flex flex-wrap content-start p-1 gap-1">
                   {[...Array(9)].map((_, i) => <div key={i} className="w-5 h-5 bg-gray-400 rounded-sm" />)}
                </div>
                <div className="text-right space-y-1 w-24">
                   <div className="h-2 bg-gray-300 rounded-full w-full" />
                   <div className="h-2 bg-gray-300 rounded-full w-4/5 ml-auto" />
                   <div className="h-2 bg-gray-300 rounded-full w-full" />
                </div>
             </div>
             {/* Checkmark overlay */}
             <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
              <CheckCircle2 size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10">
        <Button onClick={() => navigate('kyc_selfie')}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export const KYCSelfieScreen = () => {
  const { navigate } = useUser();
  const [gifUrl] = useState(() => {
    // Escogemos aleatoriamente entre los 4 GIFs de Google Drive proporcionados
    const driveIds = [
      '1ACR-qYGmTfpdZiHgKGAhqbsaq-GhNHS3',
      '1Ht3u0cC_424bf3EOL-MsbmwGPLEXcUG1',
      '1MtxO_SnP1IjoF4FoqzrPHbE0VLCZHyD1',
      '1iDeDqWLQrYRd2sRIT3q2DoRjmFbcIPZ0'
    ];
    const targetId = driveIds[Math.floor(Math.random() * driveIds.length)];
    return `https://drive.google.com/thumbnail?id=${targetId}&sz=w800`;
  });

  return (
    <div className="flex-1 flex flex-col px-6 pt-12">
      <div className="flex-1 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-6">
          <Camera size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-3">Tómate una selfie</h2>
        <p className="text-brand-gray mb-12">Queremos asegurarnos que eres tú. Mantén tu rostro dentro del círculo.</p>
        
        <div className="relative w-64 h-64 flex items-center justify-center">
           {/* Círculo punteado rotando para simular monitoreo */}
           <div className="absolute inset-0 rounded-full border-4 border-brand-orange border-dashed opacity-80 animate-spin" style={{ animationDuration: '15s' }} />
           
           {/* Mascarilla circular para el GIF de la cámara */}
           <div className="absolute inset-2 rounded-full overflow-hidden bg-brand-card flex items-center justify-center">
              {gifUrl && (
                <img 
                   src={gifUrl} 
                   alt="Selfie preview en tiempo real" 
                   className="min-w-full min-h-full object-cover scale-110"
                   referrerPolicy="no-referrer"
                   onError={(e) => {
                     // Solo para asegurarnos que la app no colapse si falla.
                     e.currentTarget.onerror = null; 
                     e.currentTarget.src = 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=400&fit=crop&q=80';
                   }}
                />
              )}
              {/* Línea de escaneo láser */}
              <div className="absolute top-[40%] left-0 right-0 h-[3px] bg-brand-orange shadow-[0_0_15px_6px_rgba(255,92,26,0.6)] animate-pulse" />
           </div>

           {/* Insignia de cámara */}
           <div className="absolute bottom-2 right-2 w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-xl z-20 border-[3px] border-brand-bg">
              <Camera size={24} />
           </div>
        </div>
      </div>

      <div className="pb-10">
        <Button onClick={() => navigate('pin_create')}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export const PinCreateScreen = () => {
  const { navigate } = useUser();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const currentPin = step === 1 ? pin : confirmPin;
  const setCurrentPin = step === 1 ? setPin : setConfirmPin;

  const handleKeyClick = (k: string | number) => {
    setError('');
    if (k === '⌫') setCurrentPin(currentPin.slice(0, -1));
    else if (typeof k === 'number' && currentPin.length < 4) setCurrentPin(currentPin + k);
  };

  const handleNext = () => {
    if (step === 1 && pin.length === 4) {
      setStep(2);
    } else if (step === 2 && confirmPin.length === 4) {
      if (pin === confirmPin) {
        navigate('welcome');
      } else {
        setError('Los PINs no coinciden');
        setConfirmPin('');
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-12">
      <div className="flex-1 text-center">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange mb-6 mx-auto">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-3">{step === 1 ? 'Crea tu PIN' : 'Confirma tu PIN'}</h2>
        <p className="text-brand-gray mb-8">Será tu llave para autorizar transferencias y pagos.</p>
        
        <div className="flex justify-center gap-4 mb-4">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={cn(
                "w-12 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all",
                currentPin.length > i ? "border-brand-orange bg-brand-orange/5 text-white" : "border-brand-border text-brand-gray",
                error ? "border-red-500 bg-red-500/5 text-red-500" : ""
              )}
            >
              {currentPin[i] ? '•' : ''}
            </div>
          ))}
        </div>
        
        {error && <p className="text-red-500 text-sm font-bold mb-8">{error}</p>}
        {!error && <div className="mb-8" />}

        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((k, i) => (
            <button
              key={i}
              onClick={() => handleKeyClick(k)}
              className="h-16 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center text-xl font-bold active:bg-brand-orange/20"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-10 pt-8">
        <Button onClick={handleNext} disabled={currentPin.length < 4}>
          {step === 1 ? 'Continuar' : 'Guardar PIN'}
        </Button>
      </div>
    </div>
  );
};

export const WelcomeScreen = () => {
  const { navigate } = useUser();
  return (
    <div className="flex-1 flex flex-col px-6 items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8"
      >
        <CheckCircle2 size={64} />
      </motion.div>
      
      <h2 className="text-4xl font-bold mb-4">¡Todo listo!</h2>
      <p className="text-brand-gray mb-12 px-4 italic">
        Tu cuenta ha sido creada exitosamente. Ya puedes empezar a mover tu dinero.
      </p>

      <Button onClick={() => navigate('dashboard')}>
        Empezar ahora
      </Button>
    </div>
  );
};
