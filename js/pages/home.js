// js/pages/home.js
import { getProductCardHTML } from '../product.js';
import { allProducts } from '../state.js';

export async function renderHomePage(main) {
    // 1. Cargar el HTML estático de la página
    const response = await fetch('pages/inicio.html');
    main.innerHTML = await response.text();

    // 2. Renderizar las secciones dinámicas (que siguen usando JS)
    
    // Renderizar Categorías
    const categories = [
        { title: "Medicamentos", description: "Amplia gama de medicamentos", icon: "pill", image: "https://images.unsplash.com/photo-1622147459102-8a0f3727e4c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib-rb-4.1.0&q=80&w=1080", color: "#3b82f6" },
        { title: "Cuidado Personal", description: "Belleza y cuidado de la piel", icon: "sparkles", image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", color: "#ec4899" },
        { title: "Vitaminas", description: "Suplementos para tu bienestar", icon: "heart", image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#10b981" },
        { title: "Bebé y Mamá", description: "Cuidado para los más pequeños", icon: "baby", image: "https://images.unsplash.com/photo-1738892248232-a5fd26a98ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTIwNzc4MHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#f59e0b" },
        { title: "Primeros Auxilios", description: "Material de curación y emergencias", icon: "bandage", image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", color: "#ef4444" },
        { title: "Nutrición", description: "Nutrición deportiva y dietética", icon: "salad", image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#8b5cf6" },
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
