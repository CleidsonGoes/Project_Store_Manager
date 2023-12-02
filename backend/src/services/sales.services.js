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

const createSale = async (sale) => {
  if (!sale.name) {
    return { status: 400, message: { message: '"name" is required' } };
  }
  // const validateProduct = productSchema.validate(product);
  // console.log(validateProduct);
  // if (validateProduct.error) {
  //   return {
  //     status: 422, message: { message: '"name" length must be at least 5 characters long' } };
  // }
  const insertSale = await salesModel.createSale(sale);
  return { status: 201, message: { id: insertSale.insertId, name: sale.name } };
};

module.exports = {
  getAllSalesServices,
  getByIdSalesServices,
  createSale,
};