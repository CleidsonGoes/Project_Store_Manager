const express = require('express');
// const { queryAllProducts } = require('./models/products.model');
const productsRouter = require('./routes/products.routes');
const salesRouter = require('./routes/sales.routes');

const app = express();
app.use(express.json());
// app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// app.get('/products/:id', async (req, res) => {
//   const productId = Number(req.params.id);
//   const store = await queryAllProducts.find((p) => p.id === productId);

//   if (!store) {
//     return res.status(404).json({ message: 'Product not found' });
//   }

//   res.status(200).json(store);
// });

module.exports = app;
