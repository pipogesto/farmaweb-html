import { 'https://farmaweb-backend-iwcc.onrender.com' } from './config.js';

// Intentamos obtener los productos del backend de Render
export const getAllProducts = async () => {
    try {
        const response = await fetch(`${ https://farmaweb-backend-iwcc.onrender.com}/api/productos`);
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        return await response.json();
    } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
        return []; // Retorna lista vacía si falla el servidor
    }
};

// Mantenemos la lista de usuarios estática por ahora si no tienes ruta de login
export const allUsers = [
    { email: "cliente@email.com", password: "123", role: "user", name: "Juan Cliente" },
    { email: "admin@farmaplus.com", password: "admin123", role: "admin", name: "Admin FarmaPlus" }
];




