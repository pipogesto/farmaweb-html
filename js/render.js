import { allProducts } from './db.js';
import { getCart, getCurrentUser } from './state.js';
import { getRatingHTML, closeMobileMenu } from './utils.js';

// --- CACHÉ DE PLANTILLAS ---
let productCardTemplate = null;
const root = document.getElementById('root');

// --- CARGADOR DE PÁGINAS (ROUTER) ---
export async function loadPage(page) {
    const main = root.querySelector('main');
    if (!main) {
        console.error("Error: Elemento 'main' no encontrado.");
        return; 
    }
    main.innerHTML = ''; // Limpia el contenido anterior
    window.scrollTo(0, 0);

    // Control de acceso
    const user = getCurrentUser();
    if (page === 'admin-dashboard' && (!user || user.role !== 'admin')) {
        alert('Acceso denegado. Debes ser administrador.');
        await loadPage('inicio'); 
        return;
    }
    if (page === 'cuenta' && !user) {
        alert('Debes iniciar sesión para ver tu cuenta.');
        await loadPage('login');
        return;
    }

    const pageRenderFunctions = {
        'inicio': renderHomePage,
        'catalogo': renderCatalogPage,
        'carrito': renderCartPage,
        'pago': renderPaymentPage,
        'nosotros': renderNosotrosPage,
        'contacto': renderContactPage,
        'login': renderLoginPage,
        'cuenta': renderCuentaPage, 
        'admin-dashboard': renderAdminDashboardPage,
        'orden-completa': renderOrderCompletePage,
    };

    const renderFunction = pageRenderFunctions[page];

    try {
        if (renderFunction) {
            await renderFunction(main); 
        } else {
            main.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Página en Construcción: ${page}</h1></div>`;
        }
        lucide.createIcons();
    } catch (error) {
        console.error(`Error al renderizar la página '${page}':`, error);
        main.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Error al cargar la página</h1><p>Por favor, revisa la consola para más detalles.</p></div>`;
    }
    
    updateActiveLink(page);
    closeMobileMenu();
}

// --- FUNCIONES DE RENDERIZADO DE PÁGINAS ---

async function renderHomePage(main) {
    const response = await fetch('pages/inicio.html');
    main.innerHTML = await response.text();

    // Renderizar Categorías
    const categories = [
        { title: "Medicamentos", description: "Amplia gama de medicamentos", icon: "pill", image: "https://images.unsplash.com/photo-1622147459102-8a0f3727e4c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib.rb-4.1.0&q=80&w=1080", color: "#3b82f6" },
        { title: "Cuidado Personal", description: "Belleza y cuidado de la piel", icon: "sparkles", image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", color: "#ec4899" },
        { title: "Vitaminas", description: "Suplementos para tu bienestar", icon: "heart", image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#10b981" },
        { title: "Bebé y Mamá", description: "Cuidado para los más pequeños", icon: "baby", image: "https://images.unsplash.com/photo-1738892248232-a5fd26a98ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTIwNzc4MHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#f59e0b" },
        { title: "Primeros Auxilios", description: "Material de curación y emergencias", icon: "bandage", image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", color: "#ef4444" },
        { title: "Nutrición", description: "Nutrición deportiva y dietética", icon: "salad", image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#8b5cf6" },
    ];
    const categoriesGrid = main.querySelector("#categories-grid-home");
    if(categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(c => `
            <div class="category-card" data-page="catalogo">
                <div class="category-card-image-wrapper"><img src="${c.image}" alt="${c.title}" class="category-card-image" /><div class="category-card-overlay" style="background-color: ${c.color};"></div></div>
                <div class="category-card-content"><div class="category-card-icon-wrapper" style="background-color: ${c.color}20;"><i data-lucide="${c.icon}" style="color: ${c.color};"></i></div><h3 class="category-card-title">${c.title}</h3><p class="category-card-description">${c.description}</p></div>
            </div>`).join('');
    }
    
    // Renderizar Productos Destacados
    const productsGrid = main.querySelector("#featured-products-grid");
    if(productsGrid) {
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
    if(servicesGrid) {
        servicesGrid.innerHTML = services.map(s => `
            <div class="service-card"><div class="service-icon-wrapper"><i data-lucide="${s.icon}"></i></div><div><h3 class="service-title">${s.title}</h3><p class="service-description">${s.description}</p></div></div>`).join('');
    }
}

async function renderCatalogPage(main) {
    const response = await fetch('pages/catalogo.html');
    main.innerHTML = await response.text();

    const categories = [{ id: "all", name: "Todos" }, { id: "medicamentos", name: "Medicamentos" }, { id: "cuidado-personal", name: "Cuidado Personal" }, { id: "vitaminas", name: "Vitaminas" }, { id: "bebe", name: "Bebé y Mamá" }, { id: "primeros-auxilios", name: "Primeros Auxilios" }];
    const filterButtonsContainer = main.querySelector('.filter-buttons');
    filterButtonsContainer.innerHTML = categories.map(cat => `<button class="filter-button ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button>`).join('');

    // Añadimos los listeners de los filtros aquí, ya que son parte del renderizado de esta página
    filterButtonsContainer.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            document.getElementById('desktop-search-input').value = '';
            filterProducts(category); // Llama a la función de renderizado
            filterButtonsContainer.querySelector('.active').classList.remove('active');
            button.classList.add('active');
        });
    });

    await filterProducts('all', document.getElementById('desktop-search-input').value);
}

async function renderCartPage(main) {
   const cart = getCart();
   if (cart.length === 0) {
        const response = await fetch('pages/carrito.html');
        main.innerHTML = await response.text();
    } else {
        // El HTML del carrito lleno es muy dinámico, lo generamos aquí
        const itemsHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-description">${item.description}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="button button-outline quantity-btn" data-product-id="${item.id}" data-action="decrease">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="button button-outline quantity-btn" data-product-id="${item.id}" data-action="increase">+</button>
                        </div>
                        <div class="cart-item-price-section">
                            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                            <button class="icon-button remove-item-btn" data-product-id="${item.id}" data-action="remove">
                                <i data-lucide="trash-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal >= 900 ? 0 : 99;
        const total = subtotal + shipping;

        main.innerHTML = `
            <div class="cart-page">
                <div class="container">
                    <div class="page-header"><h1 class="page-title">Carrito de Compras</h1><p class="page-description">Revisa tus productos antes de finalizar la compra</p></div>
                    <div class="cart-grid">
                        <div class="cart-items-container">${itemsHTML}</div>
                        <div class="order-summary">
                            <h3 class="summary-title">Resumen del Pedido</h3>
                            <div class="summary-row"><span class="label">Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
                            <div class="summary-row"><span class="label">Envío</span><span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span></div>
                            <div class="summary-divider"></div>
                            <div class="summary-total"><span class="label">Total</span><span class="price">$${total.toFixed(2)}</span></div>
                            ${subtotal < 900 ? `<div class="promo-banner">Añade $${(900 - subtotal).toFixed(2)} más para envío gratis</div>` : ''}
                            <div class="cart-page-actions">
                                <a href="#" data-page="pago" class="button button-primary w-full">Proceder al Pago</a>
                                <a href="#" data-page="catalogo" class="button button-outline w-full">Seguir Comprando</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

async function renderPaymentPage(main) {
    const cart = getCart();
    if (cart.length === 0) {
        await loadPage('catalogo');
        return;
    }

    const response = await fetch('pages/pago.html');
    main.innerHTML = await response.text();

    // Rellenar datos dinámicos
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 900 ? 0 : 99;
    const total = subtotal + shipping;
    
    const itemsSummaryHTML = cart.map(item => `<div class="summary-row"><span class="label">${item.name} x${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`).join('');
    const totalsHTML = `
        <div class="summary-row"><span class="label">Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="summary-row"><span class="label">Envío</span><span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span></div>
        <div class="summary-divider"></div>
        <div class="summary-total" style="margin-top: 1rem;"><span class="label">Total</span><span class="price">$${total.toFixed(2)}</span></div>
    `;

    main.querySelector('#payment-summary-items').innerHTML = itemsSummaryHTML;
    main.querySelector('#payment-summary-totals').innerHTML = totalsHTML;
    
    // Añadimos listeners locales para los radio buttons
    main.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const isCard = e.target.value === 'card';
            main.querySelector('#card-details-section').classList.toggle('hidden', !isCard);
            main.querySelector('#paypal-message-section').classList.toggle('hidden', isCard);
        });
    });
}

async function renderOrderCompletePage(main) {
    const response = await fetch('pages/orden-completa.html');
    main.innerHTML = await response.text();
    
    // Rellenar número de orden
    const orderNumber = `#FP-${Math.floor(Math.random() * 100000)}`;
    main.querySelector('#order-number').textContent = orderNumber;
}

async function renderNosotrosPage(main) {
    const response = await fetch('pages/nosotros.html');
    main.innerHTML = await response.text();
}

async function renderContactPage(main) {
    const response = await fetch('pages/contacto.html');
    main.innerHTML = await response.text();
}

async function renderLoginPage(main) {
    const response = await fetch('pages/login.html');
    main.innerHTML = await response.text();
}

async function renderCuentaPage(main) {
    const response = await fetch('pages/cuenta.html');
    main.innerHTML = await response.text();
    
    // Rellenar datos del usuario
    const currentUser = getCurrentUser();
    main.querySelector('#account-user-name').textContent = currentUser.name;
    main.querySelector('#account-user-email').textContent = currentUser.email;
    main.querySelector('#account-welcome-name').textContent = currentUser.name.split(' ')[0];
    main.querySelector('#acc-name').value = currentUser.name;
    main.querySelector('#acc-email').value = currentUser.email;

    // Lógica para cambiar de sección
    const accountContent = main.querySelector('.account-content');
    main.querySelectorAll('.account-nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            main.querySelector('.account-nav-link.active').classList.remove('active');
            link.classList.add('active');
            accountContent.querySelectorAll('.account-section').forEach(section => section.classList.add('hidden'));
            const sectionId = link.dataset.section;
            accountContent.querySelector(`#${sectionId}`)?.classList.remove('hidden');
        });
    });
}

async function renderAdminDashboardPage(main) {
    const response = await fetch('pages/admin-dashboard.html');
    main.innerHTML = await response.text();

    // Rellenar la lista de productos más vendidos
    const productList = main.querySelector('.product-list');
    if (productList) {
        productList.innerHTML = allProducts.slice(0, 3).map((product, index) => `
            <div class="product-item">
                <div class="product-item-info">
                    <span class="rank">${index + 1}</span>
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-item-details">
                        <strong>${product.name}</strong>
                        <span>${150 - (index * 20)} ventas</span>
                    </div>
                </div>
                <div class="product-item-sales">
                    <strong>$${(product.price * (150 - (index * 20)) * 0.75).toFixed(0)}</strong>
                    <span>ingresos</span>
                </div>
            </div>
        `).join('');
    }
    
    // --- INICIALIZACIÓN DE GRÁFICOS ---
    setTimeout(() => {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js no está cargado');
            return;
        }
        renderWeeklySalesChart();
        renderCategoryDistributionChart();
        renderMonthlySalesChart();
    }, 0); 
}

