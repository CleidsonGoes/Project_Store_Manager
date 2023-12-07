// test.js
const chai = require('chai');
const sinon = require('sinon');
// const chaiHttp = require('chai-http');
const connection = require('../../../src/models/connection');
const model = require('../../../src/models/sales.models');
const mocks = require('../mocks/mocks');

const { expect } = chai;

describe('Sales API', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('deve listar todas as vendas, rota GET/sales', async function () {
    // arrange - o que preciso fazer para o meu teste funcionar (mocks, stubs)
    sinon.stub(connection, 'execute').resolves([mocks.getAllSales]);
    // act - ação de executar a função que eu estou testando
    const result = await model.getAllSales();
    console.log(result);
    // assert - verifica se o resultado é o esperado
    expect(result).to.be.deep.equal(mocks.getAllSales);
    expect(result).to.be.an('array');
    expect(result).to.be.lengthOf(2);
  });
  
  it('deve listar um venda específica, rota GET/sales/id', async function () { // // arrange - o que preciso fazer para o meu teste funcionar (mocks, stubs)
    // arrange - o que preciso fazer para o meu teste funcionar (mocks, stubs)
    sinon.stub(connection, 'execute').resolves([mocks.getByIdSales]);
    // act - ação de executar a função que eu estou testando
    const result = await model.getSalesById(1);
    // assert - verifica se o resultado é o esperado
    expect(result).to.be.deep.equal(mocks.getByIdSales);
  });

  // it('não deve listar uma venda inexistente', async function () {
  //   // const res = await chai.request(app).get('/products/999');
  //   // expect(res).to.have.status(404);
  //   // expect(res.body).to.deep.equal({ message: 'Product not found' });
  // });

  // it('Testando criação de vendas, rota POST/sales', async function () {
  //   sinon.stub(connection, 'execute').resolves(mocks.createdSales);

  //   const result = await model.createSalesProducts(mocks.reqCreateSales);
    
  //   expect(result).to.be.equal(mocks.createdSales);
  // });

  it('Testando remoção de venda, rota DELETE/id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await model.deleteSale(1);

    expect(result).to.be.equal(1);
    expect(result).to.be.an('number');
  });
});