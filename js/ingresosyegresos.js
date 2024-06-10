function guardarIngresoEgreso(event) {
    event.preventDefault();

    var ingresosYEgresos = JSON.parse(localStorage.getItem("ingresosYEgresos") || "[]");

    var numeroDeCuenta = document.getElementById("numeroDeCuenta").value;
    var nombreDelTipo = document.getElementById("nombreDelTipo").value;
    var descripcion = document.getElementById("descripcion").value;
    var tipoI_E = document.getElementById("tipoI_E").value;
    var categoria = document.getElementById("categoria").value;

    var nuevoIngresoEgreso = {
        numeroDeCuenta: numeroDeCuenta,
        nombreDelTipo: nombreDelTipo,
        descripcion: descripcion,
        tipoI_E: tipoI_E,
        categoria: categoria,
    };

    ingresosYEgresos.push(nuevoIngresoEgreso);
    localStorage.setItem("ingresosYEgresos", JSON.stringify(ingresosYEgresos));
    agregarCuentaATabla(nuevoIngresoEgreso);
}

function agregarCuentaATabla(cuenta) {
    var tabla = document.getElementById("tablaDeIngresosYEgresos");
    var fila = tabla.insertRow();

    var celdaNumeroDeCuenta = fila.insertCell(0);
    var celdaNombreDelTipo = fila.insertCell(1);
    var celdaDescripcion = fila.insertCell(2);
    var celdaTipoI_E = fila.insertCell(3);
    var celdaCategoria = fila.insertCell(4);

    celdaNumeroDeCuenta.innerHTML = cuenta.numeroDeCuenta;
    celdaNombreDelTipo.innerHTML = cuenta.nombreDelTipo;
    celdaDescripcion.innerHTML = cuenta.descripcion;
    celdaTipoI_E.innerHTML = cuenta.tipoI_E;
    celdaCategoria.innerHTML = cuenta.categoria;
}

function cargarCuentasGuardadas() {
    var ingresosYEgresos = JSON.parse(localStorage.getItem("ingresosYEgresos") || "[]");

    ingresosYEgresos.forEach(function(cuenta) {
        agregarCuentaATabla(cuenta);
    });
}

function consultarIngresoEgreso() {
    var ingresosYEgresos = JSON.parse(localStorage.getItem("ingresosYEgresos") || "[]");
    var numeroDeCuenta = document.getElementById("consultarIngreso_Egreso").value;

    for (let i = 0; i < ingresosYEgresos.length; i++) {
        if (ingresosYEgresos[i].numeroDeCuenta == numeroDeCuenta) {
            document.getElementById("numeroDeCuenta").value = ingresosYEgresos[i].numeroDeCuenta;
            document.getElementById("nombreDelTipo").value = ingresosYEgresos[i].nombreDelTipo;
            document.getElementById("descripcion").value = ingresosYEgresos[i].descripcion;
            document.getElementById("tipoI_E").value = ingresosYEgresos[i].tipoI_E;
            document.getElementById("categoria").value = ingresosYEgresos[i].categoria;
            break;
        }
    }
}

function modificarIngresoEgreso() {
    var ingresosYEgresos = JSON.parse(localStorage.getItem("ingresosYEgresos") || "[]");
    var numeroDeCuenta = document.getElementById("numeroDeCuenta").value;

    for (let i = 0; i < ingresosYEgresos.length; i++) {
        if (ingresosYEgresos[i].numeroDeCuenta == numeroDeCuenta) {
            ingresosYEgresos[i].nombreDelTipo = document.getElementById("nombreDelTipo").value;
            ingresosYEgresos[i].descripcion = document.getElementById("descripcion").value;
            ingresosYEgresos[i].tipoI_E = document.getElementById("tipoI_E").value;
            ingresosYEgresos[i].categoria = document.getElementById("categoria").value;

            localStorage.setItem("ingresosYEgresos", JSON.stringify(ingresosYEgresos));
            recargarTabla();
            break;
        }
    }
}

function eliminar_IngresoEgreso() {
    var ingresosYEgresos = JSON.parse(localStorage.getItem("ingresosYEgresos") || "[]");
    var numeroDeCuenta = document.getElementById("eliminarIngresoEgreso").value;

    for (let i = 0; i < ingresosYEgresos.length; i++) {
        if (ingresosYEgresos[i].numeroDeCuenta == numeroDeCuenta) {
            ingresosYEgresos.splice(i, 1);
            localStorage.setItem("ingresosYEgresos", JSON.stringify(ingresosYEgresos));
            recargarTabla();
            break;
        }
    }
}

function recargarTabla() {
    var tabla = document.getElementById("tablaDeIngresosYEgresos");
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    cargarCuentasGuardadas();
}

// Nueva función para cargar las transacciones guardadas y mostrarlas en el historial
function cargarHistorialTransacciones() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");
    var tabla = document.getElementById("historialTransacciones");

    transacciones.forEach(function(transaccion) {
        var fila = tabla.insertRow();

        var celdaTipoTransaccion = fila.insertCell(0);
        var celdaTipoIngreso = fila.insertCell(1);
        var celdaValorTransaccion = fila.insertCell(2);
        var celdaNumeroDeCuenta = fila.insertCell(3);
        var celdaFechaTransaccion = fila.insertCell(4);

        celdaTipoTransaccion.textContent = transaccion.tipoTransaccion;
        celdaTipoIngreso.textContent = transaccion.tipoIngreso;
        celdaValorTransaccion.textContent = transaccion.valorTransaccion;
        celdaNumeroDeCuenta.textContent = transaccion.numeroDeCuenta;
        celdaFechaTransaccion.textContent = transaccion.fechaTransaccion;
    });
}