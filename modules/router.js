import { currentUser } from './state.js';
import { handleLogin } from './auth.js';
import { initHomePage } from './pages/home.js';
import { initCatalogPage } from './pages/catalog.js';
import { initCartPage } from './pages/cart.js';
import { initPaymentPage } from './pages/payment.js';
import { initOrderCompletePage } from './pages/orderComplete.js';
import { initContactPage } from './pages/contact.js';
import { initAccountPage } from './pages/account.js';
import { initAdminDashboardPage } from './pages/admin.js';

// Mapa de páginas
const pageConfig = {
    'inicio': { html: '/pages/home.html', init: initHomePage },
    'catalogo': { html: '/pages/catalog.html', init: initCatalogPage },
    'nosotros': { html: '/pages/nosotros.html', init: null },
    'contacto': { html: '/pages/contacto.html', init: initContactPage },
    'login': { html: '/pages/login.html', init: null }, 
    'cuenta': { html: '/pages/cuenta.html', init: initAccountPage },
    'admin-dashboard': { html: '/pages/admin-dashboard.html', init: initAdminDashboardPage },
    'orden-completa': { html: '/pages/order-complete.html', init: initOrderCompletePage },
    'carrito': { html: null, init: initCartPage },
    'pago': { html: null, init: initPaymentPage },
};

export async function loadPage(page) {
    const main = document.querySelector('main');
    if (!main) {
        console.error("Error CRÍTICO: Elemento 'main' no encontrado.");
        return; 
    }

    // --- CAMBIO PARA EL CARRITO DINÁMICO ---
    // Si un admin intenta entrar al carrito, lo mandamos a sus estadísticas
    if (page === 'carrito' && currentUser && currentUser.role === 'admin') {
        page = 'admin-dashboard';
    }

    // Control de acceso admin
    if (page === 'admin-dashboard' && (!currentUser || currentUser.role !== 'admin')) {
        alert('Acceso denegado. Debes ser administrador.');
        loadPage('inicio');
        return;
    }
    
    // Control de acceso 'Mi Cuenta'
    if (page === 'cuenta' && !currentUser) {
        loadPage('login');
        return;
    }

    const config = pageConfig[page] || pageConfig['inicio'];

    try {
        if (config.html) {
            const response = await fetch(config.html);
            if (!response.ok) throw new Error(`No se pudo cargar ${config.html}`);
            main.innerHTML = await response.text();
        } else if (config.init) {
            await config.init(main); 
        }

        if (config.init && config.html) {
            config.init(main);
        }
        
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
             lucide.createIcons();
        } else {
             console.warn("Lucide no está definido.");
        }
       
        window.scrollTo(0, 0);
        updateActiveLink(page);
        closeMobileMenu();

    } catch (error) {
        console.error(`Error al renderizar la página '${page}':`, error);
        main.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Error al cargar la página</h1><p>Revisa la consola (F12) para ver el error.</p></div>`;
    }
}

function updateActiveLink(currentPage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === currentPage);
    });
}

export function toggleMobileMenu() { 
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('hidden');
}

export function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
}
