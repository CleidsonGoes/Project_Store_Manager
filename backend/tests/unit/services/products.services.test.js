const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const models = require('../../../src/models/products.model');
const mocks = require('../mocks/mocks');
const services = require('../../../src/services/products.services');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando camada Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Deve listar dos produtos, rota GET', async function () {
    // arrange
    sinon.stub(models, 'queryAllProducts').resolves(mocks.getAllProducts);
    // act
    const result = await services.getAllProductsServices();
    // assert
    expect(result.message).to.be.deep.equal(mocks.getAllProducts);
    expect(result.status).to.be.deep.equal(200);
  });
  it('Testando consulta produto por ID, rota GET', async function () {
    // arrange
    sinon.stub(models, 'queryProductById').resolves(mocks.getByIdProducts);
    // act
    const result = await services.getByIdProductsServices(1);
    // assert
    expect(result.message).to.be.deep.equal(mocks.getByIdProducts);
    expect(result.status).to.be.deep.equal(200);
  });
  it('Testando remoção de produto, rota DELETE/id', async function () {
    sinon.stub(models, 'queryProductById').resolves(mocks.getByIdProducts);
    sinon.stub(models, 'deleteProduct').resolves(1);

    const result = await services.deleteProduct(1);

    expect(result.status).to.be.deep.equal(204);
  });
});

// arrange
//   stub
// act
//   executar uma função
// assert
//   expect