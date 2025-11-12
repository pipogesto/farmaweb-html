// js/pages/admin.js
import { allProducts } from '../state.js';

export async function renderAdminDashboardPage(main) {
    // Cargar el HTML estático del dashboard
    const response = await fetch('pages/admin-dashboard.html');
    main.innerHTML = await response.text();

    // Rellenar la lista de productos más vendidos (dinámico)
    const productList = main.querySelector('.product-list');
    if (productList) {
        productList.innerHTML = `
            <div class="product-item">
                <div class="product-item-info">
                    <span class="rank">1</span>
                    <img src="${allProducts.length > 0 ? allProducts[0].image : ''}" alt="${allProducts.length > 0 ? allProducts[0].name : ''}">
                    <div class="product-item-details">
                        <strong>${allProducts.length > 0 ? allProducts[0].name : 'N/A'}</strong>
                        <span>150 ventas</span>
                    </div>
                </div>
                <div class="product-item-sales">
                    <strong>$14,850</strong>
                    <span>ingresos</span>
                </div>
            </div>
            <div class="product-item">
                <div class="product-item-info">
                    <span class="rank">2</span>
                    <img src="${allProducts.length > 1 ? allProducts[1].image : ''}" alt="${allProducts.length > 1 ? allProducts[1].name : ''}">
                    <div class="product-item-details">
                        <strong>${allProducts.length > 1 ? allProducts[1].name : 'N/A'}</strong>
                        <span>130 ventas</span>
                    </div>
                </div>
                <div class="product-item-sales">
                    <strong>$16,900</strong>
                    <span>ingresos</span>
                </div>
            </div>
            <div class="product-item">
                <div class="product-item-info">
                    <span class="rank">3</span>
                     <img src="${allProducts.length > 2 ? allProducts[2].image : ''}" alt="${allProducts.length > 2 ? allProducts[2].name : ''}">
                    <div class="product-item-details">
                        <strong>${allProducts.length > 2 ? allProducts[2].name : 'N/A'}</strong>
                        <span>110 ventas</span>
                    </div>
                </div>
                <div class="product-item-sales">
                    <strong>$35,200</strong>
                    <span>ingresos</span>
                </div>
            </div>
        `;
    }

    // --- INICIALIZACIÓN DE GRÁFICOS ---
    // Usamos setTimeout 0 para asegurar que el DOM esté pintado
    setTimeout(() => {
        renderWeeklySalesChart();
        renderCategoryDistributionChart();
        renderMonthlySalesChart();
    }, 0);
}

// --- FUNCIONES PARA LOS GRÁFICOS (dependen de Chart.js global) ---

function renderWeeklySalesChart() {
    const ctx = document.getElementById('weeklySalesChart');
    if (!ctx || typeof Chart === 'undefined') return;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();
    new Chart(ctx, { type: 'line', data: { labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], datasets: [{ label: 'Ventas ($)', data: [4500, 5200, 4800, 6100, 7500, 8300, 7000], borderColor: 'rgb(37, 99, 235)', backgroundColor: 'rgba(37, 99, 235, 0.1)', fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: function(value) { return `$${value / 1000}k`; } } } } } });
}
function renderCategoryDistributionChart() {
    const ctx = document.getElementById('categoryDistributionChart');
    if (!ctx || typeof Chart === 'undefined') return;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();
    new Chart(ctx, { type: 'doughnut', data: { labels: ['Medicamentos', 'Cuidado Personal', 'Vitaminas', 'Bebé', 'Otros'], datasets: [{ label: 'Distribución', data: [45, 25, 15, 10, 5], backgroundColor: ['rgb(37, 99, 235)', 'rgb(236, 72, 153)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)', 'rgb(100, 116, 139)'], hoverOffset: 8, borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } } });
}
function renderMonthlySalesChart() {
    const ctx = document.getElementById('monthlySalesChart');
    if (!ctx || typeof Chart === 'undefined') return;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();
    new Chart(ctx, { type: 'bar', data: { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], datasets: [{ label: 'Ventas ($)', data: [45000, 48000, 55000, 52000, 61000, 75000, 83000, 70000, 65000, 88000, 92000, 110000], backgroundColor: 'rgba(37, 99, 235, 0.2)', borderColor: 'rgb(37, 99, 235)', borderWidth: 2, borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: function(value) { return `$${value / 1000}k`; } } } } } });
}
