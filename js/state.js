// js/state.js

// --- 1. ESTADO DE LA APLICACIÓN ---
let cart = [];
let currentUser = null;

// Base de datos simulada de Usuarios
const allUsers = [
    { email: "cliente@email.com", password: "123", role: "user", name: "Juan Cliente" },
    { email: "admin@farmaplus.com", password: "admin123", role: "admin", name: "Admin FarmaPlus" }
];

// Base de datos simulada de Productos
const allProducts = [
    { id: "1", name: "Paracetamol  500mg", description: "Analgésico y antipirético.", price: 80, image: "https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib-rb-4.1.0&q=80&w=1080", rating: 5, badge: "-20%", category: "medicamentos" },
    { id: "2", name: "Ibuprofeno 400mg", description: "Antiinflamatorio no esteroideo.", price: 130, image: "https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib-rb-4.1.0&q=80&w=1080", rating: 5, category: "medicamentos" },
    { id: "5", name: "Crema Hidratante Facial", description: "Hidratación profunda 24h.", price: 320, originalPrice: 460, image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", rating: 4, badge: "-30%", category: "cuidado-personal" },
    { id: "6", name: "Protector Solar SPF 50+", description: "Protección muy alta.", price: 339, originalPrice: 439, image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, badge: "Nuevo", category: "cuidado-personal" },
    { id: "9", name: "Vitamina C 1000mg", description: "Refuerza tu sistema inmune.", price: 250, image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "vitaminas" },
    { id: "13", name: "Pañales Bebé Talla 3", description: "Máxima absorción y confort.", price: 379, image: "https://images.unsplash.com/photo-1738892248232-a5fd26a98ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTIwNzc4MHww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "bebe" },
    { id: "17", name: "Kit Primeros Auxilios", description: "Botiquín completo para el hogar.", price: 499, image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "primeros-auxilios" },
    { id: "20", name: "Tensiómetro Digital", description: "Medición automática.", price: 699, image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "primeros-auxilios" }
];

// --- 2. EXPORTACIONES ---

// Exportamos las constantes
export { allUsers, allProducts };

// Para el estado mutable, exportamos getters y setters
export function getCart() {
    return cart;
}

export function setCart(newCart) {
    cart = newCart;
}

export function getCurrentUser() {
    return currentUser;
}

export function setCurrentUser(newUser) {
    currentUser = newUser;
}