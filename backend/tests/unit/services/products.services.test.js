const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const models = require('../../../src/models/products.model');
const mocks = require('../mocks/mocks');
const services = require('../../../src/services/products.services');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando a camada de serviço', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testando get all products', async function () {
    // arrange
    sinon.stub(models, 'queryAllProducts').resolves(mocks.getAllProducts);
    // act
    const result = await services.getAllProductsServices();
    // assert
    expect(result.message).to.be.deep.equal(mocks.getAllProducts);
    expect(result.status).to.be.deep.equal(200);
  });
  it('Testando get by Id products', async function () {
    // arrange
    sinon.stub(models, 'queryProductById').resolves(mocks.getByIdProducts);
    // act
    const result = await services.getByIdProductsServices(1);
    // assert
    expect(result.message).to.be.deep.equal(mocks.getByIdProducts);
    expect(result.status).to.be.deep.equal(200);
  });
});

// arrange
//   stub
// act
//   executar uma função
// assert
//   expect