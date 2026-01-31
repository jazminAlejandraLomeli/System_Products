import httpClient from "./httpClient";   // Ya trae el token desde el localStorage

class AuthService {
    token = null;   // Almacena el token de autenticación
    user = null;  // Almacena la información del usuario autenticado

    constructor() {
        if (AuthService.instance) {
            return AuthService.instance;
        }

        this.token = localStorage.getItem("token");
        AuthService.instance = this;
    }


    async logout() {
        try { 
            await httpClient.post("/auth/logout");  // Logout en el servidor
        } catch (error) {
            console.warn("Error cerrando sesión en servidor", error);
           
        } finally {
         
            this.token = null;
            this.user = null;
            localStorage.removeItem("token");
        }
    }

    isAuthenticated() {
        return !!this.token;
    }
}

export default new AuthService();
