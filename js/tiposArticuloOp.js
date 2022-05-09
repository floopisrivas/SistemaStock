window.onload = main;

const url = "http://localhost:3000";
const titulo = document.getElementById("tituloTiposArticuloOp");
const btnAceptar = document.getElementById("btnAceptar");

const txtNom = document.getElementById("nombre");

function main() 
{
    titulo.textContent = localStorage.getItem("tipoOp");
    btnAceptar.textContent = localStorage.getItem("tipoOpBtn");

    if (localStorage.getItem("agregarModificar") == 2) 
        txtNom.value = localStorage.getItem("nomTiposArticulo");

}

function aceptar() 
{
    if (localStorage.getItem("agregarModificar") == 2) 
    {

        fetch(`${url}/tipos_articulo/modificar`, {
            method: 'PUT',
            body: JSON.stringify({
                id: localStorage.getItem("idTiposArticulo"),
                nombre: txtNom.value
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        alert("Tipo de modificado exitosamente");
        var URL = "tipoArticulos.html";
        this.location.href = URL;
    }
    else 
    {
        fetch(`${url}/tipos_articulo/agregar`, {
            method: 'POST',
            body: JSON.stringify({
                nombre: txtNom.value
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        alert("Agregado con exito");
        var URL = "tipoArticulos.html";
        this.location.href = URL;
    }
}