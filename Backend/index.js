const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- ESTO ES LO QUE TE FALTABA: EL INVENTARIO ---
const inventario = [
    { 
        id: "1", 
        name: "Paracetamol", 
        category: "medicamentos", 
        price: 500, 
        description: "Alivio efectivo para el dolor y la fiebre.",
        image: "https://via.placeholder.com/150" 
    },
    { 
        id: "2", 
        name: "Vitamina C", 
        category: "vitaminas", 
        price: 1200, 
        description: "Refuerza tu sistema inmunológico.",
        image: "https://via.placeholder.com/150" 
    }
];

// Ruta para saludar (la que ya tenías)
app.get('/saludo', (req, res) => {
    res.json({ mensaje: "¡Hola! El backend de FarmaWeb ya está vivo." });
});

// --- RUTA CLAVE PARA TU CATÁLOGO ---
app.get('/api/productos', (req, res) => {
    res.json(inventario);
});

// --- CONFIGURACIÓN DE PUERTO PARA RENDER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en el puerto ${PORT}`);
});
