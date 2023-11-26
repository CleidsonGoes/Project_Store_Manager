const express = require('express');

const app = express('./app');

const PORT = process.env.PORT || 3001;

app.get('/products', (req, res) => {
  const sortedProducts = products.sort((a, b) => a.id - b.id);
  res.json(sortedProducts);
});

app.get('/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});
