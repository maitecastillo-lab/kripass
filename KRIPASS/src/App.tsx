import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/authContext';
import { LoginPage } from './pages/loginPage';
import { Dashboard } from './pages/dashBoardPage';
import { FolderDetail } from './pages/folderDetail';
import { NotFoundPage } from './pages/notFoundPage';

function App() {
  const { estaAutenticado } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de Login */}
        <Route 
          path="/login" 
          element={!estaAutenticado ? <LoginPage /> : <Navigate to="/dashboard" />} 
        />

        {/* Vista 1: El Dashboard de Carpetas Globales */}
        <Route 
          path="/dashboard" 
          element={estaAutenticado ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* Vista 2: El Detalle de una carpeta específica (ej: /dashboard/Bancos) */}
        {/* Usamos :folderName para que sea dinámico según la carpeta que clickes */}
        <Route 
          path="/dashboard/:folderName" 
          element={estaAutenticado ? <FolderDetail /> : <Navigate to="/login" />} 
        />

        {/* Redirecciones automáticas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;