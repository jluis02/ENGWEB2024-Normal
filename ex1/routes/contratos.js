var express = require('express');
var router = express.Router();
var contratoController = require('../controllers/contratos');

router.get('/', async (req, res) => {
  if (req.query.entidade) {
    res.json(await contratoController.findByEntidade(req.query.entidade));
  } else if (req.query.tipo) {
    res.json(await contratoController.findByTipo(req.query.tipo));
  } else {
    res.json(await contratoController.list());
  }
});

router.get('/entidades', async (req, res) => {
  res.json(await contratoController.listEntidades());
});

router.get('/entidades/:nipc', async (req, res) => {
  res.json(await contratoController.findByNIPC(req.params.nipc));
});

router.get('/tipos', async (req, res) => {
  res.json(await contratoController.listTipos());
});

router.get('/:id', async (req, res) => {
  res.json(await contratoController.findById(req.params.id));
});

router.post('/', async (req, res) => {
  res.json(await contratoController.insert(req.body));
});

router.delete('/:id', async (req, res) => {
  res.json(await contratoController.removeById(req.params.id));
});

router.put('/:id', async (req, res) => {
  res.json(await contratoController.update(req.params.id, req.body));
});

module.exports = router;
