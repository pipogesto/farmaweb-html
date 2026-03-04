import { API_URL } from './config.js';

// Intentamos obtener los productos del backend de Render
export const getAllProducts = async () => {
    try {
        // Usamos la variable API_URL que viene de config.js
        const response = await fetch(`${API_URL}/api/productos`);
        
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        
        return await response.json();
    } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
        return []; 
    }
};

export const allUsers = [
    { email: "cliente@email.com", password: "123", role: "user", name: "Juan Cliente" },
    { email: "admin@farmaplus.com", password: "admin123", role: "admin", name: "Admin FarmaPlus" }
];
