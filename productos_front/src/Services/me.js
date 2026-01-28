const API_URL = "http://127.0.0.1:8000/api/me";

export const getMe = async (token) => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            // Si el token no es válido o expiró
            throw new Error("Sesión inválida");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getMe:", error);
        throw error; // Lanzamos el error para que el componente lo maneje
    }
};