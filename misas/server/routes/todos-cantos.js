const express = require('express');
const router = express.Router();
const connection = require('../connection'); // Tu archivo connection.js con mysql2/promise

const tablasValidas = {
  entrada: 'canto_entrada',
  piedad: 'canto_piedad',
  gloria: 'canto_gloria',
  salmo: 'canto_salmo',
  aleluya: 'canto_aleluya',
  ofertorio: 'canto_ofertorio',
  santo: 'canto_santo',
  cordero: 'canto_cordero',
  comunion: 'canto_comunion',
  salida: 'canto_salida',
};

// Endpoint genérico para obtener cantos por tipo
router.get('/todos/:tipo', async (req, res) => {
  const { tipo } = req.params;

  // Validación del tipo recibido
  if (!tablasValidas[tipo]) {
    return res.status(400).json({ error: 'Tipo de canto no válido' });
  }

  try {
    const tabla = tablasValidas[tipo];
    const columna = `ca_${tipo}`;
    const query = `SELECT ${columna} FROM ${tabla}`;

    // Ejecutar la consulta
    const [rows] = await connection.query(query);

    // Extraer los valores de la columna correspondiente
    const datos = rows.map((row) => row[columna]);

    res.json(datos);
  } catch (error) {
    console.error('Error al obtener cantos:', error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

// POST insertar canto
router.post('/insertar', async (req, res) => {
  const { tipo, nombre } = req.body;

  if (!tablasValidas[tipo]) {
    return res.status(400).json({ error: 'Tipo de canto no válido' });
  }

  try {
    const tabla = tablasValidas[tipo];
    const columna = `ca_${tipo}`;

    const existenciaQuery = `SELECT COUNT(*) as count FROM ${tabla} WHERE ${columna} = ?`;
    const [existenciaRows] = await connection.query(existenciaQuery, [nombre]);

    if (existenciaRows[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    const insercionQuery = `INSERT INTO ${tabla} (${columna}) VALUES (?)`;
    await connection.query(insercionQuery, [nombre]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

// DELETE eliminar canto
router.delete('/eliminar', async (req, res) => {
  const { tipo, nombre } = req.body;

  if (!tablasValidas[tipo]) {
    return res.status(400).json({ error: 'Tipo de canto no válido' });
  }

  try {
    const tabla = tablasValidas[tipo];
    const columna = `ca_${tipo}`;

    const existenciaQuery = `SELECT COUNT(*) as count FROM ${tabla} WHERE ${columna} = ?`;
    const [existenciaRows] = await connection.query(existenciaQuery, [nombre]);

    if (existenciaRows[0].count === 0) {
      return res.status(404).json({ error: 'El canto no existe.' });
    }

    const eliminacionQuery = `DELETE FROM ${tabla} WHERE ${columna} = ?`;
    await connection.query(eliminacionQuery, [nombre]);

    res.json({ mensaje: 'Canto eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});


module.exports = router;