// --- FUNCIONES DE GRÁFICOS (privadas de este módulo) ---

function renderWeeklySalesChart() {
    const ctx = document.getElementById('weeklySalesChart');
    if (!ctx) return; 
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();
    new Chart(ctx, { type: 'line', data: { labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], datasets: [{ label: 'Ventas ($)', data: [4500, 5200, 4800, 6100, 7500, 8300, 7000], borderColor: 'rgb(37, 99, 235)', backgroundColor: 'rgba(37, 99, 235, 0.1)', fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: function(value) { return `$${value / 1000}k`; } } } } } });
}
function renderCategoryDistributionChart() {
    const ctx = document.getElementById('categoryDistributionChart');
    if (!ctx) return;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();
    new Chart(ctx, { type: 'doughnut', data: { labels: ['Medicamentos', 'Cuidado Personal', 'Vitaminas', 'Bebé', 'Otros'], datasets: [{ label: 'Distribución', data: [45, 25, 15, 10, 5], backgroundColor: ['rgb(37, 99, 235)', 'rgb(236, 72, 153)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)', 'rgb(100, 116, 139)'], hoverOffset: 8, borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } } });
}
function renderMonthlySalesChart() {
    const ctx = document.getElementById('monthlySalesChart');
    if (!ctx) return;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();
    new Chart(ctx, { type: 'bar', data: { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], datasets: [{ label: 'Ventas ($)', data: [45000, 48000, 55000, 52000, 61000, 75000, 83000, 70000, 65000, 88000, 92000, 110000], backgroundColor: 'rgba(37, 99, 235, 0.2)', borderColor: 'rgb(37, 99, 235)', borderWidth: 2, borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: function(value) { return `$${value / 1000}k`; } } } } } });
}

