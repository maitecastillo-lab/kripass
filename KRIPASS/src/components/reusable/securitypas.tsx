// src/components/reusable/SecurityPass.tsx

interface SecurityProps {
    nivel: number; // Recibe un número del 0 al 4
  }
  
  export const SecurityPass = ({ nivel }: SecurityProps) => {
    // 1. Configuramos los colores de la barra según el nivel
    const colores = [
      "bg-slate-200", // 0: Vacío
      "bg-red-500",   // 1: Muy débil
      "bg-orange-500", // 2: Débil
      "bg-yellow-500", // 3: Buena
      "bg-green-500"   // 4: Muy segura
    ];
  
    // 2. Configuramos los textos descriptivos
    const etiquetas = ["Sin clave", "Muy débil", "Débil", "Normal", "¡Segura!"];
  
    return (
      <div className="w-full mt-2">
        {/* Texto superior que indica el nivel actual */}
        <div className="flex justify-between mb-1">
          <span className="text-[11px] font-bold uppercase text-slate-500">Fuerza de la clave</span>
          <span className={`text-[11px] font-bold ${nivel > 0 ? 'text-slate-900' : 'text-slate-400'}`}>
            {etiquetas[nivel]}
          </span>
        </div>
  
        {/* Contenedor de la barra (fondo gris claro) */}
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          {/* La barra de color que crece dinámicamente */}
          <div 
            className={`h-full transition-all duration-500 ease-out ${colores[nivel]}`}
            style={{ width: `${(nivel / 4) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };