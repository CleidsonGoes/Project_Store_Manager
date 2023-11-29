const productsServices = require('../services/products.services');

const getAllProductsController = async (req, res) => {
  const { status, message } = await productsServices.getAllProductsServices();
  return res.status(status).json(message);
};

const getByIdProductsController = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsServices.getByIdProductsServices(id);
  return res.status(status).json(message);
};

module.exports = {
  getAllProductsController,
  getByIdProductsController,
};