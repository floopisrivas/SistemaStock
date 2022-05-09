
const url = "http://localhost:8080";

async function main() 
{
    
    const cajaPais = document.getElementById("caja");
    
    let dataJson;

     await fetch(`${url}/pais`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

     dataJson.forEach(element => {
        var opcion = document.createElement('listaProvincias');
        opcion.value = element.id;
        opcion.text = element.nombre;
        cajaPais.appendChild(opcion);
    });         
}
