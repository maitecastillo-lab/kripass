import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  
  const [esRegistro, setEsRegistro] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorRealTime, setErrorRealTime] = useState('');

  // --- VALIDACIÓN EN TIEMPO REAL (Fase 3: Validación defensiva) ---
  useEffect(() => {
    if (esRegistro && password.length > 0) {
      // Expresión regular: Mínimo 6 caracteres, una Mayúscula y un Número
      const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (!regex.test(password)) {
        setErrorRealTime('Requisitos: 6 caracteres, una Mayúscula y un Número.');
      } else {
        setErrorRealTime('');
      }
    } else {
      setErrorRealTime('');
    }
  }, [password, esRegistro]);

  const manejarEnvio = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Bloqueo si no cumple los requisitos en modo registro
    if (esRegistro && errorRealTime) {
      setError('Por favor, cumple los requisitos de seguridad de la contraseña.');
      return;
    }

    const endpoint = esRegistro ? '/register' : '/login';
    const url = `http://localhost:4000/api/v1${endpoint}`;

    try {
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'Error en la conexión con el servidor');
      }

      // --- SOLUCIÓN AL ERROR DE TYPESCRIPT ---
      // Llamamos a login pasándole el 'usuario' como argumento string
      login(usuario); 
      
      // Ahora el context cambia a true y el App.tsx te permite pasar
      navigate('/dashboard');

    } catch (err: any) {
      if (err.message === 'Failed to fetch') {
        setError('El servidor está apagado. Enciende el backend.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 w-full max-w-md">
        
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight italic">KRIPASS</h1>
          <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-[0.2em]">
            {esRegistro ? 'Crear Nueva Cuenta' : 'Acceso al Baúl'}
          </p>
        </div>

        {/* ALERTA DE ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm border border-red-100 animate-in fade-in zoom-in duration-300">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 ml-1 tracking-widest uppercase">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-slate-300" size={18} />
              <input 
                type="text" 
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 transition-all"
                placeholder="Nombre de usuario"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 ml-1 tracking-widest uppercase">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-300" size={18} />
              <input 
                type={mostrarPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 outline-none text-slate-700 transition-all ${errorRealTime ? 'ring-2 ring-orange-200' : 'focus:ring-blue-500'}`}
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* FEEDBACK DE VALIDACIÓN (Punto 1.2 UX) */}
            {esRegistro && errorRealTime && (
              <p className="text-[11px] text-orange-600 font-bold ml-1 mt-2 flex items-center gap-1.5">
                <AlertCircle size={12} /> {errorRealTime}
              </p>
            )}
            {esRegistro && !errorRealTime && password.length > 5 && (
              <p className="text-[11px] text-green-600 font-bold ml-1 mt-2 flex items-center gap-1.5">
                <CheckCircle2 size={12} /> Contraseña segura
              </p>
            )}
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98] mt-4 uppercase tracking-wider text-sm">
            {esRegistro ? 'Registrarse' : 'Entrar al Sistema'}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-slate-100 pt-8">
          <button 
            type="button"
            onClick={() => { setEsRegistro(!esRegistro); setError(''); setPassword(''); }}
            className="text-blue-600 text-xs font-bold hover:text-blue-800 transition-colors tracking-tight"
          >
            {esRegistro ? '¿YA TIENES CUENTA? INICIA SESIÓN' : '¿NO TIENES CUENTA? REGÍSTRATE AQUÍ'}
          </button>
        </div>
      </div>
    </div>
  );
};