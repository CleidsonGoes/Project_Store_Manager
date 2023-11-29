const productsModel = require('../models/products.model');

const getAllProductsServices = async () => {
  const allProducts = await productsModel.queryAllProducts();
  return { status: 200, message: allProducts };
};

const getByIdProductsServices = async (id) => {
  const byIdProduct = await productsModel.queryProductById(id);
  if (!byIdProduct) {
    return { status: 404, message: { message: 'Product not found' } };
  }
  return { status: 200, message: byIdProduct };
};

module.exports = {
  getAllProductsServices,
  getByIdProductsServices,
};