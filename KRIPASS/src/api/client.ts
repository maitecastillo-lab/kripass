import axios from 'axios';

export interface PasswordAccount {
  id?: number | string;
  site: string;
  username: string;
  password?: string;
  category: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1/passwords';

const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const passwordClient = {
  // GET -> Llama a getPasswords
  getAll: () => instance.get('/'),
  
  // POST -> Llama a createPassword (el middleware encriptará allí)
  create: (data: PasswordAccount) => instance.post('/', data),
  
  // DELETE -> Llama a deletePassword
  delete: (id: number | string) => instance.delete(`/${id}`),
};