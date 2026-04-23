// src/components/reusable/CredentialCard.tsx
import { Button } from './button';
import { ShieldCheck } from 'lucide-react'; // Icono de seguridad profesional

interface CredentialProps {
  sitio: string;
  usuario: string;
  categoria: string;
  onCopy: () => void;
  onDelete: () => void;
}

export const CredentialCard = ({ sitio, usuario, categoria, onCopy, onDelete }: CredentialProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-400 transition-all group">
      {/* Parte izquierda: Info del sitio */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
          <ShieldCheck size={24} />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">
            {categoria}
          </span>
          <h3 className="text-lg font-bold text-slate-900">{sitio}</h3>
          <p className="text-sm text-slate-500">{usuario}</p>
        </div>
      </div>
      
      {/* Parte derecha: Botones reutilizables (Composición) */}
      <div className="flex gap-2">
        <Button label="Copiar" tipo="primario" onClick={onCopy} />
        <Button label="Borrar" tipo="peligro" onClick={onDelete} />
      </div>
    </div>
  );
};