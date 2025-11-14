// modules/pages/payment.js
// REEMPLAZA TODO EL CONTENIDO DE ESTE ARCHIVO

import { cart } from '../state.js';
import { clearCart } from '../cart.js'; 
import { loadPage } from '../router.js';

export async function initPaymentPage(main) {
    if (!main) {
        console.error("Error: Elemento 'main' no encontrado en initPaymentPage.");
        return;
    }

    if (cart.length === 0) {
        loadPage('catalogo');
        return;
    }
    
    // --- CORRECCIÓN AQUÍ ---
    const response = await fetch('/pages/payment.html');
    if (!response.ok) throw new Error(`No se pudo cargar /pages/payment.html`);
    main.innerHTML = await response.text();

    // Calcular totales y rellenar resumen
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 900 ? 0 : 99;
    const total = subtotal + shipping;
    
    const itemsSummaryHTML = cart.map(item => 
        `<div class="summary-row"><span class="label">${item.name} x${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`
    ).join('');

    const summaryEl = document.getElementById('payment-summary-items');
    if (summaryEl) summaryEl.innerHTML = itemsSummaryHTML;

    const subEl = document.getElementById('payment-subtotal');
    if (subEl) subEl.textContent = `$${subtotal.toFixed(2)}`;
    
    const shipEl = document.getElementById('payment-shipping');
    if (shipEl) shipEl.textContent = shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`;

    const totalEl = document.getElementById('payment-total');
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    // Añadir listeners para los botones de método de pago
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const isCard = e.target.value === 'card';
            document.getElementById('card-details-section')?.classList.toggle('hidden', !isCard);
            document.getElementById('paypal-message-section')?.classList.toggle('hidden', isCard);
        });
    });
}