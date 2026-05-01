import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

const colorMap = { 'Low Risk':'text-green-600', 'Medium Risk':'text-yellow-600', 'High Risk':'text-red-600' };

export default function ResultsPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const [record, setRecord] = useState(state || null);
  const navigate = useNavigate();

  useEffect(()=>{ if(!record){ api.get('/records').then(r=>setRecord(r.data.find(x=>x._id===id))); } },[id,record]);
  if(!record) return <p className='p-8'>Loading result...</p>;

  return <div className='max-w-3xl mx-auto p-6'><div className='bg-white shadow rounded-xl p-6 space-y-4'><h1 className='text-2xl font-bold'>Assessment Result</h1><p className={`text-3xl font-extrabold ${colorMap[record.riskLevel]}`}>{record.riskLevel}</p><p>{record.explanation}</p><div><h2 className='font-semibold'>Key Risk Factors</h2><ul className='list-disc ml-6'>{record.riskFactors.map((f,i)=><li key={i}>{f}</li>)}</ul></div><div><h2 className='font-semibold'>Recommendations</h2><ul className='list-disc ml-6'>{record.recommendations.map((f,i)=><li key={i}>{f}</li>)}</ul></div><p className='bg-slate-100 p-3 rounded text-sm'>This is not a medical diagnosis. Consult a doctor.</p><button onClick={()=>navigate('/dashboard')} className='bg-blue-600 text-white px-4 py-2 rounded'>Back to Dashboard</button></div></div>;
}
