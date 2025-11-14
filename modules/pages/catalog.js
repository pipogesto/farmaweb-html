import { allProducts } from '../data.js';
import { getProductCardHTML } from '../ui.js';
import { loadPage } from '../router.js';

const categories = [
    { id: "all", name: "Todos" }, 
    { id: "medicamentos", name: "Medicamentos" }, 
    { id: "cuidado-personal", name: "Cuidado Personal" }, 
    { id: "vitaminas", name: "Vitaminas" }, 
    { id: "bebe", name: "Bebé y Mamá" }, 
    { id: "primeros-auxilios", name: "Primeros Auxilios" }
];

export function initCatalogPage() {
    const filterButtonsContainer = document.querySelector('.filter-buttons');
    if (!filterButtonsContainer) return;

    filterButtonsContainer.innerHTML = categories.map(cat => 
        `<button class="filter-button ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button>`
    ).join('');

    filterButtonsContainer.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            document.getElementById('desktop-search-input').value = '';
            filterProducts(category);
            filterButtonsContainer.querySelector('.active').classList.remove('active');
            button.classList.add('active');
        });
    });

    // Carga inicial con el término de búsqueda actual (si existe)
    filterProducts('all', document.getElementById('desktop-search-input').value);
}

export function filterProducts(category, searchTerm = '') {
    const grid = document.getElementById('catalog-products-grid');
    const count = document.querySelector('.product-count');
    if (!grid || !count) return;

    const searchTermLower = searchTerm.toLowerCase();
    let filteredProducts = allProducts;

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (searchTermLower) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTermLower) || 
            p.description.toLowerCase().includes(searchTermLower)
        );
    }
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--muted-foreground); padding: 2rem 0;">No se encontraron productos que coincidan con tu búsqueda.</p>';
    } else {
        grid.innerHTML = filteredProducts.map(getProductCardHTML).join('');
        lucide.createIcons(); // Re-renderizar iconos de estrellas y carrito
    }

    if (searchTerm || category !== 'all') {
        count.textContent = `Mostrando ${filteredProducts.length} de ${allProducts.length} productos`;
    } else {
        count.textContent = `Mostrando ${allProducts.length} productos`;
    }
}

export function handleSearch(event) {
    const searchTerm = event.target.value.trim();
    const activeLink = document.querySelector('.nav-link.active');
    const currentPage = activeLink ? activeLink.dataset.page : null;

    if (currentPage !== 'catalogo') {
        loadPage('catalogo');
        setTimeout(() => {
            filterProducts('all', searchTerm);
        }, 100);
    } else {
        filterProducts(document.querySelector('.filter-button.active').dataset.category, searchTerm);
    }
}