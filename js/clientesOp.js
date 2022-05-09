window.onload = main;

const url = "http://localhost:3000";
const titulo = document.getElementById("tituloClienteOp");
const btnAceptar = document.getElementById("btnAceptar");

const txtNom = document.getElementById("apYnom");
const txtDom = document.getElementById("dom");
const txtMail = document.getElementById("mail");
const txtCel = document.getElementById("cel");

const cajaPais = document.getElementById("cajaPais");
const cajaProvincia = document.getElementById("cajaProvincia");
const cajaDepartamento = document.getElementById("cajaDepartamento");
const cajaLocalidad = document.getElementById("cajaLocalidad");

var primeraVez = 0;

function main() {
    titulo.textContent = localStorage.getItem("tipoOp");
    btnAceptar.textContent = localStorage.getItem("tipoOpBtn");

    cajaPais.addEventListener("change", cambioDeProvincia);
    cajaProvincia.addEventListener("change", cambioDeDepartamento);
    cajaDepartamento.addEventListener("change", cambioDeLocalidad);


    cambioDePais();

    if (localStorage.getItem("agregarModificar") == 2) {
        txtNom.value = localStorage.getItem("nombreCliente");
        txtDom.value = localStorage.getItem("domicilioCliente");
        txtMail.value = localStorage.getItem("emailCliente");
        txtCel.value = localStorage.getItem("celularCliente");

    }

}

///////CARGAR COMBO BOXS/////////
async function cambioDePais() {

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
    if (primeraVez == 0 && localStorage.getItem("agregarModificar") == 2) 
     cajaPais.value = localStorage.getItem("paisId");

    cambioDeProvincia();
}

async function cambioDeProvincia() {
    for (let i = cajaProvincia.options.length; i >= 0; i--) {
        cajaProvincia.remove(i);
    }
    let dataJson;

    await fetch(`${url}/provincia`)
        .then((response) => response.json())
        .then((data) => dataJson = data)

    dataJson.forEach(element => {
        var opcion = document.createElement('option');
        if (element.pais_id == cajaPais.value) {
            opcion.value = element.id;
            opcion.text = element.nombre;
            cajaProvincia.appendChild(opcion);
        }

    });
    
    if (primeraVez == 0 && localStorage.getItem("agregarModificar") == 2) 
      cajaProvincia.value = localStorage.getItem("provinciaId");

    cambioDeDepartamento()
}

async function cambioDeDepartamento() {
    for (let i = cajaDepartamento.options.length; i >= 0; i--) {
        cajaDepartamento.remove(i);
    }
    let dataJson;

    await fetch(`${url}/departamento`)
        .then((response) => response.json())
        .then((data) => dataJson = data)

    dataJson.forEach(element => {
        var opcion = document.createElement('option');
        if (element.provincia_id == cajaProvincia.value) {
            opcion.value = element.id;
            opcion.text = element.nombre;
            cajaDepartamento.appendChild(opcion);
        }

    });

    if (primeraVez == 0 && localStorage.getItem("agregarModificar") == 2) 
       cajaDepartamento.value = localStorage.getItem("departamentoId");
    
    cambioDeLocalidad()
}

async function cambioDeLocalidad() {
    for (let i = cajaLocalidad.options.length; i >= 0; i--) {
        cajaLocalidad.remove(i);
    }
    let dataJson;

    await fetch(`${url}/localidad`)
        .then((response) => response.json())
        .then((data) => dataJson = data)

    dataJson.forEach(element => {
        var opcion = document.createElement('option');
        if (element.departamento_id == cajaDepartamento.value) {
            opcion.value = element.id;
            opcion.text = element.nombre;
            cajaLocalidad.appendChild(opcion);
        }

    });

    if (primeraVez == 0 && localStorage.getItem("agregarModificar") == 2) {
        cajaLocalidad.value = localStorage.getItem("localidadId");
        primeraVez = 1;
    }
}

///////CARGAR DATOS/////////

function aceptar() {
    if (localStorage.getItem("agregarModificar") == 2) {
        fetch(`${url}/cliente/modificar`, {
            method: 'PUT',
            body: JSON.stringify({
                id: localStorage.getItem("idCliente"),
                apeYnom: txtNom.value,
                domicilio: txtDom.value,
                email: txtMail.value,
                celular: txtCel.value,
                pais_id: cajaPais.value,
                provincia_id: cajaProvincia.value,
                departamento_id: cajaDepartamento.value,
                localidad_id: cajaLocalidad.value
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });

        alert("Cliente modificado exitosamente");
        var URL = "Clientes.html";
        this.location.href = URL;
    }
    else 
    {
        fetch(`${url}/cliente/agregar`, {
            method: 'POST',
            body: JSON.stringify({
                apeYnom: txtNom.value,
                domicilio: txtDom.value,
                email: txtMail.value,
                celular: txtCel.value,
                estado: 1,
                pais_id: cajaPais.value,
                provincia_id: cajaProvincia.value,
                departamento_id: cajaDepartamento.value,
                localidad_id: cajaLocalidad.value
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })

        alert("Agregado con exito");
        var URL = "Clientes.html";
        this.location.href = URL;
    }
}