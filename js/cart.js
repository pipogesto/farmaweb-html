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

    alert(`${product.name} ha sido añadido al carrito.`);
    updateCartBadge();
    renderCartUI(); // 🔄 Actualiza la vista
}

export function updateCartItemQuantity(productId, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        updateCartBadge();
        renderCartUI(); // 🔄 Actualiza la vista
        return true;
    }
    return false;
}

export function removeFromCart(productId) {
    let cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    updateCartBadge();
    renderCartUI(); // 🔄 Actualiza la vista
    return true;
}

export function clearCart() {
    setCart([]);
    updateCartBadge();
    renderCartUI(); // 🔄 Limpia la vista
}

export function updateCartBadge() {
    const cart = getCart();
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('hidden', totalItems <= 0);
}

// 🆕 NUEVA FUNCIÓN: Renderiza el carrito en pantalla
export function renderCartUI() {
    const cart = getCart();
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>Cantidad: ${item.quantity}</span>
            <button onclick="window.increaseQuantity('${item.id}')">+</button>
            <button onclick="window.decreaseQuantity('${item.id}')">-</button>
            <button onclick="window.removeFromCart('${item.id}')">Eliminar</button>
        `;
        cartContainer.appendChild(itemElement);
    });
}

// 🆕 FUNCIONES GLOBALES para botones dinámicos
window.increaseQuantity = function(productId) {
    let cart = getCart();
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity++;
        updateCartBadge();
        renderCartUI();
    }
};

window.decreaseQuantity = function(productId) {
    let cart = getCart();
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== productId);
            setCart(cart);
        }
        updateCartBadge();
        renderCartUI();
    }
};

window.removeFromCart = function(productId) {
    removeFromCart(productId);
};}

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
