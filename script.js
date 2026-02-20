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
    updateCartButtonForRole(); // Inicializa el botón según el rol
    
    // Carga la página inicial (desde el hash o inicio)
    const initialPage = window.location.hash.slice(1) || 'inicio';
    loadPage(initialPage);
});

// --- ACTUALIZACIÓN DINÁMICA DEL BOTÓN CARRITO/ADMIN ---
export function updateCartButtonForRole() {
    const cartLink = document.getElementById('cartButton');
    const cartIcon = document.getElementById('cart-icon');
    
    if (!cartLink || !cartIcon) return;

    const isAdmin = currentUser && (currentUser.rol === 'admin' || currentUser.role === 'admin' || currentUser.isAdmin === true);

    if (isAdmin) {
        // MODO ADMINISTRADOR: Cambiamos comportamiento a Estadísticas SPA
        cartLink.setAttribute('data-page', 'admin-dashboard'); 
        cartIcon.setAttribute('data-lucide', 'bar-chart-3');
        cartLink.setAttribute('title', 'Panel de Estadísticas de Ventas');
        
        // Estilo visual: opcionalmente cambiar color a verde esmeralda
        cartIcon.classList.add('text-emerald-600');
    } else {
        // MODO USUARIO: Carrito normal
        cartLink.setAttribute('data-page', 'carrito');
        cartIcon.setAttribute('data-lucide', 'shopping-cart');
        cartLink.setAttribute('title', 'Carrito');
        cartIcon.classList.remove('text-emerald-600');
    }

    // Refrescar iconos de Lucide
    if (window.lucide) lucide.createIcons();
}

// --- 2. MANEJADOR DE CLICS GLOBAL (Delegación) ---
function handleBodyClick(event) {
    const target = event.target;

    // Manejador del Menú Móvil
    if (target.closest('.mobile-menu-button')) {
        event.preventDefault();
        toggleMobileMenu();
        return;
    }

    // Manejador SPA (Enlaces con data-page)
    const pageLink = target.closest('[data-page]');
    if (pageLink) {
        event.preventDefault();
        const page = pageLink.getAttribute('data-page');
        loadPage(page);
        window.location.hash = page; // Actualiza la URL
        closeMobileMenu();
        return;
    }

    // Manejador "Añadir al Carrito"
    const addToCartButton = target.closest('.add-to-cart-btn');
    if (addToCartButton) {
        event.preventDefault();
        addToCart(addToCartButton.getAttribute('data-product-id'));
        return;
    }

    // Botones del Carrito
    const cartBtn = target.closest('.quantity-btn, .remove-item-btn');
    if (cartBtn) {
        event.preventDefault();
        const productId = cartBtn.getAttribute('data-product-id');
        const action = cartBtn.getAttribute('data-action');
        const item = cart.find(i => i.id === productId);
        if (item) {
            if (action === 'increase') updateCartItemQuantity(productId, item.quantity + 1);
            if (action === 'decrease') updateCartItemQuantity(productId, item.quantity - 1);
            if (action === 'remove') removeFromCart(productId);
        }
        return;
    }

    // Botón Logout
    if (target.closest('.logout-button')) {
        event.preventDefault();
        handleLogout();
        updateCartButtonForRole(); // IMPORTANTE: Volver el carrito a normal tras logout
        return;
    }
}

// --- 3. MANEJADOR DE SUBMITS ---
function handleFormSubmit(event) {
    const form = event.target;

    if (form.id === 'login-form') {
        event.preventDefault();
        handleLogin(event).then(() => {
            updateCartButtonForRole(); // Actualiza el botón tras login exitoso
        });
        return;
    }

    // ... (resto de tus manejadores de formularios: contacto, payment, etc.)
}
