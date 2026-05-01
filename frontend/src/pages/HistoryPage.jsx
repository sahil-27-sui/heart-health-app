import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { api } from '../services/api';

const toScore = { 'Low Risk': 1, 'Medium Risk': 2, 'High Risk': 3 };

export default function HistoryPage(){
  const [records,setRecords] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{ api.get('/records').then(r=>setRecords(r.data)); },[]);
  const chartData = [...records].reverse().map((r,i)=>({ idx:i+1, risk:toScore[r.riskLevel], label:r.riskLevel }));
  return <div className='max-w-5xl mx-auto p-6 space-y-5'><h1 className='text-2xl font-bold'>Risk History</h1><div className='bg-white p-4 rounded shadow h-72'><ResponsiveContainer><LineChart data={chartData}><CartesianGrid strokeDasharray='3 3'/><XAxis dataKey='idx'/><YAxis domain={[1,3]} ticks={[1,2,3]}/><Tooltip formatter={(v)=>['Low Risk','Medium Risk','High Risk'][v-1]}/><Line type='monotone' dataKey='risk' stroke='#0f766e' /></LineChart></ResponsiveContainer></div><div className='grid gap-3'>{records.map(r=><div key={r._id} className='bg-white rounded p-4 shadow flex justify-between'><div><p className='font-semibold'>{new Date(r.createdAt).toLocaleString()}</p><p>{r.riskLevel} (score {r.score})</p></div><button className='text-blue-600' onClick={()=>navigate(`/results/${r._id}`,{state:r})}>View</button></div>)}</div></div>
}
