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
  if (!product.name) {
    return { status: 400, message: { message: '"name" is required' } };
  }
  const validateProduct = productSchema.validate(product);
  console.log(validateProduct);
  if (validateProduct.error) {
    return {
      status: 422, message: { message: '"name" length must be at least 5 characters long' } };
  }
  const insertProduct = await productsModel.createProduct(product);
  return { status: 201, message: { id: insertProduct.insertId, name: product.name } };
};

module.exports = {
  getAllProductsServices,
  getByIdProductsServices,
  createProduct,
};