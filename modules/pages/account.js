import { currentUser } from '../state.js';
import { updateLoginButton } from '../auth.js';
import { loadPage } from '../router.js';

export function initAccountPage() {
    if (!currentUser) {
        loadPage('login');
        return;
    }

    // Rellenar datos del usuario
    document.getElementById('account-name-display').textContent = currentUser.name;
    document.getElementById('account-email-display').textContent = currentUser.email;
    document.getElementById('account-welcome-name').textContent = currentUser.name;
    
    const accNameInput = document.getElementById('acc-name');
    const accEmailInput = document.getElementById('acc-email');
    if (accNameInput) accNameInput.value = currentUser.name;
    if (accEmailInput) accEmailInput.value = currentUser.email;


    // Lógica para cambiar de sección
    const accountContent = document.querySelector('.account-content');
    document.querySelectorAll('.account-nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            document.querySelector('.account-nav-link.active').classList.remove('active');
            link.classList.add('active');

            accountContent.querySelectorAll('.account-section').forEach(section => {
                section.classList.add('hidden');
            });

            const sectionId = link.dataset.section;
            const sectionToShow = accountContent.querySelector(`#${sectionId}`);
            if (sectionToShow) {
                sectionToShow.classList.remove('hidden');
            }
        });
    });

    // Listener para el formulario de información personal
    document.getElementById('personal-info-form')?.addEventListener('submit', e => {
        e.preventDefault();
        const newName = document.getElementById('acc-name').value;
        currentUser.name = newName;
        alert('Información actualizada con éxito.');
        updateLoginButton();
        loadPage('cuenta'); // Recargamos la página de cuenta
    });
}