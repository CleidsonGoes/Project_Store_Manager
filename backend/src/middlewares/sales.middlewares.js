const notFoundFieldProductId = (req, res, next) => {
  const sales = req.body;
  const existProductId = sales.some((sale) => sale.productId);
  if (!existProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const notFoundFieldQuantity = (req, res, next) => {
  const sales = req.body;
  const existQuantity = sales.some((sale) => sale.quantity);
  if (!existQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const fieldQuantityEqualZero = (req, res, next) => {
  const sales = req.body;
  const quantityEqualZero = sales.some((sale) => sale.quantity <= 0);
  if (quantityEqualZero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const oneSaleWithoutQuantity = (req, res, next) => {
  const sales = req.body;
  if (sales.length === 1 && sales[0].quantity === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
}; 

module.exports = {
  notFoundFieldProductId,
  notFoundFieldQuantity,
  fieldQuantityEqualZero,
  oneSaleWithoutQuantity,
};