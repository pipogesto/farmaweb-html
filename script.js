document.addEventListener('DOMContentLoaded', () => {
    // --- INICIALIZACIÓN ---
    const root = document.getElementById('root');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- ESTADO DE LA APLICACIÓN ---
    let cart = []; // Array para guardar los productos del carrito
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

    // --- MANEJO DE EVENTOS ---
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    document.body.addEventListener('click', handleBodyClick);

    // --- LÓGICA DEL CARRITO ---
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
            }
        }
    }
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        renderCartPage(root.querySelector('main'));
    }
    function clearCart() {
        cart = [];
        updateCartBadge();
    }
    function updateCartBadge() {
        const cartBadge = document.querySelector('.cart-badge');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // --- FUNCIONES DE RENDERIZADO DE PÁGINAS ---
    function loadPage(page) {
        const main = root.querySelector('main');
        main.innerHTML = '';
        window.scrollTo(0, 0);

        const pageRenderFunctions = {
            'inicio': renderHomePage,
            'catalogo': renderCatalogPage,
            'carrito': renderCartPage,
            'pago': renderPaymentPage,
            'nosotros': renderNosotrosPage,
            'contacto': renderContactPage,
        };

        const renderFunction = pageRenderFunctions[page] || ((m) => {
            m.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Página en Construcción: ${page}</h1></div>`;
        });

        renderFunction(main);

        lucide.createIcons();
        updateActiveLink(page);
        closeMobileMenu();
    }

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
                filterProducts(category);
                filterButtonsContainer.querySelector('.active').classList.remove('active');
                button.classList.add('active');
            });
        });
        filterProducts('all');
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
                            <form id="contact-form" class="space-y-6">
                                <div class="form-grid">
                                    <div class="form-field"><label for="contact-name">Nombre *</label><input id="contact-name" required></div>
                                    <div class="form-field"><label for="contact-email">Email *</label><input id="contact-email" type="email" required></div>
                                </div>
                                <div class="form-field full-width"><label for="contact-subject">Asunto</label><input id="contact-subject"></div>
                                <div class="form-field full-width"><label for="contact-message">Mensaje *</label><textarea id="contact-message" rows="6" required></textarea></div>
                                <button type="submit" class="button button-primary"><i data-lucide="send"></i> Enviar Mensaje</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    function getProductCardHTML(product) {
        let stars = Array(5).fill(0).map((_, i) => `<i data-lucide="star" class="${i < product.rating ? 'star-filled' : 'star-empty'}"></i>`).join('');
        return `
            <div class="product-card">
                <div class="product-card-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-card-image" />
                    ${product.badge ? `<div class="product-card-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-card-content">
                    <div class="product-rating">${stars}<span class="product-rating-text">(${product.rating}.0)</span></div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="product-current-price">$${product.price}</span>
                            ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice}</span>` : ''}
                        </div>
                        <button class="button button-primary add-to-cart-btn" data-product-id="${product.id}">
                            <i data-lucide="shopping-cart"></i><span>Añadir</span>
                        </button>
                    </div>
                </div>
            </div>`;
    }

    function filterProducts(category) {
        const productsGrid = document.getElementById('catalog-products-grid');
        const productCount = document.querySelector('.product-count');
        const filtered = category === 'all' ? allProducts : allProducts.filter(p => p.category === category);
        productsGrid.innerHTML = filtered.map(getProductCardHTML).join('');
        productCount.textContent = `Mostrando ${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`;
        lucide.createIcons();
    }
    
    // --- MANEJADORES Y LÓGICA DE INTERACCIÓN ---
    function toggleMobileMenu() {
        const isHidden = mobileMenu.style.display === 'none' || !mobileMenu.style.display;
        mobileMenu.style.display = isHidden ? 'flex' : 'none';
        const icon = mobileMenuButton.querySelector('i');
        icon.setAttribute('data-lucide', isHidden ? 'x' : 'menu');
        lucide.createIcons({ nodes: [icon] });
    }
    function closeMobileMenu() {
        if (mobileMenu.style.display === 'flex') {
            mobileMenu.style.display = 'none';
            const icon = mobileMenuButton.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons({ nodes: [icon] });
        }
    }
    function updateActiveLink(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    function handleBodyClick(e) {
        const navTarget = e.target.closest('[data-page]');
        if (navTarget) {
            e.preventDefault();
            loadPage(navTarget.getAttribute('data-page'));
            return;
        }

        if (e.target.closest('#newsletter-subscribe')) {
            const emailInput = document.getElementById('newsletter-email');
            alert(emailInput.value ? "¡Gracias por suscribirte!" : "Por favor, ingresa tu email");
            if(emailInput.value) emailInput.value = "";
            return;
        }
        
        const addToCartButton = e.target.closest('.add-to-cart-btn');
        if (addToCartButton) {
            addToCart(addToCartButton.dataset.productId);
            return;
        }
        const quantityButton = e.target.closest('.quantity-btn');
        if(quantityButton) {
            const { productId, action } = quantityButton.dataset;
            const item = cart.find(i => i.id === productId);
            if(item) {
                const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                updateCartItemQuantity(productId, newQuantity);
            }
            return;
        }
        const removeButton = e.target.closest('.remove-item-btn');
        if(removeButton) {
            removeFromCart(removeButton.dataset.productId);
            return;
        }

        const paymentForm = e.target.closest('#payment-form');
        if(paymentForm) {
             e.preventDefault();
             paymentForm.querySelector('button[type="submit"]').textContent = "Procesando...";
             setTimeout(() => {
                clearCart();
                renderOrderCompletePage(root.querySelector('main'));
             }, 2000);
        }
        const contactForm = e.target.closest('#contact-form');
        if (contactForm) {
            e.preventDefault();
            alert('¡Mensaje enviado con éxito! Te responderemos pronto.');
            contactForm.reset();
        }

        if(e.target.matches('input[name="paymentMethod"]')) {
             const cardDetails = document.getElementById('card-details-section');
             const paypalMessage = document.getElementById('paypal-message-section');
             if (e.target.value === 'card') {
                 cardDetails.style.display = 'flex';
                 paypalMessage.style.display = 'none';
             } else {
                 cardDetails.style.display = 'none';
                 paypalMessage.style.display = 'block';
             }
        }
    }
    
    // Carga inicial
    loadPage('inicio');
});