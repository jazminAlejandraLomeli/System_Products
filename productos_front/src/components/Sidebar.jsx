import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logout from "../Services/Logout";

export default function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/"); // si no hay token
  }

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No hay sesión activa");
      return;
    }

    try {
      await Logout(token); // función fetch
      localStorage.removeItem("token");
      navigate("/"); // redirige al login
    } catch (err) {
      console.error("Error en logout:", err);
      alert(err.message || "Error cerrando sesión");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-50 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 ">Productos</h2>
        <nav className="flex flex-col space-y-">
          <Button variant="ghost">Productos</Button>
          
        </nav>

        <div className="mt-auto">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
          >
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </div>
  );
}
