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

module.exports = router;