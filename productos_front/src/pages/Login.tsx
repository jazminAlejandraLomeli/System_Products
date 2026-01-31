 

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../Services/AutInstance";
import LoadingButton from "../components/ui/LoadingButton";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";

 


export default function Login() {
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const sentData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await authService.login(datos);
      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error en el inicio de sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Iniciar sesión</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={sentData}>
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                name="email"
                required
                onChange={handleInputChange}
                value={datos.email}
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                name="password"
                required
                value={datos.password}
                onChange={handleInputChange}
                id="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            {/* Button */}
            <LoadingButton isLoading={isLoading} texto="Iniciando sesión..." className="w-full">
              Entrar
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
