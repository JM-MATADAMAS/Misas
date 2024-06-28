const express = require('express');
const router = express.Router();
const connection = require('../connection');

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
        const query = 'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?';
        connection.query(query, [correo, contrasena], (error, results) => {
            if (error) {
                console.error('Error al obtener el usuario:', error);
                res.status(500).json('Error al iniciar sesión');
            } else {
                if (results.length > 0) {
                    const usuario = results[0];
                    res.json(usuario);
                } else {
                    res.json(null);
                }
            }
        });
        
    } catch (error) {
        console.log('Error en iniciar_sesion:', error);
        res.json({
            error: error
        });
    }
});


module.exports = router;