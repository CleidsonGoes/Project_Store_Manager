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
  if (validateProduct.error) {
    return {
      status: 422, message: { message: '"name" length must be at least 5 characters long' } };
  }
  const insertProduct = await productsModel.createProduct(product);
  return { status: 201, message: { id: insertProduct.insertId, name: product.name } };
};

const updateProduct = async (product) => {
  if (!product.name) {
    return { status: 400, message: { message: '"name" is required' } };
  }
  const validateProduct = productSchema.validate(product);
  if (validateProduct.error) {
    return {
      status: 422, message: { message: '"name" length must be at least 5 characters long' } };
  }
  const updateProd = await productsModel.updateProduct(product);
  return { status: 201, message: { id: updateProd.insertId, name: product.name } };
};

const deleteProduct = async (id) => {
  const byIdProduct = await productsModel.queryProductById(id);
  if (!byIdProduct) {
    return { status: 404, message: { message: 'Product not found' } };
  }
  await productsModel.deleteProduct(id);
  return { status: 204 };
};

module.exports = {
  getAllProductsServices,
  getByIdProductsServices,
  createProduct,
  updateProduct,
  deleteProduct,
};