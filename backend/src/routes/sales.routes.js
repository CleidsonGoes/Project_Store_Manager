const express = require('express');
const salesControllers = require('../controllers/sales.controllers');

const salesRouter = express.Router();

salesRouter.get('/', salesControllers.getAllSalesController);
salesRouter.get('/:id', salesControllers.getByIdSalesController);
// productsRouter.post('/product'

module.exports = salesRouter;