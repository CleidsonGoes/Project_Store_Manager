const productsModel = require('../models/products.model');

const getAllProductsModel = async () => {
  const allProducts = await productsModel.queryAllProducts();
  return { status: 'SUCESS', data: allProducts };
};

module.exports = {
  getAllProductsModel,
};