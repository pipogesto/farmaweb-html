   document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INICIALIZACIÓN ---
    const root = document.getElementById('root');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- 2. ESTADO DE LA APLICACIÓN ---
    let cart = []; 
    let currentUser = null; 

    // Base de datos simulada de Usuarios
    const allUsers = [
        { email: "cliente@email.com", password: "123", role: "user", name: "Juan Cliente" },
        { email: "admin@farmaplus.com", password: "admin123", role: "admin", name: "Admin FarmaPlus" } 
    ];

    // Base de datos simulada de Productos
    const allProducts = [
        { id: "1", name: "Paracetamol  500mg", description: "Analgésico y antipirético.", price: 80, image: "https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib-rb-4.1.0&q=80&w=1080", rating: 5, badge: "-20%", category: "medicamentos" },
        { id: "2", name: "Ibuprofeno 400mg", description: "Antiinflamatorio no esteroideo.", price: 130, image: "https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzfGVufDF8fHx8MTc1OTIwNzc3OXww&ixlib-rb-4.1.0&q=80&w=1080", rating: 5, category: "medicamentos" },
        { id: "5", name: "Crema Hidratante Facial", description: "Hidratación profunda 24h.", price: 320, originalPrice: 460, image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", rating: 4, badge: "-30%", category: "cuidado-personal" },
        { id: "6", name: "Protector Solar SPF 50+", description: "Protección muy alta.", price: 339, originalPrice: 439, image: "https://images.unsplash.com/photo-1679394270597-e90694d70350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTE0MjM4OXww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, badge: "Nuevo", category: "cuidado-personal" },
        { id: "9", name: "Vitamina C 1000mg", description: "Refuerza tu sistema inmune.", price: 250, image: "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc1OTE0NzMwNHww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "vitaminas" },
        { id: "13", name: "Pañales Bebé Talla 3", description: "Máxima absorción y confort.", price: 379, image: "https://images.unsplash.com/photo-1738892248232-a5fd26a98ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTIwNzc4MHww&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "bebe" },
        { id: "17", name: "Kit Primeros Auxilios", description: "Botiquín completo para el hogar.", price: 499, image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "primeros-auxilios" },
        { id: "20", name: "Tensiómetro Digital", description: "Medición automática.", price: 699, image: "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdHxlbnwxfHx8fDE3NTkxNDE3NzZ8MA&ixlib.rb-4.1.0&q=80&w=1080", rating: 5, category: "primeros-auxilios" }
    ];

    // --- CACHÉ DE PLANTILLAS ---
    // Variable para almacenar la plantilla de la tarjeta de producto y no cargarla cada vez
    let productCardTemplate = null;

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
            currentUser = user; 
            alert(`Bienvenido, ${currentUser.name}`);
            updateLoginButton(); 
            
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
        currentUser = null; 
        updateLoginButton();
        loadPage('inicio');
    }
    
    function updateLoginButton() {
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
                if (container.dataset.context === "mobile") {
                    container.innerHTML = mobileHtml;
                } else {
                    container.innerHTML = desktopHtml;
                }
            });
            
            if (mobileSeparator) mobileSeparator.classList.add('hidden'); 

        } else {
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

            if (mobileSeparator) mobileSeparator.classList.remove('hidden'); 
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
                renderCartPage(root.querySelector('main')); // Recarga la página del carrito
                updateCartBadge(); 
            }
        }
    }
    function removeFromCart(productId){
        cart = cart.filter(item => item.id !== productId);
        renderCartPage(root.querySelector('main')); // Recarga la página del carrito
        updateCartBadge(); 
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

    // --- 6. LÓGICA DE BÚSQUEDA ---
    function handleSearch(event) {
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

    // --- 7. LÓGICA DEL ROUTER (SPA) ---
    //
    // Esta función es ahora ASÍNCRONA para esperar a que se cargue el HTML
    //
    async function loadPage(page) {
        const main = root.querySelector('main');
        if (!main) {
            console.error("Error: Elemento 'main' no encontrado.");
            return; 
        }
        main.innerHTML = ''; // Limpia el contenido anterior
        window.scrollTo(0, 0);

        // Control de acceso
        if (page === 'admin-dashboard' && (!currentUser || currentUser.role !== 'admin')) {
            alert('Acceso denegado. Debes ser administrador.');
            await loadPage('inicio'); // Espera a que cargue el inicio
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
                // Todas las funciones de renderizado ahora son asíncronas
                await renderFunction(main); 
            } else {
                main.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Página en Construcción: ${page}</h1></div>`;
            }
            lucide.createIcons(); // Renderizar iconos después de insertar HTML
        } catch (error) {
            console.error(`Error al renderizar la página '${page}':`, error);
            main.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Error al cargar la página</h1><p>Por favor, revisa la consola para más detalles.</p></div>`;
        }
        
        updateActiveLink(page);
        closeMobileMenu();
    }

    // --- 8. FUNCIONES DE RENDERIZADO DE PÁGINAS (MODIFICADAS) ---

    //
    // NOTA: Todas las funciones 'render...' ahora son 'async'
    // y usan 'fetch' para obtener el HTML de la carpeta 'pages/'.
    //
    async function renderHomePage(main) {
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
        if(categoriesGrid) {
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
        if(productsGrid) {
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
        if(servicesGrid) {
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

    async function renderCatalogPage(main) {
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

    async function renderCartPage(main) {
       if (cart.length === 0) {
            // Podemos cargar un HTML para el carrito vacío si queremos
            // Por ahora, mantenemos la lógica simple
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
            // Si tenemos un 'pages/carrito.html', lo cargamos primero
            // const response = await fetch('pages/carrito.html');
            // main.innerHTML = await response.text();
            // Y luego rellenamos...
            // Por simplicidad, mantendremos este HTML en JS por ahora
            // ya que depende 100% del estado del carrito.

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

    async function renderPaymentPage(main) {
        if (cart.length === 0) {
            await loadPage('catalogo'); // Asegúrate de esperar
            return;
        }

        // Esta página también es muy dinámica.
        // Podríamos cargar un 'pages/pago.html' que solo tenga los contenedores.
        // Por ahora, la mantenemos en JS.

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
    
    async function renderOrderCompletePage(main) {
        // Esta página es bastante estática, ideal para un archivo HTML
        // const response = await fetch('pages/orden-completa.html');
        // main.innerHTML = await response.text();
        // ... y luego solo rellenar el número de orden.

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
    
    async function renderNosotrosPage(main) {
        const response = await fetch('pages/nosotros.html');
        main.innerHTML = await response.text();
    }

    async function renderContactPage(main) {
        const response = await fetch('pages/contacto.html');
        main.innerHTML = await response.text();
        
        // El listener debe añadirse DESPUÉS de cargar el HTML
        main.querySelector('#contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado con éxito. (Simulación)');
            e.target.reset();
        });
    }

    async function renderCuentaPage(main) {
        if (!currentUser) {
            await loadPage('login');
            return;
        }

        // Cargar el HTML base de la página de cuenta
        // const response = await fetch('pages/cuenta.html');
        // main.innerHTML = await response.text();
        // ... y luego rellenar los datos del usuario.

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
                                <p>Aún no has guardado ninguna dirección.</p>
                                <button class="button button-primary">Añadir Nueva Dirección</button>
                            </div>
                            <div id="payment" class="account-section hidden">
                                <h2>Métodos de Pago</h2>
                                <p>Aún no has guardado ninguna tarjeta.</p>
                                <button class="button button-primary">Añadir Nueva Tarjeta</button>
                            </div>
                            <div id="wishlist" class="account-section hidden">
                                <h2>Mi Lista de Deseos</h2>
                                <p>Tu lista de deseos está vacía.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

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

        main.querySelector('#personal-info-form')?.addEventListener('submit', e => {
            e.preventDefault();
            currentUser.name = main.querySelector('#acc-name').value;
            alert('Información actualizada con éxito.');
            updateLoginButton(); 
            loadPage('cuenta'); 
        });
    }

    // --- 9. FUNCIONES DE LOGIN Y ADMIN ---

    async function renderLoginPage(main) {
        const response = await fetch('pages/login.html');
        main.innerHTML = await response.text();
        
        // Añadir listener DESPUÉS de cargar el HTML
        main.querySelector('#login-form').addEventListener('submit', handleLogin);
    }

    async function renderAdminDashboardPage(main) {
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Acceso denegado. Debes ser administrador.');
            await loadPage('inicio');
            return;
        }

        // Cargar el HTML estático del dashboard
        const response = await fetch('pages/admin-dashboard.html');
        main.innerHTML = await response.text();

        // Rellenar la lista de productos más vendidos (dinámico)
        const productList = main.querySelector('.product-list');
        if (productList) {
            productList.innerHTML = `
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
            `;
        }
        
        // --- INICIALIZACIÓN DE GRÁFICOS ---
        setTimeout(() => {
            renderWeeklySalesChart();
            renderCategoryDistributionChart();
            renderMonthlySalesChart();
        }, 0); 
    }

    // --- 10. FUNCIONES PARA LOS GRÁFICOS (Sin cambios) ---
    
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

    // --- 11. FUNCIONES AUXILIARES (MODIFICADAS) ---

    function getRatingHTML(rating) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<i data-lucide="star" style="width: 1rem; height: 1rem;" class="${i <= rating ? 'star-filled' : 'star-empty'}"></i>`;
        }
        return html;
    }

    //
    // Esta función es ahora ASÍNCRONA
    // Carga la plantilla la primera vez y luego la reutiliza.
    //
    async function getProductCardHTML(product) {
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

    //
    // Esta función es ahora ASÍNCRONA porque getProductCardHTML lo es
    //
    async function filterProducts(category, searchTerm = '') {
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
            lucide.createIcons();
        }

        count.textContent = `Mostrando ${filteredProducts.length} de ${allProducts.length} productos`;
    }

    //
    // El manejador de clics principal
    //
    function handleBodyClick(event) {
        // Manejador para los enlaces de la SPA
        const pageLink = event.target.closest('[data-page]');
        if (pageLink) {
            event.preventDefault();
            const page = pageLink.getAttribute('data-page');
            // 'loadPage' es async, pero no necesitamos 'await' aquí
            // porque es un evento de click.
            loadPage(page);
        }

        // Manejador para "Añadir al Carrito"
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

            if (item) { 
                if (action === 'increase') {
                    updateCartItemQuantity(productId, item.quantity + 1);
                } else if (action === 'decrease') {
                    updateCartItemQuantity(productId, item.quantity - 1);
                } else if (action === 'remove') {
                    removeFromCart(productId);
                }
            }
        }
        
        // Manejador para Logout
        const logoutButton = event.target.closest('.logout-button');
        if (logoutButton) {
            event.preventDefault(); 
            handleLogout();
        }
    }

    function toggleMobileMenu() {
        if (!mobileMenu) return;
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

    // --- 12. INICIO DE LA APLICACIÓN ---
    loadPage('inicio'); // Carga la página de inicio
    updateCartBadge();
    updateLoginButton();
    
});
