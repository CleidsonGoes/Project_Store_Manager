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
  const [sales] = await connection.execute(`SELECT
    sales.date,
    sales_products.product_id,
    sales_products.quantity
  FROM
    sales
  INNER JOIN
    sales_products ON sales.id = sales_products.sale_id
  WHERE
    id = ?
  ORDER BY
    sale_id ASC, product_id ASC;`, [id]);
  console.log(sales);
  return camelize(sales);
};

const createSale = async (sale) => {
  const { productId, quantity } = sale;
  const [result] = await connection.execute(`INSERT INTO
    sales (date)
  VALUES (CURRENT_TIMESTAMP)
  SET @sale_id = LAST_INSERT_ID()
  INSERT INTO
    sales_products (sale_id, product_id, quantity)
  VALUES
    (@sale_id, ?, ?)`, [productId, quantity]);

  return result;
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};