const Contrato = require('../models/contratos');

module.exports.list = async () => {
  return await Contrato.find().exec();
};

module.exports.findById = id => {
  return Contrato.findOne({ _id: id }).exec();
};

module.exports.findByEntidade = entidade => {
  return Contrato.find({ "NIPC_entidade_comunicante": entidade }).exec();
};

module.exports.findByTipo = tipo => {
  return Contrato.find({ tipoprocedimento: tipo }).exec();
};

module.exports.listEntidades = async () => {
  return await Contrato.distinct("entidade_comunicante").sort();
};

module.exports.listTipos = async () => {
  return await Contrato.distinct("tipoprocedimento").sort();
};

module.exports.insert = contrato => {
  return Contrato.create(contrato);
};

module.exports.removeById = id => {
  return Contrato.deleteOne({ _id: id });
};

module.exports.update = (id, contrato) => {
  return Contrato.updateOne({ _id: id }, contrato);
};

module.exports.findByNIPC = async (nipc) => {
  const contratos = await Contrato.find({ NIPC_entidade_comunicante: nipc }).exec();
  const totalValor = contratos.reduce((total, c) => total + c.precoContratual, 0);
  const entidade = contratos.length > 0 ? contratos[0].entidade_comunicante : null;

  return {
    entidade: {
      NIPC_entidade_comunicante: nipc,
      entidade_comunicante: entidade
    },
    contratos,
    totalValor
  };
};

