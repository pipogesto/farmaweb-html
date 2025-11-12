// js/script.js

// --- 1. IMPORTACIONES PRINCIPALES ---
import { loadPage } from './router.js';
import { updateCartBadge } from './cart.js';
import { updateLoginButton } from './auth.js';
import { handleSearch } from './product.js';
import { toggleMobileMenu } from './utils.js';
import { handleBodyClick } from './events.js';

// --- 2. INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 3. MANEJO DE EVENTOS PRINCIPALES ---
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    const searchInput = document.getElementById('desktop-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // El manejador de clics global
    document.body.addEventListener('click', handleBodyClick);

    
    // --- 4. INICIO DE LA APLICACIÓN ---
    loadPage('inicio'); // Carga la página de inicio
    updateCartBadge();
    updateLoginButton();
    
});
