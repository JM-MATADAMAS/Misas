const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Lista de tablas válidas para evitar inyecciones SQL
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

// Endpoint genérico para obtener cantos
router.get('/todos/:tipo', async (req, res) => {
  const { tipo } = req.params;

  // Validar que el tipo sea válido
  if (!tablasValidas[tipo]) {
    return res.status(400).json({ error: 'Tipo de canto no válido' });
  }

  try {
    const tabla = tablasValidas[tipo];
    const columna = `ca_${tipo}`;
    const query = `SELECT ${columna} FROM ${tabla}`;
    const result = await connection.query(query);
    const datos = result.map((row) => row[columna]);
    res.json(datos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

// Endpoint genérico para insertar cantos
router.post('/insertar', async (req, res) => {
  const { tipo, nombre } = req.body;

  // Validar que el tipo sea válido
  if (!tablasValidas[tipo]) {
    return res.status(400).json({ error: 'Tipo de canto no válido' });
  }

  try {
    const tabla = tablasValidas[tipo];
    const columna = `ca_${tipo}`;

    // Verificar si el canto ya existe
    const existenciaQuery = `SELECT COUNT(*) as count FROM ${tabla} WHERE ${columna} = ?`;
    const existenciaResult = await connection.query(existenciaQuery, [nombre]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Insertar el nuevo canto
    const insercionQuery = `INSERT INTO ${tabla} (${columna}) VALUES (?)`;
    await connection.query(insercionQuery, [nombre]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

// Endpoint genérico para eliminar cantos
router.delete('/eliminar', async (req, res) => {
  const { tipo, nombre } = req.body;

  // Validar que el tipo sea válido
  if (!tablasValidas[tipo]) {
    return res.status(400).json({ error: 'Tipo de canto no válido' });
  }

  try {
    const tabla = tablasValidas[tipo];
    const columna = `ca_${tipo}`;

    // Verificar si el canto existe antes de eliminarlo
    const existenciaQuery = `SELECT COUNT(*) as count FROM ${tabla} WHERE ${columna} = ?`;
    const existenciaResult = await connection.query(existenciaQuery, [nombre]);

    if (existenciaResult[0].count === 0) {
      return res.status(404).json({ error: 'El canto no existe.' });
    }

    // Eliminar el canto
    const eliminacionQuery = `DELETE FROM ${tabla} WHERE ${columna} = ?`;
    await connection.query(eliminacionQuery, [nombre]);

    res.json({ mensaje: 'Canto eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

module.exports = router;