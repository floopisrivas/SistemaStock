window.onload = main;

const url = "http://localhost:3000";
const titulo = document.getElementById("tituloClienteOp");
const btnAceptar = document.getElementById("btnAceptar");

const txtNom = document.getElementById("Nombre");
const txtCod = document.getElementById("Codigo");

const nmbCant = document.getElementById("Cantidad");
const nmbPC = document.getElementById("PrecioCosto");
const nmbPV = document.getElementById("PrecioVenta");
const nmbMin = document.getElementById("VentaMinima");

const chkSN = document.getElementById("chkStockNegativo");

const cajaTipoArticulo = document.getElementById("cajaTipoArticulo");

var primeraVez = 0;

function main() {
    titulo.textContent = localStorage.getItem("tipoOp");
    btnAceptar.textContent = localStorage.getItem("tipoOpBtn");


    cargarCajaTipoArticulo();

    if (localStorage.getItem("agregarModificar") == 2) {
        txtNom.value = localStorage.getItem("nombreArticulo");
        txtCod.value = localStorage.getItem("codigoArticulo");

        nmbCant.value = localStorage.getItem("cantidadArticulo");
        nmbPC.value = localStorage.getItem("precioCostoArticulo");
        nmbPV.value = localStorage.getItem("precioVentaArticulo");
        nmbMin.value = localStorage.getItem("minimoArticulo");

        if (localStorage.getItem("stockNegativoArticulo") == 1)
            chkSN.checked = true;

    }

}

///////CARGAR COMBO BOXS/////////
async function cargarCajaTipoArticulo() {

    let dataJson;

    await fetch(`${url}/tipos_articulo`)
        .then((response) => response.json())
        .then((data) => dataJson = data)

    dataJson.forEach(element => {
        var opcion = document.createElement('option');
        opcion.value = element.id;
        opcion.text = element.nombre;
        cajaTipoArticulo.appendChild(opcion);
    });
    if (localStorage.getItem("agregarModificar") == 2)
        cajaTipoArticulo.value = localStorage.getItem("tipoArticulo");

}

///////GUARDAR DATOS/////////

function aceptar() 
{
    var stkNegativo=0;

    if(chkSN.checked==true)
    stkNegativo=1;

    if (localStorage.getItem("agregarModificar") == 2) 
    {

        fetch(`${url}/articulo/modificar`, {
            method: 'PUT',
            body: JSON.stringify({
                id: localStorage.getItem("articuloId"),
                nombre: txtNom.value,
                codigo: txtCod.value,
                cantidad: nmbCant.value,
                precioCosto: nmbPC.value,
                PrecioVenta: nmbPV.value,
                stock_negativo: stkNegativo,
                minimo: nmbMin.value,
                tipo_articulo_id: cajaTipoArticulo.value
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        alert("Cliente modificado exitosamente");
        var URL = "articulos.html";
        this.location.href = URL;
    }
    else {
        fetch(`${url}/articulo/agregar`, {
            method: 'POST',
            body: JSON.stringify({
                nombre: txtNom.value,
                codigo: txtCod.value,
                cantidad: nmbCant.value,
                precioCosto: nmbPC.value,
                PrecioVenta: nmbPV.value,
                stock_negativo: stkNegativo,
                minimo: nmbMin.value,
                tipo_articulo_id: cajaTipoArticulo.value
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        
        var URL = "articulos.html";
        this.location.href = URL;
    }
}