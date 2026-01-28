const API_URL = "http://127.0.0.1:8000/api/auth/logout";

const Logout = async (token) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}` // Aquí pasas el token
            },
        });

        if (response.ok) {
            // Limpia el almacenamiento local después de invalidar en el servidor
            localStorage.removeItem("user_token");
            return { success: true, message: "Sesión cerrada correctamente" };
        } else {
            return { success: false, message: "Error al cerrar sesión en el servidor" };
        }
    } catch (error) {
        console.log("Error en la petición de Logout:", error);
        console.error("Error en la petición de Logout:", error);
        return { success: false, error };
    }
};

export default Logout;