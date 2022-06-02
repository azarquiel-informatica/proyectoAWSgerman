
  //Con estas lineas creamos la aplicación Koa
const app = require('koa')();// Solicita el framework koa
const router = require('koa-router')();
const db = require('./db.json'); //Solicita la base de datos donde se encuentra la informacion de los users

// Define una función generadora, que devuelve un objeto Generator.
app.use(function *(next){
  const start = new Date;
  yield next; //La palabra clave yield se usa para pausar y reanudar una función generadora
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});


// RECUPERAMOS LA INFORMACION 
router.get('/api/users', function *(next) { //Esto nos mostrará todos los users
  this.body = db.users;
});

router.get('/api/users/:userId', function *(next) { //Esto nos mostrará el usuario por ID
  const id = parseInt(this.params.userId);
  this.body = db.users.find((user) => user.id == id);
});

router.get('/api/', function *() {
  this.body = "API ready to receive requests";
});

router.get('/', function *() {
  this.body = "Ready to receive requests";
});
// Monta el middleware para todas las rutas de la aplicación, "Bloque de codigo que se ejecuta entre la peticion que hace el usuario(request) hasta que la peticion llega al servidor"

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000); // De forma local utiliza el puerto 3000

console.log('Worker started');
