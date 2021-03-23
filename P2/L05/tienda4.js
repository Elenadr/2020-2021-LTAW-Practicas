//-- Lectura y modificación de un fichero JSON
const fs = require('fs');

//-- Nombre del fichero JSON que leemos
const FICHERO_JSON = "tienda.json"

//-- Nombre del fichero JSON que tendremos de salida
const FICHERO_JSON_OUT = "newtienda.json"

//-- Leemos el fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Modificar el nombre del producto 2
tienda.productos[1]["nombre"] = "Giratiempo"
tienda.productos[1]["stock"] = "210"

//-- Mostrar informacion sobre la tienda
console.log("Productos en la tienda: " + tienda.productos.length+1);

//-- Recorrer el array de productos
tienda.productos.forEach((productos, index)=>{
  console.log("Producto: " + (index + 1) + ": " + productos["nombre"]);
});

//-- Convertir la variable a cadena JSON
let myJSON = JSON.stringify(tienda);

//-- Guardarla en el fichero destino
fs.writeFileSync(FICHERO_JSON_OUT, myJSON);

console.log("Información guardada en fichero: " + FICHERO_JSON_OUT);

