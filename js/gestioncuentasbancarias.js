function guardarCuenta() {
    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

    var numeroDeCuenta = document.getElementById("numeroDeCuenta").value;
    var nombreDeBanco = document.getElementById("nombreDeBanco").value;
    var tipoDeCuenta = document.getElementById("tipoDeCuenta").value;
    var saldoActual = document.getElementById("saldoActual").value;
    var estadoDeCuenta = document.getElementById("estadoDeCuenta").value;
    var fechaDeApertura = document.getElementById("fechaDeApertura").value;

    var nuevaCuenta = {
        numeroDeCuenta: numeroDeCuenta,
        nombreDeBanco: nombreDeBanco,
        tipoDeCuenta: tipoDeCuenta,
        saldoActual: parseFloat(saldoActual),
        estadoDeCuenta: estadoDeCuenta,
        fechaDeApertura: fechaDeApertura
    };

    cuentasBancarias.push(nuevaCuenta);

    localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));

    agregarCuentaATabla(nuevaCuenta);
}

function agregarCuentaATabla(cuenta) {
    var tabla = document.getElementById("tablaDeCuentasBancarias");
    var fila = tabla.insertRow();

    var celdaNumeroDeCuenta = fila.insertCell(0);
    var celdaNombreDeBanco = fila.insertCell(1);
    var celdaTipoDeCuenta = fila.insertCell(2);
    var celdaSaldoActual = fila.insertCell(3);
    var celdaEstadoDeCuenta = fila.insertCell(4);
    var celdaFechaDeApertura = fila.insertCell(5);

    celdaNumeroDeCuenta.innerHTML = cuenta.numeroDeCuenta;
    celdaNombreDeBanco.innerHTML = cuenta.nombreDeBanco;
    celdaTipoDeCuenta.innerHTML = cuenta.tipoDeCuenta;
    celdaSaldoActual.innerHTML = cuenta.saldoActual;
    celdaEstadoDeCuenta.innerHTML = cuenta.estadoDeCuenta;
    celdaFechaDeApertura.innerHTML = cuenta.fechaDeApertura;
}

function cargarCuentasGuardadas() {
    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

    cuentasBancarias.forEach(function(cuenta) {
        agregarCuentaATabla(cuenta);
    });
    var script = document.createElement('script');
    script.src = "../js/transacciones.js";
    document.body.appendChild(script);
}


function consultarCuenta() {
    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");
    var numeroDeCuenta = document.getElementById("consultaNumeroDeCuenta").value;

    for (let i = 0; i < cuentasBancarias
.length; i++) {
if (cuentasBancarias[i].numeroDeCuenta == numeroDeCuenta) {
document.getElementById("numeroDeCuenta").value = cuentasBancarias[i].numeroDeCuenta;
document.getElementById("nombreDeBanco").value = cuentasBancarias[i].nombreDeBanco;
document.getElementById("tipoDeCuenta").value = cuentasBancarias[i].tipoDeCuenta;
document.getElementById("saldoActual").value = cuentasBancarias[i].saldoActual;
document.getElementById("estadoDeCuenta").value = cuentasBancarias[i].estadoDeCuenta;
document.getElementById("fechaDeApertura").value = cuentasBancarias[i].fechaDeApertura;
break;
}
}
}

function eliminarCuenta() {
var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");
var numeroDeCuenta = document.getElementById("eliminarNumeroDeCuenta").value;


for (let i = 0; i < cuentasBancarias.length; i++) {
    if (cuentasBancarias[i].numeroDeCuenta == numeroDeCuenta) {
        cuentasBancarias.splice(i, 1);
        localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));
        recargarTabla();
        break;
    }
}
}

function recargarTabla() {
var tabla = document.getElementById("tablaDeCuentasBancarias");
while (tabla.rows.length > 1) {
tabla.deleteRow(1);
}
cargarCuentasGuardadas();
}

window.onload = function() {
cargarCuentasGuardadas();
};

