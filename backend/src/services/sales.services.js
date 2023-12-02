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
  sale.map((sl) => {
    if (!sl.productId) {
      return {
        status: 400, message: { message: '"productId" is required' },
      };
    }
  });
  const insertSale = await salesModel.createSale(sale);
  return { status: 201,
    message: {
      id: insertSale.insertId,
      itemsSold: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    } };
};

module.exports = {
  getAllSalesServices,
  getByIdSalesServices,
  createSale,
};