// requisito 02
const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`SELECT
    sales.id AS sale_id,
    sales.date,
    products.id AS product_id,
    sales_products.quantity
  FROM
    sales
  JOIN
    sales_products ON sales.id = sales_products.sale_id
  JOIN
    products ON sales_products.product_id = products.id
  ORDER BY
    sale_id ASC, product_id ASC;`);
  return camelize(sales);
};

const getSalesById = async (id) => {
  const [[sales]] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  console.log(sales);
  return sales;
};

module.exports = {
  getAllSales,
  getSalesById,
};