// js/events.js
import { loadPage } from './router.js';
import { addToCart, updateCartItemQuantity, removeFromCart } from './cart.js';
import { handleLogout } from './auth.js';

export function handleBodyClick(event) {// js/events.js
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

        if (action === 'increase' || action === 'decrease') {
            const quantityControl = cartButton.closest('.quantity-control');
            if (!quantityControl) return; 
            const quantitySpan = quantityControl.querySelector('.quantity-display');
            if (!quantitySpan) return; 

            const currentQuantity = parseInt(quantitySpan.textContent);

            if (action === 'increase') {
                needsReload = updateCartItemQuantity(productId, currentQuantity + 1);
            } else { // action === 'decrease'
                needsReload = updateCartItemQuantity(productId, currentQuantity - 1);
            }

        } else if (action === 'remove') {
            needsReload = removeFromCart(productId);
        }
        
        // --- INICIO DE LA CORRECCIÓN DEFINITIVA ---
        
        // Si la acción modificó el carrito, y estamos en la pág. de carrito, recargamos
        if (needsReload) {
            
            // Comprobamos si estamos en la página del carrito buscando un
            // elemento que SÓLO existe en esa página (ya que el botón de
            // carrito no tiene la clase 'nav-link' y nunca se marca como 'active')
            const isOnCartPage = document.querySelector('.cart-page');
            
            if (isOnCartPage) {
                // Si estamos en la página del carrito, la recargamos
                // para mostrar los cambios.
                loadPage('carrito');
            }
            
            // Si NO estamos en la página del carrito, no hacemos nada,
            // solo se actualiza el badge (lo cual ya hace la función de cart.js)
        }
        
        // --- FIN DE LA CORRECCIÓN DEFINITIVA ---
    }

    // 4. Manejador para Logout
    const logoutButton = event.target.closest('.logout-button');
    if (logoutButton) {
        event.preventDefault();
        handleLogout();
    }
}
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

        // --- INICIO DE LA CORRECCIÓN ROBUSTA ---

        if (action === 'increase' || action === 'decrease') {
            // 1. Encontrar el contenedor padre
            const quantityControl = cartButton.closest('.quantity-control');
            if (!quantityControl) return; // Salir si no se encuentra

            // 2. Encontrar el <span> de la cantidad dentro del padre
            const quantitySpan = quantityControl.querySelector('.quantity-display');
            if (!quantitySpan) return; // Salir si no se encuentra

            const currentQuantity = parseInt(quantitySpan.textContent);

            if (action === 'increase') {
                needsReload = updateCartItemQuantity(productId, currentQuantity + 1);
            } else { // action === 'decrease'
                needsReload = updateCartItemQuantity(productId, currentQuantity - 1);
            }

        } else if (action === 'remove') {
            needsReload = removeFromCart(productId);
        }
        
        // --- FIN DE LA CORRECCIÓN ROBUSTA ---
        
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
}            const quantitySpan = quantityControl.querySelector('.quantity-display');
            if (!quantitySpan) return; 

            const currentQuantity = parseInt(quantitySpan.textContent);

            if (action === 'increase') {
                needsReload = updateCartItemQuantity(productId, currentQuantity + 1);
            } else { // action === 'decrease'
                needsReload = updateCartItemQuantity(productId, currentQuantity - 1);
            }

        } else if (action === 'remove') {
            needsReload = removeFromCart(productId);
        }
        
        // --- INICIO DE LA CORRECCIÓN DEFINITIVA ---
        
        // Si la acción modificó el carrito, y estamos en la pág. de carrito, recargamos
        if (needsReload) {
            
            // Comprobamos si estamos en la página del carrito buscando un
            // elemento que SÓLO existe en esa página (ya que el botón de
            // carrito no tiene la clase 'nav-link' y nunca se marca como 'active')
            const isOnCartPage = document.querySelector('.cart-page');
            
            if (isOnCartPage) {
                // Si estamos en la página del carrito, la recargamos
                // para mostrar los cambios.
                loadPage('carrito');
            }
            
            // Si NO estamos en la página del carrito, no hacemos nada,
            // solo se actualiza el badge (lo cual ya hace la función de cart.js)
        }
        
        // --- FIN DE LA CORRECCIÓN DEFINITIVA ---
    }

    // 4. Manejador para Logout
    const logoutButton = event.target.closest('.logout-button');
    if (logoutButton) {
        event.preventDefault();
        handleLogout();
    }
}
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

        // --- INICIO DE LA CORRECCIÓN ROBUSTA ---

        if (action === 'increase' || action === 'decrease') {
            // 1. Encontrar el contenedor padre
            const quantityControl = cartButton.closest('.quantity-control');
            if (!quantityControl) return; // Salir si no se encuentra

            // 2. Encontrar el <span> de la cantidad dentro del padre
            const quantitySpan = quantityControl.querySelector('.quantity-display');
            if (!quantitySpan) return; // Salir si no se encuentra

            const currentQuantity = parseInt(quantitySpan.textContent);

            if (action === 'increase') {
                needsReload = updateCartItemQuantity(productId, currentQuantity + 1);
            } else { // action === 'decrease'
                needsReload = updateCartItemQuantity(productId, currentQuantity - 1);
            }

        } else if (action === 'remove') {
            needsReload = removeFromCart(productId);
        }
        
        // --- FIN DE LA CORRECCIÓN ROBUSTA ---
        
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
