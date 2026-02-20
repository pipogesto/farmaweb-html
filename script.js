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
    updateCartButtonForRole();   // ← NUEVO: inicializa el botón carrito/estadísticas
    loadPage('inicio');
});

// --- NUEVA FUNCIÓN: Actualiza el botón del carrito según el rol del usuario ---
function updateCartButtonForRole() {
    const cartLink = document.getElementById('cartButton');
    const cartIcon = document.getElementById('cart-icon');
    
    if (!cartLink || !cartIcon) {
        console.warn('Elementos del carrito no encontrados');
        return;
    }

    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser && (currentUser.rol === 'admin' || currentUser.role === 'admin' || currentUser.isAdmin === true);

    if (isLoggedIn && isAdmin) {
        // Modo ADMINISTRADOR → redirige a estadísticas
        cartLink.href = 'estadisticas.html';
        cartLink.removeAttribute('data-page');                    // Evita que el router SPA lo intercepte
        cartIcon.setAttribute('data-lucide', 'bar-chart-3');      // Ícono de gráfica (Lucide tiene bar-chart-3)
        cartLink.setAttribute('title', 'Estadísticas de Ventas');
    } else {
        // Modo USUARIO o NO LOGUEADO → carrito normal
        cartLink.setAttribute('href', '#');
        cartLink.setAttribute('data-page', 'carrito');
        cartIcon.setAttribute('data-lucide', 'shopping-cart');
        cartLink.setAttribute('title', 'Carrito');
    }

    // Re-inicializar iconos de Lucide después del cambio
    lucide.createIcons();
}

// --- 2. MANEJADOR DE CLICS GLOBAL (Delegación) ---
function handleBodyClick(event) {
    const target = event.target;

    // --- MANEJADOR DEL BOTÓN DE MENÚ MÓVIL ---
    const menuButton = target.closest('.mobile-menu-button');
    if (menuButton) {
        event.preventDefault();
        toggleMobileMenu();
        return;
    }

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
    const form = event.target;

    if (form.id === 'login-form') {
        event.preventDefault();
        handleLogin(event);
        return;
    }

    if (form.id === 'contact-form') {
        event.preventDefault();
        alert('Mensaje enviado con éxito. (Simulación)');
        form.reset();
        return;
    }

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

    if (form.id === 'payment-form') {
        event.preventDefault();
        alert('¡Pedido realizado con éxito! (Simulación)');
        clearCart();
        loadPage('orden-completa');
        return;
    }
}

// IMPORTANTE: Asegúrate de llamar a updateCartButtonForRole() también en estos puntos:

// 1. Después de un login exitoso → dentro de handleLogin() en modules/auth.js
//    Ejemplo (agrega esto al final de handleLogin si es exitoso):
//    updateCartButtonForRole();
//    updateCartBadge();
//    updateLoginButton();
//    loadPage('inicio');  // o donde redirijas

// 2. Después de logout → dentro de handleLogout() en modules/auth.js
//    Ejemplo (agrega al final):
//    updateCartButtonForRole();
//    updateCartBadge();
//    updateLoginButton();
//    loadPage('inicio');

// Si el campo que indica admin no es currentUser.rol ni currentUser.role,
// cámbialo en la línea:
// const isAdmin = currentUser && (currentUser.rol === 'admin' || currentUser.role === 'admin' || currentUser.isAdmin === true);
