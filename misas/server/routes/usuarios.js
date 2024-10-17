const express = require('express');
const router = express.Router();
const connection = require('../connection');
const bcrypt = require('bcrypt');

router.post('/registrar_usuario', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        // Genera un hash para la contraseña antes de guardarla
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        
        // Luego guarda el correo y la contraseña cifrada en la base de datos
        const query = 'INSERT INTO usuario (correo, contrasena) VALUES (?, ?)';
        connection.query(query, [correo, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error al registrar al usuario:', error);
                res.status(500).json('Error al registrar');
            } else {
                res.json('Usuario registrado exitosamente');
            }
        });
    } catch (error) {
        console.log('Error en registrar_usuario:', error);
        res.json({
            error: error
        });
    }
});


// Ruta para iniciar sesión

router.get('/admin', async (req, res) => {
    try {
        const query = 'SELECT * FROM usuario ORDER BY id_usuario;';
        const admin = await connection.query(query);
        res.json(admin);
    } catch (error) {
        console.log(error);
        res.json({
        error: error,
        });
    }
});

router.get('/un_usuario/:correo', async (req,res) =>{
    try{
        const correo = req.params.correo;
        const query = 'SELECT id_usuario FROM coro_db.usuario WHERE correo = ?';
        const id_usuario = await connection.query(query,[correo]);
        res.json (id_usuario);
    } catch (error) {
        console.log(error);
        res.json ({error: error});
    }
});

router.post('/iniciar_sesion', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        // Consulta SQL para buscar al usuario por correo
        const query = 'SELECT * FROM usuario WHERE correo = ?';
        connection.query(query, [correo], async (error, results) => {
            if (error) {
                console.error('Error al obtener el usuario:', error);
                res.status(500).json('Error al iniciar sesión');
            } else {
                if (results.length > 0) {
                    const usuario = results[0];

                    // Compara la contraseña ingresada con la contraseña cifrada
                    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

                    if (isMatch) {
                        res.json(usuario);  // Contraseña correcta
                    } else {
                        res.status(401).json('Credenciales incorrectas');  // Contraseña incorrecta
                    }
                } else {
                    res.status(401).json('Usuario no encontrado');
                }
            }
        });
    } catch (error) {
        console.log('Error en iniciar_sesion:', error);
        res.status(500).json({
            error: error
        });
    }
});

router.delete('/eliminar_usuario/:correo', async (req, res) => {
    const correo = req.params.correo;
    try {
        // Consulta SQL para eliminar al usuario por correo
        const query = 'DELETE FROM usuario WHERE correo = ?';
        connection.query(query, [correo], (error, results) => {
            if (error) {
                console.error('Error al eliminar al usuario:', error);
                res.status(500).json('Error al eliminar el usuario');
            } else {
                if (results.affectedRows > 0) {
                    res.json('Usuario eliminado exitosamente');
                } else {
                    res.status(404).json('Usuario no encontrado');
                }
            }
        });
    } catch (error) {
        console.log('Error en eliminar_usuario:', error);
        res.status(500).json({
            error: error
        });
    }
});

module.exports = router;