
interface ButtonProps {
    label: string;    
    onClick: () => void;
    tipo?: 'primario' | 'peligro' | 'exito'; 
  }
  
  export const Button = ({ label, onClick, tipo = 'primario' }: ButtonProps) => {
    const estilos = {
      primario: "bg-blue-600 hover:bg-blue-700",
      peligro: "bg-red-600 hover:bg-red-700",
      exito: "bg-green-600 hover:bg-green-700"
    };
  
    return (
      <button 
        onClick={onClick}
        className={`${estilos[tipo]} text-white font-bold py-2 px-4 rounded-lg transition-all`}>
        {label}
      </button>
    );
  };