const http = require('http');
const fs = require('fs');
const url = require('url');


const PUERTO = 9000;
const MAIN = fs.readFileSync('pages/main.html','utf-8');
const FAIL = fs.readFileSync('pages/fail.html','utf-8');
const HARRY = fs.readFileSync('pages/harry_v.html','utf-8');
const HERMIONE = fs.readFileSync('pages/hermione_v.html','utf-8');
const DUMBLEDORE = fs.readFileSync('pages/dumbledore_v.html','utf-8');
const SIRIUS = fs.readFileSync('pages/sirius_v.html','utf-8');
const VOLDEMORT = fs.readFileSync('pages/voldemort_v.html','utf-8');
const RON = fs.readFileSync('pages/ron_v.html','utf-8');

const mime = {
  'html' : 'text/html',
  'css'  : 'text/css',
  'jpg'  : 'image/jpg',
  'ico'  : 'image/x-icon',
  'js'   : 'application/javascript'
};

const server = http.createServer((req, res)=>{
  console.log("Petición recibida!");
    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("  Ruta: " + myURL.pathname);
    console.log("  Parametros: " + myURL.searchParams);  

    //-- Por defecto entregar main
    let content_type = mime["html"];
    let content;


    if(myURL.pathname == '/'){
      content = MAIN;
    }else if(myURL.pathname == '/harry_v.html'){
  
      content=HARRY;
    }else if(myURL.pathname == '/hermione_v.html'){
      content=HERMIONE;
    }else if(myURL.pathname == '/dumbledore_v.html'){
      content=DUMBLEDORE;
    }else if(myURL.pathname == '/sirius_v.html'){
      content=SIRIUS;
    }else if(myURL.pathname == '/ron_v.html'){
      content=RON;
    }else if(myURL.pathname == '/voldemort_v.html'){
      content=VOLDEMORT;
    }else{
      const objetourl= url.parse(req.url);
      let camino = 'pages'+ objetourl.pathname;
      console.log('Camino ' + camino);
      fs.readFile(camino, (error, contenido) =>{
        if(!error){
          const vec = camino.split('.');
          const extension = vec[vec.length-1];
          const content_type = mime[extension];
          res.setHeader('Content-Type', 'content_type');
          res.write(contenido);
          res.end();
        }else{
          res.writeHead(404,{'Content-Type': content_type});
          res.write(FAIL);
          res.end();
        }
      });
      return;  
    }
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end;


});

server.listen(PUERTO);

console.log("Server On. Listening in port: " + PUERTO);