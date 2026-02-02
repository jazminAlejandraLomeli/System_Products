import httpClient from "./httpClient";

interface GetProductsParams {
  page?: number;
  search?: string;
}

export const getProducts = async (page: number = 1, search: string = "") => {
  try {
    const params: GetProductsParams = { page };

    if (search.trim()) {
      params.search = search;
    }

    const response = await httpClient.get("/products", { params });

    return response.data;
  } catch (error: any) {
    console.error("Error obteniendo productos", error);

    if (error.response) {
      throw error.response.data;
    }

    throw new Error("Error de conexión con el servidor");
  }
};
