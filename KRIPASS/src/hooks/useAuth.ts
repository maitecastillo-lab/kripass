import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [usuario, setUsuario] = useState<{nombre: string, email: string} | null>(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  // useCallback para que la función de "Salir" sea estable
  const logout = useCallback(() => {
    setUsuario(null);
    setEstaAutenticado(false);
    // Aquí también limpiarías la "Llave de Acceso" de la memoria
    console.log("Sesión cerrada y memoria limpiada");
  }, []);

  const login = (nombre: string, email: string) => {
    setUsuario({ nombre, email });
    setEstaAutenticado(true);
  };

  return { usuario, estaAutenticado, login, logout };
};