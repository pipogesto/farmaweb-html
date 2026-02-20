// script.js (Archivo principal)
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
    updateCartButtonForRole(); // Inicializa el botón correctamente
    
    const initialPage = window.location.hash.slice(1) || 'inicio';
    loadPage(initialPage);
});

// --- FUNCIÓN CORREGIDA: Usa data-page para que el router lo detecte ---
export function updateCartButtonForRole() {
    const cartLink = document.getElementById('cartButton');
    const cartIcon = document.getElementById('cart-icon');
    
    if (!cartLink || !cartIcon) return;

    // Detectar si es admin (revisando ambas posibilidades de nombre de propiedad)
    const isAdmin = currentUser && (currentUser.rol === 'admin' || currentUser.role === 'admin' || currentUser.isAdmin === true);

    if (isAdmin) {
        // MODO ADMINISTRADOR → Usa el sistema SPA para cargar el dashboard
        cartLink.setAttribute('data-page', 'admin-dashboard');
        cartLink.setAttribute('href', '#'); 
        cartIcon.setAttribute('data-lucide', 'bar-chart-3');
        cartLink.setAttribute('title', 'Estadísticas de Ventas');
        
        // Cambiamos el color del círculo (badge) a verde
        const badge = cartLink.querySelector('.cart-badge') || document.querySelector('.cart-badge');
        if (badge) badge.style.backgroundColor = '#10b981'; 
    } else {
        // MODO USUARIO → Carrito normal
        cartLink.setAttribute('data-page', 'carrito');
        cartLink.setAttribute('href', '#');
        cartIcon.setAttribute('data-lucide', 'shopping-cart');
        cartLink.setAttribute('title', 'Carrito');
        
        // Color normal del carrito
        const badge = cartLink.querySelector('.cart-badge') || document.querySelector('.cart-badge');
        if (badge) badge.style.backgroundColor = ''; 
    }

    // Re-inicializar iconos de Lucide
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- 2. MANEJADOR DE CLICS GLOBAL (Delegación) ---
function handleBodyClick(event) {
    const target = event.target;

    // Menú Móvil
    const menuButton = target.closest('.mobile-menu-button');
    if (menuButton) {
        event.preventDefault();
        toggleMobileMenu();
        return;
    }

    // Navegación SPA (Aquí es donde entra el admin-dashboard ahora)
    const pageLink = target.closest('[data-page]');
    if (pageLink) {
        event.preventDefault();
        const page = pageLink.getAttribute('data-page');
        loadPage(page);
        window.location.hash = page;
        closeMobileMenu();
        return;
    }

    // Añadir al Carrito
    const addToCartButton = target.closest('.add-to-cart-btn');
    if (addToCartButton) {
        event.preventDefault();
        addToCart(addToCartButton.getAttribute('data-product-id'));
        return;
    }

    // Lógica de botones del carrito
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

    // Logout
    if (target.closest('.logout-button')) {
        event.preventDefault();
        handleLogout();
        updateCartButtonForRole(); // Vuelve el botón a estado "carrito"
        return;
    }
}

// --- 3. MANEJADOR DE SUBMITS ---
async function handleFormSubmit(event) {
    const form = event.target;

    if (form.id === 'login-form') {
        event.preventDefault();
        await handleLogin(event);
        updateCartButtonForRole(); // Activa el modo admin tras login exitoso
        return;
    }

    if (form.id === 'contact-form') {
        event.preventDefault();
        alert('Mensaje enviado con éxito.');
        form.reset();
        return;
    }

    if (form.id === 'payment-form') {
        event.preventDefault();
        alert('¡Pedido realizado con éxito!');
        clearCart();
        loadPage('orden-completa');
        return;
    }
}
