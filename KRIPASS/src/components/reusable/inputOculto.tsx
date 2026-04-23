import { useState } from 'react';
// Importamos los iconos
import { Eye, EyeOff } from 'lucide-react'; 

interface InputSeguroProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const InputSeguro = ({ label, value, onChange, placeholder }: InputSeguroProps) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      
      <div className="relative">
        <input
          type={mostrar ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white pr-10"
        />
        
        <button
          type="button"
          onClick={() => setMostrar(!mostrar)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
        >
          {mostrar ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};