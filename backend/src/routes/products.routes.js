const express = require('express');
const productsControllers = require('../controllers/products.controllers');
// const checkingField = require('../middlewares/products.middlewares');

const productsRouter = express.Router();

productsRouter.get('/', productsControllers.getAllProductsController);
productsRouter.get('/:id', productsControllers.getByIdProductsController);
productsRouter.post('/', productsControllers.createProduct);

module.exports = productsRouter;