var express = require('express');
var router = express.Router();
var axios = require('axios');

const api = 'http://teste-backend-1:16000';

router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get(`${api}/contratos`);
    res.render('index', { contratos: response.data });
  } catch (error) {
    next(error);
  }
});

router.get('/contratos/:id', async (req, res, next) => {
  try {
    const response = await axios.get(`${api}/contratos/${req.params.id}`);
    res.render('contrato', { contrato: response.data });
  } catch (error) {
    next(error);
  }
});

router.get('/entidades/:nipc', async (req, res, next) => {
  try {
    const contratosResponse = await axios.get(`${api}/contratos?entidade=${req.params.nipc}`);
    const contratos = contratosResponse.data;
    
    const entidade = contratos.length > 0 ? contratos[0] : null;
    const totalValor = contratos.reduce((total, c) => total + c.precoContratual, 0);
    
    if (entidade) {
      res.render('entidade', {
        entidade: {
          NIPC_entidade_comunicante: req.params.nipc,
          entidade_comunicante: entidade.entidade_comunicante
        },
        contratos,
        totalValor
      });
    } else {
      res.status(404).send('Entidade not found');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
