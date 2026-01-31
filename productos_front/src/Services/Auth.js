import axios from "axios";  //Importacion de axion para las peticiones http

const API_URL = "http://127.0.0.1:8000/api/auth/login";

const Auth = async (datos) => {
    try {
        const response = await axios.post(API_URL, datos, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        return response.data; // la respuesta viene --> response.data
    } catch (error) {
        console.error("RequestLogin error:", error);

         if (error.response) {
             throw error.response.data;
        } else {
            // Error de red o servidor caído
            throw { message: "Error de conexión con el servidor" };
        }
    }
};

export default Auth;
