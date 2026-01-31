import httpClient from "./httpClient";  // Ya trae el token desde el localStorage

// Función para obtener la lista de productos con paginación y búsqueda

export const getProducts = async (page = 1, search = "") => {
    try {
        // Configura los parámetros de consulta
        const params = {
            page,
        };

        if (search && search.trim() !== "") { // Si hay un término de búsqueda válido
            params.search = search;
        }

        const response = await httpClient.get("/products", {
            params, // Axios arma ?page=1&search=hola
        });

        return response.data;
    } catch (error) {
        console.error("Error obteniendo productos", error);

        if (error.response) {
            throw error.response.data;
        }

        throw new Error("Error de conexión con el servidor");
    }
};
