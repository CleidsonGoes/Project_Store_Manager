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

const getByIdSales = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

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

const createdSales = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const reqCreateSales = [
  {
    productId: 1,
    quantity: 1,
  },
];
const insertProduct = {
  name: 'ProdutoX',
};

const reqUpdateProduct = {
  name: 'Martelo do Batman',
};

const reqUpdateQuantityProduct = {
  quantity: 20,
};

const resUpdatedQuantityProduct = {
  date: '2023-05-06T03:14:28.000Z',
  productId: 2,
  quantity: 20,
  saleId: 1,
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  getAllSales,
  insertProduct,
  reqUpdateProduct,
  getByIdSales,
  createdSales,
  reqCreateSales,
  reqUpdateQuantityProduct,
  resUpdatedQuantityProduct,
};