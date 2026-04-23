import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Eye, EyeOff, Trash2, Shield, Loader2, ArrowLeft } from 'lucide-react';
import { passwordClient, type PasswordAccount } from '../api/client';

export const FolderDetail = () => {
    const { folderName } = useParams<{ folderName: string }>();
    const navigate = useNavigate();

    // ESTADOS
    const [items, setItems] = useState<PasswordAccount[]>([]); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null); // Ahora se usa abajo
    const [busqueda, setBusqueda] = useState(''); 
    const [visibles, setVisibles] = useState<(number | string)[]>([]);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevaCuenta, setNuevaCuenta] = useState({ site: '', username: '', password: '' });

    // CARGAR DATOS
    const cargarCuentas = async () => {
        try {
            setCargando(true);
            setError(null); // Limpiamos errores previos
            const response = await passwordClient.getAll();
            
            if (Array.isArray(response.data)) {
                const filtrados = response.data.filter((d: PasswordAccount) => d.category === folderName);
                setItems(filtrados);
            }
        } catch (err: any) {
            // Guardamos el mensaje para que TypeScript lo lea en el render
            setError("No se pudo conectar con el servidor de contraseñas. Verifica que esté encendido.");
            console.error(err);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { 
        cargarCuentas(); 
    }, [folderName]);

    // GUARDAR
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
        } catch (err) {
            alert("Error al guardar la credencial.");
        }
    };

    // ELIMINAR
    const eliminarCuenta = async (id: number | string) => {
        if (!window.confirm("¿Seguro que quieres eliminar esta cuenta?")) return;
        try {
            await passwordClient.delete(id);
            await cargarCuentas();
        } catch (err) {
            alert("No se pudo eliminar la cuenta.");
        }
    };

    // --- OPCIÓN A: Muestra el error si existe ---
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
                <div className="bg-white p-8 rounded-[40px] shadow-xl border border-red-100 max-w-sm">
                    <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield size={32} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 mb-2">¡Ups! Algo salió mal</h2>
                    <p className="text-slate-500 text-sm mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                    >
                        REINTENTAR CONEXIÓN
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* NAV */}
            <nav className="bg-white border-b p-5 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2"><Shield size={24} /><span className="font-black">KRIPASS</span></div>
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 font-bold text-slate-600 hover:text-black transition-colors">
                    <ArrowLeft size={18} /> VOLVER
                </button>
            </nav>

            <main className="max-w-5xl mx-auto p-10">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-black uppercase text-slate-800">📂 {folderName}</h2>
                    <button onClick={() => setMostrarModal(true)} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all">
                        <Plus size={20} /> Nueva Cuenta
                    </button>
                </div>

                {/* BUSCADOR */}
                <div className="mb-8">
                    <input 
                        type="text" 
                        placeholder="🔍 Buscar por sitio..." 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                    />
                </div>

                {cargando ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-300" size={40} /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.filter(i => i.site.toLowerCase().includes(busqueda.toLowerCase())).map(item => (
                            <div key={item.id} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm relative hover:shadow-md transition-all">
                                <button onClick={() => eliminarCuenta(item.id!)} className="absolute top-6 right-6 text-slate-200 hover:text-red-500 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                                <h4 className="text-xl font-black mb-1 uppercase text-slate-700">{item.site}</h4>
                                <p className="text-slate-400 font-bold text-[10px] mb-6 tracking-widest uppercase">Usuario: {item.username}</p>
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <span className="font-mono font-bold text-slate-600">
                                        {visibles.includes(item.id!) ? item.password : '••••••••'}
                                    </span>
                                    <button className="text-slate-400 hover:text-slate-900" onClick={() => {
                                        const id = item.id!;
                                        setVisibles(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
                                    }}>
                                        {visibles.includes(item.id!) ? <EyeOff size={22} /> : <Eye size={22} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* MODAL */}
            {mostrarModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <form onSubmit={guardarCuenta} className="bg-white p-10 rounded-[40px] w-full max-w-md shadow-2xl border border-slate-100">
                        <h3 className="text-2xl font-black mb-6 text-slate-800">AÑADIR CREDENCIAL</h3>
                        <div className="space-y-4">
                            <input required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-slate-900 outline-none" placeholder="Sitio Web" value={nuevaCuenta.site} onChange={e => setNuevaCuenta({...nuevaCuenta, site: e.target.value})} />
                            <input required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-slate-900 outline-none" placeholder="Usuario / Email" value={nuevaCuenta.username} onChange={e => setNuevaCuenta({...nuevaCuenta, username: e.target.value})} />
                            <input required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-slate-900 outline-none" type="password" placeholder="Contraseña" value={nuevaCuenta.password} onChange={e => setNuevaCuenta({...nuevaCuenta, password: e.target.value})} />
                        </div>
                        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold mt-8 hover:bg-slate-800 transition-all shadow-lg uppercase tracking-tight">Guardar en {folderName}</button>
                        <button type="button" onClick={() => setMostrarModal(false)} className="w-full mt-4 text-slate-400 font-bold text-sm">CANCELAR</button>
                    </form>
                </div>
            )}
        </div>
    );
};