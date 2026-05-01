import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode='login' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') await login(email, password); else await signup(email, password);
      navigate('/dashboard');
    } catch (err) { setError(err.response?.data?.message || 'Authentication failed'); }
  };

  return <div className='min-h-screen flex items-center justify-center'><form onSubmit={submit} className='bg-white p-8 rounded-xl shadow-md w-96 space-y-4'><h1 className='text-2xl font-bold'>{mode==='login'?'Login':'Sign up'}</h1>{error&&<p className='text-red-500'>{error}</p>}<input className='w-full border p-2 rounded' type='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required/><input className='w-full border p-2 rounded' type='password' placeholder='Password (min 6 chars)' value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required/><button className='w-full bg-blue-600 text-white p-2 rounded'>{mode==='login'?'Login':'Create account'}</button><p>{mode==='login'? 'No account?':'Have an account?'} <Link className='text-blue-600' to={mode==='login'?'/signup':'/login'}>{mode==='login'?'Sign up':'Login'}</Link></p></form></div>;
}
