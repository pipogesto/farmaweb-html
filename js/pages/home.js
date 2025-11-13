// js/pages/home.js

import { allProducts } from '../db.js';
import { getProductCardHTML } from '../product.js';

// Esta es la función 'default' que el router.js llamará
export default function initHomePage() {
    console.log("Ejecutando JS de la Página de Inicio...");
    
    // 1. Renderizar Categorías
    renderCategories();
    
    // 2. Renderizar Productos Destacados
    renderFeaturedProducts();

    // 3. Renderizar Servicios
    renderServices();
}

// --- FUNCIONES ESPECÍFICAS DE ESTA PÁGINA ---

function renderCategories() {
    // ¡AQUÍ ESTÁ TU LÓGICA DE CATEGORÍAS CON TUS IMÁGENES!
    // La movimos del antiguo 'render.js'
    const categories = [
        { title: "Medicamentos", description: "Amplia gama de medicamentos", icon: "pill", image:"imagenes/medicamentos.png", color: "#3b82f6" },
        { title: "Cuidado Personal", description: "Belleza y cuidado de la piel", icon: "sparkles", image:"imagenes/cuidado-personal.png", color: "#ec4899" },
        { title: "Vitaminas", description: "Suplementos para tu bienestar", icon: "heart", image:"imagenes/vitaminas.png", color: "#10b981" },
        { title: "Bebé y Mamá", description: "Cuidado para los más pequeños", icon: "baby", image: "imagenes/bebe-mama.png", color: "#f59e0b" },
        { title: "Primeros Auxilios", description: "Material de curación y emergencias", icon: "bandage", image: "imagenes/primeros-auxilios.png", color: "#ef4444" },
        { title: "Nutrición", description: "Nutrición deportiva y dietética", icon: "salad", image: "imagenes/nutricion.png", color: "#8b5cf6" },
    ];
    
    // Buscamos el contenedor en el HTML que el router acaba de cargar (pages/inicio.html)
    const categoriesGrid = document.querySelector("#categories-grid-home");
    if (categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(c => `
            <div class="category-card" data-page="catalogo">
                <div class="category-card-image-wrapper"><img src="${c.image}" alt="${c.title}" class="category-card-image" /><div class="category-card-overlay" style="background-color: ${c.color};"></div></div>
                <div class="category-card-content"><div class="category-card-icon-wrapper" style="background-color: ${c.color}20;"><i data-lucide="${c.icon}" style="color: ${c.color};"></i></div><h3 class="category-card-title">${c.title}</h3><p class="category-card-description">${c.description}</p></div>
            </div>`).join('');
    } else {
        console.warn("No se encontró el contenedor #categories-grid-home");
    }
}

async function renderFeaturedProducts() {
    // Buscamos el contenedor en pages/inicio.html
    const productsGrid = document.querySelector("#featured-products-grid");
    if (productsGrid) {
        // Obtenemos los 8 primeros productos de la BD
        const featured = allProducts.slice(0, 8);
        
        // Usamos la función de 'product.js' para crear las tarjetas
        const productCardsHTML = await Promise.all(
             featured.map(product => getProductCardHTML(product))
        );
        productsGrid.innerHTML = productCardsHTML.join('');
        lucide.createIcons(); // Recargar iconos para las tarjetas
    } else {
        console.warn("No se encontró el contenedor #featured-products-grid");
    }
}

function renderServices() {
    // Lógica de los servicios, tomada del antiguo render.js
    const services = [
        { icon: "truck", title: "Envío Rápido", description: "Entrega en 24-48h en toda España" },
        { icon: "shield", title: "Compra Segura", description: "Pagos 100% seguros y protegidos" },
        { icon: "headphones", title: "Atención 24/7", description: "Farmacéuticos a tu disposición" },
        { icon: "credit-card", title: "Múltiples Métodos de Pago", description: "Tarjeta, PayPal, transferencia" },
        { icon: "clock", title: "Farmacia de Guardia", description: "Servicio de emergencias disponible" },
        { icon: "award", title: "Calidad Certificada", description: "Productos originales garantizados" },
    ];
    
    // Buscamos el contenedor en pages/inicio.html
    const servicesGrid = document.querySelector("#services-grid-home");
    if (servicesGrid) {
        servicesGrid.innerHTML = services.map(s => `
            <div class="service-card"><div class="service-icon-wrapper"><i data-lucide="${s.icon}"></i></div><div><h3 class="service-title">${s.title}</h3><p class="service-description">${s.description}</p></div></div>`).join('');
    } else {
        console.warn("No se encontró el contenedor #services-grid-home");
    }
}
