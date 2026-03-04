const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- INVENTARIO UNIFICADO ---
const inventario = [
    { id: "1", name: "Paracetamol 500mg", description: "Analgésico y antipirético.", price: 99, image: "/imagenes/paracetamol.png", rating: 5, badge: "-20%", category: "medicamentos" },
    { id: "2", name: "Ibuprofeno 400mg", description: "Antiinflamatorio no esteroideo.", price: 130, image: "/imagenes/ibuprofeno.png", rating: 5, category: "medicamentos" },
    { id: "5", name: "Crema Hidratante Facial", description: "Hidratación profunda 24h.", price: 320, originalPrice: 460, image: "/imagenes/crema-hidralante.png", rating: 4, badge: "-30%", category: "cuidado-personal" },
    { id: "6", name: "Protector Solar SPF 50+", description: "Protección muy alta.", price: 339, originalPrice: 439, image: "imagenes/protector-solar.png", rating: 5, badge: "Nuevo", category: "cuidado-personal" },
    { id: "9", name: "Vitamina C 1000mg", description: "Refuerza tu sistema inmune.", price: 250, image: "imagenes/vitamina-c.png", rating: 5, category: "vitaminas" },
    { id: "13", name: "Pañales Bebé Talla 3", description: "Máxima absorción y confort.", price: 379, image: "imagenes/pañales.png", rating: 5, category: "bebe" },
    { id: "17", name: "Kit Primeros Auxilios", description: "Botiquín completo para el hogar.", price: 499, image: "imagenes/kit-primeros-auxilios.png", rating: 5, category: "primeros-auxilios" },
    { id: "20", name: "Tensiómetro Digital", description: "Medición automática.", price: 699, image: "imagenes/tensiometro.png", rating: 5, category: "primeros-auxilios" }
];

// Ruta de prueba
app.get('/saludo', (req, res) => {
    res.json({ mensaje: "¡Hola! El backend de FarmaWeb ya está vivo y funcionando." });
});

// --- RUTA CLAVE ---
app.get('/api/productos', (req, res) => {
    res.json(inventario);
});

// --- PUERTO PARA RENDER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en el puerto ${PORT}`);
});
