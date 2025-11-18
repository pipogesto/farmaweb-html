// modules/state.js

// --- 1. CARGA INICIAL (Lectura) ---
// Intentamos recuperar datos guardados en el navegador al abrir la página.
// 'localStorage' mantiene los datos incluso si cierras la ventana.
const savedCart = localStorage.getItem('farma_cart');
const savedUser = localStorage.getItem('farma_user');

// Inicializamos las variables:
// Si encontramos datos guardados, los usamos (convirtiéndolos de texto a código con JSON.parse).
// Si no, iniciamos con valores vacíos ([] o null).
export let cart = savedCart ? JSON.parse(savedCart) : [];
export let currentUser = savedUser ? JSON.parse(savedUser) : null;


// --- 2. FUNCIONES DE ACTUALIZACIÓN (Escritura) ---

export function setCart(newCart) {
    cart = newCart; // Actualizamos la variable en tiempo real
    
    // Guardamos inmediatamente la nueva lista en el navegador.
    // 'JSON.stringify' convierte tu lista de productos en un texto plano para poder guardarlo.
    localStorage.setItem('farma_cart', JSON.stringify(cart));
}

export function setCurrentUser(newUser) {
    currentUser = newUser; // Actualizamos el usuario actual
    
    if (newUser) {
        // Si el usuario hace login, guardamos sus datos
        localStorage.setItem('farma_user', JSON.stringify(newUser));
    } else {
        // Si el usuario hace logout (newUser es null), borramos los datos del navegador
        localStorage.removeItem('farma_user');
    }
}