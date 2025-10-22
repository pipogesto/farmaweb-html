// login/login.js
// Simulación de cuentas (solo para pruebas locales)
const cuentas = [
  { email: "user@farmaplus.com", password: "user123", role: "usuario", name: "Cliente FarmaPlus" },
  { email: "admin@farmaplus.com", password: "admin123", role: "admin", name: "Administrador FarmaPlus" }
];

document.addEventListener('DOMContentLoaded', () => {
  const roleBtns = document.querySelectorAll('.role-btn');
  let selectedRole = 'usuario'; // por defecto
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const form = document.getElementById('loginForm');
  const err = document.getElementById('error-msg');
  const togglePass = document.getElementById('togglePassword');
  const forgot = document.getElementById('forgot-link');
  const register = document.getElementById('register-link');

  // Inicial: activar icons Lucide
  try { lucide.createIcons(); } catch(e){}

  // Selección de rol (toggle visual)
  roleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roleBtns.forEach(b => b.classList.remove('role-active'));
      btn.classList.add('role-active');
      selectedRole = btn.dataset.role;
      err.textContent = '';
    });
  });

  // Mostrar/ocultar contraseña
  togglePass.addEventListener('click', () => {
    const type = passInput.type === 'password' ? 'text' : 'password';
    passInput.type = type;
    // Cambiar icono
    const icon = togglePass.querySelector('svg');
    try {
      if (type === 'text') {
        togglePass.innerHTML = '<i data-lucide="eye-off"></i>';
      } else {
        togglePass.innerHTML = '<i data-lucide="eye"></i>';
      }
      lucide.createIcons();
    } catch(e){}
  });

  // Olvidó contraseña: acción demostrativa
  forgot.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) {
      alert('Ingresa tu correo para recuperar la contraseña');
    } else {
      alert('Si existe una cuenta con ' + email + ', recibirás un correo con instrucciones (demo).');
      emailInput.value = '';
    }
  });

  // Registrarse (demo)
  register.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Función de registro no implementada (demo). Puedes usar las cuentas de prueba proporcionadas.');
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    err.textContent = '';

    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;

    if (!email || !password) {
      err.textContent = 'Completa todos los campos';
      return;
    }

    const match = cuentas.find(c => c.email === email && c.password === password && c.role === selectedRole);

    if (!match) {
      // Si no coincide por role, intentar dar mensaje más claro
      const foundEmail = cuentas.find(c => c.email === email && c.password === password);
      if (foundEmail) {
        err.textContent = `Credenciales correctas pero no tienes rol "${selectedRole.toUpperCase()}" seleccionado. Selecciona el rol correcto.`;
      } else {
        err.textContent = 'Correo o contraseña incorrectos (usa cuentas de prueba)';
      }
      return;
    }

    // Guardar sesión (sessionStorage)
    sessionStorage.setItem('farmaplus_user', JSON.stringify({
      email: match.email,
      role: match.role,
      name: match.name,
      loggedAt: new Date().toISOString()
    }));

    // Redirigir según rol
    if (match.role === 'admin') {
      window.location.href = '../admin/admin.html';
    } else {
      window.location.href = '../usuario/usuario.html';
    }
  });

  // Si el usuario ya tiene sesión activa, redirigir automáticamente según rol
  try {
    const s = sessionStorage.getItem('farmaplus_user');
    if (s) {
      const obj = JSON.parse(s);
      if (obj.role === 'admin') window.location.href = '../admin/admin.html';
      else if (obj.role === 'usuario') window.location.href = '../usuario/usuario.html';
    }
  } catch(e){ console.warn(e) }
});

