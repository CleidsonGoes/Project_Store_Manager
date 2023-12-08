const { queryAllProducts } = require('../models/products.model');
const salesModel = require('../models/sales.models');
const productModel = require('../models/products.model');

const getAllSalesServices = async () => {
  const allSales = await salesModel.getAllSales();
  return { status: 200, message: allSales };
};

const getByIdSalesServices = async (id) => {
  const byIdSales = await salesModel.getSalesById(id);
  if (!byIdSales.length) {
    return { status: 404, message: { message: 'Sale not found' } };
  }
  return { status: 200, message: byIdSales };
};

const createSalesProducts = async (sales) => {
  const idProductsCreated = sales.map((sale) => sale.productId);
  // console.log(idProductsCreated, 'log dos ids parametro sales');
  const products = await queryAllProducts();
  const allProduct = products.map((product) => product.id);
  // console.log(allProduct, 'ids do produtos no BD');
  const verifyIdProduct = idProductsCreated.every((idProduct) => allProduct.includes(idProduct));
  // console.log(verifyIdProduct, 'confirmação se os IDs dos produtos req. estão presentes no BD');
  if (!verifyIdProduct) {
    return { status: 404, message: { message: 'Product not found' } };
  }
  const result = await salesModel.createSalesProducts(sales);
  // console.log(result, 'log do result');
  const feedback = {
    id: result.id,
    itemsSold: [...sales],
  };
  return { status: 201, message: feedback };
};

const deleteSale = async (id) => {
  const byIdSales = await salesModel.getSalesById(id);
  if (byIdSales.length === 0) {
    return { status: 404, message: { message: 'Sale not found' } };
  }
  await salesModel.deleteSale(id);
  return { status: 204 };
};

const updateQuantitySale = async (productId, quantity) => {
  const productExist = await productModel.queryProductById(productId);
  if (!productExist) {
    return { status: 404, message: { message: 'Product not found' } };
  }
  // if (!product.name) {
  //   return { status: 400, message: { message: '"name" is required' } };
  // }
  // const validateProduct = productSchema.validate(product);
  // if (validateProduct.error) {
  //   return {
  //     status: 422, message: { message: '"name" length must be at least 5 characters long' } };
  // }
  await salesModel.queryUpdateQuantityProduct(productId, quantity);
  return { status: 200, message: { id: productId, name: quantity } };
};

module.exports = {
  getAllSalesServices,
  getByIdSalesServices,
  createSalesProducts,
  deleteSale,
  updateQuantitySale,
};