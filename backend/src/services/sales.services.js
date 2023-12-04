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
  const result = await salesModel.createSalesProducts(sales);
  const { id } = result;
  const feedback = {
    id,
    itemsSold: [...sales],
  };
  return { status: 201, data: feedback };
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