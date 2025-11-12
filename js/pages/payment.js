// js/pages/payment.js
import { getCart } from '../state.js';
import { clearCart } from '../cart.js';
import { loadPage } from '../router.js';

export async function renderPaymentPage(main) {
    const cart = getCart();
    if (cart.length === 0) {
        await loadPage('catalogo'); // Redirigir si no hay carrito
        return;
    }

    // Cargar el HTML base de la página de pago
    const response = await fetch('pages/pago.html');
    main.innerHTML = await response.text();
    
    // Rellenar los datos dinámicos del resumen
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 900 ? 0 : 99;
    const total = subtotal + shipping;
    
    const itemsSummaryHTML = cart.map(item => `<div class="summary-row"><span class="label">${item.name} x${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`).join('');
    
    const totalsHTML = `
        <div class="summary-row"><span class="label">Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="summary-row"><span class="label">Envío</span><span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span></div>
        <div class="summary-divider"></div>
        <div class="summary-total" style="margin-top: 1rem;"><span class="label">Total</span><span class="price">$${total.toFixed(2)}</span></div>
    `;

    main.querySelector('#payment-summary-items').innerHTML = itemsSummaryHTML;
    main.querySelector('#payment-summary-totals').innerHTML = totalsHTML;

    // Añadir listeners para el formulario de pago
    main.querySelector('#payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Pedido realizado con éxito! (Simulación)');
        clearCart();
        loadPage('orden-completa');
    });

    main.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const isCard = e.target.value === 'card';
            main.querySelector('#card-details-section').style.display = isCard ? '' : 'none';
            main.querySelector('#paypal-message-section').style.display = isCard ? 'none' : '';
        });
    });
}
