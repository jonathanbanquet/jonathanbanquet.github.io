function guardarAlerta(event) {
    event.preventDefault();

    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

    var tipoDeAlerta = document.getElementById("tipoDeAlerta").value;
    var descripcionAlerta = document.getElementById("descripcionAlerta").value;
    var fechaAlerta = document.getElementById("fechaAlerta").value;
    var horaAlerta = document.getElementById("horaAlerta").value;
    var opcionesDeRepeticion = document.getElementById("opcionesDeRepeticion").value;

    var nuevaAlerta = {
        tipoDeAlerta: tipoDeAlerta,
        descripcionAlerta: descripcionAlerta,
        fechaAlerta: fechaAlerta,
        horaAlerta: horaAlerta,
        opcionesDeRepeticion: opcionesDeRepeticion
    };

    alertas.push(nuevaAlerta);

    localStorage.setItem("alertas", JSON.stringify(alertas));

    agregarAlertaATabla(nuevaAlerta);
}

function agregarAlertaATabla(alerta) {
    var tabla = document.getElementById("tablaDeAlertas");
    var fila = tabla.insertRow();

    var celdaTipoDeAlerta = fila.insertCell(0);
    var celdaDescripcionAlerta = fila.insertCell(1);
    var celdaFechaHoraAlerta = fila.insertCell(2);
    var celdaOpcionesDeRepeticion = fila.insertCell(3);

    celdaTipoDeAlerta.innerHTML = alerta.tipoDeAlerta;
    celdaDescripcionAlerta.innerHTML = alerta.descripcionAlerta;
    celdaFechaHoraAlerta.innerHTML = alerta.fechaAlerta + " " + alerta.horaAlerta;
    celdaOpcionesDeRepeticion.innerHTML = alerta.opcionesDeRepeticion;
}

function cargarAlertasGuardadas() {
    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

    alertas.forEach(function(alerta) {
        agregarAlertaATabla(alerta);

        // Obtener la fecha y hora actual
        var fechaActual = new Date();
        var horaActual = fechaActual.getHours();
        var minutosActuales = fechaActual.getMinutes();

        // Obtener la fecha y hora de la alerta
        var fechaAlerta = new Date(alerta.fechaAlerta);
        var horaAlerta = parseInt(alerta.horaAlerta.split(":")[0]);
        var minutosAlerta = parseInt(alerta.horaAlerta.split(":")[1]);

        // Comparar si la fecha y hora actual coinciden con la fecha y hora de la alerta
        if (fechaActual.getFullYear() === fechaAlerta.getFullYear() &&
            fechaActual.getMonth() === fechaAlerta.getMonth() &&
            fechaActual.getDate() === fechaAlerta.getDate() &&
            horaActual === horaAlerta &&
            minutosActuales === minutosAlerta) {
            // Mostrar una alerta al usuario
            alert(`¡Alerta!\n\n${alerta.tipoDeAlerta}: ${alerta.descripcionAlerta}`);
        }
    })
}

function consultar_Por_Fecha() {
    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]");
    var fechaConsulta = document.getElementById("consultarPorFecha").value;

    var tablaConsultas = document.getElementById("tablaDeConsultas");
    while (tablaConsultas.rows.length > 1) {
        tablaConsultas.deleteRow(1);
    }

    var resultados = alertas.filter(alerta => alerta.fechaAlerta === fechaConsulta);
    if (resultados.length > 0) {
        var fila = tablaConsultas.insertRow();
        var celdaAlertas = fila.insertCell(0);

        var alertasHtml = resultados.map(alerta => `
            <div>
                <strong>Tipo:</strong> ${alerta.tipoDeAlerta}<br>
                <strong>Descripción:</strong> ${alerta.descripcionAlerta}<br>
                <strong>Fecha y Hora:</strong> ${alerta.fechaAlerta} ${alerta.horaAlerta}<br>
                <strong>Repetición:</strong> ${alerta.opcionesDeRepeticion}<br>
                <hr>
            </div>
        `).join('');

        celdaAlertas.innerHTML = alertasHtml;
    } else {
        var fila = tablaConsultas.insertRow();
        var celdaAlertas = fila.insertCell(0);
        celdaAlertas.innerHTML = "No se encontraron alertas para la fecha proporcionada.";
    }
}

function modificarAlerta() {
    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]");
    var fechaAlerta = document.getElementById("fechaAlerta").value;
    var horaAlerta = document.getElementById("horaAlerta").value;

    var alertaIndex = alertas.findIndex(alerta => alerta.fechaAlerta === fechaAlerta && alerta.horaAlerta === horaAlerta);

    if (alertaIndex !== -1) {
        alertas[alertaIndex].tipoDeAlerta = document.getElementById("tipoDeAlerta").value;
        alertas[alertaIndex].descripcionAlerta = document.getElementById("descripcionAlerta").value;
        alertas[alertaIndex].opcionesDeRepeticion = document.getElementById("opcionesDeRepeticion").value;

        localStorage.setItem("alertas", JSON.stringify(alertas));
        recargarTabla();
    } else {
        alert("No se encontró ninguna alerta para la fecha y hora proporcionadas.");
    }
}

function eliminar_Por_Fecha() {
    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]");
    var fechaAlerta = document.getElementById("eliminarPorFecha").value;

    alertas = alertas.filter(alerta => alerta.fechaAlerta !== fechaAlerta);

    localStorage.setItem("alertas", JSON.stringify(alertas));
    recargarTabla();
}

function recargarTabla() {
    var tabla = document.getElementById("tablaDeAlertas");
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    cargarAlertasGuardadas();
}