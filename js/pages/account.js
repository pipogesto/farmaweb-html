// js/pages/account.js
import { getCurrentUser, setCurrentUser } from '../state.js';
import { updateLoginButton } from '../auth.js';
import { loadPage } from '../router.js';

export async function renderCuentaPage(main) {
    let currentUser = getCurrentUser();
    if (!currentUser) {
        await loadPage('login');
        return;
    }

    // Cargar el HTML base de la página de cuenta
    const response = await fetch('pages/cuenta.html');
    main.innerHTML = await response.text();
    
    // Rellenar datos del usuario
    main.querySelector('#account-user-name').textContent = currentUser.name;
    main.querySelector('#account-user-email').textContent = currentUser.email;
    main.querySelector('#account-welcome-name').textContent = currentUser.name;
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

    main.querySelector('#personal-info-form')?.addEventListener('submit', e => {
        e.preventDefault();
        
        // Actualizar el objeto currentUser
        const updatedUser = { ...currentUser, name: main.querySelector('#acc-name').value };
        setCurrentUser(updatedUser);
        
        alert('Información actualizada con éxito.');
        updateLoginButton();
        loadPage('cuenta'); // Recargar la página para reflejar todo
    });
}
