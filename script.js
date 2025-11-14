// script.js (Archivo principal)
// REEMPLAZA TODO EL CONTENIDO DE ESTE ARCHIVO

import { loadPage, toggleMobileMenu, closeMobileMenu } from './modules/router.js';
import { updateLoginButton, handleLogout, handleLogin } from './modules/auth.js';
import { updateCartBadge, addToCart, updateCartItemQuantity, removeFromCart, clearCart } from './modules/cart.js';
import { handleSearch } from './modules/pages/catalog.js';
import { cart, currentUser } from './modules/state.js';

// --- 1. INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (!main) {
        console.error("Error: Elemento 'main' no encontrado.");
        return;
    }

    // --- MANEJADORES GLOBALES ---
    // Adjuntamos los listeners al 'body' para que capturen eventos
    // de elementos que aún no existen (como los de las páginas cargadas dinámicamente)
    document.body.addEventListener('click', handleBodyClick);
    document.body.addEventListener('submit', handleFormSubmit);

    // --- LISTENERS ESTÁTICOS (para elementos que siempre están en index.html) ---
    document.querySelector('.mobile-menu-button')?.addEventListener('click', toggleMobileMenu);
    document.getElementById('desktop-search-input')?.addEventListener('input', handleSearch);
    document.getElementById('mobile-search-input')?.addEventListener('input', handleSearch);

    // --- CARGA INICIAL ---
    updateCartBadge();
    updateLoginButton();
    loadPage('inicio'); // Esto ahora debería funcionar
});

// --- 2. MANEJADOR DE CLICS GLOBAL (Delegación) ---
function handleBodyClick(event) {
    const target = event.target; // El elemento exacto donde se hizo clic

    // Manejador para enlaces de navegación SPA
    const pageLink = target.closest('[data-page]');
    if (pageLink) {
        event.preventDefault();
        loadPage(pageLink.getAttribute('data-page'));
        closeMobileMenu();
        return;
    }

    // Manejador para "Añadir al Carrito"
    const addToCartButton = target.closest('.add-to-cart-btn');
    if (addToCartButton) {
        event.preventDefault();
        addToCart(addToCartButton.getAttribute('data-product-id'));
        return;
    }

    // Manejadores para botones del carrito (+, -, eliminar)
    const cartButton = target.closest('.quantity-btn, .remove-item-btn');
    if (cartButton) {
        event.preventDefault();
        const productId = cartButton.getAttribute('data-product-id');
        const action = cartButton.getAttribute('data-action');
        const item = cart.find(i => i.id === productId);

        if (item) {
            if (action === 'increase') updateCartItemQuantity(productId, item.quantity + 1);
            if (action === 'decrease') updateCartItemQuantity(productId, item.quantity - 1);
            if (action === 'remove') removeFromCart(productId);
        }
        return;
    }
    
    // Manejador para botón de Logout
    const logoutButton = target.closest('.logout-button');
    if (logoutButton) {
        event.preventDefault();
        handleLogout();
        return;
    }
}

// --- 3. MANEJADOR DE SUBMITS GLOBAL (Delegación) ---
function handleFormSubmit(event) {
    const form = event.target; // El formulario que se envió

    // Manejador para formulario de Login
    if (form.id === 'login-form') {
        event.preventDefault();
        handleLogin(event);
        return;
    }

    // Manejador para formulario de Contacto
    if (form.id === 'contact-form') {
        event.preventDefault();
        alert('Mensaje enviado con éxito. (Simulación)');
        form.reset();
        return;
    }

    // Manejador para formulario de Info Personal (Mi Cuenta)
    if (form.id === 'personal-info-form') {
        event.preventDefault();
        const newNameInput = form.querySelector('#acc-name');
        if (newNameInput && currentUser) {
            currentUser.name = newNameInput.value;
            alert('Información actualizada con éxito.');
            updateLoginButton();
            loadPage('cuenta');
        }
        return;
    }

    // Manejador para formulario de Pago
    if (form.id === 'payment-form') {
        event.preventDefault();
        alert('¡Pedido realizado con éxito! (Simulación)');
        clearCart();
        loadPage('orden-completa');
        return;
    }
}