export function renderContacto(container) {
    container.innerHTML = `
        <div class="container py-12">
            <div class="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 class="text-3xl font-bold mb-6">Contáctanos</h2>
                    <p class="mb-4">Visítanos en nuestra sucursal:</p>
                    <p class="flex items-center gap-2 mb-6">
                        <i data-lucide="map-pin" class="text-blue-600"></i>
                        <span>Calle 67 #16 duplex, Ciudad de México</span>
                    </p>
                    <form id="contact-form" class="space-y-4">
                        <input type="text" placeholder="Nombre" class="w-full p-2 border rounded">
                        <textarea placeholder="Mensaje" class="w-full p-2 border rounded" rows="4"></textarea>
                        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
                    </form>
                </div>

                <div class="map-container shadow-lg rounded-xl overflow-hidden" style="height: 400px;">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.482705022586!2d-99.1174!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU3LjQiTiA5OcKwMDcnMDIuNiJX!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx" 
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    `;
    
    // Esto asegura que los iconos de la nueva sección funcionen
    if (window.lucide) {
        lucide.createIcons();
    }
}
