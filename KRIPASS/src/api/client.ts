export interface PasswordAccount {
  id?: number;
  site: string;
  username: string;
  password?: string;
  category: string;
}

const API_URL = 'http://localhost:4000/api/v1/passwords';

// Exportamos el cliente para que FolderDetail pueda usarlo
export const passwordClient = {
  // 1. Obtener todas las cuentas (GET)
  async getAll(): Promise<PasswordAccount[]> {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al conectar con la API');
      return res.json();
  },

  // 2. Crear nueva cuenta (POST)
  async create(data: PasswordAccount): Promise<PasswordAccount> {
      const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error al guardar en el servidor');
      return res.json();
  },

  // 3. Eliminar cuenta (DELETE)
  async delete(id: number): Promise<void> {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('No se pudo borrar el registro');
  }
};
//hola