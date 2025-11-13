export function getRatingHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<i data-lucide="star" style="width: 1rem; height: 1rem;" class="${i <= rating ? 'star-filled' : 'star-empty'}"></i>`;
    }
    return html;
}

export function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    mobileMenu.style.display = ''; 
    mobileMenu.classList.toggle('hidden');
}

export function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
}
