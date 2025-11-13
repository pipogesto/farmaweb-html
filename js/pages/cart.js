// js/pages/cart.js

import * as cart from '../cart.js';

// Esta es la función 'default' que el router.js llamará
export default function initCartPage() {
    console.log("Ejecutando JS de la Página del Carrito...");
    
    // Dibuja el contenido del carrito
    renderCart();
    
    // Añade los listeners LOCALES de esta página (para +, -, eliminar)
    addCartPageListeners();
}

/**
 * Dibuja el contenido de la página del carrito
 */
function renderCart() {
    const cartItems = cart.getCart();
    const mainElement = document.querySelector('main');

    if (cartItems.length === 0) {
        // El carrito está vacío.
        // El HTML de 'pages/carrito.html' ya muestra el mensaje correcto.
        // Así que no hacemos nada.
        return;
    }

    // Si el carrito NO está vacío, construimos el HTML
    const itemsHTML = cartItems.map(item => `
        <div class="cart-item">
            <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-description">${item.description}</p>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="button button-outline quantity-btn" data-product-id="${item.id}" data-action="decrease">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="button button-outline quantity-btn" data-product-id="${item.id}" data-action="increase">+</button>
                    </div>
                    <div class="cart-item-price-section">
                        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="icon-button remove-item-btn" data-product-id="${item.id}" data-action="remove">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 900 ? 0 : 99;
    const total = subtotal + shipping;

    const fullCartHTML = `
        <div class="cart-page">
            <div class="container">
                <div class="page-header">
                    <h1 class="page-title">Carrito de Compras</h1>
                    <p class="page-description">Revisa tus productos antes de finalizar la compra</p>
                </div>
                <div class="cart-grid">
                    <div class="cart-items-container">${itemsHTML}</div>
                    <div class="order-summary">
                        <h3 class="summary-title">Resumen del Pedido</h3>
                        <div class="summary-row"><span class="label">Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
                        <div class="summary-row"><span class="label">Envío</span><span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span></div>
                        <div class="summary-divider"></div>
                        <div class="summary-total"><span class="label">Total</span><span class="price">$${total.toFixed(2)}</span></div>
                        ${subtotal < 900 ? `<div class="promo-banner">Añade $${(900 - subtotal).toFixed(2)} más para envío gratis</div>` : ''}
                        <div class="cart-page-actions">
                            <a href="#pago" class="button button-primary w-full">Proceder al Pago</a>
                            <a href="#catalogo" class="button button-outline w-full">Seguir Comprando</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    // Reemplazamos el contenido del <main> con nuestro carrito lleno
    mainElement.innerHTML = fullCartHTML;
    lucide.createIcons();
}

/**
 * Añade los listeners para los botones (+, -, eliminar)
 * que SÓLO existen en la página del carrito
 */
function addCartPageListeners() {
    const mainElement = document.querySelector('main');
    
    mainElement.addEventListener('click', (event) => {
        const button = event.target.closest('.quantity-btn, .remove-item-btn');
        if (!button) return; // No fue un clic en un botón que nos interesa
        
        event.preventDefault();
        const productId = button.dataset.productId;
        const action = button.dataset.action;

        if (action === 'remove') {
            if (confirm('¿Quitar este producto del carrito?')) {
                cart.removeFromCart(productId);
                renderCart(); // Re-dibuja el carrito
            }
        } 
        else if (action === 'increase') {
            const item = cart.getCart().find(i => i.id === productId);
            cart.updateQuantity(productId, item.quantity + 1);
            renderCart(); // Re-dibuja el carrito
        }
        else if (action === 'decrease') {
            const item = cart.getCart().find(i => i.id === productId);
            cart.updateQuantity(productId, item.quantity - 1);
            renderCart(); // Re-dibuja el carrito
        }
    });
}
