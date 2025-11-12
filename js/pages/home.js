// js/pages/home.js
import { getProductCardHTML } from '../product.js';
import { allProducts } from '../state.js';

export async function renderHomePage(main) {
    // 1. Cargar el HTML estático de la página
    const response = await fetch('pages/inicio.html');
    main.innerHTML = await response.text();

    // 2. Renderizar las secciones dinámicas (que siguen usando JS)
    
    // Renderizar Categorías
    // js/pages/home.js

    // Renderizar Categorías
    const categories = [
        // Asegúrate de que los nombres de archivo coincidan con los que subiste
        { title: "Medicamentos", description: "Amplia gama de medicamentos", icon: "pill", image: "imagenes/medicamentos.pgn", color: "#3b82f6" },
        { title: "Cuidado Personal", description: "Belleza y cuidado de la piel", icon: "sparkles", image: "imagenes/cuidado-personal.pgn", color: "#ec4899" },
        { title: "Vitaminas", description: "Suplementos para tu bienestar", icon: "heart", image: "imagenes/vitaminas.pgn", color: "#10b981" },
        { title: "Bebé y Mamá", description: "Cuidado para los más pequeños", icon: "baby", image: "imagenes/bebe-mama.pgn", color: "#f59e0b" },
        { title: "Primeros Auxilios", description: "Material de curación y emergencias", icon: "bandage", image: "imagenes/primeros-auxilios.pgn", color: "#ef4444" },
        { title: "Nutrición", description: "Nutrición deportiva y dietética", icon: "salad", image: "imagenes/nutricion.pgn", color: "#8b5cf6" },
    ];// js/pages/home.js

    // Renderizar Categorías
    const categories = [
        // Asegúrate de que los nombres de archivo coincidan con los que subiste
        { title: "Medicamentos", description: "Amplia gama de medicamentos", icon: "pill", image: "imagenes/medicamentos.jpg", color: "#3b82f6" },
        { title: "Cuidado Personal", description: "Belleza y cuidado de la piel", icon: "sparkles", image: "imagenes/cuidado-personal.jpg", color: "#ec4899" },
        { title: "Vitaminas", description: "Suplementos para tu bienestar", icon: "heart", image: "imagenes/vitaminas.jpg", color: "#10b981" },
        { title: "Bebé y Mamá", description: "Cuidado para los más pequeños", icon: "baby", image: "imagenes/bebe-mama.jpg", color: "#f59e0b" },
        { title: "Primeros Auxilios", description: "Material de curación y emergencias", icon: "bandage", image: "imagenes/primeros-auxilios.jpg", color: "#ef4444" },
        { title: "Nutrición", description: "Nutrición deportiva y dietética", icon: "salad", image: "imagenes/nutricion.jpg", color: "#8b5cf6" },
    ];
    const categoriesGrid = main.querySelector("#categories-grid-home");
    if (categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(c => `
            <div class="category-card" data-page="catalogo">
                <div class="category-card-image-wrapper">
                    <img src="${c.image}" alt="${c.title}" class="category-card-image" />
                    <div class="category-card-overlay" style="background-color: ${c.color};"></div>
                </div>
                <div class="category-card-content">
                    <div class="category-card-icon-wrapper" style="background-color: ${c.color}20;">
                        <i data-lucide="${c.icon}" style="color: ${c.color};"></i>
                    </div>
                    <h3 class="category-card-title">${c.title}</h3>
                    <p class="category-card-description">${c.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Renderizar Productos Destacados (usando la nueva función asíncrona)
    const productsGrid = main.querySelector("#featured-products-grid");
    if (productsGrid) {
        // Esperamos a que todas las tarjetas de producto se generen
        const productCardsHTML = await Promise.all(
            allProducts.slice(0, 8).map(product => getProductCardHTML(product))
        );
        productsGrid.innerHTML = productCardsHTML.join('');
    }

    // Renderizar Servicios
    const services = [
        { icon: "truck", title: "Envío Rápido", description: "Entrega en 24-48h en toda España" },
        { icon: "shield", title: "Compra Segura", description: "Pagos 100% seguros y protegidos" },
        { icon: "headphones", title: "Atención 24/7", description: "Farmacéuticos a tu disposición" },
        { icon: "credit-card", title: "Múltiples Métodos de Pago", description: "Tarjeta, PayPal, transferencia" },
        { icon: "clock", title: "Farmacia de Guardia", description: "Servicio de emergencias disponible" },
        { icon: "award", title: "Calidad Certificada", description: "Productos originales garantizados" },
    ];
    const servicesGrid = main.querySelector("#services-grid-home");
    if (servicesGrid) {
        servicesGrid.innerHTML = services.map(s => `
            <div class="service-card">
                <div class="service-icon-wrapper"><i data-lucide="${s.icon}"></i></div>
                <div>
                    <h3 class="service-title">${s.title}</h3>
                    <p class="service-description">${s.description}</p>
                </div>
            </div>`).join('');
    }
}
