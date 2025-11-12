// js/pages/static.js
// Contiene los renderizadores para páginas que solo cargan HTML

export async function renderNosotrosPage(main) {
    const response = await fetch('pages/nosotros.html');
    main.innerHTML = await response.text();
}

export async function renderContactPage(main) {
    const response = await fetch('pages/contacto.html');
    main.innerHTML = await response.text();

    // El listener debe añadirse DESPUÉS de cargar el HTML
    main.querySelector('#contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensaje enviado con éxito. (Simulación)');
        e.target.reset();
    });
}

export async function renderOrderCompletePage(main) {
    const response = await fetch('pages/orden-completa.html');
    main.innerHTML = await response.text();

    // Rellenar el número de orden dinámicamente
    const orderNumber = `#FP-${Math.floor(Math.random() * 100000)}`;
    const orderNumberEl = main.querySelector('#order-number');
    if (orderNumberEl) {
        orderNumberEl.textContent = orderNumber;
    }
}
