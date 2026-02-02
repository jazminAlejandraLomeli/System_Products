import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
 import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Mantenemos SOLO la ruta protegida */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h1>404 - No encontrado</h1>} />
    </Routes>
  );
}
