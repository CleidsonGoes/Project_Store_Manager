const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');
const mocks = require('../mocks/mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando camada Controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('testando middleware "fieldQuantityEqualZero", rota POST', async function () {
    const req = { body: mocks.reqCreateSales };
    const res = {};
    const next = sinon.stub().returns(); // crie um stub

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    salesMiddlewares.fieldQuantityEqualZero(req, res, next); // passe o `next` para o middleware junto com o `req` e `res`
    expect(next).to.have.been.calledWith(); // verifica se o `next` foi chamado pelo middleware
  });
  it('testando middleware "notFoundFieldProductId", rota POST', async function () {
    const req = { body: mocks.reqCreateSales };
    const res = {};
    const next = sinon.stub().returns(); // crie um stub

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    salesMiddlewares.notFoundFieldProductId(req, res, next); // passe o `next` para o middleware junto com o `req` e `res`
    expect(next).to.have.been.calledWith(); // verifica se o `next` foi chamado pelo middleware
  });
  it('testando middleware "notFoundFieldQuantity", rota POST', async function () {
    const req = { body: mocks.reqCreateSales };
    const res = {};
    const next = sinon.stub().returns(); // crie um stub

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    salesMiddlewares.notFoundFieldQuantity(req, res, next); // passe o `next` para o middleware junto com o `req` e `res`
    expect(next).to.have.been.calledWith(); // verifica se o `next` foi chamado pelo middleware
  });
});