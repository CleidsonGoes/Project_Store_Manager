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
  it('Deve listar todos produtos, rota GET', async function () {
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
  it('Deve testar consulta de um produto específico, rota GET/id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();

    sinon.stub(services, 'getByIdProductsServices').resolves({ status: 200, message: mocks.getByIdProducts });

    await controllers.getByIdProductsController(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(mocks.getByIdProducts);
  });
  it('Testando criação de produtos, rota POST', async function () {
    const req = { body: mocks.insertProduct };
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    sinon.stub(services, 'createProduct').resolves({ status: 201, message: { id: 1, name: mocks.insertProduct.name } });

    await controllers.createProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith({ id: 1, name: mocks.insertProduct.name });
  });
  it('Testando atualização de produtos rota PUT/id', async function () {
    const req = { params: {
      id: 1,
      body: mocks.reqUpdateProduct,
    } };
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    sinon.stub(services, 'updateProduct').resolves({ status: 200, message: { id: 1, name: mocks.reqUpdateProduct.name } });

    await controllers.updateProduct(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ id: 1, name: mocks.reqUpdateProduct.name });
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