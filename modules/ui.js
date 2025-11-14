function getRatingHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<i data-lucide="star" style="width: 1rem; height: 1rem;" class="${i <= rating ? 'star-filled' : 'star-empty'}"></i>`;
    }
    return html;
}

export function getProductCardHTML(product) {
    return `
        <div class="product-card">
            <div class="product-card-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-card-image" />
                ${product.badge ? `<div class="product-card-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-card-content">
                <div class="product-rating">
                    ${getRatingHTML(product.rating)}
                    <span class="product-rating-text">(${product.rating}.0)</span>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="product-current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="button button-primary add-to-cart-btn" data-product-id="${product.id}">
                        <i data-lucide="shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}