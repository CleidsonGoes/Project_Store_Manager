const express = require('express');
const productsControllers = require('../controllers/products.controllers');

const productsRouter = express.Router();

productsRouter.get('/', productsControllers.getAllProductsServices);

module.exports = {
  productsRouter,
};