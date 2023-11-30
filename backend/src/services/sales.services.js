const salesModel = require('../models/sales.models');

const getAllSalesServices = async () => {
  const allSales = await salesModel.getAllSales();
  return { status: 200, message: allSales };
};

const getByIdSalesServices = async (id) => {
  const byIdSales = await salesModel.getSalesById(id);
  if (!byIdSales) {
    return { status: 404, message: { message: 'Sale not found' } };
  }
  return { status: 200, message: byIdSales };
};

module.exports = {
  getAllSalesServices,
  getByIdSalesServices,
};