const express = require('express');
const router = express.Router(); // Manejador de rutas
const connection = require('../connection');

router.get('/todos_entrada', async (req, res) => {
  try {
    const query = 'SELECT ca_entrada FROM canto_entrada';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_entrada);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_piedad', async (req, res) => {
  try {
    const query = 'SELECT ca_piedad FROM canto_piedad';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_piedad);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_gloria', async (req, res) => {
  try {
    const query = 'SELECT ca_gloria FROM canto_gloria';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_gloria);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_salmo', async (req, res) => {
  try {
    const query = 'SELECT ca_salmo FROM canto_salmo';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_salmo);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_aleluya', async (req, res) => {
  try {
    const query = 'SELECT ca_aleluya FROM canto_aleluya';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_aleluya);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_ofertorio', async (req, res) => {
  try {
    const query = 'SELECT ca_ofertorio FROM canto_ofertorio';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_ofertorio);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_santo', async (req, res) => {
  try {
    const query = 'SELECT ca_santo FROM canto_santo';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_santo);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_cordero', async (req, res) => {
  try {
    const query = 'SELECT ca_cordero FROM canto_cordero';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_cordero);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_comunion', async (req, res) => {
  try {
    const query = 'SELECT ca_comunion FROM canto_comunion';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_comunion);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_salida', async (req, res) => {
  try {
    const query = 'SELECT ca_salida FROM canto_salida';
    const result = await connection.query(query);
    const datos = result.map((row) => row.ca_salida);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.get('/todos_comentario', async (req, res) => {
  try {
    const query = 'SELECT mi_comentario FROM misa';
    const result = await connection.query(query);
    const datos = result.map((row) => row.mi_comentario);
    res.json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.post('/insertar_entrada', async (req, res) => {
  try {
    const { ca_entrada } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_entrada ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_entrada WHERE ca_entrada = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_entrada]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_entrada (ca_entrada) VALUES (?)';
    await connection.query(insercionQuery, [ca_entrada]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/insertar_salmo', async (req, res) => {
  try {
    const { ca_salmo } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_salmo ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_salmo WHERE ca_salmo = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_salmo]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_salmo (ca_salmo) VALUES (?)';
    await connection.query(insercionQuery, [ca_salmo]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/insertar_piedad', async (req, res) => {
  try {
    const { ca_piedad } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_piedad ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_piedad WHERE ca_piedad = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_piedad]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_piedad (ca_piedad) VALUES (?)';
    await connection.query(insercionQuery, [ca_piedad]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/insertar_gloria', async (req, res) => {
  try {
    const { ca_gloria } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_gloria ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_gloria WHERE ca_gloria = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_gloria]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_gloria (ca_gloria) VALUES (?)';
    await connection.query(insercionQuery, [ca_gloria]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/insertar_ofertorio', async (req, res) => {
  try {
    const { ca_ofertorio } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_ofertorio ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_ofertorio WHERE ca_ofertorio = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_ofertorio]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_ofertorio (ca_ofertorio) VALUES (?)';
    await connection.query(insercionQuery, [ca_ofertorio]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/insertar_santo', async (req, res) => {
  try {
    const { ca_santo } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_santo ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_santo WHERE ca_santo = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_santo]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_santo (ca_santo) VALUES (?)';
    await connection.query(insercionQuery, [ca_santo]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/insertar_cordero', async (req, res) => {
  try {
    const { ca_cordero } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_cordero ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_cordero WHERE ca_cordero = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_cordero]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_cordero (ca_cordero) VALUES (?)';
    await connection.query(insercionQuery, [ca_cordero]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/insertar_comunion', async (req, res) => {
  try {
    const { ca_comunion } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_comunion ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_comunion WHERE ca_comunion = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_comunion]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_comunion (ca_comunion) VALUES (?)';
    await connection.query(insercionQuery, [ca_comunion]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.post('/insertar_salida', async (req, res) => {
  try {
    const { ca_salida } = req.body; // Suponiendo que los datos del nuevo canto se pasan en el cuerpo de la solicitud

    // Verifica si ca_salida ya existe en la base de datos antes de insertar (para evitar duplicados)
    const existenciaQuery = 'SELECT COUNT(*) as count FROM canto_salida WHERE ca_salida = ?';
    const existenciaResult = await connection.query(existenciaQuery, [ca_salida]);

    if (existenciaResult[0].count > 0) {
      return res.status(400).json({ error: 'El canto ya existe.' });
    }

    // Si no existe, procede con la inserción
    const insercionQuery = 'INSERT INTO canto_salida (ca_salida) VALUES (?)';
    await connection.query(insercionQuery, [ca_salida]);

    res.json({ mensaje: 'Canto insertado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

module.exports = router;