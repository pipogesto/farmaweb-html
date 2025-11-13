import { allUsers, allProducts } from './db.js';

// --- ESTADO PRIVADO ---
let cart = [];
let currentUser = null;

// --- "GETTERS" (Para leer el estado desde afuera) ---
export const getCart = () => cart;
export const getCurrentUser = () => currentUser;

// --- "SETTERS" (Lógica pura para modificar el estado) ---

export const loginUser = (email, password) => {
    const user = allUsers.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
    }
    return user; // Devuelve el usuario si lo encuentra, o null
};

export const logoutUser = () => {
    const user = currentUser;
    currentUser = null;
    return user; // Devuelve el usuario que se deslogueó
};

export const updateUserInfo = (newName) => {
    if (currentUser) {
        currentUser.name = newName;
    }
};

export const addToCartById = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return null;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    return product; // Devuelve el producto añadido
};

export const updateCartItemQuantity = (productId, newQuantity) => {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        item.quantity = newQuantity;
    }
};

export const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
};

export const clearCart = () => {
    cart = [];
};
