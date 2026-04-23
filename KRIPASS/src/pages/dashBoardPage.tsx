import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { LogOut, Shield, Folder, Plus, Loader2, Trash2 } from 'lucide-react';

interface FolderItem {
  id: number;
  name: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, usuario } = useAuthContext();

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

  const [carpetas, setCarpetas] = useState<FolderItem[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreCarpeta, setNombreCarpeta] = useState('');
  const [cargando, setCargando] = useState(true);

  const obtenerCarpetas = async () => {
    try {
      const res = await fetch(`${API_BASE}/folders`);
      if (res.ok) {
        const datos = await res.json();
        setCarpetas(datos);
      }
    } catch (e) {
      console.error('Error al conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCarpetas();
  }, []);

  const crearCarpeta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreCarpeta.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombreCarpeta.trim() })
      });

      if (res.ok) {
        setNombreCarpeta('');
        setMostrarModal(false);
        obtenerCarpetas();
      } else {
        const err = await res.json();
        alert(err.error || 'No se pudo crear la carpeta');
      }
    } catch {
      alert('Error al conectar con el servidor');
    }
  };

  const eliminarCarpeta = async (e: React.MouseEvent, nombre: string) => {
    e.stopPropagation(); // evita que navegue al entrar
    if (!window.confirm(`¿Eliminar la carpeta "${nombre}" y todas sus contraseñas?`)) return;

    try {
      const res = await fetch(`${API_BASE}/folders/${encodeURIComponent(nombre)}`, {
        method: 'DELETE'
      });
      if (res.ok) obtenerCarpetas();
    } catch {
      alert('Error al eliminar la carpeta');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white border-b p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <Shield className="text-slate-900" size={28} />
          <h1 className="text-2xl font-black tracking-tighter">KRIPASS</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-3 py-1 rounded-full">{usuario}</span>
          <button onClick={() => { logout(); navigate('/login'); }} className="text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={22} />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-10 w-full">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Mis Carpetas</h2>
            <p className="text-slate-500 font-medium italic text-sm">Organiza tus accesos por categorías.</p>
          </div>
          <button onClick={() => setMostrarModal(true)} className="bg-slate-900 text-white px-8 py-4 rounded-[24px] font-bold flex items-center gap-2 hover:bg-slate-800 shadow-xl transition-all active:scale-95">
            <Plus size={20} /> Nueva Carpeta
          </button>
        </div>

        {cargando ? (
          <div className="flex flex-col justify-center items-center py-32 gap-4">
            <Loader2 className="animate-spin text-slate-300" size={50} />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sincronizando...</p>
          </div>
        ) : carpetas.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[50px] border-2 border-dashed border-slate-200">
            <Folder size={60} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold text-lg">No hay carpetas todavía.</p>
            <p className="text-slate-300 text-sm">Crea una para empezar a guardar tus bancos o redes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {carpetas.map(folder => (
              <div
                key={folder.id}
                onClick={() => navigate(`/dashboard/${folder.name}`)}
                className="bg-white p-10 rounded-[45px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col items-center group relative"
              >
                <button
                  onClick={(e) => eliminarCarpeta(e, folder.name)}
                  className="absolute top-4 right-4 text-slate-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="w-20 h-20 bg-blue-50 rounded-[30px] flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-all duration-500">
                  <Folder size={40} className="text-blue-500 group-hover:text-white transition-colors" fill="currentColor" fillOpacity="0.1" />
                </div>
                <span className="font-black text-slate-700 uppercase text-xs tracking-[0.2em]">{folder.name}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      {mostrarModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <form onSubmit={crearCarpeta} className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-sm">
            <h3 className="text-2xl font-black text-slate-900 mb-6 italic">Nombre Carpeta</h3>
            <input
              autoFocus type="text" required placeholder="Ej: Bancos, Social..."
              className="w-full p-5 bg-slate-50 rounded-2xl outline-none mb-6 font-bold text-slate-700 border-2 border-transparent focus:border-slate-900 transition-all"
              value={nombreCarpeta} onChange={(e) => setNombreCarpeta(e.target.value)}
            />
            <button className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black shadow-lg">Crear Directorio</button>
            <button type="button" onClick={() => setMostrarModal(false)} className="w-full text-slate-400 mt-4 font-bold uppercase text-xs">Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};