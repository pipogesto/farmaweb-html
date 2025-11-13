// js/events.js

import * as cart from './cart.js';

// --- FUNCIONES DE MANEJO DE EVENTOS ---

/**
 * Manejador central de clics para todo el documento.
 * Delega la acción basándose en el elemento clickeado.
 */
function handleGlobalClick(event) {
    
    // 1. Manejador para "Añadir al Carrito"
    const addToCartButton = event.target.closest('.add-to-cart-btn');
    if (addToCartButton) {
        event.preventDefault();
        const productId = addToCartButton.dataset.productId;
        if (productId) {
            const addedProduct = cart.addToCart(productId);
            alert(`${addedProduct.name} ha sido añadido al carrito.`);
        }
        return; // Detenemos la ejecución
    }

    // 2. Manejador para el botón del Menú Móvil
    const mobileMenuButton = event.target.closest('.mobile-menu-button');
    if (mobileMenuButton) {
        event.preventDefault();
        toggleMobileMenu();
        return;
    }
    
    // 3. Manejador para CERRAR el menú al hacer clic en un enlace
    const mobileNavLink = event.target.closest('#mobile-menu .nav-link');
    if (mobileNavLink) {
        closeMobileMenu();
        // El router se encargará de la navegación gracias al href="#..."
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

// --- FUNCIÓN PÚBLICA (EXPORTADA) ---

/**
 * Se llama desde main.js al arrancar. Activa todos los listeners globales.
 */
export function initGlobalListeners() {
    document.body.addEventListener('click', handleGlobalClick);
    
    // (Podríamos añadir más listeners globales aquí, como 'submit' para la búsqueda)
}
