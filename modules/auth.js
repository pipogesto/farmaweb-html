import { currentUser, setCurrentUser } from './state.js';
import { allUsers } from './data.js';
import { loadPage } from './router.js';

export function handleLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // --- MODIFICACIÓN AQUÍ: Buscar en ambos lugares ---
    // 1. Usuarios del localStorage (los nuevos registrados)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // 2. Unimos con los usuarios de data.js
    const combinedUsers = [...allUsers, ...storedUsers];

    // 3. Buscamos la coincidencia
    const user = combinedUsers.find(u => u.email === email && u.password === password);

    if (user) {
        setCurrentUser(user);
        // Usamos user.name porque currentUser a veces tarda un milisegundo en actualizarse
        alert(`Bienvenido, ${user.name}`); 
        updateLoginButton();
        
        if (user.role === 'admin') {
            loadPage('admin-dashboard');
        } else {
            loadPage('inicio');
        }
    } else {
        document.getElementById('error-message')?.classList.remove('hidden');
    }
}

export function handleLogout() {
    if (!currentUser) return;
    alert(`Hasta pronto, ${currentUser.name}`);
    setCurrentUser(null);
    updateLoginButton();
    loadPage('inicio');
}

export function updateLoginButton() {
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
                            <a href="#" data-page="registro-detallado" class="nav-link">Registrarse</a>`;
        
        loginContainers.forEach(container => {
            if (container.dataset.context === "mobile") {
                container.innerHTML = mobileHtml;
            } else {
                container.innerHTML = desktopHtml;
            }
        });

        if (mobileSeparator) mobileSeparator.classList.remove('hidden');
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

import { ADMIN_SECRET } from './config.js';

export const auth = {
    // Función para verificar si el usuario es Admin
    isAdmin: () => {
        const session = localStorage.getItem('farma_session');
        return session === ADMIN_SECRET;
    },

    // Middleware de protección
    protectRoute: () => {
        const path = window.location.pathname;
        if (path.includes('/páginas/admin') && !auth.isAdmin()) {
            alert("Acceso denegado. Se requiere perfil de administrador.");
            window.location.href = '/index.html'; // Redirige al inicio
        }
    },

    login: (password) => {
        if (password === "admin123") { // Password de ejemplo
            localStorage.setItem('farma_session', ADMIN_SECRET);
            return true;
        }
        return false;
    }
};

