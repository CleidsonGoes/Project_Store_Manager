const productsServices = require('../services/products.services');

const getAllProductsServices = async () => {
  const allProducts = await productsServices.getAllProductsServices();
  return { status: 'SUCESS', data: allProducts };
};

module.exports = {
  getAllProductsServices,
};