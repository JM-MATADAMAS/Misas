const mysql = require('mysql');
const {promisify} = require('util');
//Promisify es un modulo de promesas
//(Operaciones asicronas)

// Configurar la conexion a la base de datos

const connection = mysql.createPool({
    host:'localhost',
    user: 'user',
    password: 'password123',
    database: 'coro_db'
});

connection.getConnection(
    (err, conn) => {
    if(err){
        console.log('No se pudo conectar a la base de datos');
    }
    if(conn){
        console.log('DB conectada!');
    } 
    return;
    }
);

connection.query = promisify(connection.query);
// El objeto query se refiere a cualquier operacion
// que hagamos sobre los datos
// INSERT, DELETE, UPDATE, SELECT
// AL envolverlo sobre promosify, indica
// que esas operaciones son promesa

module.exports = connection; // Exporta el objeto connection para usarlo
                                //desde otros archivos de codigo