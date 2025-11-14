import { allProducts } from '../data.js';
import { getProductCardHTML } from '../ui.js';

export function initHomePage() {
    const grid = document.getElementById('home-products-grid');
    if (!grid) return;

    // Carga solo los productos destacados
    grid.innerHTML = allProducts.slice(0, 8).map(getProductCardHTML).join('');
}