//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const send = document.getElementById("send");
const audio = document.getElementById("audio");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();


socket.on("message", (msg_entry)=>{
  display.innerHTML += "<br> > " + msg_entry;
});

send.onclick = () => {
  if (msg_entry.value)
    socket.send(msg_entry.value);
    audio.play();
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}
//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(msg_entry.value);
    audio.play();
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}