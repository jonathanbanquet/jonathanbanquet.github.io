function registerUser() {
    var nombre = document.getElementById('nombres').value;
    var contraseña = document.getElementById('contraseña').value;

    if (nombre === "Usuario Normal" && contraseña === "1234") {
        alert('Registro exitoso');
        localStorage.setItem('tipoDeUsuario', 'normal');
        window.location.href = 'html/principal.html';
    } else if (nombre === "Administrador" && contraseña === "GestionAdmin") {
        alert('Registro exitoso');
        localStorage.setItem('tipoDeUsuario', 'admin');
        window.location.href = 'html/principalAdmin.html';
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
}