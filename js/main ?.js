// js/main.js

import { loadPage } from './router.js';
import { updateLoginButton } from './auth.js';
import { updateCartBadge } from './cart.js';
import { handleBodyClick } from './events.js';
import { handleSearch } from './product.js';
import { toggleMobileMenu } as utils from './utils.js';

// 1. Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Configurar listeners de eventos principales
    document.body.addEventListener('click', handleBodyClick);
    document.getElementById('desktop-search-input').addEventListener('input', handleSearch);
    document.querySelector('.mobile-menu-button').addEventListener('click', utils.toggleMobileMenu);

    // 3. Cargar estado inicial de la UI
    loadPage('inicio'); // Carga la página de inicio
    updateCartBadge();
    updateLoginButton();
});
