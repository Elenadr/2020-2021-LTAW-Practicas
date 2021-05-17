//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 9000;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);
let counter = 0;
//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));


//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow + socket.id);
   //-- Le damos la bienvenida a través del evento 'hello'
   socket.broadcast.emit('message', 'New user');
  socket.emit('hello', "Welcome to Magic Chat");
  counter += 1;

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    counter -= 1;
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    if (msg.startsWith("/")) {
      console.log("Ojo, es un comando".orange);
        if (msg == "/help") {
            socket.send("comandos");
        }else if (msg == "/list") {
            socket.send("Dumbledore's army members: " + counter );
        }else if (msg == "/hello") {
            socket.send("I solemnly swear that I am up to no good.");
        }else if (msg == "/date") {
            console.log("date".green);
        }else{
          console.log("Out muggle".purple);
        }
    listen
    }else{
      console.log("Mensaje Recibido!: " + socket.id + msg.blue);

      //-- Reenviarlo a todos los clientes conectados
      io.send(msg);
    }





  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);
