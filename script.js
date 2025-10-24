document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INICIALIZACIÓN ---
    const root = document.getElementById('root');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- 2. ESTADO DE LA APLICACIÓN ---
    let cart = []; // Array para guardar los productos en carrito
    let currentUser = null; // Para saber quién ha iniciado sesión

    // Base de datos simulada de Usuarios
    const allUsers = [
        { email: "cliente@email.com", password: "123", role: "user", name: "Juan Cliente" },
        { email: "admin@farmaplus.com", password: "admin123", role: "admin", name: "Admin FarmaPlus" } // Credenciales actualizadas
    ];

    // Base de datos simulada de Productos
    const allProducts = [
        { id: "1", name: "Paracetamol 500mg", description: "Analgésico y antipirético.", price: 99, image: "https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib=rb-4.1.0&q=80&w=1080", rating: 5, badge: "-20%", category: "medicamentos" },
        { id: "2", name: "Ibuprofeno 400mg", description: "Antiinflamatorio no esteroideo.", price: 130, image: "https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib=rb-4.1.0&q=80&w=1080", rating: 5, category: "medicamentos" },
        { id: "5", name: "Crema Hidratante Facial", description: "Hidratación profunda 24h.", price: 320, originalPrice: 460, image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", rating: 4, badge: "-30%", category: "cuidado-personal" },
        { id: "6", name: "Protector Solar SPF 50+", description: "Protección muy alta.", price: 339, originalPrice: 439, image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, badge: "Nuevo", category: "cuidado-personal" },
        { id: "9", name: "Vitamina C 1000mg", description: "Refuerza tu sistema inmune.", price: 250, image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "vitaminas" },
        { id: "13", name: "Pañales Bebé Talla 3", description: "Máxima absorción y confort.", price: 379, image: "https://images.unsplash.com/photo-1738892248232-a5fd26a98ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTIwNzc4MHww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "bebe" },
        { id: "17", name: "Kit Primeros Auxilios", description: "Botiquín completo para el hogar.", price: 499, image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "primeros-auxilios" },
        { id: "20", name: "Tensiómetro Digital", description: "Medición automática.", price: 699, image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "primeros-auxilios" }
    ];

    // --- 3. MANEJO DE EVENTOS PRINCIPALES ---
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    document.getElementById('desktop-search-input').addEventListener('input', handleSearch);
    document.body.addEventListener('click', handleBodyClick);


    // --- 4. LÓGICA DE LOGIN Y PERMISOS ---
    function handleLogin(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const user = allUsers.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = user; // Inicia sesión
            alert(`Bienvenido, ${currentUser.name}`);
            updateLoginButton(); // Actualiza el botón de login/logout
            // Redirige al dashboard si es admin, si no al inicio
            if (currentUser.role === 'admin') {
                loadPage('admin-dashboard');
            } else {
                loadPage('inicio');
            }
        } else {
            document.getElementById('error-message')?.classList.remove('hidden');
        }
    }

    function handleLogout() {
        if (!currentUser) return;
        alert(`Hasta pronto, ${currentUser.name}`);
        currentUser = null; // Cierra sesión
        updateLoginButton();
        loadPage('inicio');
    }
    
    function updateLoginButton() {
        const loginContainers = document.querySelectorAll('.login-button-container');
        const mobileSeparator = document.querySelector('.login-separator'); // Busca el <hr>

        if (currentUser) {
            // --- USUARIO HA INICIADO SESIÓN ---
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
                // 'data-context' es un atributo que añadimos en el HTML para diferenciar
                if (container.dataset.context === "mobile") {
                    container.innerHTML = mobileHtml;
                } else {
                    container.innerHTML = desktopHtml;
                }
            });
            
            if (mobileSeparator) mobileSeparator.classList.add('hidden'); // Oculta el <hr>

        } else {
            // --- USUARIO NO HA INICIADO SESIÓN ---
            const desktopHtml = `<a href="#" data-page="login" class="login-button"><i data-lucide="user"></i><span>Iniciar Sesión</span></a>`;
            const mobileHtml = `<a href="#" data-page="login" class="nav-link">Iniciar Sesión</a>
                                <a href="#" data-page="registro" class="nav-link">Registrarse</a>`;
            
            loginContainers.forEach(container => {
                if (container.dataset.context === "mobile") {
                    container.innerHTML = mobileHtml;
                } else {
                    container.innerHTML = desktopHtml;
                }
            });

            if (mobileSeparator) mobileSeparator.classList.remove('hidden'); // Muestra el <hr>
        }

        lucide.createIcons();
    }
    
    // --- 5. LÓGICA DEL CARRITO ---
    function addToCart(productId) {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        alert(`${product.name} ha sido añadido al carrito.`);
        updateCartBadge();
    }
    function updateCartItemQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                renderCartPage(root.querySelector('main'));
                updateCartBadge(); // Actualiza el contador en el header
            }
        }
    }
    function removeFromCart(productId){
        cart = cart.filter(item => item.id !== productId);
        renderCartPage(root.querySelector('main'));
        updateCartBadge(); // Actualiza el badge al eliminar
    }
    function clearCart() {
        cart = [];
        updateCartBadge();
    }
    function updateCartBadge() {
        const cartBadge = document.querySelector('.cart-badge');
        if (!cartBadge) return;
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.classList.toggle('hidden', totalItems <= 0);
    }

    // --- NUEVA FUNCIÓN DE BÚSQUEDA ---
    function handleSearch(event) {
        const searchTerm = event.target.value.trim();
        const activeLink = document.querySelector('.nav-link.active');
        const currentPage = activeLink ? activeLink.dataset.page : null;

        // Si el usuario no está en la página del catálogo, lo llevamos allí
        if (currentPage !== 'catalogo') {
            loadPage('catalogo');
            // Usamos un pequeño delay para asegurarnos de que la página del catálogo se ha renderizado
            // antes de intentar filtrar los productos.
            setTimeout(() => {
                filterProducts('all', searchTerm);
            }, 100); // 100ms es suficiente
        } else {
            // Si ya está en el catálogo, filtramos directamente
            filterProducts(document.querySelector('.filter-button.active').dataset.category, searchTerm);
        }
    }
    // --- 6. LÓGICA DEL ROUTER (SPA) ---
    function loadPage(page) {
        const main = root.querySelector('main');
        if (!main) {
            console.error("Error: Elemento 'main' no encontrado.");
            return; 
        }
        main.innerHTML = '';
        window.scrollTo(0, 0);

        // Control de acceso a la página de admin
        if (page === 'admin-dashboard' && (!currentUser || currentUser.role !== 'admin')) {
            alert('Acceso denegado. Debes ser administrador.');
            loadPage('inicio');
            return;
        }

        const pageRenderFunctions = {
            'inicio': renderHomePage,
            'catalogo': renderCatalogPage,
            'carrito': renderCartPage,
            'pago': renderPaymentPage,
            'nosotros': renderNosotrosPage,
            'contacto': renderContactPage,
            'login': renderLoginPage, // Página de Login
            'cuenta': renderCuentaPage, // Página de Mi Cuenta
            'admin-dashboard': renderAdminDashboardPage, // Página de Admin
            'orden-completa': renderOrderCompletePage, // Página de éxito
        };

        const renderFunction = pageRenderFunctions[page] || ((m) => {
            m.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Página en Construcción: ${page}</h1></div>`;
        });

        // Try-catch para capturar errores durante el renderizado
        try {
            renderFunction(main);
            lucide.createIcons(); // Renderizar iconos después de insertar HTML
        } catch (error) {
            console.error(`Error al renderizar la página '${page}':`, error);
            main.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Error al cargar la página</h1><p>Por favor, revisa la consola para más detalles.</p></div>`;
        }
        
        updateActiveLink(page);
        closeMobileMenu();
    }

    // --- 7. FUNCIONES DE RENDERIZADO DE PÁGINAS ---

    function renderHomePage(main) {
        const heroSectionHTML = `
            <section class="hero-section">
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-text">
                            <div class="hero-badge">✨ Envío gratuito en pedidos superiores a $900 MXN</div>
                            <h1 class="hero-title">Tu salud es nuestra prioridad</h1>
                            <p class="hero-description">Encuentra todos los productos farmacéuticos y de cuidado personal que necesitas. Asesoramiento profesional y entrega rápida.</p>
                            <div class="hero-actions">
                                <a href="#" data-page="catalogo" class="button button-primary"><span>Ver Productos</span><i data-lucide="arrow-right"></i></a>
                                <a href="#" data-page="contacto" class="button button-outline"><span>Consulta Online</span></a>
                            </div>
                            <div class="hero-stats">
                                <div class="stat-item"><div class="value">+20.000</div><div class="label">Productos</div></div>
                                <div class="stat-item"><div class="value">24/7</div><div class="label">Atención</div></div>
                                <div class="stat-item"><div class="value">15+</div><div class="label">Años de experiencia</div></div>
                            </div>
                        </div>
                        <div class="hero-image-container">
                            <img src="https://images.unsplash.com/photo-1758573467057-955f803660a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMGludGVyaW9yfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Farmacia" class="hero-image" />
                        </div>
                    </div>
                </div>
            </section>`;

        const categories = [
            { title: "Medicamentos", description: "Amplia gama de medicamentos", icon: "pill", image: "https://images.unsplash.com/photo-1622147459102-8a0f3727e4c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib=rb-4.1.0&q=80&w=1080", color: "#3b82f6" },
            { title: "Cuidado Personal", description: "Belleza y cuidado de la piel", icon: "sparkles", image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", color: "#ec4899" },
            { title: "Vitaminas", description: "Suplementos para tu bienestar", icon: "heart", image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#10b981" },
            { title: "Bebé y Mamá", description: "Cuidado para los más pequeños", icon: "baby", image: "https://images.unsplash.com/photo-1738892248232-a5fd26a98ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTIwNzc4MHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#f59e0b" },
            { title: "Primeros Auxilios", description: "Material de curación y emergencias", icon: "bandage", image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", color: "#ef4444" },
            { title: "Nutrición", description: "Nutrición deportiva y dietética", icon: "salad", image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", color: "#8b5cf6" },
        ];
        const categoriesSectionHTML = `
            <section class="categories-section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Categorías Destacadas</h2>
                        <p class="section-description">Explora nuestra amplia selección de productos organizados por categorías</p>
                    </div>
                    <div class="categories-grid">
                        ${categories.map(c => `
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
                        `).join('')}
                    </div>
                </div>
            </section>`;
        
        const productsSectionHTML = `
            <section class="products-section">
                <div class="container">
                     <div class="section-header">
                        <h2 class="section-title">Productos Destacados</h2>
                        <p class="section-description">Los productos más vendidos y mejor valorados por nuestros clientes</p>
                    </div>
                    <div class="products-grid">
                        ${allProducts.slice(0, 8).map(getProductCardHTML).join('')}
                    </div>
                    <div class="products-section-footer">
                        <a href="#" data-page="catalogo" class="button button-primary">Ver Todos los Productos</a>
                    </div>
                </div>
            </section>`;

        const services = [
            { icon: "truck", title: "Envío Rápido", description: "Entrega en 24-48h en toda España" },
            { icon: "shield", title: "Compra Segura", description: "Pagos 100% seguros y protegidos" },
            { icon: "headphones", title: "Atención 24/7", description: "Farmacéuticos a tu disposición" },
            { icon: "credit-card", title: "Múltiples Métodos de Pago", description: "Tarjeta, PayPal, transferencia" },
            { icon: "clock", title: "Farmacia de Guardia", description: "Servicio de emergencias disponible" },
            { icon: "award", title: "Calidad Certificada", description: "Productos originales garantizados" },
        ];
        const servicesSectionHTML = `
            <section class="services-section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Nuestros Servicios</h2>
                        <p class="section-description">Comprometidos con tu bienestar y comodidad</p>
                    </div>
                    <div class="services-grid">
                        ${services.map(s => `
                            <div class="service-card">
                                <div class="service-icon-wrapper"><i data-lucide="${s.icon}"></i></div>
                                <div>
                                    <h3 class="service-title">${s.title}</h3>
                                    <p class="service-description">${s.description}</p>
                                </div>
                            </div>`).join('')}
                    </div>
                </div>
            </section>`;

        const ctaSectionHTML = `
            <section class="cta-section">
                <div class="container">
                    <h2 class="cta-title">¿Necesitas asesoramiento profesional?</h2>
                    <p class="cta-description">Nuestro equipo de farmacéuticos está disponible para ayudarte con cualquier consulta sobre salud y medicamentos.</p>
                    <div class="cta-actions">
                        <a href="#" data-page="contacto" class="button button-white">Contactar Ahora</a>
                        <a href="#" data-page="contacto" class="button button-outline-white">Chat Online</a>
                    </div>
                </div>
            </section>`;

        main.innerHTML = heroSectionHTML + categoriesSectionHTML + productsSectionHTML + servicesSectionHTML + ctaSectionHTML;
    }

    function renderCatalogPage(main) {
        main.innerHTML = `
            <div class="catalog-page">
                <div class="container">
                    <div class="page-header">
                        <h1 class="page-title">Catálogo de Productos</h1>
                        <p class="page-description">Encuentra todos nuestros medicamentos genéricos y productos de salud</p>
                    </div>
                    <div class="filter-section">
                        <div class="filter-header"><i data-lucide="filter"></i><h3>Filtrar por categoría</h3></div>
                        <div class="filter-buttons"></div>
                    </div>
                    <div class="products-grid" id="catalog-products-grid"></div>
                    <div class="product-count"></div>
                </div>
            </div>`;
        
        const categories = [{ id: "all", name: "Todos" }, { id: "medicamentos", name: "Medicamentos" }, { id: "cuidado-personal", name: "Cuidado Personal" }, { id: "vitaminas", name: "Vitaminas" }, { id: "bebe", name: "Bebé y Mamá" }, { id: "primeros-auxilios", name: "Primeros Auxilios" }];
        const filterButtonsContainer = main.querySelector('.filter-buttons');
        filterButtonsContainer.innerHTML = categories.map(cat => `<button class="filter-button ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button>`).join('');

        filterButtonsContainer.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                // Limpiamos el campo de búsqueda al cambiar de categoría
                document.getElementById('desktop-search-input').value = '';
                filterProducts(category);
                filterButtonsContainer.querySelector('.active').classList.remove('active');
                button.classList.add('active');
            });
        });
        // Al cargar la página, aplicamos el valor actual del input de búsqueda
        filterProducts('all', document.getElementById('desktop-search-input').value);
    }

    function renderCartPage(main) {
       if (cart.length === 0) {
            main.innerHTML = `
                <div class="cart-page empty-cart-message">
                    <div class="empty-cart-content">
                        <i data-lucide="shopping-bag"></i>
                        <h2>Tu carrito está vacío</h2>
                        <p>Añade productos a tu carrito para continuar con la compra</p>
                        <a href="#" data-page="catalogo" class="button button-primary">Ir al Catálogo</a>
                    </div>
                </div>`;
        } else {
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
                        <div class="page-header">
                            <h1 class="page-title">Carrito de Compras</h1>
                            <p class="page-description">Revisa tus productos antes de finalizar la compra</p>
                        </div>
                        <div class="cart-grid">
                            <div class="cart-items-container">${itemsHTML}</div>
                            <div class="order-summary">
                                <h3 class="summary-title">Resumen del Pedido</h3>
                                <div class="summary-row">
                                    <span class="label">Subtotal</span>
                                    <span>$${subtotal.toFixed(2)}</span>
                                </div>
                                <div class="summary-row">
                                    <span class="label">Envío</span>
                                    <span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div class="summary-divider"></div>
                                <div class="summary-total">
                                    <span class="label">Total</span>
                                    <span class="price">$${total.toFixed(2)}</span>
                                </div>
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

    function renderPaymentPage(main) {
        if (cart.length === 0) {
            loadPage('catalogo');
            return;
        }

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal >= 900 ? 0 : 99;
        const total = subtotal + shipping;
        const itemsSummaryHTML = cart.map(item => `<div class="summary-row"><span class="label">${item.name} x${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`).join('');

        main.innerHTML = `
            <div class="payment-page">
                <div class="container">
                    <div class="page-header"><h1 class="page-title">Método de Pago</h1><p class="page-description">Completa los datos para finalizar tu compra</p></div>
                    <form id="payment-form">
                        <div class="payment-grid">
                            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                                <div class="form-section">
                                    <h3>Información de Envío</h3>
                                    <div class="form-grid">
                                        <div class="form-field"><label for="name">Nombre completo *</label><input id="name" name="name" required></div>
                                        <div class="form-field"><label for="phone">Teléfono *</label><input id="phone" name="phone" type="tel" required></div>
                                        <div class="form-field full-width"><label for="email">Email *</label><input id="email" name="email" type="email" required></div>
                                        <div class="form-field full-width"><label for="address">Dirección *</label><input id="address" name="address" required></div>
                                        <div class="form-field"><label for="city">Ciudad *</label><input id="city" name="city" required></div>
                                        <div class="form-field"><label for="postalCode">Código Postal *</label><input id="postalCode" name="postalCode" required></div>
                                    </div>
                                </div>
                                <div class="form-section payment-methods">
                                    <h3>Método de Pago</h3>
                                    <div class="radio-group"><input type="radio" id="card" name="paymentMethod" value="card" checked><label for="card"><i data-lucide="credit-card"></i> Tarjeta de Crédito/Débito</label></div>
                                    <div class="radio-group"><input type="radio" id="paypal" name="paymentMethod" value="paypal"><label for="paypal"><i data-lucide="wallet"></i> PayPal</label></div>
                                    <div class="card-details" id="card-details-section">
                                        <div class="form-field"><label for="cardNumber">Número de Tarjeta *</label><input id="cardNumber" placeholder="1234 5678 9012 3456" required></div>
                                        <div class="form-field"><label for="cardName">Nombre en la Tarjeta *</label><input id="cardName" required></div>
                                        <div class="form-grid">
                                            <div class="form-field"><label for="cardExpiry">Fecha de Expiración *</label><input id="cardExpiry" placeholder="MM/AA" required></div>
                                            <div class="form-field"><label for="cardCVV">CVV *</label><input id="cardCVV" placeholder="123" required></div>
                                        </div>
                                    </div>
                                    <div class="paypal-message" id="paypal-message-section" style="display: none;"><p>Serás redirigido a PayPal para completar el pago.</p></div>
                                </div>
                            </div>
                            <div class="order-summary">
                                <h3 class="summary-title">Resumen del Pedido</h3>
                                <div style="max-height: 15rem; overflow-y: auto; margin-bottom: 1.5rem;">${itemsSummaryHTML}</div>
                                <div class="summary-divider"></div>
                                <div style="margin: 1rem 0;">
                                    <div class="summary-row"><span class="label">Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
                                    <div class="summary-row"><span class="label">Envío</span><span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span></div>
                                    <div class="summary-divider"></div>
                                    <div class="summary-total" style="margin-top: 1rem;"><span class="label">Total</span><span class="price">$${total.toFixed(2)}</span></div>
                                </div>
                                <button type="submit" class="button button-primary w-full">Confirmar Pedido</button>
                                <p class="secure-payment-info">🔒 Pago 100% seguro y encriptado</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>`;
        
        // Añadir listeners para el formulario de pago
        main.querySelector('#payment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Pedido realizado con éxito! (Simulación)');
            clearCart();
            loadPage('orden-completa');
        });
        
        main.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const isCard = e.target.value === 'card';
                main.querySelector('#card-details-section').classList.toggle('hidden', !isCard);
                main.querySelector('#paypal-message-section').classList.toggle('hidden', isCard);
            });
        });
    }
    
    function renderOrderCompletePage(main) {
        const orderNumber = `#FP-${Math.floor(Math.random() * 100000)}`;
        main.innerHTML = `
            <div class="order-complete-page">
                <div class="container">
                    <div class="order-complete-card">
                        <i data-lucide="check-circle-2"></i>
                        <h1>¡Pedido Realizado con Éxito!</h1>
                        <p>Recibirás un correo de confirmación con los detalles de tu pedido. El envío se realizará en 24-48 horas.</p>
                        <div class="order-number-box">
                            <p class="label">Número de pedido</p>
                            <p class="number">${orderNumber}</p>
                        </div>
                        <div class="order-complete-actions">
                            <a href="#" data-page="inicio" class="button button-primary">Volver al Inicio</a>
                            <a href="#" data-page="catalogo" class="button button-outline">Seguir Comprando</a>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    
    function renderNosotrosPage(main) {
        main.innerHTML = `
            <div class="about-page">
                <div class="container">
                    <div class="section-header">
                        <h1 class="page-title">Sobre Nosotros</h1>
                        <p class="section-description">Más de 15 años comprometidos con tu salud y bienestar</p>
                    </div>

                    <img src="https://images.unsplash.com/photo-1650784854945-264d5b0b6b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHRlYW0lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU5MjA4MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Equipo FarmaPlus" class="about-hero-image">

                    <div class="about-story">
                        <h2 class="section-title">Nuestra Historia</h2>
                        <p>FarmaPlus nació en 2010 con una visión clara: hacer que el cuidado de la salud sea accesible para todos. Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en una de las farmacias online más confiables.</p>
                        <p>Nuestro compromiso siempre ha sido ofrecer productos de la más alta calidad, acompañados de un servicio al cliente excepcional. Hoy servimos a miles de clientes, manteniendo los mismos valores que nos inspiraron desde el principio: confianza, calidad y dedicación.</p>
                    </div>

                    <div class="mission-vision-grid">
                        <div class="mission-vision-card">
                            <div class="icon-wrapper blue"><i data-lucide="target"></i></div>
                            <h3>Nuestra Misión</h3>
                            <p>Proporcionar acceso fácil y confiable a productos farmacéuticos de calidad, ofreciendo asesoramiento profesional y un servicio excepcional.</p>
                        </div>
                        <div class="mission-vision-card">
                            <div class="icon-wrapper green"><i data-lucide="award"></i></div>
                            <h3>Nuestra Visión</h3>
                            <p>Ser la farmacia online líder, reconocida por nuestra excelencia en el servicio, innovación y compromiso inquebrantable con la salud de nuestros clientes.</p>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    function renderContactPage(main) {
        main.innerHTML = `
            <div class="contact-page">
                <div class="container">
                    <div class="section-header">
                        <h1 class="page-title">Contacto</h1>
                        <p class="section-description">¿Tienes alguna pregunta? Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.</p>
                    </div>
                    <div class="contact-grid">
                        <div class="contact-info-card">
                            <h3 class="summary-title">Información de Contacto</h3>
                            <div class="contact-info-list">
                                <div class="contact-info-item"><div class="icon-wrapper blue"><i data-lucide="phone"></i></div><div><h4>Teléfono</h4><p>+55 23 69 79 40</p></div></div>
                                <div class="contact-info-item"><div class="icon-wrapper green"><i data-lucide="mail"></i></div><div><h4>Email</h4><p>info@farmaplus.es</p></div></div>
                                <div class="contact-info-item"><div class="icon-wrapper red"><i data-lucide="map-pin"></i></div><div><h4>Dirección</h4><p>Calle Principal 123<br>28001 Madrid, España</p></div></div>
                                <div class="contact-info-item"><div class="icon-wrapper purple"><i data-lucide="clock"></i></div><div><h4>Horario</h4><p>L-V: 9:00-21:00 / S: 10:00-18:00</p></div></div>
                            </div>
                        </div>
                        <div class="form-section">
                            <h3>Envíanos un Mensaje</h3>
                            <form id="contact-form" style="display: flex; flex-direction: column; gap: 1rem;">
                                <div class="form-grid">
                                    <div class="form-field"><label for="contact-name">Nombre *</label><input id="contact-name" required></div>
                                    <div class="form-field"><label for="contact-email">Email *</label><input id="contact-email" type="email" required></div>
                                </div>
                                <div class="form-field full-width"><label for="contact-subject">Asunto</label><input id="contact-subject"></div>
                                <div class="form-field full-width"><label for="contact-message">Mensaje *</label><textarea id="contact-message" rows="5" required></textarea></div>
                                <button type="submit" class="button button-primary" style="align-self: flex-start;">Enviar Mensaje</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`;
        
        // Listener para el formulario de contacto
        main.querySelector('#contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado con éxito. (Simulación)');
            e.target.reset();
        });
    }

    function renderCuentaPage(main) {
        if (!currentUser) {
            loadPage('login');
            return;
        }

        main.innerHTML = `
            <div class="account-page">
                <div class="container">
                    <div class="account-layout">
                        <aside class="account-sidebar">
                            <div class="account-sidebar-header">
                                <h3>${currentUser.name}</h3>
                                <p>${currentUser.email}</p>
                            </div>
                            <ul class="account-nav-list">
                                <li><a href="#" class="account-nav-link active" data-section="summary"><i data-lucide="layout-dashboard"></i><span>Resumen</span></a></li>
                                <li><a href="#" class="account-nav-link" data-section="personal-info"><i data-lucide="user"></i><span>Información Personal</span></a></li>
                                <li><a href="#" class="account-nav-link" data-section="addresses"><i data-lucide="map-pin"></i><span>Mis Direcciones</span></a></li>
                                <li><a href="#" class="account-nav-link" data-section="payment"><i data-lucide="credit-card"></i><span>Métodos de Pago</span></a></li>
                                <li><a href="#" class="account-nav-link" data-section="wishlist"><i data-lucide="heart"></i><span>Lista de Deseos</span></a></li>
                            </ul>
                        </aside>
                        <div class="account-content">
                            <div id="summary" class="account-section">
                                <h2>Resumen de la Cuenta</h2>
                                <p>Bienvenido de nuevo, ${currentUser.name}. Desde aquí puedes gestionar tu información y ver tus pedidos.</p>
                                <!-- Aquí podrías añadir tarjetas con resúmenes de pedidos, etc. -->
                            </div>
                            <div id="personal-info" class="account-section hidden">
                                <h2>Información Personal</h2>
                                <form id="personal-info-form" class="form-grid">
                                    <div class="form-field"><label for="acc-name">Nombre</label><input id="acc-name" value="${currentUser.name}"></div>
                                    <div class="form-field"><label for="acc-email">Email</label><input id="acc-email" type="email" value="${currentUser.email}" readonly></div>
                                    <div class="form-field"><label for="acc-phone">Teléfono</label><input id="acc-phone" type="tel" placeholder="Añade tu teléfono"></div>
                                    <div class="full-width" style="text-align: right;">
                                        <button type="submit" class="button button-primary">Guardar Cambios</button>
                                    </div>
                                </form>
                            </div>
                            <div id="addresses" class="account-section hidden">
                                <h2>Mis Direcciones</h2>
                                <p>Gestiona tus direcciones de envío y facturación.</p>
                                <p style="color: var(--muted-foreground); text-align: center; padding: 2rem;">Aún no has guardado ninguna dirección.</p>
                                <button class="button button-primary">Añadir Nueva Dirección</button>
                            </div>
                            <div id="payment" class="account-section hidden">
                                <h2>Métodos de Pago</h2>
                                <p>Gestiona tus tarjetas guardadas.</p>
                                <p style="color: var(--muted-foreground); text-align: center; padding: 2rem;">Aún no has guardado ninguna tarjeta.</p>
                                <button class="button button-primary">Añadir Nueva Tarjeta</button>
                            </div>
                            <div id="wishlist" class="account-section hidden">
                                <h2>Mi Lista de Deseos</h2>
                                <p>Tus productos favoritos guardados para más tarde.</p>
                                <p style="color: var(--muted-foreground); text-align: center; padding: 2rem;">Tu lista de deseos está vacía.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Lógica para cambiar de sección dentro de la página de cuenta
        const accountContent = main.querySelector('.account-content');
        main.querySelectorAll('.account-nav-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                
                // Actualizar link activo
                main.querySelector('.account-nav-link.active').classList.remove('active');
                link.classList.add('active');

                // Ocultar todas las secciones
                accountContent.querySelectorAll('.account-section').forEach(section => {
                    section.classList.add('hidden');
                });

                // Mostrar la sección correcta
                const sectionId = link.dataset.section;
                const sectionToShow = accountContent.querySelector(`#${sectionId}`);
                if (sectionToShow) {
                    sectionToShow.classList.remove('hidden');
                }
            });
        });

        // Listener para el formulario de información personal
        main.querySelector('#personal-info-form')?.addEventListener('submit', e => {
            e.preventDefault();
            const newName = main.querySelector('#acc-name').value;
            currentUser.name = newName; // Actualizamos el nombre en nuestro estado
            alert('Información actualizada con éxito.');
            updateLoginButton(); // Actualiza el header si el nombre cambió
            loadPage('cuenta'); // Recargamos la página de cuenta para reflejar el nombre
        });
    }

    // =======================================================
    // --- 8. FUNCIONES DE LOGIN Y ADMIN DASHBOARD ---
    // =======================================================

    function renderLoginPage(main) {
        main.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; padding: 4rem 1rem; min-height: 70vh;">
                <div style="background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px; border: 1px solid var(--border);">
                    <h1 style="text-align: center; color: var(--primary); margin-bottom: 2rem;">Iniciar Sesión</h1>
                    <form id="login-form">
                        <div style="margin-bottom: 20px;">
                            <label for="email" style="display: block; font-weight: bold; margin-bottom: 5px;">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" required style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 5px; box-sizing: border-box;">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="password" style="display: block; font-weight: bold; margin-bottom: 5px;">Contraseña:</label>
                            <input type="password" id="password" name="password" required style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 5px; box-sizing: border-box;">
                        </div>
                        <p id="error-message" class="hidden" style="color: var(--destructive); text-align: center; font-weight: bold; margin-bottom: 1rem;">Correo o contraseña incorrectos.</p>
                        <button type="submit" class="button button-primary w-full">Entrar</button>
                    </form>
                    <div style="text-align: center; margin-top: 20px; font-size: 0.875rem; color: var(--muted-foreground);">
                        <p style="margin-bottom: 0.5rem;"><b>Usuario:</b> cliente@email.com / <b>Pass:</b> 123</p>
                        <p><b>Admin:</b> admin@farmaplus.com / <b>Pass:</b> admin123</p>
                    </div>
                </div>
            </div>`;
        
        // Listener para el formulario de login
        main.querySelector('#login-form').addEventListener('submit', handleLogin);
    }

    function renderAdminDashboardPage(main) {
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Acceso denegado. Debes ser administrador.');
            loadPage('inicio');
            return;
        }

        main.innerHTML = `
            <div class="admin-dashboard-container">
                <div class="dashboard-header">
                    <div>
                        <h1>Panel de Administración</h1>
                        <p>Monitorea y gestiona tu farmacia en tiempo real</p>
                    </div>
                    <div class="dashboard-actions">
                        <select class="dashboard-select">
                            <option value="this-week">Esta semana</option>
                            <option value="last-week">Semana pasada</option>
                            <option value="this-month">Este mes</option>
                            <option value="last-month">Mes pasado</option>
                        </select>
                        <button class="dashboard-export-btn">
                            <i data-lucide="download"></i>
                            <span>Exportar</span>
                        </button>
                    </div>
                </div>

                <div class="summary-cards-grid">
                    <div class="summary-card">
                        <div class="summary-card-header">
                            <div class="summary-card-icon ingresos">
                                <i data-lucide="dollar-sign"></i>
                            </div>
                            <span class="summary-card-trend positive">
                                <i data-lucide="trending-up"></i> +12.5%
                            </span>
                        </div>
                        <h2>$43,500</h2>
                        <p>Ingresos Totales</p>
                    </div>
                    <div class="summary-card">
                        <div class="summary-card-header">
                            <div class="summary-card-icon pedidos">
                                <i data-lucide="shopping-cart"></i>
                            </div>
                            <span class="summary-card-trend positive">
                                <i data-lucide="trending-up"></i> +8.2%
                            </span>
                        </div>
                        <h2>125</h2>
                        <p>Pedidos</p>
                    </div>
                    <div class="summary-card">
                        <div class="summary-card-header">
                            <div class="summary-card-icon clientes">
                                <i data-lucide="users"></i>
                            </div>
                            <span class="summary-card-trend positive">
                                <i data-lucide="trending-up"></i> +15.3%
                            </span>
                        </div>
                        <h2>342</h2>
                        <p>Clientes Activos</p>
                    </div>
                    <div class="summary-card">
                        <div class="summary-card-header">
                            <div class="summary-card-icon ticket">
                                <i data-lucide="package"></i>
                            </div>
                            <span class="summary-card-trend negative">
                                <i data-lucide="trending-down"></i> -2.1%
                            </span>
                        </div>
                        <h2>$348.00</h2>
                        <p>Ticket Promedio</p>
                    </div>
                </div>

                <div class="charts-and-lists-grid">
                    <div class="chart-card">
                        <h3>Ventas de la Semana</h3>
                        <div style="position: relative; height: 300px;">
                            <canvas id="weeklySalesChart"></canvas>
                        </div>
                    </div>
                    <div class="chart-card">
                        <h3>Distribución por Categoría</h3>
                        <div style="position: relative; height: 300px;">
                            <canvas id="categoryDistributionChart"></canvas>
                        </div>
                    </div>
                    <div class="chart-card" style="grid-column: 1 / -1;">
                        <h3>Tendencia de Ventas Mensual</h3>
                        <div style="position: relative; height: 300px;">
                            <canvas id="monthlySalesChart"></canvas>
                        </div>
                    </div>
                    <div class="list-card">
                        <div class="list-card-header">
                            <h3>Productos Más Vendidos</h3>
                            <a href="#" class="link">Ver todos</a>
                        </div>
                        <div class="product-list">
                            <div class="product-item">
                                <div class="product-item-info">
                                    <span class="rank">1</span>
                                    <img src="${allProducts.length > 0 ? allProducts[0].image : ''}" alt="${allProducts.length > 0 ? allProducts[0].name : ''}">
                                    <div class="product-item-details">
                                        <strong>${allProducts.length > 0 ? allProducts[0].name : 'N/A'}</strong>
                                        <span>150 ventas</span>
                                    </div>
                                </div>
                                <div class="product-item-sales">
                                    <strong>$14,850</strong>
                                    <span>ingresos</span>
                                </div>
                            </div>
                            <div class="product-item">
                                <div class="product-item-info">
                                    <span class="rank">2</span>
                                    <img src="${allProducts.length > 1 ? allProducts[1].image : ''}" alt="${allProducts.length > 1 ? allProducts[1].name : ''}">
                                    <div class="product-item-details">
                                        <strong>${allProducts.length > 1 ? allProducts[1].name : 'N/A'}</strong>
                                        <span>130 ventas</span>
                                    </div>
                                </div>
                                <div class="product-item-sales">
                                    <strong>$16,900</strong>
                                    <span>ingresos</span>
                                </div>
                            </div>
                            <div class="product-item">
                                <div class="product-item-info">
                                    <span class="rank">3</span>
                                     <img src="${allProducts.length > 2 ? allProducts[2].image : ''}" alt="${allProducts.length > 2 ? allProducts[2].name : ''}">
                                    <div class="product-item-details">
                                        <strong>${allProducts.length > 2 ? allProducts[2].name : 'N/A'}</strong>
                                        <span>110 ventas</span>
                                    </div>
                                </div>
                                <div class="product-item-sales">
                                    <strong>$35,200</strong>
                                    <span>ingresos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list-card">
                        <div class="list-card-header">
                            <h3>Pedidos Recientes</h3>
                            <a href="#" class="link">Ver todos</a>
                        </div>
                        <div class="order-list">
                            <div class="order-item">
                                <div class="order-item-details">
                                    <strong>ORD-001 <span class="order-status-badge completed">Completado</span></strong>
                                    <span>María González</span>
                                    <span><i data-lucide="calendar" style="width:1rem;height:1rem; vertical-align: middle;"></i> 2025-09-30</span>
                                </div>
                                <span class="order-item-amount">$850</span>
                            </div>
                            <div class="order-item">
                                <div class="order-item-details">
                                    <strong>ORD-002 <span class="order-status-badge pending">Pendiente</span></strong>
                                    <span>Carlos Ramírez</span>
                                    <span><i data-lucide="calendar" style="width:1rem;height:1rem; vertical-align: middle;"></i> 2025-09-30</span>
                                </div>
                                <span class="order-item-amount">$420</span>
                            </div>
                            <div class="order-item">
                                <div class="order-item-details">
                                    <strong>ORD-003 <span class="order-status-badge in-progress">En Proceso</span></strong>
                                    <span>Ana Martínez</span>
                                    <span><i data-lucide="calendar" style="width:1rem;height:1rem; vertical-align: middle;"></i> 2025-09-29</span>
                                </div>
                                <span class="order-item-amount">$1250</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // --- INICIALIZACIÓN DE GRÁFICOS ---
        // Se usa setTimeout para darle tiempo al DOM a renderizar el canvas
        setTimeout(() => {
            renderWeeklySalesChart();
            renderCategoryDistributionChart();
            renderMonthlySalesChart();
        }, 0); // 0ms de espera es suficiente
    }

    // --- 9. FUNCIONES PARA LOS GRÁFICOS ---
    
    function renderWeeklySalesChart() {
        const ctx = document.getElementById('weeklySalesChart');
        if (!ctx) return; 

        // Destruir gráfico anterior si existe para evitar conflictos
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Ventas ($)',
                    data: [4500, 5200, 4800, 6100, 7500, 8300, 7000],
                    borderColor: 'rgb(37, 99, 235)', // Azul (var(--primary))
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(37, 99, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(37, 99, 235)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return ` Ventas: $${context.parsed.y.toLocaleString('es-MX')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: {
                            callback: function(value) { return `$${value / 1000}k`; }
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                }
            }
        });
    }

    function renderCategoryDistributionChart() {
        const ctx = document.getElementById('categoryDistributionChart');
        if (!ctx) return;

        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Medicamentos', 'Cuidado Personal', 'Vitaminas', 'Bebé', 'Otros'],
                datasets: [{
                    label: 'Distribución',
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        'rgb(37, 99, 235)',
                        'rgb(236, 72, 153)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(100, 116, 139)'
                    ],
                    hoverOffset: 8,
                    borderWidth: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) {
                                    label += context.parsed + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    function renderMonthlySalesChart() {
        const ctx = document.getElementById('monthlySalesChart');
        if (!ctx) return;

        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ventas ($)',
                    data: [45000, 48000, 55000, 52000, 61000, 75000, 83000, 70000, 65000, 88000, 92000, 110000],
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: 'rgb(37, 99, 235)',
                    borderWidth: 2,
                    borderRadius: 4,
                    hoverBackgroundColor: 'rgba(37, 99, 235, 0.4)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index', // Muestra tooltip al pasar sobre el área de la barra
                        intersect: false, // No necesita tocar la barra exactamente
                        callbacks: {
                            label: function(context) {
                                return ` Ventas: $${context.parsed.y.toLocaleString('es-MX')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: {
                            callback: function(value) { return `$${value / 1000}k`; }
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // --- 10. FUNCIONES AUXILIARES ---

    function getRatingHTML(rating) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            // Asegura que use la clase CSS correcta para los iconos de estrella
            html += `<i data-lucide="star" style="width: 1rem; height: 1rem;" class="${i <= rating ? 'star-filled' : 'star-empty'}"></i>`;
        }
        return html;
    }

    function getProductCardHTML(product) {
        return `
            <div class="product-card">
                <div class="product-card-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-card-image" />
                    ${product.badge ? `<div class="product-card-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-card-content">
                    <div class="product-rating">
                        ${getRatingHTML(product.rating)}
                        <span class="product-rating-text">(${product.rating}.0)</span>
                    </div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="product-current-price">$${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <button class="button button-primary add-to-cart-btn" data-product-id="${product.id}">
                            <i data-lucide="shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function filterProducts(category, searchTerm = '') {
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
            filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTermLower) || p.description.toLowerCase().includes(searchTermLower));
        }
        
        if (filteredProducts.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--muted-foreground); padding: 2rem 0;">No se encontraron productos que coincidan con tu búsqueda.</p>';
        } else {
            grid.innerHTML = filteredProducts.map(getProductCardHTML).join('');
            // Volver a renderizar iconos después de insertar las tarjetas
            lucide.createIcons();
        }

        // Lógica para mostrar el contador de productos
        if (searchTerm || category !== 'all') {
            count.textContent = `Mostrando ${filteredProducts.length} de ${allProducts.length} productos`;
        } else {
            // Si no hay filtro ni búsqueda, muestra el total
            count.textContent = `Mostrando ${allProducts.length} productos`;
        }
    }

    function handleBodyClick(event) {
        // Manejador para todos los enlaces de navegación de la SPA
        const pageLink = event.target.closest('[data-page]');
        if (pageLink) {
            event.preventDefault();
            const page = pageLink.getAttribute('data-page');
            loadPage(page);
        }

        // Manejador para el botón de "Añadir al Carrito"
        const addToCartButton = event.target.closest('.add-to-cart-btn');
        if (addToCartButton) {
            const productId = addToCartButton.getAttribute('data-product-id');
            addToCart(productId);
        }

        // Manejadores para los botones del carrito (+, -, eliminar)
        const cartButton = event.target.closest('.quantity-btn, .remove-item-btn');
        if (cartButton) {
            const productId = cartButton.getAttribute('data-product-id');
            const action = cartButton.getAttribute('data-action');
            const item = cart.find(i => i.id === productId);

            if (item) { // Solo si el item existe en el carrito
                if (action === 'increase') {
                    updateCartItemQuantity(productId, item.quantity + 1);
                } else if (action === 'decrease') {
                    updateCartItemQuantity(productId, item.quantity - 1);
                } else if (action === 'remove') {
                    removeFromCart(productId);
                }
            }
        }
        
        // Manejador para el botón de Logout (usando clase)
        const logoutButton = event.target.closest('.logout-button');
        if (logoutButton) {
            event.preventDefault(); // Previene que el <a> de móvil navegue
            handleLogout();
        }

        // Manejador para la navegación interna de la página "Mi Cuenta"
        // NOTA: Se movió la lógica directamente a `renderCuentaPage` para simplificar
        // y asegurar que los listeners se añaden solo cuando la página se renderiza.
        // Esto evita errores si los elementos no existen en el DOM.
        // const accountLink = event.target.closest('.account-nav-link');
        // if (accountLink) {
        //     event.preventDefault();
        //     const sectionId = accountLink.dataset.section;
        //     document.querySelectorAll('.account-section').forEach(s => s.classList.add('hidden'));
        //     document.getElementById(sectionId)?.classList.remove('hidden');
            
        //     document.querySelectorAll('.account-nav-link').forEach(l => l.classList.remove('active'));
        //     accountLink.classList.add('active');
        // }




    }

    function toggleMobileMenu() {
        if (!mobileMenu) return;
        // Elimina el estilo en línea si existe, para evitar conflictos con la clase 'hidden'
        mobileMenu.style.display = ''; 
        mobileMenu.classList.toggle('hidden');
    }

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('hidden');
    }

    function updateActiveLink(currentPage) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // --- 11. INICIO DE LA APLICACIÓN ---
    loadPage('inicio');
    updateCartBadge();
    updateLoginButton();
    
}); // <-- ¡ASEGÚRATE DE QUE ESTA ES LA ÚLTIMA LÍNEA!