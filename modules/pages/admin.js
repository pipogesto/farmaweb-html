import { allProducts } from '../data.js';

export function initAdminDashboardPage() {
    // Rellenar productos más vendidos
    const bestSellersContainer = document.getElementById('admin-best-sellers');
    if (bestSellersContainer) {
        const bestSellersHtml = allProducts.slice(0, 3).map((product, index) => `
            <div class="product-item">
                <div class="product-item-info">
                    <span class="rank">${index + 1}</span>
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-item-details">
                        <strong>${product.name}</strong>
                        <span>${150 - (index * 20)} ventas</span>
                    </div>
                </div>
                <div class="product-item-sales">
                    <strong>$${(product.price * (150 - (index * 20))).toLocaleString('es-MX')}</strong>
                    <span>ingresos</span>
                </div>
            </div>
        `).join('');
        bestSellersContainer.innerHTML = bestSellersHtml;
    }

    // Inicializar gráficos
    setTimeout(() => {
        renderWeeklySalesChart();
        renderCategoryDistributionChart();
        renderMonthlySalesChart();
    }, 0);
}

// --- FUNCIONES PARA LOS GRÁFICOS ---
function renderWeeklySalesChart() {
    const ctx = document.getElementById('weeklySalesChart');
    if (!ctx) return; 
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Ventas ($)',
                data: [4500, 5200, 4800, 6100, 7500, 8300, 7000],
                borderColor: 'rgb(37, 99, 235)',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderCategoryDistributionChart() {
    const ctx = document.getElementById('categoryDistributionChart');
    if (!ctx) return;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Medicamentos', 'Cuidado Personal', 'Vitaminas', 'Bebé', 'Otros'],
            datasets: [{
                label: 'Distribución',
                data: [45, 25, 15, 10, 5],
                backgroundColor: ['rgb(37, 99, 235)', 'rgb(236, 72, 153)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)', 'rgb(100, 116, 139)'],
                hoverOffset: 8
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderMonthlySalesChart() {
    const ctx = document.getElementById('monthlySalesChart');
    if (!ctx) return;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Ventas ($)',
                data: [45000, 48000, 55000, 52000, 61000, 75000, 83000, 70000, 65000, 88000, 92000, 110000],
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgb(37, 99, 235)',
                borderWidth: 2
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}