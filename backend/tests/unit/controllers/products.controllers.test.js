const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const mocks = require('../mocks/mocks');
const services = require('../../../src/services/products.services');
const controllers = require('../../../src/controllers/products.controllers');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando camada Controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Deve listar dos produtos, rota GET', async function () {
    // arrange
    const req = {};
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();

    sinon.stub(services, 'getAllProductsServices').resolves({ status: 200, message: mocks.getAllProducts });
    // act
    await controllers.getAllProductsController(req, res);
    // assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mocks.getAllProducts);
  });
  it('Testando remoção de produto, rota DELETE/id', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    sinon.stub(services, 'deleteProduct').resolves({ status: 204 });

    await controllers.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(undefined);
  });
});