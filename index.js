const express = require('express');
const mysql = require('mysql');
const http = require("http");
const bodyparser = require("body-parser");
const { send } = require('process');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sistemadestock'
  });

  const app = express();
  app.use(bodyparser.json());
  app.use(
    bodyparser.urlencoded({
      extended : true,
    })
  );
  
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(3000);

///////////////////////////////////////////// PAIS /////////////////////////////////////////////
//============================================================================================//

app.get('/pais', function (req, res) 
{
  const sql = "SELECT * FROM pais";
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});
 

//Pais ID
app.get('/pais/:nombre', function (req, res) 
{
  const sql = `SELECT * FROM pais WHERE nombre = '${req.params.nombre}'`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});
 

//Agregar
app.post('/pais/agregar', function (req, res) 
{
  const sql = "INSERT INTO pais SET ?";
  const objPais = 
  {
    nombre: req.body.nombre
  };

  connection.query(sql, objPais, (e,r)=>{res.send("Dato agregado")})
});

//Modificar
app.put('/pais/modificar', function (req, res) 
{
  const objPais = 
  {
    id: req.body.id,
    nombre: req.body.nombre
  };

  const sql = `UPDATE pais SET ? WHERE id= ${objPais.id}`;
  connection.query(sql, objPais, (e,r)=>{res.send(`Datos Modificados`)})
});

//Borrar
app.delete('/pais/borrar', function (req, res) 
{
  const objPais = 
  {
    id: req.body.id
  };

  const sql = `DELETE FROM pais WHERE id=${objPais.id}`;
  connection.query(sql, objPais, (e,r)=>{res.send("Dato Borrado")})
});

///////////////////////////////////////////// PROVINCIA ////////////////////////////////////////
//============================================================================================//

app.get('/provincia', function (req, res) 
{
  const sql = "SELECT * FROM provincia"
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")})
});
 

//Provincia ID
app.get('/provincia/:nombre', function (req, res) 
{
  const sql = `SELECT * FROM provincia WHERE nombre = '${req.params.nombre}'`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")})
});

//Agregar
app.post('/provincia/agregar', function (req, res) 
{
  const sql = "INSERT INTO provincia SET ?";
  const objProvincia = 
  {
    nombre: req.body.nombre,
    pais_id: req.body.pais_id
  };

  connection.query(sql, objProvincia, (e,r)=>{res.send("Dato agregado")})
});

//Modificar
app.put('/provincia/modificar', function (req, res) 
{
  const objProvincia = 
  {
    id: req.body.id,
    nombre: req.body.nombre
  };

  const sql = `UPDATE provincia SET ? WHERE id= ${objProvincia.id}`;
  connection.query(sql, objProvincia, (e,r)=>{res.send(`Datos Modificados`)})
});

//Borrar
app.delete('/provincia/borrar', function (req, res) 
{
  const objProvincia = 
  {
    id: req.body.id
  };

  const sql = `DELETE FROM provincia WHERE id=${objProvincia.id}`;
  connection.query(sql, objProvincia, (e,r)=>{res.send("Dato Borrado")})
});

///////////////////////////////////////////// DEPARTAMENTO ////////////////////////////////////////
//============================================================================================//

app.get('/departamento', function (req, res) 
{
  const sql = "SELECT * FROM departamento"
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")})
});
 

//Departamento ID
app.get('/departamento/:nombre', function (req, res) 
{
  const sql = `SELECT * FROM departamento WHERE nombre = '${req.params.nombre}'`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")})
});
 

//Agregar
app.post('/departamento/agregar', function (req, res) 
{
  const sql = "INSERT INTO departamento SET ?";
  const objDepartamento = 
  {
    nombre: req.body.nombre,
    provincia_id: req.body.provincia_id
  };

  connection.query(sql, objDepartamento, (e,r)=>{res.send("Dato agregado")})
});

//Modificar
app.put('/departamento/modificar', function (req, res) 
{
  const objDepartamento = 
  {
    id: req.body.id,
    nombre: req.body.nombre
  };

  const sql = `UPDATE departamento SET ? WHERE id= ${objDepartamento.id}`;
  connection.query(sql, objDepartamento, (e,r)=>{res.send(`Datos Modificados`)})
});

//Borrar
app.delete('/departamento/borrar', function (req, res) 
{
  const objDepartamento = 
  {
    id: req.body.id
  };

  const sql = `DELETE FROM departamento WHERE id=${objDepartamento.id}`;
  connection.query(sql, objDepartamento, (e,r)=>{res.send("Dato Borrado")})
});

///////////////////////////////////////////// LOCALIDAD ////////////////////////////////////////
//============================================================================================//

app.get('/localidad', function (req, res) 
{
  const sql = "SELECT * FROM localidad";
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});
 

//Localidad ID
app.get('/localidad/:nombre', function (req, res) 
{
  const sql = `SELECT * FROM localidad WHERE nombre = '${req.params.nombre}'`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});
 

