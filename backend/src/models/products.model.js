const camelize = require('camelize');
const connection = require('./connection');

const queryAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return camelize(products);
};

const findProductById = async (id) => {
  const [[driver]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return driver;
};

module.exports = {
  queryAllProducts,
  findProductById,
};