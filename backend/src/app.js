const express = require('express');
const { queryAllProducts } = require('./models/products.model');
const { productsRouter } = require('./routes/products.routes');

const app = express();
app.use(express.json());
app.use('/products', productsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

// REQUISITO 01
app.get('/products', async (req, res) => {
  const sortedProducts = await queryAllProducts.sort((a, b) => a.id - b.id);
  return res.status(200).json(sortedProducts);
});

app.get('/products/:id', async (req, res) => {
  const productId = Number(req.params.id);
  const store = await queryAllProducts.find((p) => p.id === productId);

  if (!store) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(store);
});

// REQUISITO 02
// app.get('/sales', async (req, res) => {
//   const allSales = await storeManagerModel.getAllSales();
//   return res.status(200).json(allSales);
// });

// app.get('/sales/:id', async (req, res) => {
//   const saleId = Number(req.params.id);
//   const sale = await storeManagerModel.getAllSales.find((s) => s.id === saleId);

//   if (!sale) {
//     return res.status(404).json({ message: 'Sale not found' });
//   }
//   return res.status(200).json(sale);
// });

module.exports = app;
