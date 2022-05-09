window.onload = main;

const url = "http://localhost:3000";
const datosDiv = document.getElementById("ListaComprobantes");
const cajaClientes = document.getElementById("cajaCliente");
const cajaArticulos = document.getElementById("cajaArticulo");
const chkFecha = document.getElementById("filtroFecha");
const chkClientes = document.getElementById("filtroCliente");
const chkArticulos = document.getElementById("filtroArticulo");

var id_articulo;
var fecha;
var cliente;
var articulo;
var id_cliente;
var total;


async function main() {
    await cargarClientes();
    await cargarArticulos();
    await cargarTabla();
}


async function imprimirReporte() {

    const reporte = document.getElementById("main-container");

    await html2pdf().from(reporte).save();

    var URL = "comprobantes.html";
    this.location.href = URL;

}


async function cargarTabla() {
    document.getElementById("tablaComrpobantes").innerHTML = "<thead><tr><th>Nro.Comprobante</th><th>Fecha</th><th>Cliente</th><th>Articulo</th><th>Cantidad</th><th>Total</th></tr></thead>";
    let dataJsonComp;
    let dataJsonCompDet;
    let dataJsonCliente;
    let dataJsonArticulo;

    await fetch(`${url}/comprobantes`)
        .then((response) => response.json())
        .then((data) => dataJsonComp = data)

    await fetch(`${url}/comprobante_detalle`)
        .then((response) => response.json())
        .then((data) => dataJsonCompDet = data)

    await fetch(`${url}/cliente`)
        .then((response) => response.json())
        .then((data) => dataJsonCliente = data)

    await fetch(`${url}/articulo`)
        .then((response) => response.json())
        .then((data) => dataJsonArticulo = data)

    dataJsonComp.forEach(elementComp => {
        dataJsonCliente.forEach(elementCliente => {
            if (elementCliente.id == elementComp.cliente_id) {
                cliente = elementCliente.apeYnom;
                id_cliente = elementCliente.id;
            }
        });

        dataJsonCompDet.forEach(elementCompDet => {
            if (elementCompDet.comprobante_id == elementComp.id) {
                dataJsonArticulo.forEach(elementArticulo => {
                    if (elementArticulo.id == elementCompDet.articulo_id) {
                        articulo = elementArticulo.nombre;
                        id_articulo = elementArticulo.id;
                    }
                });
                cargarRegistro(elementComp.numero, elementComp.fecha, cliente, articulo, elementCompDet.cantidad, elementCompDet.precio, id_cliente, id_articulo);
            }
        });

    });
}

