window.onload = main;
const url = "http://localhost:3000";
const datosDiv = document.getElementById("ListaArticulos");

function main() 
{ 
    cargarArticulos()
}

async function cargarArticulos()
{
    datosDiv.innerHTML = "";
    let dataJson ; 

     await fetch(`${url}/articulo`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

     dataJson.forEach(element => {
        datosDiv.innerHTML += "<li>" + element.nombre + "  " + element.cantidad 
        + " <button onClick ='modificar("+element.id+",`"+element.codigo+"`,`"+element.nombre+"`,`"+element.cantidad+"`,`"+element.precioCosto+"`,"+element.PrecioVenta+","+element.stock_negativo+","+element.minimo+","+element.tipo_articulo_id+")'> Modificar</button>" 
        + " <button onClick ='eliminar("+element.id+")'> Eliminar</button>"+ "</li>";
     });
}

function eliminar(articuloId) 
{
    fetch(`${url}/articulo/borrar`,  {
        method: 'DELETE',
        body: JSON.stringify({
            id: articuloId
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });

    alert("Articulo borrado exitosamente");
    cargarArticulos();
}

function modificar(articuloId,codigoArticulo,nombreArticulo,cantidadArticulo,precioCostoArticulo,
                  precioVentaArticulo,stockNegativoArticulo,minimoArticulo,tipoArticulo)
{

    var URL="articulosOps.html";
    this.location.href=URL;
    localStorage.setItem("tipoOp","Modificar Articulo");
    localStorage.setItem("articuloId",articuloId);
    localStorage.setItem("codigoArticulo",codigoArticulo);
    localStorage.setItem("nombreArticulo",nombreArticulo);
    localStorage.setItem("cantidadArticulo",cantidadArticulo);
    localStorage.setItem("precioCostoArticulo",precioCostoArticulo);
    localStorage.setItem("precioVentaArticulo",precioVentaArticulo);
    localStorage.setItem("stockNegativoArticulo",stockNegativoArticulo);
    localStorage.setItem("minimoArticulo",minimoArticulo);
    localStorage.setItem("tipoArticulo",tipoArticulo);
    localStorage.setItem("tipoOpBtn","Modificar");
    localStorage.setItem("agregarModificar",2);///1-agregar 2-modificar
    
}

function agregar() 
{
    var URL="articulosOps.html";
    this.location.href=URL;
    localStorage.setItem("tipoOp","Agregar Articulo");
    localStorage.setItem("tipoOpBtn","Agregar");
    localStorage.setItem("agregarModificar",1);
}