// js/cart.js

import { allProducts } from './db.js';

// Esta es la variable "privada" que almacena el estado del carrito
let cart = [];

// --- FUNCIONES INTERNAS ---

/**
 * Carga el carrito desde localStorage al iniciar la app
 */
function loadCart() {
    const storedCart = localStorage.getItem('farmaPlusCart');
    cart = storedCart ? JSON.parse(storedCart) : [];
}

/**
 * Guarda el carrito en localStorage cada vez que se modifica
 */
function saveCart() {
    localStorage.setItem('farmaPlusCart', JSON.stringify(cart));
}

// --- FUNCIONES PÚBLICAS (EXPORTADAS) ---

/**
 * Se llama desde main.js al arrancar. Carga el carrito y actualiza el badge.
 */
export function initCart() {
    loadCart();
    updateCartBadge();
}

/**
 * Devuelve una copia del estado actual del carrito
 */
export function getCart() {
    return [...cart]; // Devuelve una copia para no modificar el original
}

/**
 * Añade un producto al carrito por su ID
 */
export function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartBadge();
    return product; // Devuelve el producto que se añadió
}

/**
 * Actualiza la cantidad de un producto en el carrito
 */
export function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (newQuantity <= 0) {
        // Si la cantidad es 0 o menos, elimínalo
        removeFromCart(productId);
    } else {
        item.quantity = newQuantity;
        saveCart();
        updateCartBadge();
    }
}

/**
 * Elimina un producto del carrito
 */
export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
}

/**
 * Vacía todo el carrito (usado después de un pago)
 */
export function clearCart() {
    cart = [];
    saveCart();
    updateCartBadge();
}

/**
 * Actualiza el contador (badge) del carrito en el header
 */
export function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('hidden', totalItems <= 0);
}
