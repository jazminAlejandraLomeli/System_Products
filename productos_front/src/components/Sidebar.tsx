 import { useNavigate } from "react-router-dom";
import authService from "../Services/AutInstance";
import LoadingButton from "./ui/LoadingButton";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/"); // si no hay token
  }

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    setIsLoading(true);
    await authService.logout(); // llama al método logout del servicio de autenticación
    navigate("/"); // redirige al login
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-black text-white shadow-md">
      <div className="flex h-full flex-col p-6 overflow-hidden">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-6">Productos</h2>

        {/* Navegación */}
        <nav className="flex flex-col gap-2">
          <Button variant="ghost">Productos</Button>
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <LoadingButton
            variant="destructive"
            onClick={handleLogout}
            isLoading={isLoading}
            texto="Cerrando sesión..."
            className="w-full"
          >
            Cerrar sesión
          </LoadingButton>
        </div>
      </div>
    </aside>
  );
}
