window.onload = main;

const url = "http://localhost:3000";
const cajaPais = document.getElementById("cajaPais");
const cajaProvincia = document.getElementById("cajaProvincia");
const cajaDepartamento = document.getElementById("cajaDepartamento");
const cajaLocalidad = document.getElementById("cajaLocalidad");

var paisId=0;
var provinciaId=0;
var departamentoId=0;
var localidadId=0;


const chkDemo = document.getElementById("chkDemo");
const chkDecimal = document.getElementById("chkDecimal");

var primeraVez = 0;

function main() 
{ 
    cajaPais.addEventListener("change",cambioDeProvincia);
    cajaProvincia.addEventListener("change",cambioDeDepartamento);
    cajaDepartamento.addEventListener("change",cambioDeLocalidad);


    cambioDePais();
}

///////CAMBIAR NOMBRE EMPRESA/////////
async function cambiarNombre() 
{
    fetch(`${url}/configuracion/nombreEmpresa/modificar`,  {
        method: 'PUT',
        body: JSON.stringify({
            nombre_empresa: document.getElementById("nuevoNombre").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });

   alert("Nombre cambiado exitosamente");
   
   await fetch(`${url}/configuracion`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

    document.getElementById("nombreEmpresa").innerHTML = dataJson[0].nombre_empresa;
}

///////GUARDAR CAMBIOS/////////
function guardarCambios() 
{
    let valorDemo=0;
    let valorUsaDecimal=0;

    if (chkDemo.checked) 
    valorDemo = 1; 
    
    if (chkDecimal.checked) 
    valorUsaDecimal = 1;


    fetch(`${url}/configuracion/modificar`,  {
        method: 'PUT',
        body: JSON.stringify({
            demo: valorDemo,
            usa_decimal: valorUsaDecimal,
            pais_id: cajaPais.value,
            provincia_id: cajaProvincia.value,
            departamento_id: cajaDepartamento.value,
            localidad_id: cajaLocalidad.value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });

   alert("Datos Guardados con exito");
   
}

///////CARGAR COMBO BOXS/////////
async function cambioDePais() 
{
    if(primeraVez==0)
    cargarPag();

    let dataJson;

     await fetch(`${url}/pais`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

     dataJson.forEach(element => {
        var opcion = document.createElement('option');
        opcion.value = element.id;
        opcion.text = element.nombre;
        cajaPais.appendChild(opcion);
    });

    if(primeraVez==0)
    cajaPais.value = paisId;
    

    cambioDeProvincia();
}

async function cambioDeProvincia() 
{
    for (let i = cajaProvincia.options.length; i >= 0; i--) {
        cajaProvincia.remove(i);
      }
    let dataJson;

    await fetch(`${url}/provincia`)
    .then((response) => response.json())
    .then((data) => dataJson = data)

    dataJson.forEach(element => {
       var opcion = document.createElement('option');
       if(element.pais_id == cajaPais.value)
       {
           opcion.value = element.id;
           opcion.text = element.nombre;
           cajaProvincia.appendChild(opcion);
       }
       
   });

   if(primeraVez==0)
   cajaProvincia.value = provinciaId;

   cambioDeDepartamento() 
}

async function cambioDeDepartamento() 
{
    for (let i = cajaDepartamento.options.length; i >= 0; i--) {
        cajaDepartamento.remove(i);
      }
    let dataJson;

    await fetch(`${url}/departamento`)
    .then((response) => response.json())
    .then((data) => dataJson = data)

    dataJson.forEach(element => {
       var opcion = document.createElement('option');
       if(element.provincia_id == cajaProvincia.value)
       {
           opcion.value = element.id;
           opcion.text = element.nombre;
           cajaDepartamento.appendChild(opcion);
       }
       
   });

   if(primeraVez==0)
   cajaDepartamento.value = departamentoId;

   cambioDeLocalidad()
}

async function cambioDeLocalidad() 
{
    for (let i = cajaLocalidad.options.length; i >= 0; i--) {
        cajaLocalidad.remove(i);
      }
    let dataJson;

    await fetch(`${url}/localidad`)
    .then((response) => response.json())
    .then((data) => dataJson = data)

    dataJson.forEach(element => {
       var opcion = document.createElement('option');
       if(element.departamento_id == cajaDepartamento.value)
       {
           opcion.value = element.id;
           opcion.text = element.nombre;
           cajaLocalidad.appendChild(opcion);
       }
       
   });

   if(primeraVez==0)
   {
    cajaLocalidad.value = localidadId;
    primeraVez=1;
   }
   
   
}

///////CARGAR PAGINA GENERAL/////////
async function cargarPag() 
{
    let dataJson; 

     await fetch(`${url}/configuracion`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

    document.getElementById("nombreEmpresa").innerHTML = dataJson[0].nombre_empresa;
    document.getElementById("nroComprobante").innerHTML += dataJson[0].ultimo_nro_compr;

    if (dataJson[0].demo == 1) 
    chkDemo.checked = true; 
    
    if (dataJson[0].usa_decimal == 1) 
    chkDecimal.checked = true; 

    paisId = dataJson[0].pais_id;
    provinciaId = dataJson[0].provincia_id;
    departamentoId = dataJson[0].departamento_id;
    localidadId = dataJson[0].localidad_id;      

}



