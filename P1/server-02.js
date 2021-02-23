const http = require('http');

const PUERTO = 8080;
//-- Crear el servidor


//-- Función de retrollamada de petición recibida
//-- Cada vez que un cliente realiza una petición
//-- Se llama a esta función
function atender(req, res) {
    //-- req: http.IncomingMessage: Mensaje de solicitud
    //-- res: http.ServerResponse: Mensaje de respuesta (vacío)

    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");

    //-- pero no enviamos respuesta (todavía)
}
const server = http.createServer();
//-- Activar la función de retrollamada del servidor
server.on('request', atender);

//-- Activar el servidor. A la escucha de peitciones
//-- en el puerto 8080
server.listen(8080);

console.log("Servidor activado(server 2). Escuchando en puerto" + PUERTO)