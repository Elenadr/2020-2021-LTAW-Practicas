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
   counter += 1;
   socket.send('<b> APARECIUM! </b>' + "  "+  'Welcome to magic chat!');
  socket.broadcast.emit('message', '<b> ALOHOMORA! </b>' + "  "+ 'New magician is in the chat. ');


  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    counter -= 1;
    socket.broadcast.emit('message', '<b> EVANESCO! </b>' + "  "+ 'One magician has left the chat. ');
  });  


  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    if (msg.startsWith("/")) {
      console.log("Ojo, es un comando".orange);
        if (msg == "/help") {
            socket.send(
              "Commands:" 
            + "<br>"+ 
            '<b> / help </b>' + "   " + 'Will show a list with all supported spells'
            + "<br>"+ 
            '<b> / list </b>' + "   " + 'Will return the number of connected magicians'
            + "<br>"+ 
            '<b> / hello </b>' + "   " + "The server will return the magic greeting"
            + "<br>"+ 
            '<b> / date </b>' + "   " + "It will return the date");
        }else if (msg == "/list") {
            socket.send("Magicians in the chat: " + "<b>"+ counter + "</b>");
        }else if (msg == "/hello") {
            socket.send("Welcome! Like Hagrid told Harry: "  + "<b> You are a wizard </b>");
        }else if (msg == "/date") {
            let now= new Date();
            console.log("date".green + 'La fecha actual es',now);
            socket.send("Today is:  <b>" + now + "</b>");
        }else{
          console.log("Out muggle".purple);
        }
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
