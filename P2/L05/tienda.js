//-- Crear una variable con la estructura definida
//-- en un fichero JSON

const fs = require('fs');

//-- Nombre del fichero JSON que queremos leer
const FICHERO_JSON = "tienda.json"
//-- Leemos el fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Mostrar informacion sobre la tienda
console.log("Usuarios registrados en la tienda: " + tienda.usuarios.length);

tienda.usuarios.forEach((element, usuarios)=>{
    console.log("Usuario registrado: " + (usuarios + 1) + ": " + element["nombre"]);
});

console.log("Productos en la tienda: " + tienda.productos.length);
tienda.productos.forEach((element, productos)=>{
    console.log("Producto: " + (productos + 1) + ": " + element["nombre"]);
}); 
console.log("Pedidos pendientes: " + tienda.pedidos.length);
tienda.pedidos.forEach((element, pedidos)=>{
    console.log("Detalles pedido: " + (pedidos + 1) + ": " + element["nombre"] +" Cantidad para enviar: "+ element["cantidad"] + " Dirección: " + element["direccion"]);
});

