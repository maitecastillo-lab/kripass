import React, { useState } from 'react';

export const CredentialForm = () => {
  const [sitio, setSitio] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // Función de validación con ReGex
  const validarPassword = (pass: string) => {
    const tieneMayuscula = /[A-Z]/.test(pass);
    const tieneNumero = /[0-9]/.test(pass);
    const tieneLongitud = pass.length >= 6;

    return tieneMayuscula && tieneNumero && tieneLongitud;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación del sitio
    if (sitio.trim() === '') {
      setMensajeError('El nombre del sitio es obligatorio.');
      return;
    }

    // Validación avanzada de la contraseña
    if (!validarPassword(password)) {
      setMensajeError('La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.');
      setMensajeExito('');
      return;
    }

    // Si todo está bien
    setMensajeExito('¡Credencial guardada con éxito!');
    setMensajeError('');
    setSitio('');
    setPassword('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Nueva Credencial</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre del Sitio</label>
          <input
            type="text"
            className="mt-1 block w-full border border-slate-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Ej. Netflix"
            value={sitio}
            onChange={(e) => setSitio(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Contraseña</label>
          <input
            type="password"
            className="mt-1 block w-full border border-slate-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-[10px] text-slate-400 mt-1 italic">
            * Min. 6 caracteres, 1 mayúscula y 1 número.
          </p>
        </div>

        {mensajeError && <p className="text-red-500 text-xs font-semibold">{mensajeError}</p>}
        {mensajeExito && <p className="text-green-600 text-xs font-semibold">{mensajeExito}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-bold"
        >
          Guardar Credencial
        </button>
      </form>
    </div>
  );
};