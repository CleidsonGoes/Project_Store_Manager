const { queryAllProducts } = require('../models/products.model');
const salesModel = require('../models/sales.models');

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
  console.log(result, 'log do result');
  const feedback = {
    id: result.id,
    itemsSold: [...sales],
  };
  return { status: 201, message: feedback };
};

const deleteSale = async (id) => {
  const byIdSales = await salesModel.getSalesById(id);
  if (!byIdSales) {
    return { status: 404, message: { message: 'Sale not found' } };
  }
  await salesModel.deleteSale(id);
  return { status: 204 };
};

module.exports = {
  getAllSalesServices,
  getByIdSalesServices,
  createSalesProducts,
  deleteSale,
};

// const products = await queryAllProducts();
// const allProduct = products.map((product) => product.id);
// console.log(allProduct, 'ids do produtos no BD');
// const result = await salesModel.createSalesProducts(sales);
// const idProductsCreated = result.itemsSold.map((productCreated) => productCreated.productId);
// console.log(idProductsCreated, 'ids dos produtos das vendas feitas');
// const verifyIdProduct = idProductsCreated.some((idProduct) => allProduct.includes(idProduct));
// console.log(verifyIdProduct, 'log para saber existência dos ids no BD');
// if (!verifyIdProduct) {
//   return { status: 400, message: { message: 'Product not found' } };
// }