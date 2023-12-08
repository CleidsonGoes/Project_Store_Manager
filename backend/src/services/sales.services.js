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

const updateQuantitySale = async (productId, quantity, saleId) => {
  if (quantity <= 0) {
    return { status: 422, message: { message: '"quantity" must be greater than or equal to 1' } };
  }
  if (!quantity) {
    return { status: 400, message: { message: '"quantity" is required' } };
  }
  const productExist = await productModel.queryProductById(productId);
  if (!productExist) {
    return { status: 404, message: { message: 'Product not found in sale' } };
  }
  const saleExist = await salesModel.getSalesById(saleId);
  console.log(saleExist, 'log da venda pega por ID');
  if (!saleExist.length) {
    return { status: 404, message: { message: 'Sale not found' } };
  }
  const affectedRows = await salesModel.queryUpdateQuantityProduct(productId, quantity);
  return { status: 200, message: affectedRows };
};

module.exports = {
  getAllSalesServices,
  getByIdSalesServices,
  createSalesProducts,
  deleteSale,
  updateQuantitySale,
};