// --- OTRAS FUNCIONES DE RENDERIZADO ---

export function updateCartBadge() {
    const cart = getCart();
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('hidden', totalItems <= 0);
}

export function updateLoginButton() {
    const currentUser = getCurrentUser();
    const loginContainers = document.querySelectorAll('.login-button-container');
    const mobileSeparator = document.querySelector('.login-separator');

    if (currentUser) {
        let desktopHtml = '';
        let mobileHtml = '';

        if (currentUser.role === 'admin') {
            desktopHtml += `<a href="#" data-page="admin-dashboard" class="nav-link" style="font-size: 0.875rem;">Panel Admin</a>`;
            mobileHtml += `<a href="#" data-page="admin-dashboard" class="nav-link">Panel Admin</a>`;
        }
        desktopHtml += `<a href="#" data-page="cuenta" class="nav-link" style="font-size: 0.875rem;">Mi Cuenta</a>
                        <button class="button button-outline logout-button" style="padding: 0.5rem 0.75rem; font-size: 0.875rem;">Cerrar Sesión</button>`;
        mobileHtml += `<a href="#" data-page="cuenta" class="nav-link">Mi Cuenta</a>
                    <a href="#" class="nav-link logout-button">Cerrar Sesión</a>`;

        loginContainers.forEach(container => {
            container.innerHTML = container.dataset.context === "mobile" ? mobileHtml : desktopHtml;
        });
        if (mobileSeparator) mobileSeparator.classList.add('hidden');

    } else {
        const desktopHtml = `<a href="#" data-page="login" class="login-button"><i data-lucide="user"></i><span>Iniciar Sesión</span></a>`;
        const mobileHtml = `<a href="#" data-page="login" class="nav-link">Iniciar Sesión</a>
                            <a href="#" data-page="registro" class="nav-link">Registrarse</a>`;
        
        loginContainers.forEach(container => {
            container.innerHTML = container.dataset.context === "mobile" ? mobileHtml : desktopHtml;
        });
        if (mobileSeparator) mobileSeparator.classList.remove('hidden');
    }
    lucide.createIcons();
}

