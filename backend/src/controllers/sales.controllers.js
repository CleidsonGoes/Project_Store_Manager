const salesServices = require('../services/sales.services');

const getAllSalesController = async (req, res) => {
  const { status, message } = await salesServices.getAllSalesServices();
  return res.status(status).json(message);
};

const getByIdSalesController = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesServices.getByIdSalesServices(id);
  return res.status(status).json(message);
};

module.exports = {
  getAllSalesController,
  getByIdSalesController,
};