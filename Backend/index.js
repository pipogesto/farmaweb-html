const express = require('express');
const cors = require('cors');
const app = express();

// Configuraciones
app.use(cors());
app.use(express.json());

// Nuestra primera ruta de prueba
app.get('/saludo', (req, res) => {
    res.json({ mensaje: "¡Hola David! El backend de FarmaWeb ya está vivo y funcionando." });
});

// Encender el motor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});