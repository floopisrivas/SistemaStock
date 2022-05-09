window.onload = main;
const url = "http://localhost:3000";
//const datosDiv = document.getElementById("ListaComprobantes");

var codigo;
var descripsao;
var stock;
var precioC;
var precioV;

async function main() 
{ 
    await cargarTabla();      
}

function confirmar()
{
    return confirm('¿Quieres descargar el reporte de articulos?');
}

async function imprimirReporte()
{
    const reporte = document.getElementById("main-container");
    await html2pdf()
    .from(reporte)
    .save();

    var URL = "articulos.html";
    this.location.href = URL;
}

async function imprimirReporteReponer()
{
    await cargarTablaReponer(); 
    const reporte = document.getElementById("main-container");
    await html2pdf()
    .from(reporte)
    .save();

    var URL = "articulos.html";
    this.location.href = URL;
}

async function cargarTabla() 
{
    let dataJson; 

     await fetch(`${url}/articulo`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

     dataJson.forEach(element => {
        codigo = element.codigo;
        descripsao = element.nombre;
        stock = element.cantidad;
        precioC = element.precioCosto;
        precioV = element.PrecioVenta;
        document.getElementById("tablaArticulos").innerHTML += " <tr> <td>"+codigo+"</td><td>"+descripsao+"</td><td>"+stock+"</td><td>"+precioC+"</td><td>"+precioV+"</td> </tr>";
     });
}

async function cargarTablaReponer() 
{
    document.getElementById("tablaArticulos").innerHTML = "<thead><tr><th>Codigo</th><th>Descripcion</th><th>Stock Actual</th><th>Precio Venta</th><th>Precio Costo</th></tr></thead>";

    let dataJson ; 

     await fetch(`${url}/articulo`)
     .then((response) => response.json())
     .then((data) => dataJson = data)

     dataJson.forEach(element => {
         if(element.cantidad == 0)
         {
            codigo = element.codigo;
            descripsao = element.nombre;
            stock = element.cantidad;
            precioC = element.precioCosto;
            precioV = element.PrecioVenta;
            document.getElementById("tablaArticulos").innerHTML += " <tr> <td>"+codigo+"</td><td>"+descripsao+"</td><td>"+stock+"</td><td>"+precioC+"</td><td>"+precioV+"</td> </tr>";
         }
        
     });
}