
  //Con estas lineas creamos la aplicación Koa
const app = require('koa')(); // Solicita el framework koa
const router = require('koa-router')();
const db = require('./db.json'); //Solicita la base de datos donde se encuentra la informacion de los threads

// Define una función generadora, que devuelve un objeto Generator.
app.use(function *(next){
  const start = new Date;
  yield next;//La palabra clave yield se usa para pausar y reanudar una función generadora
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// RECUPERAMOS LA INFORMACION 

router.get('/api/threads', function *() { // Esta ruta nos mostrata todos los threads
  this.body = db.threads;
});

router.get('/api/threads/:threadId', function *() {
  const id = parseInt(this.params.threadId);
  this.body = db.threads.find((thread) => thread.id == id); //Esto nos mostrará los threads y los threads por ID
});

// Metodo GET por ruta para enviar datos por URL
router.get('/api/', function *() {
  this.body = "API ready to receive requests";
});

router.get('/', function *() {
  this.body = "Ready to receive requests";
});


// Monta el middleware para todas las rutas de la aplicación, "Bloque de codigo que se ejecuta entre la peticion que hace el usuario(request) hasta que la peticion llega al servidor"


app.use(router.routes());
app.use(router.allowedMethods());

// De forma local utiliza el puerto 3000
app.listen(3000);

console.log('Worker started');