//Agregar
app.post('/localidad/agregar', function (req, res) 
{
  const sql = "INSERT INTO localidad SET ?";
  const objLocalidad = 
  {
    nombre: req.body.nombre,
    departamento_id: req.body.departamento_id
  };

  connection.query(sql, objLocalidad, (e,r)=>{res.send("Dato agregado")});
});

//Modificar
app.put('/localidad/modificar', function (req, res) 
{
  const objLocalidad = 
  {
    id: req.body.id,
    nombre: req.body.nombre
  };

  const sql = `UPDATE localidad SET ? WHERE id= ${objLocalidad.id}`;
  connection.query(sql, objLocalidad, (e,r)=>{res.send(`Datos Modificados`)})
});

//Borrar
app.delete('/localidad/borrar', function (req, res) 
{
  const objLocalidad = 
  {
    id: req.body.id
  };

  const sql = `DELETE FROM localidad WHERE id =${objLocalidad.id}`;
  connection.query(sql, objLocalidad, (e,r)=>{res.send("Dato Borrado")})
});

/////////////////////////////////////////// CONFIGURACION //////////////////////////////////////
//============================================================================================//

//Obtener Configuracion
app.get('/configuracion', function (req, res) 
{
  const sql = `SELECT * FROM configuracion`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});

//Modificar Nombre De La Empresa
app.put('/configuracion/nombreEmpresa/modificar', function (req, res) 
{
  const objConfiguracion = 
  {
    nombre_empresa: req.body.nombre_empresa
  };

  const sql = `UPDATE configuracion SET nombre_empresa = '${objConfiguracion.nombre_empresa}' WHERE 1 `;
  connection.query(sql, objConfiguracion, (e,r)=>{res.send(`Datos Modificados`)})
});

//Modificar Configuracion
app.put('/configuracion/modificar', function (req, res) 
{
  const sql = `UPDATE configuracion SET ? WHERE 1`;
  const objConfiguracion = 
  {
    demo: req.body.demo,
    usa_decimal: req.body.usa_decimal,
    pais_id: req.body.pais_id,
    provincia_id: req.body.provincia_id,
    departamento_id: req.body.departamento_id,
    localidad_id: req.body.localidad_id
  };

  connection.query(sql, objConfiguracion, (e,r)=>{res.send(`Datos Modificados`)})
});

/////////////////////////////////////////// CLIENTES //////////////////////////////////////////
//============================================================================================//

//Obtener Clientes
app.get('/cliente', function (req, res) 
{
  const sql = `SELECT * FROM cliente`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});

//Borrar
app.put('/cliente/borrar', function (req, res) 
{
  const objCliente = 
  {
    id: req.body.id,
    estado: req.body.estado
  };

  const sql = `UPDATE cliente SET estado =${objCliente.estado}  WHERE id =${objCliente.id}`;
  connection.query(sql, objCliente, (e,r)=>{res.send("Dato Borrado")})
});

//Modificar Cliente
app.put('/cliente/modificar', function (req, res) 
{
  
  const objCliente = 
  {
    id: req.body.id,
    apeYnom: req.body.apeYnom,
    domicilio: req.body.domicilio,
    email: req.body.email,
    celular: req.body.celular,
    pais_id: req.body.pais_id,
    provincia_id: req.body.provincia_id,
    departamento_id: req.body.departamento_id,
    localidad_id: req.body.localidad_id
  };

  const sql = `UPDATE cliente SET ? WHERE id =${objCliente.id}`;

  connection.query(sql, objCliente, (e,r)=>{res.send(`Datos Modificados`)})
});


//Agregar Cliente
app.post('/cliente/agregar', function (req, res) 
{
  const sql = "INSERT INTO cliente SET ?";

  const objCliente = 
  {
    apeYnom: req.body.apeYnom,
    domicilio: req.body.domicilio,
    email: req.body.email,
    celular: req.body.celular,
    estado: req.body.estado,
    pais_id: req.body.pais_id,
    provincia_id: req.body.provincia_id,
    departamento_id: req.body.departamento_id,
    localidad_id: req.body.localidad_id
  };

  connection.query(sql, objCliente, (e,r)=>{res.send("Dato agregado")});
});

/////////////////////////////////////////// TIPOS DE ARTICULO //////////////////////////////////////////
//============================================================================================//

//Obtener Tipos Articulo
app.get('/tipos_articulo', function (req, res) 
{
  const sql = `SELECT * FROM tipo_articulo`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});

//Borrar
app.delete('/tipos_articulo/borrar', function (req, res) 
{
  const objTiposArticulos = 
  {
    id: req.body.id,
  };

  const sql = `DELETE FROM tipo_articulo WHERE id =${objTiposArticulos.id}`;
  connection.query(sql, objTiposArticulos, (e,r)=>{res.send("Dato Borrado")})
});

//Agregar Tipos de Articulo
app.post('/tipos_articulo/agregar', function (req, res) 
{
  const sql = "INSERT INTO tipo_articulo SET ?";

  const objTiposArticulos = 
  {
    nombre: req.body.nombre
  };

  connection.query(sql, objTiposArticulos, (e,r)=>{res.send("Dato agregado")});
});

