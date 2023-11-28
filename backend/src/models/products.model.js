const camelize = require('camelize');
const connection = require('./connection');

const queryAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC;');
  return camelize(products);
};

const queryProductById = async (id) => {
  const [[products]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  console.log(products);
  return products;
};

module.exports = {
  queryAllProducts,
  queryProductById,
};