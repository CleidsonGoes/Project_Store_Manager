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

const createProduct = async (req, res) => {
  const product = req.body;
  const insertProduct = await productsServices.createProduct(product);
  const { status, message } = insertProduct;
  return res.status(status).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const updateProd = await productsServices.updateProduct(id, product);
  const { status, message } = updateProd;
  return res.status(status).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const delProduct = await productsServices.deleteProduct(id);
  const { status, message } = delProduct;
  return res.status(status).json(message);
};

module.exports = {
  getAllProductsController,
  getByIdProductsController,
  createProduct,
  updateProduct,
  deleteProduct,
};