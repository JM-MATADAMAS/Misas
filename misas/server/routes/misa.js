const express = require('express');
const router = express.Router(); // Manejador de rutas

const connection = require('../connection');

router.get('/misa_base', async (req, res) => {
  try {
    const query = 'SELECT * FROM misa ORDER BY mi_fecha;';
    const misa = await connection.query(query);

    // Formatear la fecha en cada objeto de misa
    const misaFormateada = misa.map((misaItem) => {
      const fecha = new Date(misaItem.mi_fecha);
      const fechaFormateada = fecha.toISOString().split('T')[0];
      return {
        ...misaItem,
        mi_fecha: fechaFormateada,
      };
    });

    res.json(misaFormateada);
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
});

router.get('/misabase/:mi_id', async (req, res) => {
  try {
    const mi_id = req.params.mi_id;
    const query = 'SELECT * FROM misa WHERE mi_id = ?';
    const misa = await connection.query(query, [mi_id]);

    // Verificar si se encontró un registro con el mi_id dado
    if (misa.length === 0) {
      return res.status(404).json({
        error: 'No se encontró el registro de misa con el mi_id especificado',
      });
    }

    // Formatear la fecha en el objeto de misa
    const fecha = new Date(misa[0].mi_fecha);
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const misaFormateada = {
      ...misa[0],
      mi_fecha: fechaFormateada,
    };

    res.json(misaFormateada);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Ocurrió un error en el servidor',
    });
  }
});

router.delete('/eliminar_misa', async (req, res) => {
  try {
    const mi_id = req.body.mi_id;
    const query = 'DELETE FROM misa WHERE mi_id = ?';
    const result = await connection.query(query, [mi_id]);
    res.json('Ok');
  } catch (error) {
    console.log(error);
    res.json({
      error: error
    });
  }
});

router.post('/nueva_misa', async (req, res) => {
  try {
    const query =
      'INSERT INTO misa (mi_fecha, mi_tipo, mi_entrada, mi_piedad, mi_gloria, mi_salmo, mi_aleluya, mi_ofertorio, mi_santo, mi_cordero, mi_comunion, mi_salida, mi_comentario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    await connection.query(query, [
      req.body.mi_fecha,
      req.body.mi_tipo,
      req.body.mi_entrada,
      req.body.mi_piedad,
      req.body.mi_gloria,
      req.body.mi_salmo,
      req.body.mi_aleluya,
      req.body.mi_ofertorio,
      req.body.mi_santo,
      req.body.mi_cordero,
      req.body.mi_comunion,
      req.body.mi_salida,
      req.body.mi_comentario,
    ]);
    res.json('Ok');
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
});

router.put('/editar_misa/:mi_id', async (req, res) => {
  try {
    const mi_id = req.params.mi_id;
    const body = req.body;
    const query = 'UPDATE misa SET ' +
                  'mi_fecha = ?, mi_tipo = ?, mi_entrada = ?, mi_piedad = ?, ' +
                  'mi_gloria = ?, mi_salmo = ?, mi_aleluya = ?, mi_ofertorio = ?, ' +
                  'mi_santo = ?, mi_cordero = ?, mi_comunion = ?, mi_salida = ?, mi_comentario = ? ' +
                  'WHERE mi_id = ?';

    await connection.query(query, [
      body.mi_fecha,
      body.mi_tipo,
      body.mi_entrada,
      body.mi_piedad,
      body.mi_gloria,
      body.mi_salmo,
      body.mi_aleluya,
      body.mi_ofertorio,
      body.mi_santo,
      body.mi_cordero,
      body.mi_comunion,
      body.mi_salida,
      body.mi_comentario,
      mi_id
    ]);
    res.json('Ok');
  } catch (error) {
    console.log(error);
    res.json({
      error: error
    });
  }
});

module.exports = router;