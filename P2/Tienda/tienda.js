//Modulos node
const http = require('http');
const fs = require('fs');
const url = require('url');


//Constantes
const PUERTO = 9000;
let shopcart = "";
const MAIN = fs.readFileSync('pages/main.html','utf-8');
const FAIL = fs.readFileSync('pages/fail.html','utf-8');
const HARRY = fs.readFileSync('pages/harry_v.html','utf-8');
const HERMIONE = fs.readFileSync('pages/hermione_v.html','utf-8');
const DUMBLEDORE = fs.readFileSync('pages/dumbledore_v.html','utf-8');
const SIRIUS = fs.readFileSync('pages/sirius_v.html','utf-8');
const VOLDEMORT = fs.readFileSync('pages/voldemort_v.html','utf-8');
const RON = fs.readFileSync('pages/ron_v.html','utf-8');
const FORMULARIO = fs.readFileSync('pages/formulario.html','utf-8');
const RESPUESTA = fs.readFileSync('pages/respuesta.html','utf-8');
const FORMERROR = fs.readFileSync('pages/form_error.html','utf-8');
const LOGOUT = fs.readFileSync('pages/logout.html','utf-8');
const CART = fs.readFileSync('pages/cart.html','utf-8');

const FICHJSON ='tienda.json';
//-- Leer el fichero JSON
const  tienda_json = fs.readFileSync(FICHJSON);
//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Crear una lista de productos disponibles.
let productos_disp = [];
let product_list = [];





let busqueda = "";
//-- Nombre del fichero JSON de salida
const FICHERO_JSON_OUT = "resultado.json";
const mime = {
  'html' : 'text/html',
  'css'  : 'text/css',
  'jpg'  : 'image/jpg',
  'ico'  : 'image/x-icon',
  'js'   : 'application/javascript',
  'json' : 'application/json'
};

function get_user(req) {

  //-- Leer la Cookie recibida
  const cookie = req.headers.cookie;

  //-- Hay cookie
  if (cookie) {
    
    //-- Obtener un array con todos los pares nombre-valor
    let pares = cookie.split(";");
    
    //-- Variable para guardar el usuario
    let user;

    //-- Recorrer todos los pares nombre-valor
    pares.forEach((element, index) => {

      //-- Obtener los nombres y valores por separado
      let [nombre, valor] = element.split('=');

      //-- Leer el usuario
      //-- Solo si el nombre es 'user'
      if (nombre.trim() === 'user') {
        user = valor;
      }
    });

    //-- Si la variable user no está asignada
    //-- se devuelve null
    return user || null;
  }
}

function get_cart(req) {

  //-- Leer la Cookie recibida
  const cookie = req.headers.cookie;

  //-- Hay cookie
  if (cookie) {
    
    //-- Obtener un array con todos los pares nombre-valor
    let pares = cookie.split(";");
    
    //-- Variable para guardar el carrito
    let cart;

    //-- Recorrer todos los pares nombre-valor
    pares.forEach((element, index) => {

      //-- Obtener los nombres y valores por separado
      let [nombre, valor] = element.split('=');

      //-- Leer el usuario
      //-- Solo si el nombre es 'shopcart'
      if (nombre.trim() === 'shopcart') {
        valor.split(",").forEach(producto => {
          cart.push(producto);
        });
      }
    });

    //-- Si la variable cart no está asignada
    //-- se devuelve null
    return cart || null;
  }
}

