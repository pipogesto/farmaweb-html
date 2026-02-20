// script.js (Archivo principal)
// VERSIÓN CORREGIDA - AHORA INCLUYE EL MENÚ MÓVIL
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
    document.body.addEventListener('click', handleBodyClick);
    document.body.addEventListener('submit', handleFormSubmit);

    // --- LISTENERS ESTÁTICOS ---
    document.getElementById('desktop-search-input')?.addEventListener('input', handleSearch);
    document.getElementById('mobile-search-input')?.addEventListener('input', handleSearch);

    // --- CARGA INICIAL ---
    updateCartBadge();
    updateLoginButton();
    updateCartVisibility();   // ← agregado: actualiza visibilidad del carrito al cargar
    loadPage('inicio');
});

// Función para ocultar/mostrar el carrito según si el usuario es administrador
function updateCartVisibility() {
    const cartButton = document.getElementById('cartButton');
    if (!cartButton) {
        console.warn('No se encontró #cartButton → verifica que exista id="cartButton" en index.html');
        return;
    }

    // Depuración: muestra qué usuario está detectado
    console.log('[CartVisibility] currentUser:', currentUser);

    if (!currentUser) {
        // Sin sesión → mostrar carrito
        console.log('[CartVisibility] Sin usuario → MOSTRAR carrito');
        cartButton.style.display = 'inline-flex';
        return;
    }

    // Condición para detectar admin → AJUSTA según tu objeto real
    // Ejemplos comunes (descomenta o combina según lo que veas en console.log(currentUser))
    const esAdmin = 
        currentUser.rol === 'admin' ||
        currentUser.role === 'admin' ||
        currentUser.tipo === 'administrador' ||
        currentUser.isAdmin === true ||
        currentUser.username?.toLowerCase() === 'admin' ||
        currentUser.username?.toLowerCase().includes('admin');

    if (esAdmin) {
        console.log('[CartVisibility] ADMIN detectado → OCULTAR carrito');
        cartButton.style.display = 'none';
    } else {
        console.log('[CartVisibility] Usuario normal → MOSTRAR carrito');
        cartButton.style.display = 'inline-flex';
    }
}

// Workaround temporal: detectar cambios en localStorage (útil si login/logout está en otro módulo)
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    if (key === 'currentUser') {
        console.log('[Storage override] currentUser cambiado → actualizando visibilidad carrito');
        updateCartVisibility();
    }
};

const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function(key) {
    originalRemoveItem.apply(this, arguments);
    if (key === 'currentUser') {
        console.log('[Storage override] currentUser removido → actualizando visibilidad carrito');
        updateCartVisibility();
    }
};

// --- MANEJADORES DE EVENTOS DELEGADOS (el resto de tu código) ---

// Manejador para clics en el body (delegación de eventos)
function handleBodyClick(event) {
    const target = event.target;

    // Toggle menú móvil
    if (target.closest('.mobile-menu-button')) {
        toggleMobileMenu();
        return;
    }

    // Cerrar menú móvil al hacer clic fuera
    if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        closeMobileMenu();
    }

    // Navegación entre páginas
    const link = target.closest('[data-page]');
    if (link) {
        event.preventDefault();
        const page = link.getAttribute('data-page');
        loadPage(page);
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

    // Logout
    if (target.closest('#logout-btn') || target.id === 'logout') {
        handleLogout();
        return;
    }
}

// Manejador para formularios (login, etc.)
function handleFormSubmit(event) {
    const form = event.target;
    if (form.id === 'login-form') {
        event.preventDefault();
        handleLogin(event);
    }
    // Puedes agregar más formularios aquí si es necesario
}
