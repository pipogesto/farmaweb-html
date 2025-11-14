export function initOrderCompletePage() {
    const orderNumberEl = document.getElementById('order-number');
    if (orderNumberEl) {
        const orderNumber = `#FP-${Math.floor(Math.random() * 100000)}`;
        orderNumberEl.textContent = orderNumber;
    }
}