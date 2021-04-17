const http = require('http');
const fs = require('fs');
const url = require('url');

const ls_OUT = "ls.html"


const PUERTO = 9000;

const mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jpg'  : 'image/jpg',
    'ico'  : 'image/x-icon',
    'mp3'  : 'audio/mpeg3',
    'mp4'  : 'video/mp4'
 };

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud

    const objecturl = url.parse(req.url);
    console.log(url.pathname);
    let camino='pages'+objecturl.pathname;
    if (camino=='pages/')
      camino='pages/main.html';
   
    

    fs.stat(camino, error => {

      if (!error) {

        fs.readFile(camino, (error,contenido) => {
          if (error) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('Error interno');
            res.end();					
          } else {
            
            const vec = camino.split('.');
            const extension=vec[vec.length-1];
            const mimearchivo=mime[extension];

            res.writeHead(200, {'Content-Type': 'mimearchivo'});
            res.write(contenido);
            res.end();
  

          }
        });
      
      } else {
        console.log(camino);
        
          if(camino == 'pages/ls'){
            fs.readdir("./pages", (error, files) => { 
              if(error){
                  throw error
              }
              console.log("Finalizando lectura");
              console.log(files);
            file=(files.toString());
              fs.writeFileSync(ls_OUT, file);
              res.writeHead(200, {'Content-Type': 'html'});
              res.write(file);
            res.end();
          });
          console.log("iniciando lectura");
            
          }else{
            console.log("Recurso inexistente");
            fs.readFile('pages/fail.html',(error,contenido) => {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(contenido);    
            return res.end();
          });
        }
      }
      
    });

});

server.listen(PUERTO);

console.log("Server On. Listening in port: " + PUERTO);