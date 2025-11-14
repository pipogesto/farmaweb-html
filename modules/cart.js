// modules/cart.js
// REEMPLAZA TODO EL CONTENIDO DE ESTE ARCHIVO

import { cart, setCart } from './state.js';
import { allProducts } from './data.js';
import { loadPage } from './router.js'; // <-- IMPORTANTE: Importamos el router

export function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    alert(`${product.name} ha sido añadido al carrito.`);
    updateCartBadge();
}

export function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId); // Esto ya maneja la recarga
        } else {
            item.quantity = newQuantity;
            updateCartBadge(); // Actualiza el contador
            
            // Si estamos en la página del carrito, la recargamos para ver el cambio
            if (document.querySelector('.cart-page')) {
                loadPage('carrito');
            }
        }
    }
}

export function removeFromCart(productId){
    setCart(cart.filter(item => item.id !== productId));
    updateCartBadge(); // Actualiza el contador
    
    // Si estamos en la página del carrito (o si el carrito queda vacío), recargamos
    if (document.querySelector('.cart-page') || cart.length === 0) {
        loadPage('carrito');
    }
}

export function clearCart() {
    setCart([]);
    updateCartBadge();
}

export function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('hidden', totalItems <= 0);
}