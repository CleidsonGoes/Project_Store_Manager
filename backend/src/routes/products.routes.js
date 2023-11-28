const express = require('express');
const productsControllers = require('../controllers/products.controllers');

const productsRouter = express.Router();

productsRouter.get('/', productsControllers.getAllProductsController);
productsRouter.get('/:id', productsControllers.getByIdProductsController);
// productsRouter.post('/product'

module.exports = {
  productsRouter,
};