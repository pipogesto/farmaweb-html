// js/router.js

// 1. Definimos todas las rutas de nuestra aplicación
const routes = {
    "inicio": {
        html: "pages/inicio.html",
        js: "js/pages/home.js" 
    },
    "catalogo": {
        html: "pages/catalogo.html",
        js: "js/pages/catalog.js"
    },
    "nosotros": {
        html: "pages/nosotros.html",
        js: null // Esta página no tiene JS especial
    },
    "contacto": {
        html: "pages/contacto.html",
        js: "js/pages/static.js" // Asumimos que static.js maneja el form
    },
    "login": {
        html: "pages/login.html",
        js: "js/pages/login.js"
    },
    "carrito": {
        html: "pages/carrito.html",
        js: "js/pages/cart.js"
    },
    "pago": {
        html: "pages/pago.html",
        js: "js/pages/payment.js"
    },
    "cuenta": {
        html: "pages/cuenta.html",
        js: "js/pages/account.js"
    },
    "admin-dashboard": {
        html: "pages/admin-dashboard.html",
        js: "js/pages/admin.js"
    },
    "orden-completa": {
        html: "pages/orden-completa.html",
        js: null // Esta página no tiene JS especial
    },
};

const mainContent = document.querySelector('main');

/**
 * Carga la página (HTML y JS) correspondiente al hash de la URL
 */
async function loadPage() {
    // Obtiene el "hash" de la URL (ej. #inicio)
    // Si está vacío, usa "inicio" por defecto
    const hash = window.location.hash.substring(1) || "inicio";

    // Encuentra la ruta correspondiente en nuestro objeto
    // Si no la encuentra (ej. #pagina-rota), vuelve a "inicio"
    const route = routes[hash] || routes["inicio"]; 

    try {
        // --- Carga el HTML ---
        const response = await fetch(route.html);
        if (!response.ok) throw new Error(`No se pudo cargar el HTML: ${route.html}`);
        
        mainContent.innerHTML = await response.text();
        
        // --- Carga el JS (si existe) ---
        if (route.js) {
            // Usamos import() dinámico. 
            // Añadimos un 'timestamp' para EVITAR EL CACHÉ del navegador.
            // Esto soluciona el problema de que no veías tus imágenes.
            const module = await import(`../${route.js}?t=${new Date().getTime()}`);
            
            // Asumimos que cada módulo JS de página exporta una función 'default'
            if (module.default && typeof module.default === 'function') {
                module.default(); // Llama a la función (ej. initHome())
            } else {
                console.warn(`El módulo ${route.js} no tiene una exportación 'default' como función.`);
            }
        }
        
        // Actualizar el enlace activo en el header
        updateActiveLink(hash);
        lucide.createIcons(); // Re-renderizar iconos de Lucide

    } catch (error) {
        console.error("Error al cargar la ruta:", error);
        mainContent.innerHTML = `<div class="container" style="padding: 4rem 1rem; text-align: center;"><h1>Error al cargar la página</h1><p>Por favor, revisa la consola para más detalles.</p></div>`;
    }
}

/**
 * Actualiza la clase '.active' en los enlaces de navegación
 */
function updateActiveLink(currentPage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        // Usamos el 'data-page' que dejamos en el HTML para saber qué enlace es
        link.classList.toggle('active', link.dataset.page === currentPage);
    });
}

/**
 * Función que se exporta para iniciar el router
 */
export function initRouter() {
    // Escucha cambios en el hash (ej. al hacer clic en un link <a href="#catalogo">)
    window.addEventListener('hashchange', loadPage);
    
    // Carga la página inicial (ej. /index.html)
    // Usamos 'load' para asegurarnos de que todo el HTML inicial esté listo
    window.addEventListener('load', loadPage);
}
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
