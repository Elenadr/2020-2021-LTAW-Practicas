const electron = require('electron');
const qrcode = require('qrcode');


console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const info5 = document.getElementById("info5");
const info6 = document.getElementById("info6");
const print = document.getElementById("print");
const usuarios = document.getElementById("users");
const ip_dir = document.getElementById("ip_dir");
const qr = document.getElementById("qr");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();

info4.textContent = process.versions.node;
info5.textContent = process.versions.chrome;
info6.textContent = process.versions.electron;


//-- Numero de usuarios
electron.ipcRenderer.on('users', (event, message) => {
    console.log("Recibido: " + message);
    usuarios.textContent = message;
});
btn_test.onclick = () => {
    console.log("Botón apretado!");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "Testing app: Patronus inbox");
}
//-- Mensajes de los clientes
electron.ipcRenderer.on('msg_client', (event, message) => {
    display.innerHTML += message + "<br>";
    display.scrollTop = message.scrollHeight;
});
//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
    
  });

  electron.ipcRenderer.on('ip', (event, message) => {
    console.log("Recibido: " + message);
    ip_dir.textContent = message;
        
        qrcode.toDataURL(message, function (err, url) {
            console.log("Imprimiendo codigo qr");
            qr.src = url;
        });

});
