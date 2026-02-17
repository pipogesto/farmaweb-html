export function renderContacto(container) {
    container.innerHTML = `
        <div class="container py-12">
            <h2 class="text-3xl font-bold mb-8 text-blue-900">Ubicación y Contacto</h2>
            <div class="grid md:grid-cols-2 gap-8 items-start">
                <div class="contact-info bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-xl font-semibold mb-4 text-blue-700">Visítanos</h3>
                    <div class="space-y-4 mb-6">
                        <p class="flex items-center gap-3"><i data-lucide="map-pin"></i> Calle 67 #16 duplex, CDMX</p>
                        <p class="flex items-center gap-3"><i data-lucide="phone"></i> +52 55 23 69 79 40</p>
                    </div>
                    <form id="contact-form" class="space-y-4">
                        <input type="text" placeholder="Tu nombre" class="w-full p-2 border rounded" required>
                        <textarea placeholder="Mensaje" class="w-full p-2 border rounded" rows="3"></textarea>
                        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded">Enviar</button>
                    </form>
                </div>
                <div class="rounded-xl overflow-hidden shadow-lg" style="height: 400px;">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5312!2d-99.161!3d19.432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU1LjIiTiA5OcKwMDknMzkuNiJX!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx" 
                        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
                    </iframe>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}
