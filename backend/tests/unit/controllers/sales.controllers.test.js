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
});
