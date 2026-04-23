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
        <Route
          path="/login"
          element={!estaAutenticado ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={estaAutenticado ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/:folderName"
          element={estaAutenticado ? <FolderDetail /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;