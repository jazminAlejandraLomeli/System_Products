import { useNavigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";

import Sidebar from "../components/Sidebar";
import { FullScreenLoader } from "../components/ui/loader";
import { getMe } from "../Services/me";
import Products from "../components/products/Products";

interface Usuario {
  name: string;
}
interface Loader {
  text: string;
  visible: boolean;
}


export default function Home(): JSX.Element {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState<Loader>({
    text: "Obteniendo datos...",
    visible: true,
  }); // Loading state

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      console.log("Token en Home.jsx:", token);

      try {
        const data = await getMe();
        setUsuario(data);
      } catch (error: any) {
        alert(
          "Sesión expirada. Por favor, inicia sesión de nuevo." + error.message,
        );
        navigate("/");
      } finally {
        setIsLoading({ text: "Datos cargados", visible: false }); // Set loading to false after fetch attempt
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />
      {isLoading.visible && <FullScreenLoader texto={isLoading.text} />}

      {/* Main Content */}
      <main className="ml-48 flex-1 overflow-y-auto p-8">
        <div className="text-3xl font-semibold mb-4">
          {usuario ? <h1>Hola, {usuario.name}</h1> : <p>Cargando...</p>}
        </div>
        {isLoading.visible ? <FullScreenLoader texto={isLoading.text}   /> : <Products />}
      </main>
    </div>
  );
}
