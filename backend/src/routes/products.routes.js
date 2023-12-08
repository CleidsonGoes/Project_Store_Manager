const express = require('express');
const productsControllers = require('../controllers/products.controllers');

const productsRouter = express.Router();
// DICA - sempre colocar rotas específicas na linhas de cima no caso get/search que fica acima da get/:id
productsRouter.get('/', productsControllers.getAllProductsController);
productsRouter.get('/search', productsControllers.searchProduct);
productsRouter.get('/:id', productsControllers.getByIdProductsController);
productsRouter.post('/', productsControllers.createProduct);
productsRouter.put('/:id', productsControllers.updateProduct);
productsRouter.delete('/:id', productsControllers.deleteProduct);

module.exports = productsRouter;