const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const models = require('../../../src/models/sales.models');
const productModel = require('../../../src/models/products.model');
const mocks = require('../mocks/mocks');
const services = require('../../../src/services/sales.services');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando camada Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('deve listar um venda específica, rota GET/sales/id', async function () { // // arrange - o que preciso fazer para o meu teste funcionar (mocks, stubs)
    // arrange
    sinon.stub(models, 'getSalesById').resolves(mocks.getByIdSales);
    // act
    const result = await services.getByIdSalesServices(1);
    // assert
    expect(result.message).to.be.deep.equal(mocks.getByIdSales);
    expect(result.status).to.be.deep.equal(200);
  });
  it('Testando criação de vendas, rota POST/sales', async function () {
    sinon.stub(productModel, 'queryAllProducts').resolves(mocks.getAllProducts);
    sinon.stub(models, 'createSalesProducts').resolves(mocks.createdSales);

    const result = await services.createSalesProducts(mocks.reqCreateSales);

    expect(result.status).to.be.equal(201);
    expect(result.message).to.be.deep.equal(mocks.createdSales);
  });
  it('Testando remoção de venda, rota DELETE/id', async function () {
    sinon.stub(models, 'getSalesById').resolves(mocks.getByIdSales);
    sinon.stub(models, 'deleteSale').resolves(1);

    const result = await services.deleteSale(1);

    expect(result.status).to.be.deep.equal(204);
  });
});