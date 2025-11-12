// js/pages/login.js
import { handleLogin } from '../auth.js';

export async function renderLoginPage(main) {
    const response = await fetch('pages/login.html');
    main.innerHTML = await response.text();

    // Añadir listener DESPUÉS de cargar el HTML
    main.querySelector('#login-form').addEventListener('submit', handleLogin);
}
