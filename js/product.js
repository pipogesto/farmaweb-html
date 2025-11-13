// js/product.js

// Plantilla de la tarjeta de producto (cargada una vez y guardada en memoria)
let productCardTemplate = null;

// Función para obtener el HTML de calificación (estrellas)
function getRatingHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<i data-lucide="star" style="width: 1rem; height: 1rem;" class="${i <= rating ? 'star-filled' : 'star-empty'}"></i>`;
    }
    return html;
}

/**
 * Carga la plantilla de 'components/product-card.html' y la usa para
 * crear el HTML de un solo producto.
 * @param {object} product - El objeto del producto de db.js
 * @returns {string} El HTML final de la tarjeta del producto
 */
export async function getProductCardHTML(product) {
    // Cargar la plantilla HTML si aún no la tenemos
    if (!productCardTemplate) {
        try {
            // Hacemos 'fetch' a la plantilla del componente
            const response = await fetch('components/product-card.html');
            if (!response.ok) throw new Error('No se pudo cargar la plantilla de producto');
            productCardTemplate = await response.text();
        } catch (error) {
            console.error(error);
            return '<p>Error al cargar producto</p>';
        }
    }

    // Reemplazar todos los marcadores de posición con los datos del producto
    let cardHTML = productCardTemplate;
    
    // Usamos expresiones regulares (/.../g) para reemplazar TODAS las instancias
    cardHTML = cardHTML.replace(/{{ID}}/g, product.id);
    cardHTML = cardHTML.replace(/{{IMAGE}}/g, product.image);
    cardHTML = cardHTML.replace(/{{NAME}}/g, product.name);
    cardHTML = cardHTML.replace('{{BADGE}}', product.badge ? `<div class="product-card-badge">${product.badge}</div>` : '');
    cardHTML = cardHTML.replace('{{RATING}}', getRatingHTML(product.rating));
    cardHTML = cardHTML.replace('{{RATING_VALUE}}', product.rating);
    cardHTML = cardHTML.replace('{{DESCRIPTION}}', product.description);
    cardHTML = cardHTML.replace('{{PRICE}}', product.price.toFixed(2));
    cardHTML = cardHTML.replace('{{ORIGINAL_PRICE}}', product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : '');

    return cardHTML;
}
