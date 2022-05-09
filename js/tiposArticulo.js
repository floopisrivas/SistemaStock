window.onload = main;
const url = "http://localhost:3000";
const datosDiv = document.getElementById("ListaTiposArticulo");

function main() 
{ 
    cargarTipos()
}

async function cargarTipos()
{
    datosDiv.innerHTML = "";
    let dataJson; 

     await fetch(`${url}/tipos_articulo`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

     dataJson.forEach(element => {
        datosDiv.innerHTML += "<li>" + element.nombre
        + " <button onClick ='modificar("+element.id+",`"+element.nombre+"`)'> Modificar</button>" 
        + " <button onClick ='eliminar("+element.id+")'> Eliminar</button>"+ "</li>";
     });
}

function eliminar(tiposArticulosId) 
{
    fetch(`${url}/tipos_articulo/borrar`,  {
        method: 'DELETE',
        body: JSON.stringify({
            id: tiposArticulosId,
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });

    alert("Eliminado exitosamente");
    cargarTipos();
}

function modificar(idTiposArticulo,nomTiposArticulo) {

    var URL="tiposArticulosOps.html";
    this.location.href=URL;
    localStorage.setItem("tipoOp","Modificar Tipo de Articulo");
    localStorage.setItem("idTiposArticulo",idTiposArticulo);
    localStorage.setItem("nomTiposArticulo",nomTiposArticulo);
    localStorage.setItem("tipoOpBtn","Modificar");
    localStorage.setItem("agregarModificar",2);///1-agregar 2-modificar
}

function agregar() {
    var URL="tiposArticulosOps.html";
    this.location.href=URL;
    localStorage.setItem("tipoOp","Agregar Tipo de Articulo");
    localStorage.setItem("tipoOpBtn","Agregar");
    localStorage.setItem("agregarModificar",1);
}