const productsServices = require('../services/products.services');

const getAllProductsController = async (req, res) => {
  const allProducts = await productsServices.getAllProductsServices();
  return res.status(200).json(allProducts);
};

const getByIdProductsController = async (req, res) => {
  const { id } = req.params;
  const byIdProduct = await productsServices.getByIdProductsServices(id);
  return res.status(200).json(byIdProduct);
};

module.exports = {
  getAllProductsController,
  getByIdProductsController,
};