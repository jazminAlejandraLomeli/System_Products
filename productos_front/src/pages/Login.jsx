import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Auth from "../Services/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const sentData = async (event) => {
    event.preventDefault();
    console.log("clic");
    console.log(datos);
    try {
      const respuesta = await Auth(datos);
      const { message, token } = respuesta;
      setDatos({ email: "", password: "" }); // limpiar formulario
      localStorage.setItem("token", token);
      console.log(message);
      //Redireccion
      navigate("/home");
    } catch (err) {
       alert(err.message || "Error en el inicio de sesión");
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
            <Button className="w-full">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
