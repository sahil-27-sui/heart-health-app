import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  return <Routes>
    <Route path='/' element={<Navigate to='/dashboard' replace />} />
    <Route path='/login' element={<AuthPage mode='login' />} />
    <Route path='/signup' element={<AuthPage mode='signup' />} />
    <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    <Route path='/results/:id' element={<ProtectedRoute><ResultsPage/></ProtectedRoute>} />
    <Route path='/history' element={<ProtectedRoute><HistoryPage/></ProtectedRoute>} />
  </Routes>;
}
