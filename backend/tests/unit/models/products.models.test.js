// test.js
const { expect } = require('chai');
const sinon = require('sinon');
// const chaiHttp = require('chai-http');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/products.model');
const mocks = require('../mocks/mocks');

describe('Testando camada Model', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('deve listar todos os produtos, rota GET', async function () {
    // arrange - o que preciso fazer para o meu teste funcionar (mocks, stubs)
    sinon.stub(connection, 'execute').resolves([mocks.getAllProducts]);
    // act - ação de executar a função que eu estou testando
    const result = await productModel.queryAllProducts();
    // assert - verifica se o resultado é o esperado
    expect(result).to.be.deep.equal(mocks.getAllProducts);
    expect(result).to.be.an('array');
    expect(result).to.be.lengthOf(2);
  });
  
  it('deve listar um produto específico, rota GET/id', async function () {
    // arrange - o que preciso fazer para o meu teste funcionar (mocks, stubs)
    sinon.stub(connection, 'execute').resolves([[mocks.getByIdProducts]]);
    // act - ação de executar a função que eu estou testando
    const result = await productModel.queryProductById(1);
    // assert - verifica se o resultado é o esperado
    expect(result).to.be.deep.equal(mocks.getByIdProducts);
  });

  it('Testando criação de produtos, rota POST', async function () {
    sinon.stub(connection, 'execute').resolves([1]);

    const resulted = await productModel.createProduct(mocks.insertProduct);
    
    expect(resulted).to.be.equal(1);
  });
  it('Testando atualização de produtos rota PUT/id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productModel.updateProduct(1, mocks.ReqUpdateProduct);

    expect(result).to.be.equal(1);
    expect(result).to.be.an('number');
  });
  it('Testando remoção de produto, rota DELETE/id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productModel.deleteProduct(1);

    expect(result).to.be.equal(1);
    expect(result).to.be.an('number');
  });
});