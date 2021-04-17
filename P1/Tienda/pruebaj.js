const fs = require('fs');


fs.readdir("./pages", (error, files) => { 
    if(error){
        throw error
    }
    console.log("Finalizando lectura");
console.log(files);
});

console.log("iniciando lectura");

}else if(camino=='ls'){
    const vec = camino.split('.');
    fs.readdir("./pages", (error, files) => { 
      if(error){
          throw error
      }
    console.log("Finalizando lectura");
    console.log(files);
    res.writeHead(200, {'Content-Type': 'html'});
        res.write(files);
        res.end();
  });