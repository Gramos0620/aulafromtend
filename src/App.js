import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listagem from "./pages/Listagem";
import Detalhes from "./pages/Detalhes";
import NaoEncontrada from "./pages/NaoEncontrada";
import Registro from "./pages/registro";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Início</Link> | <Link to="/registros">Filmes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registros"
          element={
            <ProtectedRoute>
              <Listagem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registros/:id"
          element={
            <ProtectedRoute>
              <Detalhes />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </div>
  );
}
