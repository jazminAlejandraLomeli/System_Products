import { Button } from "@/components/ui/button";
import Sidebar from "../components/Sidebar";
import Products from "../components/Products/Products";
import {getMe} from "../Services/me";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

 


export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

    console.log("Token en Home.jsx:", token);
     
      try {
        const data = await getMe(token);
        setUsuario(data);
      } catch (error) {
        // Si el servicio falla (401 o error de red), limpiamos y sacamos al usuario
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="text-3xl font-semibold mb-4">
          {usuario ? <h1>Hola, {usuario.name}</h1> : <p>Cargando...</p>}
        </div>
        <Products />
      </main>
    </div>
  );
}
