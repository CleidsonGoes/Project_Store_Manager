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
  it('deve listar todas as vendas', async function () {
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
  
  it('deve listar uma venda específica', async function () {
    // // arrange - o que preciso fazer para o meu teste funcionar (mocks, stubs)
    // sinon.stub(connection, 'execute').resolves([[mocks.getByIdProducts]]);
    // // act - ação de executar a função que eu estou testando
    // const result = await model.queryProductById(1);
    // // assert - verifica se o resultado é o esperado
    // expect(result).to.be.deep.equal(mocks.getByIdProducts);
  });

  it('não deve listar uma venda inexistente', async function () {
    // const res = await chai.request(app).get('/products/999');
    // expect(res).to.have.status(404);
    // expect(res.body).to.deep.equal({ message: 'Product not found' });
  });
});