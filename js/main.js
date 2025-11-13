// js/main.js

import { initRouter } from './router.js';
import { initAuth } from './auth.js';
import { initCart } from './cart.js';
import { initGlobalListeners } from './events.js';

// Esto se ejecuta una sola vez cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicia los sistemas globales que viven en toda la app
    initAuth(); // Carga el estado del usuario (si está logueado)
    initCart(); // Carga el carrito desde localStorage
    initGlobalListeners(); // Activa listeners globales (ej. clic en "añadir al carrito")

    // 2. Inicia el Router
    // ¡Esto es lo que cargará la página correcta (ej. #inicio)!
    initRouter();
    
    console.log("FarmaPlus App Inicializada (Sistema 2)");
});
