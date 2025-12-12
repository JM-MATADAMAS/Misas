const express = require('express');
const router = express.Router();
const connection = require('../connection');
const bcrypt = require('bcrypt');

// Registrar nuevo usuario
router.post('/registrar_usuario', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const query = 'INSERT INTO usuario (correo, contrasena) VALUES (?, ?)';
        await connection.query(query, [correo, hashedPassword]);

        res.json('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar al usuario:', error);
        res.status(500).json({ error: 'Error al registrar' });
    }
});

// Obtener todos los usuarios (admin)
router.get('/admin', async (req, res) => {
    try {
        const query = 'SELECT * FROM usuario ORDER BY id_usuario;';
        const [admin] = await connection.query(query);
        res.json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// Obtener un solo usuario por correo
router.get('/un_usuario/:correo', async (req, res) => {
    try {
        const correo = req.params.correo;
        const query = 'SELECT id_usuario FROM usuario WHERE correo = ?';
        const [rows] = await connection.query(query, [correo]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// Iniciar sesión
router.post('/iniciar_sesion', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const query = 'SELECT * FROM usuario WHERE correo = ?';
        const [rows] = await connection.query(query, [correo]);

        if (rows.length === 0) {
            return res.status(401).json('Usuario no encontrado');
        }

        const usuario = rows[0];
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

        if (isMatch) {
            res.json(usuario);
        } else {
            res.status(401).json('Credenciales incorrectas');
        }
    } catch (error) {
        console.log('Error en iniciar_sesion:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Eliminar usuario por correo
router.delete('/eliminar_usuario/:correo', async (req, res) => {
    const correo = req.params.correo;
    try {
        const query = 'DELETE FROM usuario WHERE correo = ?';
        const [result] = await connection.query(query, [correo]);

        if (result.affectedRows > 0) {
            res.json('Usuario eliminado exitosamente');
        } else {
            res.status(404).json('Usuario no encontrado');
        }
    } catch (error) {
        console.log('Error en eliminar_usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

module.exports = router;
