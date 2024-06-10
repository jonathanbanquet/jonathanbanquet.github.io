function cargarCuentas() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");
    var cuentas = {};

    transacciones.forEach(function(transaccion) {
        var numeroDeCuenta = transaccion.numeroDeCuenta;

        if (!cuentas[numeroDeCuenta]) {
            cuentas[numeroDeCuenta] = {
                ingresos: 0,
                egresos: 0,
                contador: 0
            };
        }

        if (transaccion.tipoIngreso.toLowerCase() === "ingreso") {
            cuentas[numeroDeCuenta].ingresos += transaccion.valorTransaccion;
        } else if (transaccion.tipoIngreso.toLowerCase() === "egreso") {
            cuentas[numeroDeCuenta].egresos += transaccion.valorTransaccion;
        }

        cuentas[numeroDeCuenta].contador++;
    });

    actualizarTablaDeCuentas(cuentas);
}

function actualizarTablaDeCuentas(cuentas) {
    var tabla = document.getElementById("tablaDeCuentas");
    tabla.innerHTML = ""; // Limpiar la tabla antes de actualizarla

    // Crear la fila de encabezado con los nombres de las columnas
    var filaEncabezado = tabla.insertRow();
    var encabezados = ["Número de Cuenta", "Ingresos", "Egresos", "Valor Promedio", "Tipo de Transacción"];

    encabezados.forEach(function(encabezado) {
        var celdaEncabezado = document.createElement("th");
        celdaEncabezado.textContent = encabezado;
        filaEncabezado.appendChild(celdaEncabezado);
    });

    for (var cuenta in cuentas) {
        var fila = tabla.insertRow();

        var celdaNumeroCuenta = fila.insertCell();
        var celdaIngresos = fila.insertCell();
        var celdaEgresos = fila.insertCell();
        var celdaPromedio = fila.insertCell();
        var celdaTipo = fila.insertCell();

        celdaNumeroCuenta.textContent = cuenta;
        celdaIngresos.textContent = cuentas[cuenta].ingresos;
        celdaEgresos.textContent = cuentas[cuenta].egresos;
        celdaPromedio.textContent = (cuentas[cuenta].ingresos - cuentas[cuenta].egresos) / cuentas[cuenta].contador;
        celdaTipo.textContent = cuentas[cuenta].contador > 0 ? (cuentas[cuenta].ingresos > cuentas[cuenta].egresos ? "Ingreso" : "Egreso") : "N/A";
    }
}

function cargarTransaccionesGuardadas() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

    transacciones.forEach(function(transaccion) {
        agregarTransaccionATabla(transaccion);
    });
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