window.onload = main;
const url = "http://localhost:3000";
const datosDiv = document.getElementById("ListaComprobantes");

function main() 
{ 
    cargarComprobantes()
}

async function cargarComprobantes()
{
    datosDiv.innerHTML = "";
    let dataJson; 

     await fetch(`${url}/comprobantes`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

     dataJson.forEach(element => {
         if(element.estado == 1)
         {
            let fecha = new Date(element.fecha);
            datosDiv.innerHTML += "<li> |Nro: " + element.numero + "| |Fecha :" +  fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear()
            + "| <button onClick ='anularVenta("+element.id+")'> Cambiar Estado</button>"+ "</li>";
         }
        
     });
}

function anularVenta(idComprobante) 
{
    fetch(`${url}/comprobantes/borrar`,  {
        method: 'PUT',
        body: JSON.stringify({
            id: idComprobante,
            estado: 0
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })

    alert("Dado de baja");
    cargarComprobantes();
}