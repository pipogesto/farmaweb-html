// Datos de prueba de usuarios (en un proyecto real se usan bases de datos)
const usuarios = [
    { username: "usuario", password: "usuario123", tipo: "usuario" },
    { username: "admin", password: "admin123", tipo: "admin" }
];

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = usuarios.find(u => u.username === username && u.password === password);

    if (user) {
        // Guardar tipo de usuario en sessionStorage
        sessionStorage.setItem("tipoUsuario", user.tipo);

        // Redirigir según tipo
        if (user.tipo === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "usuario.html";
        }
    } else {
        errorMsg.textContent = "Usuario o contraseña incorrectos";
    }
});
