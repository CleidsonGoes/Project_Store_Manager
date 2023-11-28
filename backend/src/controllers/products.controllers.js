const productsServices = require('../services/products.services');

const getAllProductsServices = async (req, res) => {
  const allProducts = await productsServices.getAllProductsServices();
  return res.status(200).json(allProducts);
};

module.exports = {
  getAllProductsServices,
};