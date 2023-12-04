const express = require('express');
const salesControllers = require('../controllers/sales.controllers');

const salesRouter = express.Router();

salesRouter.get('/', salesControllers.getAllSalesController);
salesRouter.get('/:id', salesControllers.getByIdSalesController);
salesRouter.post('/', salesControllers.createSale);
salesRouter.delete('/:id', salesControllers.deleteSale);

module.exports = salesRouter;