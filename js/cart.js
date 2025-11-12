// js/pages/cart.js
import { getCart } from '../state.js';

export async function renderCartPage(main) {
    const cart = getCart();

    if (cart.length === 0) {
        // Cargar el HTML de carrito vacío
        const response = await fetch('pages/carrito.html');
        main.innerHTML = await response.text();
    } else {
        // Generar el HTML dinámicamente si hay items
        const itemsHTML = cart.map(item => `
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

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal >= 900 ? 0 : 99;
        const total = subtotal + shipping;

        main.innerHTML = `
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
                            <div class="summary-row">
                                <span class="label">Subtotal</span>
                                <span>$${subtotal.toFixed(2)}</span>
                            </div>
                            <div class="summary-row">
                                <span class="label">Envío</span>
                                <span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div class="summary-divider"></div>
                            <div class="summary-total">
                                <span class="label">Total</span>
                                <span class="price">$${total.toFixed(2)}</span>
                            </div>
                            ${subtotal < 900 ? `<div class="promo-banner">Añade $${(900 - subtotal).toFixed(2)} más para envío gratis</div>` : ''}
                            <div class="cart-page-actions">
                                <a href="#" data-page="pago" class="button button-primary w-full">Proceder al Pago</a>
                                <a href="#" data-page="catalogo" class="button button-outline w-full">Seguir Comprando</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}        const shipping = subtotal >= 900 ? 0 : 99;
        const total = subtotal + shipping;

        main.innerHTML = `
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
                            <div class="summary-row">
                                <span class="label">Subtotal</span>
                                <span>$${subtotal.toFixed(2)}</span>
                            </div>
                            <div class="summary-row">
                                <span class="label">Envío</span>
                                <span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div class="summary-divider"></div>
                            <div class="summary-total">
                                <span class="label">Total</span>
                                <span class="price">$${total.toFixed(2)}</span>
                            </div>
                            ${subtotal < 900 ? `<div class="promo-banner">Añade $${(900 - subtotal).toFixed(2)} más para envío gratis</div>` : ''}
                            <div class="cart-page-actions">
                                <a href="#" data-page="pago" class="button button-primary w-full">Proceder al Pago</a>
                                <a href="#" data-page="catalogo" class="button button-outline w-full">Seguir Comprando</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}
