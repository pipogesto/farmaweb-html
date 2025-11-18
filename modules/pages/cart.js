// modules/pages/cart.js
import { cart } from '../state.js'; 
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../config.js'; // <-- Importamos configuración

export async function initCartPage(main) {
    if (!main) {
        console.error("Error: Elemento 'main' no encontrado en initCartPage.");
        return;
    }

    if (cart.length === 0) {
        const response = await fetch('/pages/cart-empty.html');
        if (!response.ok) throw new Error(`No se pudo cargar /pages/cart-empty.html`);
        main.innerHTML = await response.text();
    } else {
        const response = await fetch('/pages/cart.html');
        if (!response.ok) throw new Error(`No se pudo cargar /pages/cart.html`);
        main.innerHTML = await response.text();
        
        // Rellenar los datos dinámicos
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
        
        const container = document.getElementById('cart-items-container');
        if (container) container.innerHTML = itemsHTML;

        // --- LÓGICA ACTUALIZADA CON CONFIG.JS ---
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        const total = subtotal + shipping;

        const subEl = document.getElementById('cart-subtotal');
        if (subEl) subEl.textContent = `$${subtotal.toFixed(2)}`;
        
        const shipEl = document.getElementById('cart-shipping');
        if (shipEl) shipEl.textContent = shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`;
        
        const totalEl = document.getElementById('cart-total');
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

        const promoContainer = document.getElementById('cart-promo-banner-container');
        if (promoContainer) {
            if (subtotal < FREE_SHIPPING_THRESHOLD) {
                const missing = FREE_SHIPPING_THRESHOLD - subtotal;
                promoContainer.innerHTML = `<div class="promo-banner">Añade $${missing.toFixed(2)} más para envío gratis</div>`;
            } else {
                promoContainer.innerHTML = `<div class="promo-banner" style="background-color: #d1fae5; color: #059669;">¡Genial! Tienes envío gratis</div>`;
            }
        }
        
        // Renderizamos iconos si es necesario
        if (typeof lucide !== 'undefined') lucide.createIcons({ root: main });
    }
}