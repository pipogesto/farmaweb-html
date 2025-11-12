// js/router.js
import { getCurrentUser } from './state.js';
import { closeMobileMenu } from './utils.js';

// Importar todas las funciones de renderizado
import { renderHomePage } from './pages/home.js';
import { renderCatalogPage } from './pages/catalog.js';
import { renderCartPage } from './pages/cart.js';
import { renderPaymentPage } from './pages/payment.js';
import { renderLoginPage } from './pages/login.js';
import { renderCuentaPage } from './pages/account.js';
import { renderAdminDashboardPage } from './pages/admin.js';
import { renderNosotrosPage, renderContactPage, renderOrderCompletePage } from './pages/static.js';

// Mapa de páginas a funciones de renderizado
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

export async function loadPage(page) {
    const main = document.querySelector('main');
    if (!main) {
        console.error("Error: Elemento 'main' no encontrado.");
        return;
    }
    main.innerHTML = ''; // Limpia el contenido anterior
    window.scrollTo(0, 0);

    const currentUser = getCurrentUser();

    // Control de acceso
    if (page === 'admin-dashboard' && (!currentUser || currentUser.role !== 'admin')) {
        alert('Acceso denegado. Debes ser administrador.');
        await loadPage('inicio'); // Espera a que cargue el inicio
        return;
    }
    
    if (page === 'cuenta' && !currentUser) {
        alert('Acceso denegado. Debes iniciar sesión.');
        await loadPage('login');
        return;
    }

    const renderFunction = pageRenderFunctions[page];

    try {
        if (renderFunction) {
            await renderFunction(main);
        } else {
            main.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Página en Construcción: ${page}</h1></div>`;
        }
        lucide.createIcons(); // Renderizar iconos después de insertar CUALQUIER HTML
    } catch (error) {
        console.error(`Error al renderizar la página '${page}':`, error);
        main.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Error al cargar la página</h1><p>Por favor, revisa la consola para más detalles.</p></div>`;
    }

    updateActiveLink(page);
    closeMobileMenu();
}

export function updateActiveLink(currentPage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
