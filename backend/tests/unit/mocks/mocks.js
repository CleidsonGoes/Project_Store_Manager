const getAllProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const getByIdProducts = {
  id: 1,
  name: 'Martelo de Thor',
};

const getAllSales = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const insertProduct = {
  name: 'ProdutoX',
};

const ReqUpdateProduct = {
  name: 'Martelo do Batman',
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  getAllSales,
  insertProduct,
  ReqUpdateProduct,
};