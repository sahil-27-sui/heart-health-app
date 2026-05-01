import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get('/auth/me').then(r=>setUser(r.data)).catch(()=>setUser(null)).finally(()=>setLoading(false)); }, []);

  const login = async (email, password) => {
    await api.post('/auth/login', { email, password });
    const me = await api.get('/auth/me');
    setUser(me.data);
  };
  const signup = async (email, password) => {
    await api.post('/auth/signup', { email, password });
    const me = await api.get('/auth/me');
    setUser(me.data);
  };
  const logout = async () => { await api.post('/auth/logout'); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>;
};
