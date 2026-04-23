import { useState, useEffect, useMemo, useCallback } from 'react';

// Definimos la estructura de una credencial para TypeScript
interface Credential {
  id: string;
  sitio: string;
  usuario: string;
  categoria: string;
}

export const useCredentials = () => {
  // useState: Gestiona los datos dinámicos (la lista y el texto de búsqueda)
  const [items, setItems] = useState<Credential[]>([]);
  const [busqueda, setBusqueda] = useState("");

  // useEffect: Maneja la carga inicial de datos (efecto secundario)
  useEffect(() => {
    // Simulamos la carga desde una API o base de datos
    const datosCargados = [
      { id: '1', sitio: 'Netflix', usuario: 'maite@mail.com', categoria: 'Ocio' },
      { id: '2', sitio: 'Gmail', usuario: 'maite.dev@mail.com', categoria: 'Trabajo' },
      { id: '3', sitio: 'Instagram', usuario: '@maite_design', categoria: 'Social' },
    ];
    setItems(datosCargados);
  }, []); // Se ejecuta solo una vez al arrancar

  // useCallback: Memoriza la función de borrar para evitar renders innecesarios
  const eliminarCredencial = useCallback((id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  }, []);

  // useMemo: Optimiza el filtrado de la lista para ahorrar recursos
  const credencialesFiltradas = useMemo(() => {
    console.log("Filtrando..."); // Para verificar que solo corre cuando debe
    return items.filter(item => 
      item.sitio.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [items, busqueda]); // Solo recalcula si cambia la lista o el texto buscado

  return {
    busqueda,
    setBusqueda,
    credencialesFiltradas,
    eliminarCredencial
  };
};