import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashBoardPage';
import { NotFoundPage } from '../pages/notFoundPage';

export const PasswordRoutes = () => {
  const { estaAutenticado } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!estaAutenticado ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={estaAutenticado ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};