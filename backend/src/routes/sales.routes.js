const express = require('express');
const salesControllers = require('../controllers/sales.controllers');
const { notFoundFieldProductId, notFoundFieldQuantity, fieldQuantityEqualZero,
} = require('../middlewares/sales.middlewares');

const salesRouter = express.Router();

salesRouter.get('/', salesControllers.getAllSalesController);
salesRouter.get('/:id', salesControllers.getByIdSalesController);
salesRouter.post(
  '/', 
  notFoundFieldProductId, 
  notFoundFieldQuantity,
  fieldQuantityEqualZero, 
  salesControllers.createSale,
);
salesRouter.delete('/:id', salesControllers.deleteSale);

module.exports = salesRouter;