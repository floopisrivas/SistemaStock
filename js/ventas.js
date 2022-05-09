window.onload = main;

const url = "http://localhost:3000";
const cajaClientes = document.getElementById("cajaCliente");
const cajaArticulos = document.getElementById("cajaArticulo");

const nmbNroComp = document.getElementById("nroComprobante");
const nmbCantidad = document.getElementById("cantidad");

const divCarrito = document.getElementById("carrito");

const lblTotal = document.getElementById("totalArticulo");
const lblFinal = document.getElementById("totalFinal");

var listaArticulosDto = [];
var idDto = 0;



async function main() {
    nmbNroComp.isContentEditable = false;
    nmbNroComp.value = 1 + await ultimoNroComp();
    nmbCantidad.value = 0;
    divCarrito.innerHTML = "CARRITO";
    nmbCantidad.addEventListener("change", mostrarPrecioArticulo);
    cajaArticulos.addEventListener("change", mostrarPrecioArticulo);
    cargarClientes();
    cargarArticulos();
}



/////PANTALLA

async function agregarAlCarrito() {
    idDto++;
    let idExistia = false;

    if (nmbCantidad.value <= 0) {
        alert("No puede escojer esa cantiadad");
        return;
    }

    let articulosDto = {
        id: idDto,
        cantidad: nmbCantidad.value,
        precio: await calcular(),
        nombreArticulo: cajaArticulos.options[cajaArticulos.selectedIndex].text,
        articulo_id: cajaArticulos.value
    }

    listaArticulosDto.forEach(element => {
        if (element.articulo_id == articulosDto.articulo_id) {
            element.cantidad = parseFloat(element.cantidad) + parseFloat(articulosDto.cantidad),
                element.precio = parseFloat(element.precio) + parseFloat(articulosDto.precio),
                idExistia = true
        }
    });

    if (idExistia == false) {
        listaArticulosDto.push(articulosDto);
    }
    alert("Agregado");
    nmbCantidad.value = 0;
    refrescarCarrito();
}

function refrescarCarrito() {
    divCarrito.innerHTML = "CARRITO";

    listaArticulosDto.forEach(element => {
        divCarrito.innerHTML += "<li>" + element.nombreArticulo + " " + element.cantidad + " ...$" + element.precio
            + " <button onClick ='eliminar(" + element.articulo_id + ")'> Eliminar</button>" + "</li>";
    });
    mostrarPrecioFinal();

}

function eliminar(id) {
    let listaArticulosDtoTemp = [];

    listaArticulosDto.forEach(element => {
        if (element.articulo_id != id) {
            listaArticulosDtoTemp.push(element);
        }
    });
    listaArticulosDto = [];
    listaArticulosDto = listaArticulosDtoTemp;

    alert("Eliminado");
    refrescarCarrito();
}

async function mostrarPrecioArticulo() {
    let total = await calcular();
    lblTotal.textContent = "$" + total;

}

function mostrarPrecioFinal() {
    let total = 0;
    listaArticulosDto.forEach(element => {
        total += parseFloat(element.precio);
    });
    lblFinal.textContent = "$ " + total;

}

async function calcular() {

    let idArticulo = cajaArticulos.value;
    let precio = 0;
    let total = 0;
    let dataJson;

    await fetch(`${url}/articulo/${idArticulo}`)
        .then((dato) => dato.json())
        .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        precio = element.PrecioVenta
    });

    return total = precio * nmbCantidad.value;

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


//////////COMPRAR
async function comprar() {
    let compro = false;

    listaArticulosDto.forEach(element => {
        compro = true;
    });

    if (compro == false) {
        alert("Carrito Vacio");
        return;
    }

    let comprobacionStok = await comprobarStok();
    if (comprobacionStok == false) {
        return;
    }

    agregarComprobante();
}

async function comprobarStok() {
    let dataJson;
    let seguir = true;

    await fetch(`${url}/articulo`)
        .then((dato) => dato.json())
        .then((datojs) => dataJson = datojs)

    dataJson.forEach(elementDB => {
        if (elementDB.stok_negativo != 1) {
            listaArticulosDto.forEach(element => {
                if (elementDB.nombre == element.nombreArticulo) {
                    if (elementDB.cantidad < element.cantidad) {
                        alert("Stok de " + element.nombreArticulo + " insuficiente");
                        seguir = false;
                    }
                }
                
            });
        }
    });
    return seguir;
}

//////////COMPROBANTE

async function ultimoNroComp() {

    let ultimoNroComp;

    await fetch(`${url}/comprobantes`)
        .then((dato) => dato.json())
        .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        ultimoNroComp = element.numero
    });

    return ultimoNroComp;

}

async function agregarComprobante() {

    var today = new Date();

    fetch(`${url}/comprobantes/agregar`, {
        method: 'POST',
        body: JSON.stringify({
            numero: nmbNroComp.value,
            fecha: today,
            estado: 1,
            cliente_id: cajaClientes.value
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });

   await agregarCompDetalle();
}

async function agregarCompDetalle() {

    let idComprobante;

    await fetch(`${url}/comprobantes`)
        .then((dato) => dato.json())
        .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idComprobante = element.id
    });

    probar(idComprobante);
    
}
function probar(idComprobante)
{
    listaArticulosDto.forEach(element => {
        fetch(`${url}/comprobante_detalle/agregar`, {
            method: 'POST',
            body: JSON.stringify({
                cantidad: parseFloat(element.cantidad),
                precio: parseFloat(element.precio),
                estado: 1,
                articulo_id: parseInt(element.articulo_id),
                comprobante_id: parseInt(idComprobante + 1)
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    });
    alert("Transaccion con exito");
}