const url = "http://localhost:8080";




///////////////////////////////////////////// PAIS /////////////////////////////////////////////
//============================================================================================//

function agregarPais() 
{
    fetch(`${url}/pais/agregar`,  {
        method: 'POST',
        body: JSON.stringify({
            nombre: document.getElementById("paisIngresado").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })

    alert("Agregado con éxito");
    actualizarPais();
}

async function actualizarPais() 
{
    document.getElementById("listaPaises").innerHTML = "";
    let dataJson;
    
    await fetch(`${url}/pais`)
    .then((response) => response.json())
    .then((data) => dataJson = data)

    dataJson.forEach(element => {
        document.getElementById("listaPaises").innerHTML += "<li>" + element.nombre + "</li>"     
    });

}

async function modificarPais() 
{
    var nombrePais = document.getElementById("paisIngresado").value;
    var idPais = 0;
    var dataJson;
  
    await fetch(`${url}/pais/${nombrePais}`)
    .then((dato) => dato.json())
    .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idPais = element.id
    });


     fetch(`${url}/pais/modificar`,  {
        method: 'PUT',
        body: JSON.stringify({
            id: idPais,
            nombre: document.getElementById("nuevoNombre").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })

    alert("Modificado con éxito");
    actualizarPais();

}

async function borrarPais() 
{

    var nombrePais = document.getElementById("paisIngresado").value;
    var idPais = 0;
    var dataJson;
  
    await fetch(`${url}/pais/${nombrePais}`)
    .then((dato) => dato.json())
    .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idPais = element.id
    });

    fetch(`${url}/pais/borrar`,  {
        method: 'DELETE',
        body: JSON.stringify({
            id: idPais
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });

    alert("Borrado con éxito");
    actualizarPais();
}

///////////////////////////////////////////// PROVINCIA ////////////////////////////////////////
//============================================================================================//

function agregarProvincia() 
{
    fetch(`${url}/provincia/agregar`,  {
        method: 'POST',
        body: JSON.stringify({
            nombre: document.getElementById("provinciaIngresado").value,
            pais_id: document.getElementById("caja").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Agregado con éxito");
    actualizarProvincia();
}

async function actualizarProvincia() 
{
    document.getElementById("listaProvincias").innerHTML = "";
    let dataJson;
    
    await fetch(`${url}/provincia`)
    .then((response) => response.json())
    .then((data) => dataJson = data)

    dataJson.forEach(element => {
        document.getElementById("listaProvincias").innerHTML += "<li>" + element.nombre + "</li>"     
    });

}

async function modificarProvincia() 
{

    var nombreProv = document.getElementById("provinciaIngresado").value;
    var idProv = 0;
    var dataJson;
  
    await fetch(`${url}/provincia/${nombreProv}`)
    .then((dato) => dato.json())
    .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idProv = element.id
    });

    fetch(`${url}/provincia/modificar`,  {
        method: 'PUT',
        body: JSON.stringify({
            id: idProv,
            nombre: document.getElementById("nuevoNombre").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Modificado con éxito");
    actualizarProvincia();

}

async function borrarProvincia() 
{

    var nombreProv = document.getElementById("provinciaIngresado").value;
    var idProv = 0;
    var dataJson;
  
    await fetch(`${url}/provincia/${nombreProv}`)
    .then((dato) => dato.json())
    .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idProv = element.id
    });

    fetch(`${url}/provincia/borrar`,  {
        method: 'DELETE',
        body: JSON.stringify({
            id: idProv
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Borrado con éxito");
    actualizarProvincia();
}

///////////////////////////////////////////// DEPARTAMENTO ////////////////////////////////////////
//============================================================================================//

function agregarDepartamento() 
{
    fetch(`${url}/departamento/agregar`,  {
        method: 'POST',
        body: JSON.stringify({
            nombre: document.getElementById("departamentoIngresado").value,
            provincia_id: document.getElementById("caja").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Agregado con éxito");
    actualizarDepartamento();
}

async function actualizarDepartamento() 
{
    document.getElementById("listaDepartamentos").innerHTML = "";
    let dataJson;
    
    await fetch(`${url}/departamento`)
    .then((response) => response.json())
    .then((data) => dataJson = data)

    dataJson.forEach(element => {
        document.getElementById("listaDepartamentos").innerHTML += "<li>" + element.nombre + "</li>"     
    });

}

async function modificarDepartamento() 
{

    var nombreDepto = document.getElementById("departamentoIngresado").value;
    var idDepto = 0;
    var dataJson;
  
    await fetch(`${url}/departamento/${nombreDepto}`)
    .then((dato) => dato.json())
    .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idDepto = element.id
    });

    alert(idDepto);

    fetch(`${url}/departamento/modificar`,  {
        method: 'PUT',
        body: JSON.stringify({
            id: idDepto,
            nombre: document.getElementById("nuevoNombre").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Modificado con éxito");
    actualizarDepartamento();

}

async function borrarDepartamento() 
{

    var nombreDepto = document.getElementById("departamentoIngresado").value;
    var idDepto = 0;
    var dataJson;
  
    await fetch(`${url}/departamento/${nombreDepto}`)
    .then((dato) => dato.json())
    .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idDepto = element.id
    });

    fetch(`${url}/departamento/borrar`,  {
        method: 'DELETE',
        body: JSON.stringify({
            id: idDepto
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Borrado con éxito");
    actualizarDepartamento();
}

///////////////////////////////////////////// LOCALIDAD ////////////////////////////////////////
//============================================================================================//

function agregarLocalidad() 
{
    fetch(`${url}/localidad/agregar`,  {
        method: 'POST',
        body: JSON.stringify({
            nombre: document.getElementById("localidadIngresado").value,
            departamento_id: document.getElementById("caja").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Agregado con éxito");
    actualizarLocalidad();
}

async function actualizarLocalidad() 
{
    document.getElementById("listaLocalidad").innerHTML = "";
    let dataJson;
    
    await fetch(`${url}/localidad`)
    .then((response) => response.json())
    .then((data) => dataJson = data)

    dataJson.forEach(element => {
        document.getElementById("listaLocalidad").innerHTML += "<li>" + element.nombre + "</li>"     
    });

}

async function modificarLocalidad() 
{

    var nombreLocalidad = document.getElementById("localidadIngresado").value;
    var idLocalidad = 0;
    var dataJson;
  
    await fetch(`${url}/localidad/${nombreLocalidad}`)
    .then((dato) => dato.json())
    .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idLocalidad = element.id
    });

    fetch(`${url}/localidad/modificar`,  {
        method: 'PUT',
        body: JSON.stringify({
            id: idLocalidad,
            nombre: document.getElementById("nuevoNombre").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Modificado con éxito");
    actualizarLocalidad();

}

async function borrarLocalidad() 
{

    var nombreLocalidad = document.getElementById("localidadIngresado").value;
    var idLocalidad = 0;
    var dataJson;
  
    await fetch(`${url}/localidad/${nombreLocalidad}`)
    .then((dato) => dato.json())
    .then((datojs) => dataJson = datojs)

    dataJson.forEach(element => {
        idLocalidad = element.id
    });

    fetch(`${url}/localidad/borrar`,  {
        method: 'DELETE',
        body: JSON.stringify({
            id: idLocalidad
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then((dato) => dato.json())

    alert("Borrado con éxito");
    actualizarLocalidad();
}