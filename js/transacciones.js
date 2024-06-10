function guardarTransaccion(event) {
    event.preventDefault();

    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

    var tipoTransaccion = document.getElementById("tipoTransaccion").value;
    var tipoIngreso = document.getElementById("tipoIngreso").value;
    var valorTransaccion = document.getElementById("valorTransaccion").value;
    var numeroDeCuenta = document.getElementById("numeroDeCuenta").value;
    var fechaTransaccion = document.getElementById("fechaTransaccion").value;

    var nuevaTransaccion = {
        tipoTransaccion: tipoTransaccion,
        tipoIngreso: tipoIngreso,
        valorTransaccion: parseFloat(valorTransaccion),
        numeroDeCuenta: numeroDeCuenta,
        fechaTransaccion: fechaTransaccion,
    };

    transacciones.push(nuevaTransaccion);
    localStorage.setItem("transacciones", JSON.stringify(transacciones));
    agregarTransaccionATabla(nuevaTransaccion);
    actualizarSaldoCuenta(nuevaTransaccion);
}

function agregarTransaccionATabla(transaccion) {
    var tabla = document.getElementById("tablaDeTransacciones");
    var fila = tabla.insertRow();

    var celdaTipoTransaccion = fila.insertCell(0);
    var celdaTipoIngreso = fila.insertCell(1);
    var celdaValorTransaccion = fila.insertCell(2);
    var celdaNumeroDeCuenta = fila.insertCell(3);
    var celdaFechaTransaccion = fila.insertCell(4);

    celdaTipoTransaccion.innerHTML = transaccion.tipoTransaccion;
    celdaTipoIngreso.innerHTML = transaccion.tipoIngreso;
    celdaValorTransaccion.innerHTML = transaccion.valorTransaccion;
    celdaNumeroDeCuenta.innerHTML = transaccion.numeroDeCuenta;
    celdaFechaTransaccion.innerHTML = transaccion.fechaTransaccion;
}

function cargarTransaccionesGuardadas() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

    transacciones.forEach(function(transaccion) {
        agregarTransaccionATabla(transaccion);
    });
}

function consultarTransaccion() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");
    var numeroDeCuenta = document.getElementById("consultar_Transaccion").value;

    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].numeroDeCuenta == numeroDeCuenta) {
            document.getElementById("tipoTransaccion").value = transacciones[i].tipoTransaccion;
            document.getElementById("tipoIngreso").value = transacciones[i].tipoIngreso;
            document.getElementById("valorTransaccion").value = transacciones[i].valorTransaccion;
            document.getElementById("numeroDeCuenta").value = transacciones[i].numeroDeCuenta;
            document.getElementById("fechaTransaccion").value = transacciones[i].fechaTransaccion;
            break;
        }
    }
}

function modificarTransaccion() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");
    var numeroDeCuenta = document.getElementById("numeroDeCuenta").value;

    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].numeroDeCuenta == numeroDeCuenta) {
            transacciones[i].tipoTransaccion = document.getElementById("tipoTransaccion").value;
            transacciones[i].tipoIngreso = document.getElementById("tipoIngreso").value;
            transacciones[i].valorTransaccion = parseFloat(document.getElementById("valorTransaccion").value);
            transacciones[i].fechaTransaccion = document.getElementById("fechaTransaccion").value;

            localStorage.setItem("transacciones", JSON.stringify(transacciones));
            recargarTablaTransacciones();  // Corregido aquí
            break;
        }
    }
}

function eliminarTransaccion() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");
    var numeroDeCuenta = document.getElementById("eliminar_Transaccion").value;

    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].numeroDeCuenta == numeroDeCuenta) {
            transacciones.splice(i, 1);
            localStorage.setItem("transacciones", JSON.stringify(transacciones));
            recargarTablaTransacciones();  // Corregido aquí
            break;
        }
    }
}

function actualizarSaldoCuenta(transaccion) {
    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

    for (let i = 0; i < cuentasBancarias.length; i++) {
        if (cuentasBancarias[i].numeroDeCuenta == transaccion.numeroDeCuenta) {
            if (transaccion.tipoIngreso.toLowerCase() == "ingreso") {
                cuentasBancarias[i].saldoActual += transaccion.valorTransaccion;
            } else if (transaccion.tipoIngreso.toLowerCase() == "egreso") {
                cuentasBancarias[i].saldoActual -= transaccion.valorTransaccion;
            }
            localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));
            recargarTablaCuentas();
            break;
        }
    }
}

function recargarTablaTransacciones() {  // Función agregada
    var tabla = document.getElementById("tablaDeTransacciones");
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
    cargarTransaccionesGuardadas();
}

function recargarTablaCuentas() {
    var tabla = document.getElementById("tablaDeCuentasBancarias");
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
    cargarCuentasGuardadas();
}