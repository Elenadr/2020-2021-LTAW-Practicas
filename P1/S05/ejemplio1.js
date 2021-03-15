//-- Crear la variable tienda, que es una estructura formada
//-- por dos productos
const tienda = [
  {
    nombre: "Varita Hermione",
    descripcion: "Fabricada en Ollivander",
    stock: 2
  },
  {
    nombre: "Varita Harry",
    stock: 9
  }
];

//-- Mostrar informacion sobre la tienda
console.log("Productos en la tienda: " + tienda.length);

//-- Recorrer el array de productos
tienda.forEach((element, index)=>{
  console.log("Producto: " + (index + 1) + ": " + element.nombre);
});