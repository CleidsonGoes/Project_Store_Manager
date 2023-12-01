const express = require('express');
const productsControllers = require('../controllers/products.controllers');
const checkingFieldRequired = require('../middlewares/products.middlewares');

const { checkFieldRequired } = checkingFieldRequired();

const productsRouter = express.Router();

productsRouter.get('/', productsControllers.getAllProductsController);
productsRouter.get('/:id', productsControllers.getByIdProductsController);
productsRouter.post('/', checkFieldRequired, {});

module.exports = productsRouter;