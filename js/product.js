// js/product.js
import { allProducts } from './state.js';
import { getRatingHTML } from './utils.js';
import { loadPage } from './router.js';

// --- CACHÉ DE PLANTILLAS ---
let productCardTemplate = null;

export async function getProductCardHTML(product) {
    // Cargar la plantilla si aún no se ha cargado
    if (!productCardTemplate) {
        try {
            const response = await fetch('components/product-card.html');
            if (!response.ok) throw new Error('No se pudo cargar la plantilla de producto');
            productCardTemplate = await response.text();
        } catch (error) {
            console.error(error);
            return '<p>Error al cargar producto</p>'; // Fallback
        }
    }

    // Reemplazar los marcadores de posición
    let cardHTML = productCardTemplate;
    cardHTML = cardHTML.replace(/{{IMAGE}}/g, product.image);
    cardHTML = cardHTML.replace(/{{NAME}}/g, product.name);
    cardHTML = cardHTML.replace(/{{BADGE}}/g, product.badge ? `<div class="product-card-badge">${product.badge}</div>` : '');
    cardHTML = cardHTML.replace(/{{RATING}}/g, getRatingHTML(product.rating));
    cardHTML = cardHTML.replace(/{{RATING_VALUE}}/g, product.rating);
    cardHTML = cardHTML.replace(/{{DESCRIPTION}}/g, product.description);
    cardHTML = cardHTML.replace(/{{PRICE}}/g, product.price.toFixed(2));
    cardHTML = cardHTML.replace(/{{ORIGINAL_PRICE}}/g, product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : '');
    cardHTML = cardHTML.replace(/{{ID}}/g, product.id);

    return cardHTML;
}

export async function filterProducts(category, searchTerm = '') {
    const grid = document.getElementById('catalog-products-grid');
    const count = document.querySelector('.product-count');
    if (!grid || !count) return;

    const searchTermLower = searchTerm.toLowerCase();
    let filteredProducts = allProducts;

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (searchTermLower) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTermLower) || p.description.toLowerCase().includes(searchTermLower));
    }

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--muted-foreground); padding: 2rem 0;">No se encontraron productos que coincidan con tu búsqueda.</p>';
    } else {
        // Esperamos a que todas las promesas de las tarjetas se resuelvan
        const productCardsHTML = await Promise.all(
            filteredProducts.map(product => getProductCardHTML(product))
        );
        grid.innerHTML = productCardsHTML.join('');
        lucide.createIcons(); // Renderizar iconos de estrellas y carrito
    }

    count.textContent = `Mostrando ${filteredProducts.length} de ${allProducts.length} productos`;
}

export function handleSearch(event) {
    const searchTerm = event.target.value.trim();
    const activeLink = document.querySelector('.nav-link.active');
    const currentPage = activeLink ? activeLink.dataset.page : null;

    if (currentPage !== 'catalogo') {
        loadPage('catalogo');
        setTimeout(() => {
            // Asegurarse que la página de catálogo esté cargada antes de filtrar
            const searchInput = document.getElementById('desktop-search-input');
            if (searchInput) searchInput.value = searchTerm; // Mantener el texto
            filterProducts('all', searchTerm);
        }, 100);
    } else {
        filterProducts(document.querySelector('.filter-button.active').dataset.category, searchTerm);
    }
}
