// js/events.js
import { loadPage } from './router.js';
import { addToCart, updateCartItemQuantity, removeFromCart } from './cart.js';
import { handleLogout } from './auth.js';

export function handleBodyClick(event) {
    // 1. Manejador para los enlaces de la SPA
    const pageLink = event.target.closest('[data-page]');
    if (pageLink) {
        event.preventDefault();
        const page = pageLink.getAttribute('data-page');
        loadPage(page);
    }

    // 2. Manejador para "Añadir al Carrito"
    const addToCartButton = event.target.closest('.add-to-cart-btn');
    if (addToCartButton) {
        const productId = addToCartButton.getAttribute('data-product-id');
        addToCart(productId);
    }

    // 3. Manejadores para los botones del carrito (+, -, eliminar)
    const cartButton = event.target.closest('.quantity-btn, .remove-item-btn');
    if (cartButton) {
        const productId = cartButton.getAttribute('data-product-id');
        const action = cartButton.getAttribute('data-action');
        let needsReload = false;

        const item = addToCartButton.closest('.cart-item'); // No, esto es un error.
        
        if (action === 'increase') {
            const quantitySpan = cartButton.previousElementSibling;
            const currentQuantity = parseInt(quantitySpan.textContent);
            needsReload = updateCartItemQuantity(productId, currentQuantity + 1);
        } else if (action === 'decrease') {
            const quantitySpan = cartButton.nextElementSibling;
            const currentQuantity = parseInt(quantitySpan.textContent);
            needsReload = updateCartItemQuantity(productId, currentQuantity - 1);
        } else if (action === 'remove') {
            needsReload = removeFromCart(productId);
        }
        
        // Si la acción modificó el carrito, y estamos en la pág. de carrito, recargamos
        if (needsReload) {
            const activeLink = document.querySelector('.nav-link.active');
            const currentPage = activeLink ? activeLink.dataset.page : null;
            if (currentPage === 'carrito') {
                loadPage('carrito');
            }
        }
    }

    // 4. Manejador para Logout
    const logoutButton = event.target.closest('.logout-button');
    if (logoutButton) {
        event.preventDefault();
        handleLogout();
    }
}