//Modificar Tipos de Articulo
app.put('/tipos_articulo/modificar', function (req, res) 
{
  
  const objTiposArticulos = 
  {
    id: req.body.id,
    nombre: req.body.nombre,
  };

  const sql = `UPDATE tipo_articulo SET ? WHERE id =${objTiposArticulos.id}`;

  connection.query(sql, objTiposArticulos, (e,r)=>{res.send(`Datos Modificados`)})
});


/////////////////////////////////////////// ARTICULO //////////////////////////////////////////
//============================================================================================//

//Pais ID
app.get('/articulo/:id', function (req, res) 
{

  const sql = `SELECT * FROM articulo WHERE id = ${req.params.id}`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});

//Obtener Articulo
app.get('/articulo', function (req, res) 
{
  const sql = `SELECT * FROM articulo`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});

//Borrar
app.delete('/articulo/borrar', function (req, res) 
{
  const objArticulo = 
  {
    id: req.body.id,
  };

  const sql = `DELETE FROM articulo WHERE id =${objArticulo.id}`;
  connection.query(sql, objArticulo, (e,r)=>{res.send("Dato Borrado")})
});

//Agregar Articulo
app.post('/articulo/agregar', function (req, res) 
{
  const sql = "INSERT INTO articulo SET ?";

  const objArticulo = 
  {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
    cantidad: req.body.cantidad,
    precioCosto: req.body.precioCosto,
    PrecioVenta: req.body.PrecioVenta,
    stock_negativo: req.body.stock_negativo,
    minimo: req.body.minimo,
    tipo_articulo_id : req.body.tipo_articulo_id 
  };

  connection.query(sql, objArticulo, (e,r)=>{res.send("Dato agregado")});
});

//Modificar Articulo
app.put('/articulo/modificar', function (req, res) 
{
  
  const objArticulo = 
  {
    id: req.body.id,
    nombre: req.body.nombre,
    codigo: req.body.codigo,
    cantidad: req.body.cantidad,
    precioCosto: req.body.precioCosto,
    PrecioVenta: req.body.PrecioVenta,
    stock_negativo: req.body.stock_negativo,
    minimo: req.body.minimo,
    tipo_articulo_id : req.body.tipo_articulo_id 
  };

  const sql = `UPDATE articulo SET ? WHERE id =${objArticulo.id}`;

  connection.query(sql, objArticulo, (e,r)=>{res.send(`Datos Modificados`)})
});

/////////////////////////////////////////// COMPROBANTE //////////////////////////////////////////
//============================================================================================//

//Pais ID
app.get('/comprobantes', function (req, res) 
{
  const sql = `SELECT * FROM comprobantes`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});

//Agregar Comprobante
app.post('/comprobantes/agregar', function (req, res) 
{
  const sql = "INSERT INTO comprobantes SET ?";

  const objComprobante = 
  {
    numero: req.body.numero,
    fecha: req.body.fecha,
    estado: req.body.estado,
    cliente_id: req.body.cliente_id
  };

  connection.query(sql, objComprobante, (e,r)=>{res.send("Dato agregado")});
});

//Baja Logica Comprobante
app.put('/comprobantes/borrar', function (req, res) 
{
  
  const objComprobante = 
  {
    id: req.body.id,
    estado: req.body.estado
  };

  const sql = `UPDATE comprobantes SET estado = ${objComprobante.estado} WHERE id = ${objComprobante.id}`;
  const sql2 = `UPDATE comprobante_detalle SET estado = ${objComprobante.estado} WHERE comprobante_id = ${objComprobante.id}`;
  
  connection.query(sql, objComprobante, (e,r)=>
  {
    connection.query(sql2, objComprobante, (e,r)=>{res.send("Dato agregada")});
  });

});
////////////////////////////////////DETALLE-COMPROBANTE/////////////////////////////////////////
//============================================================================================//

app.get('/comprobante_detalle/:comprobante_id', function (req, res) 
{
  const sql = `SELECT * FROM comprobante_detalle WHERE comprobante_id = ${req.params.comprobante_id}`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});

app.get('/comprobante_detalle', function (req, res) 
{
  const sql = `SELECT * FROM comprobante_detalle WHERE 1`;
  connection.query(sql, (e,r)=>{r.length > 0 ? res.json(r) : res.send("No hay datos")});
});

//Agregar Comprobante-Detalle
app.post('/comprobante_detalle/agregar', function (req, res) 
{
  const sql = "INSERT INTO comprobante_detalle SET ?";

  const objComprobanteDetalle = 
  {
    cantidad: req.body.cantidad,
    precio: parseFloat(req.body.precio),
    estado: parseFloat(req.body.estado),
    articulo_id: req.body.articulo_id,
    comprobante_id: req.body.comprobante_id
  };

  connection.query(sql, objComprobanteDetalle, (e,r)=>{console.log(objComprobanteDetalle)});
});