function cargarRegistro(num, fecha, client, art, cant, prec, idClient, idArt) {
    fech = new Date(fecha);
    var fechaMin = new Date(document.getElementById("fechaMin").value);
    var fechaMax = new Date(document.getElementById("fechaMax").value);

    if (chkArticulos.checked == true && chkClientes.checked == true) {
        if (chkFecha.checked) {
            fechMin = new Date(fechaMin.getFullYear(), fechaMin.getMonth() + 1, fechaMin.getDate() + 1);
            fechMax = new Date(fechaMax.getFullYear(), fechaMax.getMonth() + 1, fechaMax.getDate() + 1);
            if((fechMin<=fech) && (fech<=fechMax))
            {
                if (idClient == cajaClientes.value && idArt == cajaArticulos.value) {
                    document.getElementById("tablaComrpobantes").innerHTML += " <tr> <td>" + num + "</td><td>" + fech.getFullYear() + "/" + fech.getMonth() + "/" + fech.getDate() + "</td><td>" + client + "</td><td>" + art + "</td><td>" + cant + "</td><td>" + prec + "</td> </tr>";
                }
            }
        }
        else {
            if (idClient == cajaClientes.value && idArt == cajaArticulos.value) {
                document.getElementById("tablaComrpobantes").innerHTML += " <tr> <td>" + num + "</td><td>" + fech.getFullYear() + "/" + fech.getMonth() + "/" + fech.getDate() + "</td><td>" + client + "</td><td>" + art + "</td><td>" + cant + "</td><td>" + prec + "</td> </tr>";
            }
        }

    }
    else if (chkArticulos.checked == false && chkClientes.checked == true) {

        if (chkFecha.checked) {
            fechMin = new Date(fechaMin.getFullYear(), fechaMin.getMonth() + 1, fechaMin.getDate() + 1);
            fechMax = new Date(fechaMax.getFullYear(), fechaMax.getMonth() + 1, fechaMax.getDate() + 1);
            if((fechMin<=fech) && (fech<=fechMax))
            {
                if (idClient == cajaClientes.value) {
                    document.getElementById("tablaComrpobantes").innerHTML += " <tr> <td>" + num + "</td><td>" + fech.getFullYear() + "/" + fech.getMonth() + "/" + fech.getDate() + "</td><td>" + client + "</td><td>" + art + "</td><td>" + cant + "</td><td>" + prec + "</td> </tr>";
                }
            }

        }
        else {
            if (idClient == cajaClientes.value) {
                document.getElementById("tablaComrpobantes").innerHTML += " <tr> <td>" + num + "</td><td>" + fech.getFullYear() + "/" + fech.getMonth() + "/" + fech.getDate() + "</td><td>" + client + "</td><td>" + art + "</td><td>" + cant + "</td><td>" + prec + "</td> </tr>";
            }
        }

    } 
    else if (chkArticulos.checked == true && chkClientes.checked == false) {
        if (chkFecha.checked) {
            fechMin = new Date(fechaMin.getFullYear(), fechaMin.getMonth() + 1, fechaMin.getDate() + 1);
            fechMax = new Date(fechaMax.getFullYear(), fechaMax.getMonth() + 1, fechaMax.getDate() + 1);
            if((fechMin<=fech) && (fech<=fechMax))
            {
                if (idArt == cajaArticulos.value) {
                    document.getElementById("tablaComrpobantes").innerHTML += " <tr> <td>" + num + "</td><td>" + fech.getFullYear() + "/" + fech.getMonth() + "/" + fech.getDate() + "</td><td>" + client + "</td><td>" + art + "</td><td>" + cant + "</td><td>" + prec + "</td> </tr>";
                }
            }

        }
        else {
            if (idArt == cajaArticulos.value) {
                document.getElementById("tablaComrpobantes").innerHTML += " <tr> <td>" + num + "</td><td>" + fech.getFullYear() + "/" + fech.getMonth() + "/" + fech.getDate() + "</td><td>" + client + "</td><td>" + art + "</td><td>" + cant + "</td><td>" + prec + "</td> </tr>";
            }
        }

    } else {
        if (chkFecha.checked) {
            fechMin = new Date(fechaMin.getFullYear(), fechaMin.getMonth() + 1, fechaMin.getDate() + 1);
            fechMax = new Date(fechaMax.getFullYear(), fechaMax.getMonth() + 1, fechaMax.getDate() + 1);
            if((fechMin<=fech) && (fech<=fechMax))
            {
                document.getElementById("tablaComrpobantes").innerHTML += " <tr> <td>" + num + "</td><td>" + fech.getFullYear() + "/" + fech.getMonth() + "/" + fech.getDate() + "</td><td>" + client + "</td><td>" + art + "</td><td>" + cant + "</td><td>" + prec + "</td> </tr>";
            }

        }
        else{
            document.getElementById("tablaComrpobantes").innerHTML += " <tr> <td>" + num + "</td><td>" + fech.getFullYear() + "/" + fech.getMonth() + "/" + fech.getDate() + "</td><td>" + client + "</td><td>" + art + "</td><td>" + cant + "</td><td>" + prec + "</td> </tr>";
        }
        
    }
}

async function cargarTablaReponer() {
    document.getElementById("tablaArticulos").innerHTML = "<thead><tr><th>Codigo</th><th>Descripcion</th><th>Stock Actual</th><th>Precio Venta</th><th>Precio Costo</th></tr></thead>";

    let dataJson;

    await fetch(`${url}/articulo`)
        .then((response) => response.json())
        .then((data) => dataJson = data)

    dataJson.forEach(element => {
        if (element.cantidad == 0) {
            codigo = element.codigo;
            descripsao = element.nombre;
            stock = element.cantidad;
            precioC = element.precioCosto;
            precioV = element.PrecioVenta;
            document.getElementById("tablaArticulos").innerHTML += " <tr> <td>" + codigo + "</td><td>" + descripsao + "</td><td>" + stock + "</td><td>" + precioC + "</td><td>" + precioV + "</td> </tr>";
        }

    });
}



async function cargarClientes() {
    let dataJson;

    await fetch(`${url}/cliente`)
        .then((response) => response.json())
        .then((data) => dataJson = data)

    dataJson.forEach(element => {

        var op = document.createElement('option');

        if (element.estado == 1) {
            op.value = element.id;
            op.text = element.apeYnom;
            cajaClientes.appendChild(op);
        }
    });
}

async function cargarArticulos() {
    let dataJson;

    await fetch(`${url}/articulo`)
        .then((response) => response.json())
        .then((data) => dataJson = data)

    dataJson.forEach(element => {

        var op = document.createElement('option');

        op.value = element.id;
        op.text = element.nombre;
        cajaArticulos.appendChild(op);

    });
}