const server = http.createServer((req, res)=>{
  //-- Leer la Cookie recibida y mostrarla en la consola


  console.log("Petición recibida!");
    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
      //-- Leer los parámetros
    console.log("");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("  Ruta: " + myURL.pathname);
    console.log("  Parametros: " + myURL.searchParams);  
    const login ='Login';
    //-- Por defecto entregar main
    let content_type = mime["html"];
    let content = MAIN.replace("HTML_EXTRA", `<i class="fas fa-user"></i>`+ login + "</p>");

    //-- Obtener le usuario que ha accedido
    //-- null si no se ha reconocido

    let nombre = myURL.searchParams.get('nombre');
    let pwd = myURL.searchParams.get('pwd');
    
    console.log(" Nombre usuario: " + nombre);
    console.log(" Password: " + pwd);
  //-- Obtener le usuario que ha accedido
  //-- null si no se ha reconocido
  let user = get_user(req);


  console.log("User: " + user);
    if(myURL.pathname == '/' ){
      //--- Si la variable user está asignada
      if (user) {

        //-- Añadir a la página el nombre del usuario
        console.log("user: " + user);
        content = MAIN.replace("HTML_EXTRA", `<i class="fas fa-user-check"></i>` + user + "</p>");
      } else {
        //-- Mostrar el enlace a la página de login
        content = MAIN.replace("HTML_EXTRA", `<i class="fas fa-user"></i>`+ login + "</p>");
      }
    }else if(myURL.pathname == '/harry_v'){
  
      content=HARRY;
    }else if(myURL.pathname == '/hermione_v'){
      content=HERMIONE;
    }else if(myURL.pathname == '/dumbledore_v'){
      content=DUMBLEDORE;
    }else if(myURL.pathname == '/sirius_v'){
      content=SIRIUS;
    }else if(myURL.pathname == '/ron_v'){
      content=RON;
    }else if(myURL.pathname == '/voldemort_v'){
      content=VOLDEMORT;

    }else if(myURL.pathname == 'harry_v/cart'){

      console.log('harry');
    }else if(myURL.pathname == '/formulario.html'){
      if(user){
        content = LOGOUT;
        console.log('Ya estamos log');
      }else{
        content = FORMULARIO;
      }
    }else if(myURL.pathname == '/buscar'){
      tienda[0]["productos"].forEach((element, index)=>{
        console.log("Producto " + (index + 1) + ": " + element.nombre +
                    ", Stock: " + element.stock + ", Precio: " + element.precio 
                    + ", Descripcion: " + element.descripcion);
        productos_disp.push([element.nombre, element.descripcion, element.stock, 
                             element.precio, element.descripcion]);
        product_list.push(element.nombre);
      });
      console.log();
    }else if(myURL.pathname == '/procesar'){

      content_type = "text/html";

      let html_extra = "";
      
      if (nombre=="Hermione" & pwd == "1234"){
        html_extra = "<h2>Welcome back Hermione</h2>";
        res.setHeader('Set-Cookie', "user="+ nombre);
        content = RESPUESTA.replace("HTML_EXTRA", html_extra);
      }else if(nombre=="Voldemort" & pwd == "6789")  {
         html_extra = "<h2>Welcome back  who shall not be named </h2>";
         res.setHeader('Set-Cookie', "user="+ nombre);
         content = RESPUESTA.replace("HTML_EXTRA", html_extra);
      }else{
        content=FORMERROR;

      }
    }else if(myURL.pathname == '/cart') {
      let empty = "";
      content=CART;
        content = content.replace("EMPTY", cart);
  
    }else if(myURL.pathname == '/cart_harry'){
      content = HARRY;
      if(user==null){
        content = FORMULARIO; 
      }else{
        if (shopcart == "") {
          shopcart = "cart=harrys-wand";
          res.setHeader('Set-Cookie', shopcart);
        }else{
          shopcart = shopcart + ",harrys-wand";
          res.setHeader('Set-Cookie', shopcart);
        }
      }

    }else if(myURL.pathname == '/cart_hermione'){
      content = HERMIONE;
      if(user==null){
        content = FORMULARIO; 
      }else{
        if (shopcart == "") {
          shopcart = "cart=hermiones-wand";
          res.setHeader('Set-Cookie', shopcart);
        }else{
          shopcart = shopcart + ",hermiones-wand";
          res.setHeader('Set-Cookie', shopcart);
        }
      }
    }else if(myURL.pathname == '/cart_dumbledore'){
      content = DUMBLEDORE;
      if(user==null){
        content = FORMULARIO; 
      }else{
      if (shopcart == "") {
        shopcart = "cart=dumbledores-wand";
        res.setHeader('Set-Cookie', shopcart);
      }else{
        shopcart = shopcart + ",dumbledores-wand";
        res.setHeader('Set-Cookie', shopcart);
      }
    }
    }else if(myURL.pathname == '/cart_voldemort'){
      content = VOLDEMORT;
      if(user==null){
        content = FORMULARIO; 
      }else{
        if (shopcart == "") {
          shopcart = "cart=voldemorts-wand";
          res.setHeader('Set-Cookie', shopcart);
        }else{
          shopcart = shopcart + ",voldemorts-wand";
          res.setHeader('Set-Cookie', shopcart);
        }
      }
    }else if(myURL.pathname == '/cart_sirius'){
      content = SIRIUS;
      if(user==null){
        content = FORMULARIO; 
      }else{
        if (shopcart == "") {
          shopcart = "cart=sirius-wand";
          res.setHeader('Set-Cookie', shopcart);
        }else{
          shopcart = shopcart + ",sirius-wand";
          res.setHeader('Set-Cookie', shopcart);
        }
      }
    }else if(myURL.pathname == '/cart_ron'){
      content = RON;
      if(user==null){
        content = FORMULARIO; 
      }else{
        if (shopcart == "") {
          shopcart = "cart=ronss-wand";
          res.setHeader('Set-Cookie', shopcart);
        }else{
          shopcart = shopcart + ",rons-wand";
          res.setHeader('Set-Cookie', shopcart);
        }
      }
    }else if(myURL.pathname == '/productos'){
          console.log("Peticion de Productos!")
          content_type = mime["json"];

        //-- Leer los parámetros
        let param1 = myURL.searchParams.get('param1');

        //-- Convertimos los caracteres alphanumericos en string
        param1 = param1.toUpperCase();

        console.log("  Param: " +  param1);

        //-- Se construye nuevo Array de resultado de busquedas
        let result = [];

        //-- Para ello
        //-- Recorremos todos los productos de la base de datos
        //-- Y los que cuadren, se añaden al array
        for (let prod of productos) {
            //-- Pasar a mayúsculas
            prodU = prod.toUpperCase();

            //-- Si el producto comienza por lo indicado en el parametro
            //-- meter este producto en el array de resultados
            if (prodU.startsWith(param1)) {
                result.push(prod);
                busqueda = prod;
            }
        }
        //-- Imprimimos el aray de resultado de busquedas
        console.log(result);
        busqueda = result;
        //-- Pasamos el resultado a formato JSON con stringify
        content = JSON.stringify(result);
        return
    }else if(myURL.pathname == '/search'){
      if (busqueda[0] == 'Harrys Wand') {
        content = HARRY;
        busqueda = "";

      }else if(busqueda[0] == 'Hermiones Wand'){
        content = HERMIONE;
        busqueda = "";
      }else if(busqueda[0] == 'Dumbledores Wand'){

        content = DUMBLEDORE;
        busqueda = "";
      }else if(busqueda[0] == 'Voldemorts Wand'){

        content = VOLDEMORT;
        busqueda = "";
      }else if(busqueda[0] == 'Sirius Wand'){

        content = SIRIUS;
        busqueda = "";
      }else if(busqueda[0] == 'Rons Wand'){

        content = RON;
        busqueda = "";
      }else{
        content = MAIN;
        content = MAIN.replace("HTML_EXTRA", `<i class="fas fa-user-check"></i>` + user + "</p>");
        busqueda = "";
      }

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
    res.setHeader('Content-Type', 'content_type');
    res.write(content);
    res.end;


});


server.listen(PUERTO);

console.log("Server On. Listening in port: " + PUERTO);