const { productSchema } = require('../../tests/unit/services/validations/schemas');
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

const createProduct = async (product) => {
  const validateProduct = productSchema.validate(product);
  if (validateProduct.error) {
    return { status: 422, message: '"name" length must be at least 5 characters long' };
  }
  if (!product.name) {
    return { status: 400, message: '"name" is required' };
  }
  const insertProduct = productsModel.createProduct(product);
  return { status: 201, message: insertProduct };
};

module.exports = {
  getAllProductsServices,
  getByIdProductsServices,
  createProduct,
};