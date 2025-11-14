export function initContactPage() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado con éxito. (Simulación)');
            e.target.reset();
        });
    }
}