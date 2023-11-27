const camelize = require('camelize');
const connection = require('./connection');

const findAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return camelize(products);
};

// requisito 02
const getAllSales = async () => {
//   const [sales] = await connection.execute('SELECT p.id, p.name, s.id, s.date FROM products AS p JOIN sales_products ON p.id = sales_products.product_id JOIN sales ON sales_products.sales_id = s.id;');
//   return camelize(sales);
};

module.exports = {
  findAllProducts,
  getAllSales,
};