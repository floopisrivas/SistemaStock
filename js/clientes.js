window.onload = main;
const url = "http://localhost:3000";
const datosDiv = document.getElementById("ListaClientes");

function main() 
{ 
    cargarClientes()
}

async function cargarClientes()
{
    datosDiv.innerHTML = "";
    let dataJson; 

     await fetch(`${url}/cliente`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

     dataJson.forEach(element => {
        datosDiv.innerHTML += "<li>" + element.apeYnom + "  " + element.estado 
        + " <button onClick ='modificar("+element.id+",`"+element.apeYnom+"`,`"+element.domicilio+"`,`"+element.email+"`,`"+element.celular+"`,"+element.pais_id+","+element.provincia_id+","+element.departamento_id+","+element.localidad_id+")'> Modificar</button>" 
        + " <button style='color:red;' onClick ='eliminar("+element.id+","+element.estado+")'> Cambiar Estado</button>"+ "</li>";
     });
}

function eliminar(cuentaId, cuentaEstado) 
{
    let nuevoEstado;
    if(cuentaEstado == 1)
    {
       nuevoEstado = 0;
    }
    else
    {
        nuevoEstado = 1;
    }

    fetch(`${url}/cliente/borrar`,  {
        method: 'PUT',
        body: JSON.stringify({
            id: cuentaId,
            estado: nuevoEstado
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });

    alert("Estado de cliente cambiado exitosamente");
    cargarClientes();
}

function modificar(idCliente,nomCliente,domCliente,mailCliente,celCliente,paisId,provinciaId,departamentoId,localidadId) {

    var URL="ClientesOps.html";
    this.location.href=URL;
    localStorage.setItem("tipoOp","Modificar Cliente");
    localStorage.setItem("idCliente",idCliente);
    localStorage.setItem("nombreCliente",nomCliente);
    localStorage.setItem("domicilioCliente",domCliente);
    localStorage.setItem("emailCliente",mailCliente);
    localStorage.setItem("celularCliente",celCliente);
    localStorage.setItem("paisId",paisId);
    localStorage.setItem("provinciaId",provinciaId);
    localStorage.setItem("departamentoId",departamentoId);
    localStorage.setItem("localidadId",localidadId);
    localStorage.setItem("tipoOpBtn","Modificar");
    localStorage.setItem("agregarModificar",2);///1-agregar 2-modificar
    
}

function agregar() {
    var URL="ClientesOps.html";
    this.location.href=URL;
    localStorage.setItem("tipoOp","Agregar Cliente");
    localStorage.setItem("tipoOpBtn","Agregar");
    localStorage.setItem("agregarModificar",1);
}