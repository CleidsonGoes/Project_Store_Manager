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
  // console.log(sales);
  return camelize(sales);
};

const createSalesProducts = async (sales) => {
  const [{ insertId }] = await connection.execute(`INSERT INTO
    sales (date)
  VALUES (NOW());`);
  
  await Promise.all(sales.map(async (sale) => {
    await connection.execute(`INSERT INTO
      sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`, [insertId, sale.productId, sale.quantity]);
  }));
  return { id: insertId, itemsSold: sales };
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return affectedRows;
};

const updateQuantitySale = async (productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE product_id = ?;';
  await connection.execute(query, [quantity, productId]);
};

const queryUpdateQuantityProduct = async (productId, quantity) => {
  await updateQuantitySale(productId, quantity);
  const query = `SELECT
      s.date AS date,
      sp.product_id AS product_Id,
      sp.quantity AS quantity,
      sp.sale_id AS sale_id
    FROM sales_products sp
    JOIN sales s ON sp.sale_id = s.id
    WHERE sp.product_id = ?;`;
  const [[affectedRows]] = await connection.execute(query, [productId]);
  console.log(affectedRows, 'log da affectedRows do updateQuantity');
  return camelize(affectedRows);
};

module.exports = {
  getAllSales,
  getSalesById,
  createSalesProducts,
  deleteSale,
  queryUpdateQuantityProduct,
};