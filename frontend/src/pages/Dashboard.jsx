import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const defaultForm = { age:'', gender:'Male', heartRate:'', systolic:'', diastolic:'', cholesterol:'', smoking:false, activityLevel:'Moderate', bmi:'', diabetes:false, familyHistory:false, stressLevel:'Moderate', dietQuality:'Average', alcoholConsumption:'Low' };

export default function Dashboard() {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const set = (k,v)=>setForm(prev=>({...prev,[k]:v}));
  const submit = async e => { e.preventDefault(); setError('');
    try { const payload = { ...form, age:+form.age, heartRate:+form.heartRate, systolic:+form.systolic, diastolic:+form.diastolic, cholesterol:+form.cholesterol, bmi:+form.bmi };
      const { data } = await api.post('/records', payload); navigate(`/results/${data._id}`, { state: data });
    } catch (err) { setError(err.response?.data?.message || 'Failed to analyze risk'); }
  };

  return <div className='max-w-5xl mx-auto p-6'><div className='flex justify-between items-center mb-6'><h1 className='text-3xl font-bold'>Heart Health Advisory Dashboard</h1><div className='space-x-2'><button onClick={()=>navigate('/history')} className='px-4 py-2 bg-slate-700 text-white rounded'>History</button><button onClick={logout} className='px-4 py-2 bg-red-600 text-white rounded'>Logout</button></div></div><form onSubmit={submit} className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl p-6 shadow'>{error&&<p className='text-red-600 md:col-span-2'>{error}</p>}{Object.entries({age:'Age',heartRate:'Heart Rate',systolic:'Systolic BP',diastolic:'Diastolic BP',cholesterol:'Cholesterol',bmi:'BMI'}).map(([k,l])=><input key={k} className='border p-2 rounded' type='number' placeholder={l} value={form[k]} onChange={e=>set(k,e.target.value)} required/>)}<select className='border p-2 rounded' value={form.gender} onChange={e=>set('gender',e.target.value)}><option>Male</option><option>Female</option><option>Other</option></select><select className='border p-2 rounded' value={form.activityLevel} onChange={e=>set('activityLevel',e.target.value)}><option>Low</option><option>Moderate</option><option>High</option></select><select className='border p-2 rounded' value={form.stressLevel} onChange={e=>set('stressLevel',e.target.value)}><option>Low</option><option>Moderate</option><option>High</option></select><select className='border p-2 rounded' value={form.dietQuality} onChange={e=>set('dietQuality',e.target.value)}><option>Poor</option><option>Average</option><option>Good</option></select><select className='border p-2 rounded' value={form.alcoholConsumption} onChange={e=>set('alcoholConsumption',e.target.value)}><option>None</option><option>Low</option><option>Moderate</option><option>High</option></select>{['smoking','diabetes','familyHistory'].map(k=><label key={k} className='flex items-center gap-2'><input type='checkbox' checked={form[k]} onChange={e=>set(k,e.target.checked)}/>{k}</label>)}<button className='md:col-span-2 bg-emerald-600 text-white p-3 rounded font-semibold'>Analyze Heart Risk</button></form></div>;
}
