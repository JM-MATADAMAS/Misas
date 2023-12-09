const express = require('express');
const router = express.Router();
const connection = require('../connection');
const bcrypt = require('bcrypt'); // Importar la librería bcrypt para el hashing de contraseñas

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

router.post('/iniciar_sesion', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        // Consulta SQL para buscar al usuario por correo
        const query = 'SELECT * FROM usuario WHERE correo = ?';
        const result = await connection.query(query, [correo]);

        if (result.length === 0) {
            // Si no se encuentra un usuario con el correo proporcionado, devolver error
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Comparar la contraseña ingresada con el hash almacenado en la base de datos
        const usuario = result[0];
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!contrasenaValida) {
            // Si la contraseña no es válida, devolver error
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Enviar una respuesta exitosa
        res.status(200).json({
            id_usuario: usuario.id_usuario,
            correo: usuario.correo,
            mensaje: 'Inicio de sesión exitoso',
        });
    } catch (error) {
        console.log('Error en iniciar_sesion:', error);
        res.status(500).json({
            error: 'Ocurrió un error en el servidor',
        });
    }
});

module.exports = router;