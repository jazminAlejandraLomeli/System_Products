// src/services/request.js

const API_URL = "http://127.0.0.1:8000/api/auth/login"; 
const Auth = async (datos) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) {
            throw data; // lanza el error para el componente
        }

        return data; // éxito
    } catch (error) {
        console.error("RequestLogin error:", error);
        throw error; // importante
    }
};


export default Auth;