const productsModel = require('../models/products.model');

const getAllProductsServices = async () => {
  const allProducts = await productsModel.queryAllProducts();
  return { type: null, message: allProducts, status: 200 };
};

const getByIdProductsServices = async (id) => {
  const byIdProduct = await productsModel.queryProductById(id);
  return { status: 'SUCESS', data: byIdProduct };
};

module.exports = {
  getAllProductsServices,
  getByIdProductsServices,
};