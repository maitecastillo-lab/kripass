import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Eye, EyeOff, Trash2, Shield, Loader2, ArrowLeft } from 'lucide-react';

import { passwordClient, type PasswordAccount } from '../api/client';

export const FolderDetail = () => {
    const { folderName } = useParams<{ folderName: string }>();
    const navigate = useNavigate();

    const [items, setItems] = useState<PasswordAccount[]>([]); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState(''); // <--- AGREGADO setBusqueda
    const [visibles, setVisibles] = useState<number[]>([]);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevaCuenta, setNuevaCuenta] = useState({ site: '', username: '', password: '' });

    const cargarCuentas = async () => {
        try {
            setCargando(true);
            const datos = await passwordClient.getAll();
            if (Array.isArray(datos)) {
                const filtrados = datos.filter(d => d.category === folderName);
                setItems(filtrados);
            }
            setError(null);
        } catch (err: any) {
            setError("No se pudo conectar con el servidor");
            console.error("Error en la carga:", err);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarCuentas();
    }, [folderName]);

    const guardarCuenta = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await passwordClient.create({
                ...nuevaCuenta,
                category: folderName || 'General'
            });
            setMostrarModal(false);
            setNuevaCuenta({ site: '', username: '', password: '' });
            await cargarCuentas();
        } catch (err: any) {
            alert("Error al guardar");
        }
    };

    const eliminarCuenta = async (id: number) => {
        if (!window.confirm("¿Eliminar?")) return;
        try {
            await passwordClient.delete(id);
            await cargarCuentas();
        } catch (err) {
            alert("Error al eliminar");
        }
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-500 font-bold">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 bg-slate-900 text-white p-2 rounded">Reintentar</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <nav className="bg-white border-b p-5 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2"><Shield size={24} /><span className="font-black">KRIPASS</span></div>
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2"><ArrowLeft size={18} /> VOLVER</button>
            </nav>

            <main className="max-w-5xl mx-auto p-10">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-black uppercase">📂 {folderName}</h2>
                    <button onClick={() => setMostrarModal(true)} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl">
                        <Plus size={20} /> Nueva Cuenta
                    </button>
                </div>

                {/* --- BUSCADOR AGREGADO --- */}
                <div className="mb-8">
                    <input 
                        type="text" 
                        placeholder="🔍 Buscar por sitio..." 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                    />
                </div>
                {/* ------------------------- */}

                {cargando ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-300" size={40} /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.filter(i => i.site.toLowerCase().includes(busqueda.toLowerCase())).map(item => (
                            <div key={item.id} className="bg-white p-8 rounded-[35px] border relative">
                                <button onClick={() => eliminarCuenta(item.id!)} className="absolute top-6 right-6 text-slate-200 hover:text-red-500"><Trash2 size={18} /></button>
                                <h4 className="text-xl font-black mb-1 uppercase">{item.site}</h4>
                                <p className="text-slate-400 font-bold text-[10px] mb-6 tracking-widest uppercase">User: {item.username}</p>
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border">
                                    <span className="font-mono">{visibles.includes(item.id!) ? item.password : '••••••••'}</span>
                                    <button onClick={() => setVisibles(prev => prev.includes(item.id!) ? prev.filter(id => id !== item.id) : [...prev, item.id!])}>
                                        {visibles.includes(item.id!) ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {mostrarModal && (
                <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50">
                    <form onSubmit={guardarCuenta} className="bg-white p-10 rounded-[40px] w-full max-w-md">
                        <h3 className="text-2xl font-black mb-6">NUEVA CUENTA</h3>
                        <input required className="w-full p-4 bg-slate-100 rounded-2xl mb-4" placeholder="Sitio" onChange={e => setNuevaCuenta({...nuevaCuenta, site: e.target.value})} />
                        <input required className="w-full p-4 bg-slate-100 rounded-2xl mb-4" placeholder="Usuario" onChange={e => setNuevaCuenta({...nuevaCuenta, username: e.target.value})} />
                        <input required className="w-full p-4 bg-slate-100 rounded-2xl mb-4" type="password" placeholder="Clave" onChange={e => setNuevaCuenta({...nuevaCuenta, password: e.target.value})} />
                        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">GUARDAR</button>
                        <button type="button" onClick={() => setMostrarModal(false)} className="w-full mt-2 text-slate-400">CANCELAR</button>
                    </form>
                </div>
            )}
        </div>
    );
};