const API_URL = "http://127.0.0.1:8000/api/products";   

// ProductService.js
export const getProducts = async (page = 1, search = "") => {
    const token = localStorage.getItem("token");

    // 1. Definimos la URL base
    const baseUrl = "http://127.0.0.1:8000/api/products";

    // 2. Usamos URLSearchParams para manejar los parámetros limpiamente
    const params = new URLSearchParams();
    params.append("page", page);

    if (search && search.trim() !== "") {
        params.append("search", search);
    }

    // 3. Construimos la URL completa: "http://.../api/products?page=1&search=hola"
    const finalUrl = `${baseUrl}?${params.toString()}`;

    const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error en la petición");
    }

    return await response.json();
};