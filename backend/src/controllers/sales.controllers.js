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

const createSale = async (req, res) => {
  const sales = req.body;
  const insertSale = await salesServices.createSalesProducts(sales);
  const { status, message } = insertSale;
  return res.status(status).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const delSale = await salesServices.deleteSale(id);
  const { status, message } = delSale;
  return res.status(status).json(message);
};

module.exports = {
  getAllSalesController,
  getByIdSalesController,
  createSale,
  deleteSale,
};