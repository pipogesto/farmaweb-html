// js/pages/catalog.js

import { allProducts } from '../db.js';
import { getProductCardHTML } from '../product.js';

// Esta es la función 'default' que el router.js llamará
export default function initCatalogPage() {
    console.log("Ejecutando JS de la Página de Catálogo...");

    // Lógica de los filtros, tomada del antiguo render.js
    const categories = [
        { id: "all", name: "Todos" }, 
        { id: "medicamentos", name: "Medicamentos" }, 
        { id: "cuidado-personal", name: "Cuidado Personal" }, 
        { id: "vitaminas", name: "Vitaminas" }, 
        { id: "bebe", name: "Bebé y Mamá" }, 
        { id: "primeros-auxilios", name: "Primeros Auxilios" }
    ];

    const filterButtonsContainer = document.querySelector('.filter-buttons');
    if (filterButtonsContainer) {
        filterButtonsContainer.innerHTML = categories.map(cat => 
            `<button class="filter-button ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button>`
        ).join('');

        // Añadimos los listeners para los botones de filtro
        filterButtonsContainer.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                document.getElementById('desktop-search-input').value = '';
                filterProducts(category); // Llama a la función de renderizado
                
                // Actualiza el botón activo
                filterButtonsContainer.querySelector('.filter-button.active').classList.remove('active');
                button.classList.add('active');
            });
        });
    }

    // Carga inicial de todos los productos
    // Usamos el valor que ya pueda tener la barra de búsqueda
    const searchTerm = document.getElementById('desktop-search-input').value;
    filterProducts('all', searchTerm);
}

/**
 * Filtra y muestra los productos en la cuadrícula del catálogo
 * @param {string} category - La categoría para filtrar (ej. 'all', 'medicamentos')
 * @param {string} searchTerm - El texto para buscar
 */
async function filterProducts(category, searchTerm = '') {
    const grid = document.getElementById('catalog-products-grid');
    const count = document.querySelector('.product-count');
    if (!grid || !count) return;

    const searchTermLower = searchTerm.toLowerCase();
    let filteredProducts = allProducts;

    // 1. Filtrar por categoría
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // 2. Filtrar por término de búsqueda (nombre o descripción)
    if (searchTermLower) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTermLower) || 
            p.description.toLowerCase().includes(searchTermLower)
        );
    }
    
    // 3. Renderizar los productos
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--muted-foreground); padding: 2rem 0;">No se encontraron productos que coincidan con tu búsqueda.</p>';
    } else {
        // Usamos la función de 'product.js' para crear todas las tarjetas
        const productCardsHTML = await Promise.all(
            filteredProducts.map(product => getProductCardHTML(product))
        );
        grid.innerHTML = productCardsHTML.join('');
        lucide.createIcons(); // Recargar iconos
    }

    // 4. Actualizar el contador
    count.textContent = `Mostrando ${filteredProducts.length} de ${allProducts.length} productos`;
}
