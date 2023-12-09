const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const mocks = require('../mocks/mocks');
const services = require('../../../src/services/sales.services');
const controllers = require('../../../src/controllers/sales.controllers');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando camada Controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('deve listar um venda específica, rota GET/sales/id', async function () { // // arrange - o que preciso fazer para o meu teste funcionar (mocks, stubs)
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();

    sinon.stub(services, 'getByIdSalesServices').resolves({ status: 200, message: mocks.getByIdSales });

    await controllers.getByIdSalesController(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(mocks.getByIdSales);
  });
  it('Testando criação de vendas, rota POST/sales', async function () {
    const req = { body: mocks.reqCreateSales };
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    sinon.stub(services, 'createSalesProducts').resolves({ status: 201, message: mocks.createdSales });

    await controllers.createSale(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(mocks.createdSales);
  });

  it('Testando remoção de venda, rota DELETE/id', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    sinon.stub(services, 'deleteSale').resolves({ status: 204 });

    await controllers.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(undefined);
  });
  it('Testando todas as vendas, rota GET/', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(services, 'getAllSalesServices').resolves({ status: 200, message: mocks.getAllSales });

    await controllers.getAllSalesController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mocks.getAllSales);
  });
});
