// js/cart.js
import { getCart, setCart, allProducts } from './state.js';

export function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    // No usamos setCart(cart) porque 'cart' es un array y lo estamos mutando directamente.
    // Si usáramos programación funcional (ej. cart.map), necesitaríamos setCart.
    
    alert(`${product.name} ha sido añadido al carrito.`);
    updateCartBadge();
}

export function updateCartItemQuantity(productId, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Elimina el item
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        updateCartBadge();
        return true; // Indica que se necesita recargar
    }
    return false;
}

export function removeFromCart(productId) {
    let cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    updateCartBadge();
    return true; // Indica que se necesita recargar
}

export function clearCart() {
    setCart([]);
    updateCartBadge();
}

export function updateCartBadge() {
    const cart = getCart();
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('hidden', totalItems <= 0);
}
