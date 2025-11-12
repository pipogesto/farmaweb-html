// js/pages/catalog.js
import { filterProducts } from '../product.js';

export async function renderCatalogPage(main) {
    // 1. Cargar el HTML estático de la página
    const response = await fetch('pages/catalogo.html');
    main.innerHTML = await response.text();

    // 2. Ejecutar la lógica de la página (crear filtros, mostrar productos)
    const categories = [{ id: "all", name: "Todos" }, { id: "medicamentos", name: "Medicamentos" }, { id: "cuidado-personal", name: "Cuidado Personal" }, { id: "vitaminas", name: "Vitaminas" }, { id: "bebe", name: "Bebé y Mamá" }, { id: "primeros-auxilios", name: "Primeros Auxilios" }];
    const filterButtonsContainer = main.querySelector('.filter-buttons');
    filterButtonsContainer.innerHTML = categories.map(cat => `<button class="filter-button ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button>`).join('');

    filterButtonsContainer.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            document.getElementById('desktop-search-input').value = '';
            filterProducts(category);
            filterButtonsContainer.querySelector('.active').classList.remove('active');
            button.classList.add('active');
        });
    });

    // Cargar productos iniciales (ahora es asíncrono)
    await filterProducts('all', document.getElementById('desktop-search-input').value);
}
