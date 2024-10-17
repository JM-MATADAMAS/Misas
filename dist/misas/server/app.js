const express = require('express'); //Importamos el modulo o paquete como una clase
const app = express(); //Instanciamos el objeto para poder usarlo
const morgan = require('morgan');
const cors = require('cors');
const path = require('path'); // Esto ya esta instalado con nodejs
                              // Sirve para manejar las rutas de archivos
                              // de manera relativa.
                              // (para evitar escribir toda la ruta de los archivos)
//const history = require('connect-history-api-fallback');
// Se llama Middleware
app.use(cors());
// app.use(history()); // Si no se comenta aparecera el mensaje de Hola grupo de Sistemas de Administracción de Datos
// Y si se comenta aparecen los libros
app.use(morgan('tiny'));

// Configuracion rapida de Express
app.use(express.json()); // Decirle a express que use el formato JSON para las peticiones
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public'))); //__dirname constante del sistema

// Importar archivos de rutas
app.use ('/misa', require('./routes/misa'));
app.use ('/cantos',require('./routes/todos-cantos'));
app.use ('/usuarios',require('./routes/usuarios'));
// NOTAS

// Express es un framework/modulo/paquete para manejar peteciones
// del lado del servidor

// Vamos a construir una API REST
// La API REST basicamente funciona a traves de peticiones.
// El cliente le pide algo (request) a la API, ésta se la
// manda al servidor, el servidor la resuelve y la responde
// (response)

// Hay cuatro peticiones basicas
// - GET --> Recupera datos
// - POST --> Ingresa datos
// - PUT --> Modificar datos
// - DELETE --> Eliminar datos
// --> Operaciones CRUD

// Todas las peticiones envian informacion del cliente
// al servidor (dentro del request).
// Pero solo algunas modifican el estado de la BD
// (agregar, actualizar o eliminar datos)

// Ejemplo de peticion: Quiero todos los libros de un autor
// Enviar (request): El nombre del autor
// Recibir, resolver y responder (response): todos los libros solicitados

// La API esta en el servidor (bank - end). La BD puede
// estar en el mismo servidor de la API o en otro servidor

// NUestra API estara ejecutandose todo el tiempo en el servidor
// en espera de peticiones. Es como un servicio del S.O.
// Por tanto, tenemos que definir en que puerto estara escuchando

// Tenemos dos parametros
// - El primero es el numero de puerto en donde la API estara escuchando
// - El segundo es una funcion (call-back) que se ejecuta de inmediato
app.listen(3000, () => {
    console.log('API ejecutandose!');  // Salida a terminal
});

// Las peticiones se deben asociar con rutas dentro del servidor.
// de tal forma que se puedan direccionar de manera adecuada.

// Las rutas se construyen como un arbol a partir de la raiz 
// peticion_1 --> ruta_1
// peticion_1_1 --> ruta_1_1

// Nuestro servidor tendra una ruta raiz que estara asociada
// con el nombre de juestro dominio/sitio directamente.
//De manera interna en nuestro codigo, la ruta raiz se
// especifica con la diagonal /

//Como estamos trabajando en nuestra maquina, no tenemos 
// un dominio de internet. A esto se le llama localhost

// La ruta raiz de nuestro servidor local es:
// http://localhost:3000/

// 3000 es el puerto en el que la API esta escuchando

// Vamos a crear una peticion que pueda dirigir a esta ruta
// para responder.

// Peticion GET 
// La peticion recibe dos parametros
// - '/' es la ruta para la peticion
//        En este caso la ruta rai: localhost:3000/
// - Funcion para realizar algo con la peticion

// La funcion a su vez, toma dos parametros
// req:request --> Informacion que recibe la peticion 
//                  donde el cliente (p.ej. el nombre del autor)
//      res: response --> Lo nque devuelve el servidor al cliente
// como respuesta a su peticion
// (p.ej. Los libros del autor solicitado)
// En este ejemplo, todavia no mle pasamos informacion en el request
app.get('/', (req,res)=>{
    res.send('Hola mundo desde Express!');
});

// No estamos haciendo algo propiamente
// solo estamos respondiendo con un mensaje

app.get('/hola', (req, res) =>{
    res.send('Hola grupo de Sistemas de Administracción de Datos');
});
