// Importamos el cliente mysql2 con soporte para promesas
const mysql = require('mysql2/promise');

// Creamos un pool de conexiones para manejar múltiples peticiones
const pool = mysql.createPool({
    host: '127.0.0.1',          // Dirección del servidor MySQL
    user: 'user',            // Reemplaza con tu usuario válido
    password: 'password123',    // Reemplaza con tu contraseña real
    database: 'coro_db',        // Nombre de la base de datos
    waitForConnections: true,   // Esperar cuando todas las conexiones están ocupadas
    connectionLimit: 10,        // Número máximo de conexiones activas
    queueLimit: 0               // Número máximo de peticiones en cola (0 = sin límite)
});

// Probamos la conexión una vez al cargar el módulo
(async () => {
    try {
        const connection = await pool.getConnection(); // Obtener una conexión del pool
        console.log('✅ Conectado a la base de datos correctamente');
        connection.release(); // Liberar la conexión de vuelta al pool
    } catch (err) {
        console.error('❌ No se pudo conectar a la base de datos');
        console.error(err);
    }
})();

// Exportamos el pool para usarlo en otros archivos
module.exports = pool;