async function getProductCardHTML(product) {
    if (!productCardTemplate) {
        try {
            const response = await fetch('components/product-card.html');
            if (!response.ok) throw new Error('No se pudo cargar la plantilla de producto');
            productCardTemplate = await response.text();
        } catch (error) {
            console.error(error);
            return '<p>Error al cargar producto</p>';
        }
    }

    let cardHTML = productCardTemplate;
    cardHTML = cardHTML.replace(/{{ID}}/g, product.id);
    cardHTML = cardHTML.replace(/{{IMAGE}}/g, product.image);
    cardHTML = cardHTML.replace(/{{NAME}}/g, product.name);
    cardHTML = cardHTML.replace('{{BADGE}}', product.badge ? `<div class="product-card-badge">${product.badge}</div>` : '');
    cardHTML = cardHTML.replace('{{RATING}}', getRatingHTML(product.rating));
    cardHTML = cardHTML.replace('{{RATING_VALUE}}', product.rating);
    cardHTML = cardHTML.replace('{{DESCRIPTION}}', product.description);
    cardHTML = cardHTML.replace('{{PRICE}}', product.price.toFixed(2));
    cardHTML = cardHTML.replace('{{ORIGINAL_PRICE}}', product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : '');

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
        const productCardsHTML = await Promise.all(
            filteredProducts.map(product => getProductCardHTML(product))
        );
        grid.innerHTML = productCardsHTML.join('');
        lucide.createIcons();
    }

    count.textContent = `Mostrando ${filteredProducts.length} de ${allProducts.length} productos`;
}

function updateActiveLink(currentPage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === currentPage);
    });
}
