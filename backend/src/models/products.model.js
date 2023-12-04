const camelize = require('camelize');
const connection = require('./connection');

const queryAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC;');
  return camelize(products);
};

const queryProductById = async (id) => {
  const [[products]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return products;
};

const createProduct = async (product) => {
  const { name } = product;
  const [result] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return result;
};

const updateProduct = async (id, product) => {
  const { name } = product;
  const queryDB = 'UPDATE products SET name = ? WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(queryDB, [name, id]);
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return affectedRows;
};

module.exports = {
  queryAllProducts,
  queryProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};